import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackContext } from '../hooks/track';
import { Flex, Image, ScrollArea, ScrollAreaAutosize, SimpleGrid, Text } from '@mantine/core';
import AlbumTrackCard from '../components/Ui/Cards/AlbumTrackCard';

const AlbumPage = () => {
  const location = useLocation();
  const { album } = location.state || {};
  const { tracks } = useTrackContext();

  return (
    <Flex p={30} h={780} justify={'space-between'} w={'100%'}>
      <Flex direction={'column'} align={'center'} w={'50%'}>
        <Image src={album.imageUrl} w={500} pb={10} />
        <Text size='55px' pb={10}>
          {album.albumName}
        </Text>
        <Text size='40px'>{album.artistName}</Text>
      </Flex>
      <Flex w={'50%'} justify={'center'}>
        <ScrollArea h={700} type='always'>
          <Flex direction={'column'} gap={20} pr={20}>
            {tracks.length > 0 &&
              tracks.map((track, index) => (
                <AlbumTrackCard key={track.trackId} track={track} index={index} />
              ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default AlbumPage;
