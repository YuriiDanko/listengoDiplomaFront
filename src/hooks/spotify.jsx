import { useEffect, useState } from 'react';
import axios from 'axios';

const clientId = '913411ccab044fea82bc79727ffe686e';
const clientSecret = 'ba5ddaadbbfb471c97650e29af541ba1';
const redirectUri = 'http://localhost:5173/';
const scopes =
  'user-modify-playback-state user-read-playback-state user-read-currently-playing streaming';

const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQueryParams = () => {
      const params = {};
      window.location.search
        .substring(1)
        .split('&')
        .forEach((param) => {
          const [key, value] = param.split('=');
          params[key] = decodeURIComponent(value);
        });
      return params;
    };

    const params = getQueryParams();

    if (params.code) {
      const authCode = params.code;
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('code', authCode);
      data.append('redirect_uri', redirectUri);
      data.append('client_id', clientId);
      data.append('client_secret', clientSecret);

      axios
        .post(tokenUrl, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((response) => {
          const accessToken = response.data.access_token;
          setAccessToken(accessToken);

          // Optionally, store the access token in localStorage for later use
          localStorage.setItem('spotify_access_token', accessToken);
          localStorage.setItem('refresh_token', authCode);
        })
        .catch((error) => {
          console.error('Error fetching the access token:', error);
          setError('Error fetching the access token');
        });
    } else {
      setError('No authorization code found in the URL.');
    }
  }, []);

  const initiateAuth = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
  };

  return { accessToken, error, initiateAuth };
};

export default useSpotifyAuth;
