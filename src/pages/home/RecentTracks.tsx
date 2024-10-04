import { useCurrentSongContext, useTrackstackContext } from "../../App";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { Song } from "../../App";

export default function RecentTracks({ tracks }: { [key: string]: any }) {
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
    <div className="rt-container">
      <div className="rt-grid">
        {tracks.map((track: { [key: string]: any }, index: number) => {
          return (
            <SongrowTwo
              key={index}
              index={index}
              song={track.name}
              artist={track.artists[0].name}
              duration={track.duration_ms}
              imgUrl={track.imgUrl}
              songUrl={track.preview_url}
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
