import "./topbar.css";
import Searchbar from "../searchbar/Searchbar";
import { useEffect, useState } from "react";
import { fetchWebApi } from "../../config/spotify";
import { useTokenContext } from "../../App";

const Topbar = () => {
  const { token, setToken } = useTokenContext();
  const [userProfileImgUrl, setUserProfileImgUrl] = useState<string>("");

  useEffect(() => {
    async function getUser() {
      fetchWebApi("v1/me", "GET", token).then((res) => {
        if (res.error) {
          console.log("error reqeusting user profile", res.error);
        } else {
          // console.log("user profile", res);
          // setUserProfileImgUrl();
        }
      });
    }

    getUser();
  }, [token]);

  return (
    <div className="topbar-container">
      <Searchbar />
      <div className="profile-img-container">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2Fprofile.png?alt=media&token=665a1206-7ae0-4725-a2e3-1a10acb3e563"
          alt=""
        />
      </div>
    </div>
  );
};

export default Topbar;
