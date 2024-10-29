import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import SummerNote from "../SummerNote/SummerNote";
import toast, { Toaster } from "react-hot-toast";
import JobPreview from "./JobPreview";

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

export function Jobssssssssssssss() {
  $(document).ready(function () {
    $("ul.tabs li").click(function () {
      var tab_id = $(this).attr("data-tab");

      $("ul.tabs li").removeClass("current");
      $(".tab-content").removeClass("current");

      $(this).addClass("current");
      $("#" + tab_id).addClass("current");
    });
  });

  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const history = useHistory();

  const [remoteData, setRemoteData] = useState([]);

  const [partTimeData, setPartTimeData] = useState([]);
  const [freelanceData, setFreelanceData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [fullTimeData, setFullTimeData] = useState([]);
  const [childNewsData, setChildNewsData] = useState([]);
  const [studentId, updateStudentId] = useState("");

  const [addPersona, updatePersona] = useState([]);
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const [errorCodePersona, updateErrorCodePersona] = useState("");

  const [jobCat, updateJobCat] = useState("");
  const [jobTitle, updateJobTitle] = useState("");
  const [jobCompanyName, updateJobCompanyName] = useState("");
  const [companyEmail, updateCompanyEmail] = useState("");
  const [jobDesc, updateJobDesc] = useState("");
  const [jobProfileImage, updateJobProfileImage] = useState("");
  const [jobValidity, updateJobValidity] = useState("");
  const [jobBudget, updateJobBudget] = useState("");
  const [jobSendTo, updateJobSendTo] = useState("");
  const [jobID, updateJobID] = useState("");

  const [showFullContent, setShowFullContent] = useState(false);

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

  var todayy = "";
  todayy = new Date().toISOString().slice(0, 16);

  // const window = new JSDOM('').window;
  // const purify = DOMPurify(window);
  // const clean = DOMPurify.sanitize('<b>hello there</b>');

  const toggleContent = (index) => {
    setShowFullContent((prevShowFullContent) => {
      const newShowFullContent = [...prevShowFullContent];
      newShowFullContent[index] = !newShowFullContent[index];
      return newShowFullContent;
    });
  };

  const [filteredResults, setFilteredResults] = useState([]);
  // console.log("filteredResults-------------", filteredResults);


  // async function fetchList() {
  //   try {
  //     setIsLoading(true);
  //     const fetchJobResponse = await axios.get(
  //       process.env.REACT_APP_API_KEY + "admin_get_job_list",
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",

  //           Authorization: token,
  //         },
  //       }
  //     );

  //     setIsLoading(false);

  //     const jobErrorCode = fetchJobResponse.data.error_code;
  //     const jobData = fetchJobResponse.data.data;
  //     if (jobErrorCode == 200) {
  //       const jobListArray = jobData;

  //       setData(jobListArray);
  //       setFilteredResults(jobListArray);
  //     } else {
  //       setData([]);
  //       setFilteredResults([]);
  //     }
  //   } catch (err) {
  //     console.log("Log in Fail", err);
  //     setIsLoading(false);
  //   }
  // }

  async function fetchList() {
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

      setIsLoading(false);
      const jobErrorCode = fetchJobResponse.data.error_code;
      const jobData = fetchJobResponse.data.data;
      if (jobErrorCode == 200) {
        setData(jobData);
        setFilteredResults(jobData);
        setShowFullContent(new Array(jobData.length).fill(false));
      } else {
        setData([]);
        setFilteredResults([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  const summernoteCssFunc = () => {
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height", "200px");
  };

  useEffect(() => {
    getUserDetails();
    fetchList();
    summernoteCssFunc();
  }, []);

  //  const sanitizer = dompurify.sanitize;

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

      setEventData(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchStudentList();
    // getUserDetails();
  }, []);

  const [filterEventText, setFilterEventText] = React.useState("");
  const [
    resetEventPaginationToggle,
    setEventResetPaginationToggle,
  ] = React.useState(false);

  // const filteredEventItems = eventData.filter(
  //   (item) =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterEventText.toLowerCase()) !== -1
  // );

  // const subHeaderEventComponent = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setEventResetPaginationToggle(!resetEventPaginationToggle);
  //       setFilterEventText("");
  //     }
  //   };

  //   return (

  //     <div></div>
  //   );
  // }, [filterEventText, resetEventPaginationToggle]);

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

    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    } else { toast.error(deleteNewsResponse.data.message) }
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

    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateDeletePassword("");
      $(".deleteJobWithPass").hide();
      deleteNewsApi();
    } else {
      toast.error(deleteNewsResponse.data.message)
    }
  }

  // async function editWithPassword() {
  //   const formData = new FormData();

  //   formData.append("username", emailAddress);
  //   formData.append("password", deletePassword);
  //   formData.append("campus_id", campudId);

  //   const deleteNewsResponse = await axios.post(
  //     process.env.REACT_APP_API_KEY + "admin_check_password",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",

  //         Authorization: token,
  //       },
  //     }
  //   );

  //   updatedeleteErrorCode(deleteNewsResponse.data.error_code);
  //   updatedeleteErrorMessage(deleteNewsResponse.data.message);

  //   if (deleteNewsResponse.data.error_code == 200) {
  //     updateForm();
  //   }
  // }
  const handleButton = () => {
    fetchList();
    toast.success("Job Deleted Successfully!!");
    fetchList();
  };

  const handleEditButton = () => {
    fetchList();
    toast.success("Job Edited Successfully!!");
  };
  // delete news
  const [getJobTitle, updateGetJobTitle] = useState("");
  const [getJobID, updateGetJobID] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");

  function deleteJob(job_id, job_title) {
    updateGetJobTitle(job_title);
    updateGetJobID(job_id);
    $(".edit_campus_modal").hide();
    $(".deleteJobModal").show();
  }

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

      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        updateDeletePassword("");
        $(".deleteJobWithPass").hide();
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

    formData.append("description", jobDesc);
    formData.append("j_id", jobID);
    formData.append("image", jobProfileImage);
    formData.append("category", jobCat);
    formData.append("comp_email", companyEmail);

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
    setIsEditLoading(false);

    if (eventResponse.data.error_code == 200) {
      $(".editWithPassModal").hide();
      $(".edit_container").hide();
      handleEditButton();
    } else { toast.error(eventResponse.data.message) }
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
    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }

  const [imgData, setImgData] = useState(null);

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

      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  async function editJob(id) {
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
    //  console.log("editjobResponse---------------",editjobResponse);
    $(".edit_campus_modal").hide();
    if (editjobResponse.data.error_code == 200) {
      $(".edit_container").show();
      editjobResponse.data.data.map((item) => {
        updateJobCat(item.category);
        updateJobTitle(item.job_title);
        updateJobCompanyName(item.company_name);
        updateCompanyEmail(item.comp_email);
        updateJobDesc(item.description);
        updateJobProfileImage(item.profile_image);
        setImgData(item.profile_image);
        updateJobValidity(item.validity);
        updateJobBudget(item.budget);
        updateJobSendTo(item.send_to);
        updateJobID(item.job_id);

        // if (item.send_to == 2) {

        //   const name = item.send_to_student.map((item) => item.student_name);
        //   const student_id = item.send_to_student.map((item) => item.student_id);

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

  async function remoteJobs(r_job) {
    if (r_job == 6) {
      fetchList();
    } else {
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

      const remoteErrorCode = remoteResponse.data.error_code;

      if (remoteErrorCode == 200) {
        const jobData = remoteResponse.data.data;
        setRemoteData(jobData);
        setFilteredResults(jobData);
      } else {
        setRemoteData([]);
        setFilteredResults([]);
      }
    }
  }

  function closeRecipient() {
    $(".user_type").hide();
  }

  const handelSummenrnote = (e) => {
    updateJobDesc(e);
  };

  const openActionsModal = (e) => {

    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };

  const showJobPreview = (j_id) => {
    history.push("/jobpreview", { j_id });
  };

  function update_edited_job() {
    $(".editWithPassModal").show();
    $(".edit_container").hide();
  }

  function deletePopupFunc() {
    $(".deleteJobWithPass").show();
    $(".deleteJobModal").hide();
  }

  function closeDeleteNewsModal() {
    $(".deleteJobModal").hide();
    $(".edit_campus_modal").hide();
    $(".deleteJobWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("");
  }

  const close_welcome_modal = () => {
    $(".welcome_modal").hide();
  }

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="edit_container">
        <div className="edit_container_inner">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Campus Job</label>
            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              className="close_event ml-auto cancel_img"
              onClick={() => close_edit_modal()}
            />
          </div>

          <div className="preview_form">
            <div className="edit_top_label">
              <p>Category, Company Name, Job Title & Company Email</p>
            </div>
            <div className="edit_border_class">
              <div class="row">
                <div class="col-md-3">
                  <div>
                    <label className="all_labels">Category :</label>
                  </div>
                </div>
                <div class="col-md-9">
                  <select
                    className="edit_inputs_class"
                    id="news_category"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateJobCat(e.target.value)}
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

                <div class="col-md-3">
                  <div className="">
                    <div>
                      <label className="all_labels">Name :</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <input
                    className="edit_inputs_class"
                    type="name"
                    autoComplete="true"
                    value={jobCompanyName}
                    onChange={(e) => updateJobCompanyName(e.target.value)}
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
                <div class="col-md-3">
                  <div className="">
                    <div>
                      <label className="all_labels">Title :</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <input
                    className="edit_inputs_class"
                    type="name"
                    autoComplete="true"
                    value={jobTitle}
                    onChange={(e) => updateJobTitle(e.target.value)}
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
                <div class="col-md-3">
                  <div className="">
                    <div>
                      <label className="all_labels">Email :</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <input
                    className="edit_inputs_class"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => updateCompanyEmail(e.target.value)}
                  />

                  <div
                    class="CompanyEmail"
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
                      Please Enter Company Email
                    </h4>
                  </div>
                </div>
                {/* <div class="col-md-6 mt-2">
                  <div className="d-flex">
                    <label className="all_labels">Job Deadline date</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="datetime-local"
                    class="input_fields all_edit_inputs"
                    placeholder="dd-mm-yyyy hh-mm"
                    id="publishdate"
                    value={jobValidity}
                    onChange={(e) => updateJobValidity(e.target.value)}
                    min={todayy}
                    name="datetime"
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
                </div> */}
              </div>
            </div>

            <div className="edit_top_label">
              <p> Company Logo</p>
            </div>

            <div className="edit_border_class">
              <div class="row">
                <div class="col-md-12">
                  <div>
                    <label for="file-ip-1" style={{ marginBottom: "0px" }}>
                      <img
                        src={imgData}
                        id="comp_logo"
                        className="event_image"
                        alt="dropdown"
                        style={{ height: "60px", width: "60px" }}
                        onClick={() => event_image()}
                      />
                      <img
                        id="file-ip-1-preview"
                        style={{
                          display: "none",
                          height: "60px",
                          width: "60px",
                        }}
                      />
                    </label>

                    <input
                      type="file"
                      name="photo"
                      style={{ visibility: "hidden", display: "none" }}
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

            <div className="">
              <div className="edit_top_label">
                <p> Job Description</p>
              </div>
              <div class="">
                {/* <textarea
                            id="publishdate"
                            className="edit_border_class edit_inputs_class"
                            value={jobDesc}
                            onChange={(e) =>handelSummenrnote(e.target.value)}
                            name="birthdaytime"
                            style={{height:"180px"}}
                          /> */}

                <SummerNote _onChange={handelSummenrnote} value={jobDesc} />

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

            {/* <div className="mt-2 p-0 border_class2 edit_row_padding">
              <div class="row">
                <div class="col-md-7">
                  <div className="d-flex">
                    <label className="all_labels">Job Deadline date/time</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="datetime-local"
                    class="input_fields all_edit_inputs"
                    placeholder="dd-mm-yyyy hh-mm"
                    id="publishdate"
                    value={jobValidity}
                    onChange={(e) => updateJobValidity(e.target.value)}
                    min={todayy}
                    name="datetime"
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
                <div class="col-md-5">
                  <div className="edit_left_padding">
                    <div className="d-flex">
                      <label className="all_labels">Budget</label>

                      <p className="all_stars">*</p>
                    </div>
                    <input
                      className="all_edit_inputs"
                      type="name"
                      autoComplete="true"
                      value={jobBudget}
                      onChange={(e) => updateJobBudget(e.target.value)}
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
            </div> */}

            {/* <div className="mt-2 p-0 border_class2 edit_row_padding">
              <div class="row">
                <div class="col-md-11">
                  <label className="all_labels">User Type</label>

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
            </div> */}

            {/* <div
              className="user_type"
              style={{
                position: "fixed",
                top: "0",
                left: "0px",
                right: "0",
                bottom: "0",
                background: "rgba(0,0,0,0.5)",
                padding: "10px",
                width: "100%",
                height: "100%",
                zIndex: "20",
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
                    style={{
                      color: "black",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Recipients
                  </label>

                  <img
                    src="dist/img/Cancel.png"
                    alt="dropdown"
                    style={{ width: "20px", height: "20px" }}
                    className="close_event ml-auto"
                    onClick={() => closeRecipient()}
                  />
                </div>

                <div
                  id="exTab2"
                  class="container"
                  style={{ marginTop: "10PX", height: "100%" }}
                >
                  <ul class="nav nav-tabs">
                    <li class="active">
                      <a
                        href="#1"
                        data-toggle="tab"
                        style={{ padding: "10px 20px" }}
                      >
                        Persona
                      </a>
                    </li>
                    <li style={{ marginLeft: "10px" }}>
                      <a href="#2" data-toggle="tab">
                        Class
                      </a>
                    </li>
                    <li style={{ marginLeft: "10px" }}>
                      <a href="#3" data-toggle="tab">
                        Individual
                      </a>
                    </li>
                  </ul>

                  <div class="tab-content " style={{ height: "100%" }}>
                    <div
                      class="tab-pane active"
                      id="1"
                      style={{ height: "100%" }}
                    >

                      <div
                        id="exTab4"
                        class="container"
                        style={{ marginTop: "0PX", height: "100%" }}
                      >
                        <ul class="nav nav_tabs">
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
                        </ul>


                        <div
                          class="tab-content "
                          style={{ padding: "0px", height: "auto" }}
                        >
                          <div
                            class="tab-pane active"
                            id="4"
                            style={{ height: "100%" }}
                          >

                            <NewPersonaRecipient
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
                                className=" form-buttons3"
                                defaultValue="Sign Up"
                                value="Cancel"
                                style={{
                                  fontWeight: "500",
                                  border: "none",
                                  color: "#1F3977",
                                  borderRadius: "6px",
                                  marginLeft: "auto",
                                  backgroundColor: "transparent",
                                  padding: "10px 40px",
                                  fontSize: "10PX",
                                  fontWeight: "600",
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


                    <div class="tab-pane" id="2">
                      <NewClassRecipient
                        style={{ height: "100%" }}
                        passData={passData}
                      />
                    </div>

                    <div class="tab-pane" id="3">


                      <div
                        id="exTab3"
                        class="container"
                        style={{ marginTop: "0PX", height: "100%" }}
                      >
                        <ul class="nav nav_tabs">
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
                        </ul>

                        <div
                          class="tab-content "
                          style={{ padding: "0px", height: "auto" }}
                        >
                          <div
                            class="tab-pane active"
                            id="6"
                            style={{ height: "100%" }}
                          >

                            <NewRecipient
                              style={{ height: "100%" }}
                              passData={passData}
                            />
                          </div>
                          <div class="tab-pane" id="7">
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
                                      placeholder="Your Title goes here..."
                                      autoComplete="true"
                                      style={{
                                        boxSizing: "border-box",
                                        fontSize: "12px",
                                        paddingLeft: "5PX",
                                      }}
                                    />

                                    <div className="d-flex mt-3">
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
                                      {excelError_code == 200 ? (
                                        <div
                                          style={{
                                            color: "green",
                                            fontSize: "11px",
                                            marginLeft: "20px",
                                          }}
                                        >
                                          {excelError_message}
                                        </div>
                                      ) : (
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",
                                            marginLeft: "20px",
                                            display: "none",
                                          }}
                                        >
                                          Students are not beed added
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div style={{ color: "green", marginLeft: "50px" }}>
                              {errorMessagePersona}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="d-flex mt-2 edit_buttons_div border_class2">

              <button
                type="button"
                className="edit_cancel_button"
                value="Cancel"
                onClick={() => close_edit_modal()}
              >Cancel</button>

              <button
                className="edit_update_button"
                id="delete_single_student"
                value="Update"
                onClick={() => update_edited_job()}
              >Update</button>

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
              <p className="modal_body_p" style={{ marginLeft: "5px" }}>
                You are editing a screen. This operation cannot be
              </p>
            </div>

            <p className="modal_body_p">
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

      <div
        className="modal fade deleteJobModal"
        id="deleteJobModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Message
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeDeleteNewsModal}
              >
                <span aria-hidden="true">
                  <img
                    src="dist/img/Cancel.png"
                    className="cancel_img"
                  />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <p className="pl-3 pb-2 modal_body_p">
                Your thoughtful reconsideration is encouraged, as this
                information holds significance. Thank you for your
                consideration.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="delete_cancel_btn"
                data-dismiss="modal"
                onClick={closeDeleteNewsModal}
              >
                Cancel
              </button>
              <button
                className="delete_btn"
                onClick={deletePopupFunc}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade deleteJobWithPass"
        id="deleteJobWithPass"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="delet_with_pass_main_contener">
              <div className="modal-header delet_with_pass_header">
                <h5 className="modal-title" id="exampleModalLabel" style={{ color: "white" }}>
                  Delete Job
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeDeleteNewsModal}

                >
                  <span aria-hidden="true">
                    <img
                      src="dist/img/Cancel.png"
                      className="cancel_img"
                      style={{ background: "white" }}
                    />
                  </span>
                </button>
              </div>


              <div className="modal-body">
                <div className="delet_with_pass_body_main_div">
                  <div className="d-flex">
                    <p style={{ color: "#2D5DD0" }}>Warning:</p>
                    <p style={{ marginLeft: "5px" }}>
                      You are deleting a screen. This operation cannot be
                    </p>
                  </div>

                  <p>
                    {" "}
                    undone. Please type the password of the screen Admin
                    into the box below to confirm you really want to do
                    this.
                  </p>

                  <div className="mt-4">
                    <div className="row">
                      <div className="col-md-4 d-flex p-0" style={{ alignItems: "center" }}>
                        <p>
                          Admin Password:
                        </p>
                      </div>
                      <div className="col-md-8 p-0">
                        <input
                          type="password"
                          className="delet_with_pass_input"
                          value={deletePassword}
                          onChange={(e) =>
                            updateDeletePassword(e.target.value)
                          }
                        />
                      </div>
                    </div>


                  </div>
                  <div className="d-flex">
                    <div style={{ marginTop: "10PX" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer delet_with_pass_footer">
                <input
                  type="button"
                  className="delet_with_pass_delete_button"
                  value="Delete"
                  onClick={() => deleteWithPassword()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade editWithPassModal"
        id="editWithPassModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="delet_with_pass_main_contener">
              <div className="modal-header delet_with_pass_header">
                <h5 className="modal-title" id="exampleModalLabel" style={{ color: "white" }}>
                  Edit Job
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeDeleteNewsModal}

                >
                  <span aria-hidden="true">
                    <img
                      src="dist/img/Cancel.png"
                      className="cancel_img"
                      style={{ background: "white" }}
                    />
                  </span>
                </button>
              </div>


              <div className="modal-body">
                <div className="delet_with_pass_body_main_div">
                  <div className="d-flex">
                    <p style={{ color: "#2D5DD0" }}>Warning:</p>
                    <p className="modal_body_p" style={{ marginLeft: "5px" }}>
                      You are deleting a screen. This operation cannot be
                    </p>
                  </div>

                  <p className="modal_body_p">
                    {" "}
                    undone. Please type the password of the screen Admin
                    into the box below to confirm you really want to do
                    this.
                  </p>

                  <div className="mt-4">
                    <div className="row">
                      <div className="col-md-4 d-flex p-0" style={{ alignItems: "center" }}>
                        <p>
                          Admin Password:
                        </p>
                      </div>
                      <div className="col-md-8 p-0">
                        <input
                          type="password"
                          className="delet_with_pass_input"
                          value={deletePassword}
                          onChange={(e) =>
                            updateDeletePassword(e.target.value)
                          }
                        />
                      </div>
                    </div>


                  </div>
                  <div className="d-flex">
                    <div style={{ marginTop: "10PX" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer delet_with_pass_footer">
                <input
                  type="button"
                  className="delet_with_pass_delete_button"
                  value="Edit"
                  onClick={() => editWithPassword()}
                />

              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="deleterow" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure You Want To Delete This Job?
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
              Delete Job
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

      <div className="row border_class2 search_box_padding">
        {/* <div
          className="col-md-4 d-flex flex-row"
          style={{ alignItems: "center" }}
        > */}
        {/* <h4 className="main_heading_h1">List of Jobs</h4> */}
        {/* </div> */}

        {/* ********serach bar code ************ */}

        <div className="col-md-3 d-flex flex-row"
        // style={{marginLeft:"1%",}}
        >
          <div className="search_box_div">
            <img
              className="search_box_img"
              src={require("../images/Search.png")}
            />

            <Input
              className="search_box"
              id="search"
              type="text"
              placeholder="Search by job title"
              onChange={(e) => searchKey(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-5 ml-auto d-flex flex-row justify-content-end">
          <div style={{ marginTop: "0px", padding: "0", }}>
            <Link to="/createJob">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
              >
                <div className="create_button_inner">Create Job</div>
                <img
                  className="create_button_img"
                  src="dist/img/Progress.png"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="welcome_modal">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="welcome_msg_main_div">
              <div className="d-flex" style={{ justifyContent: "space-between" }}>
                <p className="welcome_msg_main_p">WELCOME TO JOBS!</p>
                <img
                  src="dist/img/Welcom_msg_close.png"
                  onClick={() => close_welcome_modal()}
                  alt="dropdown"
                  className="close_event ml-auto cancel_img"
                />
              </div>
              <div>
                <p className="welcome_msg_inner_p">
                  Unlock a world of opportunities by seamlessly sharing part-time
                  job listings with students on their mobile app.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* job tabs */}

      <main className="job_Content">
        <div class="tab-container job-tab-container">
          <ul class="tabs job-tabs">
            <li
              class="tab-link current job-tab-link"
              data-tab="all"
              value="6"
              onClick={(e) => remoteJobs(e.target.value)}
            >
              All
            </li>
            <li
              class="tab-link job-tab-link"
              data-tab="overview"
              onClick={() => remoteJobs("Remote Friendly")}
            >
              Remote Friendly
            </li>
            <li
              class="tab-link job-tab-link"
              data-tab="features"
              onClick={() => remoteJobs("Part Time")}
            >
              Part Time
            </li>
            <li
              class="tab-link job-tab-link"
              data-tab="screenshots"
              onClick={() => remoteJobs("Freelance")}
            >
              Freelance
            </li>
            <li
              class="tab-link job-tab-link"
              data-tab="faq"
              onClick={() => remoteJobs("Volunteer")}
            >
              Volunteer
            </li>
            <li
              class="tab-link job-tab-link"
              data-tab="abc"
              onClick={() => remoteJobs("Full Time")}
            >
              Full Time
            </li>
          </ul>
        </div>

        <div id="all" class="tab-content current job-tab-content">
          <h2 className="ten_font_class" style={{ paddingLeft: "10px" }}>
            Recently Added
          </h2>

          {filteredResults.map((item, index) => {

            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.end_date_time).format("D MMM YYYY");

            return (
              <div>
                <div
                  key={index}
                  style={{
                    // background: "#f5f5f5",
                    background: " #FFFFFF",
                    // margin: "1px 10px 20px",
                    padding: "8px 10px 5px 2px",
                    fontSize: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Added boxShadow
                    // border:"2px solid red",
                    marginBottom: "25px"
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "0px 11px" }}>
                    {item.comp_logo == " " ? (
                      <div
                      // style={{ width: "20vh", height: "15vh" , border:"2px solid red" }}
                      >
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          // style={{ width: "22vh", height: "18vh" }}
                          style={{ width: "60px", height: "60px" }}
                          className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: "1px solid rgb(0 0 0 / 15%)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                    <div style={{ paddingTop: "10px", width: "50%" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>

                      <p
                        className={`desc_class job_desc_limit ${showFullContent[index] ? "show-full-content" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      {/* {item.description &&
                        item.description.length > 350 &&
                        !showFullContent[index] && (
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See More..
                          </button>
                        )} */}
                      {/* {showFullContent[index] && (
                        <div>
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See Less
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="ten_font_class"
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "60px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        <button
                          className="all_action_buttons"
                          onClick={() => openActionsModal(item.job_id)}
                        >
                          Actions
                        </button>

                        <div
                          class={`edit_campus_modal actions_modal${item.job_id}`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "22px",
                            right: "0px",
                          }}
                        >
                          <div className="  ">
                            <div className=" d-flex ml-auto">
                              <img
                                className="campus_img ml-auto"
                                src="dist/img/Cancel.png"
                                onClick={closeActionsModal}
                              />
                            </div>
                          </div>

                          <div className=" d-flex flex-row hover_class">
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Chart1.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Stats</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" d-flex flex-row hover_class"
                            onClick={() => editJob(item.job_id)}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Pencil.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>

                          <button
                            className=" d-flex flex-row hover_class"
                            onClick={() =>
                              deleteJob(item.job_id, item.job_title)
                            }
                            style={{ color: "#000" }}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src={require("../images/delete.png")}
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Delete</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>

        <div id="overview" class="tab-content job-tab-content">
          {remoteData.map((item, index) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.end_date_time).format("D MMM YYYY");

            return (
              <div>
                <div
                  key={index}
                  style={{
                    // background: "#f5f5f5",
                    background: " #FFFFFF",
                    // margin: "1px 10px 0px",
                    padding: "8px 10px 5px 2px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Added boxShadow
                    fontSize: "10px",
                    marginBottom: "25px"
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "0px 11px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          style={{ width: "60px", height: "60px" }}
                          className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: "1px solid rgb(0 0 0 / 15%)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                    <div style={{ paddingTop: "10px", width: "50%" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>

                      <p
                        className={`desc_class job_desc_limit ${showFullContent[index] ? "show-full-content" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      {/* {item.description &&
                        item.description.length > 350 &&
                        !showFullContent[index] && (
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See More..
                          </button>
                        )} */}
                      {/* {showFullContent[index] && (
                        <div>
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See Less
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="ten_font_class"
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "60px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        <button
                          className="all_action_buttons"
                          onClick={() => openActionsModal(item.job_id)}
                        >
                          Actions
                        </button>

                        <div
                          class={`edit_campus_modal actions_modal${item.job_id}`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "22px",
                            right: "0px",
                          }}
                        >
                          <div className="  ">
                            <div className=" d-flex ml-auto">
                              <img
                                className="campus_img ml-auto"
                                src="dist/img/Cancel.png"
                                onClick={closeActionsModal}
                              />
                            </div>
                          </div>

                          <div className=" d-flex flex-row hover_class">
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Chart1.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Stats</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" d-flex flex-row hover_class"
                            onClick={() => editJob(item.job_id)}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Pencil.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>

                          <button
                            className=" d-flex flex-row hover_class"
                            onClick={() =>
                              deleteJob(item.job_id, item.job_title)
                            }
                            style={{ color: "#000" }}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src={require("../images/delete.png")}
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Delete</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
          {/* {remoteData.map((item) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.validity).format("D MMM YYYY");

            return (
              <div>
                <div
                  style={{
                    background: "#f5f5f5",
                    margin: "20px 10px 0px 10px",
                    padding: "10px",
                  }}
                  className="d-flex ten_font_class"
                >
                  <div style={{ padding: "20px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}

                  </div>
                  <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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
                      <p
                        className="desc_class"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex ten_font_class">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "50px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div
                      className=""
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <button
                        className="all_action_buttons"
                        onClick={() => openActionsModal(item.job_id)}
                      >
                        Actions
                      </button>

                      <div
                        class={`edit_campus_modal actions_modal${item.job_id}`}
                        id=""
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "22px",
                          right: "0px",
                        }}
                      >
                        <div className="  ">
                          <div className=" d-flex ml-auto">
                            <img
                              className="campus_img ml-auto"
                              src="dist/img/Cancel.png"
                              onClick={closeActionsModal}
                            />
                          </div>
                        </div>

                        <div className=" d-flex flex-row hover_class">
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Chart1.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Stats</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className=" d-flex flex-row hover_class"
                          onClick={() => editJob(item.job_id)}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Pencil.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Edit</span>
                            </div>
                          </div>
                        </div>

                        <a
                          className=" d-flex flex-row hover_class"
                          href="#deleterow"
                          onClick={() => deleteJob(item.job_id, item.job_title)}
                          style={{ color: "#000" }}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src={require("../images/delete.png")}
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Delete</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            );
          })} */}
        </div>

        <div id="features" class="tab-content job-tab-content">
          {remoteData.map((item, index) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.end_date_time).format("D MMM YYYY");

            return (
              <div>
                <div
                  key={index}
                  style={{
                    // background: "#f5f5f5",
                    background: " #FFFFFF",
                    // margin: "1px 10px 0px",
                    padding: "8px 10px 5px 2px",
                    fontSize: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Added boxShadow
                    marginBottom: "25px"
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "0px 11px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          style={{ width: "60px", height: "60px" }}
                          className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: "1px solid rgb(0 0 0 / 15%)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                    <div style={{ paddingTop: "10px", width: "50%" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>

                      <p
                        className={`desc_class job_desc_limit ${showFullContent[index] ? "show-full-content" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      {/* {item.description &&
                        item.description.length > 350 &&
                        !showFullContent[index] && (
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See More..
                          </button>
                        )} */}
                      {/* {showFullContent[index] && (
                        <div>
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See Less
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="ten_font_class"
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "60px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        <button
                          className="all_action_buttons"
                          onClick={() => openActionsModal(item.job_id)}
                        >
                          Actions
                        </button>

                        <div
                          class={`edit_campus_modal actions_modal${item.job_id}`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "22px",
                            right: "0px",
                          }}
                        >
                          <div className="  ">
                            <div className=" d-flex ml-auto">
                              <img
                                className="campus_img ml-auto"
                                src="dist/img/Cancel.png"
                                onClick={closeActionsModal}
                              />
                            </div>
                          </div>

                          <div className=" d-flex flex-row hover_class">
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Chart1.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Stats</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" d-flex flex-row hover_class"
                            onClick={() => editJob(item.job_id)}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Pencil.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>

                          <button
                            className=" d-flex flex-row hover_class"
                            onClick={() =>
                              deleteJob(item.job_id, item.job_title)
                            }
                            style={{ color: "#000" }}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src={require("../images/delete.png")}
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Delete</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
          {/* {remoteData.map((item) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.validity).format("D MMM YYYY");

            return (
              <div>
                <div
                  style={{
                    background: "#f5f5f5",
                    margin: "20px 10px 0px 10px",
                    padding: "10px",
                  }}
                  className="d-flex ten_font_class"
                >
                  <div style={{ padding: "20px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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
                      <p
                        className="desc_class"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex ten_font_class">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "50px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <button
                        className="all_action_buttons"
                        onClick={() => openActionsModal(item.job_id)}
                      >
                        Actions
                      </button>

                      <div
                        class={`edit_campus_modal actions_modal${item.job_id}`}
                        id=""
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "22px",
                          right: "0px",
                        }}
                      >
                        <div className="  ">
                          <div className=" d-flex ml-auto">
                            <img
                              className="campus_img ml-auto"
                              src="dist/img/Cancel.png"
                              onClick={closeActionsModal}
                            />
                          </div>
                        </div>

                        <div className=" d-flex flex-row hover_class">
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Chart1.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Stats</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className=" d-flex flex-row hover_class"
                          onClick={() => editJob(item.job_id)}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Pencil.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Edit</span>
                            </div>
                          </div>
                        </div>

                        <a
                          className=" d-flex flex-row hover_class"
                          href="#deleterow"
                          onClick={() => deleteJob(item.job_id, item.job_title)}
                          style={{ color: "#000" }}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src={require("../images/delete.png")}
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Delete</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            );
          })} */}
        </div>

        <div id="screenshots" class="tab-content job-tab-content">
          {remoteData.map((item, index) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.end_date_time).format("D MMM YYYY");

            return (
              <div>
                <div
                  key={index}
                  style={{
                    // background: "#f5f5f5",
                    background: " #FFFFFF",
                    // margin: "1px 10px 0px",
                    padding: "8px 10px 5px 2px",
                    fontSize: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Added boxShadow
                    marginBottom: "25px"
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "0px 11px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>

                        <img
                          style={{ width: "60px", height: "60px" }}
                          className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: "1px solid rgb(0 0 0 / 15%)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                    <div style={{ paddingTop: "10px", width: "50%" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>

                      <p
                        className={`desc_class job_desc_limit ${showFullContent[index] ? "show-full-content" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      {/* {item.description &&
                        item.description.length > 350 &&
                        !showFullContent[index] && (
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See More..
                          </button>
                        )} */}
                      {/* {showFullContent[index] && (
                        <div>
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See Less
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="ten_font_class"
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "60px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        <button
                          className="all_action_buttons"
                          onClick={() => openActionsModal(item.job_id)}
                        >
                          Actions
                        </button>

                        <div
                          class={`edit_campus_modal actions_modal${item.job_id}`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "22px",
                            right: "0px",
                          }}
                        >
                          <div className="  ">
                            <div className=" d-flex ml-auto">
                              <img
                                className="campus_img ml-auto"
                                src="dist/img/Cancel.png"
                                onClick={closeActionsModal}
                              />
                            </div>
                          </div>

                          <div className=" d-flex flex-row hover_class">
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Chart1.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Stats</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" d-flex flex-row hover_class"
                            onClick={() => editJob(item.job_id)}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Pencil.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>

                          <button
                            className=" d-flex flex-row hover_class"
                            onClick={() =>
                              deleteJob(item.job_id, item.job_title)
                            }
                            style={{ color: "#000" }}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src={require("../images/delete.png")}
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Delete</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
          {/* {remoteData.map((item) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.validity).format("D MMM YYYY");

            return (
              <div>
                <div
                  style={{
                    background: "#f5f5f5",
                    margin: "20px 10px 0px 10px",
                    padding: "10px",
                  }}
                  className="d-flex ten_font_class"
                >
                  <div style={{ padding: "20px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                      <p
                        className="desc_class"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex ten_font_class">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "50px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div
                      className=""
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <button
                        className="all_action_buttons"
                        onClick={() => openActionsModal(item.job_id)}
                      >
                        Actions
                      </button>

                      <div
                        class={`edit_campus_modal actions_modal${item.job_id}`}
                        id=""
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "22px",
                          right: "0px",
                        }}
                      >
                        <div className="  ">
                          <div className=" d-flex ml-auto">
                            <img
                              className="campus_img ml-auto"
                              src="dist/img/Cancel.png"
                              onClick={closeActionsModal}
                            />
                          </div>
                        </div>

                        <div className=" d-flex flex-row hover_class">
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Chart1.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Stats</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className=" d-flex flex-row hover_class"
                          onClick={() => editJob(item.job_id)}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Pencil.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Edit</span>
                            </div>
                          </div>
                        </div>

                        <a
                          className=" d-flex flex-row hover_class"
                          href="#deleterow"
                          onClick={() => deleteJob(item.job_id, item.job_title)}
                          style={{ color: "#000" }}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src={require("../images/delete.png")}
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Delete</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })} */}
        </div>

        <div id="faq" class="tab-content job-tab-content">
          {remoteData.map((item, index) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.end_date_time).format("D MMM YYYY");

            return (
              <div>
                <div
                  key={index}
                  style={{
                    // background: "#f5f5f5",
                    background: " #FFFFFF",
                    // margin: "1px 10px 0px",
                    padding: "8px 10px 5px 2px",
                    fontSize: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                    marginBottom: "25px"
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "0px 11px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          style={{ width: "60px", height: "60px" }}
                          className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: "1px solid rgb(0 0 0 / 15%)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                    <div style={{ paddingTop: "10px", width: "50%" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>

                      <p
                        className={`desc_class job_desc_limit ${showFullContent[index] ? "show-full-content" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      {/* {item.description &&
                        item.description.length > 350 &&
                        !showFullContent[index] && (
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See More..
                          </button>
                        )} */}
                      {/* {showFullContent[index] && (
                        <div>
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See Less
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="ten_font_class"
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "60px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        <button
                          className="all_action_buttons"
                          onClick={() => openActionsModal(item.job_id)}
                        >
                          Actions
                        </button>

                        <div
                          class={`edit_campus_modal actions_modal${item.job_id}`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "22px",
                            right: "0px",
                          }}
                        >
                          <div className="  ">
                            <div className=" d-flex ml-auto">
                              <img
                                className="campus_img ml-auto"
                                src="dist/img/Cancel.png"
                                onClick={closeActionsModal}
                              />
                            </div>
                          </div>

                          <div className=" d-flex flex-row hover_class">
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Chart1.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Stats</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" d-flex flex-row hover_class"
                            onClick={() => editJob(item.job_id)}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Pencil.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>

                          <button
                            className=" d-flex flex-row hover_class"
                            onClick={() =>
                              deleteJob(item.job_id, item.job_title)
                            }
                            style={{ color: "#000" }}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src={require("../images/delete.png")}
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Delete</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
          {/* {remoteData.map((item) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.validity).format("D MMM YYYY");

            return (
              <div>
                <div
                  style={{
                    background: "#f5f5f5",
                    margin: "20px 10px 0px 10px",
                    padding: "10px",
                  }}
                  className="d-flex ten_font_class"
                >
                  <div style={{ padding: "20px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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
                      <p
                        className="desc_class"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex ten_font_class">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "50px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div
                      className=""
                      style={{
                        position: "relative",
                        marginLeft: "60px",
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <button
                        className="all_action_buttons"
                        onClick={() => openActionsModal(item.job_id)}
                      >
                        Actions
                      </button>

                      <div
                        class={`edit_campus_modal actions_modal${item.job_id}`}
                        id=""
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "22px",
                          right: "0px",
                        }}
                      >
                        <div className="  ">
                          <div className=" d-flex ml-auto">
                            <img
                              className="campus_img ml-auto"
                              src="dist/img/Cancel.png"
                              onClick={closeActionsModal}
                            />
                          </div>
                        </div>

                        <div className=" d-flex flex-row hover_class">
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Chart1.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Stats</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className=" d-flex flex-row hover_class"
                          onClick={() => editJob(item.job_id)}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Pencil.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Edit</span>
                            </div>
                          </div>
                        </div>

                        <a
                          className=" d-flex flex-row hover_class"
                          href="#deleterow"
                          onClick={() => deleteJob(item.job_id, item.job_title)}
                          style={{ color: "#000" }}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src={require("../images/delete.png")}
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Delete</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            );
          })} */}
        </div>

        <div id="abc" class="tab-content job-tab-content">
          {remoteData.map((item, index) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.end_date_time).format("D MMM YYYY");

            return (
              <div>
                <div
                  key={index}
                  style={{
                    // background: "#f5f5f5",
                    background: " #FFFFFF",
                    // margin: "1px 10px 0px",
                    padding: "8px 10px 5px 2px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Added boxShadow
                    marginBottom: "25px",
                    fontSize: "10px",
                  }}
                  className="d-flex"
                >
                  <div style={{ padding: "0px 11px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          style={{ width: "60px", height: "60px" }}
                          className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: "1px solid rgb(0 0 0 / 15%)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                    <div style={{ paddingTop: "10px", width: "50%" }}>
                      <p style={{ color: "#2D5DD0", fontWeight: "600" }}>
                        Job Description
                      </p>

                      <p
                        className={`desc_class job_desc_limit ${showFullContent[index] ? "show-full-content" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      {/* {item.description &&
                        item.description.length > 350 &&
                        !showFullContent[index] && (
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See More..
                          </button>
                        )} */}
                      {/* {showFullContent[index] && (
                        <div>
                          <button
                            className="job_desc_seemore_btn"
                            onClick={() => toggleContent(index)}
                          >
                            See Less
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="ten_font_class"
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "60px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        <button
                          className="all_action_buttons"
                          onClick={() => openActionsModal(item.job_id)}
                        >
                          Actions
                        </button>

                        <div
                          class={`edit_campus_modal actions_modal${item.job_id}`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "22px",
                            right: "0px",
                          }}
                        >
                          <div className="  ">
                            <div className=" d-flex ml-auto">
                              <img
                                className="campus_img ml-auto"
                                src="dist/img/Cancel.png"
                                onClick={closeActionsModal}
                              />
                            </div>
                          </div>

                          <div className=" d-flex flex-row hover_class">
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Chart1.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Stats</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" d-flex flex-row hover_class"
                            onClick={() => editJob(item.job_id)}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src="dist/img/Pencil.png"
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>

                          <button
                            className=" d-flex flex-row hover_class"
                            onClick={() =>
                              deleteJob(item.job_id, item.job_title)
                            }
                            style={{ color: "#000" }}
                          >
                            <div className=" d-flex flex-row">
                              <div>
                                <img
                                  className="campus_img"
                                  src={require("../images/delete.png")}
                                />
                              </div>
                              <div className="campus_inner_div">
                                <span>Delete</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
          {/* {remoteData.map((item) => {
            var created_date = moment(item.created_at).format("D MMM YYYY");

            var deadline_date = moment(item.validity).format("D MMM YYYY");

            return (
              <div>
                <div
                  style={{
                    background: "#f5f5f5",
                    margin: "20px 10px 0px 10px",
                    padding: "10px",
                  }}
                  className="d-flex ten_font_class"
                >
                  <div style={{ padding: "20px" }}>
                    {item.comp_logo == " " ? (
                      <div>
                        <img
                          className="job_logo_img"
                          src={require("../images/no_image.png")}
                          alt="no image"
                        />
                      </div>
                    ) : (
                      <div>
                        <img className="job_logo_img" src={item.comp_logo} />
                      </div>
                    )}

                  </div>
                  <div style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
                    <div
                      className="d-flex"
                      onClick={() => showJobPreview(item.job_id)}
                      style={{
                        borderBottom: " 0.5px solid rgba(0, 0, 0, 0.5)",
                        paddingBottom: "10px",
                        cursor: "pointer",
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

                      <p
                        className="desc_class"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgb(196 196 196 / 32%)",
                    margin: "0px 10px 0px 10px",
                    padding: "10px",
                  }}
                >
                  <div className="d-flex ten_font_class">
                    <div
                      style={{
                        display: "flex",
                        paddingLeft: "50px",
                        gap: "100px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#15A312", textAlign: "center" }}>
                          Applied
                        </p>
                        <p>{item.apply_job_count}</p>
                      </div>

                      <div>
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Budget
                        </p>
                        <p>{item.budget}</p>
                      </div>

                      <div className="max_content_class">
                        <p style={{ color: "#2D5DD0", textAlign: "center" }}>
                          Deadline
                        </p>
                        <p>{deadline_date}</p>
                      </div>
                    </div>

                    <div
                      className=""
                      style={{
                        position: "relative",
                        marginLeft: "60px",
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <button
                        className="all_action_buttons"
                        onClick={() => openActionsModal(item.job_id)}
                      >
                        Actions
                      </button>

                      <div
                        class={`edit_campus_modal actions_modal${item.job_id}`}
                        id=""
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "22px",
                          right: "0px",
                        }}
                      >
                        <div className="  ">
                          <div className=" d-flex ml-auto">
                            <img
                              className="campus_img ml-auto"
                              src="dist/img/Cancel.png"
                              onClick={closeActionsModal}
                            />
                          </div>
                        </div>

                        <div className=" d-flex flex-row hover_class">
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Chart1.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Stats</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className=" d-flex flex-row hover_class"
                          onClick={() => editJob(item.job_id)}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src="dist/img/Pencil.png"
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Edit</span>
                            </div>
                          </div>
                        </div>

                        <a
                          className=" d-flex flex-row hover_class"
                          href="#deleterow"
                          onClick={() => deleteJob(item.job_id, item.job_title)}
                          style={{ color: "#000" }}
                        >
                          <div className=" d-flex flex-row">
                            <div>
                              <img
                                className="campus_img"
                                src={require("../images/delete.png")}
                              />
                            </div>
                            <div className="campus_inner_div">
                              <span>Delete</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            );
          })} */}
        </div>
      </main>
    </div>
  );
}
