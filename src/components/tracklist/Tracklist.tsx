import "./tracklist.css";

import { useTStackCSongContext } from "../../App";
import SongrowTwo from "../song row/SongrowTwo";

import { Song } from "../../App";
import { useEffect } from "react";
const Tracklist = ({
  tracks,
  playFirst,
  areTracksSaved,
}: {
  tracks: Song[];
  playFirst?: number;
  areTracksSaved?: boolean[];
}) => {
  const { setCurrentSong, setTrackStack } = useTStackCSongContext();
  useEffect(() => {
    if (playFirst !== undefined && playFirst > 0) {
      playFirstTrack();
    }
  }, [playFirst]);
  function playFirstTrack() {
    setCurrentSong(tracks[0]);
    const newTrackStack = tracks.map((track: Song) => {
      const active = track.songUrl === tracks[0].songUrl;
      return { song: { ...track }, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  function handleOnPlay(song: Song) {
    if (song.songUrl) {
      setCurrentSong(song);
      const newTrackStack = tracks.map((track: Song) => {
        const active = track.songUrl === song.songUrl;
        return { song: { ...track }, isActive: active };
      });
      setTrackStack(newTrackStack);
    } else {
      window.alert("Track not available at the moment");
    }
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
            isSongSaved={
              areTracksSaved
                ? areTracksSaved.length > 1
                  ? areTracksSaved[index]
                  : undefined
                : undefined
            }
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
