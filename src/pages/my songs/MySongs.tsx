import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-songs.css";
import Tracklist from "../../components/tracklist/Tracklist";
import { Song, useCurrentPageContext } from "../../App";
import { useEffect } from "react";

const MySongs = () => {
  const mySongs = useLoaderData() as Song[];
  const { setCurrentPage } = useCurrentPageContext();
  useEffect(() => {
    setCurrentPage("Songs");
  }, []);
  return (
    <div className="my-songs-outer-container">
      <h2>My Songs</h2>
      {mySongs.length > 0 ? (
        <div className="my-songs-container">
          <Tracklist tracks={mySongs} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export async function mySongsLoader() {
  const token = window.localStorage.getItem("token") || "";
  let mySongs: Song[] = [];
  let isError = false;
  await fetchWebApi("v1/me/tracks?limit=50", "GET", token).then((res) => {
    if (res.error) {
      isError = true;
    } else {
      mySongs = res.items.map(
        (songObj: { [key: string]: any }, index: number) => {
          return {
            id: songObj.track.id,
            indexInStack: index,
            name: songObj.track.name,
            album: songObj.track.album.name,
            artist: songObj.track.artists[0].name,
            imgUrl: songObj.track.album.images[0].url,
            songUrl: songObj.track.preview_url,
            trackDurationMs: songObj.track.duration_ms,
          };
        }
      );
    }
  });
  if (isError) {
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://usiq.netlify.app/";
    return redirect(redirectUrl + "login");
  } else {
    return mySongs;
  }
}

export default MySongs;
