import { useEffect, useState } from "react";
import "./song-row-two.css";
import { useCurrentSongContext } from "../../App";
import AsyncImg from "../async img/AsyncImg";
const SongrowTwo = ({
  song,
  album,
  artist,
  duration,
  index,
  songUrl,
  imgUrl,
  includeIndex = true,
  includeImg = false,
  includeAlbum = false,
  handleOnPlay,
}: {
  song: string;
  album?: string;
  artist: string;
  duration: number;
  index: number;
  songUrl: string;
  imgUrl: string;
  includeIndex?: boolean;
  includeImg?: boolean;
  includeAlbum?: boolean;
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
        {includeIndex ? (
          <p className="other-p srt-index">{index + 1}</p>
        ) : (
          <></>
        )}
        {includeImg ? (
          <div className="srt-img-container">
            <AsyncImg src={imgUrl} proportions={1} />
          </div>
        ) : (
          <></>
        )}

        <div>
          <p className="bold">{song}</p>
          <p>{artist}</p>
        </div>
      </div>
      {includeAlbum ? (
        <div className="srt-middle">
          <p className="other-p">{album}</p>
        </div>
      ) : (
        <></>
      )}

      <div>
        <p className="other-p">{msToHMS(duration)}</p>
      </div>
    </div>
  );
};

export default SongrowTwo;
