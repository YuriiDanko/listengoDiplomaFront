import React from 'react';
import { ActionIcon, Flex, Menu, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useTrackContext } from '../../../hooks/track';
import { convertMillisToMinutesAndSeconds } from '../../../helpers/time';
import { useAuth } from '../../../hooks/auth';
import axios from 'axios';

const PlaylistTrackCard = ({ track, index, playlist, playlists, setPlaylistTracks }) => {
  const { clickTrack } = useTrackContext();
  const { user } = useAuth();

  const removeSong = async (trackId) => {
    console.log(trackId);

    await axios({
      method: 'put',
      url: `http://localhost:8080/remove-song/${trackId}?playlistId=${playlist.playlistId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    const newPlaylists = playlists.filter((track) => track.trackId !== trackId);
    setPlaylistTracks(newPlaylists);
  };

  return (
    <Flex
      style={{ border: '1px solid rgb(0, 0, 0, 0.5)', borderRadius: '10px' }}
      p={10}
      justify={'space-between'}
      align={'center'}
      w={'100%'}
    >
      <Flex
        align={'center'}
        onClick={() => {
          clickTrack([track]);
        }}
      >
        <Text size='sm' fw={'bold'} mr={10}>
          {index + 1}.
        </Text>
        <div style={{ width: '500px' }}>
          <Text size='sm' fw={'bold'}>
            {track.trackName}
          </Text>
          <Text size='xs' fw={'bold'}>
            {track.artist.artistName}
          </Text>
        </div>
      </Flex>
      <Flex align={'center'} gap={20}>
        {playlist.creator == user.userId ? (
          <ActionIcon
            radius={'xl'}
            onClick={() => {
              removeSong(track.trackId);
            }}
          >
            <IconMinus height={20}></IconMinus>
          </ActionIcon>
        ) : (
          <ActionIcon
            radius={'xl'}
            onClick={() => {
              console.log('added');
            }}
          >
            <IconPlus height={20}></IconPlus>
          </ActionIcon>
        )}
        <Text size='xs' fw={'bold'}>
          {convertMillisToMinutesAndSeconds(track.durationMs)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PlaylistTrackCard;
