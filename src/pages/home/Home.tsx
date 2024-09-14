import React, { useState } from "react";
import { fetchWebApi } from "../../config/spotify";
import { useTokenContext } from "../../App";

const Home = () => {
  //   const { token, setToken } = useContext<{
  //     token: string;
  //     setToken: any;
  //   } | null>(TokenContext);

  const { token, setToken } = useTokenContext();
  console.log("from the context!!!", token);

  const [topArtists, setTopArtists] = useState<string[]>([]);

  async function getTopArtists() {
    // await fetchWebApi("me/top/artists", "GET", token).then((res) => {
    //   if (res.error) {
    //     setToken("expired");
    //   }
    //   console.log(res);
    // });
  }
  return (
    <>
      <div>
        <h1>artists</h1>
        <img src="" alt="" />
        <p>play</p>
      </div>
    </>
  );
};

export default Home;
