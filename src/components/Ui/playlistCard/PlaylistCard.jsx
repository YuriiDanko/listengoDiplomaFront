import { ActionIcon, Flex, Image, Text, useDirection } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import cl from './PlaylistCard.module.css';
import { IconX } from '@tabler/icons-react';
import { useAuth } from '../../../hooks/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmModal } from '../createModal/confirmationModel';

const PlaylistCard = ({ playlist }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [opened, { open, close }] = useDisclosure(false);

  const goToPlaylist = () => {
    console.log(playlist);
    navigate(`/playlist/${playlist.playlistId}`);
  };

  const getPlaylistCreator = async () => {
    const userNameresponse = await axios({
      method: 'get',
      url: `http://localhost:8080/user/${playlist.creator}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setUserName(userNameresponse.data.userName);
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

  useEffect(() => {
    getPlaylistCreator();
  }, []);

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
          <Text size='md' className={cl.playlistName} onClick={goToPlaylist}>
            {playlist.playlistName}
          </Text>
          <Text size='xs' className={cl.playlistAuthor}>
            {userName}
          </Text>
        </div>
        <ActionIcon variant='filled' size='lg' radius='xl' aria-label='Play' onClick={open}>
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        <ConfirmModal
          opened={opened}
          onCancel={close}
          onConfirm={removeOrDeletePlaylist}
          title={'Remove Playlist'}
          description={'Are you sure?'}
        />
      </div>
    </Flex>
  );
};

export default PlaylistCard;
