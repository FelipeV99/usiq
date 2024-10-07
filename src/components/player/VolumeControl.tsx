import React, { useState } from "react";
//volume state can be local to here, and have as prop the audioRef
const VolumeControl = ({ audioRef }: { audioRef: any }) => {
  const [isVolumeBarHover, setIsVolumeBarHover] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  function handleOnMuteUnmute() {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  }

  function handleOnVolumeChange(e: React.FormEvent<HTMLInputElement>) {
    if (audioRef.current) {
      if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
      setVolume(Number(e.currentTarget.value));
      audioRef.current.volume = Number(e.currentTarget.value) / 100;
    }
  }

  return (
    <div className="player-other-btns">
      <div onClick={handleOnMuteUnmute} className="mute-unmute-container">
        {isMuted ? (
          <img
            src={require("../../assets/Icons/volume-x.svg").default}
            alt=""
          />
        ) : (
          <img src={require("../../assets/Icons/volume.svg").default} alt="" />
        )}
      </div>

      <div
        className="volume-slider-container"
        onMouseEnter={() => setIsVolumeBarHover(true)}
        onMouseLeave={() => setIsVolumeBarHover(false)}
      >
        <div
          className={`volume-slider slider ${isVolumeBarHover ? "hover" : ""}`}
        >
          <input
            max={100}
            type="range"
            value={volume}
            onChange={handleOnVolumeChange}
            className="volume-input"
          />
          <progress
            max={100}
            value={volume}
            className="volume-progress"
          ></progress>
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
