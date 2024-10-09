import "./player.css";
import { useTStackCSongContext } from "../../App";
import { useCallback, useEffect, useRef, useState } from "react";
import { Song } from "../../App";
import VolumeControl from "./VolumeControl";

const Player = () => {
  const { trackStack, setTrackStack, currentSong, setCurrentSong } =
    useTStackCSongContext();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAnimationRef = useRef<number | null>(null);

  const [songProgress, setSongProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSongBarHover, setIsSongBarHover] = useState<boolean>(false);
  const [isThereSong, setIsThereSong] = useState<boolean>(false);

  // useEffect(() => {
  //   function keyDownHandler(event: KeyboardEvent) {
  //     if (event.code === "Space") {
  //       event.preventDefault();
  //       handleOnPlayPause();
  //     }
  //   }
  //   document.addEventListener("keydown", keyDownHandler);
  //   return function cleanup() {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, [isPlaying]);

  useEffect(() => {
    if (currentSong.name !== "") {
      // console.log("theres a new current song", currentSong);
      setSongProgress(0);
      setIsPlaying(true);
      startAnimation();
      setIsThereSong(true);
    } else {
      setIsThereSong(false);
    }
  }, [currentSong]);

  const startAnimation = useCallback(() => {
    // console.log("start animation");
    const animate = () => {
      // updateProgress in DOM elements
      if (audioRef.current) {
        //update input range and progress bar
        const currentTime = audioRef.current.currentTime;
        //update the audio progress of the Audio HTML tag
        setSongProgress(currentTime);
        // console.log("update animation");
      }
      //animate, and store the request ID for cancelling the animation when needed
      playAnimationRef.current = requestAnimationFrame(animate);
    };
    //call it once to start, store the request ID for cancelling the animation when needed
    playAnimationRef.current = requestAnimationFrame(animate);
  }, []);

  function handleOnPlayPause() {
    //if there's no song do nothing
    if (isThereSong) {
      //if the song is not playing then play it
      if (isPlaying === false) {
        setIsPlaying(true);
        audioRef.current?.play();
        startAnimation();
        //if the song is playing then pause it
      } else {
        setIsPlaying(false);
        audioRef.current?.pause();
        //cancel animation and delete the request ID by setting the ref.current to null
        if (playAnimationRef.current !== null) {
          // console.log("cancel animation");
          cancelAnimationFrame(playAnimationRef.current);
          playAnimationRef.current = null;
        }
      }
    }
  }

  function handleOnPlayPrevious() {
    if (isThereSong) {
      if (currentSong.indexInStack !== 0) {
        //now update the track stack
        setTrackStack(
          (currentTrackStack: { song: Song; isActive: boolean }[]) => {
            return currentTrackStack.map(
              (track: { song: Song; isActive: boolean }, index: number) => {
                if (index === currentSong.indexInStack) {
                  return { song: { ...track.song }, isActive: false };
                }
                if (index === currentSong.indexInStack - 1) {
                  if (!track.song.songUrl) {
                    setCurrentSong({
                      id: "",
                      indexInStack: 0,
                      name: "",
                      artist: "",
                      album: "",
                      imgUrl: "",
                      songUrl: "",
                      trackDurationMs: 0,
                    });
                    window.alert("track unavailable right now");
                    return { song: { ...track.song }, isActive: false };
                  } else {
                    setCurrentSong({ ...track.song });
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      setSongProgress(0);
                    }
                    return { song: { ...track.song }, isActive: true };
                  }
                }
                return { ...track };
              }
            );
          }
        );
      } else {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          setSongProgress(0);
        }
      }
    }
  }

  function handleOnPlayNext() {
    if (isThereSong) {
      //while the current song is not the last in the current stack you can play the next
      if (currentSong.indexInStack !== trackStack.length - 1) {
        //update the track stack and current song
        setTrackStack(
          (currentTrackStack: { song: Song; isActive: boolean }[]) => {
            return currentTrackStack.map(
              (track: { song: Song; isActive: boolean }, index: number) => {
                //setting the previous track to inactive
                if (index === currentSong.indexInStack) {
                  return { song: { ...track.song }, isActive: false };
                }
                //setting the new track to active
                if (index === currentSong.indexInStack + 1) {
                  if (!track.song.songUrl) {
                    setCurrentSong({
                      id: "",
                      indexInStack: 0,
                      name: "",
                      artist: "",
                      album: "",
                      imgUrl: "",
                      songUrl: "",
                      trackDurationMs: 0,
                    });
                    window.alert("track unavailable right now");
                    return { song: { ...track.song }, isActive: false };
                  } else {
                    setCurrentSong({ ...track.song });
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      //restarting the song when it's going from song A to song A
                      audioRef.current.src = "";
                      audioRef.current.src = track.song.songUrl;
                    }
                    return { song: { ...track.song }, isActive: true };
                  }
                }
                return { ...track };
              }
            );
          }
        );
      }
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
                  max={audioRef.current ? audioRef.current.duration : 0}
                  value={songProgress}
                  onChange={handleOnProgressChange}
                  className="song-progress-input"
                  disabled={isThereSong ? false : true}
                />
                <progress
                  className="song-progress-progress"
                  max={audioRef.current ? audioRef.current.duration : 0}
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
        <VolumeControl audioRef={audioRef} />
      </div>
    </div>
  );
};

export default Player;
