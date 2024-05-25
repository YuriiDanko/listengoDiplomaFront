import { Card, Image, Skeleton, Text } from '@mantine/core';
import React from 'react';

export const AlbumCard = ({ album }) => {
  return (
    <Card padding={'lg'} w={225} shadow='xl' style={{ cursor: 'pointer' }}>
      <div>
        <Image src={album.imageUrl} />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end' pt={5} pb={10}>
          {album.albumName}
        </Text>
      </Card.Section>
    </Card>
  );
};

export const AlbumCardSkeleton = () => {
  return <Skeleton w={225} radius={'md'} height={260} />;
};

export default AlbumCard;
