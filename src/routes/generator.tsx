import styles from "./generator.module.css";
import MediaPool from "../components/mediaPool/mediaPool";
import Controls from "../components/controls/controls";
import { ChangeEvent, useEffect } from "react";
import MediaPlayer from "../components/mediaPlayer/mediaPlayer";
import Actions from "../components/actions/actions";
import Timeline from "../components/timeline/timeline";
import { Media, Segment, SegmentID } from "../model/types";
import { WebGLRenderer } from "../model/webgl";
import Properties from "../components/elements/properties";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Regen from "../img/regen.svg";
import Star from "../img/star2.svg";
import GenerateHeader from "../components/header/generateHeader";
import EditorModal from "./editorModal";
import AddModal from "./addModal";
import { useHistory } from "react-router-dom";


export default function Generator(props: {
  canvasRef: HTMLCanvasElement;
  mediaList: Media[];
  setMediaList: (mediaList: Media[]) => void;
  trackList: Segment[][];
  setTrackList: (segments: Segment[][]) => void;
  addVideo: (file: File[]) => void;
  deleteVideo: (media: Media) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  projectWidth: number;
  projectHeight: number;
  renderer: WebGLRenderer;
  projectFramerate: number;
  projectDuration: number;
  isPlaying: boolean;
  currentTime: number;
  setCurrentTime: (timestamp: number) => void;
  dragAndDrop: (media: Media) => void;
  selectedSegment: SegmentID | null;
  setSelectedSegment: (selected: SegmentID | null) => void;
  updateSegment: (id: SegmentID, segment: Segment) => void;
  splitVideo: (timestamp: number) => void;
  deleteSelectedSegment: () => void;
  projectId: string;
  setProjectId: (id: string) => void;
  projectUser: string;
  setProjectUser: (user: string) => void;
}) {
  const history = useHistory();
  const [scaleFactor, setScaleFactor] = useState<number>(0.1);
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const [renderer, setRenderer] = useState<WebGLRenderer>(
    new WebGLRenderer(canvasRef, props.projectWidth, props.projectHeight)
  );
  const [contentdata, setContentdata] = useState<string>("");
  const [currentitem, setCurrentitem] = useState<string>("");
  const [currentindex, setcurrentIndex] = useState<number>(0);
  const [contentdescriptions,setcontentDescription]=useState<string[]>([]);

  useEffect(() => {
    // console.log("xkkkxxx")
    const storedContent = localStorage.getItem('changedcontent');
    if (storedContent) {
      // Parse the JSON string back to an object
      const contentObject = JSON.parse(storedContent);
      
      // Access the 'descriptions' array from the object (make sure the key matches what you used to store it)
      const descriptionsArray = contentObject.descriptions;

      // Now you have the array, and you can use it as needed
      // console.log(descriptionsArray);
      setcontentDescription(descriptionsArray);
      
  } else {
    ;
      // In case there's nothing stored under 'changedcontent'
      // console.log('No content found');
      
  }
  
    setContentdata("c" + JSON.stringify(localStorage.getItem("contentss")));
  }, []);
  useEffect(() => {
    console.log("vbnbvvxxbxxjjdjdjd");
  }, [currentindex]);
  useEffect(() => {
    // console.log("vnvnvnvnvnvnnv",contentdescriptions);
  }, [contentdescriptions]);
  
  useEffect(() => {
    // console.log(contentdata);
  }, [contentdata]);
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // for re-ordering files in the media pool
    if (source.droppableId === destination.droppableId) {
      const items = props.mediaList.slice();
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      props.setMediaList(items);
      let segLists: Segment[] = [];
      let passTime = 0;
      for (let media of items) {
        let newElement =
          media.sources[0].element.cloneNode() as HTMLVideoElement;
        newElement.pause();
        media.sources.push({ track: 0, element: newElement, inUse: false });
        let segment: Segment = {
          media: media,
          start: passTime,
          duration: media.sources[0].element.duration * 1000,
          mediaStart: 0,
          texture: renderer.createTexture(),
          keyframes: [
            {
              start: 0,
              x: 0,
              y: 0,
              trimRight: 0,
              trimLeft: 0,
              trimTop: 0,
              trimBottom: 0,
              scaleX: 1.0,
              scaleY: 1.0,
            },
          ],
        };

        passTime += media.sources[0].element.duration * 1000;
        segLists.push(segment);
      }
      let trackLists: Segment[][] = [];
      trackLists.push(segLists);
      props.setTrackList(trackLists);
      props.setCurrentTime(0);
    } else {
      props.dragAndDrop(props.mediaList[result.source.index]);
      const items = props.mediaList.slice();
      props.setMediaList(items);
    }
  };
  const onSeek = (event: ChangeEvent<HTMLInputElement>) => {
    let curIndex = event.target.getAttribute("data-index");
    let curTime: number = 0;
    let numericValue: number = 0;
    if (curIndex) {
      numericValue = parseInt(curIndex, 10);
      for (let index = 0; index < numericValue; index++) {
        const element = props.mediaList[index];
        curTime += element.sources[0].element.duration * 1000;
      }
      props.setCurrentTime(
        curTime +
          +event.target.value *
            props.mediaList[numericValue].sources[0].element.duration *
            1000
      );
    }
  };
  const togglePlaying = () => {
    if (props.isPlaying) {
      props.pauseVideo();
    } else {
      props.playVideo();
    }
  };

  let passedTime: number = 0;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.generate}>
        <GenerateHeader></GenerateHeader>
        <img src={Star} alt="" className={styles.star2} />
        <div className={styles.container}>
          <div className={styles.detail}>
            <div className={styles.detail_title}>
              <span className={styles.detail_name}>
                Scene {currentindex + 1}
              </span>
            </div>
            <div className={styles.detail_content}>

