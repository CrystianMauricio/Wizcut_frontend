import styles from "./sidebar.module.css";
// import { useState, MouseEvent, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import speaker from "../../img/speaker.svg";
import badge from "../../img/badge3.svg";
export default function SideBar() {
  const location = useLocation();
  // console.log(location);
  const pathname = location.pathname;
  return (
    <div className={styles.sidebar}>
      <div className={styles.vbar}>
        <Link to="/">
          <img className={styles.logo} src="/logo192.png" />
        </Link>
      </div>
      <Link
        to="/"
        className={`${styles.btn} ${pathname === "/" ? styles.active : ""}`}
      >
        <span className="material-symbols-outlined">home</span> Home
      </Link>
      <Link
        to="/videos"
        className={
          styles.btn + " " + (pathname === "/videos" ? styles.active : "")
        }
      >
        <span className="material-symbols-outlined">videocam</span> Videos
      </Link>
      <Link
        to="/library"
        className={
          styles.btn + " " + (pathname === "/library" ? styles.active : "")
        }
      >
        <span className="material-symbols-outlined">folder</span> My library
      </Link>
      <Link
        to="/playground"
        className={
          styles.btn + " " + (pathname === "/playground" ? styles.active : "")
        }
      >
        <span className="material-symbols-outlined">hourglass_empty</span>{" "}
        Playground
      </Link>
      <div className={styles.bottom_btn}>
        <Link
          to="/contact"
          className={
            styles.btn + " " + (pathname === "/contact" ? styles.active : "")
          }
        >
          <span className="material-symbols-outlined">call</span>Contact Sales
        </Link>
        <div className={styles.divider}></div>
        <Link
          to="/new"
          className={
            styles.btn + " " + (pathname === "/new" ? styles.active : "")
          }
        >
          <img src={speaker} alt="" />
          <p>&nbsp;&nbsp; What's new? &nbsp;&nbsp;</p>
          <img src={badge} alt="" />
        </Link>
      </div>
    </div>
  );
}
