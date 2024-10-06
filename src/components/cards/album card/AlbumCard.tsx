import { useNavigate } from "react-router-dom";
import "./album-card.css";
import AsyncImg from "../../async img/AsyncImg";
import { useCurrentPageContext } from "../../../App";
import { useState } from "react";
import { AlbumType } from "../../../App";

const AlbumCard = ({ album }: { album: AlbumType }) => {
  const { setCurrentPage } = useCurrentPageContext();
  const [isHover, setIsHover] = useState<boolean>(false);

  const navigate = useNavigate();
  function handleOnClickAlbum() {
    setCurrentPage("Album");
    navigate("/album/" + album.id);
  }
  return (
    <div
      className="album-card-container"
      onClick={handleOnClickAlbum}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="ac-img-container">
        <AsyncImg
          src={album.imgUrl}
          proportions={1}
          clickableImg={true}
          isMouseOver={isHover}
        />
        {/* <img src={imgUrl} alt="" /> */}
      </div>
      <div className="ac-info">
        <p className="bold">{album.name}</p>
        <p>{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
