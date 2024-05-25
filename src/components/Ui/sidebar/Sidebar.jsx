import React, { useEffect, useState } from 'react';
import cl from './Sidebar.module.css';
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Flex,
  Modal,
  ScrollAreaAutosize,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import PlaylistCard from '../playlistCard/PlaylistCard';
import axios from 'axios';
import { useAuth } from '../../../hooks/auth';
import CreateModal from '../createModal/CreateModal';

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user, logout } = useAuth();

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const respone = await axios({
          method: 'get',
          url: `http://localhost:8080/get-playlists/${user.userId}`,
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        });
        setPlaylists(respone.data);
      } catch (error) {
        logout();
      }
    })();
  }, []);

  return (
    <div className={cl.sideBar}>
      <div className={cl.userSection}>
        <div>
          <Avatar src='' alt='avatar.png' size={'xl'} mt={20} />
        </div>
        <div>{user.username}</div>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div className={cl.playlistSection}>
        <Divider my={'md'} />
        <Text>My Playlists</Text>
        <Modal opened={opened} onClose={close} title='Create Playlist'>
          <CreateModal
            onClose={close}
            user={user}
            setPlaylists={setPlaylists}
            playlists={playlists}
          />
        </Modal>
        <Flex align={'center'} gap={8}>
          <ActionIcon onClick={open} variant='filled' size='lg' radius='xl' aria-label='Settings'>
            <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          Create Playlist
        </Flex>
        <ScrollAreaAutosize h={635}>
          <Flex direction='column' gap={15}>
            {playlists.length !== 0 ? (
              playlists &&
              playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.playlistId}
                  playlist={playlist}
                  username={user.username}
                />
              ))
            ) : (
              <Text>You have no playlists yet.</Text>
            )}
          </Flex>
        </ScrollAreaAutosize>
      </div>
    </div>
  );
};

export default Sidebar;
