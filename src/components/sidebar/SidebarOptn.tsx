import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentPageContext } from "../../App";

const SidebarOptn = ({
  linkTo,
  iconUrl,
  text,
}: {
  linkTo: string;
  iconUrl: string;
  text: string;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { currentPage, setCurrentPage } = useCurrentPageContext();

  return (
    <Link
      to={linkTo}
      className={`sidebar-optn ${
        currentPage === text ? "active" : isHover ? "hover" : ""
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setCurrentPage(text)}
    >
      <div className="sidebar-optn-left">
        <img src={iconUrl} alt="" />
        <p>{text}</p>
      </div>
      {isHover || currentPage === text ? <div className="dot"></div> : <></>}
    </Link>
  );
};

export default SidebarOptn;
