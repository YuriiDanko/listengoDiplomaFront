import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import TrackCard, { TrackCardSkeleton } from '../components/Ui/trackCard/TrackCard';
import { useAuth } from '../hooks/auth';
import axios from 'axios';
import { Flex, ScrollArea, ScrollAreaAutosize, SimpleGrid } from '@mantine/core';

export const Recommendations = () => {
  const [tracks, setTracks] = useState([]);
  const { user } = useAuth();

  const getTracks = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:8080/recommendations/rock,metal`,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });
      const tracksId = response.data
        .map((track) => {
          return track.trackId;
        })
        .join(',');
      const tracksInfo = await axios({
        method: 'get',
        url: `http://localhost:8080/tracks/${tracksId}`,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });
      setTracks(tracksInfo.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div>
      <ScrollAreaAutosize h={780}>
        <SimpleGrid cols={7} p={30}>
          {tracks.length > 0
            ? tracks.map((track) => <TrackCard key={track.trackId} track={track} />)
            : Array.from(Array(21).keys()).map((index) => <TrackCardSkeleton key={index} />)}
        </SimpleGrid>
      </ScrollAreaAutosize>
      <div className='ai-recommendations'></div>
    </div>
  );
};

export default Recommendations;
