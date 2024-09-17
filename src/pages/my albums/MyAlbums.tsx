import React from "react";
import { fetchWebApi } from "../../config/spotify";
import { Link, redirect, useLoaderData } from "react-router-dom";

const MyAlbums = () => {
  const myAlbums: any = useLoaderData();
  console.log("my albums from component", myAlbums);
  return (
    <div>
      my albums
      <div>
        {myAlbums.items.map((albumObj: { [key: string]: any }) => {
          return (
            <div key={albumObj.album.id}>
              {" "}
              <Link to={"/album/" + albumObj.album.id}>
                {albumObj.album.name}
              </Link>
            </div>
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
