import { Card, Image, Skeleton, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './TrackLine.module.css';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  const goToArtistPage = (artistId) => {
    navigate('/artist', { state: { artistId } });
  };
  return (
    <Card
      padding={'lg'}
      maw={300}
      shadow='xl'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        goToArtistPage(artist.artistId);
      }}
    >
      <div>
        <Image src={artist.imageUrl} h={250} />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end' pt={5} pb={10} className={cl.textDecor}>
          {artist.artistName}
        </Text>
      </Card.Section>
    </Card>
  );
};

export const ArtistCardSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};

export default ArtistCard;
