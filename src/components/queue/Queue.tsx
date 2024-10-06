import { useEffect, useState } from "react";
import { useTStackCSongContext } from "../../App";
import Tracklist from "../tracklist/Tracklist";
import "./queue.css";
const Queue = () => {
  const { trackStack, setTrackStack } = useTStackCSongContext();

  const [queue, setQueue] = useState<{}[]>([]);
  console.log("trackstack", trackStack);
  useEffect(() => {
    let currentActiveTrackIndex: number = 0;
    trackStack.forEach((track: { [key: string]: any }, index: number) => {
      if (track.isActive === true) {
        currentActiveTrackIndex = index;
      }
    });
    setQueue(trackStack.slice(currentActiveTrackIndex, trackStack.length));
  }, [trackStack]);
  return (
    <div>
      <h2>Queue</h2>
      <div>{/* <Tracklist tracks={queue} /> */}</div>
    </div>
  );
};

export default Queue;
