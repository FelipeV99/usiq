import "./home.css";

import { useEffect, useState } from "react";
import { fetchWebApi } from "../../config/spotify";
import Banner from "../../components/cards/banner/Banner";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
import RecentTracks from "./RecentTracks";
import AlbumCard from "../../components/cards/album card/AlbumCard";
import AsyncImg from "../../components/async img/AsyncImg";

import {
  Song,
  ArtistType,
  AlbumType,
  useTokenContext,
  useCurrentPageContext,
} from "../../App";

const Home = () => {
  const { token, setToken } = useTokenContext();
  const { setCurrentPage } = useCurrentPageContext();

  const [newAlbums, setNewAlbums] = useState<AlbumType[]>([]);
  const [recentTracks, setRecentTracks] = useState<Song[]>([]);
  const [isRecentTracksLoading, setIsRecentTracksLoading] =
    useState<boolean>(false);
  const [favoriteArtists, setFavoriteArtists] = useState<ArtistType[]>([]);
  const [isFavoriteArtistsLoading, setIsFavoriteArtistsLoading] =
    useState<boolean>(false);
  const [followedArtists, setFollowedArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    async function getRecentlyPlayedTracks() {
      setIsRecentTracksLoading(true);
      await fetchWebApi(
        "v1/me/player/recently-played?limit=6",
        "GET",
        token
      ).then((res) => {
        if (!res.error) {
          if (res.items.length > 0) {
            const recentTracksFormatted = res.items.map(
              (item: { [key: string]: any }, index: number) => {
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
          }
        } else {
          console.log("error while retrieving recent tracks,", res.error);
          window.localStorage.setItem("token", "");
          setToken("");
        }
        setIsRecentTracksLoading(false);
      });
    }

    async function getFavoriteArtists() {
      setIsFavoriteArtistsLoading(true);
      await fetchWebApi("v1/me/top/artists?limit=9", "GET", token).then(
        (res) => {
          if (!res.error) {
            if (res.items.length > 0) {
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
            }
          } else {
            console.log("error while retrieving favorite artists,", res.error);

            window.localStorage.setItem("token", "");
            setToken("");
          }
          setIsFavoriteArtistsLoading(false);
        }
      );
    }

    async function getFollowedArtists() {
      await fetchWebApi(
        "v1/me/following?type=artist&limit=9",
        "GET",
        token
      ).then((res) => {
        if (res.error) {
          console.log("error while retrieving followed artists,", res.error);
          window.localStorage.setItem("token", "");
          setToken("");
        } else {
          const artistsFormatted = res.artists.items.map(
            (artist: { [key: string]: any }) => {
              return {
                ID: artist.id,
                name: artist.name,
                imgUrl: artist.images[0].url,
                totalFollowers: artist.followers.total,
              };
            }
          );
          setFollowedArtists(artistsFormatted);
        }
      });
    }

    async function getNewAlbumReleases() {
      await fetchWebApi(
        "v1/browse/new-releases?limit=12&offset=14",
        "GET",
        token
      ).then((res) => {
        if (res.error) {
          console.log("error while retrieving new album releases,", res.error);

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
    if (token !== "") {
      getNewAlbumReleases();
      getRecentlyPlayedTracks();
      getFavoriteArtists();
      getFollowedArtists();
    }
    setCurrentPage("Home");
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
          title="Estara"
          artist="Teebs"
          size="small"
          imgUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2Festara.jpg?alt=media&token=33cb85f5-44bc-4964-b04e-d5255407313b"
          albumUrl="350QMGh64zFt7HjSS9xaOH"
        />
      </div>

      <div className="home-bottom">
        <div className="favorite-artists-outer-container">
          <h4>Your favorite artists</h4>
          {favoriteArtists.length > 0 ? (
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
          ) : (
            <div className="favorite-artists-container">
              {followedArtists.map((artist: ArtistType, index: number) => {
                return (
                  <ArtistCard
                    key={artist.ID}
                    ID={artist.ID}
                    imgUrl={artist.imgUrl}
                    name={artist.name}
                  />
                );
              })}
            </div>
          )}
        </div>

        {recentTracks.length > 0 ? (
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
        ) : (
          <></>
        )}

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
