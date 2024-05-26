import { Card, Image, Skeleton, Text } from '@mantine/core';
import React from 'react';

const ArtistCard = ({ artist }) => {
  return (
    <Card padding={'lg'} w={225} shadow='xl' style={{ cursor: 'pointer' }}>
      <div>
        <Image src={artist.imageUrl} h={250} />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end' pt={5} pb={10}>
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
