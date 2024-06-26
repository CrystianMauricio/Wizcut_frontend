import styles from "./editor.module.css";
import MediaPool from "../components/mediaPool/mediaPool";
import Controls from "../components/controls/controls";
import MediaPlayer from "../components/mediaPlayer/mediaPlayer";
import Actions from "../components/actions/actions";
import Timeline from "../components/timeline/timeline";
import { Media, Segment, SegmentID } from "../model/types";
import { WebGLRenderer } from "../model/webgl";
import Properties from "../components/elements/properties";
import React, { useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Regen from "../img/regen.svg"
import Star from "../img/star2.svg"
import EditorHeader from "../components/header/editorHeader";
import EditorModal from "./editorModal";
import AddModal from "./addModal";
import { useHistory } from "react-router-dom";

export default function Editor(props: {
  canvasRef: HTMLCanvasElement,
  mediaList: Media[],
  setMediaList: (mediaList: Media[]) => void,
  trackList: Segment[][],
  setTrackList: (segments: Segment[][]) => void,
  addVideo: (file: File[]) => void,
  deleteVideo: (media: Media) => void,
  playVideo: () => void,
  pauseVideo: () => void,
  projectWidth: number,
  projectHeight: number,
  renderer: WebGLRenderer,
  projectFramerate: number,
  projectDuration: number,
  isPlaying: boolean,
  currentTime: number,
  setCurrentTime: (timestamp: number) => void,
  dragAndDrop: (media: Media) => void,
  selectedSegment: SegmentID | null,
  setSelectedSegment: (selected: SegmentID | null) => void,
  updateSegment: (id: SegmentID, segment: Segment) => void,
  splitVideo: (timestamp: number) => void,
  deleteSelectedSegment: () => void,
  projectId: string,
  setProjectId: (id: string) => void,
  projectUser: string,
  setProjectUser: (user:string) => void,
}) {
  const history = useHistory();
  const [scaleFactor, setScaleFactor] = useState<number>(0.03);
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // for re-ordering files in the media pool
    if (source.droppableId === destination.droppableId) {
      const items = props.mediaList.slice();
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      props.setMediaList(items);
    }
    else {
      props.dragAndDrop(props.mediaList[result.source.index]);
      const items = props.mediaList.slice();
      props.setMediaList(items);
    }
  }

  return (
    
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={styles.generate}>
          <EditorHeader></EditorHeader>
          <img src={Star} alt="" className={styles.star2}/>
          <div className={styles.container}>
            <MediaPlayer
              canvasRef={props.canvasRef}
              projectWidth={props.projectWidth}
              projectHeight={props.projectHeight}
            />
            <Controls
              playVideo={props.playVideo}
              pauseVideo={props.pauseVideo}
              isPlaying={props.isPlaying}
              currentTime={props.currentTime}
              projectDuration={props.projectDuration}
              setCurrentTime={props.setCurrentTime}
              deleteSelectedSegment={props.deleteSelectedSegment}
              splitVideo={props.splitVideo}
              setScaleFactor={setScaleFactor}
              scaleFactor={scaleFactor}
            />
            {/* <Properties
              trackList={props.trackList}
              selectedSegment={props.selectedSegment}
              currentTime={props.currentTime}
              setCurrentTime={props.setCurrentTime}
              updateSegment={props.updateSegment}
            /> */}
             {/* <MediaPool
              setShowEditorModal={setShowEditorModal}
              setShowAddModal={setShowAddModal}
              mediaList={props.mediaList}
              setMediaList={props.setMediaList}
              addVideo={props.addVideo}
              deleteVideo={props.deleteVideo}
              dragAndDrop={props.dragAndDrop}
              projectDuration={props.projectDuration}
            /> */}
           <Timeline
              trackList={props.trackList}
              projectDuration={props.projectDuration}
              selectedSegment={props.selectedSegment}
              setSelectedSegment={props.setSelectedSegment}
              currentTime={props.currentTime}
              setCurrentTime={props.setCurrentTime}
              updateSegment={props.updateSegment}
              scaleFactor={scaleFactor}
              setTrackList={props.setTrackList}
            />
            {/* <Actions
              projectId={props.projectId}
              projectUser={props.projectUser}
              mediaList={props.mediaList}
              trackList={props.trackList}
              setProjectUser={props.setProjectUser}
            /> */}

          </div>
        </div>
        <EditorModal 
            show={showEditorModal}  
            setShow={setShowEditorModal}  
            mediaList={props.mediaList}
            setMediaList={props.setMediaList}
            addVideo={props.addVideo}
            deleteVideo={props.deleteVideo}
            contentdescriptions="xxxx"
          />
        <AddModal 
            show={showAddModal}  
            setShow={setShowAddModal}  
            mediaList={props.mediaList}
            setMediaList={props.setMediaList}
            addVideo={props.addVideo}
            deleteVideo={props.deleteVideo}
          />
    </DragDropContext>
  );
}
