import styles from "./editorHeader.module.css";
// import { useState, MouseEvent, useRef, useEffect } from "react";
import notification from "../../img/notification.svg"
import avatar from "../../img/avatar.png"
import { Link, useHistory } from "react-router-dom";
import StepDone from "../../img/StepDone.svg"
export default function Header() {
    const history = useHistory();
    return (
        <div className={styles.container}
        >
             <Link to="/">
                <img className={styles.logo} src="/logo192.png" />
            </Link>
            <div  className={styles.progress1}>
                  <img src={StepDone} alt="step" className={styles.step}></img>
                  <img src={StepDone} alt="step" className={styles.step}></img>
                  <img src={StepDone} alt="step" className={styles.step}></img>
                  <img src={StepDone} alt="step"className={styles.step}></img>
                  <img src={StepDone} alt="step"className={styles.step}></img>
              </div>
              <div className={styles.editor_btn_group}>
                    <button className={styles.skip_btn} onClick={() => {history.push("/generate")}}>Back</button>
                    <button className={styles.generate_btn} onClick={() => {history.push("/generate")}} >Save</button>
                </div>
            <div className={styles.headerGroup}>
                <img src={notification} alt="step" className={styles.notification} />
                <img src={avatar} alt="step"/>
            </div>
            
        </div >
    );
}
