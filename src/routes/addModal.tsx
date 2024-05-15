import styles from "./addModal.module.css";
import React, { useState } from "react";
import { Media } from "../model/types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Backward from "../img/backward.svg";
import Forward from "../img/forward.svg";
import Regen from "../img/regen2.svg";

export default function AddModal(props: any) {
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
              <div className={styles.scene_name}>Scene1</div>
              <div
                className={styles.scene_content}
                contentEditable={true}
                suppressContentEditableWarning={true}
              >
                t, consectetur adipiscing elit, sed do eiusmod |
              </div>
              <div className={styles.scene_nav}>
                <img src={Backward} className={styles.scene_nav_img} alt="" />
                <div className={styles.divider}></div>
                <img src={Forward} className={styles.scene_nav_img} alt="" />
                <div className={styles.divider}></div>
                <img src={Regen} className={styles.scene_nav_img} alt="" />
              </div>
            </div>
            <div className={styles.scene_btn_group}>
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
            ffffff
            <ul className={`${styles.ul}`}></ul>
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
