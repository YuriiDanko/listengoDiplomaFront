import React from 'react';
import cl from './Player.module.css';

const Player = () => {
  return (
    <div className={cl.player}>
      <div>MusicInfo</div>
      <div>Player</div>
      <div>SoundValue</div>
    </div>
  );
};

export default Player;
