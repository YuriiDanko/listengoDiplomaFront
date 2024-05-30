import { Flex, Image, ScrollArea, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import axios from 'axios';
import PlaylistTrackCard from '../components/Ui/Cards/PlaylistTrackCard';

const PlaylistPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState();
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [userName, setUserName] = useState();

  const getPlaylistSong = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/playlist/${id}/songs`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setPlaylist(response.data);

    const songString =
      response &&
      response.data.songs
        .map((song) => {
          return song.trackId;
        })
        .join(',');

    const tracksResponse = songString
      ? await axios({
          method: 'get',
          url: `http://localhost:8080/tracks/${songString}`,
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
      : { data: [] };

    const userNameresponse = await axios({
      method: 'get',
      url: `http://localhost:8080/user/${response.data.creator}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setUserName(userNameresponse.data.userName);

    setPlaylistTracks(tracksResponse.data.tracks);
  };

  useEffect(() => {
    getPlaylistSong();
  }, [id]);

  if (!playlist) {
    return;
  }

  return (
    <Flex p={30} h={780} justify={'space-between'} w={'100%'}>
      <Flex direction={'column'} align={'center'} justify={'center'} w={'50%'}>
        <Image src={playlist.imageUrl} w={500} pb={10} h={500} />
        <Text size='55px' pb={10}>
          {playlist.playlistName}
        </Text>
        <Text size='40px'>{userName}</Text>
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
                  playlists={playlistTracks}
                  setPlaylistTracks={setPlaylistTracks}
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
