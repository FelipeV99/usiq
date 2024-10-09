import "./discover.css";
import { fetchWebApi } from "../../config/spotify";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import RecentTracks from "../home/RecentTracks";
import AsyncImg from "../../components/async img/AsyncImg";
import { PlaylistType, Song, useCurrentPageContext } from "../../App";
import { useEffect } from "react";

const Discover = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useCurrentPageContext();
  const { playlists, recommendedTracks }: any = useLoaderData();
  // console.log(recommendedTracks.slice(0, 6));

  function handleOnClickPlaylist(playlistID: string) {
    setCurrentPage("Playlist");
    navigate("/playlist/" + playlistID);
  }

  useEffect(() => {
    setCurrentPage("Discover");
  }, []);

  return (
    <div className="discover-container">
      <div className="featured-playlists-container">
        <div
          className="featured-playlist-card fpc1"
          onClick={() => {
            handleOnClickPlaylist(playlists[0].id);
          }}
        >
          <div className="fpc-bg">
            <AsyncImg
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-bg.svg?alt=media&token=a289cf8c-a745-4f70-b6dd-36777a5e14fb"
              proportions={1}
            />
          </div>
          <div className="fpc-content">
            <div className="fpc-top">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fasterisk.svg?alt=media&token=f84978b2-4804-4021-8220-09678afdc5e0"
                }
                alt=""
                className="symbol"
              />
            </div>
            <div className="fpc-bottom">
              <h2>{playlists[0].name}</h2>
              <p className="other-p">{playlists[0].description}</p>
            </div>
          </div>
        </div>
        <div
          className="featured-playlist-card fpc2"
          onClick={() => {
            handleOnClickPlaylist(playlists[1].id);
          }}
        >
          <div className="fpc-bg">
            <AsyncImg
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-bg2.svg?alt=media&token=cba2b0f4-3e4f-4eaf-8af0-580c93ab77b4"
              proportions={1}
            />
          </div>
          <div className="fpc-content">
            <div className="fpc-top">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-shape3.svg?alt=media&token=a4774387-ea07-455f-9508-b3316728cf99"
                }
                alt=""
                className="symbol"
              />
            </div>
            <div className="fpc-bottom">
              <h2>{playlists[1].name}</h2>
              <p className="other-p">{playlists[1].description}</p>
            </div>
          </div>
        </div>
        <div
          className="featured-playlist-card fpc3"
          onClick={() => {
            handleOnClickPlaylist(playlists[2].id);
          }}
        >
          <div className="fpc-bg">
            <AsyncImg
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-bg3.svg?alt=media&token=91ff1a56-3e3c-44dd-8f73-27edee4740a7"
              proportions={1}
            />
          </div>
          <div className="fpc-content">
            <div className="fpc-top">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-shape.svg?alt=media&token=d9458b9d-294b-49c1-835d-4f4ec774461f"
                }
                alt=""
                className="symbol"
              />
            </div>
            <div className="fpc-bottom">
              <h2>{playlists[2].name}</h2>
              <p className="other-p">{playlists[2].description}</p>
            </div>
          </div>
        </div>
        <div
          className="featured-playlist-card fpc1"
          onClick={() => {
            handleOnClickPlaylist(playlists[3].id);
          }}
        >
          <div className="fpc-bg">
            <AsyncImg
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-bg4.svg?alt=media&token=1609b761-aa0c-45b0-8953-07952c434b02"
              proportions={1}
            />
          </div>
          <div className="fpc-content">
            <div className="fpc-top">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-shape2.svg?alt=media&token=eb93653c-aecc-4b1f-80bb-712f1b8502b7"
                }
                alt=""
                className="symbol"
              />
            </div>
            <div className="fpc-bottom">
              <h2>{playlists[3].name}</h2>
              <p className="other-p">{playlists[3].description}</p>
            </div>
          </div>
        </div>
      </div>
      {recommendedTracks.length > 0 ? (
        <div className="recommended-tracks-outer-container">
          <h4>You might like</h4>
          <div className="recommended-tracks-container">
            <RecentTracks tracks={recommendedTracks.slice(0, 6)} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export async function discoverLoader() {
  let error = false;
  const token = window.localStorage.getItem("token") || "";
  const endpoints = [
    "v1/playlists/37i9dQZF1DX4sWSpwq3LiO",
    "v1/playlists/37i9dQZF1DX8Kgdykz6OKj",
    "v1/playlists/37i9dQZF1DWUVpAXiEPK8P",
    "v1/playlists/37i9dQZF1DX2SK4ytI2KAZ",
    // "v1/me/player/recently-played?limit=6",
    "v1/recommendations?seed_tracks=1pKYYY0dkg23sQQXi0Q5zN",
  ];
  let playlists: PlaylistType[] = [];

  const promises = endpoints.map((endpoint) => {
    return fetchWebApi(endpoint, "GET", token).then((res) => {
      if (res.error) {
        console.log("error while requesting discover playlists", res.error);
        window.localStorage.setItem("token", "");
        error = true;
      } else {
        return res;
      }
    });
  });
  const data = await Promise.all(promises);

  if (error) {
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://usiq.netlify.app/";
    return redirect(redirectUrl + "login");
  } else {
    const recommendedTracksFiltered = data[4].tracks.filter((track: any) => {
      if (track.preview_url) {
        return true;
      } else {
        return false;
      }
    });
    const recommendedTracksFormatted = recommendedTracksFiltered.map(
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

    for (let index = 0; index < 4; index++) {
      playlists.push({
        id: data[index].id,
        name: data[index].name,
        ownerName: data[index].owner.display_name,
        description: data[index].description,
        imgUrl: "",
        tracks: [],
      });
    }
    return {
      playlists: playlists,
      recommendedTracks: recommendedTracksFormatted,
    };
  }
}

export default Discover;
