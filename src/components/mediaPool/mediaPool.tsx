import styles from "./mediaPool.module.css";
import React, { useState, useEffect } from "react";
import { Media } from "../../model/types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import More from "../../img/more.svg";
import { useVideoContext } from "../../provider/VideoProvider";
const options = {
  types: [
    {
      accept: {
        "videos/*": [".mp4", ".mov", ".wmv", ".avi", ".flv"],
        "images/*": [".jpg", ".png", ".gif", ".jpeg"],
      },
    },
  ],
  multiple: true,
  excludeAcceptAllOption: true,
};

export default function MediaPool(props: any) {
  const [status, setStatus] = useState<string>("");
  const [draggedOn, setDraggedOn] = useState<String>("");
  const [popup, setPopup] = useState<number>(-1);
  const [totalcount, setTotalcount] = useState<number>(6);
  const [sceneurls,setScenurls]=useState<string[]>([]);
  const { setGetURl } = useVideoContext();
  const myFun = props.addVideo;
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target)
      if (target.getAttribute("data-id") === "more_img") {
        return;
      }
    setPopup(-1);
  };
  function onclickimage(index: number) {
    props.setcurrentIndex(index);
    console.log(index);
  }
  useEffect(() => {
    console.log(sceneurls,sceneurls.length);
    // setGetURl(sceneurls);
    async function createFileFromUrl(url: string, filename: string) {
      try {
        // Fetch the file
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Get the Blob from the response
        const blob = await response.blob();

        // Create a File object
        const file = new File([blob], filename, { type: blob.type });

        return file;
      } catch (error) {
        console.error("Error fetching and creating file:", error);
        return null;
      }
    }

    const fun = async () => {
      let fileUrl: string[];
      fileUrl = [
        "https://static.vecteezy.com/system/resources/previews/023/607/690/original/vdo-mp4-helix-human-dna-3-d-rendering-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/008/927/071/original/aerial-fishing-boat-move-to-jetty-kuala-muda-at-kedah-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/003/165/899/mp4/couple-driving-4x4-off-road-vehicle-driving-on-beach-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/023/607/690/original/vdo-mp4-helix-human-dna-3-d-rendering-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/008/927/071/original/aerial-fishing-boat-move-to-jetty-kuala-muda-at-kedah-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/003/165/899/mp4/couple-driving-4x4-off-road-vehicle-driving-on-beach-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/023/607/690/original/vdo-mp4-helix-human-dna-3-d-rendering-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/008/927/071/original/aerial-fishing-boat-move-to-jetty-kuala-muda-at-kedah-video.mp4",
        "https://static.vecteezy.com/system/resources/previews/003/165/899/mp4/couple-driving-4x4-off-road-vehicle-driving-on-beach-video.mp4",
      ];

      const delay = () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      

      try {
        const files: File[] = [];
        for (let i = 0; i < sceneurls.length; i++) {
         
          const file = await createFileFromUrl(
            fileUrl[i],
            `image-${i}.png`
          );
          if (file) {
            // setStatus("Loading...");
            // console.log("File created:"+i, file);
            files.push(file);
            
            // await delay();
            // setStatus("");
          }
        }
        await myFun(files);
        
      } catch (err) {
        console.log("Error in creating files from url: ", err);
      }
    };

    fun();
  }, [sceneurls]);

  useEffect(() => {
    const storedContent = localStorage.getItem('getedurl');
    if (storedContent) {
      // Parse the JSON string back to an object
      const contentObject = JSON.parse(storedContent);
      
      // Access the 'descriptions' array from the object (make sure the key matches what you used to store it)
      const urlArray = contentObject.returnurl;

      // Now you have the array, and you can use it as needed
      // console.log("pppppppp",urlArray);
      setScenurls(urlArray);
      
  } else {
    ;
      // In case there's nothing stored under 'changedcontent'
      // console.log('No content found');
      
  }
    // setTotalcount(Number(JSON.stringify(localStorage.getItem("numberitem")))>7?7:Number(JSON.stringify(localStorage.getItem("numberitem"))))
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const listItems = props.mediaList.map((item: Media, index: number) => {
    return (
      <Draggable
        key={index.toString()}
        draggableId={index.toString()}
        index={index}
      >
        {(provided) => (
          <li
            className={`${styles.card} `}
            key={index}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img
              className={styles.img}
              src={item.thumbnail}
              alt={item.file.name}
              onClick={() => {
                onclickimage(index);
              }}
            />
            <img
              className={styles.more}
              src={More}
              alt={item.file.name}
              data-id="more_img"
              onClick={(e) => {
                setPopup(index);
              }}
            />
            <div
              className={
                popup === index
                  ? styles.popup + " " + styles.control
                  : styles.control
              }
            >
              <div className={styles.arrowGroup}>
                <span className={`material-symbols-outlined ${styles.west}`}>
                  west
                </span>
                <span className={`material-symbols-outlined ${styles.east}`}>
                  east
                </span>
              </div>
              <div
                className={styles.control_btn}
                onMouseDown={() => props.setShowEditorModal(true)}
              >
                <span
                  className={`material-symbols-outlined ${styles.control_icon}`}
                >
                  edit
                </span>
                Edit Scene
              </div>
              <div
                className={styles.control_btn}
                onMouseDown={() => props.deleteVideo(item)}
              >
                <span
                  className={`material-symbols-outlined ${styles.control_icon}`}
                >
                  delete
                </span>
                Delete
              </div>
              <div className={styles.control_btn}>
                <span
                  className={`material-symbols-outlined ${styles.control_icon}`}
                >
                  content_copy
                </span>
                Duplicate
              </div>
              <div
                className={styles.control_btn}
                onMouseDown={() => props.setShowAddModal(true)}
              >
                <span
                  className={`material-symbols-outlined ${styles.control_icon}`}
                >
                  add
                </span>
                Add a scene
              </div>
            </div>
            <div className={styles.length}>00:07</div>
          </li>
        )}
      </Draggable>
    );
  });

  const onClick = async () => {
    try {
      const files: File[] = [];
      //@ts-ignore
      const Handle = await window.showOpenFilePicker(options);
      setStatus("Loading...");
      for (const entry of Handle) {
        let file = await entry.getFile();
        files.push(file);
      }
      await props.addVideo(files);
      setStatus("");
    } catch (error) {
      console.log(error);
    }
  };

  const onDrag = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOn("");
    if (!e.dataTransfer) return;
    const files: File[] = [];

    for (const item of Object.values(e.dataTransfer.items)) {
      const file = item.getAsFile();

      if (
        file !== null &&
        (file.type.includes("video/") || file.type.includes("image/"))
      )
        files.push(file);
      else
        alert(
          `Could not upload file: ${file?.name}. Only upload videos or images.`
        );
    }
    await props.addVideo(files);
    setStatus("");
  };

  return (
    <div
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggedOn("draggedOn");
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggedOn("draggedOn");
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggedOn("");
      }}
      onDrop={onDrag}
      className={`${styles.container} ${draggedOn}`}
    >
      <div className={styles.hbox} onClick={onClick} title="Add files">
        <span className="material-symbols-outlined md-36">add</span>
      </div>
      {props.mediaList.length > 0 && (
        <>
          <div className={styles.left_arrow}>
            <span className="material-symbols-outlined md-36">
              navigate_before
            </span>
          </div>
          <div className={styles.right_arrow}>
            <span className="material-symbols-outlined md-36">
              navigate_next
            </span>
          </div>
        </>
      )}

      <div className={styles.mediaList}>
        <Droppable droppableId="card" type="COLUMN" direction="horizontal">
          {(provided) => (
            <ul
              className={`${styles.ul} card`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listItems}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>

      <p className={styles.loader}>{status}</p>
    </div>
  );
}
