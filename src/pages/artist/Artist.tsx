import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./artist.css";
import { useEffect, useState } from "react";
import Tracklist from "../../components/tracklist/Tracklist";
import { useTokenContext, useTStackCSongContext } from "../../App";
import { Song, ArtistType } from "../../App";

const Artist = () => {
  const artist: any = useLoaderData();

  const { setCurrentSong, setTrackStack } = useTStackCSongContext();
  const { token, setToken } = useTokenContext();

  const [topTracks, setTopTracks] = useState<Song[]>([]);
  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);

  useEffect(() => {
    async function getTopTracks() {
      await fetchWebApi(
        `v1/artists/${artist.ID}/top-tracks`,
        "GET",
        token
      ).then((res) => {
        if (res.error) {
          window.localStorage.setItem("token", "");
          setToken("");
        } else {
          const topTracksFormatted = res.tracks.map(
            (track: { [key: string]: any }, index: number) => {
              return {
                indexInStack: index,
                name: track.name,
                album: track.album.name,
                artist: track.artists[0].name,
                imgUrl: track.album.images[0].url,
                songUrl: track.preview_url,
                trackDurationMs: track.duration_ms,
              };
            }
          );
          setTopTracks(topTracksFormatted);
        }
      });
    }
    getTopTracks();
    async function checkIsFollowing() {
      await fetchWebApi(
        "v1/me/following/contains?type=artist&ids=" + artist.ID,
        "GET",
        token
      ).then((res) => {
        setIsUserFollowing(res[0]);
      });
    }
    checkIsFollowing();
  }, []);

  async function handleOnClickFollowUnfollow() {
    try {
      if (isUserFollowing) {
        await fetchWebApi(
          "v1/me/following?type=artist&ids=" + artist.ID,
          "DELETE",
          token
        );
        setIsUserFollowing(false);
      } else {
        await fetchWebApi(
          "v1/me/following?type=artist&ids=" + artist.ID,
          "PUT",
          token
        );
        setIsUserFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnClickPlayArtist() {
    setCurrentSong(topTracks[0]);
    const newTrackStack = topTracks.map((track: Song) => {
      const active = track.songUrl === topTracks[0].songUrl;
      //   console.log("returning obj: ", { ...track, isActive: active });
      return { song: { ...track }, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="artist-container">
      <div className="artist-header">
        <div
          className="header-background"
          style={{
            background: `url(${artist.imgUrl}) no-repeat`,
            backgroundSize: "cover",
            backgroundPositionY: "50%",
          }}
        ></div>
        <div className="background-overlay"></div>

        <div className="ah-img-container">
          <img src={artist.imgUrl} alt="" />
        </div>
        <div className="ah-info">
          <div>
            <h1>{artist.name}</h1>
          </div>
          <div className="followers-container">
            <p>{artist.totalFollowers.toLocaleString()} Followers</p>
            <div className="header-btns">
              <button
                className="btn-secondary"
                onClick={handleOnClickFollowUnfollow}
              >
                {isUserFollowing ? "FOLLOWING" : "FOLLOW"}
              </button>
              <button className="btn-round" onClick={handleOnClickPlayArtist}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplay.svg?alt=media&token=19b6a1a6-2445-42e7-be85-5b2f79584042"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="artist-content-container">
        <h4>popular songs</h4>
        <Tracklist tracks={topTracks} />
      </div>
    </div>
  );
};

export async function artistLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let artist: ArtistType = {
    ID: "",
    name: "",
    imgUrl: "",
    totalFollowers: 0,
  };
  let isError = false;
  await fetchWebApi("v1/artists/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "");
      isError = true;
    } else {
      artist = {
        ID: res.id,
        name: res.name,
        imgUrl: res.images[0].url,
        totalFollowers: res.followers.total,
      };
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return artist;
  }
}

export default Artist;
