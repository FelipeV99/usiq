import "./my-albums.css";

import { fetchWebApi } from "../../config/spotify";
import { redirect, useLoaderData } from "react-router-dom";
import AlbumCard from "../../components/cards/album card/AlbumCard";
import { AlbumType, useCurrentPageContext } from "../../App";
import { useEffect } from "react";

const MyAlbums = () => {
  const myAlbums = useLoaderData() as AlbumType[];
  const { setCurrentPage } = useCurrentPageContext();
  useEffect(() => {
    setCurrentPage("Albums");
  }, []);
  return (
    <div className="my-albums-outer-container">
      <h2>My Albums</h2>
      {myAlbums.length > 0 ? (
        <div className="my-albums-container">
          {myAlbums.map((album: AlbumType) => {
            return <AlbumCard key={album.id} album={album} />;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export async function myAlbumsLoader() {
  const token = window.localStorage.getItem("token") || "";
  let myAlbums: AlbumType[] = [];
  let isError = false;
  await fetchWebApi("v1/me/albums", "GET", token).then((res) => {
    if (res.error) {
      isError = true;
    } else {
      myAlbums = res.items.map((albumObj: { [key: string]: any }) => {
        return {
          id: albumObj.album.id,
          name: albumObj.album.name,
          artist: albumObj.album.artists[0].name,
          totalTracks: albumObj.album.total_tracks,
          releaseDate: albumObj.album.release_date,
          imgUrl: albumObj.album.images[0].url,
        };
      });
    }
  });
  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return myAlbums;
  }
}

export default MyAlbums;
