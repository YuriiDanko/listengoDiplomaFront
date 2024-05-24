import React from 'react';
import { useTrackContext } from '../../../hooks/track';
import { Flex, Image, Text } from '@mantine/core';

const PlayingTrackCard = () => {
  const { track } = useTrackContext();

  console.log(track);

  if (!track) {
    return null;
  }

  return (
    <Flex gap={20} maw={200}>
      <Image src={track.imageUrl} height={80} />
      <Flex direction={'column'} justify={'center'}>
        <Text fw={'bold'} truncate={'end'}>
          {track.trackName}
        </Text>
        <Text>{track.artist.artistName}</Text>
      </Flex>
    </Flex>
  );
};

export default PlayingTrackCard;
