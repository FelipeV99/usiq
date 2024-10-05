import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./playlist.css";
import AsyncImg from "../../components/async img/AsyncImg";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { useCurrentSongContext, useTrackstackContext } from "../../App";
import { Song } from "../../App";

const Playlist = () => {
  const playlist: any = useLoaderData();
  const { setCurrentSong } = useCurrentSongContext();
  const { setTrackStack } = useTrackstackContext();

  function handleOnPlay(song: Song) {
    setCurrentSong(song);
    const newTrackStack = playlist.tracks.map(
      (track: { [key: string]: any }) => {
        const active = track.songUrl === song.songUrl;
        return { ...track, isActive: active };
      }
    );
    setTrackStack(newTrackStack);
  }

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <div className="ph-img-container">
          <AsyncImg src={playlist.playlistImgUrl} proportions={1} />
        </div>
        <div className="ph-info">
          <h1>{playlist.name}</h1>
          <p className="bold">{playlist.ownerName}</p>
          <div className="ph-details">
            <p className="other-p">{playlist.totalTracks} tracks</p>
          </div>
          {/* <p className="other-p ph-description">{playlist.description}</p> */}

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
            <SongrowTwo key={index} song={track} handleOnPlay={handleOnPlay} />
          );
        })}
      </div>
    </div>
  );
};

export async function playlistLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let playlist: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/playlists/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "");
      isError = true;
    } else {
      console.log("returning playlist", res);
      playlist = res;
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    const playlistTracks = playlist.tracks.items.map(
      (trackObj: { [key: string]: any }, index: number) => {
        return {
          // ...trackObj.track,
          indexInStack: index,
          imgUrl: trackObj.track.album.images[0].url,
          songUrl: trackObj.track.preview_url,
          name: trackObj.track.name,
          album: trackObj.track.album.name,
          artist: trackObj.track.artists[0].name,
          trackDurationMs: trackObj.track.duration_ms,
        };
      }
    );
    const formattedPlaylist = {
      name: playlist.name,
      playlistImgUrl: playlist.images[0].url,
      totalTracks: playlist.total_tracks,
      ownerName: playlist.owner.display_name,
      tracks: playlistTracks,
    };

    return formattedPlaylist;
  }
}

export default Playlist;
