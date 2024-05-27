import React from 'react';
import { Flex, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const PlayingTrackCard = ({ track }) => {
  if (!track) {
    return <Flex maw={500}></Flex>;
  }

  const navigate = useNavigate();

  const goToArtistPage = (artistId) => {
    navigate('/artist', { state: { artistId } });
  };

  return (
    <Flex gap={20} maw={500}>
      <Image src={track.album.images[2].url} height={80} />
      <Flex direction={'column'} justify={'center'} w={400}>
        <Text fw={'bold'} truncate={'end'}>
          {track.name}
        </Text>
        <Text onClick={() => goToArtistPage(track.artists[0].uri.split(':')[2])}>
          {track.artists[0].name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PlayingTrackCard;
