import React, { useEffect, useState } from 'react';
import cl from './Player.module.css';
import PlayingTrackCard from '../playingTrack/PlayingTrackCard';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
} from '@tabler/icons-react';
import { ActionIcon, Flex, Slider } from '@mantine/core';
import { useAuth } from '../../../hooks/auth';
import { useTrackContext } from '../../../hooks/track';
import axios from 'axios';

const Player = () => {
  const { user } = useAuth();
  const [player, setPlayer] = useState();
  const { track } = useTrackContext();
  const [deviceId, setDeviceId] = useState();
  const [playerState, setPlayerState] = useState();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(localStorage.getItem('spotify_access_token'));
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        console.log(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  }, []);

  async function playSong() {
    if (deviceId) {
      await axios({
        method: 'PUT',
        url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
        },
        data: {
          uris: [`spotify:track:${track.trackId}`],
          device_id: deviceId,
        },
      });
    }
  }

  const togglePlay = () => {
    player.togglePlay();
    player.getCurrentState().then((state) => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }

      setPlayerState(state);
    });
  };

  useEffect(() => {
    playSong();
  }, [track]);

  return (
    <div className={cl.player}>
      <PlayingTrackCard />
      <div className={cl.playerControls}>
        <Flex gap={25}>
          <ActionIcon>
            <IconPlayerSkipBackFilled />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              togglePlay();
            }}
          >
            {playerState && !playerState.paused ? (
              <IconPlayerPlayFilled />
            ) : (
              <IconPlayerPauseFilled />
            )}
          </ActionIcon>
          <ActionIcon>
            <IconPlayerSkipForwardFilled />
          </ActionIcon>
        </Flex>
        <div className={cl.playerSlider}>
          <Slider />
        </div>
      </div>
      <div>SoundValue</div>
    </div>
  );
};

export default Player;
