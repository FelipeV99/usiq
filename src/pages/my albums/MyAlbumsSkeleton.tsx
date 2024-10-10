import AsyncImg from "../../components/async img/AsyncImg";

const MyAlbumsSkeleton = () => {
  function placeAlbumsCards() {
    const artistsCards = [];
    for (let index = 0; index < 18; index++) {
      artistsCards.push(
        <div className="album-card-container" key={index}>
          <div className="ac-img-container">
            <AsyncImg src={""} proportions={1} />
          </div>
          <div className="ac-info">
            <p className="body-1 skeleton"></p>
            <p className="skeleton"></p>
          </div>
        </div>
      );
    }
    return artistsCards;
  }
  return (
    <div className="my-albums-outer-container">
      <h2>My Albums</h2>
      <div className="my-albums-container">{placeAlbumsCards()}</div>
    </div>
  );
};

export default MyAlbumsSkeleton;
