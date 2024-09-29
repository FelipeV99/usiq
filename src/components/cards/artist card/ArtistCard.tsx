import { useNavigate } from "react-router-dom";
import "./artist-card.css";
import { useState } from "react";
import AsyncImg from "../../async img/AsyncImg";

const ArtistCard = ({
  ID,
  imgUrl,
  name,
}: {
  ID: string;
  imgUrl: string;
  name: string;
}) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<boolean>(false);
  function handleOnclickArtist(artistID: string) {
    navigate("/artist/" + artistID);
  }
  return (
    <div
      className={`artist-home-card ${isHover ? "hover" : ""}`}
      onClick={() => handleOnclickArtist(ID)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="artist-img-container">
        {/* <img src={imgUrl} alt="" /> */}
        <AsyncImg src={imgUrl} proportions={1} />
      </div>

      <p className="bold">{name}</p>
    </div>
  );
};

export default ArtistCard;
