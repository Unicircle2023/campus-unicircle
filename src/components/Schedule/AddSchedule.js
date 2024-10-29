import React, { useState, useEffect, useMemo } from "react";
// import { StudentTable } from './StudentTable';
// import "./StudentTable.css"
import DataTable from "react-data-table-component";
import styled from "styled-components";
import FilterComponenetSchedule from "./FilterComponenetSchedule";
import axios from "axios";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Header } from "../Header";
import { useLocation } from "react-router-dom";
import { Menu } from "../Menu";
import moment from "moment";
const customStyles = {
  headCells: {
    style: {
      color: "#6948c5",
      fontWeight: "500",
    },
  },

  table: {
    style: {
      height: "180px",
      overflowY: "auto",
      padding: "0 20px",
    },
  },
};

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

export function AddSchedule() {
  var y = 2022;
  var m = "November";
  var d = "Monday";
  // var newdate = new Date(y, m, d);
  // console.log("new date", newdate);
  var date = new Date();
  const getCurrentMonth = moment(date).format("MMM");

  const token = localStorage.getItem("Token");
  const [courseID, updateCourseID] = useState("");
  const [classID, updateClassID] = useState("");
  const [errorCode, updateErrorCode] = useState([]);
  const [courseData, updateCourseData] = useState([]);
  const [classData, updateClassData] = useState([]);
  const [section, updateSection] = useState([]);
  const [subjectID, updateSubjectID] = useState([]);
  const [courseId, updateCourseId] = useState("");
  const [subjectId, updateSubjectId] = useState("");
  const [departmentId, updateDepartmentId] = useState("");
  const [departmentName, updateDepartmentName] = useState("");
  const [department, updateDepartment] = useState("");
  const [courseName, updateCourseName] = useState("");
  const [subjectData, updateSubjectData] = useState([]);
  const [daysInWeek, setDaysInWeek] = useState([]);
  const [weeksInMonth, setWeeksInMonth] = useState([]);
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [monthsIndex, setMonthsIndex] = useState("");

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };
  const [departmentdata, setDepartmentData] = useState([]);
  async function fetchDepartmentList() {
    try {
      const fetchDepartmentResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_department_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get Department List", fetchDepartmentResponse.data.data);
      setDepartmentData(fetchDepartmentResponse.data.data);

      // if (fetchDepartmentResponse.data.error_code == 404) {
      //   alert("Invalid Token OR Non Authorized User");
      //   window.location.href = "/";
      // }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const [state, setState] = useState(true);
  const [counter, setCounter] = useState(0);
  console.log("showflag", classID);

  // async function fetchCourseList() {
  //   const token = localStorage.getItem('Token');
  //   console.log("Access Token-", token);
  //   try {

  //     const fetchCourseResponse = await axios.get(process.env.REACT_APP_API_KEY + "campus_get_course",
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',
  //           "Authorization": token,
  //         }
  //       }
  //     );

  //     console.log("Get Course List Details", fetchCourseResponse.data.data);
  //     if(fetchCourseResponse.data.error_code == 200)
  //     {
  //       updateCourseData(fetchCourseResponse.data.data)
  //     }

  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }

  // }

  function monthsFromYear(year) {
    var monthNames = moment.months();
    var currentMonth = moment(year, "YYYY").startOf("year");

    // Filter the month names array to remove any previous months
    var filteredMonthNames = monthNames.filter(function(monthName, index) {
      return index >= currentMonth.month();
    });

    return filteredMonthNames;
  }

  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
    updateYear(onlyDigits);
    var _months = monthsFromYear(onlyDigits);
    setFilteredMonths(_months);
  };
  async function fetchClassList(e) {
    console.log("print courseee iddddddddd", e.target);
    updateCourseID(e.target.value);
    const course_id = e.target.value;
    try {
      const formData = new FormData();
      formData.append("department_id", departmentId);
      formData.append("cource_id", course_id);
      const fetchClassResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "dept_by_get_classes_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      console.log(
        "Get Coursewise class List Details...",
        fetchClassResponse.data.data
      );
      updateErrorCode(fetchClassResponse.data.error_code);
      if (fetchClassResponse.data.error_code == 200) {
        updateClassData(fetchClassResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function courseWiseSubjectList(e) {
    fetchClassList(e);
    updateCourseID(e.target.value);
    updateCourseId(e.target.value);
    updateCourseName(e.target.options[e.target.selectedIndex].text);
    const formDataPersona = new FormData();

    formDataPersona.append("d_id", departmentId);
    formDataPersona.append("c_id", e.target.value);

    const responsePersona = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_coursewise_subject",
      formDataPersona,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("Coursewise subject list", responsePersona.data);
    if (responsePersona.data.error_code == 200) {
      updateSubjectData(responsePersona.data.data);
    }
  }

  async function fetchSubjectList(e) {
    console.log("fetch class id", classID);
    updateClassID(e.target.value);
    const formData = new FormData();

    formData.append("class_id", e.target.value);
    const fetchClassResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_classwise_subjects_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get classwise subject list", fetchClassResponse.data.data);
    if (fetchClassResponse.data.error_code == 200) {
      updateSubjectData(fetchClassResponse.data.data);
    }
  }

  const [scheduleErrorMessage, updateScheduleErrorMessage] = useState("");
  const [scheduleErrorCode, updateScheduleErrorCode] = useState("");
  const [day, updateDay] = useState("");
  // const [month, updateMonth] = useState("")
  const [week, updateWeek] = useState("");
  const [startTime, updateStartTime] = useState("");
  const [year, updateYear] = useState("");
  const [end_Time, updateEndTime] = useState("");
  const [month_s, updateMonth] = useState("");
  const getWeekNumber = week[0];
  // const getMonthNumber = month;

  console.log("Time----->>>>", end_Time);
  // console.log("Months-----------------------",month)

  function getDaysInWeek(weekNum) {
    var currentDate = moment(`${year}-${monthsIndex}`);
    const monthStart = currentDate.clone().startOf("month");
    const monthEnd = currentDate.clone().endOf("month");

    const weekStart = currentDate
      .clone()
      .startOf("month")
      .add(weekNum - 1, "weeks")
      .startOf("week");
    const weekEnd = currentDate
      .clone()
      .startOf("month")
      .add(weekNum - 1, "weeks")
      .endOf("week");

    const _days = [];
    const daysInWeek = 7;

    for (let i = 0; i < daysInWeek; i++) {
      const currentDay = moment(weekStart).add(i, "days");

      if (
        currentDay.isSameOrAfter(weekStart, "day") &&
        currentDay.isSameOrBefore(weekEnd, "day")
      ) {
        _days.push(currentDay.format("dddd,DD"));
      }
    }

    setDaysInWeek(_days);
  }

  function getCurrentWeek(_date) {
    // console.log("date--->>",_date);
    var currentDate = moment(_date);

    var monthStart = currentDate.clone().startOf("month");
    var monthEnd = currentDate.clone().endOf("month");

    var weekStart = currentDate.clone().startOf("isoWeek");
    var weekEnd = currentDate.clone().endOf("isoWeek");

    var _days = [];

    for (var i = 0; i <= 6; i++) {
      var currentDay = moment(weekStart).add(i, "days");
      if (
        currentDay.isSameOrAfter(weekStart, "day") &&
        currentDay.isSameOrAfter(monthStart, "day")
      ) {
        _days.push(currentDay.format("dddd"));
      }
    }

    var numWeeksInMonth = monthEnd.isoWeek() - monthStart.isoWeek() + 1;
    var _array = Array.from({ length: numWeeksInMonth }, (_, i) => i + 1).map(
      Number
    );
    // console.log(arr);
    setWeeksInMonth(_array);
    // console.log("Number of weeks in current month:", numWeeksInMonth);
  }

  function compare(e) {
    console.log("Time", startTime);
    console.log("Time", e.target.value);
    const end_time = e.target.value;
    if (startTime >= end_time) {
      alert("End Time should be greater than start time");
      $("#end_time option").prop("selected", function() {
        return this.defaultSelected;
      });

      updateEndTime();
    } else {
      updateEndTime(e.target.value);
    }
  }

  var date = new Date();
  const getMonth = moment(date).format("MMMM");
  // console.log("getMonth------------", getMonth);
  // console.log("getMonthNumber------------", getMonthNumber);
  async function createSubject() {
    // console.log("get todats");
    try {
      const formData = new FormData();
      let F_Day = day.split(',');

      formData.append("course", courseId);
      formData.append("class", classID);
      formData.append("subject", subjectID);
      formData.append("day", F_Day[0]);
      formData.append("week", getWeekNumber);
      formData.append("start_time", startTime);
      formData.append("end_time", end_Time);
      formData.append("section", section);
      formData.append("month", month_s);
      // formData.append("month", getMonthNumber);
      formData.append("year", year);
      for (const [key, value] of formData.entries()) {
        console.log(`ADD SCH---->>>>${key}: ${value}`);
      }
      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_add_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      console.log("ADD SUBJECT", fetchResponse);
      console.log("error message", fetchResponse.data.message);
      updateScheduleErrorCode(fetchResponse.data.error_code);
      updateScheduleErrorMessage(fetchResponse.data.message);
      if (fetchResponse.data.error_code == 200) {
        const formData = new FormData();

        formData.append("course", courseID);
        formData.append("class", classID);
        formData.append("section", section);
        formData.append("week", getWeekNumber);
        formData.append("subject", subjectID);
        formData.append("day", F_Day[0]);
        formData.append("month", getMonth);
        // formData.append("month", getMonthNumber);
        formData.append("year", year);
        for (const [key, value] of formData.entries()) {
          console.log(`admin_get_datewise_perticular_schedule---->>>>${key}: ${value}`);
        }

        const fetchResponse = await axios.post(
          process.env.REACT_APP_API_KEY +
            "admin_get_datewise_perticular_schedule",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // "X-Requested-With": "XMLHttpRequest",
              Authorization: token,
            },
          }
        );

        console.log("ADD SUBJECT", fetchResponse);
        if (fetchResponse.data.error_code == 200) {
          updateDatewiseSchedule(fetchResponse.data.data);
          $("#save_schedule").show();
          $(".showTimetable").show();
        }
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function departmentWiseCourseList(e) {
    console.log("get departent name", e.target.value);
    // console.log(event.target.options[event.target.selectedIndex].text);
    console.log(
      "get departent name",
      e.target.options[e.target.selectedIndex].text
    );
    updateDepartmentId(e.target.value);
    updateDepartmentName(e.target.options[e.target.selectedIndex].text);
    const formDataPersona = new FormData();

    formDataPersona.append("d_id", e.target.value);

    const responsePersona = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
      formDataPersona,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("Departmentwise course list", responsePersona.data.data);
    updateErrorCode(responsePersona.data.error_code);
    if (responsePersona.data.error_code == 200) {
      updateCourseData(responsePersona.data.data);
    }
  }
  const [data, setData] = useState([]);
  const [studentId, updateStudentId] = useState("");
  const [email, updateEmail] = useState("");
  const [subject, updateSubject] = useState("");
  const [description, updateDescription] = useState("");
  const [error_message, updateError_message] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [error_code, updateError_code] = useState("");

  async function fetchSchedule() {
    try {
      const formData = new FormData();

      formData.append("course", studentId);
      formData.append("class", email);
      formData.append("section", subject);

      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Send Email", response.data);
      if (response.data.error_code == 200) {
        window.location.href = "/createSchedule";
        setData([response.data]);
      }

      updateError_code(response.data.error_code);
      updateError_message(response.data.message);

      updateEmail("");
      updateSubject("");
      updateDescription("");
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  useEffect(() => {
    fetchSchedule();

    fetchDepartmentList();
    // fetchSubjectList();
  }, []);

  const [nameOfStudent, updateNameOfStudent] = useState([]);
  async function deleteStudent(std_id, std_name) {
    updateNameOfStudent(std_name);
    console.log("name_of_student", std_name);
    console.log("student id", std_id);
    $(".delete_container").show();
    try {
      console.log("student idsdddddddddddddddddddddddddd", std_id);
      const formData = new FormData();

      formData.append("student_id", std_id);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_student",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Student", deleteResponse);
      updatedeleteErrorMessage(deleteResponse.data.message);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  async function deleteMessage() {
    $(".delete_container").hide();
    window.href = "./student";
    $(".show_delete_message").show();
  }

  function fetchId(id, email) {
    $(".sendEmailMessage").show();

    const student_email = email;
    const student_id = id;
    console.log("Student Email", student_email);
    console.log("Student Email", student_id);
    updateEmail(student_email);
    updateStudentId(student_id);
  }

  const [DatewiseSchedule, updateDatewiseSchedule] = useState([]);
  
  async function fetchDatewiseSchedule(e) {
    updateSubjectID(e.target.value);
    try {
      const formData = new FormData();

      formData.append("course", courseID);
      formData.append("class", classID);
      formData.append("section", section);
      formData.append("subject", subjectID);
      formData.append("week", getWeekNumber);
      formData.append("day", day);
      formData.append("month", getMonth);
      // formData.append("month", getMonthNumber);
      formData.append("year", year);
      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY +
          "admin_get_datewise_perticular_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      console.log("ADD SUBJECT data", fetchResponse.data);
      if (fetchResponse.data.error_code == 200) {
        updateDatewiseSchedule(fetchResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function saveScheduleData() {
    $(".save_details").show();
    console.log("Newly Added Subject Saved Sucessfully");
    window.location.href = "/schedule";
  }

  const columns = [
    {
      name: "Subject",
      // selector: 'student_name',
      // sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        console.log("DISPLAY ROW DARA", row);
        return (
          <div style={{ fontWeight: "500", fontSize: "12PX" }}>
            {row.subject}
          </div>
        );
      },
    },

    {
      name: "Begin Time",
      // selector: 'student_id',
      // sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        console.log("ROW", row.student_id);
        return (
          <div style={{ fontWeight: "500", fontSize: "12PX" }}>
            {row.start_time} A.M
          </div>
        );
      },
    },
    {
      name: "End Time",
      // selector: 'persona',
      // sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        console.log("ROW", row.persona);

        return (
          <div style={{ fontWeight: "500", fontSize: "12PX" }}>
            {row.end_time} A.M
          </div>
        );
      },
    },
    {
      name: "Assigned Teacher",
      // selector: 'email',
      // sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        console.log("ROW");
        return (
          <div style={{ fontWeight: "500", fontSize: "12PX" }}>
            {row.teacher}
          </div>
        );
      },
    },

    // {
    //   name: 'Actions',

    //   wrap: true,
    //   width: "auto",
    //   cell: (row) => {
    //     return (
    //       <div className="d-flex">
    //         <img style={{ width: "17px", height: "17px", marginLeft: "2px" }} src="dist/img/Pencil.png" />&nbsp;

    //       </div>

    //     )
    //   }
    // }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = DatewiseSchedule.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return <div></div>;
  }, [filterText, resetPaginationToggle]);

  function close_modal() {
    $(".sendEmailMessage").hide();
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Menu />
        <div className="content-wrapper">
          <div id="google" className="modaloverlay sendEmailMessage">
            <div className="modalContainer">
              {/* <form role="form"> */}
              <div className="card-body" style={{ marginTop: "0px" }}>
                <div>
                  <div className="d-flex">
                    <a
                      onClick={close_modal}
                      href="#"
                      style={{
                        color: "grey",
                        marginLeft: "auto",
                        fontSize: "25PX",
                      }}
                    >
                      &times;
                    </a>
                  </div>

                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      fontSize: "11px",
                      marginTop: "10px",
                    }}
                  >
                    {error_code == 200 ? (
                      <div className="d-flex">
                        <img
                          src={require("../images/correct.png")}
                          style={{ width: "18px" }}
                        />
                        <p style={{ color: "green", marginLeft: "5PX" }}>
                          {error_message}
                        </p>
                      </div>
                    ) : error_code == 404 ? (
                      <div className="d-flex">
                        <img
                          src={require("../images/wrong.jpg")}
                          style={{ width: "18px" }}
                        />
                        <p style={{ color: "red" }}>{error_message}</p>
                      </div>
                    ) : error_code == 406 ? (
                      <div className="d-flex">
                        <img
                          src={require("../images/missing.png")}
                          style={{ width: "15px" }}
                        />
                        <p style={{ color: "blue", marginLeft: "5PX" }}>
                          Error! You Must Fill In All The Fields
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* {ErrorMessage} */}
                  </div>
                  {/* CATEGORY */}
                  <div className="form-group" style={{ marginTop: "0px" }}>
                    <label
                      htmlFor="exampleInputEmail1"
                      style={{ color: "#1F3977", fontSize: "13px" }}
                    >
                      Send Email
                    </label>
                    <input
                      type="name"
                      className="border"
                      id="emailId"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => updateEmail(e.target.value)}
                      style={{
                        width: "100%",
                        height: "35px",
                        marginTop: "-8px",
                        fontSize: "12px",
                      }}
                    />

                    <div class="Email" style={{ margin: "0", display: "none" }}>
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter Email
                      </h4>
                    </div>

                    <label
                      style={{
                        color: "#1F3977",
                        marginTop: "10px",
                        fontSize: "13PX",
                      }}
                    >
                      Subject
                    </label>
                    <input
                      type="name"
                      className="border"
                      id="subjectName"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => updateSubject(e.target.value)}
                      style={{
                        width: "100%",
                        height: "35px",
                        marginBottom: "-9px",
                        fontSize: "12PX",
                      }}
                    />

                    <div
                      class="Subject"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "13PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter Subject
                      </h4>
                    </div>

                    <label
                      style={{
                        color: "#1F3977",
                        marginTop: "10px",
                        fontSize: "13PX",
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      type="name"
                      className="border"
                      id="descriptionName"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => updateDescription(e.target.value)}
                      style={{
                        width: "100%",
                        height: "100px",
                        marginBottom: "-9px",
                        paddingTop: "7PX",
                        paddingLeft: "5px",
                        fontSize: "12px",
                      }}
                    />

                    <div
                      class="Description"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter Description
                      </h4>
                    </div>
                  </div>

                  <div className="d-flex mt-3">
                    <input
                      type="button"
                      className="create_btn"
                      value="Submit"
                      // onClick={() => createMessage()}
                      style={{
                        borderRadius: "5px",
                        marginLeft: "auto",
                        backgroundColor: "#1F3977",
                        fontSize: "13PX",
                        padding: "8px 12px",
                      }}
                    />
                  </div>

                  {/* <div class="ValueMsg" style={{ margin: "8px", width: "57%", display: "none" }}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error">
                      Error! You Must Fill In All The Fields
                    </Alert>
                  </Stack>
                </div> */}
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>

          <div id="delete" className="modaloverlay delete_container">
            <div className="modalContainer">
              <div className="card-body" style={{ marginTop: "0px" }}>
                <div>
                  <p style={{ fontWeight: "600", color: "black" }}>
                    Delete message?
                  </p>
                  <h2 style={{ marginTop: "20PX", fontSize: "14PX" }}>
                    Are You Sure You Want To Delete {nameOfStudent}
                  </h2>

                  <div className="d-flex mt-3">
                    <a
                      onClick={close_delete_modal}
                      href="#"
                      style={{ marginLeft: "auto" }}
                    >
                      <input
                        type="button"
                        className="create_btn"
                        value="Cancel"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#c4c4c4",
                          fontSize: "13PX",
                          padding: "8px 12px",
                        }}
                      />
                    </a>

                    <a
                      onClick={deleteMessage}
                      href="/student"
                      style={{ color: "grey", fontSize: "15PX" }}
                    >
                      <input
                        type="button"
                        className="create_btn"
                        id="delete_single_student"
                        value="Submit"
                        style={{
                          borderRadius: "5px",
                          marginRight: "7px",
                          backgroundColor: "#1F3977",
                          fontSize: "13PX",
                          padding: "8px 12px",
                        }}
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>

          <div style={{ width: "100%", padding: "0" }}>
            <div
              style={{ padding: "0px", marginLeft: "0px", marginRight: "0" }}
            >
             
              <div
                className="row border_class"
                style={{
                  background: "#ffffff",
                  padding: "10px 5px",
                  width: "100%",
                  marginBottom:"10px",
                  alignItems:"center"
                }}
              >
                <div className="col-md-5" style={{ height: "100%" }}>
                  <h4
                    style={{
                      color: "#000000",
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontSize: "13px",
                      marginLeft: "23px",
                    }}
                  >
                    Timetable Schedule
                  </h4>
                  <div className="display_schedule_message">
                    {scheduleErrorCode == 200 ? (
                      <div style={{ color: "green", fontSize: "11px" }}>
                        {" "}
                        {scheduleErrorMessage}
                      </div>
                    ) : scheduleErrorCode == 409 ? (
                      <div style={{ color: "blue", fontSize: "11px" }}>
                        {" "}
                        {scheduleErrorMessage}
                      </div>
                    ) : (
                      <div style={{ color: "red", fontSize: "11px" }}>
                        {" "}
                        {scheduleErrorMessage}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="col-md-3 d-flex flex-row"
                  style={{
                    height: "100%",
                    background: "#FFFFFF",
                    padding: "0",
                    border: "0.5px solid #c4c4c4",
                    backdropFilter: "blur(4px)",
                    color: "#000000",
                    width: "275px",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={require("../images/Search.png")}
                    style={{
                      width: "21px",
                      height: "21px",
                      margin: "5px 0px 0px 3px",
                    }}
                  />

                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by Name"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{
                      background: "white",
                      marginLeft: "0px",
                      height: "32px",
                      width: "100%",
                      border: "none",
                      fontWeight: "600",
                      borderRadius: "30PX",
                    }}
                  />
                </div>

                {/* <div className="col-md-1 d-flex flex-row">
                  <img
                    src="dist/img/Sorting.png"
                    style={{ height: "28px", width: "28px", marginTop: "3px" }}
                  />
                
                </div> */}
              </div>
            
              <div className="border_class">
              <div
                className="row"
                style={{
                  paddingLeft: "30px",
                  background: "white",
                  paddingTop: "7px",
                }}
              >
                <div className="col-md-3">
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Department
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    aria-label=".form-select-sm example"
                    id="department"
                    onChange={departmentWiseCourseList}
                    style={{
                      width: "100%",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                      color: "black",
                    }}
                  >
                    <option
                      selected="selected"
                      value={department}
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      Select Department
                    </option>
                    {departmentdata.map((dept, index) => {
                      //  console.log("department data", dept)

                      return (
                        <option
                          value={dept.department_id}
                          key={index}
                          name={dept.department_name}
                        >
                          {dept.department_name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-2" style={{ paddingLeft: "10PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Course
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    aria-label=".form-select-sm example"
                    id="department"
                    onChange={courseWiseSubjectList}
                    style={{
                      width: "100%",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                      color: "black",
                    }}
                  >
                    <option
                      selected="selected"
                      value={courseData}
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      Select Course
                    </option>
                    {courseData.map((course, index) => {
                      console.log("courseData", course);
                      return (
                        <option
                          value={course.course_id}
                          key={index}
                          style={{
                            color: "#000000",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "10px",
                            lineHeight: "21px",
                          }}
                        >
                          {course.course_name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-2" style={{ paddingLeft: "0PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Class
                  </label>
                  <br></br>

                  {errorCode == 200 ? (
                    <select
                      className="cat_dropdown"
                      aria-label=".form-select-sm example"
                      id="department"
                      onChange={fetchSubjectList}
                      style={{
                        width: "100%",
                        background: "white",
                        fontWeight: "500",
                        fontSize: "10px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        height: "38px",
                        border: "0.5px solid #c4c4c4",
                        boxSizing: "border-box",
                        marginBottom: "8px",
                        color: "black",
                      }}
                    >
                      <option
                        selected="selected"
                        value={classData}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Select Class
                      </option>

                      {/* <option value="1">First Year</option>
                      <option value="2"> Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Fourth Year</option>
                      <option value="5">Fifth Year</option>
                      <option value="6">Sixth Year</option> */}

                      {classData.map((classItem, index) => {
                        return (
                          <option
                            value={classItem.class_id}
                            key={index}
                            style={{
                              color: "#000000",
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "500",
                              fontSize: "10px",
                              lineHeight: "21px",
                            }}
                          >
                            {classItem.class_name}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <select
                      className="cat_dropdown"
                      aria-label=".form-select-sm example"
                      id="department"
                      style={{
                        width: "100%",
                        background: "white",
                        fontWeight: "500",
                        fontSize: "10px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        height: "38px",
                        border: "0.5px solid #c4c4c4",
                        boxSizing: "border-box",
                        marginBottom: "8px",
                        color: "black",
                      }}
                    >
                      <option
                        selected="selected"
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Select Class
                      </option>

                      <option
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        First Year
                      </option>
                      <option
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Second Year
                      </option>

                      <option
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Third Year
                      </option>

                      <option
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Fourth Year
                      </option>

                      <option
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Fifth Year
                      </option>

                      <option
                        value={classID}
                        style={{
                          color: "#000000",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "10px",
                          lineHeight: "21px",
                        }}
                      >
                        Sixth Year
                      </option>
                    </select>
                  )}
                </div>
                <div className="col-md-2" style={{ paddingLeft: "0PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Section
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    aria-label=".form-select-sm example"
                    id="department"
                    onChange={(e) => updateSection(e.target.value)}
                    style={{
                      width: "100%",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                      color: "black",
                    }}
                  >
                    <option
                      selected="selected"
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      Select Section
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      A
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      B
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      C
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      D
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      E
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      F
                    </option>
                  </select>
                </div>
              </div>

              <div
                className="row"
                style={{ paddingLeft: "30px", background: "white" }}
              >
                <div className="col-md-2" style={{ paddingLeft: "10PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Year
                  </label>
                  <br></br>
                  <input
                    type="text"
                    maxLength="4"
                    className="year_input"
                    id="faq_category_single"
                    placeholder="Add Year"
                    value={year}
                    onChange={(e) => checkInput(e)}
                    // onChange={(e) => updateYear(e.target.value)}
                    style={{
                      width: "100%",
                      height: "34px",
                      borderRadius: "3PX",
                      fontSize: "11px",
                      border: "1px solid #c4c4c4",
                      background: "white",
                    }}
                  />
                </div>

                {/* month  section start*/}
                <div className="col-md-2" style={{ paddingLeft: "0PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Month
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    style={{
                      width: "100%",
                      color: "#4779F0",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      height: "34px",
                      border: "0.5px solid #c4c4c4",
                      borderRadius: "3PX",
                    }}
                    value={month_s}
                    onChange={(e) => {
                      updateMonth(e.target.value);
                      let month_index = filteredMonths.findIndex(
                        (item) => item == e.target.value
                      );
                      // setSelectedMonthIndex(month_index+1);
                      let indexToStr = String(month_index + 1);
                      if (Number(indexToStr) < 10) {
                        indexToStr = "0" + indexToStr;
                        setMonthsIndex(indexToStr);
                        getCurrentWeek(`${year}-${indexToStr}`);
                      } else {
                        setMonthsIndex(indexToStr);
                        getCurrentWeek(`${year}-${indexToStr}`);
                      }
                      // getCurrentWeek(`${year}-${Number(month_index)}`);
                      // console.log("----->>",week_result);
                    }}
                  >
                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Select Month
                    </option>
                    {filteredMonths.map((item, index) => (
                      <option
                        key={index}
                        selected
                        // disabled={moment().format('M') < index + 1 ? true : false}
                        style={{
                          color: "#4779F0",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "10px",
                        }}
                      >
                        {item}
                      </option>
                    ))}
                    {/* <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      January
                    </option> */}

                    {/* <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      February
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      March
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      April
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      May
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      June
                    </option>
                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      July
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      August
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      September
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      October
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      November
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      December
                    </option> */}
                  </select>
                </div>
                {/* month section end */}

                <div className="col-md-2" style={{ paddingLeft: "0PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Week
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    style={{
                      width: "100%",
                      color: "#4779F0",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      height: "34px",
                      border: "0.5px solid #c4c4c4",
                      borderRadius: "3PX",
                    }}
                    value={week}
                    onChange={(e) => {
                      updateWeek(e.target.value);
                      getDaysInWeek(e.target.selectedIndex);
                    }}
                  >
                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Select Week
                    </option>
                    {weeksInMonth.map((item, index) => (
                      <option
                        key={index}
                        selected
                        style={{
                          color: "#4779F0",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "10px",
                        }}
                      >
                        {index == 0
                          ? item + "st"
                          : index == 1
                          ? item + "nd"
                          : index == 2
                          ? item + "rd"
                          : item + "th"}{" "}
                        Week, {month_s}
                      </option>
                    ))}
                    {/* <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      1st Week, {month_s}
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      2nd Week, {month_s}
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      3rd Week, {month_s}
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      4th Week, {month_s}
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      5th Week, {month_s}
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      6th Week, {month_s}
                    </option> */}
                  </select>
                </div>

                <div className="col-md-2" style={{ paddingLeft: "10PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Day
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    style={{
                      width: "100%",
                      color: "#4779F0",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      borderRadius: "3px",
                    }}
                    value={day}
                    onChange={(e) => updateDay(e.target.value)}
                  >
                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                        height: "34px",
                      }}
                    >
                      Select Day
                    </option>
                    {daysInWeek.map((item, index) => (
                      <option
                        key={index}
                        selected
                        style={{
                          color: "#4779F0",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "10px",
                        }}
                      >
                        {item}
                      </option>
                    ))}
                    {/* <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Monday
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Tuesday
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Wednesday
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Thursday
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Friday
                    </option>

                    <option
                      selected
                      style={{
                        color: "#4779F0",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      Saturday
                    </option> */}
                  </select>
                </div>
              </div>

              <div
                className="row"
                style={{ paddingLeft: "30px", background: "white" }}
              >
                <div className="col-md-3" style={{ paddingLeft: "10PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    Subject
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    aria-label=".form-select-sm example"
                    id="department"
                    onChange={fetchDatewiseSchedule}
                    // onChange={(e) => updateSubjectID(e.target.value)}
                    style={{
                      width: "100%",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                      color: "black",
                    }}
                  >
                    <option
                      selected="selected"
                      value={subjectData}
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      All Subject
                    </option>
                    {subjectData.map((subjectItem, index) => {
                      return (
                        <option
                          value={subjectItem.subject_id}
                          key={index}
                          style={{
                            color: "#000000",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "10px",
                            lineHeight: "21px",
                          }}
                        >
                          {subjectItem.subject_name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-3" style={{ paddingLeft: "0PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    {" "}
                    Begin Time
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    aria-label=".form-select-sm example"
                    id="department"
                    // value={startTime}
                    onChange={(e) => updateStartTime(e.target.value)}
                    style={{
                      width: "100%",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                      color: "black",
                    }}
                  >
                    <option
                      selected="selected"
                      value={startTime}
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      Select Begin Time
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      07:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      08:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      09:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      10:30
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      11:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      12:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      13:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      14:30
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      15:30
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      16:30
                    </option>
                  </select>
                </div>
                <div className="col-md-3" style={{ paddingLeft: "0PX" }}>
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      color: "#1F3977",
                      margin: "0",
                    }}
                  >
                    End Time
                  </label>
                  <br></br>

                  <select
                    className="cat_dropdown"
                    aria-label=".form-select-sm example"
                    id="end_time"
                    // value={end_Time}
                    onChange={compare}
                    // onChange={(e) => updateEndTime(e.target.value)}
                    style={{
                      width: "100%",
                      background: "white",
                      fontWeight: "500",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      height: "38px",
                      border: "0.5px solid #c4c4c4",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                      color: "black",
                    }}
                  >
                    <option
                      selected="selected"
                      value={end_Time}
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      Select End Time
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      08:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      09:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      10:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      11:30
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      12:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      13:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      14:30
                    </option>
                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      15:30
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      16:30
                    </option>

                    <option
                      style={{
                        color: "#000000",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "10px",
                        lineHeight: "21px",
                      }}
                    >
                      17:30
                    </option>
                  </select>
                </div>
                <div
                  className="col-md-3"
                  style={{ padding: "19px 0px 0px 0px" }}
                >
                  <button
                    type="button"
                    className="d-flex buttonContainer news-button"
                    defaultValue="Sign Up"
                    onClick={() => createSubject()}
                    style={{
                      padding: "8px 12px",
                      background: "#15a312",
                      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                      flexWrap: "wrap",
                      borderRadius: "3px",
                      height: "35px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "12PX",
                        fontWeight: "400",
                        fontFamily: "Poppins",
                        textAlign: "center",
                      }}
                    >
                      Add Schedule
                    </div>
                  </button>
                </div>
              </div>

              <div
                className="row"
                style={{
                  paddingLeft: "40px",
                  background: "white",
                  paddingRight: "30px",
                  paddingBottom: "10px",
                }}
              >
                <div
                  style={{
                    background: "rgba(31, 57, 119, 0.9)",
                    height: "40px",
                  }}
                >
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "500",
                      width: "100%",
                      fontFamily: "Poppins",
                      textAlign: "center",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {day} | {week}
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div
            classname="showTimetable"
            style={{ marginLeft: "0PX", overflowX: "auto", display: "none" }}
          >
            <DataTable
              columns={columns}
              data={filteredItems}
              striped
              paginationPerPage={10}
              pagination
              paginationRowsPerPageOptions={[
                10,
                20,
                30,
                40,
                50,
                60,
                70,
                80,
                90,
                100,
              ]}
              paginationComponentOptions={paginationComponentOptions}
              subHeader
              subHeaderComponent={subHeaderComponent}
              highlightOnHover
              defaultSortFieldId={1}
              //   selectableRows
              customStyles={customStyles}
            />
          </div>
          <div className="d-flex" style={{ padding: "0 20px" }}>
            <input
              type="button"
              className="create_btn"
              id="save_schedule"
              value="Save"
              onClick={() => saveScheduleData()}
              style={{
                borderRadius: "5px",
                backgroundColor: "green",
                fontSize: "13PX",
                textAlign: "center",
                padding: "5px",
                display: "none",
              }}
            />

            <div
              className="save_details"
              style={{
                marginTop: "15px",
                color: "green",
                fontSize: "12px",
                display: "none",
              }}
            >
              Newly Added Subject Saved Sucessfully
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
