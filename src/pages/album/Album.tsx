import { useLoaderData } from "react-router-dom";
import Tracklist from "../../components/tracklist/Tracklist";
import { fetchWebApi } from "../../config/spotify";

const Album = () => {
  const album: any = useLoaderData();
  console.log("album from laoder data", album);
  return (
    <div>
      <h1>{album.name}</h1>
      <Tracklist tracks={album.tracks.items} imgUrl={album.images[0].url} />
    </div>
  );
};

export async function albumLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let album: { [key: string]: any } = {};
  await fetchWebApi("v1/albums/" + params.id, "GET", token).then((res) => {
    console.log(res);
    album = res;
  });
  console.log("returning album:", album);
  return album;
}

export default Album;
