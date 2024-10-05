import { useEffect, useState } from "react";
import { useTrackstackContext } from "../../App";
import Tracklist from "../tracklist/Tracklist";
import "./queue.css";
const Queue = () => {
  const { trackStack, setTrackStack } = useTrackstackContext();
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
