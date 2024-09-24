import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-songs.css";
import Tracklist from "../../components/tracklist/Tracklist";
const MySongs = () => {
  const mySongs = useLoaderData();
  console.log("mysongs from component", mySongs);
  return (
    <div>
      <h2>My Songs</h2>
      <div className="my-songs-container">
        <Tracklist tracks={mySongs} />
      </div>
    </div>
  );
};

export async function mySongsLoader() {
  const token = window.localStorage.getItem("token") || "";
  let mySongs: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/me/tracks?limit=50", "GET", token).then((res) => {
    if (res.error) {
      isError = true;
    } else {
      mySongs = res.items.map((songObj: { [key: string]: any }) => {
        return {
          ...songObj.track,
          imgUrl: songObj.track.album.images[0].url,
        };
      });
    }
  });
  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return mySongs;
  }
}

export default MySongs;
