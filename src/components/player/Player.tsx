import "./player.css";
import { useCurrentSongContext, useTrackstackContext } from "../../App";
import { useCallback, useEffect, useRef, useState } from "react";

const Player = () => {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();
  const audioRef = useRef<any>();

  const playAnimationRef = useRef<number | null>(null);

  const [volume, setVolume] = useState<number>(100);
  const [songProgress, setSongProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // console.log("gonna set is playing to true")
    // console.log("current song is:", currentSong)
    const isObjEmpty = Object.keys(currentSong).length === 0;
    if(!isObjEmpty){
      setSongProgress(0);
      setIsPlaying(true);
      startAnimation()
    }

  }, [currentSong]);

  const updateProgress = useCallback(()=>{
    // console.log("isplaying?", isPlaying)
    // if(isPlaying){
    //   console.log("updating progress...", new Date())
    //   const currentTime = audioRef.current.currentTime
    //   setSongProgress(currentTime)
    // }
          // console.log("updating progress...", new Date())
      const currentTime = audioRef.current.currentTime
      setSongProgress(currentTime)


  },[isPlaying])

  const startAnimation = useCallback(()=>{
    console.log("started animation")
    const animate = () =>{
      updateProgress()
      playAnimationRef.current = requestAnimationFrame(animate)
    }
    playAnimationRef.current = requestAnimationFrame(animate);
  },[isPlaying])




  // useEffect(() => {
  //   setIsPlaying(true);
  // }, []);

  // useEffect(() => {
  //   while (isPlaying === true) {
  //     setSongProgress(Number(audioRef.current.currentTime));
  //   }
  // }, [isPlaying]);

  function handleOnPlayPause() {
    // console.log("audioref current!", audioRef.current);
    // setIsPlaying((currentValue =>{
    //   return currentValue
    // }))
    // if(isPlaying){
    //   startAnimation()
    // }else{
    //   if (playAnimationRef.current !== null) {
    //     console.log("cancel animation")
    //     cancelAnimationFrame(playAnimationRef.current);
    //     playAnimationRef.current = null;
    //   }
    // }
    // if (audioRef.current.paused) {
    //   audioRef.current.play();
    // } else {
    //   audioRef.current.pause();

    // }

    if (isPlaying === false) {
      setIsPlaying(true)
      audioRef.current.play();
      startAnimation()
    } else {
      setIsPlaying(false)
      audioRef.current.pause();
      console.log("trying to cancel animation")
      if (playAnimationRef.current !== null) {
        console.log("cancel animation")
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
    }
    // if (isPlaying) {
    //   setIsPlaying(true);
    //   audioRef.current.play();
    //   startAnimation()
    // } else {
    //   setIsPlaying(false);
    //   audioRef.current.pause();

    //   if (playAnimationRef.current !== null) {
    //     console.log("cancel animation")
    //     cancelAnimationFrame(playAnimationRef.current);
    //     playAnimationRef.current = null;
    //   }
    // }
  }

  function handleOnPlayPrevious() {
    setSongProgress(0);

    //maybe i need the current track index and from there i can substract 1 to it and get the repvious track
    if (currentSong.indexInStack !== 0) {
      const previousTrack = trackStack.filter(
        (track: { [key: string]: any }, index: number) => {
          return index === currentSong.indexInStack - 1;
        }
      )[0];
      // console.log("this is the previous track", previousTrack);
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
      setSongProgress(0);

      const nextTrack = trackStack.filter(
        (track: { [key: string]: any }, index: number) => {
          return index === currentSong.indexInStack + 1;
        }
      )[0];
      // console.log("this is the next track", nextTrack);
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
    setVolume(Number(e.currentTarget.value));
    audioRef.current.volume = Number(e.currentTarget.value) / 100;
  }

  function handleOnProgressChange(e: React.FormEvent<HTMLInputElement>) {
    //what i need to do is set the max value of the progress tag to whatever the current song lasts
    setSongProgress(Number(e.currentTarget.value));

    audioRef.current.currentTime = Number(e.currentTarget.value);
  }

  // console.log("currnt song ", currentSong);
  // console.log("current track stack", trackStack);

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
