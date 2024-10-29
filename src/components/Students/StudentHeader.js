import React, { useState, useEffect, useMemo } from "react";
import "./StudentTable.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import $, { event } from "jquery";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
// import ExcelFile from "../../StudentFormat/uploadFormat.xls"
import { EXCEL_FILE_BASE64 } from "../../contants";
import StudentExcel from "../../StudentFormat/uploadStudent.xlsx";
import FileSaver from "file-saver";
import toast, { Toaster } from "react-hot-toast";

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

export function StudentHeader() {
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
        color: "#1F3977",
        fontWeight: "600",
        fontSize: "10px",
      },
    },

    table: {
      style: {
        padding: "0px 10px 0 10px",
        marginTop: "0PX",
        // height: "180px",
      },
    },
  };
  const [isEditLoading, setIsEditLoading] = useState(false);
  let history = useHistory();
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [studentId, updateStudentId] = useState("");
  const [description, updateDescription] = useState("");
  const [error_message, updateError_message] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [error_code, updateError_code] = useState("");
  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };

  let courseResult = "";
  let x = "";

  $(document).ready(function() {
    $("#first_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
    $("#last_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });

    $("#preferred_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });

    $("#parent_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });

    $("#blood_type").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
  });

  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");

  const [genderId, updateGenderId] = useState("");
  const [dob, updateDob] = useState("");
  const [departmentId, updateDepartmentId] = useState("");
  const [department, updateDepartment] = useState("");
  const [courseId, updateCourseId] = useState("");
  const [course, updateCourse] = useState("");
  const [classId, updateClassId] = useState("");
  const [studentClass, updateStudentClass] = useState("");
  const [className, updateClassName] = useState("");
  const [subject, updateSubject] = useState([]);

  const [email, updateEmail] = useState("");
  const [mobile, updateMobile] = useState("");

  const [personaId, updatePersonaId] = useState("");
  const [persona, updatePersona] = useState("");
  const [emailData, setEmailData] = useState("");

  const [staffClass, setStaffClass] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [studentFile, setStudentFile] = useState([]);
  const courseFilter = (course) => {
    x = document.getElementById("mySelect").value;

    updateCourse(x);
    courseResult = data.filter((val) => {
      if (course != x) {
        return <p>No Data Available !!!</p>;
      } else if (val.course.toLowerCase().includes(course.toLowerCase())) {
        return val;
      }
    });

    setFilteredResults(courseResult);
  };

  const classFilter = (clas) => {
    var cls = document.getElementById("selectClass").value;
    // document.getElementById("demo").innerHTML = "You selected: " + cls;
    setStaffClass(cls);
    const classResult = filteredResults.filter((val) => {
      if (clas != cls) {
        return <p>No Data Available !!!</p>;
      } else if (val.class_course.toLowerCase().includes(clas.toLowerCase())) {
        return val;
      }
    });

    setFilteredResults(classResult);
  };
  const searchKey = (key) => {
    const filterResult = data.filter((val) => {
      if (key == "") {
        return val;
      } else if (val.teacher_name.toLowerCase().includes(key.toLowerCase())) {
        return val;
      }
    });
    setFilteredResults(filterResult);
  };

  const [stdCourseId, updateStdCourseId] = useState("");
  const [stdClassName, updateStdClassName] = useState("");

  async function getClassWiseStudents(e) {
    try {
      updateStdClassName(e.target.options[e.target.selectedIndex].text);

      const formData = new FormData();

      formData.append("cource_id", stdCourseId);
      formData.append("class_id", e.target.value);

      const response = await axios.post(
        process.env.REACT_APP_API_KEY +
          "admin_get_courcewise_and_classwise_students_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      if (response.data.error_code == 200) {
        setData(response.data.data);
      } else {
        setData([]);
      }

      updateError_code(response.data.error_code);
      updateError_message(response.data.message);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
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

            Authorization: token,
          },
        }
      );

      updateError_code(response.data.error_code);
      updateError_message(response.data.message);

      if (response.data.error_code == 200) {
        setEmailData(response.data.data);
        $(".formSuccess").show();
        setTimeout(function() {
          $(".formSuccess").hide();
        }, 3000);
        $(".sendEmailMessage").hide();
        fetchList();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const downloadExcel = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(EXCEL_FILE_BASE64);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    let blob = new Blob(byteArrays, { type: "application/vnd.ms-excel" });
    FileSaver.saveAs(new Blob([blob], {}), "studentlist-format.xlsx");
  };

  async function fetchList() {
    try {
      const fetchStudentResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_students_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      console.log("fetchStudentResponse-----------", fetchStudentResponse);
      const StudentErrorCode = fetchStudentResponse.data.error_code;
      const StudentErrorMsg = fetchStudentResponse.data.message;
      if (StudentErrorCode == 200) {
        const studentListArray = fetchStudentResponse.data.data;
        setData(studentListArray);
        setFilteredResults(studentListArray);
      } else {
        setData([]);

        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
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

  function fetchClass(e) {
    updateStudentClass(e.target.value);
    updateStdClassName(e.target.options[e.target.selectedIndex].text);
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

  const [classdata, setClassData] = useState([]);

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

  function addStudents() {
    $(".add_students_modal").toggle();
  }
  function removeStudent() {
    $(".student_add_new_modal").hide();
  }

  useEffect(() => {
    getUserDetails();
    fetchCourseList();
    fetchList();
    fetchClassList();
    fetchDepartmentList();
    fetchPersonaList();
  }, []);

  const [nameOfStudent, updateNameOfStudent] = useState([]);

  const [studentList, updateStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteStudent(std_id, std_name) {
    updateNameOfStudent(std_name);

    $(".delete_container").show();
    try {
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

      updatedeleteErrorMessage(deleteResponse.data.message);
      // if(deleteResponse.data.error_code == 200)
      // {
      //   window.location.reload();
      // }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const getImage = (e) => {
    if (e.target.files.length > 0) {
      var src = e.target.files[0];
      setStudentFile(src);
      $("#file-ip-1-preview").html(src.name);
      updateStudentList(src.name);
    }
  };

  async function uploadExcel() {
    try {
      // setIsLoading(true);
      const excelFile = document.getElementById("file-ip-1");

      if (excelFile.value == "") {
        $(".error_modal").show();

        setTimeout(function() {
          $(".error_modal").hide();
        }, 3000);
        return;
      } else {
        const formData = new FormData();

        formData.append("uploadFile", studentFile);
        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_upload_excel_file_student",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: token,
            },
          }
        );

        setIsLoading(false);
        updateStudentList(response.data);
        updateError_message(response.data.message);

        updateStudentList("");
        $(".add_students_modal").hide();

        if (response.data.error_code == 200) {
          $(".formSuccess").show();
          $(".student_add_new_modal").hide();
          setTimeout(function() {
            $(".formSuccess").hide();
          }, 5000);
          fetchList();
          $(".student_add_new_modal").hide();
          $(".add_students_modal").hide();
        } else {
          $(".ErrorMessage").show();
          $(".student_add_new_modal").hide();
          setTimeout(function() {
            $(".ErrorMessage").hide();
          }, 5000);
        }
      }
    } catch (err) {
      console.log("Log in Fail.................", err);
      setIsLoading(false);
    }
  }

  function close_mail_popup() {
    $(".sendEmailMessage").hide();
  }
  function fetchId(id, email) {
    $(".sendEmailMessage").show();

    const student_email = email;
    const student_id = id;
    updateEmail(student_email);
    updateStudentId(student_id);
  }
  const [departmentdata, setDepartmentData] = useState([]);
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

  const [personadata, setPersonaData] = useState([]);
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

  function viewStudent(student_id) {
    history.push("/viewStudent", { student_id });
  }

  const openActionsModal = (e) => {
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };

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
      name: "Student Name",
      selector: "student_name",

      wrap: true,
      cell: (row) => {
        return (
          <div
            className="ten_font_class"
            style={{ fontWeight: "700", cursor: "pointer" }}
            onClick={() => viewStudent(row.student_id)}
          >
            {row.first_name} {row.last_name}
          </div>
        );
      },
    },

    {
      name: "Student Id",
      selector: "student_id",
      sortable: true,
      wrap: true,
      cell: (row) => {
        return <div className="ten_font_class">{row.student_id}</div>;
      },
    },
    {
      name: "Persona",
      selector: "persona",

      wrap: true,
      cell: (row) => {
        return <div className="ten_font_class">{row.persona}</div>;
      },
    },
    {
      name: "Email Id",
      selector: "email",
      sortable: true,
      wrap: true,
      cell: (row) => {
        return (
          // <div style={{fontWeight:"700"}}>{row.email}</div>
          <a
            href="#"
            className="overflow_class ten_font_class"
            style={{ width: "130px" }}
          >
            {row.email}
          </a>
        );
      },
    },
    {
      name: "Class Name",
      selector: "course",
      wrap: true,
      cell: (row) => {
        return (
          <div
            className="overflow_class ten_font_class"
            style={{ width: "130px" }}
          >
            {row.class}
          </div>
        );
      },
    },

    {
      name: "",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <>
            <div className="action_buttons_end_css">
              <button
                className="all_action_buttons"
                onClick={() => openActionsModal(row.student_id)}
              >
                Actions
              </button>

              <div
                class={`edit_campus_modal actions_modal${row.student_id}`}
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
                  onClick={() => editNewsRow(row.student_id)}
                >
                  <div className=" d-flex flex-row">
                    <div>
                      <img className="campus_img" src="dist/img/Pencil.png" />
                    </div>
                    <div className="campus_inner_div">
                      <span className="ten_font_class">Edit</span>
                    </div>
                  </div>
                </div>

                <button
                  className=" d-flex flex-row hover_class"
                  onClick={() => deleteNews(row.student_id)}
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
                      <span className="ten_font_class">Delete</span>
                    </div>
                  </div>
                </button>
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
                          <img
                            src="dist/img/Cancel.png"
                            className="cancel_img"
                          />
                        </span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p className="pl-3 pb-2">
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
                              You are deleting a screen. This operation cannot
                              be
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
                        <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
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
                              style={{background:"white"}}
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
                            <div className="col-md-4 d-flex p-0" style={{alignItems:"center"}}>
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
            </div>
          </>
        );
      },
    },

    // {
    //   name: "Action",
    //   wrap: true,
    //   cell: (row) => {
    //     return (
    //       <div className="d-flex">
    //         <a
    //           className="cta"
    //           href="#edit"
    //           onClick={() => editNewsRow(row.student_id)}
    //           style={{ backgroundColor: "transparent" }}
    //         >
    //           <img
    //             style={{ width: "20px", height: "20px", marginLeft: "2px" }}
    //             src="dist/img/Pencil.png"
    //           />
    //           &nbsp;
    //         </a>
    //         <a
    //           className="cta"
    //           href="#deleterow"
    //           onClick={() => deleteNews(row.student_id)}
    //           style={{ backgroundColor: "transparent" }}
    //         >
    //           <img
    //             style={{ width: "20px", height: "20px", marginLeft: "2px" }}
    //             src={require("../images/delete.png")}
    //           />
    //           &nbsp;
    //         </a>

    //         <a
    //           className="cta"
    //           href="#google"
    //           onClick={() => fetchId(row.student_id, row.email)}
    //           style={{ backgroundColor: "transparent" }}
    //         >
    //           <img
    //             style={{ width: "20px", height: "20px", marginLeft: "30px" }}
    //             src="dist/img/New Message.png"
    //           />
    //         </a>
    //       </div>
    //     );
    //   },
    // },
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
      // <FilterComponentStudent
      //   onFilter={e => setFilterText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterText}
      // />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);

  const [stdEmail, updateStdEmail] = useState("");
  const [stdMobile, updateStdMobile] = useState("");
  async function editNewsRow(studentId) {
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
    console.log(
      "GET SINGLE STUDNET----------------",
      editNewsResponse.data.data
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
        updateStudentClass(item.class_id);
        updateClassName(item.student_class);
        updateStdEmail(item.email);
        updateStdMobile(item.mobile);
        updateDepartmentId(item.department_id);
        updateDepartment(item.department);
        updateCourseId(item.course_id);
        updateCourse(item.course);
        updateClassId(item.class_id);
        updateStudentClass(item.class_course);
        updateEmail(item.email);
        updateMobile(item.mobile);
        updatePersonaId(item.persona_id);
        updatePersona(item.persona);
      });
    }
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  function deleteNews(std_id) {
    updateStudentId(std_id);
    $(".deleteStudentModal").show();
    $(".edit_campus_modal").hide();
  }

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
      $(".deleteStudentWithPass").hide();
      updateDeletePassword("");
      deleteNewsApi();
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

      $(".edit_campus_modal").hide();
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
    fetchList();
    $(".edit_popup_password").hide();
    toast.success("Student Deleted Successfully!!");
  };
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
    }else{toast.error(deleteNewsResponse.data.message)}
  }
  const handleEditButton = () => {
    $(".editWithPassModal").hide();
    $(".edit_container").hide();
    fetchList();
    toast.success("Student Edited Successfully!!");
  };

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
    } else {
      $(".editWithPassModal").hide();
    }
  }

  function close_edit_modal() {
    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
   
  }
  function update_edited_News() {
    $(".editWithPassModal").show();
    $(".edit_container").hide();
  }

  function close_delete_modal() {
    $(".preview_category").hide();
    $(".edit_campus_modal").hide();
  }
  function close_student_modal() {
    $(".preview_category").hide();
    updateStudentList("");
    $(".edit_campus_modal").hide();
  }

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        class="formSuccess"
        style={{
          marginTop: "5px",
          marginLeft: "18px",
          width: "97%",
          marginRight: "198px",
          display: "none",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <div
        class="ErrorMessage"
        style={{
          marginTop: "5px",
          marginLeft: "18px",
          width: "97%",
          marginRight: "198px",
          display: "none",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <div
        id="google"
        className="sendEmailMessage"
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
            width: "400px",
            height: "100%",
            overflow: "auto",
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
              style={{ color: "black", fontSize: "13px", fontWeight: "700" }}
            >
              Send Email
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_mail_popup()}
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div
              style={{
                marginTop: "5px",
                fontSize: "11PX",
                margin: "0",
                padding: "0",
              }}
            >
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
              <div className="form-group border_class2 mt-2 edit_row_padding">
                <div className="row">
                  <div className="col-md-12">
                    <div>
                      <label
                        className="all_labels"
                        htmlFor="exampleInputEmail1"
                      >
                        Email ID
                      </label>
                      <input
                        type="name"
                        className="border all_edit_inputs"
                        id="emailId"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                        readOnly
                      />

                      <div
                        class="Email"
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
                          Please Enter Email
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="row">
                    <div className="col-md-12">
                      <div>
                        <label className="all_labels">Subject</label>
                        <input
                          type="name"
                          className="border all_edit_inputs"
                          id="subjectName"
                          placeholder="Subject"
                          value={subject}
                          onChange={(e) => updateSubject(e.target.value)}
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="row">
                    <div className="col-md-12">
                      <div>
                        <label className="all_labels">Description</label>
                        <textarea
                          type="name"
                          className="border all_edit_inputs"
                          id="descriptionName"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => updateDescription(e.target.value)}
                          style={{
                            height: "100px",
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
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="d-flex mt-3 edit_buttons_div border_class2"
                style={{ justifyContent: "end" }}
              >
                <input
                  type="button"
                  className="create_btn edit_update_button"
                  value="Submit"
                  onClick={() => createMessage()}
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

      {/* edit campus news */}
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Student</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div className="preview_form">
              <div className="edit_top_label">
                <p>Name & Surname</p>
              </div>
              <div className="mt-2 edit_border_class">
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
              <div class="edit_border_class">
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

                <div className="col-md-3">
                  <label className="all_labels">Class :</label>
                </div>
                <div className="col-md-9">
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

                {/* <div class="col-md-12 mt-2">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <label className="all_labels">
                        Date Of Birth
                      </label>
                      
                      <input
                        type="date"
                        className="input_fields all_edit_inputs"
                       
                        id="publishdate"
                        value={dob}
                        onChange={(e) => updateDob(e.target.value)}
                        name="birthdaytime"
                        
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
                  </div> */}
              </div>

              <div className="d-flex mt-2 edit_buttons_div border_class2">
                
                  <button
                    className="edit_cancel_button"
                    value="Cancel"
                    onClick={() => close_edit_modal()}
                  >Cancel</button>

                  <button
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edited_News()}
                  >Update</button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* } */}

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

      <div id="addStudents" className="student_add_new_modal">
        <div
          className="student_inner_div border_class2"
          style={{ width: "380px" }}
        >
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "12px" }}
              >
                Import Students
              </p>
              <br></br>
              <div>
                <p
                  style={{
                    fontWeight: "500",
                    color: "black",
                    fontSize: "10px",
                  }}
                >
                  To import students, select a CSV or vCard file.
                </p>
              </div>
              <div class="row">
                <div class="" style={{ padding: "0" }}>
                  <div
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      paddingRight: "0",
                      height: "85px",
                    }}
                  >
                    <label for="file-ip-1">
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          style={{
                            background: "#1F3977",
                            color: "#FFFFFF",
                            height: "30px",
                            width: "90px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "3px",
                            fontWeight: "500",
                            fontSize: "12px",
                          }}
                        >
                          Select file
                        </div>
                        <div
                          id="file-ip-1-preview"
                          style={{
                            display: "block",
                            width: "200px",
                            overflow: "auto",
                            fontSize: "12px",
                            fontWeight: "500",
                            marginLeft: "13px",
                            paddingTop: "8px",
                          }}
                        ></div>
                      </div>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => getImage(e)}
                      id="file-ip-1"
                      accept=".pdf,.xlsx,.xls,application/vnd.ms-excel"
                      className="input_fields"
                      name="birthdaytime"
                      style={{
                        visibility: "hidden",
                        color: "black",
                        fontSize: "11px",
                        width: "100%",
                        marginTop: "20px",
                      }}
                    />
                  </div>
                  <div
                    class="error_modal"
                    style={{
                      marginTop: "5px",
                      display: "none",
                      width: "97%",
                      marginBottom: "5px",
                    }}
                  >
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert variant="filled" severity="error">
                        Please select file
                      </Alert>
                    </Stack>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-3">
                <a
                  onClick={close_student_modal}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className=""
                    value="Cancel"
                    style={{
                      background: "#ffffff",
                      border: "none",
                      color: "#4779F0",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  />
                </a>

                <input
                  type="button"
                  value="Import"
                  onClick={() => uploadExcel()}
                  style={{
                    background: "#ffffff",
                    border: "none",
                    color: "#4779F0",
                    marginLeft: "35px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                />

                <div
                  class="formError"
                  style={{ marginTop: "-6px", display: "none" }}
                >
                  <h4
                    class="login-text"
                    style={{ color: "red", fontSize: "10PX", marginLeft: "0" }}
                  >
                    Please Select the File
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* model end */}

      <div classname="content-wrapper">
        <div style={{ width: "100%", padding: "0" }}>
          <div className="row border_class2 search_box_padding">
            <div className="col-md-3 d-flex flex-row">
              <div className="search_box_div">
                <img
                  className="search_box_img"
                  src={require("../images/Search.png")}
                />

                <Input
                  className="search_box"
                  id="search"
                  type="text"
                  placeholder="Search by Name"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div
              className="col-md-9 d-flex flex-row"
              style={{ justifyContent: "end" }}
            >
              <div className="d-flex">
                <a
                  href={StudentExcel}
                  download="addStudents.xlsx"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "11PX",
                      lineHeight: "18px",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                    }}
                  >
                    <img
                      src="dist/img/Download.png"
                      style={{ width: "15px", height: "15px" }}
                    />
                  </div>
                </a>
              </div>

              <div className="d-flex flex-row" style={{ alignItems: "center" }}>
                <p
                  className="faq_bar"
                  style={{
                    marginLeft: "13px",
                    marginRight: "13px",
                    color: "#4AA081",
                  }}
                >
                  |
                </p>
              </div>

              <div className=" d-flex flex-row">
                <button
                  type="button"
                  className="d-flex add_faq_button"
                  defaultValue="Sign Up"
                  style={{
                    justifyContent: "end",
                    position: "relative",
                    height: "26px",
                  }}
                  onClick={addStudents}
                >
                  <span style={{ fontSize: "10px", fontWeight: "500" }}>
                    Add students
                  </span>
                  <div
                    style={{
                      marginLeft: "5px",
                      fontSize: "12.25PX",
                      fontWeight: "400",
                      fontFamily: "Poppins",
                    }}
                  ></div>
                  <img
                    src="dist/img/AddNew.png"
                    style={{
                      width: "15px",
                      height: "15px",
                      marginLeft: "13px",
                    }}
                  />
                </button>
                <div
                  class="add_students_modal"
                  id="add_modal1"
                  style={{ display: "none", position: "absolute" }}
                >
                  <div className="  hover_class">
                    <Link
                      to="/addStudent"
                      style={{
                        display: "flex",
                        padding: "5px 10px",
                        alignItems: "center",
                      }}
                    >
                      <div className=" d-flex flex-row">
                        <img
                          src="dist/img/CollaboratorMale.png"
                          style={{ width: "15px", height: "15px" }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: "5px",
                          color: "#000000",
                          fontSize: "11PX",
                          lineHeight: "18px",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                        }}
                      >
                        Add a student
                      </div>
                    </Link>
                  </div>

                  <div className=" d-flex flex-row hover_class">
                    <a
                      href="#addStudents"
                      style={{
                        display: "flex",
                        padding: "5px 10px",
                        alignItems: "center",
                      }}
                    >
                      <div className=" d-flex flex-row">
                        <img
                          src="dist/img/UserAccount.png"
                          style={{ width: "15px", height: "15px" }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: "5px",
                          color: "#000000",
                          fontSize: "11PX",
                          lineHeight: "18px",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                        }}
                      >
                        Add multiple student
                      </div>
                    </a>
                  </div>
                </div>
                {/* modal end */}
              </div>
            </div>
          </div>

          <div>
            {/* <div className="row border_class2 box_padding">
              <div className="col-md-4">
                <label className="all_labels">
                  Select Department
                </label>
               

                <select
                  className="cat_dropdown all_inputs"
                  id="department_neww"
                  onChange={departmentWiseCourseList}
                  style={{background: "#F5F5F5"}}
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

              <div className="col-md-3">
               <div className="left_padding">
                <label className="all_labels">
                  Select Course
                </label>
                

                <select
                  id="student_course"
                  onChange={getCourseWiseStudents}
                  className="cat_dropdown all_inputs"
                  style={{background: "#F5F5F5"}}
                >
                  <option
                    selected="selected"
                    style={{
                      color: "black",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "11px",
                      lineHeight: "21px",
                    }}
                  >
                    Select Course
                  </option>

                  {courseData.length > 0 ? (
                    courseData.map((cls, index) => {
                    
                      return (
                        <option
                          value={cls.course_id}
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
                          {cls.course_name}
                        </option>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}
                </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="left_padding">
                <label className="all_labels">
                  Select Class
                </label>
                

                <select
                  id="selectClass"
                  onChange={getClassWiseStudents}
                  className="cat_dropdown all_inputs"
                  style={{background: "#F5F5F5"}}
                >
                  <option
                    selected="selected"
                    style={{
                      color: "#000000",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "21px",
                    }}
                  >
                    Select Class
                  </option>

                  {classList && classList.length > 0 ? (
                    classList.map((item, index) => {
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
                </div>
              </div>
            </div> */}

            <div className="border_class2 box_padding">
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
                customStyles={customStyles}
                // selectableRows
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
