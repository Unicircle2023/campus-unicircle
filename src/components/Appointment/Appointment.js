import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Previous_next_button from "./Previous_next_button";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import { Link } from "react-router-dom";

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

export function Appointment() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [bookreason, updateBookReason] = useState("");
  const [bookby, updateBookBy] = useState("");
  const [bookbyrole, updateBookByRole] = useState("");
  const [bookwith, updateBookWith] = useState("");
  const [bookdate, updateBookDate] = useState("");
  const [bookstarttime, updateBookStartTime] = useState("");
  const [bookendtime, updateBookEndTime] = useState("");
  const [bookduration, updateBookDuration] = useState("");
  const [bookvenue, updateBookVenue] = useState("");
  const [bookstatus, updateBookStatus] = useState("");
  const [appointmentId, updateAppointmentId] = useState("");
  const [reason, updateReason] = useState("");
  const [dateOfAppointment, updateDateOfAppointment] = useState("");
  const [startTime, updateStartTime] = useState("");
  const [endTime, updateEndTime] = useState("");
  const [duration, updateDuration] = useState("");
  const [venue, updateVenue] = useState("");
  const [teacherId, updateTeacherId] = useState("");
  const [teacherName, updateTeacherName] = useState("");
  const [editErrorMessage, updateEditErrorMessage] = useState("");
  const [previewTeacherName, updatePreviewTeacherName] = useState("");
  const [editErrorCode, updateEditErrorCode] = useState("");

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };

  const [state, setState] = useState(true);
  const [counter, setCounter] = useState(0);

  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (appointment_id) => {
    setChildNewsData(appointment_id);
    edit_category(appointment_id);
  };

  const passDeleteData = (appointment_id) => {
    setChildNewsData(appointment_id);
    delete_category(appointment_id);
  };

  function edit_category(appointment_id) {
    $(".preview_polls").hide();
    editNews(appointment_id);
  }

  function delete_category() {
    console.log("delete container");
    $(".preview_polls").hide();
    $(".delete_preview_polls").show();
  }
  $(document).ready(function() {
    const num = "0 hrs 0 mins";
    document.getElementById("app_duration").value = num;

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
    document.getElementById("app_duration").value = diff;

    updateDuration(diff);
  });

  const [studentDetails, updateStudentDetails] = useState([]);
  const [studentId, updateStudentId] = useState([]);
  const [studentName, updateStudentName] = useState([]);

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

  function Compare() {
    if (startTime > endTime) {
      alert("End Time should be greater than start time");
    }
  }

  // function getDuration(e) {
  //   Compare();

  //     updateBookEndTime(e.target.value)
  //   var endDate = moment(document.getElementById("app_end_time").value, "H:mm");
  //   var startDate = moment(document.getElementById("app_start_time").value, "H:mm");

  //   const hourDiff = moment(endDate).diff(moment(startDate), 'hours')

  //   const getMinutes = hourDiff * 60;

  //   const minuteDiff = moment(endDate).diff(moment(startDate), 'minutes') - getMinutes;

  //   const diff = `${hourDiff} hrs ${minuteDiff} mins `;
  //   document.getElementById("app_duration").value = diff;

  //   updateDuration(diff);

  // }

  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }

  $(".close_event").click(function() {
    $(".preview_category").hide();
  });

  async function deletePreviewWithPassword() {
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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deletePreviewAppointmentApi();
    }
  }

  async function deletePreviewAppointmentApi() {
    $(".delete_preview_polls").hide();
    try {
      const formData = new FormData();

      formData.append("a_id", childNewsData);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_appointements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Appointment", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  function viewDescription() {
    $(".preview_polls").show();
  }
  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  const [teacherDetails, updateTeacherDetails] = useState([]);
  const [showFlag, updateShowFlag] = useState("1");

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

  async function fetchList() {
    try {
      const formData = new FormData();

      formData.append("sort_flag", counter);
      const fetchAppointmentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "get_appointements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      console.log(
        "Get appointment Details",
        fetchAppointmentResponse.data.data
      );
      if (fetchAppointmentResponse.data.error_code == 200) {
        setData(fetchAppointmentResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    getUserDetails();
    fetchList();
    getStudentList();
  }, []);

  // async function editAppointment() {
  //   const formData = new FormData();

  //   formData.append("reason", bookreason);
  //   formData.append("date", bookdate);
  //   formData.append("duration", bookduration);
  //   formData.append("venue", bookvenue);
  //   formData.append("start_time", bookstarttime);
  //   formData.append("end_time", bookendtime);
  //   formData.append("a_id", getAppointmentID);

  //   const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_edit_appointement",
  //     formData,
  //     {
  //       headers:
  //       {
  //         "Content-Type": 'multipart/form-data',

  //         "Authorization": token,
  //       }
  //     });

  //   console.log("Edit Appointment", response);
  //   $(".saveMessage").show();

  //   setTimeout(function () {
  //     $(".saveMessage").hide();
  //   }, 3000);

  //   if (response.data.error_code == 200) {
  //     updateEditErrorMessage(response.data.message)
  //     updateEditErrorCode(response.data.error_code)
  //     setTimeout(() => {
  //       $(".required_filed").show();
  //     }, 1000);
  //     window.location.href = "/appointmentDetails"
  //   }
  //   //window.location.href = "/appointmentDetails"
  // }

  const columns = [
    {
      name: "Appointment Date",
      wrap: true,
      width: "auto",
      cell: (row) => {
        console.log("ROW DATA", row);
        // const appDate = moment(row.date).format("DD MMM, YYYY")
        const appDate = moment(row.date).format("YYYY-MM-DD");
        return (
          <div onClick={() => viewDescription(row.appointment_id)}>
            {appDate}
          </div>
        );
      },
    },
    {
      name: "Booked By",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div onClick={() => viewDescription(row.appointment_id)}>
            {row.booked_by}
          </div>
        );
      },
    },
    {
      name: "Booked With",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div onClick={() => viewDescription(row.appointment_id)}>
            {row.booked_with}
          </div>
        );
      },
    },
    {
      name: "Duration",
      selector: "publish_date",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div onClick={() => viewDescription(row.appointment_id)}>
            {row.duration}
          </div>
        );
      },
    },

    {
      name: "Status",
      wrap: true,
      width: "auto",
      width: "auto",
      cell: (row) => {
        console.log("ROW", row.send_to);
        return (
          <div onClick={() => viewDescription(row.appointment_id)}>
            {row.status == "Cancelled" ? (
              <button
                type="button"
                className="status_button"
                style={{ background: "red" }}
              >
                <div className="status_text">{row.status}</div>
              </button>
            ) : row.status == "Ongoing" ? (
              <button
                type="button"
                className="status_button"
                style={{ background: "#1F3977" }}
              >
                <div className="status_text">{row.status}</div>
              </button>
            ) : row.status == "Sheduled" ? (
              <button
                type="button"
                className="status_button"
                style={{ background: "skyblue", color: "black" }}
              >
                <div className="status_text">{row.status}</div>
              </button>
            ) : row.status == "Completed" ? (
              <button
                type="button"
                className="status_button"
                style={{ background: "green" }}
              >
                <div className="status_text">{row.status}</div>
              </button>
            ) : (
              <div style={{ marginLeft: "35px" }}>-</div>
            )}
          </div>
        );
      },
    },

    {
      name: "Action",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div className="d-flex">
            <a
              className="cta"
              href="#edit"
              onClick={() => editNews(row.appointment_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={require("../images/Pencil.png")}
                alt="edit"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </a>

            <a
              className="cta"
              href="#delete"
              onClick={() => deleteNews(row.appointment_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                style={{ width: "20px", height: "20px", marginLeft: "2px" }}
                src={require("../images/delete.png")}
              />
              &nbsp;
            </a>
          </div>
        );
      },
    },
  ];

  // delete news

  const [getAppointmentID, updateGetAppointmentID] = useState("");
  console.log("Appointment Id", getAppointmentID);

  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");

  function deleteNews(a_id) {
    updateGetAppointmentID(a_id);

    $(".delete_container").show();
  }

  // async function deleteMessage() {
  //   $(".delete_container").hide();
  //   try {

  //     const formData = new FormData();

  //     formData.append("a_id", getAppointmentID);

  //     const deleteResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_delete_appointements",
  //       formData,
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',

  //           "Authorization": token,
  //         }
  //       });

  //     console.log("Delete Appointment", deleteResponse);
  //     // updatedeleteErrorMessage(deleteResponse.data.message)
  //     if (deleteResponse.data.error_code == 200) {

  //       handleButton();

  //     }

  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }

  // }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  async function editNews(appointment_id) {
    $(".edit_container").show();

    const formData = new FormData();
    formData.append("a_id", appointment_id);

    const editAppointmentResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_appointment",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("GET SINGLE APPOINTMENT", editAppointmentResponse.data.data);
    if (editAppointmentResponse.data.error_code == 200) {
      editAppointmentResponse.data.data.map((item) => {
        updateAppointmentId(item.appointment_id);
        updateReason(item.reason);
        console.log("date of appointment", item.date);
        const appointmentDate = moment(item.date).format("YYYY-MM-DD");
        console.log("date of appointment", appointmentDate);
        updateDateOfAppointment(appointmentDate);
        updateStartTime(item.start_time);
        updateEndTime(item.end_time);
        updateDuration(item.duration);
        updateVenue(item.venue);
        updateTeacherId(item.teacher_id);
        updateTeacherName(item.booked_with);
      });
    }
  }

  const handleButton = () => {
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Appointment Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/appointmentDetails";
    });
  };

  const handleEditButton = () => {
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Appointment Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/appointmentDetails";
    });
  };

  $(function() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;

    $("#appointment_date").attr("min", maxDate);
  });

  // function all_student() {
  //   $(".user_type").hide();
  // }
  const [userType, updateUserType] = useState([]);
  // async function specific_class() {
  //   $(".user_type").show();
  //   try {

  //     const fetchClassResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_classes_list",
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',
  //           "Authorization": token,
  //         }
  //       }
  //     );

  //     console.log("Get class List Details", fetchClassResponse.data.data);
  //     updateUserType(fetchClassResponse.data.data);

  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }
  // }

  // function closeRecipient() {

  //   $(".user_type").hide();
  // }

  async function deleteNewsApi() {
    try {
      const formData = new FormData();

      formData.append("a_id", getAppointmentID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_appointements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Appointment", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
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

    console.log("Get campus info............>>", fetchResponse.data.data);
    if (fetchResponse.data.error_code == 200) {
      fetchResponse.data.data.map((fetchItem) => {
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deleteNewsApi();
    }
  }
  async function updateForm() {
    const formData = new FormData();

    formData.append("a_id", appointmentId);
    formData.append("reason", reason);
    formData.append("date", dateOfAppointment);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("duration", duration);
    formData.append("venue", venue);
    formData.append("booking_with", teacherId);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_appointement",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("Update Appointment", eventResponse);

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
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  console.log("filterText", filterText);
  const filteredItems = data.filter(
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

  function close_edit_modal() {
    $(".edit_container").hide();
  }

  function update_edited_Event() {
    $(".edit_popup_password").show();
  }

  function closePreviewDescription() {
    $(".preview_polls").hide();
  }
  function cancel_delete_poll() {
    $(".delete_preview_polls").hide();
    $(".preview_polls").show();
  }
  return (
    <div className="content-wrapper">
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label className="main_labels">Edit Appointment</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div
              style={{
                marginTop: "5px",
              }}
            >
              {/*reason  */}
              <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Reason
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="name"
                        id="validreason"
                        className="input_fields all_edit_inputs"
                        autoComplete="true"
                        onChange={(e) => updateReason(e.target.value)}
                        value={reason}
                        
                      />
                      <div
                        class="ValidReason"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Reason For Appointment
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* appointment date */}
              <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Date
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="date"
                        onChange={(e) =>
                          updateDateOfAppointment(e.target.value)
                        }
                        value={dateOfAppointment}
                        placeholder="Enter Your Reason For Appointment..."
                        className="input_fields all_edit_inputs"
                        id="appointment_date"
                        name="birthdaytime"
                        
                      />

                      <div
                        class="AppointmentDate"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Date
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* start time */}
              <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-6">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Start Time
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="time"
                        id="app_start_time"
                        onChange={(e) => updateStartTime(e.target.value)}
                        value={startTime}
                        className="input_fields all_edit_inputs"
                        name="birthdaytime"
                        
                      />

                      <div
                        class="StartTime"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "11PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Start Time
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="edit_left_padding">
                      <div className="d-flex">
                        <label className="all_labels">
                          End Time
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                      <input
                        type="time"
                        id="app_end_time"
                        onChange={(e) => updateEndTime(e.target.value)}
                        value={endTime}
                        className="input_fields all_edit_inputs"
                        name="birthdaytime"
                        
                      />

                      <div
                        class="EndTime"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
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

              {/* duration & venue */}
              <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  {/* duration */}
                  <div class="col-md-6">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Duration
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="name"
                        id="app_duration"
                        className="input_fields all_edit_inputs"
                        autoComplete="true"
                        disabled
                        value={duration}
                        
                      />
                    </div>
                  </div>
                  {/* venue */}
                  <div  class="col-md-6">
                    <div className="edit_left_padding">
                      <div className="d-flex">
                        <label className="all_labels">
                          Venue
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="name"
                        id="app_venue"
                        className="input_fields all_edit_inputs"
                        // placeholder="Venue Of Appointment..."
                        autoComplete="true"
                        onChange={(e) => updateVenue(e.target.value)}
                        value={venue}
                        
                      />
                      <div
                        class="Venue"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Venue
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* booked with */}
              <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  {/* boked for */}
                  <div className="mt-0 p-0">
                    <div class="row">
                      <div class="col-md-12 d-flex">
                        <div
                          style={{ width: "100%", paddingRight: "0" }}
                          className="row"
                        >
                          <div className="d-flex " style={{ paddingLeft: "0" }}>
                            <label className="all_labels">
                              Booked With
                            </label>

                            <p className="all_stars">
                              *
                            </p>
                          </div>
                          <select
                            className="form-select form-select-sm all_edit_inputs"
                            aria-label=".form-select-sm example"
                            
                            onChange={(e) => updateTeacherId(e.target.value)}
                          >
                            <option selected="selected" value={teacherName}>
                              {teacherName}
                            </option>
                            {studentDetails.length > 0 ? (
                              studentDetails.map((studentItem, index) => {
                                console.log("Id", studentItem.teacher_id);
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

                          <div
                            id="SendMsg"
                            class="BookedFor"
                            style={{ marginTop: "-6px", display: "none" }}
                          >
                            <h4
                              class="login-text"
                              style={{
                                color: "red",
                                fontSize: "12PX",
                                marginLeft: "0",
                              }}
                            >
                              Please Select Booked For
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-3 edit_buttons_div border_class2">
                <a
                  onClick={() => close_edit_modal()}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className="edit_cancel_button"
                    value="Cancel"
                  />
                </a>

                <a
                  className="cta"
                  href="#edit_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edited_Event()}
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
          </div>
          {/* </form> */}
        </div>
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
              Edit Appointment
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
        </div>
      </div>

      <div id="delete" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message?
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure, You Want To Delete This Appointment?
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
                  className="cta"
                  href="#delete_with_protection"
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
        id="delete_with_protection"
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
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Appointment
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
        </div>
      </div>

      <div
        className="show_delete_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Appointment Deleted Successfully!!
        </p>
      </div>

      <div
        className="show_edit_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Appointment Updated Successfully!!
        </p>
      </div>

      <div className="row border_class2 search_box_padding" >
        <div
          className="col-md-4 d-flex flex-row"
          style={{alignItems:"center" }}
        >
          <h4 className="main_heading_h1">
            Appointments
          </h4>
        </div>

        <div
          className="col-md-4 d-flex flex-row">
             <div className="search_box_div">

          <img  className="search_box_img"
            src={require("../images/Search.png")}
            
          />
          <Input className="search_box"
            id="search"
            type="text"
            placeholder="Search by Date"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            
          />
        </div>
        </div>
        {/* 
        <div className="col-md-1 d-flex flex-row">
          <img src="dist/img/Sorting.png" onClick={fetchList} style={{ height: "28px", width: "28px", marginTop: "3px" }} />

        </div> */}
        <div
          className="col-md-4 d-flex flex-row"
          style={{ justifyContent: "center" }}
        >
          <div style={{ marginTop: "0px", padding: "0" }}>
            <Link to="/createAppoinment">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
                
                >
                <div className="create_button_inner">
                  Create Appointment
                </div>
                <img className="create_button_img"
                    src="dist/img/Progress.png"
                    
                  />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="border_class"
        style={{ background: "#ffffff", paddingTop: "10px" }}
      >
        <DataTable
          style={{ border: "1px solid green" }}
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
        />
      </div>

      {/**********************************************8PREVIEW********************************************8*/}
      <div
        className="preview_polls"
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
            top: "0",
            right: "5px",
            width: "420px",
            height: "100%",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Appointment
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closePreviewDescription()}
              style={{
                cursor: "pointer",
                width: "20px",
                height: "20px",
                marginLeft: "auto",
              }}
            />
          </div>

          <div
            style={{
              background: "white",
              marginTop: "10PX",
              padding: "5px 10PX",
              border: "0.4px solid #C4C4C4",
              height: "100%",
            }}
          >
            {data.length != "" ? (
              <Previous_next_button
                data={data}
                passEditData={passEditData}
                passDeleteData={passDeleteData}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* ****************************delete preview appointment**************************************** */}
      <div
        className="delete_preview_polls"
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
            background: "#f2f2f2",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "relative",
            width: "420px",
            height: "auto",

            margin: "100px auto",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex">
            <img
              src="dist/img/Cancel.png"
              onClick={() => cancel_delete_poll()}
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="mt-3">
            <p style={{ fontWeight: "600", color: "black", fontSize: "13px" }}>
              Delete message?
            </p>
            <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
              Are You Sure You Want To Delete This Appointment?
            </h2>

            <div className="d-flex mt-3">
              <input
                type="button"
                className="create_btn"
                value="Cancel"
                onClick={() => cancel_delete_poll()}
                style={{
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  marginLeft: "auto",
                  color: "#d21f3c",
                }}
              />

              <a
                className="cta"
                href="#deletePreview_with_password"
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
      </div>

      {/* delete popuop with password */}
      <div
        id="deletePreview_with_password"
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
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Appointment
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
                onClick={() => deletePreviewWithPassword()}
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
        </div>
      </div>
    </div>
  );
}
