import { useCurrentSongContext, useTrackstackContext } from "../../App";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { Song } from "../../App";

export default function RecentTracks({ tracks }: { tracks: Song[] }) {
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
  console.log("tracks from recent tracks as sent by props", tracks);

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
