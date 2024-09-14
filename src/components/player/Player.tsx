import React from "react";
import { useCurrentSongContext } from "../../App";

const Player = ({ imgSrc }: { imgSrc: string }) => {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  console.log("src", imgSrc);
  return (
    <div>
      <h2>Music Player</h2>
      <p>{currentSong.name}</p>
      <img src={currentSong.imgUrl} alt="" />

      {/* <p>{song}</p>
      <p>{artist}</p> */}
    </div>
  );
};

export default Player;
