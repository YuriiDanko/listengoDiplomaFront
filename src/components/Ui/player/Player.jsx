import React, { useEffect, useState } from 'react';
import cl from './Player.module.css';
import PlayingTrackCard from '../playingTrack/PlayingTrackCard';
import {
  IconMusicUp,
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
  const { track } = useTrackContext();
  const [deviceId, setDeviceId] = useState();
  const [playerState, setPlayerState] = useState();
  const [volume, setVolume] = useState();

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
            console.error('User is not playing music through the Web Playback SDK');
            return;
          }

          setPlayerState(state);
        });
      }, 1000);

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

  const changePlayerVolume = (value) => {
    setVolume(value);
    player.setVolume(value / 100);
  };

  const setPosition = (e) => {
    const currentPosition = (track.durationMs / 100) * e;
    player.seek(currentPosition);
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
          <ActionIcon onClick={() => togglePlay()}>
            {playerState && playerState.paused ? (
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
          <Text>
            {playerState ? convertMillisToMinutesAndSeconds(playerState.position) : '00:00'}
          </Text>
          <div style={{ width: 500 }}>
            <Slider
              label={null}
              value={playerState ? (playerState.position / track.durationMs) * 100 : 0}
              onChangeEnd={(e) => setPosition(e)}
            />
          </div>
          <Text>{track ? convertMillisToMinutesAndSeconds(track.durationMs) : '00:00'}</Text>
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
