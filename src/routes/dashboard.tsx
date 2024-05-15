import styles from "./dashboard.module.css";
import axios from "axios";
import { useState } from "react";
import { Project } from "../model/types";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/header/header";
import plus from "../img/plus.svg"
import project1 from "../img/project1.png"
import project2 from "../img/project2.png"
import project3 from "../img/project3.png"
import project4 from "../img/project4.png"
import SideBar from "../components/sidebar/sidebar";

export default function Dashboard(props: { projectUser: string, projects: Project[], setProjects: (projects: Project[]) => void }) {
  const history = useHistory();
  const [recentProjects, setRecentProjects] = useState([
    {
      title: "Untitled project",
      date: "2 days ago",
      img: project1
    },
    {
      title: "Bicycle forever",
      date: "2 days ago",
      img: project2
    },
    {
      title: "Foodporn ad",
      date: "2 days ago",
      img: project3
    },
    {
      title: "Somewhere in the desert",
      date: "2 days ago",
      img: project4
    },
  ]);

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.main}>
          <Header search={true}></Header>
          <div className={styles.create} >
                <div className={styles.create_title} >Let's create some videos!</div>
                <Link to="/create">
                  <button className={styles.create_btn}><img src={plus}></img> Create a new project</button>
                </Link>
          </div>
          <div className={styles.recent_projects}>
                <div className={styles.recent_projects_navbar}>
                    <p className={styles.recent_projects_title}>Recent Projects</p>
                    <div className={styles.recent_projects_icons}>
                      <span className="material-symbols-outlined">
                            grid_view
                        </span>
                        <span className="material-symbols-outlined">
                            view_list
                      </span>
                    </div>
                </div>
                <div className={styles.project_thumbnails}>
                  {
                    recentProjects.map((item, index) => {
                      return <div >
                                <img src={item.img} alt="" />
                                <div className={styles.project_description}>
                                    <div>
                                        <p className={styles.description_title}>{item.title}</p>
                                        <p className={styles.description_date}>{item.date}</p>
                                    </div>
                                    <span className={`material-symbols-outlined ${styles.more}`}>
                                        more_vert
                                    </span>
                                </div>
                            </div>
                    })
                  }
                </div>
          </div>

      </div>
    </div>
  );
}
