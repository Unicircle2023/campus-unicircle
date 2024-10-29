import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { IoMdAddCircle } from "react-icons/io";
import { BsImageFill } from "react-icons/bs";
import { PreviewForm } from "./PreviewForm";
import { useLocation } from "react-router-dom";

export function AppointmentForm() {
  const token = localStorage.getItem("Token");
  const [reason, updateReason] = useState("");
  const [dateOfAppointment, updateDateOfAppointment] = useState("");
  const [duration, updateDuration] = useState("");
  const [venue, updateVenue] = useState("");
  const [startTime, updateStartTime] = useState("");
  const [endTime, updateEndTime] = useState("");
  const [bookingWith, updateBookingWith] = useState("");
  const [error_message, updateError_message] = useState("");
  const [classId, updateClassId] = useState();
  const [data, setData] = useState([]);
  const [appointmentId, updateAppointmentId] = useState("");
  const [teacherName, updateTeacherName] = useState("");

  console.log("teacherName", teacherName);

  const passEditAppointmentData = (
    Reason,
    date,
    Duration,
    Venue,
    StartTime,
    EndTime,
    ClassId,
    teacherName
  ) => {
    updateReason(Reason);
    updateDateOfAppointment(date);
    updateDuration(Duration);
    updateVenue(Venue);
    updateStartTime(StartTime);
    updateEndTime(EndTime);
    updateClassId(ClassId);
    getTeacherName(ClassId);
  };

  async function getTeacherName(ClassId) {
    const formData = new FormData();

    formData.append("teacher_id", ClassId);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "get_teacher_profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Edit Appointment", response);
    if (response.data.error_code == 200) {
      response.data.data.map((item) => {
        const first_name = item.first_name;
        const last_name = item.last_name;
        const full_name = first_name.concat(" ", last_name);
        console.log("get teacher name", full_name);
        updateTeacherName(full_name);
        $("#news_category").val(full_name);
      });
    }
  }

  var todayy = "";
  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  $(".close_event").click(function() {
    $(".preview_category").hide();
  });

  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  $(".close_event").click(function() {
    $(".preview_category").hide();
  });

  function Compare() {
    if (startTime > endTime) {
      alert("End Time should be greater than start time");
    }
  }

  // function all_student() {
  //   $(".user_type").hide();
  // }
  // async function specific_class() {
  //   $(".user_type").show();
  // }
  // function currentDate() {
  //   var date = new Date();
  //   var day = date.getDate();
  //   var month = date.getMonth() + 1;
  //   var year = date.getFullYear();
  //   var time = date.getHours() + ":" + date.getMinutes();
  //   if (month < 10) month = "0" + month;
  //   if (day < 10) day = "0" + day;

  //   var today = year + "-" + month + "-" + day + " " + time;

  //   console.log("current date/time", today);

  //   document.getElementById("publish_date").value = today;
  // }

  // async function addAppointment() {

  //   try {

  //     const formData = new FormData();

  //     formData.append("reason", reason);
  //     formData.append("date", dateOfAppointment);
  //     formData.append("duration", duration);
  //     formData.append("venue", venue);
  //     formData.append("start_time", startTime);
  //     formData.append("end_time", endTime);
  //     formData.append("booking_with", classId);

  //     const response = await axios.post(process.env.REACT_APP_API_KEY + "create_appointement",
  //       formData,
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',

  //           "Authorization": token,
  //         }
  //       });

  //     console.log("Create Appointment", response);

  //     const ID = response.data.a_id;
  //     fetchSingleAppointment(ID)
  //     updateAppointmentId(ID)
  //     updateReason(reason);
  //     updateDateOfAppointment(dateOfAppointment);
  //     updateDuration(duration);
  //     updateVenue(venue);
  //     updateStartTime(startTime);
  //     updateEndTime(endTime);
  //     updateBookingWith(classId)

  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }

  // }

  async function fetchSingleAppointment(id) {
    console.log("Access Token-", token);
    try {
      console.log("Apppp Id", appointmentId);
      const formData = new FormData();
      formData.append("a_id", id);

      const fetchAppResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_single_appointment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Single Appointment", fetchAppResponse);

      const AppErrorCode = fetchAppResponse.data.error_code;
      console.log("Appointment Error Code ", AppErrorCode);

      if (AppErrorCode === 200) {
        const appListArray = fetchAppResponse.data.data;
        console.log("News list Array", appListArray);
        setData(appListArray);
      } else {
        setData([]);

        console.log(fetchAppResponse.data.message);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  useEffect(() => {
    fetchSingleAppointment();
    getStudentList();
  }, []);

  async function createAppointment() {
    try {
      const validreason = document.getElementById("validreason");
      const date_of_appointment = document.getElementById(
        "date_of_appointment"
      );
      const app_start_time = document.getElementById("app_start_time");
      const app_end_time = document.getElementById("app_end_time");
      const app_duration = document.getElementById("app_duration");
      const app_venue = document.getElementById("app_venue");
      const booked_for = document.getElementById("booked_for");

      if (
        validreason.value === "" &&
        date_of_appointment.value === "" &&
        app_start_time.value === "" &&
        app_end_time.value === "" &&
        app_duration.value === "" &&
        app_venue.value === "" &&
        booked_for.value === ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (validreason.value === "") {
        $(".ValidReason").show();

        setTimeout(function() {
          $(".ValidReason").hide();
        }, 3000);
      } else if (date_of_appointment.value === "") {
        $(".AppointmentDate").show();

        setTimeout(function() {
          $(".AppointmentDate").hide();
        }, 3000);
      } else if (app_start_time.value === "") {
        $(".StartTime").show();

        setTimeout(function() {
          $(".StartTime").hide();
        }, 3000);
      } else if (app_end_time.value === "") {
        $(".EndTime").show();

        setTimeout(function() {
          $(".EndTime").hide();
        }, 3000);
      } else if (app_duration.value === "") {
        $(".Duration").show();

        setTimeout(function() {
          $(".Duration").hide();
        }, 3000);
      } else if (app_venue.value === "") {
        $(".Venue").show();

        setTimeout(function() {
          $(".Venue").hide();
        }, 3000);
      } else if (classId === "") {
        checkRadioForUserType();
        $(".BookedFor").show();

        setTimeout(function() {
          $(".BookedFor").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("reason", reason);
        formData.append("date", dateOfAppointment);
        formData.append("duration", duration);
        formData.append("venue", venue);
        formData.append("start_time", startTime);
        formData.append("end_time", endTime);
        formData.append("booking_with", classId);

        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "create_appointement",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: token,
            },
          }
        );

        console.log("Create Appointment", response);

        updateError_message(response.data.message);
        updateReason("");
        updateDateOfAppointment("");
        updateDuration("");
        updateVenue("");
        updateStartTime("");
        updateEndTime("");

        $(".formSuccess").show();

        setTimeout(function() {
          $(".formSuccess").hide();
        }, 5000);

        window.location.href = "/appointmentDetails";
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [previewTeacherName, updatePreviewTeacherName] = useState("");

  const [editErrorMessage, updateEditErrorMessage] = useState("");
  const [editErrorCode, updateEditErrorCode] = useState("");

  async function editAppointment() {
    const formData = new FormData();

    formData.append("reason", reason);
    formData.append("date", dateOfAppointment);
    formData.append("duration", duration);
    formData.append("venue", venue);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("a_id", "");
    formData.append("booking_with", classId);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_appointement",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Edit Appointment", response);
    $(".saveMessage").show();

    setTimeout(function() {
      $(".saveMessage").hide();
    }, 3000);

    if (response.data.error_code === 200) {
      updateEditErrorMessage(response.data.message);
      updateEditErrorCode(response.data.error_code);
      window.location.href = "/appointmentDetails";
    }
  }

  const [studentDetails, updateStudentDetails] = useState([]);
  // const [studentId, updateStudentId] = useState([]);
  // const [studentName, updateStudentName] = useState([]);

  async function getStudentList() {
    updateShowFlag("1");
    console.log("student flag", showFlag);
    try {
      const fetchStudentResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_teacher_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get all student", fetchStudentResponse.data.data);
      if (fetchStudentResponse.data.error_code == 200) {
        updateStudentDetails(fetchStudentResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [teacherDetails, updateTeacherDetails] = useState([]);
  // const [teacherId, updateTeacherId] = useState([]);

  const [showFlag, updateShowFlag] = useState("1");

  console.log("teacherName", teacherName);
  // async function getTeacherList() {
  //   updateShowFlag("2");
  //   console.log("teacher flag", showFlag);

  //   try {

  //     const fetchTeacherResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_teacher_list",
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',
  //           "Authorization": token,
  //         }
  //       }
  //     );

  //     console.log("Get all teacher", fetchTeacherResponse);
  //     updateTeacherDetails(fetchTeacherResponse.data.data);

  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }

  // }

  console.log("print duration", duration);
  todayy = new Date().toISOString().slice(0, 10);

  function getDuration(e) {
    var timefrom = new Date();
    var temp = "";
    temp = $("#app_start_time")
      .val()
      .split(":");
    timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timefrom.setMinutes(parseInt(temp[1]));

    var timeto = new Date();
    temp = $("#app_end_time")
      .val()
      .split(":");
    timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timeto.setMinutes(parseInt(temp[1]));

    if (timeto < timefrom) {
      $(".time_alert").show();
      updateEndTime("");
      updateDuration("");
      setTimeout(() => {
        $(".time_alert").hide();
      }, 3000);

      return;
    } else {
      updateEndTime(e.target.value);
    }

    var endDate = moment(document.getElementById("app_end_time").value, "H:mm");
    var startDate = moment(
      document.getElementById("app_start_time").value,
      "H:mm"
    );
    const hourDiff = moment(endDate).diff(moment(startDate), "hours");
    const getMinutes = hourDiff * 60;
    const minuteDiff =
      moment(endDate).diff(moment(startDate), "minutes") - getMinutes;
    const diff = `${hourDiff} hrs ${minuteDiff} mins `;
    var diff_time = (document.getElementById("app_duration").value = diff);
    console.log("Time difference", diff_time);
    updateDuration(diff_time);
  }

  //   function GetHours(d) {
  //     var h = parseInt(d.split(':')[0]);
  //     if (d.split(':')[1].split(' ')[1] === "PM") {
  //         h = h + 12;
  //     }
  //     return h;
  // }

  // function GetMinutes(d) {
  //   return parseInt(d.split(':')[1].split(' ')[0]);
  // }

  const checkRadioForUserType = () => {
    var user = document.getElementById("bookingFor");
    var radioInput = user.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("SendMsg").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  $(function() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();
    var maxDate = year + "-" + month + "-" + day;
    $("#date_of_appointment").attr("min", maxDate);
  });

  const resetValues = () => {
    var ele = document.getElementsByName("userType");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;

    updateReason("");
    updateDateOfAppointment("");
    updateDuration("");
    updateVenue("");
    updateStartTime("");
    updateEndTime("");
    updateBookingWith("");
    updateClassId("");

    $("#news_category option").prop("selected", function() {
      return this.defaultSelected;
    });
  };

  // function preview()
  //   {
  //       $(".preview_polls").show();
  //   }
  return (
    <div className="content-wrapper">
      <div className=" mt-2 border_class2 box_padding">
        <h1 className="main_heading_h1">CREATE APPOINTMENT</h1>
      </div>

      <div class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <div>
        <div className=" border_class2 box_padding">
          {/*reason  */}
          <div className=" p-0">
            <div class="row">
              <div class="col-md-6">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Reason</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="name"
                    id="validreason"
                    className="all_inputs"
                    placeholder="Enter Your Reason For Appointment..."
                    autoComplete="true"
                    onChange={(e) => updateReason(e.target.value)}
                    value={reason}
                  />
                  <div class="ValidReason" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Reason For Appointment
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div className="left_padding">
                  <div className="d-flex">
                    <label className="all_labels">Date Of Appointment</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="date"
                    min={todayy}
                    onChange={(e) => updateDateOfAppointment(e.target.value)}
                    value={dateOfAppointment}
                    placeholder="Enter Your Reason For Appointment..."
                    className="all_inputs"
                    id="date_of_appointment"
                    name="birthdaytime"
                  />

                  <div
                    class="AppointmentDate"
                    style={{ marginTop: "-6px", display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Select Date
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* start time */}
          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-6">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Start Time</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="time"
                    id="app_start_time"
                    onChange={(e) => updateStartTime(e.target.value)}
                    value={startTime}
                    className="all_inputs"
                    name="birthdaytime"
                  />

                  <div class="StartTime" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Start Time
                    </h4>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div className="left_padding">
                  <div className="d-flex">
                    <label className="all_labels">End Time</label>

                    <p className="all_stars">*</p>
                  </div>
                  <input
                    type="time"
                    id="app_end_time"
                    onChange={getDuration}
                    value={endTime}
                    className="all_inputs"
                    name="birthdaytime"
                  />

                  <div
                    className="time_alert all_validations_h4"
                    style={{ display: "none" }}
                  >
                    End Time should be greater than Start Time
                  </div>

                  <div
                    class="EndTime"
                    style={{ marginTop: "-6px", display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Select End Time
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* duration */}
          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-12d-flex">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Duration</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="name"
                    id="app_duration"
                    className="all_inputs"
                    placeholder="Duration Of Appointment..."
                    autoComplete="true"
                    disabled
                    value={duration}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* venue */}
          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div style={{ width: "100%" }}>
                  <div className="d-flex">
                    <label className="all_labels">Venue</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="name"
                    id="app_venue"
                    className="all_inputs"
                    placeholder="Venue Of Appointment..."
                    autoComplete="true"
                    onChange={(e) => updateVenue(e.target.value)}
                    value={venue}
                  />
                  <div class="Venue" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Venue
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* boked for */}
          <div className="mt-0">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    paddingRight: "0",
                  }}
                  className="row"
                >
                  <div className="d-flex col-md-2" style={{ paddingLeft: "0" }}>
                    <label className="all_labels">Booked With</label>

                    <p className="all_stars">*</p>
                  </div>

                  <div className="mt-0 p-0">
                    <div className="d-flex">
                      {/* student details */}
                      <div style={{ width: "100%" }} className="student_type">
                        <select
                          className="form-select form-select-sm all_inputs"
                          id="news_category"
                          aria-label=".form-select-sm example"
                          onChange={(e) => updateClassId(e.target.value)}
                        >
                          <option selected="selected" value={teacherName}>
                            Select Teacher
                          </option>
                          {studentDetails.length > 0 ? (
                            studentDetails.map((studentItem, index) => {
                              return (
                                <option value={studentItem.teacher_id}>
                                  {studentItem.teacher_name}
                                </option>
                              );
                            })
                          ) : (
                            <div>Data Not Found</div>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div
                    id="SendMsg"
                    class="BookedFor"
                    style={{ display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Select Booked For
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="d-flex border_class2 box_padding buttons_div">
          <div
            class="ValueMsg"
            style={{ margin: "8px", width: "57%", display: "none" }}
          >
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>

          <img  className="delete_img"
            src="dist/img/delete.png"
            alt="dropdown"
            onClick={() => resetValues()}
            
          />
          <p
            className="news_bar">
            |
          </p>
          <button className="preview_button">
              <p className="preview_font">
              Preview
            </p>

            <PreviewForm
              reason={reason}
              dateOfAppointment={dateOfAppointment}
              duration={duration}
              venue={venue}
              startTime={startTime}
              endTime={endTime}
              classId={classId}
              passEditAppointmentData={passEditAppointmentData}
            />
          </button>

          <input
            type="button"
            className="publish_button"
            onClick={() => createAppointment()}
            value="Publish"
           
          />
        </div>
      </div>
    </div>
  );
}
