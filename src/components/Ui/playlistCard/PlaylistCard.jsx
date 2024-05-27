import { ActionIcon, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import cl from './PlaylistCard.module.css';
import { IconX } from '@tabler/icons-react';
import { useAuth } from '../../../hooks/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToPlaylist = () => {
    console.log({ playlist });
    navigate('/playlist', { state: { playlist } });
  };

  const removeOrDeletePlaylist = () => {
    if (user.userId == playlist.creator) {
      axios({
        method: 'delete',
        url: `http://localhost:8080/delete-playlist/${playlist.playlistId}?userId=${user.userId}`,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });
    } else {
      axios({
        method: 'put',
        url: `http://localhost:8080/remove-playlist/${playlist.playlistId}?userId=${user.userId}`,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });
    }
    window.location.reload();
  };

  return (
    <Flex gap={20} className={cl.cardContainer}>
      <div className={cl.playlistCard}>
        <Image
          src={playlist.imageUrl}
          height={64}
          width={64}
          style={{ aspectRatio: '1/1' }}
          radius={5}
          onClick={goToPlaylist}
        />
        <div className={cl.textContainer}>
          <Text size='md' className={cl.playlistName}>
            {playlist.playlistName}
          </Text>
          <Text size='xs' className={cl.playlistAuthor}>
            {user.username}
          </Text>
        </div>
        <ActionIcon
          variant='filled'
          size='lg'
          radius='xl'
          aria-label='Play'
          onClick={() => {
            removeOrDeletePlaylist();
          }}
        >
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </div>
    </Flex>
  );
};

export default PlaylistCard;
