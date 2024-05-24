import React, { createContext, useContext, useEffect, useState } from 'react';

const TrackContext = createContext();

export const useTrackContext = () => {
  return useContext(TrackContext);
};

export const TrackProvider = ({ children }) => {
  const [track, setTrack] = useState(() => {
    const trackString = localStorage.getItem('track');
    return trackString ? JSON.parse(trackString) : null;
  });

  useEffect(() => {
    const storedTrack = JSON.parse(localStorage.getItem('track'));
    if (storedTrack) {
      clickTrack(storedTrack);
    }
  }, []);

  const clickTrack = (clickedTrack) => {
    localStorage.setItem('track', JSON.stringify(clickedTrack));
    setTrack(clickedTrack);
  };

  const removeTrack = () => {
    setTrack(null);
    localStorage.removeItem('track');
  };

  return (
    <TrackContext.Provider value={{ track, clickTrack, removeTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
