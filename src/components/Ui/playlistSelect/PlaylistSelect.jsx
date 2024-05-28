import { ActionIcon, Menu } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import axios from 'axios';

const PlaylistSelect = ({ track }) => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();

  const getPlaylists = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/get-playlists/${user.userId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setPlaylists(response.data);
  };

  const addSong = async (playlistId) => {
    await axios({
      method: 'put',
      url: `http://localhost:8080/add-song/${track.trackId}?playlistId=${playlistId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon
          radius={'xl'}
          onClick={() => {
            console.log('added');
          }}
        >
          <IconPlus height={20}></IconPlus>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Playlists</Menu.Label>
        {playlists.length > 0 &&
          playlists.map((playlist, index) => (
            <Menu.Item key={index} onClick={() => addSong(playlist.playlistId)}>
              {playlist.playlistName}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default PlaylistSelect;
