import React from "react";
import AsyncImg from "../../components/async img/AsyncImg";

const DiscoverSkeleton = () => {
  return (
    <div className="discover-container">
      <div className="featured-playlists-container">
        <div className="featured-playlist-card skeleton"></div>
        <div className="featured-playlist-card skeleton"></div>
        <div className="featured-playlist-card skeleton"></div>
        <div className="featured-playlist-card skeleton"></div>
      </div>
      <div className="recommended-tracks-outer-container">
        <h4 className="skeleton"></h4>
        <div className="rt-container">
          <div className="rt-grid">
            <div className="song-row-2">
              <div className="sr2-left">
                <div className="sr2-img-container">
                  {/* <img src={track.imgUrl} alt="" /> */}
                  <AsyncImg src={""} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="body-1 skeleton"></p>
                  <p className="body-3 skeleton"></p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="body-3 skeleton"></p>
              </div>
            </div>
            <div className="song-row-2">
              <div className="sr2-left">
                <div className="sr2-img-container">
                  {/* <img src={track.imgUrl} alt="" /> */}
                  <AsyncImg src={""} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="body-1 skeleton"></p>
                  <p className="body-3 skeleton"></p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="body-3 skeleton"></p>
              </div>
            </div>
            <div className="song-row-2">
              <div className="sr2-left">
                <div className="sr2-img-container">
                  {/* <img src={track.imgUrl} alt="" /> */}
                  <AsyncImg src={""} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="body-1 skeleton"></p>
                  <p className="body-3 skeleton"></p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="body-3 skeleton"></p>
              </div>
            </div>
            <div className="song-row-2">
              <div className="sr2-left">
                <div className="sr2-img-container">
                  {/* <img src={track.imgUrl} alt="" /> */}
                  <AsyncImg src={""} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="body-1 skeleton"></p>
                  <p className="body-3 skeleton"></p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="body-3 skeleton"></p>
              </div>
            </div>
            <div className="song-row-2">
              <div className="sr2-left">
                <div className="sr2-img-container">
                  {/* <img src={track.imgUrl} alt="" /> */}
                  <AsyncImg src={""} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="body-1 skeleton"></p>
                  <p className="body-3 skeleton"></p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="body-3 skeleton"></p>
              </div>
            </div>
            <div className="song-row-2">
              <div className="sr2-left">
                <div className="sr2-img-container">
                  {/* <img src={track.imgUrl} alt="" /> */}
                  <AsyncImg src={""} proportions={1} />
                </div>
                <div className="sr2-info">
                  <p className="body-1 skeleton"></p>
                  <p className="body-3 skeleton"></p>
                </div>
              </div>
              <div className="sr2-right">
                <p className="body-3 skeleton"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSkeleton;
