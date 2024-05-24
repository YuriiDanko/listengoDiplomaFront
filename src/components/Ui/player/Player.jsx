import React from 'react';
import cl from './Player.module.css';
import PlayingTrackCard from '../playingTrack/PlayingTrackCard';
import { useTrackContext } from '../../../hooks/track';

const Player = () => {
  return (
    <div className={cl.player}>
      <PlayingTrackCard />
      <div>Player</div>
      <div>SoundValue</div>
    </div>
  );
};

export default Player;
