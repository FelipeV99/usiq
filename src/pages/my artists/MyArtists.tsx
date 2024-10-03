import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-artists.css";
import AsyncImg from "../../components/async img/AsyncImg";
import { useCurrentPageContext } from "../../App";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
// import ArtistCard from "../../components/cards/artist card/ArtistCard";
const MyArtists = () => {
  const myArtists: any = useLoaderData();
  const { setCurrentPage } = useCurrentPageContext();
  const navigate = useNavigate();
  console.log("my artists from component", myArtists);
  function handleOnClickArtist(artistID: string) {
    setCurrentPage("Artist");
    navigate("/artist/" + artistID);
  }
  return (
    <div>
      <h2>My Artists</h2>
      <div className="my-artists-container">
        {myArtists.items.map((artist: { [key: string]: any }) => {
          return (
            // <div
            //   key={artist.id}
            //   className="artist-card-2"
            //   onClick={() => {
            //     handleOnClickArtist(artist.id);
            //   }}
            // >
            //   <div className="ac2-img-container">
            //     <AsyncImg src={artist.images[0].url} proportions={1} />
            //   </div>
            //   <p className="bold">{artist.name}</p>
            // </div>
            <ArtistCard
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
    console.log("returning my artists:", myArtists.artists);
    return myArtists.artists;
  }
}

export default MyArtists;
