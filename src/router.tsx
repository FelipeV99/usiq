import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
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
