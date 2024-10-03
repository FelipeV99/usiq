import { useEffect, useRef, useState } from "react";
import "./async-img.css";
const AsyncImg = ({
  src = "",
  proportions = 1,
  clickableImg = false,
  isMouseOver = false,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const [divHeight, setDivHeight] = useState(0);
  const [isHover, setIsHover] = useState(isMouseOver);
  const divRef = useRef<any>();

  useEffect(() => {
    setDivHeight(divRef.current.clientWidth / proportions);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(img.src);
    };
  }, []);

  useEffect(() => {
    setIsHover(isMouseOver);
  }, [isMouseOver]);

  return (
    <div
      className={
        imgSrc === "" ? "async-skeleton img-container" : "img-container"
      }
      ref={divRef}
      style={imgSrc === "" ? { height: divHeight } : undefined}
    >
      <div
        className={
          isHover && clickableImg ? "img-overlay" : "img-overlay-trans"
        }
      ></div>
      {/* {isHover && clickableImg ? (
        <div className="img-overlay"></div>
      ) : undefined} */}
      {/* colocar un alt */}
      <img
        className={`${isHover && clickableImg ? "img-focus" : ""}`}
        src={imgSrc}
        alt=""
      />
    </div>
  );
};

export default AsyncImg;
