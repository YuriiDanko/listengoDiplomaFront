import { Card, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import { useTrackContext } from '../../../hooks/track';

const TrackLine = ({ track }) => {
  const { clickTrack } = useTrackContext();

  return (
    <Card
      onClick={() => {
        clickTrack(track);
      }}
      padding={'lg'}
      w={225}
      shadow='xl'
      style={{ cursor: 'pointer' }}
    >
      <div>
        <Image src={track.imageUrl} />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end'>
          {track.trackName}
        </Text>
        <Text pb={5}>{track.artist.artistName}</Text>
      </Card.Section>
    </Card>
  );
};

export const TrackLineSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};

export default TrackLine;
