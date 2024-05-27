import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconPlayerPlay, IconPlus } from '@tabler/icons-react';
import React from 'react';
import { convertMillisToMinutesAndSeconds } from '../../../helpers/time';

export const AlbumTrackCard = ({ track, index }) => {
  return (
    <Flex
      style={{ border: '1px solid rgb(0, 0, 0, 0.5)', borderRadius: '10px' }}
      p={10}
      justify={'space-between'}
      align={'center'}
      w={'100%'}
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
      <Flex align={'center'} gap={20}>
        <ActionIcon radius={'xl'}>
          <IconPlus height={20}></IconPlus>
        </ActionIcon>
        <Text size='xs' fw={'bold'}>
          {convertMillisToMinutesAndSeconds(track.durationMs)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AlbumTrackCard;
