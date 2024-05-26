import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const TrackContext = createContext();
export const useTrackContext = () => {
  return useContext(TrackContext);
};

export const TrackProvider = ({ children }) => {
  const [tracks, setTracks] = useState(() => {
    const tracksString = localStorage.getItem('tracks');
    return tracksString ? JSON.parse(tracksString) : null;
  });

  useEffect(() => {
    const storedTrack = JSON.parse(localStorage.getItem('track'));
    if (storedTrack) {
      clickTrack(storedTrack);
    }
  }, []);

  const clickTrack = (clickedTrack) => {
    localStorage.setItem('tracks', JSON.stringify([clickedTrack]));
    setTracks([clickedTrack]);
  };

  const clickAlbum = async (clickedAlbum, user) => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/albums/${clickedAlbum.albumId}/tracks`,
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

    localStorage.setItem('tracks', JSON.stringify(albumTracks.data.tracks));
    setTracks(albumTracks.data.tracks);
  };

  const removeTracks = () => {
    setTracks(null);
    localStorage.removeItem('tracks');
  };

  return (
    <TrackContext.Provider value={{ tracks, clickTrack, clickAlbum, removeTracks }}>
      {children}
    </TrackContext.Provider>
  );
};
