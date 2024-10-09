import React, { useEffect, useState } from "react";
// import { fetchWebApi } from '../../config/spotify'
import "./searchbar.css";
import { useNavigate } from "react-router-dom";
import { useCurrentPageContext } from "../../App";

const Searchbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(false);
  // const { setCurrentPage } = useCurrentPageContext();

  // useEffect(() => {
  //   if (isActive) {
  //     setCurrentPage("Search");
  //   } else {
  //     setCurrentPage("Other");
  //   }
  // }, [isActive]);

  async function handleOnSearch(e: React.FormEvent<HTMLInputElement>) {
    const query = e.currentTarget.value || "";
    if (query !== "") {
      navigate("search/" + query);
    }
  }

  return (
    <div className={`searchbar-border`}>
      <div className={`search-container ${isActive ? "active" : ""}`}>
        <img src={require("../../assets/Icons/search.svg").default} alt="" />
        <input
          className="search-input"
          type="text"
          placeholder="search songs, albums and artists"
          onChange={handleOnSearch}
          onFocusCapture={() => setIsActive(true)}
          onBlurCapture={() => setIsActive(false)}
        />
      </div>
    </div>
  );
};

export default Searchbar;
