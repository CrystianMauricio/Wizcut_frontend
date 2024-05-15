import styles from "./editorModal.module.css";
import React, { useContext, useEffect, useState } from "react";
import { Media } from "../model/types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Backward from "../img/backward.svg";
import Forward from "../img/forward.svg";
import Regen from "../img/regen2.svg";
import { useVideoContext } from "../provider/VideoProvider";
import axios from 'axios';

export default function EditorModal(props: any) {

  const [indexmovie, setmovieIndex] = useState<number>(props.currentindex);

  const { mediaurul ,setGetURl} = useVideoContext();
  async function rechangemoveurl() {
    const values = props.contentdescriptions[indexmovie+1];
    console.log(values);
    const data = [];  
    data.push({ "description": values});

    try {
      
      const response = await axios.post("https://wizcut.io/api/wizcut/geturl", {
        // const response = await axios.post("http://localhost:8001/wizcut/geturl", {
            count: 1,
            data: data,
        });

        console.log(response.data.returnurl[0]);
        const temurl=mediaurul;
        temurl[indexmovie]=response.data.returnurl[0];
        setGetURl([...temurl]);

    } catch (error) {
        console.error(error);
    }

    // console.log(mediaurul);
  }
  useEffect(() => {
    // console.log("ccc", props.currentindex);

    setmovieIndex(props.currentindex);
  }, [props.currentindex]);
  const listItems = props.mediaList.map((item: Media, index: number) => {
    return (
      <li className={`${styles.card}`} key={index}>
        <img
          className={styles.img}
          src={item.thumbnail}
          alt={item.file.name}
          onClick={() => {
            setmovieIndex(index);
            // console.log(index,"cccc", mediaurul);
            // console.log(props.contentdescriptions, index, "xxxxxxxxssss");
          }}
        />
        {index === indexmovie ? (
          <div className={styles.more + " " + styles.active}>{index + 1}</div>
        ) : (
          <div className={styles.more}></div>
        )}

        {/* <p className={styles.cardCaption}>{item.file.name}</p> */}
        {/* <button className={styles.button} onClick={() => props.deleteVideo(item)}>
                        <span className="material-symbols-outlined">delete</span>
                    </button> */}
      </li>
    );
  });
  return (
    <div className={props.show === true ? styles.modal_container : ""}>
      <div
        className={
          props.show === true ? styles.show + " " + styles.modal : styles.modal
        }
      >
        <div className={styles.header}>
          <div className={styles.title}>Edit Media & Script</div>
          <span
            className={`material-symbols-outlined ${styles.close}`}
            onClick={(e) => props.setShow(false)}
          >
            close
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.script}>
            <div className={styles.scene}>
              <div className={styles.scene_name}>{`Scenecsc${
                indexmovie + 1
              }`}</div>
              <textarea
                className={styles.scene_content}
                style={{ width: "100%" }}
                // contentEditable={true}
                // suppressContentEditableWarning={true}
                value={props.contentdescriptions[indexmovie + 1]}
                onChange={(e) => {
                  const descriptionss = props.contentdescriptions;
                  descriptionss[indexmovie + 1] = e.target.value;
                  props.setcontentDescription([...descriptionss]);
                }}
              />
              <div className={styles.scene_nav}>
                <img src={Backward} className={styles.scene_nav_img} alt="" />
                <div className={styles.divider}></div>
                <img src={Forward} className={styles.scene_nav_img} alt="" />
                <div className={styles.divider}></div>
                <img src={Regen} className={styles.scene_nav_img} alt="" />
              </div>
            </div>
            <div className={styles.scene_btn_group}>
              <button className={styles.regen} onClick={()=>{rechangemoveurl()}}>
                <span className="material-symbols-outlined">autorenew</span>
                Regenerate Videos
              </button>
              <div className={styles.link}>
                <span className="material-symbols-outlined">link</span>
                Video link
              </div>
              <div className={styles.upload}>
                <span className="material-symbols-outlined">cloud_upload</span>
                Upload Video
              </div>
            </div>
          </div>
          <div className={styles.media}>
            <ul className={`${styles.ul}`}>{listItems}</ul>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.btn_group}>
            <button
              className={styles.cancel_btn}
              onClick={(e) => props.setShow(false)}
            >
              Cancel
            </button>
            <button
              className={styles.save_btn}
              onClick={(e) => props.setShow(false)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
