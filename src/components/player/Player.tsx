import "./player.css";
import { useTStackCSongContext } from "../../App";
import { useCallback, useEffect, useRef, useState } from "react";
import { Song } from "../../App";
const Player = () => {
  const { trackStack, setTrackStack, currentSong, setCurrentSong } =
    useTStackCSongContext();

  const audioRef = useRef<HTMLAudioElement>(null);
  const playAnimationRef = useRef<number | null>(null);
  const valueRef = useRef(0);
  valueRef.current = 2;

  const [volume, setVolume] = useState<number>(100);
  const [songProgress, setSongProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSongBarHover, setIsSongBarHover] = useState<boolean>(false);
  const [isVolumeBarHover, setIsVolumeBarHover] = useState<boolean>(false);
  const [isThereSong, setIsThereSong] = useState<boolean>(false);

  useEffect(() => {
    function keyDownHandler(event: KeyboardEvent) {
      if (event.code === "Space") {
        event.preventDefault();
        handleOnPlayPause();
      }
    }
    document.addEventListener("keydown", keyDownHandler);
    return function cleanup() {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong.name === "") {
      setIsThereSong(false);
    } else {
      setIsThereSong(true);
    }
  }, [currentSong]);

  useEffect(() => {
    const isObjEmpty = currentSong.name === "";
    if (!isObjEmpty) {
      setSongProgress(0);
      setIsPlaying(true);
      startAnimation();
      setIsThereSong(true);
    }
  }, [currentSong]);

  const startAnimation = useCallback(() => {
    console.log("start animation");
    const animate = () => {
      // updateProgress in DOM elements
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        setSongProgress(currentTime);
        // console.log("update animation");
      }
      //animate, and store the request ID for cancelling the animation when needed
      playAnimationRef.current = requestAnimationFrame(animate);
    };
    //call it once to start
    playAnimationRef.current = requestAnimationFrame(animate);
  }, []);

  function handleOnPlayPause() {
    if (isThereSong) {
      if (isPlaying === false) {
        setIsPlaying(true);
        audioRef.current?.play();
        startAnimation();
      } else {
        setIsPlaying(false);
        audioRef.current?.pause();
        if (playAnimationRef.current !== null) {
          console.log("cancel animation");
          cancelAnimationFrame(playAnimationRef.current);
          playAnimationRef.current = null;
        }
      }
    }
  }

  function handleOnPlayPrevious() {
    if (isThereSong) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }

      setSongProgress(0);

      if (currentSong.indexInStack !== 0) {
        const previousTrack = trackStack.filter(
          (track: { [key: string]: any }, index: number) => {
            return index === currentSong.indexInStack - 1;
          }
        )[0];
        const newCurrentSong: { song: Song; isActive: boolean } = {
          song: {
            indexInStack: currentSong.indexInStack - 1,
            songUrl: previousTrack.song.songUrl,
            imgUrl: previousTrack.song.imgUrl,
            name: previousTrack.song.name,
            album: previousTrack.song.album,
            artist: previousTrack.song.artist,
            trackDurationMs: previousTrack.song.trackDurationMs,
          },
          isActive: true,
        };

        setCurrentSong(newCurrentSong.song);
        //now update the track stack
        setTrackStack((currentTrackStack: { [key: string]: any }) => {
          return currentTrackStack.map(
            (track: { [key: string]: any }, index: number) => {
              if (index === currentSong.indexInStack) {
                return { ...track, isActive: false };
              }
              if (index === currentSong.indexInStack - 1) {
                return { ...track, isActive: true };
              }
              return { ...track };
            }
          );
        });
      } else {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      }
    }
  }

  function handleOnPlayNext() {
    if (isThereSong) {
      if (currentSong.indexInStack !== trackStack.length - 1) {
        // console.log("moving onto next track");
        setSongProgress(0);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }

        const nextTrack = trackStack.filter(
          (track: { [key: string]: any }, index: number) => {
            return index === currentSong.indexInStack + 1;
          }
        )[0];
        // console.log("this is the next track", nextTrack);
        const newCurrentSong: { song: Song; isActive: boolean } = {
          song: {
            indexInStack: currentSong.indexInStack + 1,
            songUrl: nextTrack.song.songUrl,
            imgUrl: nextTrack.song.imgUrl,
            name: nextTrack.song.name,
            album: nextTrack.song.album,
            artist: nextTrack.song.artist,
            trackDurationMs: nextTrack.song.trackDurationMs,
          },
          isActive: true,
        };
        // audioRef.current.

        setCurrentSong(newCurrentSong.song);
        //now update the track stack
        setTrackStack((currentTrackStack: { [key: string]: any }) => {
          // console.log("current track stack from the prev", currentTrackStack);
          return currentTrackStack.map(
            (track: { [key: string]: any }, index: number) => {
              if (index === currentSong.indexInStack) {
                return { ...track, isActive: false };
              }
              if (index === currentSong.indexInStack + 1) {
                return { ...track, isActive: true };
              }
              return { ...track };
            }
          );
        });
      }
    }
  }

  function handleOnMuteUnmute() {
    if (audioRef.current) {
      if (audioRef.current.volume === 0) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }

  function handleOnVolumeChange(e: React.FormEvent<HTMLInputElement>) {
    if (isMuted) {
      setIsMuted(false);
    }
    setVolume(Number(e.currentTarget.value));
    if (audioRef.current) {
      audioRef.current.volume = Number(e.currentTarget.value) / 100;
    }
  }

  function handleOnProgressChange(e: React.FormEvent<HTMLInputElement>) {
    setSongProgress(Number(e.currentTarget.value));
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.currentTarget.value);
    }
  }

  function formatTime(time: number) {
    const roundedTime = Math.round(time);

    if (roundedTime < 10) {
      return `0:0${roundedTime}`;
    }
    return `0:${roundedTime}`;
  }

  return (
    <div className="player-outer-container">
      <div className="player-container">
        <div className="song-info">
          <div className="song-info-left">
            {currentSong.imgUrl ? (
              <img className="img-fit" src={currentSong.imgUrl} alt="" />
            ) : (
              <></>
            )}
          </div>
          <div className="song-info-right">
            <p className="bold">{currentSong.name}</p>
            <p className="other-p">{currentSong.artist}</p>
          </div>
        </div>

        <div className="player-main-btns">
          <div className="player-main-btns-top">
            <div
              onClick={handleOnPlayPrevious}
              className={`skip-back-container ${
                isThereSong ? undefined : "disabled"
              }`}
            >
              <img
                src={require("../../assets/Icons/skip-back.svg").default}
                alt=""
              />
            </div>
            <div
              className={`play-pause-container ${
                isThereSong ? undefined : "disabled"
              }`}
              onClick={handleOnPlayPause}
            >
              {isPlaying ? (
                <img
                  src={require("../../assets/Icons/pause.svg").default}
                  alt=""
                />
              ) : (
                <img
                  src={require("../../assets/Icons/play.svg").default}
                  alt=""
                />
              )}
            </div>

            <div
              onClick={handleOnPlayNext}
              className={`skip-forward-container ${
                isThereSong ? undefined : "disabled"
              }`}
            >
              <img
                src={require("../../assets/Icons/skip-forward.svg").default}
                alt=""
              />
            </div>
          </div>
          <div
            className="player-main-btns-bottom"
            onMouseEnter={() => setIsSongBarHover(true)}
            onMouseLeave={() => setIsSongBarHover(false)}
          >
            {/* <p>{audioRef?.current?.currentTime}</p> */}
            <p className="other-p">
              {audioRef.current
                ? !isNaN(audioRef.current.currentTime)
                  ? formatTime(audioRef.current.currentTime)
                  : "0:00"
                : "0:00"}
            </p>

            <div className="song-progress-container">
              <div
                className={`song-progress-slider slider ${
                  isSongBarHover ? "hover" : ""
                }`}
              >
                <input
                  type="range"
                  // min={0}
                  max={30.0}
                  value={songProgress}
                  onChange={handleOnProgressChange}
                  className="song-progress-input"
                />
                <progress
                  className="song-progress-progress"
                  max={30.0}
                  value={songProgress}
                ></progress>
              </div>
            </div>
            {/* <p>{audioRef?.current?.duration}</p> */}
            <p className="other-p">
              {audioRef.current
                ? !isNaN(audioRef.current.duration)
                  ? formatTime(audioRef.current.duration)
                  : "0:00"
                : "0:00"}
            </p>
          </div>

          <audio
            src={currentSong.songUrl}
            autoPlay={true}
            controls
            ref={audioRef}
            style={{ display: "none" }}
            onEnded={handleOnPlayNext}
          />
        </div>
        <div className="player-other-btns">
          {/* <button onClick={()=>setIsQueueVisible((currentValue)=>!currentValue)}>queue</button> */}
          <div onClick={handleOnMuteUnmute} className="mute-unmute-container">
            {isMuted ? (
              <img
                src={require("../../assets/Icons/volume-x.svg").default}
                alt=""
              />
            ) : (
              <img
                src={require("../../assets/Icons/volume.svg").default}
                alt=""
              />
            )}
          </div>

          <div
            className="volume-slider-container"
            onMouseEnter={() => setIsVolumeBarHover(true)}
            onMouseLeave={() => setIsVolumeBarHover(false)}
          >
            <div
              className={`volume-slider slider ${
                isVolumeBarHover ? "hover" : ""
              }`}
            >
              <input
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
      </div>
    </div>
  );
};

export default Player;
