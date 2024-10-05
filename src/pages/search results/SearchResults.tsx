import "./search-results.css";

import Tracklist from "../../components/tracklist/Tracklist";
import { fetchWebApi } from "../../config/spotify";
import { Link, redirect, useLoaderData } from "react-router-dom";
import AlbumCard from "../../components/cards/album card/AlbumCard";
import { Song, ArtistType } from "../../App";

const SearchResults = () => {
  const { songResults, artistResults, albumResults }: any = useLoaderData();
  // console.log("search results", songResults, artistResults, albumResults);
  return (
    <div className="search-results-container">
      {/* <h2>Search Results</h2> */}
      <div className="song-results-outer-container">
        <h4>tracks</h4>
        <Tracklist tracks={songResults} />
      </div>
      <div className="artist-results-outer-container">
        <h4>artists</h4>
        <div className="artists-results-container">
          {artistResults.map((artist: ArtistType) => {
            return (
              <Link
                to={"/artist/" + artist.ID}
                key={artist.ID}
                className="artist-result"
              >
                <img src={artist.imgUrl} alt="" />
                <p className="bold">{artist.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="album-results-outer-container">
        <h4>Albums</h4>
        <div className="album-results-container">
          {albumResults.map((album: { [key: string]: any }) => {
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
  );
};

export async function searchResultsLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let songResults: Song[] = [
    {
      indexInStack: 0,
      songUrl: "",
      imgUrl: "",
      name: "",
      album: "",
      artist: "",
      trackDurationMs: 0,
    },
  ];
  let artistResults: ArtistType[] = [
    {
      ID: "",
      name: "",
      imgUrl: "",
      totalFollowers: 0,
    },
  ];
  let albumResults: { [key: string]: any } = {};

  let isError = false;
  await fetchWebApi(
    `v1/search?q=${params.queryTerm}&type=track,artist,album&limit=6`,
    "GET",
    token
  ).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "");
      isError = true;
    } else {
      songResults = songResults.filter((track: { [key: string]: any }) => {
        return track.preview_url !== null;
      });
      songResults = res.tracks.items.map(
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
      console.log("how aritsts results look like: ", res.artists);
      artistResults = res.artists.items.map(
        (artist: { [key: string]: any }) => {
          return {
            ID: artist.id,
            name: artist.name,
            imgUrl: artist.images[0]?.url || "",
            totalFollowers: artist.followers.total,
          };
        }
      );
      albumResults = res.albums.items;
      // searchResults = res;
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return { songResults, artistResults, albumResults };
  }
}

export default SearchResults;
