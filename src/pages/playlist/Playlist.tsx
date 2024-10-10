import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./playlist.css";
import AsyncImg from "../../components/async img/AsyncImg";
import SongrowTwo from "../../components/song row/SongrowTwo";
import {
  PlaylistType,
  useTokenContext,
  useTStackCSongContext,
} from "../../App";
import { Song } from "../../App";
import { useEffect, useState } from "react";

const Playlist = () => {
  //return type of useloaderData is unknown
  const playlist = useLoaderData() as PlaylistType;
  const { setCurrentSong, setTrackStack } = useTStackCSongContext();
  const { token } = useTokenContext();

  const [areTracksSaved, setAreTracksSaved] = useState<boolean[]>([]);

  useEffect(() => {
    async function checkSavedTracks() {
      let trackIds = "";
      playlist.tracks.map((track: Song) => {
        trackIds = trackIds + track.id + ",";
      });
      await fetchWebApi(
        "v1/me/tracks/contains?ids=" + trackIds,
        "GET",
        token
      ).then((res) => {
        if (!res.error) {
          setAreTracksSaved(res);
        } else {
          console.log(res.error);
        }
      });
    }
    checkSavedTracks();
  }, []);

  function handleOnPlay(song: Song) {
    if (song.songUrl) {
      setCurrentSong(song);
      const newTrackStack = playlist.tracks.map((track: Song) => {
        const active = track.songUrl === song.songUrl;
        return { song: { ...track }, isActive: active };
      });
      setTrackStack(newTrackStack);
    } else {
      window.alert("Track not available at the moment");
    }
  }
  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <div className="ph-img-container">
          <AsyncImg src={playlist.imgUrl} proportions={1} />
        </div>
        <div className="ph-info">
          <h1>{playlist.name}</h1>
          <p className="body-1">{playlist.ownerName}</p>
          <div className="ph-details">
            <p className="body-3">{playlist.totalTracks} tracks</p>
          </div>
          <button
            className="btn-round"
            onClick={() => {
              handleOnPlay(playlist.tracks[0]);
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplay.svg?alt=media&token=19b6a1a6-2445-42e7-be85-5b2f79584042"
              alt=""
            />
          </button>
        </div>
        <div className="ph-btns"></div>
      </div>
      <div className="playlist-tracks-container">
        {playlist.tracks.map((track: Song, index: number) => {
          return (
            <SongrowTwo
              key={index}
              song={track}
              handleOnPlay={handleOnPlay}
              isSongSaved={
                areTracksSaved.length > 1 ? areTracksSaved[index] : undefined
              }
              includeImg={true}
              includeAlbum={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export async function playlistLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let playlist: PlaylistType = {
    id: "",
    name: "",
    ownerName: "",
    totalTracks: 0,
    description: "",
    imgUrl: "",
    tracks: [],
  };
  let isError = false;
  await fetchWebApi("v1/playlists/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "");
      isError = true;
    } else {
      let playlistTracks = res.tracks.items.map(
        (trackObj: { [key: string]: any }, index: number) => {
          return {
            id: trackObj.track.id,
            indexInStack: index,
            name: trackObj.track.name,
            album: trackObj.track.album.name,
            artist: trackObj.track.artists[0].name,
            imgUrl: trackObj.track.album.images[0].url,
            songUrl: trackObj.track.preview_url,
            trackDurationMs: trackObj.track.duration_ms,
          };
        }
      );
      if (playlistTracks.length > 50) {
        playlistTracks = playlistTracks.slice(0, 50);
      }
      playlist = {
        id: res.id,
        name: res.name,
        ownerName: res.owner.display_name,
        totalTracks: res.tracks.total,
        description: res.description,
        imgUrl: res.images[0].url,
        tracks: playlistTracks,
      };
    }
  });

  if (isError) {
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://usiq.netlify.app/";
    return redirect(redirectUrl + "login");
  } else {
    return playlist;
  }
}

export default Playlist;
