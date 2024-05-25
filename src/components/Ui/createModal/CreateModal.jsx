import { Button, Checkbox, Flex, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import axios from 'axios';

const CreateModal = ({ onClose, setPlaylists }) => {
  const { user } = useAuth();
  const [inputs, setInputs] = useState({
    playlistName: '',
    imageUrl: '',
    isPrivate: false,
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:8080/create-playlist/${user.userId}`,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
        data: {
          playlistName: inputs.playlistName,
          imageUrl: inputs.imageUrl,
          isPrivate: inputs.isPrivate,
        },
      });
      setPlaylists((previous) => [...previous, response.data]);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <Flex direction={'column'} gap={15}>
      <TextInput
        label='Playlist Name'
        placeholder='Enter name'
        value={inputs.playlistName}
        onChange={(e) => setInputs({ ...inputs, playlistName: e.target.value })}
      ></TextInput>
      <TextInput
        label='Playlist Image'
        placeholder='Enter imageUrl'
        value={inputs.imageUrl}
        onChange={(e) => setInputs({ ...inputs, imageUrl: e.target.value })}
      ></TextInput>
      <Checkbox
        label='Make this Playlist private'
        value={inputs.isPrivate}
        onChange={(e) => setInputs({ ...inputs, isPrivate: e.currentTarget.checked })}
      />
      <Button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Create Playlist
      </Button>
    </Flex>
  );
};

export default CreateModal;
