import "./player.css";
import { useCurrentSongContext, useTrackstackContext } from "../../App";
import { useRef } from "react";

const Player = () => {
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();
  const audioRef = useRef<any>();

  function handleOnPlayPause() {
    console.log("audioref current!", audioRef.current);
    console.log("is on pause?!", audioRef.current.paused);
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
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
      //   const newCurrentSong = {currentSong.indexInStack - 1,
      //     previousTrack.preview_url,
      //     "",
      //     previousTrack.name,
      //     previousTrack.artists[0].name}

      //   setCurrentSong((prevValue: {[key: string]: any})=>{
      //     return({prevValue.indexInStack,
      //         previousTrack.preview_url,
      //         "",
      //         previousTrack.name,
      //         previousTrack.artists[0].name})
      //     }
      //   );
    }
    // const previousTrackFormatted = {previousTrack.}
    // setCurrentSong({ indexInStack, songUrl, imgUrl, name, artist });

    // console.log("this is the previous song:", gonnagetit);
  }

  function handleOnMuteUnmute() {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = 1;
    } else {
      audioRef.current.volume = 0;
    }
  }

  console.log("currnt song ", currentSong);

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
          <button onClick={handleOnPlayPause}>play/pause</button>
          <button>next</button>
        </div>

        <div>
          <audio
            src={currentSong.songUrl}
            autoPlay={true}
            controls
            ref={audioRef}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="player-other-btns">
        <button>queue</button>
        <button onClick={handleOnMuteUnmute}>mute/unmute</button>
      </div>

      {/* <p>{song}</p>
      <p>{artist}</p> */}
    </div>
  );
};

export default Player;
