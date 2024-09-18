import { redirect, useLoaderData } from "react-router-dom";
import { fetchWebApi } from "../../config/spotify";
import "./artist.css"
import { useEffect, useState } from "react";
import Tracklist from "../../components/tracklist/Tracklist";

const Artist = () => {

    const artist: any = useLoaderData();
    console.log("artist from component", artist)
    const [topTracks, setTopTracks]= useState<{}[]>([])
    useEffect(()=>{
        async function getTopTracks(){
            let isError = false;
            let topTracksReq: { [key: string]: any } = {};
            const token = window.localStorage.getItem("token") || "";
            await fetchWebApi(`v1/artists/${artist.id}/top-tracks`, "GET", token).then((res) => {
                if (res.error) {
                  window.localStorage.setItem("token", "undefined");
                  isError = true;
                } else {
                    topTracksReq = res;
                     const topTracksWithImage = topTracksReq.tracks.map((track:  { [key: string]: any })=>{
                        return {...track, imgUrl: track.album.images[0].url}
                      })
                    setTopTracks(topTracksWithImage)
                }
              });
        }
        getTopTracks()
    },[])
  return (
    <div className="artist-container">
        <h1>{artist.name}</h1>
        <div>
        <img src={artist.images[0].url} alt="" className="img-fit" />

        </div>
        <h2>popular songs</h2>
        <Tracklist tracks={topTracks} />
    </div>
  )
}

export async function artistLoader({ params }: { [key: string]: any }) {
    const token = window.localStorage.getItem("token") || "";
    let artist: { [key: string]: any } = {};
    let isError = false;
    await fetchWebApi("v1/artists/" + params.id, "GET", token).then((res) => {
      if (res.error) {
        window.localStorage.setItem("token", "undefined");
        isError = true;
      } else {
        artist = res;
      }
    });
  
    if (isError) {
      return redirect("http://localhost:3000/login");
    } else {
      return artist;
    }

    
}

export default Artist