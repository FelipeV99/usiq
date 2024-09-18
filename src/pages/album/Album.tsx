import { redirect, useLoaderData } from "react-router-dom";
import Tracklist from "../../components/tracklist/Tracklist";
import { fetchWebApi } from "../../config/spotify";

const Album = () => {
  const album: any = useLoaderData();
  //   console.log("album from laoder data", album);
  const albumWithImg = album.tracks.items.map(
    (track: { [key: string]: any }) => {
      return { ...track, imgUrl: album.images[0].url };
    }
  );
  //   console.log("album with images link: ", albumWithImg);

  return (
    <div>
      <h1>{album.name}</h1>
      <Tracklist tracks={albumWithImg} imgUrl={album.images[0].url} />
    </div>
  );
};

export async function albumLoader({ params }: { [key: string]: any }) {
  const token = window.localStorage.getItem("token") || "";
  let album: { [key: string]: any } = {};
  let isError = false;
  await fetchWebApi("v1/albums/" + params.id, "GET", token).then((res) => {
    if (res.error) {
      // console.log("there was an error retrieving the album", res.error);
      window.localStorage.setItem("token", "undefined");
      isError = true;
    } else {
      album = res;
    }
  });

  if (isError) {
    return redirect("http://localhost:3000/login");
  } else {
    return album;
  }
}

export default Album;
