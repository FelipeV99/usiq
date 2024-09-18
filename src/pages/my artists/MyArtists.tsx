import { Link, redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-artists.css";
const MyArtists = () => {
  const myArtists: any = useLoaderData();
  console.log("my artists from component", myArtists);
  return (
    <div>
      my artists
      <div>
        {myArtists.items.map((artistObj: { [key: string]: any }) => {
          return (
            <div key={artistObj.id}>
              {" "}
              <Link to={"/artist/" + artistObj.id}>
                {artistObj.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function myArtistsLoader() {
  const token = window.localStorage.getItem("token") || "";
  let myArtists: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/me/following?type=artist", "GET", token).then((res) => {
    if (res.error) {
      isError = true;
    } else {
      myArtists = res;
    }
  });
  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    console.log("returning my artists:", myArtists.artists);
    return myArtists.artists;
  }
}

export default MyArtists;
