import "./home.css";

import { useEffect, useState } from "react";
import { useTokenContext } from "../../App";
import { fetchWebApi } from "../../config/spotify";
import Banner from "../../components/cards/banner/Banner";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
import RecentTracks from "./RecentTracks";
import AlbumCard from "../../components/cards/album card/AlbumCard";
// import { redirect, useLoaderData } from "react-router-dom";

const Home = () => {
  const { token, setToken } = useTokenContext();
  // const { favoriteArtists, recentTracks }: any = useLoaderData();

  const [newAlbums, setNewAlbums] = useState<{}[]>([]);
  const [recentTracks, setRecentTracks] = useState<{}[]>([]);
  const [favoriteArtists, setFavoriteArtists] = useState<{}[]>([]);

  useEffect(() => {
    async function getRecentlyPlayedTracks() {
      await fetchWebApi(
        "v1/me/player/recently-played?limit=6",
        "GET",
        token
      ).then((res) => {
        if (!res.error) {
          const recentTracksFormatted = res.items.map(
            (item: { [key: string]: any }) => {
              return {
                ...item.track,
                imgUrl: item.track.album.images[0].url,
              };
            }
          );
          setRecentTracks(recentTracksFormatted);
          console.log("recently played", recentTracksFormatted);
        } else {
          console.log("there was an error getitng recent tracks");
        }
      });
    }

    async function getFavoriteArtists() {
      await fetchWebApi(
        "v1/me/top/artists?limit=9&offset=8",
        "GET",
        token
      ).then((res) => {
        if (!res.error) {
          setFavoriteArtists(res.items);
        }
      });
    }

    async function getNewAlbumReleases() {
      await fetchWebApi(
        "v1/browse/new-releases?offset=14&limit=12",
        "GET",
        token
      ).then((res) => {
        if (res.error) {
          console.log("error in new albums", res.error);
          setToken("");
          window.localStorage.setItem("token", "");
        } else {
          setNewAlbums(res.albums.items);
        }
      });
    }
    if (token !== "" && token !== "expired") {
      getNewAlbumReleases();
      getRecentlyPlayedTracks();
      getFavoriteArtists();
    }
  }, [token]);
  return (
    <div className="home-container">
      <div className="banners-container">
        <Banner
          title="Our Love"
          artist="Caribou"
          size="small"
          imgUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2Four-love.webp?alt=media&token=b2e9c4a9-710c-42e5-967f-84d2a32e391c"
          albumUrl="4JOmLltFC735tBL7jfHfA7"
        />
        <Banner
          title="Big Hammer"
          artist="James Blake"
          size="small"
          imgUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2Fbig-hammer.jpg?alt=media&token=5e9d17b9-a129-4174-8ac1-ea4644b9ff91"
          albumUrl="2ZwNcWl8h9blysDE8i4juL"
        />
      </div>
      <div className="home-bottom">
        <div className="favorite-artists-outer-container">
          <h4>Your favorite artists</h4>
          <div className="favorite-artists-container">
            {favoriteArtists.map((artist: { [key: string]: any }) => {
              return (
                <ArtistCard
                  key={artist.id}
                  ID={artist.id}
                  imgUrl={artist.images[0].url}
                  name={artist.name}
                />
              );
            })}
          </div>
        </div>

        <div className="recently-played-outer-container">
          <h4>Recently played tracks</h4>
          <RecentTracks tracks={recentTracks} />
        </div>
        <div className="home-bottom-right">
          <div className="new-releases-outer-container">
            <h4>New releases</h4>
            <div className="new-releases-container">
              {newAlbums.map((album: { [index: string]: any }) => {
                return (
                  <AlbumCard
                    key={album.id}
                    id={album.id}
                    imgUrl={album.images[0].url}
                    name={album.name}
                    artistName={album.artists[0].name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function homeLoader() {
//   let error = "";
//   const token = window.localStorage.getItem("token") || "";
//   const endpoints = [
//     "v1/me/top/artists?limit=9&offset=8",
//     "v1/me/player/recently-played?limit=6",
//   ];
//   const promises = endpoints.map((endpoint) => {
//     return fetchWebApi(endpoint, "GET", token).then((res) => {
//       if (res.error) {
//         console.log("error while requesting home data", res.error);
//         window.localStorage.setItem("token", "");
//         error = res.error;
//       } else {
//         return res;
//       }
//     });
//   });
//   const data = await Promise.all(promises);
//   if (error !== "") {
//     return redirect("/login");
//   } else {
//     const recentTracksFormatted = data[1].items.map(
//       (item: { [key: string]: any }) => {
//         return {
//           ...item.track,
//           imgUrl: item.track.album.images[0].url,
//         };
//       }
//     );
//     return {
//       favoriteArtists: data[0].items,
//       recentTracks: recentTracksFormatted,
//     };
//   }
// }

export default Home;
