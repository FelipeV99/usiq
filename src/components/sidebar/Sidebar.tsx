import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";

const Sidebar = () => {
  return (
    <div>
      <p>menu</p>
      <Link to="/">Home</Link>
      <Link to="/">Discover</Link>
      <p>library</p>
      <Link to="/my-songs">Songs</Link>
      <Link to="/my-albums">Albums</Link>
      <Link to="/my-artists">Artists</Link>
      <Searchbar />
    </div>
  );
};

export default Sidebar;
