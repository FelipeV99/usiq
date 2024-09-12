import { useEffect, useState } from "react";
import Login from "./pages/auth/Login";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    const _token = hash.split("&")[0].split("=")[1];
    window.localStorage.setItem("token", _token);
    setToken(_token);
    window.localStorage.setItem("token", _token);
  }, []);

  axios
    .get("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg")
    .then((res) => console.log(res));
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
