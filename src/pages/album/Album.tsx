import "./album.css";

import { redirect, useLoaderData, useLocation } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import AsyncImg from "../../components/async img/AsyncImg";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { useCurrentSongContext, useTrackstackContext } from "../../App";
import { useEffect } from "react";

const Album = () => {
  const album: any = useLoaderData();
  //   console.log("album from laoder data", album);
  const albumWithImg = album.tracks.items.map(
    (track: { [key: string]: any }) => {
      return { ...track, imgUrl: album.images[0].url, album: album.name };
    }
  );
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();

  const location = useLocation();
  // console.log("location state from album", location.state);
  useEffect(() => {
    if (location.state?.autoplay === true) {
      handleOnPlay(
        0,
        albumWithImg[0].preview_url,
        albumWithImg[0].imgUrl,
        albumWithImg[0].name,
        albumWithImg[0].artists[0].name,
        albumWithImg[0].duration_ms
      );
    }
  }, []);

  function handleOnPlay(
    indexInStack: number,
    songUrl: string,
    imgUrl: string,
    name: string,
    artist: string,
    trackDurationMs: number
  ) {
    setCurrentSong({
      indexInStack,
      songUrl,
      imgUrl,
      name,
      artist,
      trackDurationMs,
    });
    const newTrackStack = albumWithImg.map((track: { [key: string]: any }) => {
      const active = track.preview_url === songUrl;
      //   console.log("returning obj: ", { ...track, isActive: active });
      return { ...track, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="album-container">
      <div className="album-header">
        <div className="alh-img-container">
          <AsyncImg src={album.images[0].url} proportions={1} />
        </div>
        <div className="alh-info">
          <h1>{album.name}</h1>
          <p className="bold">{album.artists[0].name}</p>
          <div className="alh-details">
            <p className="other-p">{album.release_date.split("-")[0]}</p>
            <div className="dot-separator"></div>
            <p className="other-p">{album.total_tracks} tracks</p>
          </div>
          <button
            className="btn-round"
            onClick={() => {
              handleOnPlay(
                0,
                albumWithImg[0].preview_url,
                albumWithImg[0].imgUrl,
                albumWithImg[0].name,
                albumWithImg[0].artists[0].name,
                albumWithImg[0].duration_ms
              );
            }}
          >
            {" "}
            <img
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplay.svg?alt=media&token=19b6a1a6-2445-42e7-be85-5b2f79584042"
              alt=""
            />
          </button>
        </div>
        <div className="alh-btns">
          {/* <button className="btn-round">
            {" "}
            <img
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplay.svg?alt=media&token=19b6a1a6-2445-42e7-be85-5b2f79584042"
              alt=""
            />
          </button> */}
        </div>
      </div>
      <div className="album-tracks-container">
        {albumWithImg.map((track: { [key: string]: any }, index: number) => {
          return (
            <SongrowTwo
              key={track.id}
              song={track.name}
              artist={track.artists[0].name}
              duration={track.duration_ms}
              index={index}
              handleOnPlay={handleOnPlay}
              imgUrl={track.imgUrl}
              songUrl={track.preview_url}
            />
          );
        })}
      </div>
      {/* <Tracklist tracks={albumWithImg} imgUrl={album.images[0].url} /> */}
    </div>
  );
};

export async function albumLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let album: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/albums/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      console.log("there was an error retrieving the album", res.error);
      window.localStorage.setItem("token", "undefined");
      isError = true;
    } else {
      album = res;
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return album;
  }
}

export default Album;
