import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Album, { albumLoader } from "./pages/album/Album";
import MySongs from "./pages/my songs/MySongs";
import MyAlbums, { myAlbumsLoader } from "./pages/my albums/MyAlbums";
import MyArtists from "./pages/my artists/MyArtists";
import Discover from "./pages/discover/Discover";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "disover",
        element: <Discover />,
      },
      {
        path: "album/:id",
        element: <Album />,
        loader: albumLoader,
      },
      {
        path: "my-songs",
        element: <MySongs />,
      },
      {
        path: "my-albums",
        element: <MyAlbums />,
        loader: myAlbumsLoader,
      },
      {
        path: "my-artists",
        element: <MyArtists />,
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
]);
