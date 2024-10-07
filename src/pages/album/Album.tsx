import "./album.css";

import { redirect, useLoaderData, useLocation } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import AsyncImg from "../../components/async img/AsyncImg";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { useTokenContext, useTStackCSongContext } from "../../App";
import { useEffect } from "react";
import { Song, AlbumType } from "../../App";

const Album = () => {
  const album = useLoaderData() as AlbumType;
  const { token } = useTokenContext();

  const { setCurrentSong, trackStack, setTrackStack } = useTStackCSongContext();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.autoplay === true) {
      handleOnPlay(album.tracks[0]);
    }
    async function checkSavedTracks() {
      let trackIds = "";
      album.tracks.map((track: Song) => {
        trackIds = trackIds + track.id + "%";
      });
      // console.log(trackIds);
      fetchWebApi("v1/me/tracks/contains?ids=" + trackIds, "GET", token).then(
        (res) => {
          if (!res.error) {
            console.log(res);
          }
          console.log(res.error);
        }
      );
    }
    checkSavedTracks();
  }, []);

  function handleOnPlay(song: Song) {
    setCurrentSong(song);
    const newTrackStack = album.tracks.map((track: Song) => {
      const active = track.songUrl === song.songUrl;
      return { song: { ...track }, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="album-container">
      <div className="album-header">
        <div className="alh-img-container">
          <AsyncImg src={album.imgUrl} proportions={1} />
        </div>
        <div className="alh-info">
          <h1>{album.name}</h1>
          <p className="bold">{album.artist}</p>
          <div className="alh-details">
            <p className="other-p">{album.releaseDate?.split("-")[0]}</p>
            <div className="dot-separator"></div>
            <p className="other-p">{album.totalTracks} tracks</p>
          </div>
          <button
            className="btn-round"
            onClick={() => {
              handleOnPlay(album.tracks[0]);
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplay.svg?alt=media&token=19b6a1a6-2445-42e7-be85-5b2f79584042"
              alt=""
            />
          </button>
        </div>
        <div className="alh-btns"></div>
      </div>
      <div className="album-tracks-container">
        {album.tracks.map((track: Song, index: number) => {
          return (
            <SongrowTwo key={index} song={track} handleOnPlay={handleOnPlay} />
          );
        })}
      </div>
      {/* <Tracklist tracks={albumWithImg} imgUrl={album.images[0].url} /> */}
    </div>
  );
};

export async function albumLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let album: AlbumType = {
    id: "",
    name: "",
    artist: "",
    totalTracks: 0,
    imgUrl: "",
    releaseDate: "",
    tracks: [],
  };
  let isError = false;
  await fetchWebApi("v1/albums/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "");
      isError = true;
    } else {
      const formattedAlbumTracks = res.tracks.items.map(
        (track: { [key: string]: any }, index: number) => {
          return {
            id: track.id,
            indexInStack: index,
            name: track.name,
            album: res.name,
            artist: track.artists[0].name,
            imgUrl: res.images[0].url,
            songUrl: track.preview_url,
            trackDurationMs: track.duration_ms,
          };
        }
      );
      const formattedAlbum = {
        id: res.id,
        name: res.name,
        artist: res.artists[0].name,
        totalTracks: res.total_tracks,
        releaseDate: res.release_date,
        imgUrl: res.images[0].url,
        tracks: formattedAlbumTracks,
      };
      album = formattedAlbum;
    }
  });

  if (isError) {
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://usiq.netlify.app/";
    return redirect(redirectUrl + "login");
  } else {
    return album;
  }
}

export default Album;
