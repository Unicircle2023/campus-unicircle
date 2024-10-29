import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { NewRecipient } from "./NewRecipient";
import { NewClassRecipient } from "./NewClassRecipient";
import LoadingSpinner from "../LoadingSpinner";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import SummerNote from "../SummerNote/SummerNote";
import { ExportToExcel } from "./ExportToExcel";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { NewRecipients } from "../Specific Students/NewRecipients";
import { NewClassRecipients } from "../Specific Students/NewClassRecipients";
import { NewPersonaRecipients } from "../Specific Students/NewPersonaRecipients";

export function JobForm() {
  var todayy = "";
  const history = useHistory();
  todayy = new Date().toISOString().slice(0, 16);
  $(".close_event").click(function() {
    $(".user_type").hide();
  });
  function preview() {
    $(".preview_polls").show();
    summernoteCssFunc();
  }

  $(".close_event").click(function() {
    $(".preview_polls").hide();
    summernoteCssFunc();
  });

  $(".close_event").click(function() {
    $(".preview_category").hide();
    summernoteCssFunc();
  });

  function event_image() {
    if (companyLogo != null) {
      setTimeout(() => {
        $(".event_image").hide();
      }, 3000);
    }
  }
  function cancelEdit() {
    $(".preview_category").hide();
    summernoteCssFunc();
  }

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

  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
    summernoteCssEditFunc();

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
  }

  const resetValues = () => {
    // document.getElementById("file-ip-1").value = null;
    // $("#file-ip-1").val(null);

    var dropDown = document.getElementById("job_category");
    dropDown.selectedIndex = 0;

    var ele = document.getElementsByName("eventUserType");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;

    updateJobCategory("");
    updateJobTitle("");
    updateCompanyName("");
    updateJobDescription("");

    updateJobDeadlineDate("");
    updateJobBudget("");
    updateJobSendTo("");
    updateJobUser("");
    updateCompanyLogo("");
    $("#studentName").hide();
    setImgData([]);
    // document.getElementById("file-ip-1-preview").style.display = "none";
    $(".event_image").show();
    $(".default_image").show();
  };

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
    const formData = new FormData();
    formData.append("job_title", jobTitle);
    formData.append("company_name", companyName);
    formData.append("budget", jobBudget);
    formData.append("validity", jobDeadlineDate);
    formData.append("send_to", jobSendTo);
    formData.append("description", jobDescription);
    formData.append("j_id", "1");
    formData.append("image", companyLogo);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_job",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
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

    setTimeout(function() {
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
    $(".note-editable").css("height", "230px");
  };

  const summernoteCssFunc = () => {
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height", "113px");
  };

  useEffect(() => {
    fetchSingleEvent();
    summernoteCssFunc();
  }, []);

  const [jobCategory, updateJobCategory] = useState("");
  const [jobTitle, updateJobTitle] = useState("");
  const [companyName, updateCompanyName] = useState("");
  const [companyEmail, updateCompanyEmail] = useState("");
  const [jobDescription, updateJobDescription] = useState("");
  const [jobDescription_text, updateJobDescription_text] = useState("");
  const [jobDeadlineDate, updateJobDeadlineDate] = useState("");
  const [jobBudget, updateJobBudget] = useState("");
  const [jobSendTo, updateJobSendTo] = useState("");
  const [jobUser, updateJobUser] = useState("");
  const [companyLogo, updateCompanyLogo] = useState(null);

  async function createJob() {
    try {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const job_cat = document.getElementById("job_category");
      const job_title = document.getElementById("job_title");
      const comp_name = document.getElementById("comp_name");

      const comp_logo = document.getElementById("file-ip-1");
      const send_to = document.getElementById("sendNotification");

      if (
        jobCategory == "" &&
        jobTitle == "" &&
        companyName == "" &&
        companyEmail == "" &&
        jobDescription == ""
      ) {
        toast.error("You must fill all the fields");
      } else if (jobCategory == "") {
        $(".jobCat").show();

        setTimeout(function() {
          $(".jobCat").hide();
        }, 3000);
      } else if (jobTitle == "") {
        $(".JobTitle").show();

        setTimeout(function() {
          $(".JobTitle").hide();
        }, 3000);
      } else if (companyName == "") {
        $(".CompanyName").show();

        setTimeout(function() {
          $(".CompanyName").hide();
        }, 3000);
      } else if (companyEmail == "") {
        $(".CompEmail").show();

        setTimeout(function() {
          $(".CompEmail").hide();
        }, 3000);
      } else if (!filter.test(companyEmail)) {
        $(".validEmail").show();

        setTimeout(function() {
          $(".validEmail").hide();
        }, 3000);
      } else if (jobDescription == "") {
        $(".JobDesc").show();
        setTimeout(function() {
          $(".JobDesc").hide();
        }, 3000);
      } else if (jobSendTo == "") {
        checkRadio();
        $(".SendToAll").show();

        setTimeout(function() {
          $(".SendToAll").hide();
        }, 3000);
      } else if (comp_logo.value == "") {
        $(".companyLogo").show();

        setTimeout(function() {
          $(".companyLogo").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("job_title", jobTitle);
        formData.append("company_name", companyName);
        formData.append("comp_email", companyEmail);
        formData.append("validity", jobDeadlineDate);
        formData.append("category", jobCategory);
        formData.append("send_to", jobSendTo);
        formData.append("users", childId);
        formData.append("description", jobDescription);
        formData.append("budget", jobBudget);
        formData.append("image", companyLogo);

        const eventResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_add_job",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        console.log("eventResponse-----------", eventResponse);
        setIsLoading(false);
        updateError_message(eventResponse.data.message);
        if (eventResponse.data.error_code == 200) {
          toast.success(eventResponse.data.message);

          setTimeout(function() {
            history.push("/jobDetails");
          }, 3000);
        } else {
          console.log("admin_add_job---", eventResponse.data.message);
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
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState([]);

  const getImage = (e) => {
    $(".default_image").hide();
    updateCompanyLogo(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      // var preview = document.getElementById("file-ip-1-preview");
      // preview.src = src;
      // preview.style.display = "block";
      // setImgData(src);

      const newFiles = Array.from(e.target.files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImgData([]);
      setImgData(newUrls);
    }
  };

  function hide_date() {
    $(".show_date").hide();
  }
  function show_date() {
    $(".show_date").show();
  }

  const checkRadio = () => {
    var table = document.getElementById("tblFruits");
    var radio = table.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("spnError").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  const handelSummenrnote = (e) => {
    const updatedDescription = e.replace(/\r?\n/g, "\n");
    updateJobDescription(updatedDescription);
    // updateJobDescription(e);
  };

  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="border_class2 box_padding">
        <h1 className="main_heading_h1">CREATE JOB LISTING</h1>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="border_class2 box_padding">
            <div class="row">
              <div class="col-md-4">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Job Category</label>

                    <p className="all_stars">*</p>
                  </div>

                  <select
                    className="all_inputs"
                    id="job_category"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateJobCategory(e.target.value)}
                  >
                    <option
                      selected="selected"
                      value={jobCategory}
                      style={{
                        padding: "6px",
                        fontSize: "9px",
                        fontWeight: "500",
                      }}
                    >
                      Select Category
                    </option>
                    <option>Part Time</option>
                    <option>Full Time</option>
                    <option>Remote Friendly</option>
                    <option>Freelance</option>
                    <option>Volunteer</option>
                  </select>
                  <div
                    class="jobCat"
                    style={{ marginTop: "-6px", display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Select Job Category
                    </h4>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    paddingRight: "0",
                  }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Job Title</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    className="all_inputs"
                    type="name"
                    id="job_title"
                    value={jobTitle}
                    onChange={(e) => updateJobTitle(e.target.value)}
                    placeholder="Job title goes here..."
                    autoComplete="off"
                  />
                  <div class="JobTitle" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Job Title
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border_class2 box_padding">
            <div class="row">
              <div className="col-md-8 p-0">
                <div class="col-md-6">
                  <div className="left_padding">
                    <div className="d-flex">
                      <label className="all_labels">Company Name</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      className="all_inputs"
                      type="name"
                      id="comp_name"
                      value={companyName}
                      onChange={(e) => updateCompanyName(e.target.value)}
                      placeholder="Who's  hiring?..."
                      autoComplete="off"
                    />
                    <div class="CompanyName" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Company Name
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">Company Email</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      className="all_inputs"
                      type="email"
                      id="comp_email"
                      value={companyEmail}
                      onChange={(e) => updateCompanyEmail(e.target.value)}
                      placeholder="Company email goes here..."
                      autoComplete="off"
                    />
                    <div class="CompEmail" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Company Email
                      </h4>
                    </div>
                    <div
                      class="validEmail"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4 className="login-text all_validations_h4">
                        Please Enter valid Email Address with @
                      </h4>
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">Job Description</label>

                      <p className="all_stars">*</p>
                    </div>

                    <SummerNote
                      _onChange={handelSummenrnote}
                      value={jobDescription}
                      placeholder="Enter Your Message here.."
                    />
                    <div class="JobDesc" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Job Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="left_padding">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">Add Company Logo</label>

                      <p className="all_stars">*</p>
                    </div>

                    <label for="file-ip-1" class="file-ip-1 x mb-0">
                      <img
                        class="default_image "
                        src="dist/img/event_photo.png"
                        id="comp_logo"
                      />
                      <div className="d-flex">
                        {imgData.length > 0 ? (
                          imgData.map((item, index) => (
                            <div key={index} style={{ margin: "2px" }}>
                              <img className="_job_logo" src={item} />
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>

                      {/* <img id="file-ip-1-preview" style={{ display: "none" }} /> */}
                    </label>
                    <input
                      type="file"
                      name="photo"
                      style={{ visibility: "hidden", display: "none" }}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={getImage}
                      id="file-ip-1"
                    />

                    <div class="companyLogo" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Select Company Logo
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border_class2 box_padding">
            <div class="row">
              <div class="col-md-4">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Job Deadline date/time</label>

                    <p
                      style={{
                        color: "#EB2424",
                        fontWeight: "600",
                        marginLeft: "3PX",
                        fontSize: "10px",
                      }}
                    ></p>
                  </div>

                  <input
                    className="all_inputs"
                    type="datetime-local"
                    placeholder="dd-mm-yyyy hh-mm"
                    id="publish_date"
                    value={jobDeadlineDate}
                    onChange={(e) => updateJobDeadlineDate(e.target.value)}
                    min={todayy}
                    name="birthdaytime"
                  />
                  <div class="EventDate" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Event Date
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div className="left_padding">
                  <div className="d-flex">
                    <label className="all_labels">Budget</label>

                    <p
                      style={{
                        color: "#EB2424",
                        fontWeight: "600",
                        marginLeft: "3PX",
                        fontSize: "10px",
                      }}
                    ></p>
                  </div>
                  <input
                    className="all_inputs"
                    type="name"
                    id="event_name"
                    value={jobBudget}
                    onChange={(e) => updateJobBudget(e.target.value)}
                    placeholder="0.00"
                    autoComplete="off"
                  />
                  <div class="StartTime" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Start Time
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border_class2 box_padding">
            <div class="row">
              <div class="col-md-12">
                <div
                  className=""
                  style={{ width: "100%", marginTop: "0px" }}
                  value={jobSendTo}
                  onChange={(e) => updateJobSendTo(e.target.value)}
                >
                  <div className="d-flex">
                    <label className="all_labels">
                      Who are you sending this notification to?
                    </label>

                    <p className="all_stars">*</p>
                  </div>
                  <label className="all_labels">User Type</label>
                  <br />

                  <div className="d-flex" id="tblFruits">
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
                      style={{ marginLeft: "15px" }}
                      onClick={() => specific_class()}
                    >
                      <p style={{ marginLeft: "5PX" }}>Specific Recipients</p>
                    </label>
                  </div>
                </div>

                <div
                  class="SendToAll"
                  id="spnError"
                  style={{ display: "none" }}
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
                    <div
                      id="exTab4"
                      class="container"
                      style={{ marginTop: "0PX", height: "100%" }}
                    >
                      <div
                        class="tab-content "
                        style={{ padding: "0px", height: "auto" }}
                      >
                        <div
                          class="tab-pane active"
                          id="4"
                          style={{ height: "100%" }}
                        >
                          <NewPersonaRecipients
                            style={{ height: "100%" }}
                            passPersonaData={passPersonaData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className="d-flex border_class2 box_padding buttons_div">
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

            {/* <a href="/student"> */}
            <input
              type="button"
              className="publish_button"
              defaultValue="Sign Up"
              onClick={() => createJob()}
              value="Publish"
            />
            {/* </a> */}
          </div>
        </div>
      )}

      {/* PREVIEW=================================================== */}

      <div className="preview_polls" style={{ overflowY: "auto" }}>
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Job Preview</label>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              <img
                src="dist/img/Pencil.png"
                alt="edit"
                className="ml-auto preview_edit_img"
                onClick={() => edit_category()}
                style={{ marginRight: "7px" }}
              />
              <img
                src="dist/img/Cancel.png"
                alt="cancel"
                className="close_event ml-auto cancel_img"
              />
            </div>
          </div>

          {/* Image and Job Details */}
          <div
            className="main-container"
            style={{
              border: "1px solid #4779F0",
              padding: "10px",
              borderRadius: "0px",
            }}
          >
            <div className="image-container">
              <div className="edit_border_class">
                <div className="p-0">
                  <div className="row">
                    <div className="col-md-12">
                      {imgData == null ? (
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            backgroundColor: "transparent",
                          }}
                        ></div>
                      ) : (
                        <img
                          className="preview_form_imgs"
                          src={imgData}
                          alt="No Company Logo"
                          style={{ width: "100px", height: "100px" }} // Image size
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {jobCategory === "" ? (
              <div>Please fill the form to preview it</div>
            ) : (
              <div>
                {/* Job Title and Company Information */}
                <div className="edit_top_label" style={{ marginTop: "10px" }}>
                  <p>
                    <strong
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        color: "#0B0C0C",
                      }}
                    >
                      {jobTitle}
                    </strong>
                    <br />
                    <strong
                      style={{
                        fontWeight: "normal",
                        fontSize: "10px",
                        color: "#0B0C0C",
                      }}
                    >
                      {companyName}
                    </strong>{" "}
                    · Pune, Maharashtra
                  </p>
                </div>

                {/* Job Category */}
                <div className="col-md-6">
                  <span className="preview_font">
                    <strong
                      style={{
                        color: "black",
                        fontWeight: "normal",
                        fontSize: "10px",
                      }}
                    >
                      Category:
                    </strong>{" "}
                    <span style={{ color: "green", fontSize: "10px" }}>
                      {jobCategory}
                    </span>
                  </span>
                </div>

                {/* Job Details */}
                <div className="edit_border_class" style={{ padding: "10px" }}>
                  <div className="row">
                    {/* Budget and Company Email */}
                    <div className="col-md-6">
                      <span className="preview_font">
                        <strong
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "10px",
                            paddingLeft: "-10px",
                          }}
                        >
                          Budget:
                        </strong>{" "}
                        <span style={{ color: "blue", fontSize: "10px" }}>
                          ₹ {jobBudget}
                        </span>
                      </span>
                    </div>
                    <div className="col-md-6">
                      <span className="preview_font">
                        <strong
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "10px",
                          }}
                        >
                          Company Email:
                        </strong>{" "}
                        <span style={{ color: "blue", fontSize: "10px" }}>
                          {companyEmail}
                        </span>
                      </span>
                    </div>

                    {/* Publish Date and Close Date */}
                    <div className="col-md-6">
                      <span className="preview_font">
                        <strong
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "10px",
                            paddingLeft: "-10px",
                          }}
                        >
                          Publish Date/Time:
                        </strong>{" "}
                        <span style={{ color: "blue", fontSize: "10px" }}>
                          Now
                        </span>
                      </span>
                    </div>
                    <div className="col-md-6">
                      <span className="preview_font">
                        <strong
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "10px",
                          }}
                        >
                          Close Date/Time:
                        </strong>{" "}
                        <span style={{ color: "blue", fontSize: "10px" }}>
                          {jobDeadlineDate}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* -------- */}

          <div
            className="edit_top_label"
            style={{
              fontSize: "10px",
              textAlign: "left",
              color: "#4779F0",
              marginLeft: "0px",
            }}
          >
            <p>About the job</p>
          </div>

          <div className="descriptionDiv">
            <div
              className="edit_border_class_2nine_font_class"
              style={{
                height: "200px",
                marginTop: "-10px",
                width: "100%",
                padding: "10px",
              }}
            >
              <p
                className="desc_class"
                dangerouslySetInnerHTML={{ __html: jobDescription }}
                style={{
                  margin: 0,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              />
            </div>
          </div>

          {/* -------- */}
          <div
            className="reciepientsDiv"
            style={{
              marginTop: "10px",
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
                padding: "5px",
                height: "60px",
                width: "100%",
              }}
            >
              {/* Your content goes here */}
            </div>
          </div>

          {/* -------------- */}

          <div className="ButtonPublish" style={{ marginTop: "20px" }}>
            <button
              className="publish_button_1"
              defaultValue="Publish"
              // onClick={() => createEvent()}
              value="Publish"
            >
              Publish
            </button>
          </div>
          {/* -------- */}
        </div>
      </div>

      {/* PREVIEW=================================================== */}
      {/*
      <div
        className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div
            className="d-flex edit_top_container">
            <label className="main_labels">
              Preview
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>

          {jobCategory == "" ? (
            <div>Please fill the form to preview it</div>
          ) : (
            <div>
              <div className="d-flex">

                <img
                  src="dist/img/Pencil.png"
                  alt="dropdown"
                  className=" ml-auto preview_edit_img"
                  onClick={() => edit_category()}
                />
              </div>

              <div className="edit_top_label" style={{marginTop:"0px"}}>
                  <p>Category,  Title, Email &  Company Name</p>
                </div>

              {
                <div>
                   <div className="edit_border_class" style={{height:"107px"}}>
                <div className="row">
                  <div className="col-md-3">
                    <span className="preview_font">
                    Category
                    </span>
                  </div>
                  <div className="col-md-9">
                    : <span className="preview_font">{jobCategory}</span>
                  </div>

                  <div className="col-md-3">
                    <span className="preview_font">
                    Title
                    </span>
                  </div>
                  <div className="col-md-9">
                    <span className="preview_font">{jobTitle}</span>
                  </div>

                  <div className="col-md-3">
                    <span className="preview_font">
                    Comp Name
                    </span>
                  </div>
                  <div className="col-md-9">
                    : <span className="preview_font">{companyName}</span>
                  </div>

                  <div className="col-md-3">
                    <span className="preview_font">
                    Comp Email
                    </span>
                  </div>
                  <div className="col-md-9">
                    : <span className="preview_font">{companyEmail}</span>
                  </div>
                </div>
                </div>

                <div className="edit_top_label">
                  <p>Deadline date, Budget & User Type</p>
                </div>

                <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-1">
                    <span className="preview_font">
                     Date
                    </span>
                  </div>
                  <div className="col-md-5">
                    : <span className="preview_font">{jobDeadlineDate}</span>
                  </div>

                  <div className="col-md-2">
                    <span className="preview_font">
                    Budget
                    </span>
                  </div>
                  <div className="col-md-4">
                    : <span className="preview_font">{jobBudget}</span>
                  </div>

                  <div className="col-md-1">
                    <span className="preview_font">
                    Type
                    </span>
                  </div>
                  <div className="col-md-11">
                    : <span className="preview_font">
                      {
                      jobSendTo == 2 ? "Specific Recipient" : "All Students"}
                      <br />
                      {student_name}</span>
                  </div>
                </div>
                </div>

                <div className="edit_top_label">
                  <p>Company Logo</p>
                </div>

                <div className="edit_border_class">
            <div className="p-0">
              <div class="row">
                <div class="col-md-12">
                {imgData ==  null?<img  src={require("../images/no_image.png")}
                                          className="preview_form_imgs"/>:
                   <img className="preview_form_imgs" src={imgData} />
                }
                </div>
              </div>
            </div>
            </div>

            <div className="edit_top_label">
                  <p> Job Description</p>
                </div>

                      <div>
                        <div className="edit_border_class nine_font_class"
                            style={{height:"190px"}}
                          >
                          <p dangerouslySetInnerHTML={{ __html: jobDescription }}/>
                      </div>
                      </div>
                </div>
              }
            </div>
          )}
        </div>
      </div> * */}

      {/* **********************************************edit category************************************* */}
      <div className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">Campus Job</label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
          {/* category & question */}
          <div className="preview_form">
            <div className="edit_top_label">
              <p>Category, Job Title & Company Name</p>
            </div>

            <div className="edit_border_class">
              <div className="row">
                <div className="col-md-4">
                  <span className="preview_font">Category :</span>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select form-select-sm edit_inputs_class"
                    id="news_category"
                    aria-label=".form-select-sm example"
                    value={jobCategory}
                    onChange={(e) => updateJobCategory(e.target.value)}
                  >
                    <option selected="selected" style={{ padding: "6px" }}>
                      {jobCategory}
                    </option>
                    <option>Part Time</option>
                    <option>Full Time</option>
                    <option>Remote Friendly</option>
                    <option>Freelance</option>
                    <option>Volunteer</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <span className="preview_font">Job Title :</span>
                </div>
                <div className="col-md-8">
                  <input
                    className="edit_inputs_class"
                    type="name"
                    autoComplete="true"
                    value={jobTitle}
                    onChange={(e) => updateJobTitle(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <span className="preview_font">Comp Name :</span>
                </div>
                <div className="col-md-8">
                  <input
                    className="edit_inputs_class"
                    type="name"
                    autoComplete="true"
                    value={companyName}
                    onChange={(e) => updateCompanyName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="edit_top_label">
              <p>Company Logo</p>
            </div>

            <div className="edit_border_class">
              <div className="p-0">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div>
                        {imgData == null ? (
                          <div>
                            <label
                              for="file-ip-1"
                              style={{ height: "100%", marginBottom: "0px" }}
                            >
                              <img
                                className="image_std preview_form_imgs"
                                src={require("../images/no_image.png")}
                              />
                              <img
                                className="preview_form_imgs"
                                id="file-ip-1-preview"
                                style={{
                                  borderRadius: "6PX",
                                  display: "none",
                                }}
                              />
                            </label>

                            <input
                              type="file"
                              name="photo"
                              style={{ visibility: "hidden", display: "none" }}
                              accept="image/png, image/gif, image/jpeg"
                              onChange={getImage}
                              readOnly
                              id="file-ip-1"
                            />
                          </div>
                        ) : (
                          <div>
                            <label
                              for="file-ip-1"
                              style={{
                                height: "100%",
                                display: "flex",
                                marginBottom: "0px",
                              }}
                            >
                              <div>
                                <img
                                  className="image_std preview_form_imgs"
                                  src={imgData}
                                />
                              </div>

                              <img
                                className="preview_form_imgs"
                                id="file-ip-1-preview"
                                style={{
                                  borderRadius: "6PX",
                                  display: "none",
                                }}
                              />
                              <input
                                type="file"
                                name="photo"
                                style={{
                                  visibility: "hidden",
                                  display: "none",
                                }}
                                accept="image/png, image/gif, image/jpeg"
                                onChange={getImage}
                                readOnly
                                id="file-ip-1"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit_top_label">
              <p> Job Description</p>
            </div>
            <div>
              <SummerNote
                _onChange={handelSummenrnote}
                value={jobDescription}
                placeholder="Enter Your Message here.."
              />
            </div>

            {/* ******************button********************** */}
            <div
              className="d-flex form-buttons mt-2 edit_buttons_div border_class2"
              style={{ justifyContent: "end" }}
            >
              <input
                type="button"
                className=" form-buttons3 edit_cancel_button"
                defaultValue="Next Step"
                onClick={() => cancelEdit()}
                value="Cancel"
              />

              <input
                type="button"
                className=" form-buttons3 edit_update_button"
                defaultValue="Next Step"
                onClick={() => saveEvent()}
                value="Save"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
