import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import SidebarOptn from "./SidebarOptn";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={require("../../assets/usic logo.svg").default} alt="" />
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-section">
          <p className="subheader">MENU</p>
          <div className="sidebar-options">
            <SidebarOptn
              linkTo="/"
              iconUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fhome.svg?alt=media&token=866bdde1-09b2-4ce1-b997-00fa9928e957"
              text="Home"
            />
            <SidebarOptn
              linkTo="/discover"
              iconUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fcompass.svg?alt=media&token=9d729622-9007-4364-8b52-946237d4da1d"
              text="Discover"
            />
          </div>
        </div>
        <div className="sidebar-section">
          <p className="subheader">LIBRARY</p>
          <div className="sidebar-options">
            <SidebarOptn
              linkTo="/my-artists"
              iconUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fartist.svg?alt=media&token=11052a74-3850-40a9-8dba-7ff9a0a5c3e3"
              text="Artists"
            />
            <SidebarOptn
              linkTo="/my-albums"
              iconUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fdisc.svg?alt=media&token=d1a1b5f4-2ee8-4afb-ae2f-4ebb36153bf4"
              text="Albums"
            />
            <SidebarOptn
              linkTo="/my-songs"
              iconUrl="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fmusic.svg?alt=media&token=139705fa-e436-4390-920b-d7236edfbe55"
              text="Songs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
