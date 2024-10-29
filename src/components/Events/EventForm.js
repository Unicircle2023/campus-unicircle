import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { ExportToExcel } from "./ExportToExcel";
import { NewClassRecipient } from "./NewClassRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import { NewRecipient } from "./NewRecipient";
import SummerNote from "../SummerNote/SummerNote";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { NewRecipients } from "../Specific Students/NewRecipients";
import { NewPersonaRecipients } from "../Specific Students/NewPersonaRecipients";
import { NewClassRecipients } from "../Specific Students/NewClassRecipients";
import { auto } from "@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core";
import addedImage from '../../Images/added_image.png';

export function EventForm() {
  var todayy = "";

  $(".close_event").click(function () {
    $(".user_type").hide();
  });
  function preview() {
    $(".preview_polls").show();
  }

  $(".close_event").click(function () {
    $(".preview_polls").hide();
    summernoteCssFunc();
  });

  $(".close_event").click(function () {
    $(".preview_category").hide();
    summernoteCssFunc();
  });

  function event_image() {
    $(".event_image").hide();
  }
  function cancelEdit() {
    $(".preview_category").hide();
    summernoteCssFunc();
  }

  // $(document).ready(function() {
  //   $("#event_name").keypress(function(e) {
  //     var key = e.keyCode;
  //     if (key >= 48 && key <= 57) {
  //       e.preventDefault();
  //     }
  //   });
  // });

  const [editEventName, updateEditEventName] = useState("");
  const [editEventDescription, updateEditEventDescription] = useState("");
  const [editEventVenue, updateEditEventVenue] = useState("");
  const [editEventDate, updateEditEventDate] = useState("");
  const [editEventStartTime, updateEditEventStartTime] = useState("");
  const [editEventEndTime, updateEditEventEndTime] = useState("");
  const [editEventEntryFee, updateEditEventEntryFee] = useState("");
  const [editTicketCapacity, updateEditTicketCapacity] = useState("");
  const [editTicketURL, updateEditTicketURL] = useState("");
  const [EditEventPhoto, updateEditEventPhoto] = useState("");
  const [editEventUserType, updateEditEventUserType] = useState("");
  // const editFocusRef = useRef(null);
  const history = useHistory();

  function edit_category() {
    summernoteCssEditFunc();
    $(".preview_polls").hide();
    $(".preview_category").show();
    updateEditEventName(eventName);
    updateEditEventDescription(description);
    updateEditEventVenue(venue);
    updateEditEventDate(eventDate);
    updateEditEventStartTime(startTime);
    updateEditEventEndTime(endTime);
    updateEditEventEntryFee(entryFee);
    updateEditTicketCapacity(ticketCapacity);
    updateEditTicketURL(ticketUrl);
    updateEditEventPhoto(eventPhoto);
    updateEditEventUserType(sendNotificationTo);
    // editFocusRef.current.focus();
  }

  const resetValues = () => {
    var ele = document.getElementsByName("eventUserType");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;

    updateEventName("");
    updateDescription("");
    updateEventPhoto("");
    updateVenue("");
    updateEventDate("");
    updateStartTime("");
    updateEndTime("");
    updateEntryFee("");
    // setPicture("")
    updateTicketCapacity("");
    updateTicketUrl("");
    setImgData([]);

    $(".event_form_image").hide();
    $(".event_image").show();
    $(".event_selected_img").hide();
    $(".default_image").show();
    summernoteCssFunc();
  };

  todayy = new Date().toISOString().slice(0, 10);
  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);

    setChildData(data);
    if (data != "") {
      setTimeout(() => {
        $(".user_type").hide();
      }, 2000);
    }
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);

    setTimeout(() => {
      $(".user_type").hide();
    }, 2000);
  };

  const fileName = "uploadStudent";

  var studentList = [
    {
      "First Name": "",
      "Last Name": "",
      "Preferred Name": "",
      "Father Name": "",
      dob: "",
      "Mother Name": "",
      Gender: "",
      Country: "",
      Mobile: "",
      password: "",
      "First Language": "",
      Class: "",
      Department: "",
      "First Nationality": "",
      "Second Nationality": "",
      Email: "",
      "Spoken Language": "",
      Race: "",
      persona: "",
    },
  ];
  async function saveEvent() {
    // $(".saveMessage").show();
    $(".preview_category").hide();
    summernoteCssFunc();
  }
  const student_name = childData.join(", ");
  const [data, setData] = useState([]);
  const [excel, setExcel] = useState([]);
  const [excelError_code, updateExcelError_code] = useState("");
  const [excelError_message, updateExcelError_message] = useState("");
  async function uploadExcel() {
    try {
      const formData = new FormData();

      formData.append("uploadFile", excel);

      const excelResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_upload_excel_file_student",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      // if(excelResponse.data.error_code == 200)
      // {
      // setData(excelResponse.data.data)
      // setTimeout(() => {
      //   $(".user_type").hide();
      // }, 3000);
      // }
      updateExcelError_code(excelResponse.data.error_code);
      updateExcelError_message(excelResponse.data.message);

      $(".excel_message").show();
      setTimeout(() => {
        $(".excel_message").hide();
      }, 3000);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [addPersona, updatePersona] = useState([]);
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const [errorCodePersona, updateErrorCodePersona] = useState("");

  async function createPersona() {
    const formData = new FormData();
    formData.append("persona", addPersona);
    const personaResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "add_persona",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (personaResponse.data.error_code == 200) {
      updatePersona("");
    }
    updateErrorCodePersona(personaResponse.data.error_code);

    updateErrorMessagePersona(personaResponse.data.message);

    $(".personaMsg").show();

    setTimeout(function () {
      $(".personaMsg").hide();
    }, 3000);
  }
  const token = localStorage.getItem("Token");
  const [eventName, updateEventName] = useState("");
  const [description, updateDescription] = useState("");
  const [eventPhoto, updateEventPhoto] = useState("");
  const [venue, updateVenue] = useState("");
  const [eventDate, updateEventDate] = useState("");
  const [startTime, updateStartTime] = useState("");
  const [endTime, updateEndTime] = useState("");
  const [entryFee, updateEntryFee] = useState("");
  const [ticketCapacity, updateTicketCapacity] = useState("");
  const [ticketUrl, updateTicketUrl] = useState("");
  const [sendNotificationTo, updatesendNotificationTo] = useState("");
  const [userType, updateUserType] = useState([]);
  const [error_message, updateError_message] = useState("");
  const [eventId, updateEventId] = useState("");
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const [minTime, setMinTime] = useState("");
  const [isStartTimeDisabled, setIsStartTimeDisabled] = useState(true);
  const [isEndTimeDisabled, setIsEndTimeDisabled] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);

  const [today, setToday] = useState(new Date());

  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 0;
    const endTime = 24;

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const timeSlot = "";
        if (formattedHour == "00" && formattedMinute == "00") {
          timeSlot = `${"24"}:${formattedMinute}`;
        } else {
          timeSlot = `${formattedHour}:${formattedMinute}`;
        }

        slots.push(timeSlot);
      }
    }
    return slots;
  };

  const handleDateChange = (value) => {
    updateEventDate(value);
    updateEndTime("");
    updateStartTime("");
    setIsStartTimeDisabled(false);
    setIsEndTimeDisabled(true);
  };

  const handleStartTimeChange = (e) => {
    const selectedDate = new Date(eventDate);
    const isToday = isSameDate(selectedDate, today);

    updateStartTime(e.target.value);

    if (isToday) {
      const currentTime = today.getHours() * 100 + today.getMinutes();
      const selectedTime = parseInt(e.target.value.replace(":", ""), 10);
      if (selectedTime < currentTime) {
        toast.error("Selected time is earlier than the current time");
      }
    }

    updateEndTime("");
    setIsEndTimeDisabled(false);
  };
  const handleEndTimeChange = (e) => {
    updateEndTime(e.target.value);
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  async function fetchSingleEvent(id) {
    try {
      const formData = new FormData();
      formData.append("e_id", id);

      const fetchEventResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      const EventErrorCode = fetchEventResponse.data.error_code;

      if (EventErrorCode == 200) {
        const eventListArray = fetchEventResponse.data.data;
        setEventData(eventListArray);
      } else {
        setEventData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const summernoteCssEditFunc = () => {
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height", "180px");
  };


  const summernoteCssFunc = () => {
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height", "113px");
  };

  useEffect(() => {
    fetchSingleEvent();
    summernoteCssFunc();
    // editFocusRef.current.focus();

    const currentTime = new Date();
    const hours = currentTime
      .getHours()
      .toString()
      .padStart(2, "0");
    const minutes = currentTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const formattedCurrentTime = `${hours}:${minutes}`;
    setMinTime(formattedCurrentTime);

    setTimeSlots(generateTimeSlots());
  }, []);

  // $(".note-editable").on("keypress", function(e) {
  //   updateJobDescription_text(e.target.innerText);
  //   updateDescription(e.target.innerHTML);
  // });

  const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_KEY,
    withCredentials: true,
  });

  async function createEvent() {
    try {
      const event_name = document.getElementById("event_name");
      const event_venue = document.getElementById("event_venue");
      const event_date = document.getElementById("event_date");
      // const time_start = document.getElementById("time_start");
      // const time_end = document.getElementById("time_end");

      if (
        event_name.value == "" &&
        description == "" &&
        event_venue.value == "" &&
        event_date.value == "" &&
        startTime == "" &&
        endTime == "" &&
        sendNotificationTo == ""
      ) {
        toast.error("You must fill all the fields");
        return;
      } else if (event_name.value == "") {
        $(".EventName").show();

        setTimeout(function () {
          $(".EventName").hide();
        }, 3000);
      } else if (description == "") {
        $(".Description").show();

        setTimeout(function () {
          $(".Description").hide();
        }, 3000);
      } else if (event_venue.value == "") {
        $(".EventVenue").show();

        setTimeout(function () {
          $(".EventVenue").hide();
        }, 3000);
      } else if (event_date.value == "") {
        $(".EventDate").show();

        setTimeout(function () {
          $(".EventDate").hide();
        }, 3000);
      } else if (startTime == "") {
        $(".StartTime").show();

        setTimeout(function () {
          $(".StartTime").hide();
        }, 3000);
      } else if (endTime == "") {
        $(".EndTime").show();

        setTimeout(function () {
          $(".EndTime").hide();
        }, 3000);
      } else if (sendNotificationTo == "") {
        checkRadioForUserType();
        $(".SendToAll").show();

        setTimeout(function () {
          $(".SendToAll").hide();
        }, 3000);
      } else if (picture == null) {
        $(".EventImage").show();

        setTimeout(function () {
          $(".EventImage").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("title", eventName);
        formData.append("location", venue);
        formData.append("start_date", eventDate);
        formData.append("end_date", eventDate);
        formData.append("description", description);

        for (var i = 0; i < picture.length; i++) {
          formData.append("File[]", picture[i]);
        }

        formData.append("start_time", startTime);
        formData.append("end_time", endTime);
        formData.append("type", sendNotificationTo);
        formData.append("users", childId);
        formData.append("fee", entryFee);
        formData.append("capacity", ticketCapacity);
        formData.append("url", ticketUrl);
        for (const pair of formData.entries()) {
          console.log(`form data-----${pair[0]}, ${pair[1]}`);
        }
        const eventResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_add_event",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        console.log("Create Event--------------", eventResponse);
        $(".multipleImages").hide();
        setIsLoading(false);

        updateError_message(eventResponse.data.message);
        let e_msg = eventResponse.data.message;

        if (eventResponse.data.error_code == 200) {
          toast.success(e_msg);

          updateEventName("");
          updateVenue("");
          updateEventDate("");
          updateDescription("");
          // setPicture("")
          updateStartTime("");
          updateEndTime("");
          updatesendNotificationTo("");
          setChildId("");
          updateEntryFee("");
          updateTicketCapacity("");
          updateTicketUrl("");

          setTimeout(function () {
            history.push("/event");
          }, 3000);
        } else {
          toast.error(e_msg);
        }
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }
  function all_student() {
    $(".user_type").hide();
  }
  async function specific_class() {
    $(".user_type").show();
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_classes_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (fetchClassResponse.data.error_code == 200) {
        updateUserType(fetchClassResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState([]);
  console.log("imgData>>>>> ", imgData)

  var eventImage = [];

  const getImage = (e) => {
    const files = e.target.files;
    console.log("files", files);
    if (files.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }
    $(".event_image").hide();
    $(".default_image").hide();

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        eventImage.push(e.target.files[i]);
        setPicture(eventImage);
      }
      const newFiles = Array.from(e.target.files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImgData([]);

      console.log("newURL--", e);
      setImgData(newUrls);
    }
  };

  // function hide_date() {
  //   $(".show_date").hide();
  // }
  // function show_date() {
  //   $(".show_date").show();
  // }

  const checkRadioForUserType = () => {
    var user = document.getElementById("sendNotification");
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

  $("#time_end").change(function () {
    var startDate = document.getElementById("time_start").value;
    var endDate = document.getElementById("time_end").value;

    if (startDate >= endDate) {
      $(".time_alert").show();

      const endTime = document.getElementById("time_end");
      endTime.value = "";
      setTimeout(() => {
        $(".time_alert").hide();
      }, 2000);
    } else {
      $(".time_alert").hide();
    }
  });

  const handelSummenrnote = (e) => {
    updateDescription(e);
  };

  console.log("imgData:---", imgData);

  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-2 border_class2 box_padding">
        <h1 className="main_heading_h1">CREATE CAMPUS EVENT</h1>
      </div>

      <div class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="border_class2 box_padding ">
            <div class="row">
              <div class="col-md-6">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Event Name</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    className="all_inputs"
                    type="text"
                    id="event_name"
                    value={eventName}
                    onChange={(e) => updateEventName(e.target.value)}
                    placeholder="Event title goes here..."
                    autoComplete="off"
                  />

                  <div class="EventName" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Event Name
                    </h4>
                  </div>

                  <div className="d-flex mt-3">
                    <label className="all_labels">Enter Description</label>

                    <p className="all_stars">*</p>
                  </div>

                  <SummerNote
                    _onChange={handelSummenrnote}
                    value={description}
                    placeholder="Enter Your Message here.."
                    height="300px"
                  />
                  <div class="Description" style={{ display: "none" }}>
                    <h4 className="all_validations_h4">
                      Please Enter Description
                    </h4>
                  </div>

                  <div className="d-flex pt-3">
                    <label className="all_labels">Venue</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    className="all_inputs"
                    type="name"
                    id="event_venue"
                    value={venue}
                    onChange={(e) => updateVenue(e.target.value)}
                    placeholder="Event address goes here..."
                    autoComplete="off"
                  />
                  <div class="EventVenue" style={{ display: "none" }}>
                    <h4 className="all_validations_h4">
                      Please Enter Event Venue
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">Add Event Photo</label>

                    <p className="all_stars">*</p>
                  </div>

                  <label for="file-ip-1" class="file-ip-1 x">
                    <div
                    //  style={{
                    //   border: '2px solid #ccc',   // Border around the image container
                    //   width: '45vh',              // Set the width according to the image size
                    //   height: '25vh',             // Set the height
                    //   padding: '5px',
                    //   display: 'flex',            // Flexbox to center the content
                    //   justifyContent: 'center',   // Horizontal centering
                    //   alignItems: 'center',       // Vertical centering
                    //   textAlign: 'center',
                    //   backgroundColor: '#f9f9f9', // Light background for placeholder
                    // }}
                    >
                      <img
                        class="default_image "
                        style={{
                          height: "23vh",
                          width: "20vw",
                          border: '2px solid #ccc',
                        }}
                        // src="dist/img/event_photo.png"
                        src="dist/img/added_image.jpg"
                        // src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"  // Placeholder image icon

                        id="comp_logo"
                      />
                      {/* <img
                        src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"  // Placeholder image icon
                        alt="Image Placeholder Icon"
                        style={{
                          width: '40px',            // Size of the image icon
                          height: '40px',
                        }}
                      /> */}
                    </div>
                    <div style={{
                      marginTop: '10px',
                      fontSize: '12px',
                      color: '#555',
                      marginLeft: "0vw"
                    }}>
                      <p>Recommended image size: 300x200 pixels </p>
                      {/* (aspect ratio: 3:2) */}
                    </div>
                    <div className="d-flex">
                      {imgData.length > 0 ? (
                        <>
                          {imgData.map((item, index) => (
                            <div key={index} style={{ margin: "2px" }}>
                              <img
                                className="image_std preview_form_event_imgs"
                                src={item}
                                alt={`Image ${index}`}
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    {/* <div className="d-flex">
                      {imgData.length > 0 ? (
                        imgData.map((item, index) => (
                          <div key={index} style={{ margin: "2px" }}>
                            <img
                              className="image_std preview_form_event_imgs"
                              src={item}
                            />
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div> */}

                    {/* <img
                      id="file-ip-1-preview"
                      className="event_selected_img"
                      style={{
                        display: "none",
                        width: "100%",
                        height: "165px",
                      }}
                    /> */}
                  </label>
                  {/* <div style={{ margin: "5px 0", padding: "5px" }}>
                            <p
                              style={{
                                color: "#1F3977",
                                fontSize: "10px",
                              }}
                            >
                              Photo Size: {imgData.length}
                            </p>
                          </div> */}

                  <input
                    type="file"
                    name="photo"
                    style={{ visibility: "hidden", display: "none" }}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={getImage}
                    multiple
                    id="file-ip-1"
                  />

                  <div class="EventImage" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Event Image
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border_class2 box_padding">
            <div class="row">
              <div class="col-md-3">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Event Date</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    className="all_inputs"
                    type="date"
                    min={todayy}
                    placeholder="Select date"
                    id="event_date"
                    value={eventDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    name="birthdaytime"
                    style={{ cursor: "pointer" }}
                  />
                  <div class="EventDate" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Event Date
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">Start Time</label>

                    <p className="all_stars">*</p>
                  </div>

                  <div>
                    <select
                      className="all_inputs select_border_class"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      disabled={isStartTimeDisabled}
                    >
                      <option value="">Select start time</option>
                      {timeSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          className="select_options_class"
                          disabled={
                            eventDate &&
                            isSameDate(new Date(eventDate), today) &&
                            parseInt(slot.replace(":", ""), 10) <
                            today.getHours() * 100 + today.getMinutes()
                          }
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            cursor: "pointer",
                            border: "1px solid red",
                          }}
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="StartTime" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Start Time
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">End Time</label>

                    <p className="all_stars">*</p>
                  </div>

                  <div>
                    <select
                      className="all_inputs "
                      value={endTime}
                      onChange={handleEndTimeChange}
                      disabled={isEndTimeDisabled}
                    >
                      <option value="">Select end time</option>
                      {timeSlots.map((slot) => (
                        <option
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            cursor: "pointer",
                          }}
                          className="select_options_class"
                          key={slot}
                          value={slot}
                          disabled={
                            startTime == "24:00" ? "" : slot <= startTime
                          }
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <input className="all_inputs"
                    type="time"
                    id="time_end"
                    value={endTime}
                    onChange={(e) => updateEndTime(e.target.value)}
                    placeholder="hh:mm"
                  /> */}
                  <div
                    style={{ display: "none" }}
                    className="time_alert all_validations_h4"
                  >
                    End Time should be greater than Start Time
                  </div>
                  <div class="EndTime" style={{ display: "none" }}>
                    <h4 className="all_validations_h4">
                      Please Enter End Time
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" p-0 border_class2 box_padding">
            <div class="row">
              <div class="col-md-3">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Entry Fee</label>
                  </div>

                  <input
                    className="all_inputs"
                    type="text"
                    id="new_title"
                    value={entryFee}
                    onChange={(e) => updateEntryFee(e.target.value)}
                    placeholder="&#x20B9;"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div class="col-md-3">
                <div className="">
                  <div className="d-flex">
                    <div className="d-flex">
                      <label className="all_labels">Event Capacity</label>
                    </div>
                  </div>
                  <input
                    className="all_inputs"
                    type="number"
                    min="0"
                    id="ticket_capacity"
                    value={ticketCapacity}
                    onChange={(e) => updateTicketCapacity(e.target.value)}
                    placeholder="Event capacity goes here.."
                    autoComplete="off"
                  />
                  <div class="TicketCapacity" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter ticket Capacity
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">Ticket URL</label>
                  </div>

                  <input
                    className="all_inputs"
                    type="name"
                    id="new_title"
                    value={ticketUrl}
                    onChange={(e) => updateTicketUrl(e.target.value)}
                    placeholder="yourticket.com"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" p-0 border_class2 box_padding">
            <div class="row">
              <div class="col-md-12">
                <div
                  className=""
                  style={{ width: "100%", marginTop: "0px" }}
                  id="news_sendto"
                  value={sendNotificationTo}
                  onChange={(e) => updatesendNotificationTo(e.target.value)}
                >
                  <div className="d-flex">
                    <label className="all_labels">
                      Who are you sending this notification to?
                    </label>

                    <p className="all_stars"></p>
                  </div>
                  <label className="all_labels">User Type</label>

                  <div className="d-flex" id="sendNotification">
                    <input
                      type="radio"
                      id="all students"
                      name="eventUserType"
                      value="1"
                    />
                    <label
                      for="all students"
                      className="specific_recipients_label"
                      onClick={() => all_student()}
                    >
                      <p style={{ marginLeft: "5PX" }}>All Students</p>
                    </label>
                    <input
                      type="radio"
                      id="specific class"
                      name="eventUserType"
                      value="2"
                    />
                    <label
                      for="specific class"
                      className="specific_recipients_label"
                      style={{ marginLeft: "15PX" }}
                      onClick={() => specific_class()}
                    >
                      <p style={{ marginLeft: "5PX" }}>Specific Recipients</p>
                    </label>
                  </div>
                </div>

                <div
                  class="SendToAll"
                  id="SendMsg"
                  style={{ marginTop: "-6px", display: "none" }}
                >
                  <h4 class="login-text all_validations_h4">
                    Please Select User Type
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* specific student pop up */}
          <div
            className="user_type selected_std_modal"
            style={{ display: "none" }}
          >
            <div className="selected_std_modal_inner_div">
              <div className="d-flex edit_top_container">
                <label className="main_labels">Specific Recipients</label>

                <img
                  src="dist/img/Cancel.png"
                  alt="dropdown"
                  className="close_event ml-auto cancel_img"
                />
              </div>

              <div
                id="exTab2"
                class="container p-0"
                style={{ marginTop: "10PX", height: "100%" }}
              >
                <ul className="nav nav-tabs">
                  <li className="active mb-0">
                    <a href="#3" data-toggle="tab">
                      Individual
                    </a>
                  </li>
                  <li style={{ marginLeft: "10px" }}>
                    <a href="#2" data-toggle="tab">
                      Class
                    </a>
                  </li>

                  <li className="mb-0" style={{ marginLeft: "10px" }}>
                    <a
                      href="#1"
                      data-toggle="tab"
                      style={{ padding: "10px 20px" }}
                    >
                      Persona
                    </a>
                  </li>
                </ul>

                <div class="tab-content ">
                  <div class="tab-pane active" id="3">
                    <div
                      id="exTab3"
                      class="container"
                      style={{ marginTop: "0PX", height: "100%" }}
                    >
                      {/* <ul class="nav nav_tabs">
                        <li class="active">
                          <a href="#6" data-toggle="tab">
                            Recipient
                          </a>
                        </li>
                        <li style={{ marginLeft: "5px" }}>
                          <a href="#7" data-toggle="tab">
                            Upload Recipient
                          </a>
                        </li>
                      </ul> */}

                      <div
                        class="tab-content "
                        style={{ padding: "0px", height: "auto" }}
                      >
                        <div
                          class="tab-pane active"
                          id="6"
                          style={{ height: "100%" }}
                        >
                          <NewRecipients
                            style={{ height: "100%" }}
                            passData={passData}
                          />
                        </div>
                        {/* <div class="tab-pane" id="7">
                          <h3 style={{ fontWeight: "600" }}>
                            UPLOAD RECIPIENT
                          </h3>

                          <div className="mt-0 p-0">
                            <div class="row">
                              <div class="col-md-12">
                                <div
                                  style={{
                                    width: "100%",
                                    marginTop: "0px",
                                    paddingRight: "0",
                                  }}
                                >
                                  <ExportToExcel
                                    apiData={studentList}
                                    fileName={fileName}
                                  />
                                  <br />
                                  <div className="d-flex">
                                    <label
                                      style={{
                                        color: "#1F3977",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Upload ExcelSheet
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
                                    type="file"
                                    id="excelSheet"
                                    onChange={(e) =>
                                      setExcel(e.target.files[0])
                                    }
                                    accept=".xlsx,.xls"
                                    placeholder="Your Title goes here..."
                                    autoComplete="true"
                                    style={{
                                      boxSizing: "border-box",
                                      fontSize: "12px",
                                      paddingLeft: "5PX",
                                    }}
                                  />

                                  <div className="d-flex mt-2">
                                    <input
                                      type="button"
                                      className=" form-buttons3"
                                      defaultValue="Sign Up"
                                      onClick={() => uploadExcel()}
                                      value="Publish"
                                      style={{
                                        marginLeft: "auto",
                                        fontWeight: "500",
                                        border: "none",
                                        color: "white",
                                        borderRadius: "6px",
                                        backgroundColor: "#1F3977",
                                        padding: "6px 20px",
                                        fontSize: "12PX",
                                      }}
                                    />
                                  </div>

                                  <div>
                                    <p
                                      className="excel_message"
                                      style={{
                                        color: "blue",
                                        fontSize: "12px",
                                        marginTop: "7PX",
                                      }}
                                    >
                                      {excelError_message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane" id="2">
                    <NewClassRecipients
                      style={{ height: "100%" }}
                      passData={passData}
                    />
                  </div>

                  <div class="tab-pane" id="1" style={{ height: "100%" }}>
                    {/* persona */}
                    <div
                      id="exTab4"
                      class="container"
                      style={{ marginTop: "0PX", height: "100%" }}
                    >
                      {/* <ul class="nav nav_tabs">
                        <li class="active">
                          <a href="#4" data-toggle="tab">
                            Recipient
                          </a>
                        </li>
                        <li style={{ marginLeft: "5px" }}>
                          <a href="#5" data-toggle="tab">
                            Add Persona
                          </a>
                        </li>
                      </ul> */}

                      {/* persona tab content */}
                      <div
                        class="tab-content "
                        style={{ padding: "0px", height: "auto" }}
                      >
                        <div
                          class="tab-pane active"
                          id="4"
                          style={{ height: "100%" }}
                        >
                          {/* Datatable */}
                          <NewPersonaRecipients
                            style={{ height: "100%" }}
                            passPersonaData={passPersonaData}
                          />
                        </div>
                        <div
                          class="tab-pane"
                          id="5"
                          style={{ paddingTop: "20px" }}
                        >
                          <h3 style={{ fontWeight: "600" }}>ADD PERSONA</h3>
                          <input
                            type="text"
                            value={addPersona}
                            onChange={(e) => updatePersona(e.target.value)}
                            style={{
                              border: "1px solid #c4c4c4",
                              width: "96%",
                              height: "35px",
                              fontSize: "11PX",
                              margin: "0 10px",
                              background: "transparent",
                            }}
                          />
                          <div className="d-flex mt-4">
                            <input
                              type="button"
                              className="close_event ml-auto"
                              defaultValue="Sign Up"
                              value="Cancel"
                              style={{
                                fontWeight: "600",
                                border: "none",
                                color: "#1F3977",
                                marginLeft: "auto",
                                backgroundColor: "white",
                                fontSize: "12PX",
                              }}
                            />

                            <input
                              type="button"
                              className=" form-buttons3"
                              defaultValue="Sign Up"
                              onClick={() => createPersona()}
                              value="Submit"
                              style={{
                                fontWeight: "500",
                                border: "none",
                                color: "white",
                                borderRadius: "6px",
                                marginLeft: "8px",
                                backgroundColor: "#1F3977",
                                padding: "10px 40px",
                                fontSize: "10PX",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                marginRight: "10px",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              fontWeight: "500",
                              fontFamily: "Poppins",
                              fontSize: "11px",
                              marginTop: "10px",
                            }}
                          >
                            {errorCodePersona == 200 ? (
                              <div
                                class="personaMsg"
                                style={{ marginLeft: "8px", width: "96%" }}
                              >
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                  <Alert variant="filled" severity="success">
                                    {errorMessagePersona}
                                  </Alert>
                                </Stack>
                              </div>
                            ) : errorCodePersona == 406 ? (
                              <div
                                className="personaMsg"
                                style={{ marginLeft: "8px", width: "96%" }}
                              >
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                  <Alert variant="filled" severity="error">
                                    Please Enter the Field
                                  </Alert>
                                </Stack>
                              </div>
                            ) : errorCodePersona == 409 ? (
                              <div
                                className="personaMsg"
                                style={{ marginLeft: "8px", width: "96%" }}
                              >
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                  <Alert variant="filled" severity="error">
                                    {errorMessagePersona}
                                  </Alert>
                                </Stack>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="d-flex form-buttons p-0 border_class2 box_padding buttons_div">
            <div
              class="ValueMsg"
              style={{ margin: "8px", width: "57%", display: "none" }}
            ></div>

            <img
              className="delete_img"
              src="dist/img/delete.png"
              alt="dropdown"
              onClick={() => resetValues()}
            />
            <p className="news_bar">|</p>
            <button className="preview_button" onClick={() => preview()}>
              <p className="preview_font">Preview</p>
              <div className="preview_img_div">
                <img
                  className="preview_img"
                  src="dist/img/view.png"
                  alt="dropdown"
                />
              </div>
            </button>

            <input
              type="button"
              className="publish_button"
              defaultValue="Sign Up"
              onClick={() => createEvent()}
              value="Publish"
            />
          </div>
        </div>
      )}

      {/* ---------------------------------------------- */}
      {/* PREVIEW */}
      <div className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Event Preview</label>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              <img
                src="dist/img/Pencil.png"
                className="ml-auto preview_edit_img"
                onClick={() => edit_category()}
                style={{ marginRight: "7px" }}
              />
              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="close_event ml-auto cancel_img"
              />
            </div>
          </div>

          {/* ------------------------ */}

          <div
            className="main-container"
            style={{
              border: "1px solid #4779F0",
              padding: "10px",
              borderRadius: "0px",
            }}
          >
            <div className="image-container">
              <div
                className="d-flex justify-content-left"
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {picture == null ? (
                  <img
                    // src={require("../images/no_image.png")}
                    src={require("../../Images/added_image.png")}
                    className="event-image"
                    alt="No Image Available"
                    style={{ width: "120px", height: "90px" }} // Set image size
                  />
                ) : (
                  imgData.map((item, index) => (
                    <div key={index} style={{ margin: "2px" }}>
                      <img
                        className="event-image"
                        src={item}
                        alt="Event Image"
                        style={{ width: "216px", height: "102px" }} // Set image size
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="event-details-container">
              {/* Event Name */}
              <div className="event-title-container">
                <p
                  className="event-title"
                  style={{
                    color: "#0B0C0C",
                    fontSize: "14px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  {eventName}
                </p>
              </div>

              {/* Event Details */}
              <div className="event-info" style={{ fontSize: "10px" }}>
                <p>
                  <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                    Venue:
                  </strong>{" "}
                  <span style={{ color: "#0B0C0C" }}>{venue}</span>
                </p>
                <p>
                  <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                    Event Date/Time:
                  </strong>{" "}
                  <span style={{ color: "#0B0C0C" }}>
                    {eventDate} {endTime}
                  </span>
                </p>
              </div>

              {/* Divider with space */}
              <div style={{ height: "10px" }}></div>

              {/* Ticket Fee and URL */}
              <div
                className="ticket-info d-flex justify-content-between"
                style={{
                  fontSize: "10px",
                  borderTop: "1px solid #D3D3D3",
                  padding: "5px",
                }}
              >
                <p>
                  <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                    Entry Fee:
                  </strong>
                  <span style={{ color: "#0B0C0C" }}> ₹ {entryFee}</span>
                </p>
                <p>
                  <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                    Ticket URL:
                  </strong>{" "}
                  <span style={{ color: "#FF5733" }}>
                    <a href={ticketUrl || "#"}>{ticketUrl}</a>
                  </span>
                </p>
              </div>

              {/* Publish Date and Close Date */}
              <div
                className="publish-close-info d-flex justify-content-between"
                style={{
                  fontSize: "10px",
                  borderTop: "1px solid #D3D3D3",
                  padding: "5px",
                }}
              >
                <p>
                  <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                    Publish Date/Time:
                  </strong>
                  <span style={{ color: "#0B0C0C" }}>
                    {eventDate}/{startTime}
                  </span>
                </p>
                <p>
                  <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                    Close Date/Time:
                  </strong>{" "}
                  <span style={{ color: "#0B0C0C" }}>
                    {eventDate}/{endTime}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/*------------------------ */}

          {/* <div className="edit_top_label" style={{ marginTop: "0px" }}>
            <p>Name & Venue</p>
          </div> */}

          {/* <div className="edit_border_class">
            <div className="row">
              <div className="col-md-3">
                <span className="preview_font">Event Name</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{eventName}</span>
              </div>

              <div className="col-md-3">
                <span className="preview_font">Event Venue</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{venue}</span>
              </div>
            </div>
          </div> */}
          {/*
          <div className="edit_top_label">
            <p>Date, Time, Venue & URL</p>
          </div> */}

          <div className="edit_border_class">
            <div className="row">
              {/*<div className="col-md-3">
                <span className="preview_font">Event Date</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{eventDate}</span>
              </div> */}

              {/* <div className="col-md-3">
                <span className="preview_font">Start Time</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{startTime}</span>
              </div>

              <div className="col-md-3">
                <span className="preview_font">End Time</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{endTime}</span>
              </div>

              <div className="col-md-3">
                <span className="preview_font">Entry Fee</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{entryFee}</span>
              </div>

              <div className="col-md-3">
                <span className="preview_font">Capacity</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{ticketCapacity}</span>
              </div>

              <div className="col-md-3">
                <span className="preview_font">Event URL</span>
              </div>
              <div className="col-md-9">
                : <span className="preview_font">{ticketUrl}</span>
              </div> */}

              {/* <div className="col-md-3">
                <span className="preview_font">User Type</span>
              </div> */}
              <div className="col-md-9"
              // style={{
              //   border: "2px solid red",
              //   position:"absolute",
              //   marginTop:"5%"
              // }}
              >
                <span className="preview_font">
                  {/* {sendNotificationTo === 1
                    ? "All Students"
                    : sendNotificationTo === 2
                      ? "Specific Recipient"
                      : ""}
                  <br />
                  {student_name} */}
                </span>
              </div>
            </div>
          </div>
          {/* --------------------------- */}

          <div
            className="edit_top_label"
            style={{
              fontSize: "10px",
              textAlign: "left",
              color: "#4779F0",
              marginTop: "-30px",
              marginLeft: "0px",
            }}
          >
            <p>About Events</p>
          </div>

          <div className="descriptionDiv">
            <div
              className="edit_border_class_2nine_font_class"
              style={{
                height: "190px",
                marginTop: "-10px",
                width: "100%",
                padding: "10px",
              }}
            >
              <p
                className="desc_class"
                dangerouslySetInnerHTML={{ __html: description }}
                style={{
                  margin: 0,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              />
            </div>
          </div>
          {/* ------------------- */}
          <div
            className="reciepientsDiv"
            style={{
              marginTop: "5px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                color: "#4779F0",
                marginBottom: "10px",
              }}
            >
              Recipients :
            </p>

            <div
              style={{
                border: "1px solid #4779F0",
                // padding: "5px"
                height: "35px",
                width: "100%",
                background: "transperent"
              }}
            >
              <div
                style={{ margin: "2px", marginTop: "-5px", }}
              >
                {/* <button style={{ background: "none", border: "none", }}>
                  <img src="dist/img/selected_std_close.png"  class="selected_std_close_img"  />
                </button> */}
                <p style={{ padding: "10px 0px", Text: "center", fontSize: "0.7rem", marginTop: "9px", height: "4vh" }} class="selected_std_div">{student_name}</p>
              </div>

              {/* Your content goes here */}
            </div>
          </div>

          {/* -------------- */}
          <div
            className="ButtonPublish"
            style={{ marginTop: "10px", height: "6vh" }}
          >
            <button
              className="publish_button_1"
              defaultValue="Save"
              onClick={() => saveEvent()}
              value="Save"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* **********************************************edit category************************************* */}
      <div className="preview_category">
        <div className="edit_inner">
          {/* <div className="d-flex edit_inner_div"> */}
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Event</label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
          {/* category & question */}
          <div className="preview_form">
            {/* <div className="edit_top_label"><p>Name & Venue</p></div> */}

            <div
              className="main-container"
              style={{
                border: "1px solid #4779F0",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              <div className="image-container">
                <div
                  className="d-flex justify-content-left"
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  {picture == null ? (
                    <img
                      src={require("../images/no_image.png")}
                      className="event-image"
                      alt="No Image Available"
                      style={{ width: "216px", height: "102px" }} // Set image size
                    />
                  ) : (
                    imgData.map((item, index) => (
                      <div key={index} style={{ margin: "2px" }}>
                        <img
                          className="event-image"
                          src={item}
                          alt="Event Image"
                          style={{ width: "216px", height: "102px" }} // Set image size
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="event-details-container">
                {/* Event Name */}
                <div className="event-title-container">
                  <p
                    className="event-title"
                    style={{
                      color: "#0B0C0C",
                      fontSize: "14px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    {eventName}
                  </p>
                </div>

                {/* Event Details */}
                <div className="event-info" style={{ fontSize: "10px" }}>
                  <p>
                    <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                      Venue:
                    </strong>{" "}
                    <span style={{ color: "#0B0C0C" }}>{venue}</span>
                  </p>
                  <p>
                    <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                      Event Date/Time:
                    </strong>{" "}
                    <span style={{ color: "#0B0C0C" }}>
                      {eventDate} {endTime}
                    </span>
                  </p>
                </div>

                {/* Divider with space */}
                <div style={{ height: "10px" }}></div>

                {/* Ticket Fee and URL */}
                <div
                  className="ticket-info d-flex justify-content-between"
                  style={{
                    fontSize: "10px",
                    borderTop: "1px solid #D3D3D3",
                    padding: "5px",
                  }}
                >
                  <p>
                    <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                      Entry Fee:
                    </strong>
                    <span style={{ color: "#0B0C0C" }}> ₹ {entryFee}</span>
                  </p>
                  <p>
                    <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                      Ticket URL:
                    </strong>{" "}
                    <span style={{ color: "#FF5733" }}>
                      <a href={ticketUrl || "#"}>{ticketUrl}</a>
                    </span>
                  </p>
                </div>

                {/* Publish Date and Close Date */}
                <div
                  className="publish-close-info d-flex justify-content-between"
                  style={{
                    fontSize: "10px",
                    borderTop: "1px solid #D3D3D3",
                    padding: "5px",
                  }}
                >
                  <p>
                    <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                      Publish Date/Time:
                    </strong>
                    <span style={{ color: "#0B0C0C" }}>
                      {eventDate}/{startTime}
                    </span>
                  </p>
                  <p>
                    <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                      Close Date/Time:
                    </strong>{" "}
                    <span style={{ color: "#0B0C0C" }}>
                      {eventDate}/{endTime}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="edit_border_class">
              <div className="p-0">
                <div class="row">
                  <div class="col-md-14">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div
                        className="edit_top_label"
                        style={{
                          fontSize: "10px",
                          textAlign: "left",
                          color: "#4779F0",
                          marginTop: "-10px",
                          marginLeft: "-10px",
                        }}
                      >
                        <p>About Events</p>
                      </div>

                      <div
                        className="descriptionDiv"
                        style={{ marginLeft: "-10px" }}
                      >
                        {/* <div
                          className="edit_border_class_2nine_font_class"
                        >
                          <p
                            className="desc_class"
                            dangerouslySetInnerHTML={{ __html: description }}
                            style={{
                              margin: 0,
                              wordWrap: "break-word",
                              overflowWrap: "break-word",
                            }}
                          />
                        </div> */}

                        <div>
                          <SummerNote
                            _onChange={handelSummenrnote}
                            value={description}
                            placeholder="Enter Your Message here.."
                          />
                        </div>

                        <div
                          className="reciepientsDiv"
                          style={{
                            marginTop: "5px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#4779F0",
                              marginBottom: "10px",
                            }}
                          >
                            Recipients :
                          </p>
                          <div
                            style={{
                              border: "1px solid #4779F0",
                              // padding: "5px"
                              height: "35px",
                              width: "100%",
                              background: "transperent"
                            }}
                          >
                            <div
                              style={{ margin: "2px", marginTop: "-5px", }}
                            >
                              {/* <button style={{ background: "none", border: "none", }}>
                                  <img src="dist/img/selected_std_close.png"  class="selected_std_close_img"  />
                                    </button> */}
                              <p style={{ padding: "10px 0px", Text: "center", fontSize: "0.7rem", marginTop: "9px", height: "4vh" }} class="selected_std_div">{student_name}</p>
                            </div>

                            {/* Your content goes here */}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ******************button********************** */}

            {/* <div
              className="d-flex mt-3 edit_buttons_div border_class2"
              style={{ justifyContent: "end" }}
            >
              <input
                type="button"
                className="edit_cancel_button"
                onClick={() => cancelEdit()}
                value="Cancel"
              />

              <input
                type="button"
                className="edit_update_button"
                id="delete_single_student"
                value="Update"
                onClick={() => saveEvent()}
              />
            </div> */}

            <div
              className="ButtonPublish"
              style={{ marginTop: "10px", height: "6vh" }}
            >
              <button
                className="publish_button_1"
                defaultValue="Save"
                onClick={() => saveEvent()}
                value="Save"
              >
                Save
              </button>
            </div>

            <div style={{ display: "none" }} className="saveMessage">
              Data Saved Successfully
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
