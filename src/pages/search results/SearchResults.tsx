import Tracklist from "../../components/tracklist/Tracklist";
import { fetchWebApi } from "../../config/spotify";
import { Link, redirect, useLoaderData } from "react-router-dom";

const SearchResults = () => {
  const searchResults: any = useLoaderData();

  return (
    <div>
      <h2>SearchResults</h2>
      <div>
        <h4>tracks</h4>
        <Tracklist tracks={searchResults.tracks.items} />
        <div>
          {searchResults.tracks.items.map((track: { [key: string]: any }) => {
            return <p key={track.id}>{track.name}</p>;
          })}
        </div>
      </div>
      <div>
        <h4>artists</h4>
        <div>
          {searchResults.artists.items.map((artist: { [key: string]: any }) => {
            return (
              <Link to={"/artist/" + artist.id} key={artist.id}>
                {artist.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function searchResultsLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let searchResults: { [key: string]: any } = {};

  let isError = false;
  await fetchWebApi(
    `v1/search?q=${params.queryTerm}&type=track,artist,album`,
    "GET",
    token
  ).then((res) => {
    if (res.error) {
      window.localStorage.setItem("token", "undefined");
      isError = true;
    } else {
      console.log("search results", res);
      searchResults = res;
    }
    // console.log("search results", res)
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return searchResults;
  }
}

export default SearchResults;
