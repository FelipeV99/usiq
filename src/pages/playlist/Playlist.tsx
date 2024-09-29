import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./playlist.css";

const Playlist = () => {
  const playlist = useLoaderData();
  console.log("playlist from componenets", playlist);
  return (
    <div>
      <div className="playlist-header"></div>
    </div>
  );
};

export async function playlistLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let playlist: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/playlists/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "undefined");
      isError = true;
    } else {
      console.log("returning playlist", res);
      playlist = res;
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return playlist;
  }
}

export default Playlist;
