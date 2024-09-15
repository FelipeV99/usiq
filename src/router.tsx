import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Album, { albumLoader } from "./pages/album/Album";

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
        path: "album/:id",
        element: <Album />,
        loader: albumLoader,
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
