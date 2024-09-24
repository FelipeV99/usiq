import "./song-row.css";

import { useState } from "react";

const Songrow = ({
  id,
  previewUrl,
  imgUrl,
  name,
  albumName,
  artistName,
  durationMS,
  index,
  handleOnPlay,
  isActive,
}: {
  id: string;
  previewUrl: string;
  imgUrl: string;
  name: string;
  albumName: string;
  artistName: string;
  durationMS: number;
  index: number;
  isActive: boolean;
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

  function msToHMS(ms: number) {
    const minutes = Math.floor((ms / 60000) % 60);

    const seconds = Math.floor((ms / 1000) % 60);

    const timeResult = [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return timeResult;
  }

  // console.log("is ", name, "active? ", isActive);

  return (
    <div
      // className={`track-row ${isHover ? "hover" : ""}`}
      className={`track-row ${isActive ? "active" : isHover ? "hover" : ""}`}
      onClick={() =>
        handleOnPlay(index, previewUrl, imgUrl, name, artistName, durationMS)
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="track-row-left">
        <div className="track-img-container">
          <img src={imgUrl} alt="" />
        </div>
        <div className="track-row-info">
          <p className="bold">{name}</p>
          <p>{artistName}</p>
        </div>
        <p className="other-p">{albumName}</p>
      </div>
      <div className="track-row-right">
        <p className="other-p">{msToHMS(durationMS)}</p>
      </div>
    </div>
  );
};

export default Songrow;
