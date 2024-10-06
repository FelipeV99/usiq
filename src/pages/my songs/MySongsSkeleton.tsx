import React from "react";

const MySongsSkeleton = () => {
  function placeSongs() {
    const songCards = [];
    for (let i = 0; i < 18; i++) {
      songCards.push(
        <div className="track-row skeleton" key={i}>
          {/* <div className="track-row-left">
          <div className="track-img-container">
            <img src="" alt="" />
          </div>
          <div className="track-row-info">
            <p className="bold">name</p>
            <p>artistName</p>
          </div>
          <p className="other-p">albumName</p>
        </div>
        <div className="track-row-right">
          <p className="other-p">12:23</p>
        </div> */}
        </div>
      );
    }
    return songCards;
  }
  return (
    <div>
      <h2>My Songs</h2>
      <div className="my-songs-container">
        <div className="tracklist-container">{placeSongs()}</div>
      </div>
    </div>
  );
};

export default MySongsSkeleton;
