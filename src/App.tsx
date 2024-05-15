import "./App.css";
import ProjectManager from "./model/projectManager";
import React, { useState } from "react";
import { Media, Segment } from "./model/types";
import { VideoContext } from "./provider/VideoProvider";

const VideoProvider: React.FC = ({ children }) => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [trackList, setTrackList] = useState<Segment[][]>([[]]);
  const [mediaurul,setGetURl]=useState<string[]>([]);
  return (
    <VideoContext.Provider
      value={{ mediaList, setMediaList, trackList, setTrackList ,mediaurul ,setGetURl}}
    >
      {children}
    </VideoContext.Provider>
  );
};

function App() {
  return (
    <VideoProvider>
      <ProjectManager />
    </VideoProvider>
  );
}

export default App;
