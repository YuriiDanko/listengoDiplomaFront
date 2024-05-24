import React, { useContext } from 'react';
import { Card, Image, Skeleton, Text } from '@mantine/core';
import { useTrackContext } from '../../../hooks/track';

const TrackCard = ({ track }) => {
  const { clickTrack } = useTrackContext();

  return (
    <Card
      onClick={() => {
        clickTrack(track);
      }}
      padding={'lg'}
      maw={225}
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

export const TrackCardSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};
export default TrackCard;
