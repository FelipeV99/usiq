// import ""
import AsyncImg from "../../components/async img/AsyncImg";
import "../../components/cards/banner/banner.css";

const HomeSkeleton = () => {
  const favoriteAristsQuant = 9;
  return (
    <div className="home-container">
      <div className="banners-container">
        <div className="banner-container skeleton">
          <div className="banner-left">
            <div className="banner-left-top">
              <p className="body-3 skeleton"></p>
              <h2 className="skeleton"></h2>

              <p className="skeleton"></p>
            </div>
            <div className="banner-left-bottom">
              <button className="btn-primary skeleton"></button>
            </div>
          </div>
          <div className="banner-right">
            <AsyncImg src={""} proportions={1} />
          </div>
        </div>
        <div className="banner-container skeleton">
          <div className="banner-left">
            <div className="banner-left-top">
              <p className="body-3 skeleton"></p>
              <h2 className="skeleton"></h2>

              <p className="skeleton"></p>
            </div>
            <div className="banner-left-bottom">
              <button className="btn-primary skeleton"></button>
            </div>
          </div>
          <div className="banner-right">
            <AsyncImg src={""} proportions={1} />
          </div>
        </div>
      </div>
      <div className="home-bottom">
        <div className="favorite-artists-outer-container">
          <h4 className="skeleton"></h4>
          <div className="favorite-artists-container">
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
            <div className={`artist-home-card`}>
              <div className="artist-img-container">
                {/* <img src={imgUrl} alt="" /> */}
                <AsyncImg src={""} proportions={1} />
              </div>

              <p className="body-1 skeleton"></p>
            </div>
          </div>
        </div>

        <div className="recently-played-outer-container">
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
        <div className="home-bottom-right"></div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
