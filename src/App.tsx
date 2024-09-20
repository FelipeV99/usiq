import { createContext, useContext, useEffect, useState } from "react";
import { fetchWebApi } from "./config/spotify";
import { Outlet } from "react-router-dom";
import Player from "./components/player/Player";
import Login from "./pages/auth/Login";
import Sidebar from "./components/sidebar/Sidebar";
// import Queue from "./components/queue/Queue";
import Topbar from "./components/topbar/Topbar";
// import axios from "axios";
// import { setClientToken } from "./config/spotify";

type Playlist = { [key: string]: any };
type Artist = { [key: string]: any };
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
type TrackStackContextType = { [index: string]: any };

const TokenContext = createContext<TokenContextType | null>(null);
const CurrentSongContext = createContext<CurrentSongContextType | null>(null);
const TrackStackContext = createContext<TrackStackContextType | null>(null);

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

export function useTrackstackContext() {
  const theTrackStackContext = useContext(TrackStackContext);
  //this is only true when trying to use context outside of provider
  if (theTrackStackContext == null) {
    throw new Error("must use within provider");
  }
  return theTrackStackContext;
}

function App() {
  const [token, setToken] = useState<string>("");

  const [userPlaylists, setUserPlaylists] = useState<{}[]>([]);
  const [userTopArtists, setUserTopArtists] = useState<{}[]>([]);
  const [trackStack, setTrackStack] = useState<{}[]>([]);
  const [currentSong, setCurrentSong] = useState<{
    songUrl?: string;
    imgUrl?: string;
    name?: string;
    artist?: string;
  }>({});
  const [isQueueVisible, setIsQueueVisible] = useState<boolean>(false);

  useEffect(() => {
    const thereIsHash = window.location.hash;
    let _token = "";

    if (thereIsHash) {
      console.log("there is hash, and it's:", thereIsHash);
      _token = thereIsHash.split("&")[0].split("=")[1];
      setToken(_token);
      window.localStorage.setItem("token", _token);
      window.location.hash = "";
    } else {
      _token = window.localStorage.getItem("token") || "undefined";
      if (_token === "undefined") {
        const hash = window.location.hash;
        _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
      } else {
        console.log("pullin token up from local storage");
        setToken(_token);
      }
    }

    // console.log("token from dash", _token);

    async function getUserPlaylists() {
      await fetchWebApi("v1/me/playlists", "GET", _token)
        .then((res) => {
          if (res.error) {
            setToken("expired");
          } else {
            setUserPlaylists(res.items.slice(0, 10));
          }
        })
        .catch((error) => console.log("error!", error));
    }
    getUserPlaylists();

    async function getTopArtists() {
      await fetchWebApi("v1/me/top/artists", "GET", _token).then((res) => {
        // console.log("topartists res", res);
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
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
        <TrackStackContext.Provider value={{ trackStack, setTrackStack }}>
          <div className="page-container">
            {token === "expired" ? (
              <Login />
            ) : (
              <>
                {" "}
                <Sidebar
                // isQueueVisible={isQueueVisible}
                // setIsQueueVisible={setIsQueueVisible}
                />
                <div className="right-container">
                  <div>
                    <Topbar />
                  </div>
                  <div className="content-container">
                    <Outlet />
                    {/* <Queue /> */}
                  </div>
                </div>
                <Player />
              </>
            )}
          </div>
        </TrackStackContext.Provider>
      </CurrentSongContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
