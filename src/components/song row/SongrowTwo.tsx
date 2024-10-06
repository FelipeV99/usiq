import { useEffect, useState } from "react";
import "./song-row-two.css";
import { useTStackCSongContext } from "../../App";
import AsyncImg from "../async img/AsyncImg";
import { Song } from "../../App";
const SongrowTwo = ({
  song,
  includeIndex = true,
  includeImg = false,
  includeAlbum = false,
  handleOnPlay,
}: {
  song: Song;
  includeIndex?: boolean;
  includeImg?: boolean;
  includeAlbum?: boolean;
  handleOnPlay: (song: Song) => void;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { currentSong } = useTStackCSongContext();

  useEffect(() => {
    setIsPlaying(false);
    if (
      currentSong.indexInStack === song.indexInStack &&
      currentSong.songUrl === song.songUrl
    ) {
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
      onClick={() => handleOnPlay(song)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="srt-left">
        {includeIndex ? (
          <p className="other-p srt-index">{song.indexInStack + 1}</p>
        ) : (
          <></>
        )}
        {includeImg ? (
          <div className="srt-img-container">
            <AsyncImg src={song.imgUrl} proportions={1} />
          </div>
        ) : (
          <></>
        )}

        <div>
          <p className="bold">{song.name}</p>
          <p>{song.artist}</p>
        </div>
      </div>
      {includeAlbum ? (
        <div className="srt-middle">
          <p className="other-p">{song.album}</p>
        </div>
      ) : (
        <></>
      )}

      <div>
        <p className="other-p">{msToHMS(song.trackDurationMs)}</p>
      </div>
    </div>
  );
};

export default SongrowTwo;
