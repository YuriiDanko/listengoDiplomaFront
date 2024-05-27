import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackContext } from '../hooks/track';
import { Flex, Image, ScrollArea, Text } from '@mantine/core';
import AlbumTrackCard from '../components/Ui/Cards/AlbumTrackCard';
import axios from 'axios';
import { useAuth } from '../hooks/auth';

const AlbumPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { album } = location.state || {};
  const { clickAlbum } = useTrackContext();
  const [albumTracks, setAlbumTracks] = useState([]);

  const getAlbumTracks = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/albums/${album.albumId}/tracks`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    console.log(response.data);
    const tracksId = response.data
      .map((track) => {
        return track.trackId;
      })
      .join(',');

    const albumTracks = await axios({
      method: 'get',
      url: `http://localhost:8080/tracks/${tracksId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setAlbumTracks(albumTracks.data.tracks);
    clickAlbum(albumTracks.data.tracks);
  };

  useEffect(() => {
    getAlbumTracks();
  }, []);

  return (
    <Flex p={30} h={780} justify={'space-between'} w={'100%'}>
      <Flex direction={'column'} align={'center'} w={'50%'}>
        <Image src={album.imageUrl} w={500} pb={10} />
        <Text size='55px' pb={10}>
          {album.albumName}
        </Text>
        <Text size='40px'>{album.artistName}</Text>
      </Flex>
      <Flex w={'50%'} justify={'center'}>
        <ScrollArea h={700} type='always'>
          <Flex direction={'column'} gap={20} pr={20}>
            {albumTracks.length > 0 &&
              albumTracks.map((track, index) => (
                <AlbumTrackCard key={track.trackId} track={track} index={index} />
              ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default AlbumPage;
