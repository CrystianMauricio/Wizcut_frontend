import { Context, createContext, useContext, useState } from "react";
import { Media, Segment } from "../model/types";

interface VideoContextType {
  mediaList: Media[];
  setMediaList: any;
  trackList: Segment[][];
  setTrackList: any;
  mediaurul: string[],
  setGetURl: any;
}

export const VideoContext: Context<VideoContextType> =
  createContext<VideoContextType>({
    mediaList: [],
    setMediaList: () => {},
    trackList: [[]],
    setTrackList: () => {},
    mediaurul: [],
    setGetURl: () => { },
  });

export const useVideoContext = () => useContext(VideoContext);
