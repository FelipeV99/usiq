import { useEffect, useState } from "react";
import "./song-row-two.css";
import { useCurrentSongContext } from "../../App";
const SongrowTwo = ({
  song,
  artist,
  duration,
  index,
  songUrl,
  imgUrl,
  handleOnPlay,
}: {
  song: string;
  artist: string;
  duration: number;
  index: number;
  songUrl: string;
  imgUrl: string;
  handleOnPlay: (
    indexInStack: number,
    songUrl: string,
    imgUrl: string,
    name: string,
    artist: string,
    trackDurationMs: number
  ) => void;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { currentSong } = useCurrentSongContext();

  useEffect(() => {
    setIsPlaying(false);
    if (currentSong.indexInStack === index && currentSong.songUrl === songUrl) {
      setIsPlaying(true);
      console.log("active tune is", song);
    } else {
      console.log("the following song is not active", song);
    }
  }, [currentSong]);

  function msToHMS(ms: number) {
    const minutes = Math.floor((ms / 60000) % 60);

    const seconds = Math.floor((ms / 1000) % 60);

    const timeResult = [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return timeResult;
  }

  return (
    <div
      className={`song-row-two ${
        isPlaying ? "playing" : isHover ? "hover" : ""
      }`}
      onClick={() =>
        handleOnPlay(index, songUrl, imgUrl, song, artist, duration)
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="srt-left">
        <p className="other-p srt-index">{index + 1}</p>
        <div>
          <p className="bold">{song}</p>
          <p>{artist}</p>
        </div>
      </div>
      <div>
        <p className="other-p">{msToHMS(duration)}</p>
      </div>
    </div>
  );
};

export default SongrowTwo;
