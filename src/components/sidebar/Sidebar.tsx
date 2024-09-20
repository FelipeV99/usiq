import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <img src={require("../../assets/usic logo.svg").default} alt="" />
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-section">
          <p className="subheader">MENU</p>
          <div className="sidebar-options">
            <Link to="/">Home</Link>
            <Link to="/">Discover</Link>
          </div>
        </div>
        <div className="sidebar-section">
          <p className="subheader">LIBRARY</p>
          <div className="sidebar-options">
            <Link to="/my-songs">Songs</Link>
            <Link to="/my-albums">Albums</Link>
            <Link to="/my-artists">Artists</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
