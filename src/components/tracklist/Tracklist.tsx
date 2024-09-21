import "./tracklist.css";

import { useCurrentSongContext, useTrackstackContext } from "../../App";

const Tracklist = ({
  tracks,
  imgUrl,
}: {
  [key: string]: any;
  imgUrl?: string;
}) => {
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
    // console.log("index form stack", indexInStack);
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

  function formatTime(timeMS: number) {
    const timeS = Math.round(timeMS / 1000);
    const minutes = (timeS / 60).toString().split(".")[0];
    const seconds = (Number((timeS / 60).toString().split(".")[1]) * 60) / 100;
    console.log(timeS);
    console.log(minutes);
    // console.log(
    //   "seoncd",
    //   Math.round(seconds).toString().split("")[0],
    //   Math.round(seconds).toString().split("")[1]
    // );

    if (timeMS < 10000) {
      console.log("track is only single digits seconds long");
    }
    if (timeMS < 60000 && timeMS > 10000) {
      console.log("track is only seconds long");
    }
    if (timeMS > 60000) {
      console.log("track has minutes");
    }
  }
  formatTime(67419);

  // console.log("current trackStack: ", trackStack);
  console.log("the list of tracks passed to me: ", tracks);
  return (
    <div className="tracklist-container">
      {tracks.map((track: { [key: string]: any }, index: number) => {
        return (
          <div
            key={track.id}
            className="track-row"
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
          >
            <div className="track-row-left">
              <div className="track-img-container">
                <img src={track.imgUrl} alt="" />
              </div>
              <div className="track-row-info">
                <p className="bold">{track.name}</p>
                <p>{track.artists[0].name}</p>
              </div>
              <p>{track.album.name}</p>
            </div>
            {/* <div className="track-row-center"></div> */}
            <div className="track-row-right">
              <p>{track.duration_ms}</p>
            </div>

            {/* <button
              
            >
              play
            </button> */}
          </div>
        );
      })}
    </div>
  );
};

export default Tracklist;
