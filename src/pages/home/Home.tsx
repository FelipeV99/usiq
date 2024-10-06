import "./home.css";

import { useEffect, useState } from "react";
import { fetchWebApi } from "../../config/spotify";
import Banner from "../../components/cards/banner/Banner";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
import RecentTracks from "./RecentTracks";
import AlbumCard from "../../components/cards/album card/AlbumCard";
import AsyncImg from "../../components/async img/AsyncImg";

import { Song, ArtistType, AlbumType, useTokenContext } from "../../App";

const Home = () => {
  const { token, setToken } = useTokenContext();
  const [newAlbums, setNewAlbums] = useState<AlbumType[]>([]);
  const [recentTracks, setRecentTracks] = useState<Song[]>([]);
  const [isRecentTracksLoading, setIsRecentTracksLoading] =
    useState<boolean>(false);
  const [favoriteArtists, setFavoriteArtists] = useState<ArtistType[]>([]);
  const [isFavoriteArtistsLoading, setIsFavoriteArtistsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    async function getRecentlyPlayedTracks() {
      setIsRecentTracksLoading(true);
      await fetchWebApi(
        "v1/me/player/recently-played?limit=6",
        "GET",
        token
      ).then((res) => {
        if (!res.error) {
          const recentTracksFormatted = res.items.map(
            (item: { [key: string]: any }, index: number) => {
              // console.log("track obj", item.track);
              return {
                indexInStack: index,
                name: item.track.name,
                album: item.track.album.name,
                artist: item.track.artists[0].name,
                imgUrl: item.track.album.images[0].url,
                songUrl: item.track.preview_url,
                trackDurationMs: item.track.duration_ms,
              };
            }
          );
          setRecentTracks(recentTracksFormatted);
          setIsRecentTracksLoading(false);
        } else {
          console.log("there was an error getitng recent tracks");
          window.localStorage.setItem("token", "");

          setIsRecentTracksLoading(false);
          setToken("");
        }
      });
    }

    async function getFavoriteArtists() {
      setIsFavoriteArtistsLoading(true);
      await fetchWebApi(
        "v1/me/top/artists?limit=9&offset=7",
        "GET",
        token
      ).then((res) => {
        if (!res.error) {
          const favArtistsFormatted = res.items.map(
            (artist: { [key: string]: any }) => {
              return {
                ID: artist.id,
                name: artist.name,
                imgUrl: artist.images[0].url,
                totalFollowers: artist.followers.total,
              };
            }
          );
          setFavoriteArtists(favArtistsFormatted);
        } else {
          window.localStorage.setItem("token", "");
          setToken("");
        }
        setIsFavoriteArtistsLoading(false);
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
          window.localStorage.setItem("token", "");
          setToken("");
        } else {
          const newReleasesFormatted = res.albums.items.map(
            (album: { [key: string]: any }) => {
              return {
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                imgUrl: album.images[0].url,
              };
            }
          );
          // console.log("what res for new releases looks like", res);
          setNewAlbums(newReleasesFormatted);
        }
      });
    }
    if (token !== "" && token !== "expired") {
      getNewAlbumReleases();
      getRecentlyPlayedTracks();
      getFavoriteArtists();
    }
  }, []);

  function placeRecentTracksSkeleton() {
    const recentCards = [];
    for (let index = 0; index < 6; index++) {
      recentCards.push(
        <div className="song-row-2" key={index}>
          <div className="sr2-left">
            <div className="sr2-img-container">
              <AsyncImg src={""} proportions={1} />
            </div>
            <div className="sr2-info">
              <p className="bold skeleton"></p>
              <p className="other-p skeleton"></p>
            </div>
          </div>
          <div className="sr2-right">
            <p className="other-p skeleton"></p>
          </div>
        </div>
      );
    }
    return recentCards;
  }

  function placeFavoriteArtistsSkeleton() {
    const favCards = [];
    for (let index = 0; index < 9; index++) {
      favCards.push(
        <div className={`artist-home-card`} key={index}>
          <div className="artist-img-container">
            <AsyncImg src={""} proportions={1} />
          </div>

          <p className="bold skeleton"></p>
        </div>
      );
    }
    return favCards;
  }

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
            {isFavoriteArtistsLoading
              ? placeFavoriteArtistsSkeleton()
              : favoriteArtists.map((artist: ArtistType, index: number) => {
                  return (
                    <ArtistCard
                      key={index}
                      ID={artist.ID}
                      imgUrl={artist.imgUrl}
                      name={artist.name}
                    />
                  );
                })}
          </div>
        </div>

        <div className="recently-played-outer-container">
          <h4>Recently played tracks</h4>
          {isRecentTracksLoading ? (
            <div className="rt-container">
              <div className="rt-grid">{placeRecentTracksSkeleton()}</div>
            </div>
          ) : (
            <RecentTracks tracks={recentTracks} />
          )}
        </div>
        <div className="home-bottom-right">
          <div className="new-releases-outer-container">
            <h4>New releases</h4>
            <div className="new-releases-container">
              {newAlbums.map((album: AlbumType, index: number) => {
                return <AlbumCard key={index} album={album} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
