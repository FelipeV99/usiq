import React from "react";
import AsyncImg from "../../components/async img/AsyncImg";

const ArtistSkeleton = () => {
  function placeSongs() {
    const songCards = [];
    for (let i = 0; i < 18; i++) {
      songCards.push(<div className="track-row skeleton"></div>);
    }
    return songCards;
  }
  return (
    <div className="artist-container">
      <div className="artist-header">
        <div
          className="header-background"
          //   style={{
          //     background: `url(${artist.images[0].url}) no-repeat`,
          //     backgroundSize: "cover",
          //     backgroundPositionY: "50%",
          //   }}
        ></div>
        <div className="background-overlay"></div>

        <div className="ah-img-container">
          {/* <img src="" alt="" /> */}
          <AsyncImg src="" proportions={1} />
        </div>
        <div className="ah-info">
          <div>
            <h1 className="skeleton"></h1>
          </div>
          <div className="followers-container">
            <p className="skeleton"></p>
            <div className="header-btns">
              {/* <button
                className="btn-secondary"
                // onClick={handleOnClickFollowUnfollow}
              >
                FLOWO
              </button>
              <button className="btn-round">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fplay.svg?alt=media&token=19b6a1a6-2445-42e7-be85-5b2f79584042"
                  alt=""
                />
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="artist-content-container">
        <h2 className="skeleton"></h2>
        <div className="my-songs-container skeleton">
          <div className="tracklist-container">{placeSongs()}</div>
        </div>
        {/* <Tracklist tracks={topTracks} /> */}
      </div>
    </div>
  );
};

export default ArtistSkeleton;
