import "./tracklist.css";

import { useCurrentSongContext, useTrackstackContext } from "../../App";

const Tracklist = ({
  tracks,
  imgUrl,
}: {
  [key: string]: any;
  imgUrl: string;
}) => {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();

  function handleOnPlay(
    indexInStack: number,
    songUrl: string,
    imgUrl: string,
    name: string,
    artist: string
  ) {
    console.log("index form stack", indexInStack);
    setCurrentSong({ indexInStack, songUrl, imgUrl, name, artist });
    const newTrackStack = tracks.map((track: { [key: string]: any }) => {
      const active = track.preview_url === songUrl;
      //   console.log("returning obj: ", { ...track, isActive: active });
      return { ...track, isActive: active };
    });
    setTrackStack(newTrackStack);
  }
  console.log("current trackStack: ", trackStack);
  return (
    <div>
      <h2>tracklist</h2>
      <div>
        {tracks.map((track: { [key: string]: any }, index: number) => {
          return (
            <div key={track.id} className="track-row">
              <p>{track.name}</p>
              <button
                onClick={() =>
                  handleOnPlay(
                    index,
                    track.preview_url,
                    imgUrl,
                    track.name,
                    track.artists[0].name
                  )
                }
              >
                play
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracklist;
