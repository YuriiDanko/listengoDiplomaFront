import { ActionIcon, Divider, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { useTrackContext } from '../hooks/track';
import TrackCard from '../components/Ui/trackCard/TrackCard';
import { IconHeart, IconX } from '@tabler/icons-react';

export const HomePage = () => {
  const { recentlyPlayed } = useTrackContext();

  return (
    <Flex direction={'column'} p={30} gap={20}>
      <Text>Recently Played</Text>
      <SimpleGrid cols={7}>
        {recentlyPlayed &&
          recentlyPlayed.map((track) => <TrackCard key={track.trackId} track={track} />)}
      </SimpleGrid>
      <Divider />
      <Flex justify={'space-evenly'}>
        <Flex align={'center'}>
          <ActionIcon h={100} w={100} radius={40} size={'xl'}>
            <IconX size={'xl'}></IconX>
          </ActionIcon>
        </Flex>
        <Flex align={'center'} direction={'column'}>
          {recentlyPlayed[0] && (
            <>
              <Image w={300} src={recentlyPlayed[0].imageUrl} />
              <Text>{recentlyPlayed[0].trackName}</Text>
              <Text>{recentlyPlayed[0].artist.artistName}</Text>
            </>
          )}
        </Flex>
        <Flex align={'center'}>
          <ActionIcon h={100} w={100} radius={40} size={'xl'}>
            <IconHeart size={'xl'}></IconHeart>
          </ActionIcon>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;
