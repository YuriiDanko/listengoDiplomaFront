import { ActionIcon, Flex, Menu, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { convertMillisToMinutesAndSeconds } from '../../../helpers/time';
import { useTrackContext } from '../../../hooks/track';
import PlaylistSelect from '../playlistSelect/PlaylistSelect';

export const AlbumTrackCard = ({ track, index }) => {
  const { clickTrack } = useTrackContext();

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
        <PlaylistSelect />
        <Text size='xs' fw={'bold'}>
          {convertMillisToMinutesAndSeconds(track.durationMs)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AlbumTrackCard;
