import "./album.css";
import AsyncImg from "../../components/async img/AsyncImg";

const AlbumSkeleton = () => {
  function placeSongs() {
    const songCards = [];
    for (let i = 0; i < 10; i++) {
      songCards.push(<div className="track-row skeleton" key={i}></div>);
    }
    return songCards;
  }
  return (
    <div className="album-container skeleton">
      <div className="album-header">
        <div className="alh-img-container">
          <AsyncImg src="" proportions={1} />
        </div>
        <div className="alh-info">
          <h1 className="skeleton"></h1>
          <p className="bold skeleton"></p>
          <div className="alh-details">
            <p className="other-p skeleton"></p>
          </div>
        </div>
        <div className="alh-btns"></div>
      </div>
      <div className="album-tracks-container">
        {placeSongs()}
        {/* {albumWithImg.map((track: { [key: string]: any }, index: number) => {
        return (
          <SongrowTwo
            key={track.id}
            song={track.name}
            artist={track.artists[0].name}
            duration={track.duration_ms}
            index={index}
            handleOnPlay={handleOnPlay}
            imgUrl={track.imgUrl}
            songUrl={track.preview_url}
          />
        );
      })} */}
      </div>
    </div>
  );
};

export default AlbumSkeleton;
