import React from "react";
import AsyncImg from "../../components/async img/AsyncImg";

const MyArtistsSkeleton = () => {
  function placeArtistsCards() {
    const artistsCards = [];
    for (let index = 0; index < 18; index++) {
      artistsCards.push(
        <div className="artist-card-2" key={index}>
          <div className="ac2-img-container">
            <AsyncImg src={""} proportions={1} />
          </div>
          <p className="bold skeleton"></p>
        </div>
      );
    }
    return artistsCards;
  }
  return (
    <div>
      <h2>My Artists</h2>
      <div className="my-artists-container">{placeArtistsCards()}</div>
    </div>
  );
};

export default MyArtistsSkeleton;
