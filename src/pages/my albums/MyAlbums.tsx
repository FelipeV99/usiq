import "./my-albums.css";

import { fetchWebApi } from "../../config/spotify";
import { redirect, useLoaderData } from "react-router-dom";
import AlbumCard from "../../components/cards/album card/AlbumCard";

const MyAlbums = () => {
  const myAlbums: any = useLoaderData();
  console.log("my albums from component", myAlbums);
  return (
    <div className="my-albums-outer-container">
      <h2>My Albums</h2>
      <div className="my-albums-container">
        {myAlbums.items.map((albumObj: { [key: string]: any }) => {
          return (
            <AlbumCard
              key={albumObj.album.id}
              id={albumObj.album.id}
              name={albumObj.album.name}
              artistName={albumObj.album.artists[0].name}
              imgUrl={albumObj.album.images[0].url}
            />
          );
        })}
      </div>
    </div>
  );
};

export async function myAlbumsLoader() {
  const token = window.localStorage.getItem("token") || "";
  let myAlbums: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/me/albums", "GET", token).then((res) => {
    if (res.error) {
      isError = true;
    } else {
      myAlbums = res;
    }
  });
  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    console.log("returning my albums:", myAlbums);
    return myAlbums;
  }
}

export default MyAlbums;
