import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import FilterComponentExam from "./FilterComponentExam";
import axios from "axios";
import styled from "styled-components";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LoadingSpinner from "../LoadingSpinner";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi";
import Swal from "sweetalert2";
import { Previous_next_button } from "./Previous_next_button";
import { Link } from "react-router-dom";
import SummerNote from "../SummerNote/SummerNote";


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
  headCells: {
    style: {
      backgroundColor: "#e4e9f4",
      marginRight: "0",
    },
  },

  table: {
    style: {
      backgroundColor: "#e4e9f4",

      // marginTop:"22PX"
    },
  },
};

export function   ExamDetails() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [studentId, updateStudentId] = useState("");
  const [email, updateEmail] = useState("");
  const [subject, updateSubject] = useState("");
  const [description, updateDescription] = useState("");
  const [error_message, updateError_message] = useState("");
  // const [selectedEmail, updateSelectedEmail] = useState("");
  const [getExamName, updateGetExamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getExamId, updateGetExamID] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");

  const [classList, updateClassList] = useState([]);
  const [courseList, updateCourseList] = useState([]);
  const [course, updateCourse] = useState("");
  const [courseName, updateCourseName] = useState("");
  const [classExam, updateClassExam] = useState("");
  const [examName, updateExamName] = useState("");
  const [examId, updateExameId] = useState("");
  const [examDesc, updateExamDesc] = useState("");
  const [deliveryType, updateDeliveryType] = useState("");
  const [publishDate, updatePublishDate] = useState("");
  const [expireDate, updateExpireDate] = useState("");

  const [userType, updateUserType] = useState([]);

  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (newsId) => {
    setChildNewsData(newsId);
    // edit_category(newsId);
  };

  const passDeleteData = (newsId) => {
    setChildNewsData(newsId);
    // delete_category(newsId);
  };

  async function getCourseList() {
    try {
      const fetchCourseResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "campus_get_course",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      // console.log("Get Course List Details.................", fetchCourseResponse.data.data);
      if (fetchCourseResponse.data.error_code == 200) {
        updateCourseList(fetchCourseResponse.data.data);
      }
    } catch (err) {
      // console.log("Log in Fail", err);
    }
  }
  var todayy = "";
  todayy = new Date().toISOString().slice(0, 16);
  console.log("Todayy", todayy);

  function getTodaysDate() {
    var date = new Date();
    var getDate = moment(date).format("YYYY-MM-DD HH:mm");
    // console.log("get todays date", getDate);

    updatePublishDate(getDate);
  }
  const [inputFields, setInputFields] = useState([
    {
      subject_id: subjectName,
      date: examDate,

      total_mark: "",
    },
  ]);
  console.log("get subject name", inputFields);
  const handleChange = (event, index) => {
    // console.log("handel change", event.target.value);
    const values = [...inputFields];
    // console.log("momo", values);
    values[index][event.target.name] = event.target.value;

    setInputFields(values);
  };
  useEffect(() => {
    getCourseList();
    fetchDepartmentList();
  }, []);

 

  const handleEditButton = () => {
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Exam Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/exam";
    });
  };

  const [examDataFilter, updateExamDataFilter] = useState("");

  // console.log("get id course/class",studentClass)

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
    // setIsEditLoading(true);
    const formData = new FormData();

    formData.append("exam_id", examId);
    formData.append("start_date", publishDate);
    formData.append("end_date", expireDate);
    formData.append("course", course);
    formData.append("class", classExam);
    formData.append("exam_name", examName);
    formData.append("delivery_type", deliveryType);
    formData.append("description", description);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_exam_timetable",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    // console.log("Update Campus Event", eventResponse);
    // setIsEditLoading(false);
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

  const [subjectData, updateSubjectData] = useState([]);
  async function fetchCourseWiseSubject() {
    const formData = new FormData();

    formData.append("course_id", course);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "get_coursewise_subjects_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    // console.log("Create Polls..........>", response.data.data);
    if (response.data.error_code == 200) {
      updateSubjectData(response.data.data);
    }
  }

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };

  async function createMessage() {
    try {
      const formData = new FormData();

      formData.append("user_id", studentId);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("description", description);

      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_send_imp_message",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
          },
        }
      );

      // console.log("Send Email", response.data);
      setData([response.data]);

      updateError_message(response.data.message);

      updateEmail("");
      updateSubject("");
      updateDescription("");

      window.location.href = "/student";

      $(".formSuccess").show();

      setTimeout(function() {
        $(".formSuccess").hide();
      }, 5000);

      // }
    } catch (err) {
      // console.log("Log in Fail", err);
    }
  }

  async function fetchList() {
    // console.log("Access Token-", token);
    try {
      setIsLoading(true);
      const fetchExamResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_all_exam_timetable",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Exam List Details-----------------------------------------------------", fetchExamResponse);
      setIsLoading(false);
      const ExamErrorCode = fetchExamResponse.data.error_code;
      // console.log("Exam Error Code ", ExamErrorCode);

      const ExamErrorMsg = fetchExamResponse.data.message;
      // console.log("Exam Error msg ", ExamErrorMsg);

      if (ExamErrorCode == 200) {
        const examListArray = fetchExamResponse.data.data;
        // console.log("Exam list Array", examListArray);
        setData(examListArray);
      } else {
        setData([]);

        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      // console.log("Log in Fail", err);
      setIsLoading(false);
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

    // console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deleteExamApi();
    }
  }

  async function deleteExamApi() {
    try {
      // console.log("exam idsdd", getExamId);
      const formData = new FormData();

      formData.append("e_id", getExamId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_exam_timetable",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      // console.log("Delete Campus News", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      // console.log("Log in Fail", err);
    }
  }

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

    // console.log("Get campus info", fetchResponse.data.data);
    if (fetchResponse.data.error_code == 200) {
      fetchResponse.data.data.map((fetchItem) => {
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
  }

  useEffect(() => {
    getUserDetails();
    fetchList();
    fetchCourseWiseSubject();
  }, []);

  const [examDate, updateExamDate] = useState("");
  const [examTime, updateExamTime] = useState("");
  

  async function editExam(examId) {
    $(".edit_container").show();
   
    const formData = new FormData();

    formData.append("exam_id", examId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_exam_timetable",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    if (deleteNewsResponse.data.error_code == 200) {
      var item = deleteNewsResponse.data.data;
      // console.log("Get single exam timetable...", item);
      updateExameId(item.exam_id);
      updateExamName(item.exam_name);
      updateExamDesc(item.description);
     
      updateStudentClass(item.Std_class);
      updateCourse(item.course);
      updateDeliveryType(item.delivery_type);
      updatePublishDate(item.start_date);
      updateExpireDate(item.end_date);
      item.exam_details.map((examItem) => {
        updateSubjectName(examItem.subject);
        updateExamDate(examItem.date);
        updateExamTime(examItem.time);
      });
      formData.append("id", item.course);

      const singleCourseResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_single_course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      // console.log("Get single exam timetable", deleteNewsResponse);
      if (singleCourseResponse.data.error_code == 200) {
        singleCourseResponse.data.data.map((item) => {
          // console.log("get course name", item.course_name);
          updateCourseName(item.course_name);
        });
      }
    }
  }

  function close_edit_modal() {
    $(".edit_container").hide();
  }

  async function fetchId(id) {
    $(".preview_polls").show();
    const formData = new FormData();

    formData.append("exam_id", id);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_exam_timetable",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    // console.log("Get single exam timetable", deleteNewsResponse);
    if (deleteNewsResponse.data.error_code == 200) {
      var item = deleteNewsResponse.data.data;
      // console.log("Get single exam timetable", item.exam_name);
      updateExamName(item.exam_name);
      updateExamDesc(item.description);
      updateCourse(item.course);
      updateDeliveryType(item.delivery_type);
      updatePublishDate(item.start_date);
      updateExpireDate(item.end_date);
    }
  }
  function closePreviewDescription() {
    $(".preview_polls").hide();
  }

  const handleButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Exam Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/exam";
    });
  };
  console.log("department data............============", departmentdata)
  function deleteExam(exam_id, exam_name) {
    //console.log("Exammm Id",exam_id)
    updateGetExamName(exam_name);
    updateGetExamID(exam_id);

    $(".delete_container").show();
  }

  function close_delete_modal() {
    $(".preview_category").hide();
  }

  const columns = [
    {
      name: "Exam Name",
      selector: "student_name",
      sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        // console.log("ROW", row);
        return <div style={{ fontWeight: "700" }}>{row.exam_name}</div>;
      },
    },

    {
      name: "Course",
      selector: "student_id",
      sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        // console.log("ROW", row.student_id);
        return <div>{row.course}</div>;
      },
    },
    {
      name: "Start Date",
      selector: "persona",
      sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        // console.log("ROW", row.persona);
        const s_date = row.start_date;
        const examStartDate = moment(s_date).format("YYYY-MM-DD");
        return <div>{examStartDate}</div>;
      },
    },
    {
      name: "End Date",
      selector: "email",
      sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        // console.log("ROW", row.email);
        const e_date = row.end_date;
        const examEndDate = moment(e_date).format("YYYY-MM-DD");
        return <div>{examEndDate}</div>;
      },
    },

    {
      name: "Action",
      // selector: 'campus',
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        //console.log("Exammmmm IDDDD",row )
        return (
          <div className="d-flex">
            <img
              style={{ width: "20px", height: "20px", marginLeft: "2px" }}
              onClick={() => editExam(row.exam_id)}
              src={require("../images/Pencil.png")}
            />
            &nbsp;
            <a
              className="cta"
              href="#deleterow"
              onClick={() => deleteExam(row.exam_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                style={{ width: "20px", height: "20px", marginLeft: "1px" }}
                src={require("../images/delete.png")}
              />
              &nbsp;
            </a>
            <a
              className="cta"
              onClick={() => fetchId(row.exam_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                style={{ width: "20px", height: "20px", marginLeft: "4px" }}
                src={require("../images/view.png")}
              />
            </a>
          </div>
        );
      },
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
      // <FilterComponentExam
      //   onFilter={e => setFilterText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterText}
      // />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);
  const [departmentdata, setDepartmentData] = useState([]);
  const [departmentId, updateDepartmentId] = useState("");
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

      console.log("Get Department List.....===================", fetchDepartmentResponse.data.data);
      setDepartmentData(fetchDepartmentResponse.data.data);
    } catch (err) {
      // console.log("Log in Fail", err);
    }
  }
  const [courseId, updateCourseId] = useState("");
  const [subjectId, updateSubjectId] = useState("");
  const [subjectName, updateSubjectName] = useState("");
  const [courseData, updateCourseData] = useState([]);

  var course_id = "";
  async function courseWiseSubjectList(e) {
    fetchCourseWiseClassList(e.target.value);

    // console.log("get id course/class", e.target.value);
    course_id = e.target.value;
    updateCourseId(e.target.value);
    updateCourseName(e.target.options[e.target.selectedIndex].text);

    const formData = new FormData();
    formData.append("cource_id", e.target.value);
    formData.append("class_id", class_id);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_courcewise_and_classwise_exam_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    // console.log("Get =-=-=-=-=-=-=-=-=-=", deleteNewsResponse);
    if (deleteNewsResponse.data.error_code == 200) {
      setData(deleteNewsResponse.data.data);
    } else {
      setData([]);
    }
  }

  const [department, updateDepartment] = useState("");
  const [departmentName, updateDepartmentName] = useState("");
  const [errorCode, updateErrorCode] = useState("");
  async function departmentWiseCourseList(e) {
    // $('#student_course option:first').val("selected").text("Select Course")
    $("#student_course option").prop("selected", function() {
      return this.defaultSelected;
    });
    // console.log("get departent name", e.target.value);
    // console.log(event.target.options[event.target.selectedIndex].text);
    // console.log(
    //   "get departent name",
    //   e.target.options[e.target.selectedIndex].text
    // );
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

    // console.log("Departmentwise course list", responsePersona.data.data);
    updateErrorCode(responsePersona.data.error_code);
    if (responsePersona.data.error_code == 200) {
      updateCourseData(responsePersona.data.data);
    }
  }

  const [classListCourseWise, setClassList] = useState([]);
  async function fetchCourseWiseClassList(cource_id) {
    try {
      const formData = new FormData();
      formData.append("department_id", departmentId);
      formData.append("cource_id", cource_id);
      const fetchClassResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "dept_by_get_classes_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      // console.log("Get Class List Details", fetchClassResponse);

      const ClassErrorCode = fetchClassResponse.data.error_code;
      // console.log("Class Error Code ", ClassErrorCode);

      if (ClassErrorCode === 200) {
        const classListArray = fetchClassResponse.data.data;
        // console.log("Class list Array", classListArray);
        setClassList(classListArray);
      } else {
        setClassList([]);
      }
    } catch (err) {
      // console.log("Log in Fail", err);
    }
  }

  const [studentClass, updateStudentClass] = useState("");
  const [stdClassName, updateStdClassName] = useState("");
  var class_id = "";
  const [classErrorCode, updateClassErrorCode] = useState("");
  async function fetchClass(e) {
    updateStudentClass(e.target.value);
    class_id = e.target.value;
    // console.log("get classname", e.target.options[e.target.selectedIndex].text);
    updateStdClassName(e.target.options[e.target.selectedIndex].text);

    const formData = new FormData();

    formData.append("cource_id", courseId);
    formData.append("class_id", e.target.value);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_courcewise_and_classwise_exam_list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    // console.log("Get single exam timetable", deleteNewsResponse);
    updateClassErrorCode(deleteNewsResponse.data.error_code);
    if (deleteNewsResponse.data.error_code == 200) {
      setData(deleteNewsResponse.data.data);
    } else {
      setData([]);
    }
  }

  const handelSummenrnote = (e) => {
    updateExamDesc(e);
  };


  return (
    <div className="content-wrapper">
      <div id="google" className="modaloverlay">
        <div className="modalContainer">
          <form role="form">
            <div
              className="card-body"
              style={{ marginTop: "0px", marginLeft: "100px" }}
            >
              <div style={{ width: "50%" }}>
                <div
                  class="formSuccess"
                  style={{
                    marginTop: "5px",
                    width: "151%",
                    marrginBottom: "7px",
                    marginLeft: "0px",
                    marginRight: "208px",
                    display: "",
                  }}
                >
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert variant="filled" severity="success">
                      {error_message}
                    </Alert>
                  </Stack>
                </div>

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
              </div>
            </div>
          </form>
          <a
            class="close"
            href="#"
            style={{ marginTop: "-376px", marginRight: "8px" }}
          >
            &times;
          </a>
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
                Are You Sure You Want To Delete This Exam?
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
              Delete Exam
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

       
          <div className="row border_class2 search_box_padding" >
            <div
              className="col-md-4 d-flex"
              style={{alignItems:"center" }}
            >
              <h4 className="main_heading_h1">
                Exam
              </h4>
            </div>

            <div
              className="col-md-4 d-flex flex-row">
                <div className="search_box_div">

              <BiSearchAlt2
                className="search_box_img"
              />
              <Input className="search_box"
                id="search"
                type="text"
                placeholder="Search by exam name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                
              />
            </div>
            </div>

            <div className="col-md-4 d-flex flex-row">
              <div
                style={{ marginTop: "0px", padding: "0", marginLeft: "auto" }}
              >
                <Link to="/addExam">
                 <button
                  type="button"
                  className="d-flex create_button"
                  defaultValue="Sign Up"
                >
               
                <div className="create_button_inner">
                    Create Exam
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
            className="row border_class2 box_padding">
            
          
            <div class="col-md-3">
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">
                      Select Department
                    </label>
                   
                    <p className="all_stars">
                      *
                    </p>
                  </div>

                  <select
                    className="form-select form-select-sm all_inputs"
                    aria-label=".form-select-sm example"
                    id="department_neww"
                    onChange={departmentWiseCourseList}
                    
                  >
                    <option selected="selected" value={department}>
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

                  <div
                    class="std_dept"
                    style={{display: "none" }}
                  >
                    <h4 className="all_validations-h4">
                      Please Select Department
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">
                    Select Course
                  </label>
                  <br />
                  <p className="all_stars">
                    *
                  </p>
                </div>
                <select
                  className="form-select form-select-sm all_inputs"
                  aria-label=".form-select-sm example"
                  id="student_course"
                  onChange={courseWiseSubjectList}
                  
                >
                  <option selected="selected" value={course}>
                    Select Course
                  </option>

                  {courseData.map((item, index) => {
                    return (
                      <option value={item.course_id} key={index}>
                        {item.course_name}
                      </option>
                    );
                  })}
                </select>

                <div
                  class="std_course"
                  style={{display: "none" }}
                >
                  <h4
                    class="login-text all_validations_h4">
                    Please Select Course
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">
                    Select Class
                  </label>
                  <br />
                  <p className="all_stars">
                    *
                  </p>
                </div>
                <select
                  className="form-select form-select-sm all_inputs"
                  aria-label=".form-select-sm example"
                  id="student_class"
                  onChange={fetchClass}
                  
                >
                  <option selected="selected" value={studentClass}>
                    Select Class
                  </option>
                  
                  {classListCourseWise.length > 0 ? (
                    classListCourseWise.map((item, index) => {
                      return (
                        <option
                          value={item.class_id}
                          key={index}
                          style={{
                            color: "#000000",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "14px",
                            lineHeight: "21px",
                          }}
                        >
                          {item.class_name}
                        </option>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}
                </select>
                <div class="std_class" style={{display: "none" }}>
                  <h4
                    class="login-text all_validations_h4">
                    Please Select Class
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row mt-2"
            style={{
              background: "#e4e9f4 ",
              padding: "0",
              marginLeft: "0",
              marginRight: "0",
            }}
          >
            <div 
              style={{ background: "rgba(31, 57, 119, 0.9)", height: "40px" }}
            >
              <br></br>
              <center>
                <div>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "21px",
                      marginTop: "-14px",
                    }}
                  >
                    All Exam
                  </p>
                </div>
              </center>
            </div>
          </div>
          {/* </div> */}

          {/* Dropdown end here */}
       

        {/* edit campus news */}
        <div
          id="edit"
          className="edit_container">
          <div className="edit_container_inner">
            <div
              className="d-flex"
              style={{
                borderBottom: "2px solid #15a312",
                transform: "rotate(0.13deg)",
                paddingBottom: "10px",
              }}
            >
              <label className="main_labels">
                Edit Exam
              </label>

              <img
                src="dist/img/Cancel.png"
                onClick={() => close_edit_modal()}
                alt="dropdown"
                
                className="close_event ml-auto cancel_img"
                
              />
            </div>

            <div className="card-body" style={{ margin: "0px", padding: "0" }}>
              <div className="preview_form">
                <div className="mt-2 border_class2 edit_row_padding">
                  <div class="row" style={{ padding: "0", margin: "0" }}>
                    <div class="col-md-12 d-flex">
                      <div
                        style={{
                          width: "100%",
                          marginTop: "0px",
                          paddingRight: "0",
                        }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Exam Name
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>
                        <input className="all_edit_inputs"
                          type="name"
                          id="exam_name"
                          placeholder="Enter exam name"
                          value={examName}
                          onChange={(e) => updateExamName(e.target.value)}
                          
                        />
                        <div
                          class="NewsCategory"
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
                            Please Select Category
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 border_class2 edit_row_padding">
                  <div class="row" style={{ padding: "0", margin: "0" }}>
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Exam Description
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <SummerNote _onChange={handelSummenrnote}
                          value={examDesc}
                        />
                        
                        <div
                          class="NewsTitle"
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
                            Please Write News Title
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2  border_class2 edit_row_padding">
                <div className=" p-0">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Department
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>
                        <select
                          className="form-select form-select-sm all_edit_inputs"
                          aria-label=".form-select-sm example"
                          id="department_neww"
                          onChange={departmentWiseCourseList}
                          
                        >
                          <option selected="selected" value={department}>
                            Select Department
                          </option>
                          {departmentdata.map((dept, index) => {
                             

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
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-0">
                  <div class="row" style={{ padding: "0", margin: "0" }}>
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Course
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>
                        <select
                          className="form-select form-select-sm all_edit_inputs"
                          aria-label=".form-select-sm example"
                          id="course_name"
                          onChange={(e) => updateCourse(e.target.value)}
                          
                        >
                          <option selected="selected" value={course}>
                            {courseName}
                          </option>

                          {courseList.length > 0 ? (
                            courseList.map((courseItem, index) => {
                              // console.log("Course List", courseItem);
                              return (
                                <option
                                  value={courseItem.course_id}
                                  key={index}
                                  // selected={}
                                >
                                  {courseItem.course_name}
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
                </div>

                {/* {/ <p id="publish_date">sdsdsd</p> /} */}

                <div className="mt-3 p-0">
                  <div class="row" style={{ padding: "0", margin: "0" }}>
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Class
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>
                        <select
                          className="form-select form-select-sm all_edit_inputs"
                          aria-label=".form-select-sm example"
                          id="exam_class"
                          onChange={(e) => updateClassExam(e.target.value)}
                          
                        >
                          <option selected="selected" value={classExam}>
                            Select Class
                          </option>
                          {classList.map((classItem, index) => {
                            // console.log("classItem........>>", classItem);
                            return (
                              <option value={classItem.class_id} key={index}>
                                {classItem.class_name}
                              </option>
                            );
                          })}
                          
                        </select>

                        <div
                          class="PublishDate"
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
                            Please Select Publish Date
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div className="mt-2 border_class2 edit_row_padding">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                        id="new_delivery_type"
                        // value={deliveryType}
                        // onChange={(e) => updateDeliveryType(e.target.value)}
                      >
                        {/* <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>When it should be delivered?</label><br /> /} */}
                        <div className="d-flex">
                          <label className="all_labels">
                            When it should be delivered?
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <div className="d-flex" id="tblFruits">
                          <input
                            type="radio"
                            id="now"
                            name="deliveryType"
                            value="1"
                            checked={deliveryType == "Now"}
                            onChange={(e) => updateDeliveryType(e.target.value)}
                            style={{
                              width: "20px",
                              height: "20px",
                              border: "1px solid rgba(0, 0, 0, 0.5)",
                            }}
                            onClick={() => getTodaysDate()}
                          />
                          <label
                            for="now"
                            className="d-flex"
                            style={{
                              color: "black",
                              fontSize: "10px",
                              marginLeft: "10PX",
                              marginTop: "4px",
                              fontWeight: "600",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => getTodaysDate()}
                          >
                            <p style={{ marginLeft: "5px" }}>Now</p>
                          </label>
                          <input
                            type="radio"
                            id="later"
                            name="deliveryType"
                            value="2"
                            checked={deliveryType == "Later"}
                            onChange={(e) => updateDeliveryType(e.target.value)}
                            style={{
                              marginLeft: "78px",
                              width: "20px",
                              height: "20px",
                              border: "1px solid rgba(0, 0, 0, 0.5)",
                            }}
                          />
                          <label
                            for="later"
                            className="d-flex"
                            style={{
                              color: "black",
                              fontSize: "10px",
                              marginLeft: "15PX",
                              marginTop: "4PX",
                              fontWeight: "600",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            // onClick={() => laterDate()}
                          >
                            <p style={{ marginLeft: "5px" }}>Later</p>
                          </label>
                        </div>
                      </div>

                      <div
                        class="SendToAll"
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
                          Please Select User Type
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2  border_class2 edit_row_padding">
                <div className=" p-0">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Exam Start Date
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <input
                          type="datetime-local"
                          class="input_fields all_edit_inputs"
                          placeholder="dd-mm-yyyy, hh-mm"
                          id="publish_date"
                          value={publishDate}
                          min={todayy}
                          onChange={(e) => updatePublishDate(e.target.value)}
                          name="datetime"
                          
                        />

                        <div
                          class="PublishDate"
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
                            Please Select Publish Date
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-0">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <label className="all_labels">
                          Exam End Date
                        </label>
                       

                        <input
                          type="datetime-local"
                          className="input_fields all_edit_inputs"
                          placeholder="dd-mm-yyyy hh-mm"
                          id="expire_date"
                          value={expireDate}
                          onChange={(e) => updateExpireDate(e.target.value)}
                          min={todayy}
                          name="datetime"
                          
                        />

                        <div
                          class="ExpireDate"
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
                            Please Select Expire Date
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {inputFields.map((item, index) => {
                  // console.log("item", item);
                  return (
                    <div className="mt-1 p-0">
                      <div class="row">
                        <div class="col-md-12">
                          <div className="d-flex">
                            <label className="all_labels">
                              Subject Name
                            </label>

                            <p className="all_stars">
                              *
                            </p>
                          </div>

                          <select
                            className="form-select form-select-sm all_edit_inputs"
                            aria-label=".form-select-sm example"
                            id="subject_name"
                            name="subject_id"
                            required
                            onChange={(event) => handleChange(event, index)}
                            value={item.subject}
                            
                          >
                            <option selected="selected" value={subjectData}>
                              Select Subject
                            </option>

                            {subjectData.length > 0 ? (
                              subjectData.map((subjectItem, index) => {
                                // console.log("subjectItem....>>", subjectItem);
                                return (
                                  <option
                                    value={subjectItem.subject_id}
                                    key={index}
                                  >
                                    {subjectItem.subject_name}
                                  </option>
                                );
                              })
                            ) : (
                              <div>Data Not Found</div>
                            )}
                          </select>

                          <div></div>
                        </div>

                        <div className="mt-1 p-0">
                          <div className="row"  >        
                            <div className="col-md-12">
                            <label className="all_labels">
                              Exam Date/Time
                            </label>
                            
                            <input className="all_edit_inputs"
                              type="datetime-local"
                              name="date"
                              multiline
                              id="exam_date"
                              rows={6}
                              fullWidth
                              label="Description"
                              onChange={(event) => handleChange(event, index)}
                              
                              value={item.date}
                            />
                          </div>
                        </div>
                        </div>

                        <div className="mt-1 p-0">
                          <div className="row">
                            <div className="col-md-12">
                            <label className="all_labels">
                              Total Marks
                            </label>
                            
                            <input className="all_edit_inputs"
                              type="number"
                              name="total_mark"
                              id="total_marks"
                              onChange={(event) => handleChange(event, index)}
                             
                              value={item.marks}
                            />
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

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
                      // onClick={() => update_edited_News()}
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
          </div>
        </div>
        {/* } */}

        {/* edit popuop with password */}
        <div
          id="edit_with_password"
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
            <div className="d-flex" style={{ padding: "5px" }}>
              <p
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: "13px",
                  marginTop: "5PX",
                }}
              >
                Edit Exam
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
                undone. Please type the password of the screen Admin into the
                box below to confirm you really want to do this.
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
            <div className="border_class">
          <DataTable
            // style={{ border: "1px solid green" }}
            // class="table" id="grid1"
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
            selectableRows
            customStyles={customStyles}
          />
          </div>
        )}
      

      {/* <StudentTable /> */}
      {/* end news table */}

      {/* preview */}

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
            overflow: "auto",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              marginTop: "28px",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Exam
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closePreviewDescription()}
              style={{
                cursor: "pointer",
                width: "18px",
                height: "!4px",
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
      {/* } */}
    </div>
  );
}
