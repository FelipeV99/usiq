import "./tracklist.css";

import { useCurrentSongContext, useTrackstackContext } from "../../App";
import Songrow from "../song row/Songrow";

const Tracklist = ({ tracks }: { [key: string]: any }) => {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();

  function handleOnPlay(
    indexInStack: number,
    songUrl: string,
    imgUrl: string,
    name: string,
    artist: string,
    trackDurationMs: number
  ) {
    setCurrentSong({
      indexInStack,
      songUrl,
      imgUrl,
      name,
      artist,
      trackDurationMs,
    });
    const newTrackStack = tracks.map((track: { [key: string]: any }) => {
      const active = track.preview_url === songUrl;
      //   console.log("returning obj: ", { ...track, isActive: active });
      return { ...track, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="tracklist-container">
      {tracks.map((track: { [key: string]: any }, index: number) => {
        return (
          <Songrow
            key={track.id}
            id={track.id}
            previewUrl={track.preview_url}
            imgUrl={track.imgUrl}
            name={track.name}
            albumName={track.album.name}
            artistName={track.artists[0].name}
            durationMS={track.duration_ms}
            index={index}
            handleOnPlay={handleOnPlay}
            isActive={track.isActive}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
