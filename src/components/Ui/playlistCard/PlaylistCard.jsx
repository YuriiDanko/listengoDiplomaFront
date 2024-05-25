import { ActionIcon, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import cl from './PlaylistCard.module.css';
import { IconX } from '@tabler/icons-react';

const PlaylistCard = ({ playlist, username }) => {
  return (
    <Flex gap={20} className={cl.cardContainer}>
      <div className={cl.playlistCard}>
        <Image
          src={playlist.imageUrl}
          height={64}
          width={64}
          style={{ aspectRatio: '1/1' }}
          radius={5}
        />
        <div className={cl.textContainer}>
          <Text size='md' className={cl.playlistName}>
            {playlist.playlistName}
          </Text>
          <Text size='xs' className={cl.playlistAuthor}>
            {username}
          </Text>
        </div>
        <ActionIcon variant='filled' size='lg' radius='xl' aria-label='Play'>
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </div>
    </Flex>
  );
};

export default PlaylistCard;
