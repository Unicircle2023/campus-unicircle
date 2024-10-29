import React, { useState, useEffect } from "react";
import $ from "jquery";
import moment from "moment";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdOutlineDoubleArrow } from "react-icons/md";
import "react-tabs/style/react-tabs.css";
import { useHistory } from "react-router-dom";
import { ActivityLog } from "../Students/ActivityLog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Courses } from "./Courses";

export function StudentTabs({ dataParentToChild }) {
  var studentId = dataParentToChild.student_id;
  var courseID = dataParentToChild.course_id;
  var classID = dataParentToChild.class_id;
  var section = dataParentToChild.section;

  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const history = useHistory();
  // const [inputList, setInputList] = useState([{ title: "", value: "" }]);
  const [nameOfSubject, updateNameOfSubject] = useState([{ name: "" }]);
  //  var nameOfSubject =[]
  var subjectMarks = "";

  const studnetMarksData = [
    {
      name: "ENGLISH",
      pv: 30,
    },
  ];

  var todays_date = new Date();
  var getCurrentDate = moment(todays_date).format("DD MMM YYYY");
  var getTodaysDay = moment(todays_date).format("dddd");
  var currentMonth = moment(todays_date).format("MMMM");

  function getWeekOfMonth(todays_date) {
    let adjustedDate = todays_date.getDate() + todays_date.getDay();
    let prefixes = ["0", "1", "2", "3", "4", "5"];
    return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
  }

  var currentWeek = getWeekOfMonth(todays_date);

  async function fetchTodaysTimetable() {
    try {
      const formData = new FormData();
      formData.append("sort_flag", 1);
      formData.append("day", getTodaysDay);
      formData.append("week", currentWeek);
      formData.append("month", currentMonth);
      formData.append("course", 1);
      formData.append("class", 1);
      formData.append("section", "A");

      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_datewise_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if (response.data.error_code == 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [examList, updateExamList] = useState([]);
  const [examId, updateExamId] = useState("");
  const [examName, updateExamName] = useState("");

  useEffect(() => {
    fetchTodaysTimetable();
    fetchExamList();
  });

  const [examData, updateExamData] = useState("");

  async function fetchExamList() {
    const formData = new FormData();
    formData.append("cource_id", courseID);
    formData.append("class_id", classID);

    const editNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_courcewise_and_classwise_exam_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (editNewsResponse.data.error_code == 200) {
      updateExamData(editNewsResponse.data.data);
    }
  }

  const [examMarks, updateExamMarks] = useState([]);
  const [errorCode, updateErrorCode] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  async function fetchMarks(e) {
    updateExamId(e.target.value);

    const formData = new FormData();
    formData.append("student_id", studentId);
    formData.append("exam_id", e.target.value);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_student_exam_mark",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    updateErrorCode(response.data.error_code);
    updateErrorMessage(response.data.message);
    if (response.data.error_code == 200) {
      updateExamMarks(response.data.data);
    }
  }

  const [subjectInfo, updateSubjectInfo] = useState("");

  async function fetchSubjectName(e) {
    const formData = new FormData();
    formData.append("student_id", studentId);
    formData.append("exam_id", e.target.value);

    const examResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_student_exam_mark",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (examResponse.data.error_code == 200) {
      updateSubjectInfo(examResponse.data.data);

      examResponse.data.data.map((item) => {
        // updateNameOfSubject([
        //   ...nameOfSubject,
        //   {
        //     name: "",

        //   }
        // ])

        nameOfSubject.push(item.subject_id);

        subjectMarks = item.mark;
      });
    }
  }

  function showMoreTimetable() {
    history.push("/timetable", { courseID, classID, section });

    // window.location.href= "/timetable"
  }

  var subjectName = [];
  var m = [];
  examMarks.map((item) => {
    subjectName.push(item.subject_id);
    m.push(item.mark);
  });

  var arr = [];

  for (let i = 0; i <= m.length - 1; i++) {
    var obj = {
      name: subjectName,
      Subjects: m[i],
    };

    arr.push(obj);
  }

  return (
    <div>
      <Tabs
        style={{ marginTop: "0px", width: "100%", padding: "0" }}
        className="tabs"
      >
        <TabList
          className="tablist"
          style={{
            fontWeight: "600",
            width: "100%",
            flexDirection: "row",
            marginBottom: "0",
            display: "flex",
            color: "white",
            borderRadius: "5px 5px 0px 0px",
            fontSize: "12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Tab
            className="tabs"
            style={{
              marginLeft: "0px",
              background: "#2b6dd4",
              borderRadius: "5PX 5PX 1PX 1PX",
              padding: "5px 10px",
              fontSize: "13px",
            }}
          >
            Timetables
          </Tab>
          <Tab
            className="tabs"
            style={{
              background: "#2b6dd4",
              borderRadius: "5PX 5PX 1PX 1PX",
              padding: "5px 10px",
              fontSize: "13px",
            }}
          >
            Courses
          </Tab>
          {/* <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX",  padding: "5px 10px" }}>Academics</Tab> */}
          <Tab
            className="tabs"
            style={{
              background: "#2b6dd4",
              borderRadius: "5PX 5PX 1PX 1PX",
              padding: "5px 10px",
              fontSize: "13px",
            }}
          >
            {" "}
            Grades
          </Tab>
          <Tab
            className="tabs"
            style={{
              background: "#2b6dd4",
              borderRadius: "5PX 5PX 1PX 1PX",
              padding: "5px 10px",
              fontSize: "13px",
            }}
          >
            Engagement
          </Tab>
          {/* <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX", padding: "5px 10px" }}>Achievements</Tab> */}
        </TabList>

        {/* timetable */}
        <TabPanel
          className="tabpanel"
          style={{
            padding: "0",
            marginTop: "0",
            background: "white",
            border: "0.2px solid #f5f5f5",
            width: "100%",
          }}
        >
          <div style={{ height: "220px", overflowY: "auto" }}>
            <p style={{ padding: "10px", fontSize: "14px", fontWeight: "600" }}>
              TODAY'S TIMETABLE
            </p>
            <div style={{ margin: "10px" }}>
              {getTodaysDay == "Monday" ? (
                <div
                  style={{
                    background: "#6948c5",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              ) : getTodaysDay == "Tuesday" ? (
                <div
                  style={{
                    background: "#C0A200",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              ) : getTodaysDay == "Wednesday" ? (
                <div
                  style={{
                    background: "#D9000D",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              ) : getTodaysDay == "Thursday" ? (
                <div
                  style={{
                    background: "#2D5DD0",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              ) : getTodaysDay == "Friday" ? (
                <div
                  style={{
                    background: "#15A312",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              ) : getTodaysDay == "Saturday" ? (
                <div
                  style={{
                    background: "#DE861E",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: "#C54884",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "10px", fontSize: "13PX" }}>
                    <p style={{ textAlign: "center" }}>{getTodaysDay}</p>
                    <p style={{ textAlign: "center" }}>{getCurrentDate}</p>
                  </div>
                </div>
              )}

              <div>
                {data == 0 ? (
                  <div>
                    <p
                      style={{
                        textAlign: "center",
                        background: "white",
                        color: "black",
                      }}
                    >
                      No Classes Scheduled for today
                    </p>
                  </div>
                ) : (
                  <div className="d-flex">
                    {data.map((item, index) => {
                      return (
                        <div
                          id="editBox"
                          style={{ width: "130px", margin: "2px" }}
                        >
                          <div
                            style={{
                              background: "#C4C4C4",
                              textAlign: "center",
                              padding: "5px 0",
                              border: "1px solid #c4c4c4",
                            }}
                          >
                            <p style={{ color: "#1F3977", fontSize: "9px" }}>
                              {item.start_time} - {item.end_time}
                            </p>
                          </div>

                          <div
                            style={{
                              background: "white",
                              textAlign: "center",
                              padding: "8px 0",
                              border: "1px solid #c4c4c4",
                            }}
                          >
                            <p style={{ color: "black", fontSize: "11px" }}>
                              {item.subject}
                            </p>
                            <p
                              style={{
                                color: "#1F3977",
                                fontSize: "11px",
                                color: "rgba(0, 0, 0, 0.7)",
                              }}
                            >
                              {item.teacher}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <p
              className="d-flex"
              onClick={() => showMoreTimetable()}
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "blue",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              Show More
              <MdOutlineDoubleArrow style={{ marginTop: "3px" }} />
            </p>
          </div>
        </TabPanel>

        {/* course */}
        <TabPanel
          className="tabpanel"
          style={{
            border: "1px solid green",
            padding: "0",
            marginTop: "0",
            background: "white",
            border: "0.2px solid #f5f5f5",
            width: "100%",
          }}
        >
          <div style={{ height: "220px", overflowY: "auto" }}>
            {/* <h2 style={{ fontWeight: "bold", borderBottom: "2PX SOLID #1F3977", paddingBottom: "5px" }}>COURSES</h2> */}
            <Courses />
          </div>
        </TabPanel>

        {/* grades */}
        <TabPanel
          className="tabpanel course"
          style={{
            padding: "0",
            marginTop: "0",
            background: "white",
            border: "0.2px solid #f5f5f5",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div
            className="form-group"
            style={{
              height: "100%",
              width: "100%",
              padding: "15PX 15px 5px 15px",
              height: "250px",
              overflowY: "auto",
            }}
          >
            <select
              className="form-select form-select-sm "
              id="pollsCategory"
              aria-label=".form-select-sm example"
              onChange={fetchSubjectName}
              // onChange={(e) => updateExamId(e.target.value)}
              style={{
                width: "100%",
                height: "28px",
                padding: "5px",
                fontSize: "10px",
                color: "black",
                border: "1px solid #c4c4c4",
                borderRadius: "0px",
                boxSizing: "border-box",
              }}
            >
              <option
                selected="selected"
                style={{ padding: "6px", fontSize: "11PX", fontWeight: "600" }}
              >
                Select Exam
              </option>

              {examData.length > 0 ? (
                examData.map((item, index) => {
                  return (
                    <option value={item.exam_id} key={index}>
                      {item.exam_name}
                    </option>
                  );
                })
              ) : (
                <div>Data not Found</div>
              )}
            </select>

            {/* table */}
            {subjectInfo !== "" ? (
              <div className="row">
                <div
                  className="col-md-7"
                  style={{ marginTop: "10px", fontSize: "12PX" }}
                >
                  <table>
                    <tr>
                      <th style={{ border: "none" }}>Subject Name</th>
                      <th style={{ border: "none" }}>Marks</th>
                      <th style={{ border: "none" }}>Total</th>
                    </tr>

                    <tr>
                      <td>
                        {subjectInfo !== "" ? (
                          <div>
                            {subjectInfo.map((examItem) => {
                              return <div>{examItem.subject_id}</div>;
                            })}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </td>

                      <td>
                        {subjectInfo !== "" ? (
                          <div>
                            {subjectInfo.map((examItem) => {
                              return <div>{examItem.mark}</div>;
                            })}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </td>

                      <td>
                        {subjectInfo !== "" ? (
                          <div>
                            {subjectInfo.map((examItem) => {
                              return <div>total</div>;
                            })}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </td>
                    </tr>
                  </table>
                </div>

                <div
                  className="col-md-5"
                  style={{ marginTop: "10px", fontSize: "12PX" }}
                >
                  <BarChart
                    width={500}
                    height={300}
                    data={studnetMarksData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </TabPanel>

        {/* engagement */}
        <TabPanel
          className="tabpanel"
          style={{
            border: "1px solid green",
            padding: "0",
            marginTop: "0",
            background: "white",
            border: "0.2px solid #f5f5f5",
            width: "100%",
          }}
        >
          <div style={{ height: "220px", overflowY: "auto" }}>
            {/* <h2 style={{ fontWeight: "bold", borderBottom: "2PX SOLID #1F3977", paddingBottom: "5px" }}>COURSES</h2> */}
            <ActivityLog />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
