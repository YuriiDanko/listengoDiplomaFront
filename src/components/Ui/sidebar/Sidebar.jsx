import React from 'react';
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
import { IconAdjustments, IconPlus } from '@tabler/icons-react';
import PlaylistCard from '../playlistCard/PlaylistCard';

export const Sidebar = ({ logout, username }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={cl.sideBar}>
      <div className={cl.userSection}>
        <div>
          <Avatar src='' alt='avatar.png' size={'xl'} />
        </div>
        <div>{username}</div>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div className={cl.playlistSection}>
        <Divider my={'md'} />
        <Text>My Playlists</Text>
        <Modal opened={opened} onClose={close} title='Create Playlist'></Modal>
        <Flex align={'center'} gap={8}>
          <ActionIcon onClick={open} variant='filled' size='lg' radius='xl' aria-label='Settings'>
            <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          Create Playlist
        </Flex>
        <ScrollAreaAutosize h={650}>
          <Flex direction='column' gap={15}>
            <PlaylistCard name={'PlayList'} />
            <PlaylistCard name={'PlayListPlayList'} />
            <PlaylistCard name={'PlayListPlayList'} />
            <PlaylistCard name={'PlayList'} />
            <PlaylistCard name={'PlayListPlayList'} />
            <PlaylistCard name={'PlayList'} />
            <PlaylistCard name={'PlayList'} />
          </Flex>
        </ScrollAreaAutosize>
      </div>
    </div>
  );
};

export default Sidebar;
