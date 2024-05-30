import { Card, Image, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import cl from './TrackLine.module.css';
import axios from 'axios';
import { useAuth } from '../../../hooks/auth';
import { useNavigate } from 'react-router-dom';

const PlayCard = ({ playlist }) => {
  const [username, setUsername] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getUserName = async () => {
    const userNameresponse = await axios({
      method: 'get',
      url: `http://localhost:8080/user/${playlist.creator}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setUsername(userNameresponse.data.userName);
  };

  const goToPlaylist = () => {
    navigate(`/playlist/${playlist.playlistId}`);
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <Card padding={'lg'} maw={225} shadow='xl' style={{ cursor: 'pointer' }}>
      <div>
        <Image src={playlist.imageUrl} />
      </div>
      <Card.Section inheritPadding>
        <Text
          size='md'
          fw={'bold'}
          truncate='end'
          pt={5}
          pb={10}
          className={cl.textDecor}
          onClick={() => {
            goToPlaylist();
          }}
        >
          {playlist.playlistName}
        </Text>
        <Text pb={5}>{username}</Text>
      </Card.Section>
    </Card>
  );
};

export const PlayCardSkeleton = () => {
  return <Skeleton maw={225} radius={'md'} height={260} />;
};

export default PlayCard;