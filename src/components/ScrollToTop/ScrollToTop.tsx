import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCurrentPageContext } from "../../App";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { currentPage } = useCurrentPageContext();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, currentPage]);

  return <></>;
};

export default ScrollToTop;
