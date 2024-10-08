import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./my-artists.css";
import ArtistCard from "../../components/cards/artist card/ArtistCard";
import { ArtistType, useCurrentPageContext } from "../../App";
import { useEffect } from "react";
const MyArtists = () => {
  const myArtists = useLoaderData() as ArtistType[];
  const { setCurrentPage } = useCurrentPageContext();
  useEffect(() => {
    setCurrentPage("Artists");
  }, []);
  return (
    <div>
      <h2>My Artists</h2>
      {myArtists.length > 0 ? (
        <div className="my-artists-container">
          {myArtists.map((artist: ArtistType) => {
            return (
              <ArtistCard
                key={artist.ID}
                ID={artist.ID}
                imgUrl={artist.imgUrl}
                name={artist.name}
                size="big"
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export async function myArtistsLoader() {
  const token = window.localStorage.getItem("token") || "";
  let myArtists: ArtistType[] = [];
  let isError = false;
  await fetchWebApi("v1/me/following?type=artist&limit=18", "GET", token).then(
    (res) => {
      if (res.error) {
        isError = true;
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
        myArtists = artistsFormatted;
      }
    }
  );
  if (isError) {
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://usiq.netlify.app/";
    return redirect(redirectUrl + "login");
  } else {
    return myArtists;
  }
}

export default MyArtists;
