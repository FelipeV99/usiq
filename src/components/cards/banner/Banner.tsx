import { useState } from "react";
import "./banner.css";
import { useNavigate } from "react-router-dom";
// import ourLoveImg from "../../../assets/our-love.png";

const Banner = ({
  title,
  artist,
  size,
  imgUrl,
  albumUrl,
}: {
  title: string;
  artist: string;
  size: string;
  imgUrl: string;
  albumUrl: string;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    // <div
    //   className={`border-gradient ${size === "small" ? "banner-small" : ""}`}
    //   onClick={() => navigate("/album/" + albumUrl)}
    // >
    <div
      className={`banner-container ${isHover ? "hover" : ""} ${
        size === "small" ? "banner-small" : ""
      }`}
      onClick={() => navigate("/album/" + albumUrl)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="banner-left">
        <div className="banner-left-top">
          <p className="other-p">Available now</p>
          {size === "big" ? <h1>{title}</h1> : <h2>{title}</h2>}

          <p>{artist}</p>
        </div>
        <div className="banner-left-bottom">
          <button className="btn-primary">
            Play now{" "}
            <img
              src={require("../../../assets/Icons/play.svg").default}
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="banner-right">
        <img src={imgUrl} alt="" />
      </div>
    </div>
    // </div>
  );
};

export default Banner;
