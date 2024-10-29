import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import $ from "jquery";
import moment from "moment";
import { Table } from "./Table";
import { Header } from "../Header";
import { ExportToExcel } from "./ExportToExcel";

import { Menu } from "../Menu";
import { useLocation } from "react-router-dom";

// import { WeeklyTimetable } from "./WeeklyTimetable";
import Calendar from "./Calendar";
import Details from "./Details";
import { useReactToPrint } from "react-to-print";
export function Timetable() {
  const token = localStorage.getItem("Token");
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const location = useLocation();

  const courseID = location.state || { id: "none" };
  const classID = location.state || { id: "none" };
  const section = location.state || { id: "none" };

  const getYear = new Date().getFullYear();
  // console.log("get current year",getYear)

  const course_ID = courseID.courseID;
  // console.log("PRINT course id",course_ID)

  const class_ID = classID.classID;
  // console.log("PRINT course id",class_ID)

  const getSection = section.section;
  // console.log("PRINT SECTION ",getSection)

  // const getYear = year.year
  // console.log("PRINT YEAR ",getYear)

  const [isHighlighted, setHighlight] = useState(false);
  const textboxStyle = {
    border: "4px solid green",
  };
  const [date, updateDate] = useState("");
  const [month, updateMonth] = useState("");
  // console.log("get month",month)

  $(".fc-prev-button").html('<i class="fa fa-arrow-circle-left"></i>');
  $(".fc-next-button").html('<i class="fa fa-arrow-circle-right"></i>');

  const print = () => window.print();

  const [scheduleId, updateScheduleId] = useState("");
  const [startTime, updateStartTime] = useState("");
  const [endTime, updateEndTime] = useState("");
  const [isCellSelected, updateIsCellSelected] = useState(false);
  const [selectedCellId, updateSelectedCellId] = useState("");

  function editSchedule(
    id,
    start_time,
    end_time,
    subject,
    teacher,
    subject_id,
    teacher_id,
    e
  ) {
    // console.log('id,start_time,end_time,subject,teacher,subject_id,teacher_id',id,start_time,end_time,subject,teacher,subject_id,teacher_id);
    updateScheduleId(id);
    updateStartTime(start_time);
    updateEndTime(end_time);
    updateSubjectName(subject);
    updateTeacherName(teacher);
    updateSubjectId(subject_id);
    updateTeacherId(teacher_id);
    updateIsCellSelected(true);
    updateSelectedCellId(id);
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }
  // const [studentId, updateStudentId] = useState("")
  function deleteSchedules(scheduledIDD) {
    // console.log("scheduledIDD..........",scheduledIDD);
    updateSelectedCellId(scheduledIDD);
    // updateStudentId(std_id);
    $(".delete_container").show();
  }

  async function deleteWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    // console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deleteSchedule();
    }
  }

  // console.log("scheduleId.................>",scheduleId)
  // function deleteSchedule(selectedCellId,isCellSelected){
  //   if(isCellSelected&&selectedCellId){
  //     console.log("selectedCellId............DELETE FUNCTION",selectedCellId)
  //   }
  // }

  async function deleteSchedule() {
    // console.log("gieeeeeeeeeeeeeeeee");
    try {
      const formData = new FormData();

      formData.append("schedule_id", selectedCellId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      // console.log("Delete scheduleeeee...", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleButton = () => {
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Schedule Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/schedule";
    });
  };

  function EditTimetable(scheduleId) {
    $(".preview_category").show();
  }

  const [courseName, updateCourseName] = useState("");
  async function fetchCourseName() {
    try {
      const formData = new FormData();

      formData.append("id", course_ID);

      const responseCourse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_single_course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      // console.log("GET Course name", responseCourse.data.data);
      responseCourse.data.data.map((courseItem) => {
        // console.log("COURSE NAME",courseItem.course_name)
        updateCourseName(courseItem.course_name);
      });
    } catch (e) {
      console.log("ERROR OCCURRED", e);
    }
  }

  const [className, updateClassName] = useState("");
  async function fetchClassName() {
    try {
      const formData = new FormData();

      formData.append("class_id", class_ID);

      const responseClass = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_single_class",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      // console.log("GET Class name", responseClass.data.data);
      responseClass.data.data.map((classItem) => {
        // console.log("CLASS NAME",classItem.class_name)
        updateClassName(classItem.class_name);
      });
    } catch (e) {
      console.log("ERROR OCCURRED", e);
    }
  }

  const [week1, updateWeek1] = useState("");
  const [week2, updateWeek2] = useState("");
  const [week3, updateWeek3] = useState("");
  const [week4, updateWeek4] = useState("");
  const [week5, updateWeek5] = useState("");
  const [week6, updateWeek6] = useState("");

  // console.log("get week 4 data",week4.monday)
  if (week4.monday == 0) {
    console.log("Array is empty!");
  } else {
    console.log("temsubject", week1.monday);
  }
  // week 1 state variable
  const [week1Monday, updateWeek1Monday] = useState([]);
  const [week1Tuesday, updateWeek1Tuesday] = useState([]);
  const [week1Wednesday, updateWeek1Wednesday] = useState([]);
  const [week1Thrusday, updateWeek1Thrusday] = useState([]);
  const [week1Friday, updateWeek1Friday] = useState([]);
  const [week1Saturday, updateWeek1Saturday] = useState([]);

  // week 2 state variable
  const [week2Monday, updateWeek2Monday] = useState([]);
  const [week2Tuesday, updateWeek2Tuesday] = useState([]);
  const [week2Wednesday, updateWeek2Wednesday] = useState([]);
  const [week2Thrusday, updateWeek2Thrusday] = useState([]);
  const [week2Friday, updateWeek2Friday] = useState([]);
  const [week2Saturday, updateWeek2Saturday] = useState([]);

  // week 3 state variable
  const [week3Monday, updateWeek3Monday] = useState([]);
  const [week3Tuesday, updateWeek3Tuesday] = useState([]);
  const [week3Wednesday, updateWeek3Wednesday] = useState([]);
  const [week3Thrusday, updateWeek3Thrusday] = useState([]);
  const [week3Friday, updateWeek3Friday] = useState([]);
  const [week3Saturday, updateWeek3Saturday] = useState([]);

  // week 4 state variable
  const [week4Monday, updateWeek4Monday] = useState([]);
  const [week4Tuesday, updateWeek4Tuesday] = useState([]);
  const [week4Wednesday, updateWeek4Wednesday] = useState([]);
  const [week4Thrusday, updateWeek4Thrusday] = useState([]);
  const [week4Friday, updateWeek4Friday] = useState([]);
  const [week4Saturday, updateWeek4Saturday] = useState([]);

  // week 5 state variable
  const [week5Monday, updateWeek5Monday] = useState([]);
  const [week5Tuesday, updateWeek5Tuesday] = useState([]);
  const [week5Wednesday, updateWeek5Wednesday] = useState([]);
  const [week5Thrusday, updateWeek5Thrusday] = useState([]);
  const [week5Friday, updateWeek5Friday] = useState([]);
  const [week5Saturday, updateWeek5Saturday] = useState([]);


  console.log('---->>>>>>>>>>>>>>>',week1Monday);

  async function fetchSchedule() {
    // console.log("getMonth-------------->>>>>",newMonth)
    updateWeek1Monday([]);
    updateWeek1Tuesday([]);
    updateWeek1Wednesday([]);
    updateWeek1Thrusday([]);
    updateWeek1Friday([]);
    updateWeek1Saturday([]);

    // week 2
    updateWeek2Monday([]);
    updateWeek2Tuesday([]);
    updateWeek2Wednesday([]);
    updateWeek2Thrusday([]);
    updateWeek2Friday([]);
    updateWeek2Saturday([]);

    // week 3
    updateWeek3Monday([]);
    updateWeek3Tuesday([]);
    updateWeek3Wednesday([]);
    updateWeek3Thrusday([]);
    updateWeek3Friday([]);
    updateWeek3Saturday([]);

    // week 4
    updateWeek4Monday([]);
    updateWeek4Tuesday([]);
    updateWeek4Wednesday([]);
    updateWeek4Thrusday([]);
    updateWeek4Friday([]);
    updateWeek4Saturday([]);

    // week 5
    updateWeek5Monday([]);
    updateWeek5Tuesday([]);
    updateWeek5Wednesday([]);
    updateWeek5Thrusday([]);
    updateWeek5Friday([]);
    updateWeek5Saturday([]);
    try {
      const formData = new FormData();

      formData.append("course", course_ID);
      formData.append("class", class_ID);
      formData.append("section", getSection);
      formData.append("month", newMonth);
      formData.append("year", getYear);

      // console.log("FORMDATA--->>>>>>>>>>>>>>>>", newMonth);

      const responseCourse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      // console.log("GET SCHEDULE", responseCourse.data.data);

      // week 1
      updateWeek1Monday(responseCourse.data.data.week_1.monday);
      updateWeek1Tuesday(responseCourse.data.data.week_1.tuesday);
      updateWeek1Wednesday(responseCourse.data.data.week_1.wednesday);
      updateWeek1Thrusday(responseCourse.data.data.week_1.thursday);
      updateWeek1Friday(responseCourse.data.data.week_1.friday);
      updateWeek1Saturday(responseCourse.data.data.week_1.saturday);

      // week 2
      updateWeek2Monday(responseCourse.data.data.week_2.monday);
      //  console.log("get tuesday data", responseCourse.data.data.week_2.tuesday)
      updateWeek2Tuesday(responseCourse.data.data.week_2.tuesday);
      updateWeek2Wednesday(responseCourse.data.data.week_2.wednesday);
      updateWeek2Thrusday(responseCourse.data.data.week_2.thursday);
      updateWeek2Friday(responseCourse.data.data.week_2.friday);
      updateWeek2Saturday(responseCourse.data.data.week_2.saturday);

      // week 3
      updateWeek3Monday(responseCourse.data.data.week_3.monday);
      updateWeek3Tuesday(responseCourse.data.data.week_3.tuesday);
      updateWeek3Wednesday(responseCourse.data.data.week_3.wednesday);
      updateWeek3Thrusday(responseCourse.data.data.week_3.thursday);
      updateWeek3Friday(responseCourse.data.data.week_3.friday);
      updateWeek3Saturday(responseCourse.data.data.week_3.saturday);

      // week 4
      updateWeek4Monday(responseCourse.data.data.week_4.monday);
      updateWeek4Tuesday(responseCourse.data.data.week_4.tuesday);
      updateWeek4Wednesday(responseCourse.data.data.week_4.wednesday);
      updateWeek4Thrusday(responseCourse.data.data.week_4.thursday);
      updateWeek4Friday(responseCourse.data.data.week_4.friday);
      updateWeek4Saturday(responseCourse.data.data.week_4.saturday);

      // week 5
      updateWeek5Monday(responseCourse.data.data.week_5.monday);
      updateWeek5Tuesday(responseCourse.data.data.week_5.tuesday);
      updateWeek5Wednesday(responseCourse.data.data.week_5.wednesday);
      updateWeek5Thrusday(responseCourse.data.data.week_5.thursday);
      updateWeek5Friday(responseCourse.data.data.week_5.friday);
      updateWeek5Saturday(responseCourse.data.data.week_5.saturday);

      //  if(responseCourse.data.error_code == 404)
      //  {
      //   window.location.href="/schedule"
      //  }
    } catch (e) {
      console.log("ERROR OCCURRED", e);
    }
  }

  const fileName = "timetable";
  const [timetableData, updateTimetableData] = useState([]);
  async function fetchTimetable() {
    try {
      const formData = new FormData();

      formData.append("course", course_ID);
      formData.append("class", class_ID);
      formData.append("section", getSection);

      const responseTimetable = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_week_day_schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      console.log("GET TIMETABLE", responseTimetable.data.data);

      updateTimetableData(responseTimetable.data.data);
    } catch (e) {
      console.log("ERROR OCCURRED", e);
    }
  }

  const handleEditButton = () => {
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Schedule Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/schedule";
    });
  };

  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  async function getUserDetails() {
    const fetchResponse = await axios.get(
      process.env.REACT_APP_API_KEY + "admin_get_Primary_user_info",

      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get campus info", fetchResponse.data.data);
    if (fetchResponse.data.error_code == "200") {
      fetchResponse.data.data.map((fetchItem) => {
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
  }
  async function editWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    // console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }

  async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();

    formData.append("schedule_id", scheduleId);
    formData.append("teacher", teacherId);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("subject", subjectId);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_schedule",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    // console.log("Update Campus Event", eventResponse);
    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    } else {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".required_filed").show();
      }, 1000);
    }
  }

  const [teacherId, updateTeacherId] = useState("");
  const [teacherName, updateTeacherName] = useState("");
  const [pollsCategory, updatePollsCategory] = useState("");

  async function getSubjectwiseTeacherList(e) {
    updateSubjectId(e.target.value);
    // console.log("print subject id",e.target.value)
    try {
      const formData = new FormData();

      formData.append("subject_id", e.target.value);

      const responseCourse = await axios.post(
        process.env.REACT_APP_API_KEY + "get_subjectwise_teachers_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      console.log("GET subjectwise teacher name", responseCourse.data.data);
      if (responseCourse.data.error_code == 200) {
        updatePollsCategory(responseCourse.data.data);
        responseCourse.data.data.map((item) => {
          updateTeacherId(item.teacher_id);
          updateTeacherName(item.teacher_name);
        });
      }
    } catch (e) {
      console.log("ERROR OCCURRED", e);
    }
  }

  const [subjectData, updateSubjectData] = useState([]);
  const [subjectId, updateSubjectId] = useState([]);
  const [subjectName, updateSubjectName] = useState([]);
  async function getSubjectList() {
    try {
      const responseCourse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_subject_list",

        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      console.log("GET SUBJECT LIST", responseCourse.data.data);
      if (responseCourse.data.error_code == 200) {
        updateSubjectData(responseCourse.data.data);
      }
    } catch (e) {
      console.log("ERROR OCCURRED", e);
    }
  }
  useEffect(() => {
    fetchCourseName();
    fetchClassName();
    fetchSchedule();
    fetchTimetable();
    getSubjectList();
    getUserDetails();
  }, []);

  function update_edited_News() {
    $(".edit_popup_password").show();
  }

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateFormat = "MMMM";
  const [newMonth, setNewMonth] = useState(format(currentMonth, dateFormat))
  // console.log("print current month",newMonth)

  var newDate = new Date();
  const getMonth = moment(newDate).format("MMMM");
  // console.log("getMonth",getMonth)

  function getWeekOfMonth(currentMonth) {
    // let adjustedDate = currentMonth.getDate() + currentMonth.getDay();
    // let prefixes = ["1", "2", "3", "4", "5", "6"];
    // return parseInt(prefixes[0 | (adjustedDate / 7)]);
    let current_year = getYear;
    let monthInNum = moment(currentMonth).format('MM');
    let currntDateToFindWeekNum = moment(currentMonth).format('DD,dddd');
    const weeksArrInMonth = getWeeksWithDateInMonth(current_year, monthInNum);
    // console.log("---->>>>>>>>>>>>>>>>>>>>>",monthInNum,currntDateToFindWeekNum);
    // console.log("weeekkkkddkdkdkdk----->>",currentMonth);
    const index = weeksArrInMonth.findIndex((week) => week.includes(currntDateToFindWeekNum));
    // console.log("++++++++++++++++++>>>>>>>>>>>>>>>>>>>",index);
    if (index !== -1) {
      const current_week = index + 1;
      return current_week;
    }
    return null;
  }

  const weeknumber = getWeekOfMonth(currentMonth);

  // console.log("get week--------------------------",weeknumber)

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      // updateMonth(moment(subWeeks(currentMonth, 1)).format('MMMM'));
      setNewMonth(format(subWeeks(currentMonth, 1), dateFormat))
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      // updateMonth(moment(addWeeks(currentMonth, 1)).format('MMMM'));
      setNewMonth(format(addWeeks(currentMonth, 1), dateFormat));
      setCurrentWeek(getWeek(currentMonth, -1));
    }
    fetchSchedule();
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMM";

    return (
      <div className="header d-flex">
        <div>
          <div className="icon" onClick={() => changeWeekHandle("prev")}>
            {/* prev week */}
            <img
              src={require("../images/Forward Button.png")}
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>
        <div className="" style={{ marginLeft: "10PX", fontWeight: "500" }}>
          {/* <span>
            {" "}
            {weeknumber}
            {weeknumber == 1 ? 
            'st ' :
            weeknumber == 2 ? 'nd ' :  
            weeknumber == 3 ? 'rd ' :  
            "th " 
            } 
            week, {format(currentMonth, dateFormat)}
          </span> */}
          <span>
          {/* {format(currentMonth, "MMMM")} */} 
          {moment(startOfWeek(currentMonth, { weekStartsOn: 0 })).format('Do MMM') +' - ' +moment(lastDayOfWeek(currentMonth, { weekStartsOn: 0 })).format('Do MMM')}
          </span>
        </div>
        <div
          style={{ marginLeft: "10px" }}
          onClick={() => changeWeekHandle("next")}
        >
          <div className="icon">
            <img
              src={require("../images/Forward Button.png")}
              style={{
                width: "15px",
                height: "15px",
                transform: "rotate(-180deg)",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return (
      <div className="days row" style={{ border: "1px solid red" }}>
        {days}
      </div>
    );
  };
  const renderCells = (cell) => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
    const dateFormat = "mm dd yyyy";
    const rows = [];
    let days = [];
    let day = startDate;
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq--------------------",startDate);

    let formattedDate = "";
    let formattedDay = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format("DD MMM YYYY");
        formattedDay = moment(day).format("dddd");

        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number mt-5">
              {
                weeknumber == 1  
               ? (
                <div>
                  {formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : formattedDay == "Monday" ? (
                    <div style={{ background: "#6948c5", color: "white" }}>
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week1Monday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week1Monday.map((item, index) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id,
                                      !isHighlighted
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Tuesday" ? (
                    <div
                      style={{
                        background: "#C0A200",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week1Tuesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week1Tuesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Wednesday" ? (
                    <div
                      style={{
                        background: "#D9000D",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week1Wednesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week1Wednesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Thursday" ? (
                    <div
                      style={{
                        background: "#2D5DD0",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week1Thrusday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week1Thrusday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Friday" ? (
                    <div
                      style={{
                        background: "#15A312",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week1Friday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week1Friday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Saturday" ? (
                    <div
                      style={{
                        background: "#DE861E",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week1Saturday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week1Saturday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : (
                    <></>
                  )}
                </div>
              ) : weeknumber == 2 ? (
                <div>
                  {formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : formattedDay == "Monday" ? (
                    <div style={{ background: "#6948c5", color: "white" }}>
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week2Monday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week2Monday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Tuesday" ? (
                    <div
                      style={{
                        background: "#C0A200",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week2Tuesday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week2Tuesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Wednesday" ? (
                    <div
                      style={{
                        background: "#D9000D",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week2Wednesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week2Wednesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Thursday" ? (
                    <div
                      style={{
                        background: "#2D5DD0",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week2Thrusday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week2Thrusday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Friday" ? (
                    <div
                      style={{
                        background: "#15A312",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week2Friday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week2Friday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Saturday" ? (
                    <div
                      style={{
                        background: "#DE861E",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week2Saturday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week2Saturday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : (
                    ""
                  )}
                </div>
              ) : weeknumber == 3 ? (
                <div>
                  {formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : formattedDay == "Monday" ? (
                    <div style={{ background: "#6948c5", color: "white" }}>
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week3Monday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week3Monday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Tuesday" ? (
                    <div
                      style={{
                        background: "#C0A200",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week3Tuesday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week3Tuesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Wednesday" ? (
                    <div
                      style={{
                        background: "#D9000D",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week3Wednesday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week3Wednesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Thursday" ? (
                    <div
                      style={{
                        background: "#2D5DD0",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week3Thrusday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week3Thrusday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Friday" ? (
                    <div
                      style={{
                        background: "#15A312",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week3Friday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week3Friday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Saturday" ? (
                    <div
                      style={{
                        background: "#DE861E",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week3Saturday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week3Saturday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : weeknumber == 4 ? (
                <div>
                  {formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : formattedDay == "Monday" ? (
                    <div style={{ background: "#6948c5", color: "white" }}>
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week4Monday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week4Monday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Tuesday" ? (
                    <div
                      style={{
                        background: "#C0A200",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week4Tuesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week4Tuesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Wednesday" ? (
                    <div
                      style={{
                        background: "#D9000D",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week4Wednesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week4Wednesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Thursday" ? (
                    <div
                      style={{
                        background: "#2D5DD0",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week4Thrusday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week4Thrusday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Friday" ? (
                    <div
                      style={{
                        background: "#15A312",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week4Friday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week4Friday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Saturday" ? (
                    <div
                      style={{
                        background: "#DE861E",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week4Saturday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week4Saturday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : weeknumber == 5 ? (
                <div>
                  {formattedDay == "Sunday" ? (
                    <div
                      style={{
                        background: "#C54884",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          textAlign: "center",
                          padding: "5px 0",
                          height: "100%",
                          border: "1px solid #c4c4c4",
                        }}
                      >
                        <p style={{ color: "#EB2424", fontSize: "10px" }}>
                          HOLIDAY
                        </p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            fontSize: "10px",
                          }}
                        >
                          (Week Off)
                        </p>
                      </div>
                    </div>
                  ) : formattedDay == "Monday" ? (
                    <div style={{ background: "#6948c5", color: "white" }}>
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week5Monday.length == 0 ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week5Monday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Tuesday" ? (
                    <div
                      style={{
                        background: "#C0A200",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week5Tuesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week5Tuesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Wednesday" ? (
                    <div
                      style={{
                        background: "#D9000D",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week5Wednesday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week5Wednesday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Thursday" ? (
                    <div
                      style={{
                        background: "#2D5DD0",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week5Thrusday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week5Thrusday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Friday" ? (
                    <div
                      style={{
                        background: "#15A312",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week5Friday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week5Friday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : formattedDay == "Saturday" ? (
                    <div
                      style={{
                        background: "#DE861E",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>

                      <div>
                        {week5Saturday == "" ? (
                          <div>
                            <p
                              style={{
                                textAlign: "center",
                                background: "white",
                                color: "black",
                              }}
                            >
                              NO DATA
                            </p>
                          </div>
                        ) : (
                          <div>
                            {week5Saturday.map((item) => {
                              return (
                                <div
                                  onClick={() =>
                                    editSchedule(
                                      item.id,
                                      item.start_time,
                                      item.end_time,
                                      item.subject,
                                      item.teacher,
                                      item.subject_id,
                                      item.teacher_id
                                    )
                                  }
                                  style={
                                    isCellSelected && selectedCellId === item.id
                                      ? textboxStyle
                                      : {}
                                  }
                                  id="editBox"
                                >
                                  <div
                                    style={{
                                      background: "#C4C4C4",
                                      textAlign: "center",
                                      padding: "5px 0",
                                      border: "1px solid #c4c4c4",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "9px",
                                      }}
                                    >
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
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "11px",
                                      }}
                                    >
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
                  ) : (
                    ""
                  )}
                </div>
              ) : weeknumber == 6 ? (
                <div></div>
              ) : (
                <div>
                  {formattedDay == "Monday" ? (
                    <div style={{ background: "#6948c5", color: "white" }}>
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          background: "white",
                          color: "black",
                        }}
                      >
                        NO DATA
                      </p>
                    </div>
                  ) : formattedDay == "Tuesday" ? (
                    <div
                      style={{
                        background: "#C0A200",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          background: "white",
                          color: "black",
                        }}
                      >
                        NO DATA
                      </p>
                    </div>
                  ) : formattedDay == "Wednesday" ? (
                    <div
                      style={{
                        background: "#D9000D",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          background: "white",
                          color: "black",
                        }}
                      >
                        NO DATA
                      </p>
                    </div>
                  ) : formattedDay == "Thursday" ? (
                    <div
                      style={{
                        background: "#2D5DD0",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          background: "white",
                          color: "black",
                        }}
                      >
                        NO DATA
                      </p>
                    </div>
                  ) : formattedDay == "Friday" ? (
                    <div
                      style={{
                        background: "#15A312",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          background: "white",
                          color: "black",
                        }}
                      >
                        NO DATA
                      </p>
                    </div>
                  ) : formattedDay == "Saturday" ? (
                    <div
                      style={{
                        background: "#DE861E",
                        color: "white",
                        marginLeft: "10PX",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <p style={{ textAlign: "center" }}>{formattedDay}</p>
                        <p style={{ textAlign: "center" }}>{formattedDate}</p>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          background: "white",
                          color: "black",
                        }}
                      >
                        NO DATA
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  function close_delete_modal() {
    $(".preview_category").hide();
    updateIsCellSelected(false);
  }

  function getWeeksWithDateInMonth(year, month) {
    const weeks = [];
    const currentDate = moment(`${year}-${month}`);
    const monthStart = currentDate.clone().startOf("month");
    const monthEnd = currentDate.clone().endOf("month");

    let weekStart = monthStart.clone().startOf("isoWeek");

    while (weekStart.isBefore(monthEnd)) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = weekStart.clone().add(i, "day");
        if (currentDay.isBetween(monthStart, monthEnd, "day", "[]")) {
          week.push(currentDay.format("DD,dddd"));
        }
      }
      if (week.length > 0) {
        weeks.push(week);
      }
      weekStart = weekStart.clone().add(1, "week");
    }

    return weeks;
  }

  // -------------------------👇👇👇 main return 👇👇👇----------------------
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Menu />
        <div className="content-wrapper">
          <div
            style={{
              background: "white",
              padding: "10PX",
              marginTop: "10PX",
              marginLeft: "0px",
              marginRight: "40px",
              height: "570px",
              overflowY: "auto",
            }}
          >
            <div className="d-flex">
              <p
                style={{
                  fontSize: "11PX",
                  fontWeight: "600",
                  marginTop: "10PX",
                  fontFamily: "Poppins",
                }}
              >
                Timetable -{" "}
              </p>
              <p
                style={{
                  color: "#1f3977",
                  fontSize: "11PX",
                  fontWeight: "600",
                  marginTop: "10PX",
                  fontFamily: "Poppins",
                }}
              >
                {courseName} - {className}
              </p>

              <div style={{ marginLeft: "auto", paddingTop: "7PX" }}>
                <ExportToExcel apiData={timetableData} fileName={fileName} />
              </div>

              {/* <img src={require("../images/Excel.png")} style={{width:"20px", height:"20px",marginLeft:"auto",marginTop:"10PX"}}/> */}
              <img
                src={require("../images/Print.png")}
                className="printButton"
                onClick={print}
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10PX",
                  marginTop: "10PX",
                  cursor: "pointer",
                }}
              />
              <a className="cta" href="#delete" onClick={() => EditTimetable()}>
                <img
                  src={require("../images/Edit.png")}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                    marginTop: "10PX",
                    cursor: "pointer",
                  }}
                />
              </a>
              <a
                className="cta"
                href="#deleterowSchedule"
                onClick={() => deleteSchedules(selectedCellId, isCellSelected)}
              >
                <img
                  src={require("../images/deleteBlueTrash.png")}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                    marginTop: "10PX",
                    cursor: "pointer",
                  }}
                />
              </a>
              <div className="calendar" style={{ marginLeft: "30PX" }}>
                {renderHeader()}
              </div>
            </div>

            <div>
              <br />

              <div className="calendar" ref={componentRef}>
                {renderCells()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* edit timtable */}
      <div>
        {scheduleId == "" ? (
          <div
            className="preview_category"
            style={{
              position: "fixed",
              top: "0",
              left: "0px",
              background: "rgba(0,0,0,0.5)",
              padding: "10px",
              width: "100%",
              height: "100%",
              zIndex: "10",
              display: "none",
            }}
          >
            <div
              style={{
                padding: "15px",
                background: "#f5f5f5",
                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
                position: "absolute",
                bottom: "0px",
                right: "5px",
                width: "390px",
                height: "100%",
                overflow: "auto",
              }}
            >
              <div
                className="d-flex"
                style={{
                  borderBottom: "2px solid #15a312",
                  paddingBottom: "28px",
                  transform: "rotate(0.13deg)",
                  paddingBottom: "10px",
                }}
              >
                <label
                  style={{
                    color: "black",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Edit Schedule
                </label>

                <img
                  src="dist/img/Cancel.png"
                  onClick={() => close_delete_modal()}
                  alt="dropdown"
                  width="18px"
                  height="14px"
                  style={{ cursor: "pointer", marginLeft: "auto" }}
                />
              </div>

              <p>Please select the timetable to edit it !!</p>
            </div>
          </div>
        ) : (
          <div
            className="preview_category"
            style={{
              position: "fixed",
              top: "0",
              left: "0px",
              background: "rgba(0,0,0,0.5)",
              padding: "10px",
              width: "100%",
              height: "100%",
              zIndex: "10",
              display: "none",
            }}
          >
            <div
              style={{
                padding: "15px",
                background: "#f5f5f5",
                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
                position: "absolute",
                bottom: "0px",
                right: "5px",
                width: "390px",
                height: "100%",
                overflow: "auto",
              }}
            >
              <div
                className="d-flex"
                style={{
                  borderBottom: "2px solid #15a312",
                  paddingBottom: "28px",
                  transform: "rotate(0.13deg)",
                  paddingBottom: "10px",
                }}
              >
                <label
                  style={{
                    color: "black",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Edit Schedule
                </label>

                <img
                  src="dist/img/Cancel.png"
                  onClick={() => close_delete_modal()}
                  alt="dropdown"
                  width="18px"
                  height="14px"
                  style={{ cursor: "pointer", marginLeft: "auto" }}
                />
              </div>
              <div className="card-body" style={{ marginTop: "0px" }}>
                {/* start time */}
                <div className="mt-1 p-0">
                  <div class="row" style={{ padding: "0", margin: "0" }}>
                    <div class="col-md-12" style={{ padding: "0" }}>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "0px",
                          paddingRight: "0",
                        }}
                      >
                        <div className="d-flex">
                          <label
                            style={{
                              color: "#1F3977",
                              fontSize: "11px",
                              fontWeight: "600",
                            }}
                          >
                            Start Time
                          </label>

                          <p
                            style={{
                              color: "#EB2424",
                              fontWeight: "600",
                              marginLeft: "3PX",
                            }}
                          >
                            *
                          </p>
                        </div>

                        <input
                          type="time"
                          onChange={(e) => updateStartTime(e.target.value)}
                          value={startTime}
                          className="input_fields"
                          id="publishdate"
                          name="birthdaytime"
                          style={{
                            border: "1px solid #c4c4c4",
                            width: "100%",
                            paddingLeft: "5PX",
                            fontSize: "10PX",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* end time */}
                <div className="mt-1 p-0">
                  <div class="row">
                    <div class="col-md-12" style={{ padding: "0" }}>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "0px",
                          paddingRight: "0",
                        }}
                      >
                        <div className="d-flex">
                          <label
                            style={{
                              color: "#1F3977",
                              fontSize: "10px",
                              fontWeight: "600",
                            }}
                          >
                            End Time
                          </label>

                          <p
                            style={{
                              color: "#EB2424",
                              fontWeight: "600",
                              marginLeft: "3PX",
                            }}
                          >
                            *
                          </p>
                        </div>
                        <input
                          type="time"
                          onChange={(e) => updateEndTime(e.target.value)}
                          value={endTime}
                          id="expiredate"
                          className="input_fields"
                          name="birthdaytime"
                          style={{
                            border: "1px solid #c4c4c4",
                            width: "100%",
                            paddingLeft: "5PX",
                            fontSize: "11px",
                          }}
                        />

                        <div
                          class="EndTime"
                          style={{ marginTop: "-6px", display: "none" }}
                        >
                          <h4
                            class="login-text"
                            style={{
                              color: "red",
                              fontSize: "10PX",
                              marginLeft: "0",
                            }}
                          >
                            Please Select End Time
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* enter subject */}
                <div className="mt-1 p-0">
                  <div class="row">
                    <div class="col-md-12" style={{ padding: "0" }}>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "0px",
                          paddingRight: "0",
                        }}
                      >
                        <div className="d-flex">
                          <label
                            style={{
                              color: "#1F3977",
                              fontSize: "10px",
                              fontWeight: "600",
                            }}
                          >
                            Subject
                          </label>

                          <p
                            style={{
                              color: "#EB2424",
                              fontWeight: "600",
                              marginLeft: "3PX",
                            }}
                          >
                            *
                          </p>
                        </div>

                        <select
                          className="form-select form-select-sm "
                          id="pollsCategory"
                          aria-label=".form-select-sm example"
                          onChange={getSubjectwiseTeacherList}
                          // onChange={(e) => updateSubjectId(e.target.value)}
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
                            value={subjectId}
                            style={{
                              padding: "6px",
                              fontSize: "11PX",
                              fontWeight: "600",
                            }}
                          >
                            {subjectName}
                          </option>

                          {subjectData.length > 0 ? (
                            subjectData.map((item, index) => {
                              return (
                                <option value={item.subject_id} key={index}>
                                  {item.subject_name}
                                </option>
                              );
                            })
                          ) : (
                            <div>Data not Found</div>
                          )}
                        </select>
                        <div
                          class="ValidReason"
                          style={{ marginTop: "-6px", display: "none" }}
                        >
                          <h4
                            class="login-text"
                            style={{
                              color: "red",
                              fontSize: "10PX",
                              marginLeft: "0",
                            }}
                          >
                            Please select Subject
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* select teacher */}
                <div className="mt-2 p-0">
                  <div class="row" style={{ padding: "0", margin: "0" }}>
                    <div class="col-md-12" style={{ padding: "0" }}>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "0px",
                          paddingRight: "0",
                        }}
                      >
                        <div className="d-flex">
                          <label
                            style={{
                              color: "#1F3977",
                              fontSize: "10px",
                              fontWeight: "600",
                            }}
                          >
                            Select Teacher
                          </label>

                          <p
                            style={{
                              color: "#EB2424",
                              fontWeight: "600",
                              marginLeft: "3PX",
                            }}
                          >
                            *
                          </p>
                        </div>

                        <select
                          className="form-select form-select-sm "
                          id="pollsCategory"
                          aria-label=".form-select-sm example"
                          onChange={(e) => updateTeacherId(e.target.value)}
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
                            value={teacherId}
                            style={{
                              padding: "6px",
                              fontSize: "11PX",
                              fontWeight: "600",
                            }}
                          >
                            {teacherName}
                          </option>

                          {pollsCategory.length > 0 ? (
                            pollsCategory.map((item, index) => {
                              return (
                                <option value={item.teacher_id} key={index}>
                                  {item.teacher_name}
                                </option>
                              );
                            })
                          ) : (
                            <div>Data not Found</div>
                          )}
                        </select>
                        <div
                          class="ValidReason"
                          style={{ marginTop: "-6px", display: "none" }}
                        >
                          <h4
                            class="login-text"
                            style={{
                              color: "red",
                              fontSize: "10PX",
                              marginLeft: "0",
                            }}
                          >
                            Please Enter Reason Fo Appointment
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                        color: "#1F3977",
                        fontWeight: "600",
                        borderRadius: "5px",
                        backgroundColor: "transparent",
                        fontSize: "13PX",
                        padding: "8px 12px",
                        border: "none",
                      }}
                    />
                  </a>

                  <a
                    className="cta"
                    href="#edit_with_password"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <input
                      type="button"
                      className="create_btn"
                      id="delete_single_student"
                      value="Update"
                      onClick={() => update_edited_News()}
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
                <div
                  className="required_filed"
                  style={{
                    display: "none",
                    fontSize: "12px",
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  Please Fill The Require Field !!!
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        )}
      </div>
      {/* edit popuop with password */}
      <div id="edit_with_password" className="modaloverlay edit_popup_password">
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Edit Schedule
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are editing a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Edit"
                onClick={() => editWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>

          {/* </div> */}
          {/* </form> */}
        </div>
      </div>

      <div id="deleterowSchedule" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete Schedule?
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure, You Want To Delete This Schedule?
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
                      backgroundColor: "transparent",
                      color: "#d21f3c",
                      fontSize: "13PX",
                      padding: "8px 12px",
                      fontWeight: "600",
                    }}
                  />
                </a>

                <a
                  className="cta"
                  href="#delete_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Delete"
                    style={{
                      borderRadius: "5px",
                      marginRight: "7px",
                      backgroundColor: "#d21f3c",
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

      {/* delete popuop with password */}
      <div
        id="delete_with_password"
        className="modaloverlay delete_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Schedule
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are deleting a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                // className="create_btn"
                // id="delete_single_student"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Delete"
                onClick={() => deleteWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>

          {/* </div> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
