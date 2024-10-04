import "./tracklist.css";

import { useCurrentSongContext, useTrackstackContext } from "../../App";
import SongrowTwo from "../song row/SongrowTwo";

import { Song } from "../../App";
const Tracklist = ({ tracks }: { [key: string]: any }) => {
  const { setCurrentSong } = useCurrentSongContext();
  const { setTrackStack } = useTrackstackContext();

  function handleOnPlay(song: Song) {
    setCurrentSong(song);
    const newTrackStack = tracks.map((track: { [key: string]: any }) => {
      const active = track.preview_url === song.songUrl;
      //   console.log("returning obj: ", { ...track, isActive: active });
      return { ...track, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="tracklist-container">
      {tracks.map((track: { [key: string]: any }, index: number) => {
        return (
          <SongrowTwo
            index={index}
            song={track.name}
            album={track.album.name}
            artist={track.artists[0].name}
            duration={track.duration_ms}
            imgUrl={track.imgUrl}
            songUrl={track.preview_url}
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