{
            contentdescriptions[currentindex + 1]


/*               
              {contentdata.split("<scene id=").map((sceneitem, index) => {
                return index == currentindex + 1 ? (
                  <>
                    {`<scene id=` +
                      sceneitem.replace(/<[^>]*>/g, "").replaceAll("\n", "")}
                  </>
                ) : (
                  <></>
                );
              })} */}
            </div>
          </div>
          <MediaPool
            setShowEditorModal={setShowEditorModal}
            setShowAddModal={setShowAddModal}
            mediaList={props.mediaList}
            setMediaList={props.setMediaList}
            addVideo={props.addVideo}
            deleteVideo={props.deleteVideo}
            dragAndDrop={props.dragAndDrop}
            projectDuration={props.projectDuration}
            setcurrentIndex={setcurrentIndex}
            contentdata={contentdata}
          />
          <div className={styles.mediaPlayerWrapper}>
            <MediaPlayer
              canvasRef={props.canvasRef}
              projectWidth={props.projectWidth}
              projectHeight={props.projectHeight}
            />
            <div className={styles.control}>
              <div className={styles.trackbar_group}>
                {props.mediaList.map((media, index) => {
                  let mediaLength = media.sources[0].element.duration * 1000;
                  passedTime += mediaLength;
                  return (
                    <input
                      key={index}
                      className={styles.trackbar}
                      style={{
                        width: `calc(90% / ${props.projectDuration} * ${mediaLength})`,
                      }}
                      type="range"
                      min="0"
                      max="1"
                      step={0.001}
                      onChange={onSeek}
                      data-index={index}
                      value={
                        props.projectDuration === 0
                          ? 0
                          : props.currentTime > passedTime
                          ? 1
                          : (props.currentTime - passedTime + mediaLength) /
                            mediaLength
                      }
                    ></input>
                  );
                })}
              </div>

              <div className={styles.btn_group}>
                <div className={styles.left_group}>
                  <span
                    className={`material-symbols-outlined ${styles.btn}`}
                    onClick={togglePlaying}
                  >
                    {props.isPlaying ? "pause" : "play_arrow"}
                  </span>
                  <span className={`material-symbols-outlined ${styles.btn}`}>
                    volume_up
                  </span>
                  <span className={`${styles.time}`}>01:27 02:22</span>
                </div>

                <span
                  className={`material-symbols-outlined ${styles.fullscreen}`}
                >
                  fullscreen
                </span>
              </div>
            </div>
          </div>

          {/* <Controls
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
            /> */}
          {/* <Properties
              trackList={props.trackList}
              selectedSegment={props.selectedSegment}
              currentTime={props.currentTime}
              setCurrentTime={props.setCurrentTime}
              updateSegment={props.updateSegment}
            /> */}
          {/* { step ===1 && <Timeline
              trackList={props.trackList}
              projectDuration={props.projectDuration}
              selectedSegment={props.selectedSegment}
              setSelectedSegment={props.setSelectedSegment}
              currentTime={props.currentTime}
              setCurrentTime={props.setCurrentTime}
              updateSegment={props.updateSegment}
              scaleFactor={scaleFactor}
              setTrackList={props.setTrackList}
            />} */}
          {/* <Actions
              projectId={props.projectId}
              projectUser={props.projectUser}
              mediaList={props.mediaList}
              trackList={props.trackList}
              setProjectUser={props.setProjectUser}
            /> */}
          <div className={styles.generate_btn_group}>
            <button className={styles.regen_btn} onClick={() => {}}>
              <img src={Regen} className={styles.star} />
              Regenerate script
            </button>
            <div>
              <button
                className={styles.skip_btn}
                onClick={() => {
                  history.push("/create");
                }}
              >
                Back
              </button>
              <button
                className={styles.generate_btn}
                onClick={() => {
                  history.push("/editor");
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditorModal
        show={showEditorModal}
        setShow={setShowEditorModal}
        mediaList={props.mediaList}
        setMediaList={props.setMediaList}
        addVideo={props.addVideo}
        deleteVideo={props.deleteVideo}
        setcontentDescription={setcontentDescription}
        contentdescriptions={contentdescriptions}
        currentindex={currentindex}
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
