import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./artist.css";
import { useEffect, useState } from "react";
import Tracklist from "../../components/tracklist/Tracklist";
import { useCurrentSongContext, useTrackstackContext } from "../../App";

const Artist = () => {
  const artist: any = useLoaderData();

  const { currentSong, setCurrentSong } = useCurrentSongContext();
  const { trackStack, setTrackStack } = useTrackstackContext();

  const [topTracks, setTopTracks] = useState<any>([]);
  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);
  const token = window.localStorage.getItem("token") || "";

  useEffect(() => {
    async function getTopTracks() {
      let isError = false;
      let topTracksReq: { [key: string]: any } = {};
      await fetchWebApi(
        `v1/artists/${artist.id}/top-tracks`,
        "GET",
        token
      ).then((res) => {
        if (res.error) {
          window.localStorage.setItem("token", "undefined");
          isError = true;
        } else {
          topTracksReq = res;
          const topTracksWithImage = topTracksReq.tracks.map(
            (track: { [key: string]: any }) => {
              return { ...track, imgUrl: track.album.images[0].url };
            }
          );
          setTopTracks(topTracksWithImage);
        }
      });
    }
    getTopTracks();
    async function checkIsFollowing() {
      await fetchWebApi(
        "v1/me/following/contains?type=artist&ids=" + artist.id,
        "GET",
        token
      ).then((res) => {
        console.log("is user folllowing this artist?", res[0]);
        setIsUserFollowing(res[0]);
      });
    }
    checkIsFollowing();
  }, []);

  async function handleOnClickFollowUnfollow() {
    try {
      if (isUserFollowing) {
        await fetchWebApi(
          "v1/me/following?type=artist&ids=" + artist.id,
          "DELETE",
          token
        );
        setIsUserFollowing(false);
      } else {
        await fetchWebApi(
          "v1/me/following?type=artist&ids=" + artist.id,
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
    setCurrentSong({
      indexInStack: 0,
      songUrl: topTracks[0].preview_url,
      imgUrl: topTracks[0].imgUrl,
      name: topTracks[0].name,
      artist: topTracks[0].artists[0].name,
      trackDurationMs: topTracks[0].duration_ms,
    });
    const newTrackStack = topTracks.map((track: { [key: string]: any }) => {
      const active = track.preview_url === topTracks[0].preview_url;
      //   console.log("returning obj: ", { ...track, isActive: active });
      return { ...track, isActive: active };
    });
    setTrackStack(newTrackStack);
  }

  return (
    <div className="artist-container">
      <div className="artist-header">
        <div
          className="header-background"
          style={{
            background: `url(${artist.images[0].url}) no-repeat`,
            backgroundSize: "cover",
            backgroundPositionY: "50%",
          }}
        ></div>
        <div className="background-overlay"></div>

        <div className="ah-img-container">
          <img src={artist.images[0].url} alt="" />
        </div>
        <div className="ah-info">
          <div>
            <h1>{artist.name}</h1>
          </div>
          <div className="followers-container">
            <p>{artist.followers.total.toLocaleString()} Followers</p>
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
        <h2>popular songs</h2>
        <Tracklist tracks={topTracks} />
      </div>
    </div>
  );
};

export async function artistLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let artist: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/artists/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "undefined");
      isError = true;
    } else {
      artist = res;
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return artist;
  }
}

export default Artist;
