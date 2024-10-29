import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import axios from "axios";
import moment from "moment";
import $ from "jquery";
import Swal from "sweetalert2";
import { useLocation, Link, useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import "@patternfly/react-core/dist/styles/base.css";

const reactDonutChartdata = [
  {
    label: "Present",
    value: 21,
    color: "#FF4560",
  },

  {
    label: "Absent",
    value: 4,
    color: "#FEB019",
  },
  {
    label: "Leave",
    value: 2,
    color: "#00E396",
  },
];
const reactDonutChartBackgroundColor = ["green", "red", "purple"];
const reactDonutChartInnerRadius = 0.7;
const reactDonutChartSelectedOffset = 0.04;
const reactDonutChartHandleClick = (item, toggled) => {
  if (toggled) {
  }
};
let reactDonutChartStrokeColor = "#FFFFFF";
const reactDonutChartOnMouseEnter = (item) => {
  let color = reactDonutChartdata.find((q) => q.label === item.label).color;
  reactDonutChartStrokeColor = color;
};

const customStyles = {
  rows: {
    style: {
      padding: "10px 0 10px 15px",
      border: "none",
    },
  },

  head: {
    style: {
      // padding: "10px 0 10px 15px",
      fontWeight: "600",
      color: "#4779F0",
      boxShadow: "0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2)",
    },
  },
  table: {
    style: {
      padding: "0",
    },
  },
};

export function ViewStudent() {
  const location = useLocation();
  const student_id = location.state || { id: "none" };

  const [stdId, setStdId] = useState(student_id);

  let history = useHistory();
  const token = localStorage.getItem("Token");
  const [studentId, updateStudentId] = useState("");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [gender, updateGender] = useState("");
  const [dob, updateDob] = useState("");
  const [stdProfile, updateStdProfile] = useState("");
  const [stdAddress, setStdAddress] = useState("");
  const [studentAllInfo, setStudentAllInfo] = useState([]);
  const [stdActivities, setStdActivities] = useState([]);

  const [genderId, updateGenderId] = useState("");
  const [departmentId, updateDepartmentId] = useState("");
  const [department, updateDepartment] = useState("");
  const [courseId, updateCourseId] = useState("");
  const [course, updateCourse] = useState("");
  const [classId, updateClassId] = useState("");
  const [studentClass, updateStudentClass] = useState("");
  const [email, updateEmail] = useState("");
  const [mobile, updateMobile] = useState("");
  const [personaId, updatePersonaId] = useState("");
  const [persona, updatePersona] = useState("");
  const [createDate, updateCreateDate] = useState("");
  const [studentData, setStudentData] = useState("");
  const [stdUniversity, setStdUniversity] = useState("");
  const [stdCampus, setStdCampus] = useState("");
  const [stdEmail, updateStdEmail] = useState("");
  const [stdMobile, updateStdMobile] = useState("");
  const [departmentdata, setDepartmentData] = useState([]);
  const [personadata, setPersonaData] = useState([]);
  const [classdata, setClassData] = useState([]);
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [isEditLoading, setIsEditLoading] = useState(false);

  const [stdClassName, updateStdClassName] = useState("");
  const [className, updateClassName] = useState("");

  const [msgId, setMsgId] = useState("");

  const [studentMsg, setStudentMsg] = useState("");

  async function fetchStudentDetails() {
    const formData = new FormData();
    formData.append("student_id", stdId.student_id);

    const editNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_single_student",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    // console.log("single student Response-------------", editNewsResponse);

    if (editNewsResponse.data.error_code == 200) {
      setStudentAllInfo(editNewsResponse.data.data);
      editNewsResponse.data.data.map((item) => {
        setStudentData(item);
        updateStudentId(item.student_id);
        updateFirstName(item.first_name);
        updateLastName(item.last_name);
        setStdAddress(item.address);
        if (item.gender == 1) {
          updateGender("Male");
        } else {
          updateGender("Female");
        }

        updateDob(item.dob);
        updateDepartmentId(item.department_id);
        updateDepartment(item.department);
        updateCourseId(item.course_id);
        updateCourse(item.course);
        updateClassId(item.class_id);
        updateStdClassName(item.student_class);
        updateStudentClass(item.class_id);
        updateEmail(item.email);
        updateMobile(item.mobile);
        updatePersonaId(item.persona_id);
        updatePersona(item.persona);
        updateCreateDate(item.created_at);
        updateStdProfile(item.student_profile);
        setStdUniversity(item.university_name);
        setStdCampus(item.campus_name);
        setStdActivities(item.students_activities);
      });
    }
  }

  const [subjectInfo, updateSubjectInfo] = useState("");

  async function fetchSubjectName(e) {
    const formData = new FormData();
    formData.append("exam_id", e.target.value);

    const examResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_exam_timetable",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (examResponse.data.error_code == 200) {
      updateSubjectInfo(examResponse.data.data.exam_details);
    }
  }

  async function fetchDepartmentList() {
    const token = localStorage.getItem("Token");

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
      const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
      const DepartmentErrorMsg = fetchDepartmentResponse.data.message;
      if (DepartmentErrorCode == 200) {
        const departmentListArray = fetchDepartmentResponse.data.data;

        setDepartmentData(departmentListArray);
      } else {
        setDepartmentData([]);

        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchCourseList() {
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "campus_get_course",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const CourseErrorCode = fetchClassResponse.data.error_code;
      if (CourseErrorCode == 200) {
        const courseListArray = fetchClassResponse.data.data;

        setClassData(courseListArray);
      } else {
        setClassData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function fetchClass(e) {
    updateStudentClass(e.target.value);
    updateStdClassName(e.target.options[e.target.selectedIndex].text);
  }

  const [errorCode, updateErrorCode] = useState("");
  const [courseData, updateCourseData] = useState([]);

  async function departmentWiseCourseList(e) {
    $("#student_course option").prop("selected", function() {
      return this.defaultSelected;
    });

    updateDepartmentId(e.target.value);
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

    updateErrorCode(responsePersona.data.error_code);
    if (responsePersona.data.error_code == 200) {
      updateCourseData(responsePersona.data.data);
    }
  }

  const [subjectData, updateSubjectData] = useState([]);

  async function courseWiseSubjectList(e) {
    updateCourseId(e.target.value);
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

    if (responsePersona.data.error_code == 200) {
      updateSubjectData(responsePersona.data.data);
    }
  }

  const [classList, setClassList] = useState([]);
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

      const ClassErrorCode = fetchClassResponse.data.error_code;

      if (ClassErrorCode === 200) {
        const classListArray = fetchClassResponse.data.data;

        setClassList(classListArray);
      } else {
        setClassList([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchPersonaList() {
    const token = localStorage.getItem("Token");

    try {
      const fetchPersonaResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_persona_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const PersonaErrorCode = fetchPersonaResponse.data.error_code;
      const PersonaErrorMsg = fetchPersonaResponse.data.message;
      if (PersonaErrorCode == 200) {
        const personaListArray = fetchPersonaResponse.data.data;
        setPersonaData(personaListArray);
      } else {
        setPersonaData([]);

        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
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

    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }

  async function fetchClassList() {
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

      setClassData(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchStudentDetails();
    fetchPersonaList();
    fetchCourseList();
    getUserDetails();
    fetchClassList();
  }, []);

  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");

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
      deleteNewsApi();
      $(".deleteStudentWithPass").hide();
      updateDeletePassword("");
    } else {
      toast.error(deleteNewsResponse.data.message);
    }
  }
  async function deleteNewsApi() {
    try {
      const formData = new FormData();

      formData.append("student_id", studentId);

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

      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        $(".deleteStudentWithPass").hide();
        updateDeletePassword("");
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleButton = () => {
    $(".edit_container").hide();

    toast.success("Student Deleted Successfully!!");
    setTimeout(function() {
      history.push("/student");
    }, 3000);
  };

  async function editStudent(studentId) {
    $(".edit_container").show();

    const formData = new FormData();
    formData.append("student_id", studentId);

    const editNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_single_student",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (editNewsResponse.data.error_code == 200) {
      editNewsResponse.data.data.map((item) => {
        updateStudentId(item.student_id);
        updateFirstName(item.first_name);
        updateLastName(item.last_name);
        updateGenderId(item.gender);
        var currdate = item.dob;
        var dateOfBirth = moment(currdate).format("YYYY-MM-DD");
        updateDob(dateOfBirth);
        updateStdEmail(item.email);
        updateStdMobile(item.mobile);
        updateDepartmentId(item.department_id);
        updateDepartment(item.department);
        updateCourseId(item.course_id);
        updateCourse(item.course);
        updateClassId(item.class_id);
        updateStudentClass(item.class_id);
        updateClassName(item.student_class);
        updateEmail(item.email);
        updateMobile(item.mobile);
        updatePersonaId(item.persona_id);
        updatePersona(item.persona);
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

    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    } else {
      toast.error(deleteNewsResponse.data.message);
    }
  }
  const handleEditButton = () => {
    fetchStudentDetails();
    $(".edit_container").hide();
    toast.success("Student Edited Successfully!!");
  };

  const openActionsModal = (e) => {
    $(".edit_campus_modal").hide();
    $(".student_send_msg_modal").hide();
    $(".actions_modal" + e).toggle();
  };

  const closeActionsModal = (tId) => {
    $(".edit_campus_modal").hide();
  };

  function close_edit_modal() {
    $(".edit_container").hide();
  }

  async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();

    formData.append("student_id", studentId);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("gender", genderId);
    formData.append("persona", personaId);
    formData.append("class_id", studentClass);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "edit_student",
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
      $(".edit_campus_modal").hide();
      updateDeletePassword("");
      handleEditButton();
      fetchStudentDetails();
    } else {
      $(".editWithPassModal").hide();
    }
  }

  function deleteStudent(std_id) {
    updateStudentId(std_id);
    $(".deleteStudentModal").show();
  }

  function update_edited_News() {
    $(".edit_popup_password").show();
  }
  function close_delete_modal() {
    $(".preview_category").hide();
    $(".delete_container").hide();
  }
  function close_student_modal() {
    $(".preview_category").hide();
    // updateStudentList("");
  }

  const silentStudentFunc = async (s_id) => {
    try {
      const formData = new FormData();
      formData.append("stud_id", s_id);
      const silentStudentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_change_student_freez_acc_status",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const ErrorCode = silentStudentResponse.data.error_code;
      if (ErrorCode == 200) {
        fetchStudentDetails();
        $(".edit_campus_modal").hide();
        toast.success(silentStudentResponse.data.message);
      } else {
      }
    } catch (err) {
      console.log("silence user error-----------", err);
    }
  };

  const openStdActionsModal = (e) => {
    setMsgId("");
    setMsgId(e);
    $(".edit_campus_modal").hide();
    $(".delete_student_modal" + e).toggle();
  };

  const closeStdActionsModal = (tId) => {
    $(".edit_campus_modal").hide();
  };

  const openStudentActivityDeleteModal = () => {
    $("#deleteStdActivity").toggle();
  };

  const deleteStudentActivity = async () => {
    try {
      const formData = new FormData();

      formData.append("message_id", msgId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "insert_delete_st_activity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      if (deleteResponse.data.error_code == 200) {
        toast.success(deleteResponse.data.message);
        fetchStudentDetails();
        $("#deleteStdActivity").hide();
        $(".edit_campus_modal").hide();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  };

  function update_edited_student() {
    $(".editWithPassModal").show();
    $(".edit_container").hide();
  }

  function deletePopupFunc() {
    $(".deleteStudentWithPass").show();
    $(".deleteStudentModal").hide();
  }

  function closeDeleteNewsModal() {
    $(".deleteStudentModal").hide();
    $(".edit_campus_modal").hide();
    $(".deleteStudentWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("");
  }

  const columns = [
    {
      name: "Recent Activity",
      wrap: true,
      // width: "35%",
      cell: (row) => {
        return (
          <div
            // onClick={() => viewDescription(row.news_id)}
            style={{
              backgroundColor: "transparent",
              fontWeight: "500",
              fontSize: "10px",
              color: "black",
              cursor: "pointer",
            }}
          >
            {row.activity_message}
          </div>
        );
      },
    },
    {
      width: "auto",
      cell: (row) => {
        return (
          <div
            className="d-flex"
            style={{
              width: "100%",
              justifyContent: "end",
              position: "relative",
            }}
          >
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => openStdActionsModal(row.message_id)}
            >
              <span
                style={{
                  background: "#4779F0",
                  color: "white",
                  padding: "4px 13px",
                  borderRadius: "5px",
                  fontSize: "10px",
                }}
              >
                Actions
              </span>
            </div>
            <div
              class={`edit_campus_modal delete_student_modal${row.message_id}`}
              id=""
              style={{
                display: "none",
                position: "absolute",
                top: "10px",
                right: "0px",
              }}
            >
              <div className="  ">
                <div className=" d-flex ml-auto">
                  <img
                    className="campus_img ml-auto"
                    src="dist/img/Cancel.png"
                    onClick={closeStdActionsModal}
                  />
                </div>
              </div>
              <a
                className=" d-flex flex-row hover_class"
                href="#deleteStdActivity"
                onClick={() => openStudentActivityDeleteModal(row.message_id)}
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
        );
      },
    },
  ];

  const openStdMsgModal = () => {
    setStudentMsg("")
    $(".student_send_msg_modal").show();
    $(".edit_std").hide();
  };

  const closeStdMsgModal = () => {
    $(".student_send_msg_modal").hide();
    setStudentMsg("");
  };

  async function sendMsgToAPI() {
    try {
      if (studentMsg == "") {
        $(".std_msg").show();
        setTimeout(function(){
          $(".std_msg").hide();
        },3000)
    }else{
      const formData = new FormData();

      formData.append("user_id", studentId);
      formData.append("description", studentMsg);
for(const p of formData.entries()){
  console.log(`${p[0]}--------${p[1]}`);
}
      const msgResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_send_imp_message",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
 console.log("msgResponse--------",msgResponse);
      if (msgResponse.data.error_code == 200) {
        toast.success("Message sent successfully...!!")
        $(".student_send_msg_modal").hide();
      }else{
        toast.error("Something went wrong..")
      }
    }
  } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <div className="d-flex">
          <Menu />
          <div className="content-wrapper p-0">
             <div className="border_class2">
              <div style={{ height: "80px", background: "#1F3977" }}>
              </div>

              <div
                style={{
                  height: "60px",
                  fontWeight: "500",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {stdProfile == "" ? (
                    <div style={{ position: "relative" }}>
                      <img
                        src="dist/img/Name_img.png"
                        className="text-center"
                        alt="User Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10%",
                          marginBottom: "75px",
                          background: "white",
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <img
                        src={stdProfile}
                        className="text-center"
                        alt="User Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10%",
                          color: "#ffffff",
                          marginBottom: "75px",
                        }}
                      />
                    </div>
                  )}
                  <div style={{ display: "grid" }}>
                    <b style={{ fontSize: "12px", fontWeight: "600" }}>
                      {firstName} {lastName}
                    </b>
                    <span
                      className="overflow_class"
                      style={{ fontSize: "10px", width: "150px" }}
                    >
                      {" "}
                      {stdAddress}
                    </span>
                  </div>

                  <div style={{ display: "grid" }}>
                    <b
                      className="overflow_class"
                      style={{ fontSize: "12px", fontWeight: "600" }}
                    >
                      {stdCampus}
                    </b>
                    <span
                      className="overflow_class"
                      style={{ fontSize: "10px" }}
                    >
                      {stdUniversity}
                    </span>
                  </div>

                  <div className="d-flex">
                    <div
                      style={{
                        border: "1px solid #ced4da",
                        padding: "2px 6px",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="d-flex"
                        style={{ alignContent: "center" }}
                      >
                        <div>
                          <img
                            src="dist/img/IdentificationImg.png"
                            style={{ height: "18px", width: "18px" }}
                          />
                        </div>
                        <div
                          className="d-flex"
                          style={{
                            alignContent: "center",
                            marginLeft: "5px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "black",
                              marginLeft: "2px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            Enrolled
                          </span>
                          <span
                            style={{
                              fontSize: "10px",
                              color: "grey",
                              marginLeft: "2px",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            - {createDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginLeft: "10px" }}>
                      <div>
                        <button
                          onClick={openStdMsgModal}
                          type="button"
                          className="d-flex  create_button"
                          defaultValue="Sign Up"
                          style={{
                            marginRight: "0px",
                            padding: "7px 10px",
                          }}
                        >
                          <div className="create_button_inner">
                            Send Message
                          </div>
                          <img
                            className="create_button_img"
                            src="dist/img/Progress.png"
                          />
                        </button>

                        <div
                          class={`edit_campus_modal student_send_msg_modal`}
                          id=""
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "32px",
                            right: "46px",
                            width: "300px",
                            padding:"10px"
                          }}
                        >

                          <div>
                            <div>
                              <textarea
                                id="std_msg"
                                className="input_fields all_inputs"
                                value={studentMsg}
                                onChange={(e) => setStudentMsg(e.target.value)}
                                placeholder="message goes here..."
                                autoComplete="off"
                                style={{ height: "80px" }}
                              />
                              <div class="std_msg" style={{ display: "none" }}>
                                <h4 class="login-text all_validations_h4">
                                  Please write something here
                                </h4>
                              </div>
                            </div>

                            <div
                              className="d-flex mt-2  border_class2"
                              style={{ justifyContent: "end",gap:"25px",padding:"7px" }}
                            >

                                <button
                                onClick={() => closeStdMsgModal()}
                                  type="button"
                                  className=" edit_cancel_button"
                                  value="Cancel"
                                  style={{fontSize:"9px"}}
                                >Cancel</button>
                                <button
                                  type="button"
                                  className="edit_update_button"
                                  id="delete_single_student"
                                  value="Send"
                                  onClick={() => sendMsgToAPI()}

                                  style={{padding:"5px 0px",fontSize:"9px",width:"100px",
                                  backgroundColor: studentMsg.trim() === "" ? "#f0f0f0" : "#000",
                                  color: studentMsg.trim() === "" ? "#808080" : "#f9f9f9",
                                }}
                                  disabled={studentMsg.trim() == ""}
                                >Send</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {studentAllInfo.map((studentItem) => {
              let _gender = "";
              if (studentItem.gender == 1) {
                _gender = "Male";
              } else {
                _gender = "Female";
              }
              return (
                <div
                  className="d-flex mt-2"
                  style={{ padding: "5px 25px 20px 25px" }}
                >
                  <div style={{ width: "100%" }}>
                    <div className="border_class2">
                      <div
                        className="d-flex"
                        style={{
                          justifyContent: "space-between",
                          padding: "10px 20px 0px 10px",
                        }}
                      >
                        <div
                          style={{
                            color: "#1F3977",
                            fontSize: "10px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span> Personal Details</span>
                        </div>

                        <div
                          className="ml-auto"
                          style={{ position: "relative" }}
                        >
                          <button
                            onClick={() =>
                              openActionsModal(studentItem.student_id)
                            }
                            style={{
                              background: "#4779F0",
                              color: "white",
                              padding: "5px 30px",
                              borderRadius: "5px",
                              fontSize: "10px",
                              border: "none",
                            }}
                          >
                            Actions
                          </button>

                          <div
                            class={`edit_campus_modal edit_std actions_modal${studentItem.student_id}`}
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

                            <div
                              className=" d-flex flex-row hover_class"
                              onClick={() =>
                                editStudent(studentItem.student_id)
                              }
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
                                deleteStudent(studentItem.student_id)
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

                            {studentItem.acc_freeze == 1 ? (
                              <div
                                className="  hover_class"
                                onClick={() =>
                                  silentStudentFunc(studentItem.student_id)
                                }
                              >
                                <div className=" d-flex flex-row">
                                  <div>
                                    <img
                                      className="campus_img"
                                      src="dist/img/PostSilence.png"
                                    />
                                  </div>
                                  <div className="campus_inner_div">
                                    <span>Unfreeze User</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="  hover_class"
                                onClick={() =>
                                  silentStudentFunc(studentItem.student_id)
                                }
                              >
                                <div className=" d-flex flex-row">
                                  <div>
                                    <img
                                      className="campus_img"
                                      src="dist/img/PostSilence.png"
                                    />
                                  </div>
                                  <div className="campus_inner_div">
                                    <span>Freeze User</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <hr style={{ marginTop: "9px" }} />

                      <div style={{ padding: "10px", paddingBottom: "70px" }}>
                        <table style={{ width: "100%", fontFamily: "Poppins" }}>
                          <tr style={{ width: "100%" }}>
                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                First Name
                              </div>
                              <div className="student_preview_name">
                                {studentItem.first_name}
                              </div>
                            </td>
                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Last Name
                              </div>
                              <div className="student_preview_name">
                                {studentItem.last_name}
                              </div>
                            </td>
                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Gender
                              </div>
                              <div className="student_preview_name">
                                {_gender}
                              </div>
                            </td>

                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Class
                              </div>
                              <div className="student_preview_name">
                                {studentItem.class_name}
                              </div>
                            </td>
                          </tr>

                          <tr style={{ width: "100%" }}>
                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Student #
                              </div>
                              <div className="student_preview_name">
                                {studentItem.student_id}
                              </div>
                            </td>

                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Date of Birth
                              </div>
                              <div className="student_preview_name">
                                {studentItem.dob}
                              </div>
                            </td>

                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Mobile Number
                              </div>
                              <div className="student_preview_name">
                                {studentItem.mobile}
                              </div>
                            </td>

                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Email
                              </div>
                              <div className="student_preview_name">
                                {studentItem.email}
                              </div>
                            </td>
                          </tr>

                          <tr style={{ width: "100%" }}>
                            <td className="student_preview_td">
                              <div className="student_preview_name_label">
                                Persona
                              </div>
                              <div className="student_preview_name">
                                {" "}
                                {studentItem.persona_id}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>

                    <div className="mt-4">
                      {/* <div
                        className="border_class2"
                        style={{
                          color: "#4779F0",
                          fontSize: "13px",
                          fontWeight: "600",
                          padding:"8px 15px"
                        }}
                      >
                        <span>Recent Activity</span>
                      </div> */}
                      {stdActivities == "" ? (
                        <></>
                      ) : (
                        <>
                          <div className="border_class2">
                            <DataTable
                              columns={columns}
                              data={stdActivities}
                              striped
                              highlightOnHover
                              defaultSortFieldId={1}
                              customStyles={customStyles}
                            />
                          </div>
                        </>
                      )}

                      {/* {stdActivities.map((s_activities)=>{
                            return(<>

                      <div
                        className=""
                        style={{ fontSize: "13px", fontWeight: "600" }}
                      >
                        <ul style={{ lineHeight: "30px", padding: "5px 20px",background: "#F5F5F5"}}>
                          <li className="d-flex">
                            {s_activities.activity_message}
                            <span
                              style={{
                                background: "#4779F0",
                                color: "white",
                                padding: "0px 30px",
                                borderRadius: "5px",
                                marginLeft: "auto",
                                height:"28px",
                                fontSize:"12px"
                              }}
                            >
                              Actions
                            </span>
                          </li>
                        </ul>

                        <ul
                          style={{
                            lineHeight: "30px",
                            padding: "5px 20px",
                            background: "#ffffff",
                          }}
                        >
                          <li className="d-flex">
                            Became friends with Akash Punshi
                            <span
                              style={{
                                background: "#4779F0",
                                color: "white",
                                padding: "0px 30px",
                                borderRadius: "5px",
                                marginLeft: "auto",
                                height:"28px",
                                fontSize:"12px"
                              }}
                            >Actions</span>
                          </li>
                        </ul>
                      </div>
                      </>)
                          })} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* edit campus news */}
          <div id="edit" className="edit_container">
            <div className="edit_container_inner">
              <div className="d-flex edit_inner_div">
                <label className="main_labels">Edit Student</label>

                <img
                  src="dist/img/Cancel.png"
                  onClick={() => close_edit_modal()}
                  alt="dropdown"
                  className="close_event ml-auto cancel_img"
                />
              </div>

              <div
                className="card-body"
                style={{ margin: "0px", padding: "0" }}
              >
                <div className="preview_form">
                  <div className="edit_top_label">
                    <p>Name & Surname</p>
                  </div>
                  <div className="mt-2 border_class2 edit_row_padding">
                    <div className=" p-0">
                      <div class="row" style={{ padding: "0", margin: "0" }}>
                        <div class="col-md-3">
                          <div>
                            <label className="all_labels">Name :</label>
                          </div>
                        </div>
                        <div class="col-md-9">
                          <input
                            type="name"
                            className="edit_inputs_class"
                            id="first_name"
                            value={firstName}
                            onChange={(e) => updateFirstName(e.target.value)}
                            autoComplete="true"
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

                        <div class="col-md-3">
                          <div>
                            <label className="all_labels">Surname :</label>
                          </div>
                        </div>
                        <div class="col-md-9">
                          <input
                            type="name"
                            className="edit_inputs_class"
                            id="last_name"
                            value={lastName}
                            onChange={(e) => updateLastName(e.target.value)}
                            autoComplete="true"
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

                  <div className="edit_top_label">
                    <p>Gender, Persona & Class </p>
                  </div>
                  <div className="edit_border_class">
                    <div className="col-md-3">
                      <label className="all_labels">Gender :</label>
                    </div>
                    <div className="col-md-9">
                      <select
                        className="edit_inputs_class"
                        aria-label=".form-select-sm example"
                        id="gender"
                        onChange={(e) => updateGenderId(e.target.value)}
                      >
                        <option selected value={genderId}>
                          {genderId == 1 ? "Male" : "Female"}
                        </option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
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

                    <div className="col-md-3">
                      <label className="all_labels">Persona :</label>
                    </div>
                    <div className="col-md-9">
                      <select
                        className="edit_inputs_class"
                        aria-label=".form-select-sm example"
                        id="persona"
                        onChange={(e) => updatePersonaId(e.target.value)}
                      >
                        <option selected="selected" value={personaId}>
                          {personaId}
                        </option>
                        {personadata.map((item, index) => {
                          return (
                            <option value={item.persona} key={index}>
                              {item.persona}
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

                    <div class="col-md-3">
                      <div>
                        <label className="all_labels">Class :</label>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <select
                        className="edit_inputs_class"
                        aria-label=".form-select-sm example"
                        id="student_class"
                        value={studentClass}
                        onChange={fetchClass}
                      >
                        <option selected="selected" value={stdClassName}>
                          {stdClassName}
                        </option>

                        {classdata && classdata.length > 0 ? (
                          classdata.map((item, index) => {
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
                      <div
                        class="std_class"
                        style={{ margin: "0", display: "none" }}
                      >
                        <h4 class="login-text all_validations_h4">
                          Please Select Class
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mt-2 edit_buttons_div border_class2">
                    <button
                      className="edit_cancel_button"
                      value="Cancel"
                      onClick={() => close_edit_modal()}
                    >
                      Cancel
                    </button>

                    <button
                      className="edit_update_button"
                      id="delete_single_student"
                      value="Update"
                      onClick={() => update_edited_student()}
                    >
                      Update
                    </button>
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
                  Edit Student
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
                style={{
                  background: "white",
                  padding: "15px",
                  fontSize: "13px",
                }}
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

              {/* </div> */}
              {/* </form> */}
            </div>
          </div>

          <div id="deleterow" className="modaloverlay delete_container">
            <div className="modalContainer">
              <div className="card-body" style={{ marginTop: "0px" }}>
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "13px",
                    }}
                  >
                    Delete message?
                  </p>
                  <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                    Are You Sure That You Want To Delete This Student?
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

          <div id="deleteStdActivity" className="modaloverlay delete_container">
            <div className="modalContainer">
              <div className="card-body" style={{ marginTop: "0px" }}>
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "13px",
                    }}
                  >
                    Delete message?
                  </p>
                  <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                    Are You Sure That You Want To Delete This Activity?
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

                    <a style={{ backgroundColor: "transparent" }}>
                      <input
                        type="button"
                        className="create_btn"
                        id="delete_single_student"
                        value="Delete"
                        onClick={deleteStudentActivity}
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
                  Delete Student
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
                style={{
                  background: "white",
                  padding: "15px",
                  fontSize: "13px",
                }}
              >
                <div className="d-flex">
                  <p style={{ color: "#2D5DD0" }}>Warning:</p>
                  <p style={{ marginLeft: "5px" }}>
                    You are deleting a screen. This operation cannot be
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
            className="modal fade deleteStudentModal"
            id="deleteStudentModal"
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
                      <img src="dist/img/Cancel.png" className="cancel_img" />
                    </span>
                  </button>
                </div>
                <div className="modal-body">
                  <p
                    className="pl-3 pb-2"
                    style={{ fontSize: "11px", fontWeight: "400" }}
                  >
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
                  <button className="delete_btn" onClick={deletePopupFunc}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade deleteStudentWithPass"
            id="deleteStudentWithPass"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="delet_with_pass_main_contener">
                  <div className="modal-header delet_with_pass_header">
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                      style={{ color: "white" }}
                    >
                      Delete Student
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
                          <div
                            className="col-md-4 d-flex p-0"
                            style={{ alignItems: "center" }}
                          >
                            <p>Admin Password:</p>
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
                        <div style={{ marginTop: "10PX" }}></div>
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
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                      style={{ color: "white" }}
                    >
                      Edit Student
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
                          <div
                            className="col-md-4 d-flex p-0"
                            style={{ alignItems: "center" }}
                          >
                            <p>Admin Password:</p>
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
                        <div style={{ marginTop: "10PX" }}></div>
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
        </div>
      </div>
    </>
  );
}
