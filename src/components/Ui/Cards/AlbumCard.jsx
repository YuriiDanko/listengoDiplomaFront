import { Card, Image, Skeleton, Text } from '@mantine/core';
import React from 'react';
import { useTrackContext } from '../../../hooks/track';

const AlbumCard = ({ album, user }) => {
  const { clickAlbum } = useTrackContext();

  return (
    <Card
      padding={'lg'}
      w={225}
      shadow='xl'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        clickAlbum(album, user);
      }}
    >
      <div>
        <Image src={album.imageUrl} />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end' pt={5} pb={10}>
          {album.albumName}
        </Text>
        <Text pb={5}>{album.artistName}</Text>
      </Card.Section>
    </Card>
  );
};

export const AlbumCardSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};

export default AlbumCard;
