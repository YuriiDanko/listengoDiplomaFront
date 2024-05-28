import React, { createContext, useContext, useEffect, useState } from 'react';

const TrackContext = createContext();
export const useTrackContext = () => {
  return useContext(TrackContext);
};

export const TrackProvider = ({ children }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [tracks, setTracks] = useState(() => {
    const tracksString = localStorage.getItem('tracks');
    return tracksString ? JSON.parse(tracksString) : null;
  });

  useEffect(() => {
    const storedTrack = JSON.parse(localStorage.getItem('tracks'));
    const recentTracks = JSON.parse(localStorage.getItem('recently-played'));
    setRecentlyPlayed(recentTracks);
    if (storedTrack) {
      clickTrack(storedTrack);
    }
  }, []);

  const clickTrack = (clickedTrack) => {
    localStorage.setItem('tracks', JSON.stringify(clickedTrack));
    if (window.location.pathname !== '/') {
      let recentTracks = [];
      if (recentlyPlayed.length < 7) {
        recentTracks = [clickedTrack[0], ...recentlyPlayed];
        setRecentlyPlayed(recentTracks);
      } else {
        recentlyPlayed.pop();
        recentTracks = [clickedTrack[0], ...recentlyPlayed];
        setRecentlyPlayed(recentTracks);
      }
      localStorage.setItem('recently-played', JSON.stringify(recentTracks));
    }
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
    <TrackContext.Provider value={{ tracks, clickTrack, clickAlbum, removeTracks, recentlyPlayed }}>
      {children}
    </TrackContext.Provider>
  );
};
