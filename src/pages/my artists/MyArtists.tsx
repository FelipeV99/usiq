import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-artists.css";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
const MyArtists = () => {
  const myArtists: any = useLoaderData();
  const navigate = useNavigate();
  console.log("my artists from component", myArtists);
  return (
    <div>
      <h2>My Artists</h2>
      <div className="my-artists-container">
        {myArtists.items.map((artist: { [key: string]: any }) => {
          return (
            <div
              key={artist.id}
              className="artist-card-2"
              onClick={() => navigate("/artist/" + artist.id)}
            >
              <div className="ac2-img-container">
                <img src={artist.images[0].url} alt="" />
              </div>
              <p className="bold">{artist.name}</p>
            </div>
          );
        })}
        {/* {myArtists.items.map((artistObj: { [key: string]: any }) => {
          return (
            <ArtistCard
              key={artistObj.id}
              name={artistObj.name}
              ID={artistObj.id}
              imgUrl={artistObj.images[0].url}
            />
          );
        })} */}
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
