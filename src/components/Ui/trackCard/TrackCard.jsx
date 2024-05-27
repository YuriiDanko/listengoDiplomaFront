import React from 'react';
import { ActionIcon, Card, Flex, Image, Skeleton, Text } from '@mantine/core';
import { useTrackContext } from '../../../hooks/track';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

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
          <ActionIcon
            radius={20}
            onClick={() => {
              console.log('added ' + track.trackName);
            }}
          >
            <IconPlus></IconPlus>
          </ActionIcon>
        </Flex>
      </Card.Section>
    </Card>
  );
};

export const TrackCardSkeleton = () => {
  return <Skeleton maw={225} radius={'md'} height={260} />;
};
export default TrackCard;
