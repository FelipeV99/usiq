import React from "react";
// import { useCurrentSongContext, useTrackstackContext } from "../../App";

const Songrow = () => {
  //   const { currentSong, setCurrentSong } = useCurrentSongContext();
  //   const { trackStack, setTrackStack } = useTrackstackContext();
  //   function handleOnPlay(
  //     indexInStack: number,
  //     songUrl: string,
  //     imgUrl: string,
  //     name: string,
  //     artist: string
  //   ) {
  //     console.log("index form stack", indexInStack);
  //     setCurrentSong({ indexInStack, songUrl, imgUrl, name, artist });
  //     const newTrackStack = tracks.map((track: { [key: string]: any }) => {
  //       const active = track.preview_url === songUrl;
  //       //   console.log("returning obj: ", { ...track, isActive: active });
  //       return { ...track, isActive: active };
  //     });
  //     setTrackStack(newTrackStack);
  //   }
  return (
    <div className="track-row">
      <p>track name</p>
      <button>play</button>
    </div>
  );
};

export default Songrow;
