import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./playlist.css";
import AsyncImg from "../../components/async img/AsyncImg";
import SongrowTwo from "../../components/song row/SongrowTwo";
import { useCurrentSongContext, useTrackstackContext } from "../../App";
import { Song } from "../../App";

const Playlist = () => {
  const { playlist, playlistTracksFormatted }: any = useLoaderData();
  console.log("playlist from componenets", playlist);
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();

  // const playlistTracksFormatted = playlist.tracks.items.map(
  //   (trackObj: { [key: string]: any }) => {
  //     return { ...trackObj.track, imgUrl: trackObj.track.album.images[0].url };
  //   }
  // );
  function handleOnPlay(song: Song) {
    setCurrentSong(song);
    const newTrackStack = playlistTracksFormatted.map(
      (track: { [key: string]: any }) => {
        const active = track.preview_url === song.songUrl;
        return { ...track, isActive: active };
      }
    );
    setTrackStack(newTrackStack);
  }

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <div className="ph-img-container">
          <AsyncImg src={playlist.images[0].url} proportions={1} />
        </div>
        <div className="ph-info">
          <h1>{playlist.name}</h1>
          <p className="bold">{playlist.owner.display_name}</p>
          <div className="ph-details">
            <p className="other-p">{playlist.tracks.total} tracks</p>
          </div>
          {/* <p className="other-p ph-description">{playlist.description}</p> */}

          <button
            className="btn-round"
            onClick={() => {
              handleOnPlay({
                indexInStack: 0,
                songUrl: playlistTracksFormatted[0].preview_url,
                imgUrl: playlistTracksFormatted[0].imgUrl,
                name: playlistTracksFormatted[0].name,
                artist: playlistTracksFormatted[0].artists[0].name,
                trackDurationMs: playlistTracksFormatted[0].duration_ms,
              });
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
        {playlistTracksFormatted.map(
          (track: { [key: string]: any }, index: number) => {
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
          }
        )}
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
    const playlistTracksFormatted = playlist.tracks.items.map(
      (trackObj: { [key: string]: any }) => {
        return {
          ...trackObj.track,
          imgUrl: trackObj.track.album.images[0].url,
        };
      }
    );

    return { playlist, playlistTracksFormatted };
  }
}

export default Playlist;
