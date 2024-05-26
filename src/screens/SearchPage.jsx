import { Flex, ScrollAreaAutosize, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TrackLine from '../components/Ui/Cards/TrackLine';
import axios from 'axios';
import { useAuth } from '../hooks/auth';
import AlbumCard, { AlbumCardSkeleton } from '../components/Ui/Cards/AlbumCard';
import { TrackCardSkeleton } from '../components/Ui/trackCard/TrackCard';
import ArtistCard, { ArtistCardSkeleton } from '../components/Ui/Cards/ArtistCard';

const SearchPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  const getSearchResponse = async () => {
    const searchResult = await axios({
      method: 'get',
      url: `http://localhost:8080/search/${searchParams.get('query')}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    const trackString = searchResult.data.tracks.map((track) => track.trackId).join(',');
    const albumsString = searchResult.data.albums.map((album) => album.albumId).join(',');
    const artistsString = searchResult.data.artists
      .slice(0, 1)
      .map((artist) => artist.artistId)
      .join(',');

    console.log(artistsString);

    const tracksResult = await axios({
      method: 'get',
      url: `http://localhost:8080/tracks/${trackString}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setTracks(tracksResult.data.tracks);

    const albumsResult = await axios({
      method: 'get',
      url: `http://localhost:8080/albums/${albumsString}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setAlbums(albumsResult.data.albums);

    const artistsResult = await axios({
      method: 'get',
      url: `http://localhost:8080/artists/${artistsString}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    setArtists(artistsResult.data.artists);
  };

  console.log(artists.data);

  useEffect(() => {
    getSearchResponse();
  }, [searchParams]);

  return (
    <ScrollAreaAutosize h={860}>
      <Flex p={30} direction={'column'} w={'100%'}>
        <Text fw={'bold'} pb={10}>
          Tracks
        </Text>
        <SimpleGrid cols={7}>
          {tracks.length > 0
            ? tracks.map((track) => <TrackLine key={track.trackId} track={track} />)
            : Array.from(Array(14).keys()).map((index) => <TrackCardSkeleton key={index} />)}
        </SimpleGrid>
        <Text fw={'bold'} pb={10} pt={10}>
          Albums
        </Text>
        <SimpleGrid cols={7}>
          {albums.length > 0
            ? albums.map((album) => <AlbumCard key={album.albumId} album={album} user={user} />)
            : Array.from(Array(14).keys()).map((index) => <AlbumCardSkeleton key={index} />)}
        </SimpleGrid>
        <Text fw={'bold'} pb={10} pt={10}>
          Top Artist Searched
        </Text>
        <Flex gap={30}>
          {artists.length > 0
            ? artists.map((artist) => <ArtistCard key={artist.artistId} artist={artist} />)
            : Array.from(Array(1).keys()).map((index) => <ArtistCardSkeleton key={index} />)}
        </Flex>
      </Flex>
    </ScrollAreaAutosize>
  );
};

export default SearchPage;
