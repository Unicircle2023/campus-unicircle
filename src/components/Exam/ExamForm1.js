import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import moment from "moment";
import SummerNote from "../SummerNote/SummerNote";


export function ExamForm1() {
  var todayy = "";
  todayy = new Date().toISOString().slice(0, 16);
  console.log("Todayy", todayy);

  function getTodaysDate() {
    var date = new Date();
    var getDate = moment(date).format("YYYY-MM-DD HH:mm");
    console.log("get todays date", getDate);

    updatePublishDate(getDate);
  }

  function laterDate() {
    updatePublishDate("");
  }

  const token = localStorage.getItem("Token");
  const [category, updateCategory] = useState("");
  const [question, updateQuestion] = useState("");
  const [data, setData] = useState([]);
  const [error_message, updateError_message] = useState("");
  const history = useHistory();
  const [jobDescription_text, updateJobDescription_text] = useState("")
  const [examDesc, updateExamDesc] = useState("");

  async function createExamStep1() {
    try {
      const exam_Name = document.getElementById("exam_name");
     
      const DepartmentName = document.getElementById("department_neww");
      
      const CourseName = document.getElementById("student_course");
      const ExamClassName = document.getElementById("student_class");
      const publish_Date = document.getElementById("publish_date");
      const expire_Date = document.getElementById("expire_date");
      

      if (
        exam_Name.value == "" &&
        examDesc == "" &&
        DepartmentName.value == "" &&
        CourseName.value == "" &&
        ExamClassName.value == "" &&
        publish_Date.value == "" &&
        expire_Date.value == ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (exam_Name.value == "") {
        $(".ExamName").show();

        setTimeout(function() {
          $(".ExamName").hide();
        }, 3000);
      } else if (examDesc == "") {
        $(".ExamDesc").show();

        setTimeout(function() {
          $(".ExamDesc").hide();
        }, 3000);
      } else if (DepartmentName.value == "") {
        $(".std_dept").show();

        setTimeout(function() {
          $(".std_dept").hide();
        }, 3000);
      } else if (CourseName.value == "") {
        $(".std_course").show();

        setTimeout(function() {
          $(".std_course").hide();
        }, 3000);
      } else if (ExamClassName.value == "") {
        $(".std_class").show();

        setTimeout(function() {
          $(".std_class").hide();
        }, 3000);
      } else if (deliveryType == "") {
        checkRadio();
        $(".DeliveryType").show();

        setTimeout(function() {
          $(".DeliveryType").hide();
        }, 3000);
      } else if (publish_Date.value == "") {
        $(".PublishDate").show();

        setTimeout(function() {
          $(".PublishDate").hide();
        }, 3000);
      } else if (expire_Date.value == "") {
        $(".ExpireDate").show();

        setTimeout(function() {
          $(".ExpireDate").hide();
        }, 3000);
      } else {
        $(".formSuccess").show();

        setTimeout(function() {
          $(".formSuccess").hide();
          history.push("/examForm2", {
            examName,
            examDesc,
            courseId,
            classExam,
            publishDate,
            expireDate,
            deliveryType,
          });
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
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

  const [classList, updateClassList] = useState([]);
  const [courseList, updateCourseList] = useState([]);
  const [course, updateCourse] = useState("");
  const [classExam, updateClassExam] = useState("");
  const [examName, updateExamName] = useState("");
 
  const [deliveryType, updateDeliveryType] = useState("");
  const [publishDate, updatePublishDate] = useState("");
  const [expireDate, updateExpireDate] = useState("");

  const [userType, updateUserType] = useState([]);

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

      console.log("Get Course List Details", fetchCourseResponse.data.data);
      updateCourseList(fetchCourseResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  

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

      console.log("Get Class List Details", fetchClassResponse);

      const ClassErrorCode = fetchClassResponse.data.error_code;
      console.log("Class Error Code ", ClassErrorCode);

      if (ClassErrorCode === 200) {
        const classListArray = fetchClassResponse.data.data;
        console.log("Class list Array", classListArray);
        updateClassList(classListArray);
      } else {
        updateClassList([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    getCourseList();
    // getClassList();
    fetchDepartmentList();
  }, []);

  

  const [departmentdata, setDepartmentData] = useState([]);
  const [departmentId, updateDepartmentId] = useState("");
  const [courseData, updateCourseData] = useState([]);
  const [courseId, updateCourseId] = useState("");
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

      console.log("Get Department List", fetchDepartmentResponse.data.data);
      if (fetchDepartmentResponse.data.error_code == 200) {
        setDepartmentData(fetchDepartmentResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  // const [courseId, updateCourseId] = useState("")
  const [subjectId, updateSubjectId] = useState("");
  const [subjectName, updateSubjectName] = useState("");
  const [courseName, updateCourseName] = useState("");

  var course_id = "";
  async function courseWiseSubjectList(e) {
    fetchCourseWiseClassList(e.target.value);
    console.log("get id course/class", e.target.value);
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

    console.log("Get single exam timetable", deleteNewsResponse);
    if (deleteNewsResponse.data.error_code == 200) {
      setData(deleteNewsResponse.data.data);
    }
  }
  const [department, updateDepartment] = useState("");
  const [departmentName, updateDepartmentName] = useState("");
  const [errorCode, updateErrorCode] = useState("");
  async function departmentWiseCourseList(e) {
    console.log("get departent name", e.target.value);
    // console.log(event.target.options[event.target.selectedIndex].text);
    console.log(
      "get departent name",
      e.target.options[e.target.selectedIndex].text
    );
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

    console.log("Departmentwise course list", responsePersona.data.data);
    updateErrorCode(responsePersona.data.error_code);
    if (responsePersona.data.error_code == 200) {
      updateCourseData(responsePersona.data.data);
    }
  }
  const [studentClass, updateStudentClass] = useState("");
  const [stdClassName, updateStdClassName] = useState("");
  var class_id = "";
  async function fetchClass(e) {
    updateClassExam(e.target.value);
    updateStudentClass(e.target.value);
    class_id = e.target.value;
    console.log("get classname", e.target.options[e.target.selectedIndex].text);
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

    console.log("Get single exam timetable", deleteNewsResponse);
    if (deleteNewsResponse.data.error_code == 200) {
      setData(deleteNewsResponse.data.data);
    }
  }

  
  const handelSummenrnote = (e) => {
    updateExamDesc(e);
  };

  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
      <div className="border_class2 box_padding">
        <h1
          style={{
            color: "black",
            fontWeight: "600",
            fontFamily: "Poppins",
            fontSize: "16PX",
            lineHeight: "24PX",
            marginLeft: "15PX",
          }}
        >
          CREATE EXAM
        </h1>
      </div>

      <div
        class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            Step 1 data saved successfully
          </Alert>
        </Stack>
      </div>

      <div>
        
        <div className="border_class2 box_padding"
          style={{
            
            fontWeight: "500",
           
          }}
        >
          <div style={{ fontSize: "14px",marginLeft:"17px" }} class="d-flex">
            <p style={{ color: "#1F3977" }}>Step 1:</p>
            <p
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                marginLeft: "5px",
                fontSize: "13px",
              }}
            >
              Select Course & Class
            </p>
          </div>
        </div>

        <div className="border_class2 box_padding">
        <div className=" p-0">
          <div class="row" >
            <div class="col-md-5 d-flex">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
              >
                <div className="d-flex">
                  <label className="all_labels">
                    Exam Name
                  </label>

                  <p className="all_stars">
                    *
                  </p>
                </div>

                <input  className="all_inputs"
                  type="name"
                  id="exam_name"
                  placeholder="Enter exam name"
                  value={examName}
                  onChange={(e) => updateExamName(e.target.value)}
                 
                />
                <div
                  class="ExamName"
                  style={{ display: "none" }}
                >
                  <h4
                    class="login-text all_validations_h4">
                    Please Enter Exam Name
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 p-0">
          <div class="row">
            <div class="col-md-9 d-flex">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
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
                  class="ExamDesc"
                  style={{display: "none" }}
                >
                  <h4
                    class="login-text all_validations_h4">
                    Please Enter Exam Description
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="border_class2 box_padding">
          <div className="row" >
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
                    style={{ display: "none" }}
                  >
                    <h4
                      class="login-text all_validations_h4">
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
                 
                  {classList.length > 0 ? (
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
                <div class="std_class" style={{ display: "none" }}>
                  <h4
                    class="login-text all_validations_h4">
                    Please Select Class
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
              id="new_delivery_type"
              value={deliveryType}
              onChange={(e) => updateDeliveryType(e.target.value)}
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
                  onClick={() => laterDate()}
                >
                  <p style={{ marginLeft: "5px" }}>Later</p>
                </label>
              </div>
            </div>

            <div
              class="DeliveryType"
              id="spnError"
              style={{display: "none" }}
            >
              <h4
                class="login-text all_validations_h4">
                Please Select Delivery Type
              </h4>
            </div>
          </div>
        </div>
        </div>

        <div className=" border_class2 box_padding">
          <div class="row">
            <div class="col-md-4">
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
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
                  className="all_inputs"
                  placeholder="dd-mm-yyyy hh-mm"
                  id="publish_date"
                  value={publishDate}
                  min={todayy}
                  onChange={(e) => updatePublishDate(e.target.value)}
                  name="datetime"
                  style={{padding:'5px',width:"100%"}}
                />

                <div
                  class="PublishDate"
                  style={{display: "none" }}
                >
                  <h4
                    className="login-text all_validations_h4">
                    Please Select Publish Date
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                <label className="all_labels">
                  Exam End Date
                </label>
                <p className="all_stars">
                    *
                  </p>
                </div>
                <input
                  type="datetime-local"
                  className="all_inputs"
                  placeholder="dd-mm-yyyy hh-mm"
                  id="expire_date"
                  value={expireDate}
                  onChange={(e) => updateExpireDate(e.target.value)}
                  min={todayy}
                  name="datetime"
                  
                />

                <div
                  class="ExpireDate"
                  style={{display: "none" }}
                >
                  <h4
                    className="login-text all_validations_h4">
                    Please Select Expire Date
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="d-flex border_class2 box_padding" style={{alignItems:"center"}}>
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
          <div className="d-flex" style={{ width: "100%",justifyContent:"end"}}>
            <input
              type="button"
              className="publish_button"
              onClick={() => createExamStep1()}
              value="Next Step"
              style={{
               
              }}
            />
          </div>

          {/* </a> */}
        </div>
      </div>
    </div>
  );
}
