import "./home.css";

import { useEffect, useState } from "react";
import { useCurrentSongContext, useTokenContext } from "../../App";
import { fetchWebApi } from "../../config/spotify";
import { Link, useNavigate } from "react-router-dom";
import Tracklist from "../../components/tracklist/Tracklist";
import Banner from "../../components/cards/banner/Banner";

const Home = () => {
  const { token, setToken } = useTokenContext();
  const { currentSong, setCurrentSong } = useCurrentSongContext();

  const navigate = useNavigate();

  const [userTopTracks, setUserTopTracks] = useState<{}[]>([]);
  const [newAlbums, setNewAlbums] = useState<{}[]>([]);
  const [recentTracks, setRecentTracks] = useState<{}[]>([]);
  const [favoriteArtists, setFavoriteArtists] = useState<{}[]>([]);

  useEffect(() => {
    console.log("gonna try to make a request with the token:", token);
    async function getTopTracks() {
      await fetchWebApi("v1/me/top/tracks", "GET", token).then((res) => {
        if (res.error) {
          console.log("error in top tracks", res.error);
        } else {
          console.log("top tracks res", res);
          const topTracks = res.items.slice(0, 10);
          const topTracksWithImage = topTracks.map(
            (track: { [key: string]: any }) => {
              return { ...track, imgUrl: track.album.images[0].url };
            }
          );
          setUserTopTracks(topTracksWithImage);
        }
      });
    }

    async function getRecentlyPlayedTracks() {
      await fetchWebApi("v1/me/player/recently-played", "GET", token).then(
        (res) => {
          if (!res.error) {
            setRecentTracks(res.items);
          }
          console.log("recently playes!: ", res);
        }
      );
    }

    async function getFavoriteArtists() {
      await fetchWebApi("v1/me/top/artists?limit=6", "GET", token).then(
        (res) => {
          console.log("favorite artists", res);
          if (!res.error) {
            setFavoriteArtists(res.items);
          }
        }
      );
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
      getRecentlyPlayedTracks();
      getFavoriteArtists();
    }
  }, [token]);

  function handleOnclickArtist(artistID: string) {
    navigate("artist/" + artistID);
  }
  console.log("new albums!!", newAlbums);

  return (
    <>
      <div className="home-container">
        <div className="banners-container">
          <Banner
            title="Our Love"
            artist="Caribou"
            size="big"
            imgUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2Four-love.webp?alt=media&token=b2e9c4a9-710c-42e5-967f-84d2a32e391c"
          />
          <Banner
            title="Overgrown"
            artist="James Blake"
            size="small"
            imgUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2Fbig-hammer.jpg?alt=media&token=5e9d17b9-a129-4174-8ac1-ea4644b9ff91"
          />
        </div>
        <div className="home-bottom">
          <div className="home-bottom-left">
            <div className="favorite-artists-outer-container">
              <h4>Your favorite artists</h4>
              <div className="favorite-artists-container">
                {favoriteArtists.map((artist: { [key: string]: any }) => {
                  return (
                    <div
                      key={artist.id}
                      className="artist-home-card"
                      onClick={() => handleOnclickArtist(artist.id)}
                    >
                      <div className="artist-img-container">
                        <img src={artist.images[0].url} alt="" />
                      </div>
                      <p className="bold">{artist.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="recently-played-outer-container">
              <h4>Your top tracks</h4>
              <Tracklist tracks={userTopTracks} />
            </div>
          </div>
          <div className="home-bottom-right">
            <div className="new-releases-outer-container">
              <h4>New releases</h4>
              <div className="new-releases-container">
                {newAlbums.map((album: { [index: string]: any }, index) => {
                  return (
                    <div key={index} className="new-releases-row">
                      <div className="nr-row-left">
                        <div className="new-release-img-container">
                          <img src={album.images[0].url} alt="" />
                        </div>
                        <div>
                          <p className="bold">{album.name}</p>
                          <p>{album.artists[0].name}</p>
                        </div>
                      </div>
                      <div className="nr-row-right">
                        <p>{album.release_date}</p>
                      </div>

                      {/* <Link to={"/album/" + album.id}>
                    </Link> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// async function homeLoader(){

// }

export default Home;
