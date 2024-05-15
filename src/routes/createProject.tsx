import styles from "./createProject.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Project } from "../model/types";
import { useHistory } from "react-router-dom";
import Header from "../components/header/header";
import SideBar from "../components/sidebar/sidebar";
import Step from "../img/step.svg";
import StepDone from "../img/StepDone.svg";
import Union from "../img/Union.svg";
import Up from "../img/up.svg";
import star from "../img/star.svg";
import avatar from "../img/avatar.png";
import Generating1 from "../img/generating1.svg";
import Generating2 from "../img/generating2.svg";
import Regen from "../img/regen.svg";
import { useRef } from "react";
export default function CreateProject(props: {
  projectUser: string;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}) {
  const history = useHistory();
  const [step, setStep] = useState<number>(0);
  const [generating, setGenerating] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [userPromptHistory, setUserPromptHistory] = useState<string[]>([]);
  const [botResponseHistory, setBotResponseHistory] = useState<string[]>([]);
  const [useridnumber, setUseridNumber] = useState<number>(0);
  const [buttonflag, setbuttonflag] = useState<boolean>(false);

  const [sceneValues, setSceneValues] = useState<string[]>([]);
  const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const handleSceneChange = (index: number, value: string) => {
    const updatedScenes = [...sceneValues];
    updatedScenes[index] = value;
    // console.log(value);
    setSceneValues(updatedScenes);
  };

  const next = (nextStep: number) => {
    if (nextStep === 1) {
      setUseridNumber(Math.floor(Math.random() * 100000));
      console.log(useridnumber);
    }
    if (nextStep === 2) {
      if (chatHistory.length < 1 || !buttonflag) {
        console.log("cddcd00");
        return;
      }
      setStep(nextStep);
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
      }, 1000);
    }
    setStep(nextStep);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, 10000000);
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    const history = [];
    for (var i = 0; i < userPromptHistory.length; i++) {
      history.push(userPromptHistory[i]);
      if (botResponseHistory[i]) {
        history.push(botResponseHistory[i]);
      }
    }
    setChatHistory([...history]);
  }, [userPromptHistory, botResponseHistory]);

  const generate = (nextStep: number) => {

    if (chatHistory.length < 1) {
      return;
    }

    setStep(nextStep);
    history.push("/generate");
  };
  // function dddd(){
  //   const values = textAreaRefs.current.map(textArea => textArea?.value || '');
  //   console.log(values);
  //   const data=[];
  //   for(var i=1;i<values.length;i++)
  //     data.push({"description":values[i]})
  //   axios
  //     // .post("https://wizcut.io/api/wizcut/fortest/", {
  //       .post("http://localhost:8001/wizcut/geturl", {
  //       count: values.length-1,
  //       data: data,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       localStorage.setItem("changedcontent", JSON.stringify({descriotions:values}));
  //       localStorage.setItem("getedurl", JSON.stringify(response.data));
  //       generate(2);
        
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
    
  //   // console.log('Textarea Values:', values);
  //   // console.log('Textarea Values:', sceneValues);
  // }
  async function dddd() {
    const values = textAreaRefs.current.map(textArea => textArea?.value || '');
    console.log(values);
    const data = [];
    for (let i = 1; i < values.length; i++) {
        data.push({ "description": values[i] });
    }

    try {
      const response = await axios.post("https://wizcut.io/api/wizcut/geturl", {
        // const response = await axios.post("http://localhost:8001/wizcut/geturl", {
            count: values.length - 1,
            data: data,
        });

        console.log(response);

        await localStorage.setItem("changedcontent", JSON.stringify({descriptions: values}));
        await localStorage.setItem("getedurl", JSON.stringify(response.data));

        generate(2);
    } catch (error) {
        console.error(error);
    }
}
  const send = async () => {
    console.log("dkdkdkd");
    console.log(useridnumber);
    axios
      .post("https://wizcut.io/api/wizcut/fortest/", {
        // .post("http://localhost:8001/wizcut/fortest/", {
        text: chat,
        userid: useridnumber,
      })
      .then(function (response) {
        console.log(response);
        setBotResponseHistory([...botResponseHistory, response.data]);
        setChat("");
        localStorage.setItem("contentss", response.data);

        let contn: string;
        contn = response.data;
        console.log(contn);
        console.log(contn.indexOf("xml"));
        if (contn.indexOf("xml") > 0) {
          console.log("xxxx");
          setbuttonflag(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function resizeTextArea(textarea: any) {
    const { style, value } = textarea;

    // The 4 corresponds to the 2 2px borders (top and bottom):
    style.height = style.minHeight = "auto";
    style.minHeight = `${Math.min(
      textarea.scrollHeight + 4,
      parseInt(textarea.style.maxHeight)
    )}px`;
    style.height = `${textarea.scrollHeight + 4}px`;
  }

  const textarea = document.getElementById("textarea");

  textarea?.addEventListener("input", () => {
    resizeTextArea(textarea);
  });

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.main}>
        <Header search={false}></Header>
        <div>
          <div className={styles.progress1}>
            <img src={StepDone} className={styles.step}></img>
            <img
              src={step >= 1 ? StepDone : Step}
              className={styles.step}
            ></img>
            <img
              src={step >= 2 ? StepDone : Step}
              className={styles.step}
            ></img>
            <img
              src={step >= 3 ? StepDone : Step}
              className={styles.step}
            ></img>
            <img
              src={step >= 4 ? StepDone : Step}
              className={styles.step}
            ></img>
          </div>
          {step === 0 && (
            <div>
              <div className={styles.main_div}>
                <input
                  className={styles.project_name}
                  placeholder="Enter your project name"
                ></input>
              </div>
              <div className={styles.btn_group}>
                <button
                  className={styles.skip_btn}
                  onClick={() => {
                    next(1);
                  }}
                >
                  Skip step
                </button>
                <button
                  className={styles.next_btn}
                  onClick={() => {
                    next(1);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className={styles.chat_page}>
              <div className={styles.chat_history} ref={messagesEndRef}>
                {chatHistory?.map((item, index) => {
                  if (chatHistory.indexOf(item) % 2 == 0)
                    if (index == chatHistory.length - 1)
                      return (
                        <div className={styles.chat_element}>
                          <img
                            src={Union}
                            className={styles.chat_avatar}
                            alt=""
                          />
                          <div>
                            <p className={styles.chat_name}>Wizcut</p>
                            <div className={styles.chat_content}>
                              <p>{item}</p>
                              <span style={{ maxWidth: "150px" }}>
                                please wait...
                              </span>
                            </div>
                            <br></br>
                          </div>
                        </div>
                      );
                    else
                      return (
                        <div className={styles.chat_element}>
                          <img
                            src={avatar}
                            className={styles.chat_avatar}
                            alt=""
                          />
                          <div>
                            <p className={styles.chat_name}>You</p>
                            <div className={styles.chat_content}>
                              <p>{item}</p>
                            </div>
                            <br></br>
                          </div>
                        </div>
                      );
                  else if (item.indexOf("\n") > 0) {
                    return (
                      <div className={styles.chat_element}>
                        <img
                          src={Union}
                          className={styles.chat_avatar}
                          alt=""
                        />
                        <div>
                          <p className={styles.chat_name}>Wizcut</p>
                          <div className={styles.chat_content}>
                            <span style={{ maxWidth: "150px" }}>
                              {item.split("\n").map((line) => (
                                <>
                                  <p> {line}</p>
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                          <br></br>
                        </div>
                      </div>
                    );
                  } else
                    return (
                      <div className={styles.chat_element}>
                        <img
                          src={Union}
                          className={styles.chat_avatar}
                          alt=""
                        />
                        <div>
                          <p className={styles.chat_name}>Wizcut</p>
                          <div className={styles.chat_content}>
                            <span style={{ maxWidth: "150px" }}>{item}</span>
                          </div>
                          <br></br>
                        </div>
                      </div>
                    );
                })}
              </div>
              <div className={styles.main_div1}>
                {chatHistory.length < 1 && (
                  <>
                    <img src={Union}></img>
                    <p className={styles.help}>How can I help you?</p>
                  </>
                )}
                <div className={styles.chat_input}>
                  <textarea
                    id="textarea"
                    style={{ maxHeight: "140px" }}
                    className={styles.textareaclass}
                    placeholder="Write your script here and I will ask you some questions..."
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                  />
                  <img
                    src={Up}
                    className={styles.up}
                    onClick={() => {
                      setUserPromptHistory([...userPromptHistory, chat]);
                      send();
                    }}
                  />
                </div>
              </div>
              <div className={styles.btn_group}>
                <button
                  className={styles.skip_btn}
                  onClick={() => {
                    next(0);
                  }}
                >
                  Back
                </button>
                <button
                  className={styles.generate_btn}
                  onClick={() => {
                    next(2);
                  }}
                  style={
                    chatHistory.length < 1 || !buttonflag
                      ? { opacity: 0.5 }
                      : {}
                  }
                >
                  <img src={star} className={styles.star} />
                  GENERATE
                </button>
              </div>
            </div>
          )}
          {step === 2 && generating && (
            <div className={styles.generating}>
              <div className={styles.generating_content}>
                <img
                  src={Generating1}
                  alt=""
                  className={styles.generating_img}
                />
                <img
                  src={Generating2}
                  alt=""
                  className={styles.generating_img2}
                />
                <p className={styles.generating_text}>Generating scenes...</p>
              </div>
            </div>
          )}
          {step === 2 && !generating && (
            <div className={styles.generate_page}>
              <div style={{ textAlign: "right", height: "20px" }}>
                <div className={styles.recent_projects_icons}>
                  <span
                    className={`material-symbols-outlined ${styles.active_view}`}
                  >
                    grid_view
                  </span>
                  <span className="material-symbols-outlined">view_list</span>
                </div>
              </div>
              <div className={styles.scene_group}>
                <div className={styles.generate_scene}>
                  {chatHistory[chatHistory.length - 1]
                    .split("<scene id=")
                    .map((sceneitem, index) => {
                      return index > 0 ? (
                        <>
                          <textarea
                            key={index}
                            ref={el => textAreaRefs.current[index] = el}
                            onChange={(e) => handleSceneChange(index, e.target.value)}
                            className={styles.scene}
                            contentEditable={true}
                            suppressContentEditableWarning={true}

                          >
                            {`${
                              (sceneitem.replace(/<[^>]*>/g, "").slice(5)).split('```')[0]
                              // .replaceAll("</", "\n")
                              // .replaceAll("<", "")
                              // .replaceAll(">", ":")
                            }
                              `}
                          </textarea>
                        </>
                      ) : (
                        <></>
                      );
                    })}
                </div>
              </div>

              <div className={styles.generate_btn_group}>
                <button
                  className={styles.regen_btn}
                  onClick={() => {
                    next(0);
                  }}
                >
                  <img src={Regen} className={styles.star} />
                  Regenerate script
                </button>
                <div>
                  <button
                    className={styles.skip_btn}
                    onClick={() => {
                      next(0);
                    }}
                  >
                    Back
                  </button>
                  <button
                    className={styles.generate_btn}
                    onClick={() => {
                      // generate(2);
                      dddd();
                    }}
                    style={chatHistory.length < 1 ? { opacity: 0.5 } : {}}
                  >
                    <img src={star} className={styles.star} />
                    GENERATE1
                  </button>
                  {/* <button onClick={()=>{dddd();}}>jjjkkkk</button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
