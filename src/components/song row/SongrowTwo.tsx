import { useEffect, useState } from "react";
import "./song-row-two.css";
import { useTokenContext, useTStackCSongContext } from "../../App";
import AsyncImg from "../async img/AsyncImg";
import { Song } from "../../App";
import { fetchWebApi } from "../../config/spotify";
const SongrowTwo = ({
  song,
  includeIndex = true,
  includeImg = false,
  includeAlbum = false,
  isSongSaved,
  handleOnPlay,
}: {
  song: Song;
  includeIndex?: boolean;
  includeImg?: boolean;
  includeAlbum?: boolean;
  isSongSaved?: boolean;
  handleOnPlay: (song: Song) => void;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isTrackSaved, setIsTrackSaved] = useState<boolean>(false);
  const { currentSong } = useTStackCSongContext();
  const { token } = useTokenContext();

  useEffect(() => {
    setIsPlaying(false);
    if (
      currentSong.indexInStack === song.indexInStack &&
      currentSong.songUrl === song.songUrl
    ) {
      setIsPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    if (isSongSaved !== undefined) {
      setIsTrackSaved(isSongSaved);
    }
  }, [isSongSaved]);

  async function handleOnClickLike(e: React.MouseEvent) {
    e.stopPropagation();
    await fetchWebApi("v1/me/tracks?ids=" + song.id, "PUT", token);
    setIsTrackSaved(true);
  }
  async function handleOnClickDislike(e: React.MouseEvent) {
    e.stopPropagation();

    await fetchWebApi("v1/me/tracks?ids=" + song.id, "DELETE", token);
    setIsTrackSaved(false);
  }

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
        !song.songUrl
          ? "unavailable"
          : isPlaying
          ? "playing"
          : isHover
          ? "hover"
          : ""
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
      {isSongSaved !== undefined ? (
        isTrackSaved ? (
          <div
            onClick={handleOnClickDislike}
            className="like-unlike-container liked"
          >
            <img
              onClickCapture={handleOnClickLike}
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fheart-filled.svg?alt=media&token=a0c22667-d829-4c43-9daa-809fe736d097"
              alt=""
            />
          </div>
        ) : (
          <div className="like-unlike-container not-liked">
            <img
              onClickCapture={handleOnClickLike}
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fheart-outline.svg?alt=media&token=8c749eed-6f1b-448f-90c9-a302e96e4be2"
              alt=""
            />
          </div>
        )
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
