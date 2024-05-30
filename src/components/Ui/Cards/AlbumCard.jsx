import { Card, Image, Skeleton, Text } from '@mantine/core';
import React from 'react';
import { useTrackContext } from '../../../hooks/track';
import { useNavigate } from 'react-router-dom';
import cl from './TrackLine.module.css';

const AlbumCard = ({ album }) => {
  const { clickAlbum } = useTrackContext();
  const navigate = useNavigate();

  const goToAlbumPage = (album) => {
    navigate('/album', { state: { album } });
  };

  return (
    <Card padding={'lg'} maw={225} shadow='xl' style={{ cursor: 'pointer' }}>
      <div>
        <Image
          src={album.imageUrl}
          onClick={() => {
            clickAlbum(album);
            goToAlbumPage(album);
          }}
        />
      </div>
      <Card.Section inheritPadding>
        <Text size='md' fw={'bold'} truncate='end' pt={5} pb={10}>
          {album.albumName}
        </Text>
        <Text pb={5} className={cl.textDecor}>
          {album.artistName}
        </Text>
      </Card.Section>
    </Card>
  );
};

export const AlbumCardSkeleton = () => {
  return <Skeleton maw={225} radius={'md'} height={260} />;
};

export default AlbumCard;
