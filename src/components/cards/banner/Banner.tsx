import "./banner.css";
// import ourLoveImg from "../../../assets/our-love.png";

const Banner = ({
  title,
  artist,
  size,
  imgUrl,
}: {
  title: string;
  artist: string;
  size: string;
  imgUrl: string;
}) => {
  return (
    <div className="border-gradient">
      <div className="banner-container">
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
          <img className="img'fit" src={imgUrl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
