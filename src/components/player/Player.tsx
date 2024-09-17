import "./player.css";
import { useCurrentSongContext, useTrackstackContext } from "../../App";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();
  const audioRef = useRef<any>();

  const [volume, setVolume] = useState<number>(100);
  const [songProgress, setSongProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(() => true);

  useEffect(() => {
    setSongProgress(0);
    setIsPlaying(true);
  }, [currentSong]);

  // useEffect(() => {
  //   setIsPlaying(true);
  // }, []);

  // useEffect(() => {
  //   while (isPlaying === true) {
  //     setSongProgress(Number(audioRef.current.currentTime));
  //   }
  // }, [isPlaying]);

  function handleOnPlayPause() {
    console.log("audioref current!", audioRef.current);
    if (audioRef.current.paused) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
    console.log("is on pause?!", audioRef.current.paused);
  }

  function handleOnPlayPrevious() {
    //maybe i need the current track index and from there i can substract 1 to it and get the repvious track
    if (currentSong.indexInStack !== 0) {
      const previousTrack = trackStack.filter(
        (track: { [key: string]: any }, index: number) => {
          return index === currentSong.indexInStack - 1;
        }
      )[0];
      console.log("this is the previous track", previousTrack);
      const newCurrentSong: { [key: string]: any } = {
        indexInStack: currentSong.indexInStack - 1,
        songUrl: previousTrack.preview_url,
        imgUrl: previousTrack.imgUrl,
        name: previousTrack.name,
        artist: previousTrack.artists[0].name,
        trackDurationMs: previousTrack.duration_ms,
      };

      setCurrentSong(newCurrentSong);
      //now update the track stack
      setTrackStack((currentTrackStack: { [key: string]: any }) => {
        // console.log("current track stack from the prev", currentTrackStack);
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
      audioRef.current.currentTime = 0;
    }
    // const previousTrackFormatted = {previousTrack.}
    // setCurrentSong({ indexInStack, songUrl, imgUrl, name, artist });

    // console.log("this is the previous song:", gonnagetit);
  }

  function handleOnPlayNext() {
    if (currentSong.indexInStack !== trackStack.length - 1) {
      const nextTrack = trackStack.filter(
        (track: { [key: string]: any }, index: number) => {
          return index === currentSong.indexInStack + 1;
        }
      )[0];
      console.log("this is the next track", nextTrack);
      const newCurrentSong: { [key: string]: any } = {
        indexInStack: currentSong.indexInStack + 1,
        songUrl: nextTrack.preview_url,
        imgUrl: nextTrack.imgUrl,
        name: nextTrack.name,
        artist: nextTrack.artists[0].name,
        trackDurationMs: nextTrack.duration_ms,
      };

      setCurrentSong(newCurrentSong);
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

  function handleOnMuteUnmute() {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = volume / 100;
    } else {
      audioRef.current.volume = 0;
    }
  }

  function handleOnVolumeChange(e: React.FormEvent<HTMLInputElement>) {
    console.log("handling volume change");
    console.log(
      "volume event",
      Number(e.currentTarget.value),
      typeof e.currentTarget.value
    );
    setVolume(Number(e.currentTarget.value));
    audioRef.current.volume = Number(e.currentTarget.value) / 100;
    console.log(audioRef.current);
  }

  function handleOnProgressChange(e: React.FormEvent<HTMLInputElement>) {
    //what i need to do is set the max value of the progress tag to whatever the current song lasts
    console.log("current song progress: ", audioRef.current);
    console.log(
      "gonna set the track progress to the second: ",
      Number(e.currentTarget.value)
    );
    setSongProgress(Number(e.currentTarget.value));

    audioRef.current.currentTime = Number(e.currentTarget.value);
  }
  function handlePlayingProgress() {
    console.log("playing progress");
    setSongProgress(Number(audioRef.current.currentTime));
  }

  console.log("currnt song ", currentSong);
  console.log("current track stack", trackStack);

  return (
    <div className="player-container">
      <div className="song-info">
        <div className="song-info-left">
          <img className="img-fit" src={currentSong.imgUrl} alt="" />
        </div>
        <div className="song-info-right">
          <p>{currentSong.name}</p>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-main-btns">
        <div className="player-main-btns-top">
          <button onClick={handleOnPlayPrevious}>previous</button>
          <button onClick={handleOnPlayPause}>
            {isPlaying ? "pause" : "play"}
          </button>
          <button onClick={handleOnPlayNext}>next</button>
        </div>
        <div className="player-main-btns-bottom">
          <div className="song-progress-slider">
            <div className="slider">
              <input
                type="range"
                // max={currentSong.trackDurationMs}
                max={30.0}
                value={songProgress}
                onChange={handleOnProgressChange}
              />
              <progress
                // max={currentSong.trackDurationMs}
                max={30.0}
                value={songProgress}
              ></progress>
            </div>
          </div>
        </div>

        <div>
          <audio
            src={currentSong.songUrl}
            autoPlay={true}
            controls
            ref={audioRef}
            style={{ display: "none" }}
            onEnded={handleOnPlayNext}
            // onPlaying={handlePlayingProgress}
            onChange={handlePlayingProgress}
          />
        </div>
      </div>
      <div className="player-other-btns">
        {/* <button>queue</button> */}
        <div className="volume-slider">
          <div className="slider">
            <input
              type="range"
              value={volume}
              onChange={handleOnVolumeChange}
            />
            <progress max={100} value={volume}></progress>
          </div>
        </div>
        <button onClick={handleOnMuteUnmute}>mute/unmute</button>
      </div>

      {/* <p>{song}</p>
      <p>{artist}</p> */}
    </div>
  );
};

export default Player;
