import { useEffect, useState } from "react";
import "./discover.css";
import { fetchWebApi } from "../../config/spotify";
import { useTokenContext } from "../../App";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import RecentTracks from "../home/RecentTracks";
const Discover = () => {
  const { token, setToken } = useTokenContext();
  const navigate = useNavigate();
  // const [recommendedTracks, setRecommendedTracks] = useState<{}[]>([]);

  const { playlist1, playlist2, playlist3, playlist4, recommendedTracks }: any =
    useLoaderData();

  // useEffect(() => {
  //   async function getRecommendedTracks() {
  //     await fetchWebApi(
  //       "v1/me/player/recently-played?limit=6",
  //       "GET",
  //       token
  //     ).then((res) => {
  //       if (!res.error) {
  //         const recentTracksFormatted = res.items.map(
  //           (item: { [key: string]: any }) => {
  //             return {
  //               ...item.track,
  //               imgUrl: item.track.album.images[0].url,
  //             };
  //           }
  //         );
  //         setRecommendedTracks(recentTracksFormatted);
  //         // console.log("recently played", recentTracksFormatted);
  //       } else {
  //         // console.log("there was an error getitng recent tracks");
  //       }
  //     });
  //   }
  //   getRecommendedTracks();
  // }, []);
  return (
    <div className="discover-container">
      <div className="featured-playlists-container">
        <div
          className="featured-playlist-card fpc1"
          onClick={() => {
            navigate("/playlist/" + playlist1.id);
          }}
        >
          <div className="fpc-top">
            <div className="fpc-bg"></div>
            <div className="fpc-bg-bubble"></div>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fasterisk.svg?alt=media&token=f84978b2-4804-4021-8220-09678afdc5e0"
              }
              alt=""
            />
          </div>
          <div className="fpc-bottom">
            <h2>{playlist1.name}</h2>
            <p className="other-p">{playlist1.description}</p>
          </div>
        </div>
        <div
          className="featured-playlist-card fpc2"
          onClick={() => {
            navigate("/playlist/" + playlist2.id);
          }}
        >
          <div className="fpc-top">
            <div className="fpc-bg"></div>
            <div className="fpc-bg-bubble"></div>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-shape3.svg?alt=media&token=a4774387-ea07-455f-9508-b3316728cf99"
              }
              alt=""
            />
          </div>
          <div className="fpc-bottom">
            <h2>{playlist2.name}</h2>
            <p className="other-p">{playlist2.description}</p>
          </div>
        </div>
        <div
          className="featured-playlist-card fpc3"
          onClick={() => {
            navigate("/playlist/" + playlist3.id);
          }}
        >
          <div className="fpc-top">
            <div className="fpc-bg"></div>
            <div className="fpc-bg-bubble"></div>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-shape.svg?alt=media&token=d9458b9d-294b-49c1-835d-4f4ec774461f"
              }
              alt=""
            />
          </div>
          <div className="fpc-bottom">
            <h2>{playlist3.name}</h2>
            <p className="other-p">{playlist3.description}</p>
          </div>
        </div>
        <div
          className="featured-playlist-card fpc4"
          onClick={() => {
            navigate("/playlist/" + playlist4.id);
          }}
        >
          <div className="fpc-top">
            <div className="fpc-bg"></div>
            <div className="fpc-bg-bubble"></div>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplaylist-shape2.svg?alt=media&token=eb93653c-aecc-4b1f-80bb-712f1b8502b7"
              }
              alt=""
            />
          </div>
          <div className="fpc-bottom">
            <h2>{playlist4.name}</h2>
            <p className="other-p">{playlist4.description}</p>
          </div>
        </div>
      </div>
      <div className="recommended-tracks-outer-container">
        <h4>You might like</h4>
        <div className="recommended-tracks-container">
          <RecentTracks tracks={recommendedTracks} />
        </div>
      </div>
    </div>
  );
};

export async function discoverLoader() {
  let error = "";
  const token = window.localStorage.getItem("token") || "";
  const endpoints = [
    "v1/playlists/37i9dQZF1DX4sWSpwq3LiO",
    "v1/playlists/37i9dQZF1DX8Kgdykz6OKj",
    "v1/playlists/37i9dQZF1DWUVpAXiEPK8P",
    "v1/playlists/37i9dQZF1DX2SK4ytI2KAZ",
    "v1/me/player/recently-played?limit=6",
  ];

  const promises = endpoints.map((endpoint) => {
    return fetchWebApi(endpoint, "GET", token).then((res) => {
      if (res.error) {
        console.log("error while requesting discover playlists", res.error);
        window.localStorage.setItem("token", "");
        error = res.error;
      } else {
        return res;
      }
    });
  });
  const data = await Promise.all(promises);
  console.log("from promise . all", data);
  if (error !== "") {
    return redirect("/login");
  } else {
    const recentTracksFormatted = data[4].items.map(
      (item: { [key: string]: any }) => {
        return {
          ...item.track,
          imgUrl: item.track.album.images[0].url,
        };
      }
    );
    return {
      playlist1: data[0],
      playlist2: data[1],
      playlist3: data[2],
      playlist4: data[3],
      recommendedTracks: recentTracksFormatted,
    };
  }
}

export default Discover;
