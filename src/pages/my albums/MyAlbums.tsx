import "./my-albums.css";

import { fetchWebApi } from "../../config/spotify";
import { Link, redirect, useLoaderData } from "react-router-dom";

const MyAlbums = () => {
  const myAlbums: any = useLoaderData();
  console.log("my albums from component", myAlbums);
  return (
    <div className="my-albums-outer-container">
      <h2>My Albums</h2>
      <div className="my-albums-container">
        {myAlbums.items.map((albumObj: { [key: string]: any }) => {
          return (
            <Link
              to={"/album/" + albumObj.album.id}
              key={albumObj.album.id}
              className="album-card"
            >
              <div className="ac-img-container">
                <img src={albumObj.album.images[0].url} alt="" />
              </div>
              <div className="ac-info">
                <p className="bold">{albumObj.album.name}</p>
                <p className="other-p">{albumObj.album.artists[0].name}</p>
              </div>
            </Link>
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
