import { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchWebApi } from "./config/spotify";
import { Outlet } from "react-router-dom";
import Player from "./components/player/Player";
import Login from "./pages/auth/Login";
// import axios from "axios";
// import { setClientToken } from "./config/spotify";

type Playlist = { [key: string]: any };
type Artist = { [key: string]: any };
type Track = { [key: string]: any };
type TokenContextType = {
  token: string;
  setToken: any;
};
// type CurrentSongContextType = {
//   name: string;
//   artist: string;
//   album: string;
//   progress: number;
//   state: "playing" | "paused";
//   imgUrl: string;
// };
type CurrentSongContextType = { [index: string]: any };

const TokenContext = createContext<TokenContextType | null>(null);
const CurrentSongContext = createContext<CurrentSongContextType | null>(null);

export function useTokenContext() {
  const theTokenContext = useContext(TokenContext);
  //this is only true when trying to use context outside of provider
  if (theTokenContext == null) {
    throw new Error("must use within provider");
  }
  return theTokenContext;
}

export function useCurrentSongContext() {
  const theCurrentSongContext = useContext(CurrentSongContext);
  //this is only true when trying to use context outside of provider
  if (theCurrentSongContext == null) {
    throw new Error("must use within provider");
  }
  return theCurrentSongContext;
}

function App() {
  const [token, setToken] = useState<string>("");
  const audioRef = useRef<any>();

  // const [playerInfo, setPlayerInfo] = useState<{}>({});

  const [imgSrc, setImgSrc] = useState<string>("");
  const [userPlaylists, setUserPlaylists] = useState<{}[]>([]);
  const [userTopArtists, setUserTopArtists] = useState<{}[]>([]);
  const [userTopTracks, setUserTopTracks] = useState<{}[]>([]);
  const [playSong, setPlaySong] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<{
    songUrl?: string;
    imgUrl?: string;
    name?: string;
  }>({});

  useEffect(() => {
    const hash = window.location.hash;
    const _token = hash.split("&")[0].split("=")[1];
    window.localStorage.setItem("token", _token);
    setToken(_token);

    async function getUserPlaylists() {
      await fetchWebApi("v1/me/playlists", "GET", _token)
        .then((res) => {
          console.log("res", res);
          // if (res.error?.message === "The access token expired") {
          //   console.log("token expired!");
          //   setToken("expired");
          // }
          if (res.error) {
            setToken("expired");
          } else {
            console.log("no error, this is res", res.items);
            setUserPlaylists(res.items.slice(0, 10));
          }
        })
        .catch((error) => console.log("error!", error));
      // console.log(userPlaylists);
    }
    getUserPlaylists();

    async function getTopArtists() {
      await fetchWebApi("v1/me/top/artists", "GET", _token).then((res) => {
        console.log("topartists res", res);
        if (res.error) {
          console.log("error in top artists", res.error);
          if (res.error.status === 404) {
            console.error("404! not my fault", res.error);
          } else {
            setToken("expired");
          }
        } else {
          setUserTopArtists(res.items.slice(0, 10));
        }
      });
    }
    getTopArtists();

    async function getTopTracks() {
      await fetchWebApi("v1/me/top/tracks", "GET", _token).then((res) => {
        console.log("top tracks res", res);
        if (res.error) {
          console.log("error in top tracks", res.error);
          if (res.error.status === 404) {
            console.error("404! not my fault", res.error);
          } else {
            setToken("expired");
          }
        } else {
          setUserTopTracks(res.items.slice(0, 10));
        }
      });
    }
    getTopTracks();

    // async function getPlaybackState() {
    //   const playbackState = await fetchWebApi("v1/me/player", "GET", _token);
    //   console.log(playbackState);
    //   const albumImgSrc = playbackState.item.album.images[0].url;
    //   setImgSrc(albumImgSrc);
    // }
    // getPlaybackState();

    // async function play() {
    //   await fetchWebApi("v1/me/player/play", "PUT", _token, {
    //     context_uri: "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT",
    //   });
    // }
    // play();

    // setClientToken(_token);
  }, []);

  if (audioRef) {
    console.log(audioRef.current);
  }

  // new Audio("https://p.scdn.co/mp3-preview/8a2df3c3aa4180cea1412bdef71aa7bab4a3b773?cid=e5d6242f9f1a462caf4c3352c1761bf5")

  async function handleOnPlay(songUrl: string, imgUrl: string, name: string) {
    setCurrentSong({ songUrl, imgUrl, name });
    console.log("audio!!!", audioRef.current);
  }
  useEffect(() => {
    console.log("changed song!", audioRef.current);
  }, [currentSong]);

  function handleOnPause() {
    audioRef.current.pause();
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
        <div>
          {token === "expired" ? (
            <Login />
          ) : (
            <>
              {" "}
              <Outlet />
              <div>
                <h1>Playlists</h1>
                {userPlaylists.map((playlist: Playlist, index: number) => {
                  return <div key={index}>playlist {playlist.name}</div>;
                })}
              </div>
              <div>
                <h1>Artists</h1>
                {userTopArtists.map((artist: Artist, index: number) => {
                  return <div key={index}>{artist.name}</div>;
                })}
              </div>
              <div>
                <h1>Top tracks</h1>
                {userTopTracks.map((track: Track, index: number) => {
                  return (
                    <div key={index}>
                      <p>{track.name}</p>
                      <button
                        onClick={() =>
                          handleOnPlay(
                            track.preview_url,
                            track.album.images[0].url,
                            track.name
                          )
                        }
                      >
                        play
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* <button onClick={handleOnPlay}>play song</button> */}
              <Player imgSrc={imgSrc} />
              <audio
                src={currentSong.songUrl}
                autoPlay={true}
                controls
                ref={audioRef}
              />
              <p onClick={handleOnPause}>pause</p>
              <p>play</p>
            </>
          )}
        </div>
      </CurrentSongContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
