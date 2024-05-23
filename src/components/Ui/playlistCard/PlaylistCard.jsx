import { ActionIcon, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import cl from './PlaylistCard.module.css';
import { IconPlayerPlay } from '@tabler/icons-react';

const PlaylistCard = ({ name }) => {
  return (
    <Flex gap={20} className={cl.cardContainer}>
      <div className={cl.playlistCard}>
        <Image
          src={'https://pics.craiyon.com/2023-06-19/9fe0db86772048e5850e2186323451eb.webp'}
          height={64}
          width={64}
          radius={10}
        />
        <div className={cl.textContainer}>
          <Text size='md' className={cl.playlistName}>
            {name}
          </Text>
          <Text size='xs' className={cl.playlistAuthor}>
            PlaylistAuthor
          </Text>
        </div>
        <ActionIcon variant='filled' size='lg' radius='xl' aria-label='Play'>
          <IconPlayerPlay style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </div>
    </Flex>
  );
};

export default PlaylistCard;
