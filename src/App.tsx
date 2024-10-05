import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Player from "./components/player/Player";
import Login from "./pages/auth/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import HomeSkeleton from "./pages/home/HomeSkeleton";
import DiscoverSkeleton from "./pages/discover/DiscoverSkeleton";
import MyArtistsSkeleton from "./pages/my artists/MyArtistsSkeleton";
import MyAlbumsSkeleton from "./pages/my albums/MyAlbumsSkeleton";
import MySongsSkeleton from "./pages/my songs/MySongsSkeleton";
import ArtistSkeleton from "./pages/artist/ArtistSkeleton";
import AlbumSkeleton from "./pages/album/AlbumSkeleton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export type Song = {
  indexInStack: number;
  songUrl: string;
  imgUrl: string;
  name: string;
  album: string;
  artist: string;
  trackDurationMs: number;
};

export type ArtistType = {
  ID: string;
  name: string;
  imgUrl: string;
  totalFollowers: number;
};

type TokenContextType = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

type CurrentSongContextType = {
  currentSong: Song;
  setCurrentSong: Dispatch<SetStateAction<Song>>;
};

type TrackStackContextType = { [index: string]: any };

type CurrentPageContextType = {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

const CurrentSongContext = createContext<CurrentSongContextType | null>(null);
const TrackStackContext = createContext<TrackStackContextType | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);
const TokenContext = createContext<TokenContextType | null>(null);

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

export function useTokenContext() {
  const theTokenContext = useContext(TokenContext);
  if (theTokenContext == null) {
    throw new Error("must use within provider");
  }
  return theTokenContext;
}

function App() {
  const [token, setToken] = useState<string>("");
  const [trackStack, setTrackStack] = useState<
    { song: Song; isActive: boolean }[]
  >([]);
  const [currentSong, setCurrentSong] = useState<Song>({
    indexInStack: 0,
    name: "",
    artist: "",
    album: "",
    imgUrl: "",
    songUrl: "",
    trackDurationMs: 0,
  });
  const [currentPage, setCurrentPage] = useState<string>("");
  const { state } = useNavigation();

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
      case "Artist":
        return <ArtistSkeleton />;
      case "Album":
        return <AlbumSkeleton />;
      case "Playlist":
        return <AlbumSkeleton />;
    }
  }

  return (
    <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
      <TrackStackContext.Provider value={{ trackStack, setTrackStack }}>
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
          <TokenContext.Provider value={{ token, setToken }}>
            <div className="page-container">
              {token === "" || token === "undefined" ? (
                <Login />
              ) : (
                <>
                  <Sidebar />
                  <ScrollToTop />
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
          </TokenContext.Provider>
        </CurrentPageContext.Provider>
      </TrackStackContext.Provider>
    </CurrentSongContext.Provider>
  );
}

export default App;
