import { Flex, Image, ScrollArea, ScrollAreaAutosize, Text } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import AlbumTrackCard from '../components/Ui/Cards/AlbumTrackCard';
import AlbumCard from '../components/Ui/Cards/AlbumCard';

const ArtistPage = () => {
  const location = useLocation();
  const { artistId } = location.state || {};
  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState([]);
  const { user } = useAuth();
  const [albums, setAlbums] = useState([]);

  const getArtist = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/artists/${artistId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setArtist(response.data.artists[0]);
  };

  const getArtistTopTracks = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/artists/${artistId}/top-tracks`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    const tracksString = response.data
      .map((track) => {
        return track.trackId;
      })
      .join(',');

    const tracksResponse = await axios({
      method: 'get',
      url: `http://localhost:8080/tracks/${tracksString}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setTopTracks(tracksResponse.data.tracks);
  };

  const getArtistsAlbums = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/artist/${artistId}/albums`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    const albumsString = response.data
      .map((album) => {
        return album.albumId;
      })
      .join(',');

    const albumsResponse = await axios({
      method: 'get',
      url: `http://localhost:8080/albums/${albumsString}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setAlbums(albumsResponse.data.albums);
  };

  useEffect(() => {
    getArtist();
    getArtistTopTracks();
    getArtistsAlbums();
  }, []);

  return (
    <Flex p={30}>
      <Flex w={'30%'} direction={'column'} justify={'center'} align={'center'} h={700}>
        <Image src={artist ? artist.imageUrl : ''} w={400} />
        <Text mt={15} size='xl'>
          {artist ? artist.artistName : ''}
        </Text>
      </Flex>
      <Flex w={'70%'} align={'center'} direction={'column'}>
        <Text size='xl'>{artist ? artist.artistName : ''} Top Tracks and Albums:</Text>
        <Flex>
          <ScrollArea h={380} type='always' pr={25} itemType={'always'}>
            <Flex direction={'column'} gap={20}>
              {topTracks.length > 0 &&
                topTracks.map((track, index) => (
                  <AlbumTrackCard key={track.trackId} track={track} index={index} />
                ))}
            </Flex>
          </ScrollArea>
        </Flex>
        <Flex pt={20}>
          <ScrollArea w={1000} type='always' pr={25} itemType={'always'} pb={20}>
            <Flex gap={20}>
              {albums.length > 0 &&
                albums.map((album) => <AlbumCard key={album.albumId} album={album} user={user} />)}
            </Flex>
          </ScrollArea>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ArtistPage;
