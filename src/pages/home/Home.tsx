import "./home.css";

import { useEffect, useState } from "react";
import { useCurrentSongContext, useTokenContext } from "../../App";
import { fetchWebApi } from "../../config/spotify";
import { Link } from "react-router-dom";

const Home = () => {
  const { token, setToken } = useTokenContext();
  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const [userTopTracks, setUserTopTracks] = useState<{}[]>([]);
  const [newAlbums, setNewAlbums] = useState<{}[]>([]);

  useEffect(() => {
    console.log("gonna try to make a request with the token:", token);
    async function getTopTracks() {
      await fetchWebApi("v1/me/top/tracks", "GET", token).then((res) => {
        if (res.error) {
          console.log("error in top tracks", res.error);
        } else {
          console.log("top tracks res", res);
          setUserTopTracks(res.items.slice(0, 10));
        }
      });
    }

    async function getNewAlbumReleases() {
      await fetchWebApi("v1/browse/new-releases", "GET", token).then((res) => {
        if (res.error) {
          console.log("error in new albums", res.error);
        } else {
          console.log("new albums res", res);
          setNewAlbums(res.albums.items.slice(0, 10));
        }
      });
    }
    if (token !== "" && token !== "expired") {
      getTopTracks();
      getNewAlbumReleases();
    }
  }, [token]);

  function handleOnPlay(
    songUrl: string,
    imgUrl: string,
    name: string,
    artist: string
  ) {
    setCurrentSong({ songUrl, imgUrl, name, artist });
    // console.log("audio!!!", audioRef.current);
  }
  return (
    <>
      <div className="home-container">
        <h1>Your top tracks</h1>
        {userTopTracks.map((track: { [index: string]: any }, index: number) => {
          return (
            <div key={index}>
              <p>{track.name}</p>
              <button
                onClick={() =>
                  handleOnPlay(
                    track.preview_url,
                    track.album.images[0].url,
                    track.name,
                    track.artists[0].name
                  )
                }
              >
                play
              </button>
            </div>
          );
        })}
        <h1>New releases</h1>
        {newAlbums.map((album: { [index: string]: any }, index) => {
          return (
            <div key={index}>
              <Link to={"/album/" + album.id}>{album.name}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

// async function homeLoader(){

// }

export default Home;
