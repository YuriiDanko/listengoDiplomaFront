import { Card, Image, Text } from '@mantine/core';
import React from 'react';
import { useTrackContext } from '../../../hooks/track';
import { useNavigate } from 'react-router-dom';

const TrackLine = ({ track }) => {
  const { clickTrack } = useTrackContext();
  const navigate = useNavigate();

  const goToArtistPage = (artistId) => {
    navigate('/artist', { state: { artistId } });
  };

  return (
    <Card padding={'lg'} maw={225} shadow='xl' style={{ cursor: 'pointer' }}>
      <div>
        <Image
          src={track.imageUrl}
          onClick={() => {
            clickTrack(track);
          }}
        />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end'>
          {track.trackName}
        </Text>
        <Text
          pb={5}
          onClick={() => {
            goToArtistPage(track.artist.artistId);
          }}
        >
          {track.artist.artistName}
        </Text>
      </Card.Section>
    </Card>
  );
};

export const TrackLineSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};

export default TrackLine;
