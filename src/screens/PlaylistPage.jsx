import { Flex, Image, ScrollArea, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import axios from 'axios';
import PlaylistTrackCard from '../components/Ui/Cards/PlaylistTrackCard';

const PlaylistPage = () => {
  const location = useLocation();
  const { playlist } = location.state || {};
  const { user } = useAuth();
  const [playlistTracks, setPlaylistTracks] = useState();

  const getPlaylistSong = async () => {
    if (playlist.songs.length > 0) {
      const songString =
        playlist &&
        playlist.songs
          .map((song) => {
            return song.trackId;
          })
          .join(',');

      console.log(songString);

      const response = await axios({
        method: 'get',
        url: `http://localhost:8080/tracks/${songString}`,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });

      setPlaylistTracks(response.data.tracks);
    } else {
      setPlaylistTracks([]);
    }
  };

  useEffect(() => {
    getPlaylistSong();
  }, [playlist.songs]);

  return (
    <Flex p={30} h={780} justify={'space-between'} w={'100%'}>
      <Flex direction={'column'} align={'center'} w={'50%'}>
        <Image src={playlist.imageUrl} w={500} pb={10} h={500} />
        <Text size='55px' pb={10}>
          {playlist.playlistName}
        </Text>
        <Text size='40px'>{user.username}</Text>
      </Flex>
      <Flex w={'50%'} justify={'center'}>
        <ScrollArea h={700} type='always'>
          <Flex direction={'column'} gap={20} pr={20}>
            {playlistTracks && playlistTracks.length > 0 ? (
              playlistTracks.map((track, index) => (
                <PlaylistTrackCard
                  key={track.trackId}
                  track={track}
                  index={index}
                  playlist={playlist}
                />
              ))
            ) : (
              <Text>There are no songs yet in Playlist</Text>
            )}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default PlaylistPage;