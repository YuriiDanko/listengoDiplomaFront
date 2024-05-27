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
    const storedTrack = JSON.parse(localStorage.getItem('tracks'));
    if (storedTrack) {
      clickTrack(storedTrack);
    }
  }, []);

  const clickTrack = (clickedTrack) => {
    localStorage.setItem('tracks', JSON.stringify(clickedTrack));
    setTracks(clickedTrack);
  };

  const clickAlbum = (clickedAlbum) => {
    localStorage.setItem('tracks', JSON.stringify(clickedAlbum));
    setTracks(clickedAlbum);
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
