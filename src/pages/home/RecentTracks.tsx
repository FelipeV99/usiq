import { useCurrentSongContext, useTrackstackContext } from "../../App";
import AsyncImg from "../../components/async img/AsyncImg";
import SongrowTwo from "../../components/song row/SongrowTwo";

export default function RecentTracks({ tracks }: { [key: string]: any }) {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();

  function msToHMS(ms: number) {
    const minutes = Math.floor((ms / 60000) % 60);

    const seconds = Math.floor((ms / 1000) % 60);

    const timeResult = [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return timeResult;
  }

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
    <div className="rt-container">
      <div className="rt-grid">
        {/* {tracks.map((track: { [key: string]: any }, index: number) => {
          return (
            <div
              className="song-row-2"
              onClick={() =>
                handleOnPlay(
                  index,
                  track.preview_url,
                  track.imgUrl,
                  track.name,
                  track.artists[0].name,
                  track.duration_ms
                )
              }
              key={index}
            >
              <div className="sr2-left">
                <div className="sr2-img-container">
                  <AsyncImg src={track.imgUrl} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="bold">{track.name}</p>
                  <p className="other-p">{track.artists[0].name}</p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="other-p">{msToHMS(track.duration_ms)}</p>
              </div>
            </div>
          );
        })} */}
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
