import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Album, { albumLoader } from "./pages/album/Album";
import MySongs, { mySongsLoader } from "./pages/my songs/MySongs";
import MyAlbums, { myAlbumsLoader } from "./pages/my albums/MyAlbums";
import MyArtists, { myArtistsLoader } from "./pages/my artists/MyArtists";
import Discover, { discoverLoader } from "./pages/discover/Discover";
import Artist, { artistLoader } from "./pages/artist/Artist";
import SearchResults, {
  searchResultsLoader,
} from "./pages/search results/SearchResults";
import Playlist, { playlistLoader } from "./pages/playlist/Playlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "discover",
        element: <Discover />,
        loader: discoverLoader,
      },
      {
        path: "album/:id",
        element: <Album />,
        loader: albumLoader,
      },
      {
        path: "artist/:id",
        element: <Artist />,
        loader: artistLoader,
      },
      {
        path: "playlist/:id",
        element: <Playlist />,
        loader: playlistLoader,
      },
      {
        path: "my-songs",
        element: <MySongs />,
        loader: mySongsLoader,
      },
      {
        path: "my-albums",
        element: <MyAlbums />,
        loader: myAlbumsLoader,
      },
      {
        path: "my-artists",
        element: <MyArtists />,
        loader: myArtistsLoader,
      },
      {
        path: "search/:queryTerm",
        element: <SearchResults />,
        loader: searchResultsLoader,
      },
      //   {
      //     errorElement: <h1>error</h1>,
      //     children: [
      //       {
      //         path: "login",
      //         element: <Login />,
      //       },
      //     ],
      //   },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
