import React, { useEffect, useState } from 'react';
import cl from './Player.module.css';
import PlayingTrackCard from '../playingTrack/PlayingTrackCard';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconVolume,
  IconVolumeOff,
} from '@tabler/icons-react';
import { ActionIcon, Flex, Slider, Text } from '@mantine/core';
import { useTrackContext } from '../../../hooks/track';
import axios from 'axios';
import { convertMillisToMinutesAndSeconds } from '../../../helpers/time';

const Player = () => {
  const [player, setPlayer] = useState();
  const { tracks } = useTrackContext();
  const [deviceId, setDeviceId] = useState();
  const [playerState, setPlayerState] = useState();
  const [volume, setVolume] = useState();

  const spotifyURIs = tracks
    ? tracks.map((track) => {
        return `spotify:track:${track.trackId}`;
      })
    : [];

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
        volume: 0.3,
      });
      setVolume(player._options.volume * 100);
      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        console.log(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      setInterval(() => {
        player.getCurrentState().then((state) => {
          if (!state) {
            return;
          }

          setPlayerState(state);
        });
      }, 1000);

      player.connect();
    };
  }, []);

  async function playSong() {
    console.log(spotifyURIs);
    if (deviceId) {
      await axios({
        method: 'PUT',
        url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
        },
        data: {
          uris: spotifyURIs,
          device_id: deviceId,
        },
      });
    }
  }

  const togglePlay = () => {
    player.togglePlay();
    player.getCurrentState().then((state) => {
      if (!state) {
        return;
      }

      setPlayerState(state);
    });
  };

  const changePlayerVolume = (value) => {
    setVolume(value);
    player.setVolume(value / 100);
  };

  const setPosition = (e) => {
    console.log('changed position');
    const currentPosition = (playerState.track_window.current_track.duration_ms / 100) * e;
    console.log(player);
    player.seek(currentPosition);
  };

  useEffect(() => {
    playSong();
  }, [tracks]);

  return (
    <div className={cl.player}>
      <PlayingTrackCard track={playerState ? playerState.track_window.current_track : null} />
      <div className={cl.playerControls}>
        <Flex gap={25}>
          <ActionIcon
            onClick={() => {
              player.previousTrack();
            }}
          >
            <IconPlayerSkipBackFilled />
          </ActionIcon>
          <ActionIcon onClick={() => togglePlay()}>
            {playerState && playerState.paused ? (
              <IconPlayerPlayFilled />
            ) : (
              <IconPlayerPauseFilled />
            )}
          </ActionIcon>
          <ActionIcon onClick={() => player.nextTrack()}>
            <IconPlayerSkipForwardFilled />
          </ActionIcon>
        </Flex>
        <div className={cl.playerSlider}>
          <Text>
            {playerState ? convertMillisToMinutesAndSeconds(playerState.position) : '00:00'}
          </Text>
          <div style={{ width: 500 }}>
            <Slider
              label={null}
              value={
                playerState
                  ? (playerState.position / playerState.track_window.current_track.duration_ms) *
                    100
                  : 0
              }
              onChange={(e) => setPosition(e)}
            />
          </div>
          <Text>
            {playerState
              ? convertMillisToMinutesAndSeconds(playerState.track_window.current_track.duration_ms)
              : '00:00'}
          </Text>
        </div>
      </div>
      <Flex align={'center'} gap={5}>
        {volume !== 0 ? <IconVolume /> : <IconVolumeOff />}
        <Slider w={100} value={volume} onChange={changePlayerVolume} />
      </Flex>
    </div>
  );
};

export default Player;
