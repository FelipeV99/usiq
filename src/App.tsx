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

export type AlbumType = {
  id: string;
  name: string;
  artist: string;
  totalTracks?: number;
  imgUrl: string;
  releaseDate?: string;
  tracks: Song[] | [];
};

export type PlaylistType = {
  id: string;
  name: string;
  ownerName: string;
  totalTracks?: number;
  description: string;
  imgUrl: string;
  tracks: Song[] | [];
};

type TokenContextType = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

type TStackCSongContextType = {
  trackStack: { song: Song; isActive: boolean }[];
  setTrackStack: Dispatch<SetStateAction<{ song: Song; isActive: boolean }[]>>;
  currentSong: Song;
  setCurrentSong: Dispatch<SetStateAction<Song>>;
};

type CurrentPageContextType = {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

const TStackCSongContext = createContext<TStackCSongContextType | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);
const TokenContext = createContext<TokenContextType | null>(null);

export function useTStackCSongContext() {
  const theTStackCSongContext = useContext(TStackCSongContext);
  //this is only true when trying to use context outside of provider
  if (theTStackCSongContext == null) {
    throw new Error("must use within provider");
  }
  return theTStackCSongContext;
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
    //first check if there's hash
    const hash = window.location.hash;
    let _token = "";

    if (hash) {
      _token = hash.split("&")[0].split("=")[1];
      setToken(_token);
      window.localStorage.setItem("token", _token);
      window.location.hash = "";
      //otherwise check if the token is stored in the local storage
    } else {
      _token = window.localStorage.getItem("token") || "";
      //set the token to the stored token in LS or to an empty string, if it's empty we'll redirect user to login page
      setToken(_token);
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
    <TStackCSongContext.Provider
      value={{ trackStack, setTrackStack, currentSong, setCurrentSong }}
    >
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
    </TStackCSongContext.Provider>
  );
}

export default App;
