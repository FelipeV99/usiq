import { useNavigate } from "react-router-dom";
import "./artist-card.css";
import { useState } from "react";

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
    navigate("artist/" + artistID);
  }
  return (
    <div
      key={ID}
      className={`artist-home-card ${isHover ? "hover" : ""}`}
      onClick={() => handleOnclickArtist(ID)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="artist-border">
        <div className="artist-img-container">
          <img src={imgUrl} alt="" />
        </div>
      </div>

      <p className="bold">{name}</p>
    </div>
  );
};

export default ArtistCard;
