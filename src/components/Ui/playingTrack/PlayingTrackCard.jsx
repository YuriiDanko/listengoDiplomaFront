import React from 'react';
import { useTrackContext } from '../../../hooks/track';
import { Flex, Image, Text } from '@mantine/core';

const PlayingTrackCard = ({ track }) => {
  if (!track) {
    return (
      <Flex gap={20} maw={500}>
        <Image
          src={'https://img.freepik.com/free-photo/textured-background-white-tone_53876-128610.jpg'}
          height={80}
          style={{ aspectRatio: '1/1' }}
        />
        <Flex direction={'column'} justify={'center'}>
          <Text fw={'bold'} truncate={'end'}>
            Blank
          </Text>
          <Text>Blank</Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex gap={20}>
      <Image src={track.album.images[2].url} height={80} />
      <Flex direction={'column'} justify={'center'} w={400}>
        <Text fw={'bold'} truncate={'end'}>
          {track.name}
        </Text>
        <Text>{track.artists[0].name}</Text>
      </Flex>
    </Flex>
  );
};

export default PlayingTrackCard;
