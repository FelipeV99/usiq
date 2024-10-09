import { useTStackCSongContext } from "../../App";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { Song } from "../../App";

export default function RecentTracks({ tracks }: { tracks: Song[] }) {
  const { setCurrentSong, setTrackStack } = useTStackCSongContext();

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
    <div className="rt-container">
      <div className="rt-grid">
        {tracks.map((track: Song, index: number) => {
          return (
            <SongrowTwo
              key={index}
              song={track}
              handleOnPlay={handleOnPlay}
              includeIndex={false}
              includeImg={true}
            />
          );
        })}
      </div>
    </div>
  );
}
