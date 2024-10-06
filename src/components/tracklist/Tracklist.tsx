import "./tracklist.css";

import { useTStackCSongContext } from "../../App";
import SongrowTwo from "../song row/SongrowTwo";

import { Song } from "../../App";
const Tracklist = ({ tracks }: { tracks: Song[] }) => {
  const { setCurrentSong, setTrackStack } = useTStackCSongContext();

  function handleOnPlay(song: Song) {
    setCurrentSong(song);
    const newTrackStack = tracks.map((track: Song) => {
      const active = track.songUrl === song.songUrl;
      return { song: { ...track }, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="tracklist-container">
      {tracks.map((track: Song, index: number) => {
        return (
          <SongrowTwo
            key={index}
            song={track}
            handleOnPlay={handleOnPlay}
            includeIndex={true}
            includeImg={true}
            includeAlbum={true}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
