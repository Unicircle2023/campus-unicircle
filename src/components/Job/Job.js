import React, { useState, useEffect, useMemo } from "react";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi";
import { JobTable } from "./JobTable";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import FilterComponentJob from "./FilterComponentJob";
// import {FilterRecipient} from "./FilterRecipient"
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import moment from "moment";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "../LoadingSpinner";
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

const customStyles = {
  rows: {
    style: {
      background: "rgba(228, 233, 243, 0.6)",
      marginTop: "3PX",
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#15a312",
    },
  },

  head: {
    style: {
      border: "0.5px solid #C4C4C4",
    },
  },
  table: {
    style: {
      padding: "0px 10px 0 10px",
      marginTop: "0PX",
    },
  },
};

export function Job() {
  // var remoteFriendly = "";
  // var volunteer = "";
  // var parttime = "";
  // var fulltime = "";
  // var freelance = "";

  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [remoteData, setRemoteData] = useState([]);
  const [partTimeData, setPartTimeData] = useState([]);
  const [freelanceData, setFreelanceData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [fullTimeData, setFullTimeData] = useState([]);
  const [childNewsData, setChildNewsData] = useState([]);
  const [studentId, updateStudentId] = useState("");

  var todayy = "";
  todayy = new Date().toISOString().slice(0, 16);
  console.log("Todayy", todayy);

  async function fetchList() {
    console.log("Access Token-", token);
    try {
      setIsLoading(true);
      const fetchJobResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_job_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Job List Details", fetchJobResponse);
      setIsLoading(false);

      const jobErrorCode = fetchJobResponse.data.error_code;
      console.log("job Error Code ", jobErrorCode);

      const jobData = fetchJobResponse.data.data;
      console.log("job List ", jobData);

      if (jobErrorCode == 200) {
        const jobListArray = jobData;
        console.log("job list Array", jobListArray);
        setData(jobListArray);
        setFilteredResults(jobListArray);
      } else {
        setData([]);
        setFilteredResults([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
    fetchList();
    $(".remote_jobs").hide();
    $(".partTime_jobs").hide();
    $(".freelancing").hide();
    $(".volunTeerJobs").hide();
    $(".fullTimeJobs").hide();
  }, []);

  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);

    setChildData(data);
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);
  };

  const student_name = childData.join(", ");
  const columns = [
    {
      name: "Image",
      selector: "",
      sortable: true,

      width: "auto",
    },
    {
      name: "Job Title",
      // selector:"job_title",
      sortable: true,
      wrap: true,
      width: "auto",
    },
    {
      name: "Company Name",

      sortable: true,
      wrap: true,
      width: "auto",
    },
    {
      name: "Date",

      sortable: true,
      wrap: true,
      width: "auto",
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

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

    return (
      // <FilterComponentJob
      //   onFilter={e => setFilterText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterText}
      // />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);

  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchStudentList() {
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_students_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Student Details", fetchClassResponse.data.data);
      setEventData(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchStudentList();
    // getUserDetails();
  }, []);
  const eventColumns = [
    {
      name: "Student Name",
      selector: "student_name",
      // sortable: true,
      wrap: true,
      width: "auto",
    },
    {
      name: "Email",
      selector: "email",
      // sortable: true,
      wrap: true,
      width: "auto",
    },
  ];

  const [filterEventText, setFilterEventText] = React.useState("");
  const [
    resetEventPaginationToggle,
    setEventResetPaginationToggle,
  ] = React.useState(false);

  const filteredEventItems = eventData.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterEventText.toLowerCase()) !== -1
  );

  const subHeaderEventComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setEventResetPaginationToggle(!resetEventPaginationToggle);
        setFilterEventText("");
      }
    };

    return <div></div>;
  }, [filterEventText, resetEventPaginationToggle]);

  function close_delete_modal() {
    $(".delete_container").hide();
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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }
  const [deletePassword, updateDeletePassword] = useState("");

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
  const handleButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Job Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/jobDetails";
    });
  };

  const handleEditButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Job Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/jobDetails";
    });
  };
  // delete news
  const [getJobTitle, updateGetJobTitle] = useState("");
  const [getJobID, updateGetJobID] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  console.log("deleteErrorMessage", deleteErrorMessage);

  function deleteJob(job_id, job_title) {
    updateGetJobTitle(job_title);
    updateGetJobID(job_id);

    $(".delete_container").show();
  }

  // function deleteNewsModal(news_id, news_title) {
  //   console.log("newsss id",news_id)
  //   updateCampusNewsTitle(news_title)
  //   updateGetNewsID(news_id)
  //   $(".delete_container").show();
  // }

  function close_edit_modal() {
    $(".edit_container").hide();
  }

  async function deleteNewsApi() {
    try {
      const formData = new FormData();

      formData.append("j_id", getJobID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_job",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Campus News", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  // const [editDeliveryType, updateEditDeliveryType] = useState("");
  // const [editNewsId, updateEditNewsId] = useState("");
  const [categoryId, updateCategoryId] = useState("");
  const [editNewsTitle, updateEditNewsTitle] = useState("");
  const [editNewsDescription, updateEditNewsDescription] = useState("");
  const [editPublishDate, updateEditPublishDate] = useState("");
  const [editExpireDate, updateEditExpireDate] = useState("");
  const [editSendTo, updateEditSendTo] = useState("");
  const [editNewsId, updateEditNewsId] = useState("");
  const [editDeliveryType, updateEditDeliveryType] = useState("");
  const [editSend_to_student_name, updateEditSend_to_student_name] = useState(
    []
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  async function updateForm() {
    // setIsEditLoading(true)
    const formData = new FormData();

    formData.append("job_title", jobTitle);
    formData.append("company_name", jobCompanyName);
    formData.append("budget", jobBudget);
    formData.append("validity", jobValidity);
    formData.append("send_to", jobSendTo);
    formData.append("description", jobDesc);
    formData.append("j_id", jobID);
    formData.append("image", jobProfileImage);
    formData.append("category", jobCat);

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
    console.log("Update Campus Event", eventResponse);
    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    }
    // $(".edit_container").hide();

    //   $(".show_edit_message").show();
  }
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [campusNewsTitle, updateCampusNewsTitle] = useState("");

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
    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  console.log("preview image", imgData);

  const getImage = (e) => {
    updateJobProfileImage(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
      setImgData(src);
    }
  };

  const searchKey = (key) => {
    const filterResult = data.filter((val) => {
      if (key == "") {
        return val;
      } else if (val.job_title.toLowerCase().includes(key.toLowerCase())) {
        return val;
      }
    });
    setFilteredResults(filterResult);
  };

  const [userType, updateUserType] = useState([]);
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

      console.log("Get class List Details", fetchClassResponse.data.data);
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [jobCat, updateJobCat] = useState("");
  const [jobTitle, updateJobTitle] = useState("");
  const [jobCompanyName, updateJobCompanyName] = useState("");
  const [jobDesc, updateJobDesc] = useState("");
  const [jobProfileImage, updateJobProfileImage] = useState("");
  const [jobValidity, updateJobValidity] = useState("");
  const [jobBudget, updateJobBudget] = useState("");
  const [jobSendTo, updateJobSendTo] = useState("");
  const [jobID, updateJobID] = useState("");

  async function editJob(id) {
    $(".edit_container").show();

    const formData = new FormData();
    formData.append("j_id", id);

    const editjobResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_job",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("Edit Job response", editjobResponse.data.data);
    if (editjobResponse.data.error_code == 200) {
      editjobResponse.data.data.map((item) => {
        updateJobCat(item.category);
        updateJobTitle(item.job_title);
        updateJobCompanyName(item.company_name);
        updateJobDesc(item.description);
        updateJobProfileImage(item.profile_image);
        setImgData(item.profile_image);
        updateJobValidity(item.validity);
        updateJobBudget(item.budget);
        updateJobSendTo(item.send_to);
        updateJobID(item.job_id);

        // if (item.send_to == 2) {
        //   console.log("send_to_student", item.send_to_student);
        //   const name = item.send_to_student.map((item) => item.student_name);
        //   const student_id = item.send_to_student.map((item) => item.student_id);
        //   console.log("std-name", name);
        //   setChildNewsData(name);
        //   updateStudentId(student_id);
        // }
      });
    }
  }

  function event_image() {
    setTimeout(() => {
      $(".event_image").hide();
    }, 3000);
  }

  var remoteFriendly = "Remote Friendly";
  var volunteer = "Volunteer";
  var parttime = "Part Time";
  var fulltime = "Full Time";
  var freelance = "Freelance";

  // function remoteJobs(r_job) {
  //   remoteFriendly = "Remote Friendly";
  //   console.log("remoteFriendly",r_job)
  //   $(".regular_jobs").hide()
  //   $(".remote_jobs").show();

  // }

  $("#remote_friendly_job").on("click", function() {
    document.getElementById("remote_friendly_job").style.border =
      "1px solid green";
  });
  const [count, setCount] = useState(0);
  async function remoteJobs(r_job) {
    document.body.style.backgroundColor = "red";
    setCount(count + 1);
    console.log("remoteFriendly", count);
    $(".regular_jobs").hide();
    $(".remote_jobs").show();
    $(".partTime_jobs").hide();
    $(".freelancing").hide();
    $(".volunTeerJobs").hide();
    $(".fullTimeJobs").hide();

    const formData = new FormData();

    formData.append("category", r_job);

    const remoteResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_categorywise_job_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get Remote Jobs", remoteResponse.data.data);

    const remoteErrorCode = remoteResponse.data.error_code;
    console.log("remote Error Code ", remoteErrorCode);

    const jobData = remoteResponse.data.data;
    console.log("job List ", jobData);

    if (remoteErrorCode == 200) {
      const remoteListArray = jobData;
      console.log("job list Array", remoteListArray);
      setRemoteData(remoteListArray);
      setFilteredResults(remoteListArray);
    } else {
      setRemoteData([]);
      setFilteredResults([]);
    }
  }

  async function partTimeJobs(p_job) {
    console.log("parttime", p_job);
    $(".regular_jobs").hide();
    $(".remote_jobs").hide();
    $(".freelancing").hide();
    $(".volunTeerJobs").hide();
    $(".fullTimeJobs").hide();
    $(".partTime_jobs").show();

    const formData = new FormData();

    formData.append("category", p_job);

    const partTimeResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_categorywise_job_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get Part Time Jobs", partTimeResponse.data.data);

    const partTimeErrorCode = partTimeResponse.data.error_code;
    console.log("part time Error Code ", partTimeErrorCode);

    const partTimeData = partTimeResponse.data.data;
    console.log("part time List ", partTimeData);

    if (partTimeErrorCode == 200) {
      const partTimeListArray = partTimeData;
      console.log("job list Array", partTimeListArray);
      setPartTimeData(partTimeListArray);
      setFilteredResults(partTimeListArray);
    } else {
      setPartTimeData([]);
      setFilteredResults([]);
    }
  }

  async function freelanceJobs(fr_job) {
    console.log("freelance", fr_job);
    $(".regular_jobs").hide();
    $(".remote_jobs").hide();
    $(".partTime_jobs").hide();
    $(".volunTeerJobs").hide();
    $(".fullTimeJobs").hide();
    $(".freelancing").show();

    const formData = new FormData();

    formData.append("category", fr_job);

    const freelanceResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_categorywise_job_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get Freelancer Jobs", freelanceResponse.data.data);

    const freelanceErrorCode = freelanceResponse.data.error_code;
    console.log("freelance Error Code ", freelanceErrorCode);

    const freelanceData = freelanceResponse.data.data;
    console.log("freelance List ", freelanceData);

    if (freelanceErrorCode == 200) {
      const freelanceListArray = freelanceData;
      console.log("freelance list Array", freelanceListArray);
      setFreelanceData(freelanceListArray);
      setFilteredResults(freelanceListArray);
    } else {
      setFreelanceData([]);
      setFilteredResults([]);
    }
  }

  async function volunteerJobs(v_job) {
    console.log("volunteer", v_job);
    $(".regular_jobs").hide();
    $(".remote_jobs").hide();
    $(".partTime_jobs").hide();
    $(".freelancing").hide();
    $(".fullTimeJobs").hide();
    $(".volunTeerJobs").show();

    const formData = new FormData();

    formData.append("category", v_job);

    const volunteerResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_categorywise_job_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get Volunteer Jobs", volunteerResponse.data.data);

    const volunteerErrorCode = volunteerResponse.data.error_code;
    console.log("volunteer Error Code ", volunteerErrorCode);

    const volunteerData = volunteerResponse.data.data;
    console.log("volunteer List ", volunteerData);

    if (volunteerErrorCode == 200) {
      const volunteerListArray = volunteerData;
      console.log("volunteer list Array", volunteerListArray);
      setVolunteerData(volunteerListArray);
    } else {
      setVolunteerData([]);
    }
  }

  async function fullTimeJobs(f_job) {
    console.log("filltime", f_job);
    $(".regular_jobs").hide();
    $(".remote_jobs").hide();
    $(".partTime_jobs").hide();
    $(".freelancing").hide();
    $(".volunTeerJobs").hide();
    $(".fullTimeJobs").show();

    const formData = new FormData();

    formData.append("category", f_job);

    const fullTimeResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_categorywise_job_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get full time Jobs", fullTimeResponse.data.data);

    const fulltimeErrorCode = fullTimeResponse.data.error_code;
    console.log("full time Error Code ", fulltimeErrorCode);

    const fulltimeData = fullTimeResponse.data.data;
    console.log("full time List ", fulltimeData);

    if (fulltimeErrorCode == 200) {
      const fulltimeListArray = fulltimeData;
      console.log("full time list Array", fulltimeListArray);
      setFullTimeData(fulltimeListArray);
      setFilteredResults(fulltimeListArray);
    } else {
      setFullTimeData([]);
      setFilteredResults([]);
    }
  }

  return (
    <div className="content-wrapper">
      <div
        className="edit_container"
        id="edit"
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
            overflow: "auto",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
            }}
          >
            <label
              style={{ color: "black", fontSize: "13px", fontWeight: "700" }}
            >
              Campus Job
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="cancel"
              className="close_event ml-auto"
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              onClick={() => close_edit_modal()}
            />
          </div>
          {/* category & question */}
          <div>
            <div className="mt-2 p-0">
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
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Job Category
                      </label>

                      <p
                        style={{
                          color: "#EB2424",
                          fontWeight: "600",
                          marginLeft: "3PX",
                          fontSize: "10px",
                        }}
                      >
                        *
                      </p>
                    </div>

                    <select
                      className="form-select form-select-sm "
                      id="news_category"
                      aria-label=".form-select-sm example"
                      class="input_fields"
                      onChange={(e) => updateJobCat(e.target.value)}
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        fontSize: "10px",
                        color: "black",
                        border: "1px solid #c4c4c4",
                        borderRadius: "0px",
                        boxSizing: "border-box",
                        padding: "6px",
                      }}
                    >
                      <option
                        selected="selected"
                        style={{ padding: "6px" }}
                        value={jobCat}
                      >
                        {jobCat}
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
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Select Job Category
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-6">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Job Title
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
                      type="name"
                      autoComplete="true"
                      value={jobTitle}
                      onChange={(e) => updateJobTitle(e.target.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "0.5px solid #c4c4c4",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                      }}
                    />

                    <div
                      class="JobTitle"
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
                        Please Enter Job Title
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Company Name
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
                      type="name"
                      autoComplete="true"
                      value={jobCompanyName}
                      onChange={(e) => updateJobCompanyName(e.target.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "0.5px solid #c4c4c4",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                      }}
                    />

                    <div
                      class="CompanyName"
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
                        Please Enter Company Name
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Job Description
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

                    <textarea
                      type="name"
                      rows="4"
                      id="news_description"
                      value={jobDesc}
                      onChange={(e) => updateJobDesc(e.target.value)}
                      style={{
                        width: "100%",
                        height: "80px",
                        border: "0.5px solid #c4c4c4",
                        boxSizing: "border-box",
                        fontSize: "10px",
                      }}
                    />

                    <div
                      class="JobDesc"
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
                        Please Enter Job Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Company Logo
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
                    <label for="file-ip-1">
                      {imgData == "" ? (
                        <div>
                          <img
                            src={require("../images/no_image.png")}
                            id="comp_logo"
                            className="event_image"
                            alt="dropdown"
                            style={{ height: "100px" }}
                            onClick={() => event_image()}
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={imgData}
                            id="comp_logo"
                            className="event_image"
                            alt="dropdown"
                            style={{ height: "100px" }}
                            onClick={() => event_image()}
                          />
                        </div>
                      )}

                      <img
                        id="file-ip-1-preview"
                        style={{ height: "117px", top: "40px", left: "30px" }}
                      />
                    </label>

                    <input
                      type="file"
                      name="photo"
                      style={{ visibility: "hidden" }}
                      onChange={getImage}
                      id="file-ip-1"
                    />

                    <div
                      class="companyLogo"
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
                        Please Select Company Logo
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-0 p-0">
              <div class="row">
                <div class="col-md-6">
                  <div className="d-flex">
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Job Deadline date/time
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
                    type="datetime-local"
                    class="input_fields"
                    placeholder="dd-mm-yyyy hh-mm"
                    // className="publish_date_0n_later"
                    // id="datetime"
                    id="publishdate"
                    value={jobValidity}
                    onChange={(e) => updateJobValidity(e.target.value)}
                    min={todayy}
                    name="datetime"
                    style={{
                      fontSize: "10px",
                      color: "black",
                      border: "1px solid #c4c4c4",
                      boxSizing: "border-box",
                      width: "100%",
                      height: "35px",
                      padding: "6px",
                      background: "white",
                    }}
                  />

                  <div
                    class="EventDate"
                    style={{ marginTop: "-6px", display: "none" }}
                  >
                    <h4
                      class="login-text"
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginLeft: "0",
                      }}
                    >
                      Please Enter Event Date
                    </h4>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Budget
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
                      type="name"
                      autoComplete="true"
                      value={jobBudget}
                      onChange={(e) => updateJobBudget(e.target.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "0.5px solid #c4c4c4",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                      }}
                    />

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-0 p-0">
              <div class="row">
                <div class="col-md-11">
                  <label
                    style={{
                      color: "#1F3977",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    User Type
                  </label>

                  <div className="d-flex">
                    <input
                      type="radio"
                      id="all students"
                      name="userType"
                      checked={jobSendTo == "1"}
                      value={jobSendTo}
                      onChange={(e) => updateJobSendTo(e.target.value)}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <label
                      for="all students"
                      className="d-flex"
                      style={{
                        color: "black",
                        fontSize: "10px",
                        marginLeft: "10PX",
                        marginTop: "4px",
                        fontWeight: "600",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => all_student()}
                    >
                      <p style={{ marginLeft: "5px" }}>All Students</p>
                    </label>
                    <input
                      type="radio"
                      id="specific class"
                      name="userType"
                      value="2"
                      checked={jobSendTo == "2"}
                      onChange={(e) => updateJobSendTo(e.target.value)}
                      style={{
                        marginLeft: "78px",
                        width: "20px",
                        height: "20px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <label
                      for="specific class"
                      className="d-flex"
                      style={{
                        color: "black",
                        fontSize: "10px",
                        marginLeft: "10PX",
                        marginTop: "4PX",
                        fontWeight: "600",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => specific_class()}
                    >
                      <p style={{ marginLeft: "8px" }}>Specific Recipients</p>
                    </label>

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 p-0">
              <div class="row">
                <div
                  class="col-md-12"
                  style={{ fontSize: "12px", margin: "8px 20px" }}
                >
                  {student_name}
                </div>
              </div>
            </div>

            {/* specific student pop up */}
            <div
              className="user_type"
              style={{
                position: "absolute",
                top: "0",
                left: "0px",
                right: "0",
                bottom: "0",
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
                  top: "0",
                  right: "5px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className="d-flex"
                  style={{
                    borderBottom: "2px solid #15a312",
                    transform: "rotate(0.13deg)",
                  }}
                >
                  <label
                    style={{
                      color: "black",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Recipients
                  </label>

                  <img
                    src="dist/img/Cancel.png"
                    alt="dropdown"
                    width="21px"
                    height="21px"
                    className="close_event ml-auto"
                    // onClick={() => closeRecipient()}
                  />
                </div>

                {/* <Recipient style={{ height: "200px" }} /> */}
                <div>
                  <div
                    className="recipient_class"
                    style={{
                      marginTop: "0px",
                      height: "321px",
                      padding: "0",
                      overflow: "auto",
                    }}
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <DataTable
                        columns={eventColumns}
                        data={filteredEventItems}
                        striped
                        pagination
                        subHeader
                        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                        subHeaderComponent={subHeaderEventComponent}
                        highlightOnHover
                        defaultSortFieldId={1}
                        selectableRows
                        customStyles={customStyles}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex mt-3">
              <a
                onClick={() => close_edit_modal()}
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
                    color: "#1F3977",
                    fontWeight: "600",
                    fontSize: "13PX",
                    padding: "8px 12px",
                  }}
                />
              </a>

              <a
                href="#edit_with_protection"
                style={{ color: "grey", fontSize: "15PX" }}
              >
                <input
                  type="button"
                  className="create_btn"
                  id="delete_single_student"
                  value="Update"
                  // onClick={() => updateForm()}
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
            {/* ******************button********************** */}

            <div style={{ display: "none" }} className="saveMessage">
              Data Saved Successfully
            </div>
          </div>
        </div>
      </div>

      {/* edit popuop with password */}
      <div
        id="edit_with_protection"
        className="modaloverlay edit_popup_password"
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
              Edit Job
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

      <div id="deleterow" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message?
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure You Want To Delete This Job With Title "
                {getJobTitle}"
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
                    // onClick={() =>deleteMessage()}
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
              Delete News
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

      <div
        className="row mt-2 mb-2"
        style={{
          width: "100%",
          marginLeft: "0",
          padding: "0px 10px",
          background: "transparent",
        }}
      >
        <div
          className="col-md-5 d-flex flex-row"
          style={{ height: "100%", padding: "0px 5px" }}
        >
          <h4 style={{ color: "black", fontWeight: "600", marginTop: "7px" }}>
            List of Jobs
          </h4>
        </div>

        <div
          className="col-md-3 d-flex flex-row"
          style={{
            height: "100%",
            background: "white",
            padding: "0",
            border: "1px solid lightgrey",
          }}
        >
          <img
            src={require("../images/Search.png")}
            style={{ width: "21px", height: "21px", margin: "5px 0px 0px 3px" }}
          />
          {/* <BiSearchAlt2 style={{fontSize:"28PX",verticalAlign:"middle",margin:"3px 0px 0px 3px",color:"darkgrey"}}/> */}
          <Input
            id="search"
            type="text"
            placeholder="Search by job title"
            //value={filterText}
            onChange={(e) => searchKey(e.target.value)}
            style={{
              border: "none",
              background: "white",
              height: "32px",
              width: "100%",
              fontWeight: "500",
              fontSize: "12PX",
              paddingLeft: "5px",
            }}
          />
        </div>

        <div className="col-md-1 d-flex flex-row">
          <img
            src="dist/img/Sorting.png"
            alt="view"
            style={{ width: "28px", height: "28px" }}
            className="sort_table"
          />
        </div>
        <div className="col-md-3 d-flex flex-row">
          <div style={{ marginTop: "0px", padding: "0" }}>
            <Link to="/createJob">
              <button
                type="button"
                className="d-flex buttonContainer news-button"
                defaultValue="Sign Up"
                style={{
                  padding: "10px 15px",
                  marginTop: "0",
                  fontSize: "12PX",
                  fontWeight: "400",
                  background: "#1F3977",
                  flexWrap: "wrap",
                  borderRadius: "5px",
                  marginLeft: "auto",
                  height: "auto",
                  fontFamily: "Poppins",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
                Create Job
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div></div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        // regular jobs
        <div
          className="regular_jobs"
          style={{
            background: "white",
            margin: "10px",
            padding: "20px",
            height: "500px",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "10px", fontSize: "13px" }}>
            <a href="#remote" onClick={() => remoteJobs(remoteFriendly)}>
              <button
                id="remote_friendly_job"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "5px",
                  padding: "5px 15px",
                  background: "white",
                }}
              >
                Remote Friendly
              </button>
            </a>

            <a href="#partTime" onClick={() => partTimeJobs(parttime)}>
              <button
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "5px",
                  padding: "5px 15px",
                  background: "white",
                  marginLeft: "10px",
                }}
              >
                Part Time
              </button>
            </a>

            <a href="#freelance_Jobs" onClick={() => freelanceJobs(freelance)}>
              <button
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "5px",
                  padding: "5px 15px",
                  background: "white",
                  marginLeft: "10px",
                }}
              >
                Freelance
              </button>
            </a>

            <a href="#volunteer_Jobs" onClick={() => volunteerJobs(volunteer)}>
              <button
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "5px",
                  padding: "5px 15px",
                  background: "white",
                  marginLeft: "10px",
                }}
              >
                Volunteer
              </button>
            </a>

            <a href="#fulltime_Jobs" onClick={() => fullTimeJobs(fulltime)}>
              <button
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "5px",
                  padding: "5px 15px",
                  background: "white",
                  marginLeft: "10px",
                }}
              >
                Full Time
              </button>
            </a>
          </div>
          <p
            style={{ fontWeight: "600", marginLeft: "10px", fontSize: "11PX" }}
          >
            Recently added
          </p>

          {filteredResults.map((item) => {
            console.log("get item data", item);
            var created_date = moment(item.created_at).format("D MMM YYYY");
            console.log("print created date", created_date);

            var deadline_date = moment(item.validity).format("D MMM YYYY");
            console.log("print created date", deadline_date);
            return (
              <div>
                <div
                  style={{
                    background: "#f5f5f5",
                    margin: "20px 10px 0px 10px",
                    padding: "10px",
                    fontSize: "12px",
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "20px" }}>
                    {item.profile_image == " " ? (
                      <div>
                        <img
                          src={require("../images/no_image.png")}
                          alt="no image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={item.profile_image}
                          style={{ height: "100px", width: "100px" }}
                        />
                      </div>
                    )}
                    {/* <img src={item.profile_image} alt="profile_image" style={{ height: "80px", width: "100px" }} /> */}
                  </div>
                  <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                    <div
                      className="d-flex"
                      style={{
                        borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                        paddingBottom: "10px",
                      }}
                    >
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Title:
                      </p>{" "}
                      <p style={{ marginLeft: "3px", fontWeight: "600" }}>
                        {item.job_title}
                      </p>
                      <p
                        style={{
                          color: "#2D5DD0",
                          marginLeft: "100px",
                          fontWeight: "600",
                        }}
                      >
                        Company Name:
                      </p>
                      <p style={{ fontWeight: "600", marginLeft: "3px" }}>
                        {item.company_name}
                      </p>
                      <p style={{ marginLeft: "auto", fontWeight: "600" }}>
                        {created_date}
                      </p>
                    </div>

                    <div style={{ paddingTop: "10PX" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div className="d-flex">
                    <div style={{ marginLeft: "auto" }}>
                      <p style={{ color: "#15A312", textAlign: "center" }}>
                        Applied
                      </p>
                      <p>{item.apply_job_count}</p>
                    </div>

                    <div style={{ marginLeft: "60px" }}>
                      <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                        Budget
                      </p>
                      <p>{item.budget}</p>
                    </div>

                    <div style={{ marginLeft: "60px" }}>
                      <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                        Deadline
                      </p>
                      <p>{deadline_date}</p>
                    </div>

                    <a
                      className="cta"
                      href="#edit"
                      style={{
                        backgroundColor: "transparent",
                        marginLeft: "60px",
                      }}
                    >
                      <img
                        src={require("../images/Pencil.png")}
                        onClick={() => editJob(item.job_id)}
                        alt="edit"
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </a>

                    <a
                      className="cta"
                      href="#deleterow"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "2px",
                        }}
                        onClick={() => deleteJob(item.job_id, item.job_title)}
                        src={require("../images/delete.png")}
                      />
                      &nbsp;
                    </a>

                    {/* <a className="cta" href="#deleterow" style={{ backgroundColor: "transparent" }}>
                      <img style={{ width: "18px", height: "18px", marginLeft: "2px" }} src={require('../images/Doughnut Chart.png')} />&nbsp;
                    </a> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* **********************************Remote Jobs start****************************************************** */}
      <div
        className="remote_jobs"
        id="remote"
        style={{
          background: "white",
          margin: "10px",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "10px", fontSize: "13px" }}>
          <a href="#remote" onClick={() => remoteJobs(remoteFriendly)}>
            <button
              id="remote_friendly_job"
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
              }}
            >
              Remote Friendly
            </button>
          </a>

          <a href="#partTime" onClick={() => partTimeJobs(parttime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Part Time
            </button>
          </a>

          <a href="#freelance_Jobs" onClick={() => freelanceJobs(freelance)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Freelance
            </button>
          </a>

          <a href="#volunteer_Jobs" onClick={() => volunteerJobs(volunteer)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Volunteer
            </button>
          </a>

          <a href="#fulltime_Jobs" onClick={() => fullTimeJobs(fulltime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Full Time
            </button>
          </a>
        </div>

        <p style={{ fontWeight: "600", marginLeft: "10px", fontSize: "11PX" }}>
          Remote Friendly Jobs
        </p>

        {filteredResults.map((remote) => {
          var created_date = moment(remote.created_at).format("D MMM YYYY");

          var deadline_date = moment(remote.validity).format("D MMM YYYY");

          return (
            <div>
              <div
                style={{
                  background: "#f5f5f5",
                  margin: "20px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
                className="d-flex"
              >
                <div style={{ padding: "20px" }}>
                  {remote.profile_image == " " ? (
                    <div>
                      <img
                        src={require("../images/no_image.png")}
                        alt="no image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={remote.profile_image}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  )}
                  {/* <img src={item.profile_image} alt="profile_image" style={{ height: "80px", width: "100px" }} /> */}
                </div>
                <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                  <div
                    className="d-flex"
                    style={{
                      borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                      paddingBottom: "10px",
                    }}
                  >
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Title:
                    </p>{" "}
                    <p style={{ marginLeft: "3px", fontWeight: "600" }}>
                      {remote.job_title}
                    </p>
                    <p
                      style={{
                        color: "#2D5DD0",
                        marginLeft: "100px",
                        fontWeight: "600",
                      }}
                    >
                      Company Name:
                    </p>
                    <p style={{ fontWeight: "600", marginLeft: "3px" }}>
                      {remote.company_name}
                    </p>
                    <p style={{ marginLeft: "auto", fontWeight: "600" }}>
                      {created_date}
                    </p>
                  </div>

                  <div style={{ paddingTop: "10PX" }}>
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Description
                    </p>
                    <p>{remote.description}</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgb(196 196 196 / 32%)",
                  margin: "0px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                <div className="d-flex">
                  <div style={{ marginLeft: "auto" }}>
                    <p style={{ color: "#15A312", textAlign: "center" }}>
                      Applied
                    </p>
                    <p>{remote.apply_job_count}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Budget
                    </p>
                    <p>{remote.budget}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Deadline
                    </p>
                    <p>{deadline_date}</p>
                  </div>

                  <a
                    className="cta"
                    href="#edit"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "60px",
                    }}
                  >
                    <img
                      src={require("../images/Pencil.png")}
                      onClick={() => editJob(remote.job_id)}
                      alt="edit"
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      onClick={() => deleteJob(remote.job_id, remote.job_title)}
                      src={require("../images/delete.png")}
                    />
                    &nbsp;
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      src={require("../images/Doughnut Chart.png")}
                    />
                    &nbsp;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* **********************************Part time jobs start****************************************************** */}
      <div
        className="partTime_jobs"
        id="partTime"
        style={{
          background: "white",
          margin: "10px",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "10px", fontSize: "13px" }}>
          <a href="#remote" onClick={() => remoteJobs(remoteFriendly)}>
            <button
              id="remote_friendly_job"
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
              }}
            >
              Remote Friendly
            </button>
          </a>

          <a href="#partTime" onClick={() => partTimeJobs(parttime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Part Time
            </button>
          </a>

          <a href="#freelance_Jobs" onClick={() => freelanceJobs(freelance)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Freelance
            </button>
          </a>

          <a href="#volunteer_Jobs" onClick={() => volunteerJobs(volunteer)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Volunteer
            </button>
          </a>

          <a href="#fulltime_Jobs" onClick={() => fullTimeJobs(fulltime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Full time
            </button>
          </a>
        </div>
        <p style={{ fontWeight: "600", marginLeft: "10px", fontSize: "11px" }}>
          Part Time Jobs
        </p>

        {filteredResults.map((part) => {
          var created_date = moment(part.created_at).format("D MMM YYYY");

          var deadline_date = moment(part.validity).format("D MMM YYYY");

          return (
            <div>
              <div
                style={{
                  background: "#f5f5f5",
                  margin: "20px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
                className="d-flex"
              >
                <div style={{ padding: "20px" }}>
                  {part.profile_image == " " ? (
                    <div>
                      <img
                        src={require("../images/no_image.png")}
                        alt="no image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={part.profile_image}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  )}
                  {/* <img src={item.profile_image} alt="profile_image" style={{ height: "80px", width: "100px" }} /> */}
                </div>
                <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                  <div
                    className="d-flex"
                    style={{
                      borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                      paddingBottom: "10px",
                    }}
                  >
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Title:
                    </p>{" "}
                    <p style={{ marginLeft: "3px", fontWeight: "600" }}>
                      {part.job_title}
                    </p>
                    <p
                      style={{
                        color: "#2D5DD0",
                        marginLeft: "100px",
                        fontWeight: "600",
                      }}
                    >
                      Company Name:
                    </p>
                    <p style={{ fontWeight: "600", marginLeft: "3px" }}>
                      {part.company_name}
                    </p>
                    <p style={{ marginLeft: "auto", fontWeight: "600" }}>
                      {created_date}
                    </p>
                  </div>

                  <div style={{ paddingTop: "10PX" }}>
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Description
                    </p>
                    <p>{part.description}</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgb(196 196 196 / 32%)",
                  margin: "0px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                <div className="d-flex">
                  <div style={{ marginLeft: "auto" }}>
                    <p style={{ color: "#15A312", textAlign: "center" }}>
                      Applied
                    </p>
                    <p>{part.apply_job_count}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Budget
                    </p>
                    <p>{part.budget}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Deadline
                    </p>
                    <p>{deadline_date}</p>
                  </div>

                  <a
                    className="cta"
                    href="#edit"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "60px",
                    }}
                  >
                    <img
                      src={require("../images/Pencil.png")}
                      onClick={() => editJob(part.job_id)}
                      alt="edit"
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      onClick={() => deleteJob(part.job_id, part.job_title)}
                      src={require("../images/delete.png")}
                    />
                    &nbsp;
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      src={require("../images/Doughnut Chart.png")}
                    />
                    &nbsp;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* *********************************Freelance Jobs Start *********************************************** */}
      <div
        className="freelancing"
        id="freelance_Jobs"
        style={{
          background: "white",
          margin: "10px",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "10px", fontSize: "13px" }}>
          <a href="#remote" onClick={() => remoteJobs(remoteFriendly)}>
            <button
              id="remote_friendly_job"
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
              }}
            >
              Remote Friendly
            </button>
          </a>

          <a href="#partTime" onClick={() => partTimeJobs(parttime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Part Time
            </button>
          </a>

          <a href="#freelance_Jobs" onClick={() => freelanceJobs(freelance)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Freelance
            </button>
          </a>

          <a href="#volunteer_Jobs" onClick={() => volunteerJobs(volunteer)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Volunteer
            </button>
          </a>

          <a href="#fulltime_Jobs" onClick={() => fullTimeJobs(fulltime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Full time
            </button>
          </a>
        </div>

        <p style={{ fontWeight: "600", marginLeft: "10px", fontSize: "11PX" }}>
          Freelance Jobs
        </p>

        {filteredResults.map((free) => {
          var created_date = moment(free.created_at).format("D MMM YYYY");

          var deadline_date = moment(free.validity).format("D MMM YYYY");

          return (
            <div>
              <div
                style={{
                  background: "#f5f5f5",
                  margin: "20px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
                className="d-flex"
              >
                <div style={{ padding: "20px" }}>
                  {free.profile_image == " " ? (
                    <div>
                      <img
                        src={require("../images/no_image.png")}
                        alt="no image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={free.profile_image}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  )}
                  {/* <img src={item.profile_image} alt="profile_image" style={{ height: "80px", width: "100px" }} /> */}
                </div>
                <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                  <div
                    className="d-flex"
                    style={{
                      borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                      paddingBottom: "10px",
                    }}
                  >
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Title:
                    </p>{" "}
                    <p style={{ marginLeft: "3px", fontWeight: "600" }}>
                      {free.job_title}
                    </p>
                    <p
                      style={{
                        color: "#2D5DD0",
                        marginLeft: "100px",
                        fontWeight: "600",
                      }}
                    >
                      Company Name:
                    </p>
                    <p style={{ fontWeight: "600", marginLeft: "3px" }}>
                      {free.company_name}
                    </p>
                    <p style={{ marginLeft: "auto", fontWeight: "600" }}>
                      {created_date}
                    </p>
                  </div>

                  <div style={{ paddingTop: "10PX" }}>
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Description
                    </p>
                    <p>{free.description}</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgb(196 196 196 / 32%)",
                  margin: "0px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                <div className="d-flex">
                  <div style={{ marginLeft: "auto" }}>
                    <p style={{ color: "#15A312", textAlign: "center" }}>
                      Applied
                    </p>
                    <p>{free.apply_job_count}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Budget
                    </p>
                    <p>{free.budget}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Deadline
                    </p>
                    <p>{deadline_date}</p>
                  </div>

                  <a
                    className="cta"
                    href="#edit"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "60px",
                    }}
                  >
                    <img
                      src={require("../images/Pencil.png")}
                      onClick={() => editJob(free.job_id)}
                      alt="edit"
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      onClick={() => deleteJob(free.job_id, free.job_title)}
                      src={require("../images/delete.png")}
                    />
                    &nbsp;
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      src={require("../images/Doughnut Chart.png")}
                    />
                    &nbsp;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* **********************************Volunteer Job Start************************************************* */}

      <div
        className="volunTeerJobs"
        id="volunteer_Jobs"
        style={{
          background: "white",
          margin: "10px",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "10px", fontSize: "13px" }}>
          <a href="#remote" onClick={() => remoteJobs(remoteFriendly)}>
            <button
              id="remote_friendly_job"
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
              }}
            >
              Remote Friendly
            </button>
          </a>

          <a href="#partTime" onClick={() => partTimeJobs(parttime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Part Time
            </button>
          </a>

          <a href="#freelance_Jobs" onClick={() => freelanceJobs(freelance)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Freelance
            </button>
          </a>

          <a href="#volunteer_Jobs" onClick={() => volunteerJobs(volunteer)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Volunteer
            </button>
          </a>

          <a href="#fulltime_Jobs" onClick={() => fullTimeJobs(fulltime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Full time
            </button>
          </a>
        </div>
        <p style={{ fontWeight: "600", marginLeft: "10px", fontSize: "11PX" }}>
          Volunteer Jobs
        </p>

        {filteredResults.map((vol) => {
          var created_date = moment(vol.created_at).format("D MMM YYYY");

          var deadline_date = moment(vol.validity).format("D MMM YYYY");

          return (
            <div>
              <div
                style={{
                  background: "#f5f5f5",
                  margin: "20px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
                className="d-flex"
              >
                <div style={{ padding: "20px" }}>
                  {vol.profile_image == " " ? (
                    <div>
                      <img
                        src={require("../images/no_image.png")}
                        alt="no image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={vol.profile_image}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  )}
                  {/* <img src={item.profile_image} alt="profile_image" style={{ height: "80px", width: "100px" }} /> */}
                </div>
                <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                  <div
                    className="d-flex"
                    style={{
                      borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                      paddingBottom: "10px",
                    }}
                  >
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Title:
                    </p>{" "}
                    <p style={{ marginLeft: "3px", fontWeight: "600" }}>
                      {vol.job_title}
                    </p>
                    <p
                      style={{
                        color: "#2D5DD0",
                        marginLeft: "100px",
                        fontWeight: "600",
                      }}
                    >
                      Company Name:
                    </p>
                    <p style={{ fontWeight: "600", marginLeft: "3px" }}>
                      {vol.company_name}
                    </p>
                    <p style={{ marginLeft: "auto", fontWeight: "600" }}>
                      {created_date}
                    </p>
                  </div>

                  <div style={{ paddingTop: "10PX" }}>
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Description
                    </p>
                    <p>{vol.description}</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgb(196 196 196 / 32%)",
                  margin: "0px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                <div className="d-flex">
                  <div style={{ marginLeft: "auto" }}>
                    <p style={{ color: "#15A312", textAlign: "center" }}>
                      Applied
                    </p>
                    <p>{vol.apply_job_count}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Budget
                    </p>
                    <p>{vol.budget}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Deadline
                    </p>
                    <p>{deadline_date}</p>
                  </div>

                  <a
                    className="cta"
                    href="#edit"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "60px",
                    }}
                  >
                    <img
                      src={require("../images/Pencil.png")}
                      onClick={() => editJob(vol.job_id)}
                      alt="edit"
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      onClick={() => deleteJob(vol.job_id, vol.job_title)}
                      src={require("../images/delete.png")}
                    />
                    &nbsp;
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      src={require("../images/Doughnut Chart.png")}
                    />
                    &nbsp;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* *****************************Full time Job Start *************************************************** */}

      <div
        className="fullTimeJobs"
        id="fulltime_Jobs"
        style={{
          background: "white",
          margin: "10px",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "10px", fontSize: "13px" }}>
          <a href="#remote" onClick={() => remoteJobs(remoteFriendly)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
              }}
            >
              Remote Friendly
            </button>
          </a>

          <a href="#partTime" onClick={() => partTimeJobs(parttime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Part Time
            </button>
          </a>

          <a href="#freelance_Jobs" onClick={() => freelanceJobs(freelance)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Freelance
            </button>
          </a>

          <a href="#volunteer_Jobs" onClick={() => volunteerJobs(volunteer)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Volunteer
            </button>
          </a>

          <a href="#fulltime_Jobs" onClick={() => fullTimeJobs(fulltime)}>
            <button
              style={{
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "5px 15px",
                background: "white",
                marginLeft: "10px",
              }}
            >
              Full time
            </button>
          </a>
        </div>
        <p style={{ fontWeight: "600", marginLeft: "10px", fontSize: "11PX" }}>
          Full Time Jobs
        </p>

        {filteredResults.map((full) => {
          var created_date = moment(full.created_at).format("D MMM YYYY");

          var deadline_date = moment(full.validity).format("D MMM YYYY");

          return (
            <div>
              <div
                style={{
                  background: "#f5f5f5",
                  margin: "20px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
                className="d-flex"
              >
                <div style={{ padding: "20px" }}>
                  {full.profile_image == " " ? (
                    <div>
                      <img
                        src={require("../images/no_image.png")}
                        alt="no image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={full.profile_image}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  )}
                  {/* <img src={item.profile_image} alt="profile_image" style={{ height: "80px", width: "100px" }} /> */}
                </div>
                <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                  <div
                    className="d-flex"
                    style={{
                      borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                      paddingBottom: "10px",
                    }}
                  >
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Title:
                    </p>{" "}
                    <p style={{ marginLeft: "3px", fontWeight: "600" }}>
                      {full.job_title}
                    </p>
                    <p
                      style={{
                        color: "#2D5DD0",
                        marginLeft: "100px",
                        fontWeight: "600",
                      }}
                    >
                      Company Name:
                    </p>
                    <p style={{ fontWeight: "600", marginLeft: "3px" }}>
                      {full.company_name}
                    </p>
                    <p style={{ marginLeft: "auto", fontWeight: "600" }}>
                      {created_date}
                    </p>
                  </div>

                  <div style={{ paddingTop: "10PX" }}>
                    <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                      Job Description
                    </p>
                    <p>{full.description}</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgb(196 196 196 / 32%)",
                  margin: "0px 10px 0px 10px",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                <div className="d-flex">
                  <div style={{ marginLeft: "auto" }}>
                    <p style={{ color: "#15A312", textAlign: "center" }}>
                      Applied
                    </p>
                    <p>{full.apply_job_count}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Budget
                    </p>
                    <p>{full.budget}</p>
                  </div>

                  <div style={{ marginLeft: "60px" }}>
                    <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                      Deadline
                    </p>
                    <p>{deadline_date}</p>
                  </div>

                  <a
                    className="cta"
                    href="#edit"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "60px",
                    }}
                  >
                    <img
                      src={require("../images/Pencil.png")}
                      onClick={() => editJob(full.job_id)}
                      alt="edit"
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      onClick={() => deleteJob(full.job_id, full.job_title)}
                      src={require("../images/delete.png")}
                    />
                    &nbsp;
                  </a>

                  <a
                    className="cta"
                    href="#deleterow"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                      }}
                      src={require("../images/Doughnut Chart.png")}
                    />
                    &nbsp;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
