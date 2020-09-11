import React from 'react';

const Player = () => {

  return (
    <div className="player">
      <video controls autoplay>
        <source src="" type="video/mp4" />
      </video>
      <div className="Player-back">
        <button type="button">
          Home
        </button>
      </div>
    </div>
  );
}

export default Player;