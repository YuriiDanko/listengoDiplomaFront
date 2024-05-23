import React from 'react';
import cl from './TrackCard.module.css';
import { Card, Image, Skeleton, Text } from '@mantine/core';

const TrackCard = ({ track }) => {
  return (
    <Card onClick={() => play(track.trakcId)} padding={'lg'} maw={225}>
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

export const TrackCardSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};
export default TrackCard;
