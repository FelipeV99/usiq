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
            <Link to="/" className="sidebar-optn active">
              <div className="sidebar-optn-left">
                <img
                  src={require("../../assets/Icons/home.svg").default}
                  alt=""
                />
                <p>Home</p>
              </div>
              <div className="dot"></div>
            </Link>
            <Link to="/" className="sidebar-optn">
              <div className="sidebar-optn-left">
                <img
                  src={require("../../assets/Icons/compass.svg").default}
                  alt=""
                />
                <p>Discover</p>
              </div>
              {/* <div className="dot"></div> */}
            </Link>
          </div>
        </div>
        <div className="sidebar-section">
          <p className="subheader">LIBRARY</p>
          <div className="sidebar-options">
            <Link to="/my-artists" className="sidebar-optn">
              <div className="sidebar-optn-left">
                <img
                  src={require("../../assets/Icons/artist.svg").default}
                  alt=""
                />
                <p>Artists</p>
              </div>
              {/* <div className="dot"></div> */}
            </Link>
            <Link to="/my-album" className="sidebar-optn">
              <div className="sidebar-optn-left">
                <img
                  src={require("../../assets/Icons/disc.svg").default}
                  alt=""
                />
                <p>Albums</p>
              </div>
              {/* <div className="dot"></div> */}
            </Link>
            <Link to="/my-songs" className="sidebar-optn">
              <div className="sidebar-optn-left">
                <img
                  src={require("../../assets/Icons/music.svg").default}
                  alt=""
                />
                <p>Songs</p>
              </div>
              {/* <div className="dot"></div> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
