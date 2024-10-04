import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-artists.css";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
const MyArtists = () => {
  const myArtists: any = useLoaderData();
  return (
    <div>
      <h2>My Artists</h2>
      <div className="my-artists-container">
        {myArtists.items.map((artist: { [key: string]: any }) => {
          return (
            <ArtistCard
              key={artist.id}
              ID={artist.id}
              imgUrl={artist.images[0].url}
              name={artist.name}
              size="big"
            />
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
  await fetchWebApi("v1/me/following?type=artist&limit=18", "GET", token).then(
    (res) => {
      if (res.error) {
        isError = true;
      } else {
        myArtists = res;
      }
    }
  );
  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return myArtists.artists;
  }
}

export default MyArtists;
