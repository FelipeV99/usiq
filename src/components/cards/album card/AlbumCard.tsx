import { useNavigate } from "react-router-dom";
import "./album-card.css";
import AsyncImg from "../../async img/AsyncImg";

const AlbumCard = ({
  id,
  imgUrl,
  name,
  artistName,
}: {
  id: string;
  imgUrl: string;
  name: string;
  artistName: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="album-card-container"
      onClick={() => navigate("/album/" + id)}
    >
      <div className="ac-img-container">
        <AsyncImg src={imgUrl} proportions={1} />
        {/* <img src={imgUrl} alt="" /> */}
      </div>
      <div className="ac-info">
        <p className="bold">{name}</p>
        <p>{artistName}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
