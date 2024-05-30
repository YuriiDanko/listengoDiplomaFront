import React from 'react';
import { Card, Flex, Image, Skeleton, Text } from '@mantine/core';
import { useTrackContext } from '../../../hooks/track';
import { useNavigate } from 'react-router-dom';
import PlaylistSelect from '../playlistSelect/PlaylistSelect';
import cl from './TrackCard.module.css';

const TrackCard = ({ track }) => {
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
            clickTrack([track]);
          }}
        />
      </div>
      <Card.Section inheritPadding>
        <div style={{ width: '180px' }}>
          <Text size='md' fw={'bold'} truncate='end'>
            {track.trackName}
          </Text>
          <Text
            className={cl.textDecor}
            pb={5}
            truncate='end'
            onClick={() => {
              goToArtistPage(track.artist.artistId);
            }}
          >
            {track.artist.artistName}
          </Text>
        </div>
        <Flex pb={15} justify={'center'}>
          <PlaylistSelect track={track} />
        </Flex>
      </Card.Section>
    </Card>
  );
};

export const TrackCardSkeleton = () => {
  return <Skeleton maw={225} radius={'md'} height={260} />;
};
export default TrackCard;
