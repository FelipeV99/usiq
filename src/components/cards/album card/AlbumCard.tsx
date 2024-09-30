import { useNavigate } from "react-router-dom";
import "./album-card.css";
import AsyncImg from "../../async img/AsyncImg";
import { useCurrentPageContext } from "../../../App";

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
  const { setCurrentPage } = useCurrentPageContext();

  const navigate = useNavigate();
  function handleOnClickAlbum() {
    setCurrentPage("Album");
    navigate("/album/" + id);
  }
  return (
    <div className="album-card-container" onClick={handleOnClickAlbum}>
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
