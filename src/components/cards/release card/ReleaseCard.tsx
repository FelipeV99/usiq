import { format } from "date-fns";
import "./release-card.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ReleaseCard = ({
  id,
  imgUrl,
  name,
  artistName,
  releaseDate,
}: {
  id: string;
  imgUrl: string;
  name: string;
  artistName: string;
  releaseDate: string;
}) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<boolean>(false);

  function formatAlbumDate(date: string) {
    const splitDate = date.split("-");
    const newDate = new Date(
      Number(splitDate[0]),
      Number(splitDate[1]),
      Number(splitDate[2])
    );

    return format(newDate, "d MMM");
  }
  return (
    <div
      className={`new-releases-row ${isHover ? "hover" : ""}`}
      onClick={() => navigate("/album/" + id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="nr-row-left">
        <div className="new-release-img-container">
          <img src={imgUrl} alt="" />
        </div>
        <div>
          <p className="bold">{name}</p>
          <p>{artistName}</p>
        </div>
      </div>
      <div className="nr-row-right">
        <p className="other-p">{formatAlbumDate(releaseDate)}</p>
      </div>
    </div>
  );
};

export default ReleaseCard;
