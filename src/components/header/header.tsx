import styles from "./header.module.css";
// import { useState, MouseEvent, useRef, useEffect } from "react";
import star from "../../img/star.svg"
import notification from "../../img/notification.svg"
import avatar from "../../img/avatar.png"
import { Link } from "react-router-dom";
export default function Header(props: { search: boolean}) {

    return (
        <div className={styles.container}
        >
            {   props.search === true ? <div className={styles.search}>
                                            <span className="material-symbols-outlined">
                                                search 
                                            </span>
                                            <input placeholder="Search videos and folders" className={styles.search_input}></input>
                                        </div>:
                                        <div className={styles.search}>
                                        </div>
            }
            <div className={styles.headerGroup}>
                {   props.search && <Link to="/create">
                                        <button className={styles.new_btn}>
                                            <img src={star} className={styles.star} />New Video
                                        </button> 
                                    </Link>}
                <img src={notification} className={styles.notification} />
                <img src={avatar}/>
            </div>
            
        </div >
    );
}
