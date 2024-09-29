import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Player from "./components/player/Player";
import Login from "./pages/auth/Login";
import Sidebar from "./components/sidebar/Sidebar";
// import Queue from "./components/queue/Queue";
import Topbar from "./components/topbar/Topbar";
import HomeSkeleton from "./pages/home/HomeSkeleton";
import DiscoverSkeleton from "./pages/discover/DiscoverSkeleton";
import MyArtistsSkeleton from "./pages/my artists/MyArtistsSkeleton";
import MyAlbumsSkeleton from "./pages/my albums/MyAlbumsSkeleton";
import MySongsSkeleton from "./pages/my songs/MySongsSkeleton";
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
type CurrentPageContextType = {
  currentPage: string;
  setCurrentPage: any;
};

const TokenContext = createContext<TokenContextType | null>(null);
const CurrentSongContext = createContext<CurrentSongContextType | null>(null);
const TrackStackContext = createContext<TrackStackContextType | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

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

export function useCurrentPageContext() {
  const theCurrentPageContext = useContext(CurrentPageContext);
  //this is only true when trying to use context outside of provider
  if (theCurrentPageContext == null) {
    throw new Error("must use within provider");
  }
  return theCurrentPageContext;
}

function App() {
  const [token, setToken] = useState<string>("");
  const [trackStack, setTrackStack] = useState<{}[]>([]);
  const [currentSong, setCurrentSong] = useState<{
    songUrl?: string;
    imgUrl?: string;
    name?: string;
    artist?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const { state } = useNavigation();
  // const [isQueueVisible, setIsQueueVisible] = useState<boolean>(false);

  useEffect(() => {
    const thereIsHash = window.location.hash;
    let _token = "";

    if (thereIsHash) {
      _token = thereIsHash.split("&")[0].split("=")[1];
      setToken(_token);
      window.localStorage.setItem("token", _token);
      window.location.hash = "";
    } else {
      _token = window.localStorage.getItem("token") || "";
      if (_token === "") {
        const hash = window.location.hash;
        _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
      } else {
        // console.log("pullin token up from local storage");
        setToken(_token);
      }
    }
  }, []);

  function loadSkeleton() {
    switch (currentPage) {
      case "Home":
        return <HomeSkeleton />;
      case "Discover":
        return <DiscoverSkeleton />;
      case "Artists":
        return <MyArtistsSkeleton />;
      case "Albums":
        return <MyAlbumsSkeleton />;
      case "Songs":
        return <MySongsSkeleton />;
    }
  }

  console.log("state!", state, "and current page = ", currentPage);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
        <TrackStackContext.Provider value={{ trackStack, setTrackStack }}>
          <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <div className="page-container">
              {token === "" ? (
                <Login />
              ) : (
                <>
                  <Sidebar />
                  <div className="right-container">
                    <div>
                      <Topbar />
                    </div>
                    <div className="content-container">
                      {state === "loading" ? loadSkeleton() : <Outlet />}
                    </div>
                  </div>
                  <Player />
                  <div className="bg">
                    <div className="bubble-1"></div>
                    <div className="bubble-2"></div>
                    <div className="bubble-3"></div>
                  </div>
                </>
              )}
            </div>
          </CurrentPageContext.Provider>
        </TrackStackContext.Provider>
      </CurrentSongContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
