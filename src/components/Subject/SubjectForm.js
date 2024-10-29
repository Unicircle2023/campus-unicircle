import React, { useState, useEffect } from 'react'
import axios from 'axios';
import $ from "jquery";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link,useHistory  } from "react-router-dom";

export function SubjectForm() {

  const token = localStorage.getItem('Token');
  const [department, updateDepartment] = useState("");
  const [course, updateCourse] = useState("");
  const [class_name, updateClassName] = useState("");
  const [subject, updateSubject] = useState("");
  const [departmentdata, setDepartmentData] = useState([]);
  const [coursedata, setCourseData] = useState([]);
  const [classdata, setClassData] = useState([]);
  const [subjectType, updateSubjectType] = useState("");
  const [error_message, updateError_message] = useState("");
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");
  
  const history = useHistory();
  
  async function createSubject() {

    try {
      const departmentName = document.getElementById("department_name");
      const courseName = document.getElementById("course_name");
      const subjectClass = document.getElementById("subject_class");
      const subjectName = document.getElementById("subject_name");
      const subType = document.getElementById("subject_type");


      if (departmentName.value === "" &&
          courseName.value === "" &&
          subjectClass.value === "" &&
          subjectName.value === "" &&
          subType.value === "" 
       ) {
        $(".ValueMsg").show();

        setTimeout(function () {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      }

      else if (departmentName.value === "") {

        $(".DepartmentName").show();

        setTimeout(function () {
          $(".DepartmentName").hide();
        }, 3000);

      }

      else if (courseName.value === "") {

        $(".CourseName").show();

        setTimeout(function () {
          $(".CourseName").hide();
        }, 3000);

      }
      else if (subjectClass.value === "") {

        $(".SubjectClass").show();

        setTimeout(function () {
          $(".SubjectClass").hide();
        }, 3000);

      }
      else if (subjectName.value === "") {

        $(".SubjectName").show();

        setTimeout(function () {
          $(".SubjectName").hide();
        }, 3000);

      }

      else if (subType.value === "") {

        $(".SubjectType").show();

        setTimeout(function () {
          $(".SubjectType").hide();
        }, 3000);

      }

      else {

        const formData = new FormData();
        
        formData.append("subject_name", subject);
        formData.append("department_id", departmentId);
        formData.append("course_id", courseId);
        formData.append("class_id", class_name);
        formData.append("subject_type", subjectType);
       

        const response = await axios.post(process.env.REACT_APP_API_KEY + "add_subject",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',

              "Authorization": token,
            }
          });

        console.log("Create Subject", response);

        updateError_message(response.data.message);
        updateDepartment("");
        updateCourse("");
        updateClassName("");
        updateSubject("");
        updateSubjectType("");


        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
          
        }, 3000);

          // window.location.href = "/subjectDetails";
         
          history.push('/subjectDetails');
         

      }
    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }
  
  async function fetchDepartmentList() {
    try {

      const fetchDepartmentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_department_list",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get Department List Details", fetchDepartmentResponse);

      const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
      console.log("Department Error Code ", DepartmentErrorCode);

      if (DepartmentErrorCode === 200) {
        const departmentListArray = fetchDepartmentResponse.data.data;
        console.log("Department list Array", departmentListArray);
        setDepartmentData(departmentListArray);

      }
      else {
        setDepartmentData([]);
    }
  }
    catch (err) {
      console.log("Log in Fail", err);

    }

}

async function fetchCourseWiseClassList(cource_id) {
  try {
    const formData = new FormData();
    formData.append("department_id", departmentId);
    formData.append("cource_id", cource_id);
    const fetchClassResponse = await axios.post(process.env.REACT_APP_API_KEY + "dept_by_get_classes_list",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      }
    );

    console.log("Get Class List Details", fetchClassResponse);

    const ClassErrorCode = fetchClassResponse.data.error_code;
    console.log("Class Error Code ", ClassErrorCode);

    if (ClassErrorCode === 200) {
      const classListArray = fetchClassResponse.data.data;
      console.log("Class list Array", classListArray);
      setClassData(classListArray);

    }
    else {
      setClassData([]);
  }
}
  catch (err) {
    console.log("Log in Fail", err);

  }

}


const [departmentId, setDepartmentId] = useState("")

const getDepartment = (e) => {
  updateDepartment(e);
  console.log("event",e)
  {
    departmentdata.map((dept) => {
      if (e == dept.department_id) {
        fetchDeptWiseCourseList(dept.department_id);
        setDepartmentId(dept.department_id);
      }
    })
  }
}

const getCourse = (e) => {
  updateCourse(e);
  console.log("get course",e)
  {
    coursedata.map((teach) => {
      if (e == teach.course_id) {
        fetchCourseWiseClassList(teach.course_id)
        setCourseId(teach.course_id);
      }

    })
  }

}
const getClass = (e) => {
  updateClassName(e);
  console.log("get course",e)
  {
    classdata.map((teach) => {
      if (e == teach.class_id) {
        setClassId(teach.class_id);
      }

    })
  }

}

async function fetchDeptWiseCourseList(value) {
  console.log("value", value)
  try {
    const formData = new FormData();
    formData.append("d_id", value);
    const fetchResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      }
    );


    console.log("Get Course List Details", fetchResponse);


    const ErrorCode = fetchResponse.data.error_code;
    console.log("course Error Code ", ErrorCode);

    if (ErrorCode == 200) {
      const courseListArray = fetchResponse.data.data;
      console.log("course list Array", courseListArray);
      setCourseData(courseListArray);
    }
    else {
      setCourseData([]);
    }

  }
  catch (err) {
    console.log("Log in Fail", err);

  }

}

  useEffect(() => {
    fetchDepartmentList();
    // fetchClassList();
  }, []);


  return (
    <div className="content-wrapper">

      <div className="border_class2 box_padding">

        <h1 className="main_heading_h1">CREATE SUBJECT</h1>
      </div>


      <div class="formSuccess success_msg">
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <div className='border_class2 box_padding'>

        {/*reason  */}
        <div className=" p-0">
          <div class="row">
            <div class="col-md-6">
              <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                  <label className="all_labels">Department</label>

                  <p className="all_stars">*</p>
                </div>

                <select className="form-select form-select-sm all_inputs"
                    id="department_name"
                    aria-label=".form-select-sm example"
                   
                    onChange={(e) => getDepartment(e.target.value)}>
                    
                    <option selected="selected" value={department} >Select Department</option>
                    {departmentdata.map((dept, index) => {
                      return (
                        <option value={dept.department_id} key={index}>
                          {dept.department_name}
                        </option>
                      );
                    })}

                  </select>
                <div
                  class="DepartmentName"
                  style={{display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Department
                  </h4>
                </div>

              </div>

            </div>

            <div class="col-md-6">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Course</label>

                  <p className="all_stars">*</p>
                </div>

                <select className="form-select form-select-sm all_inputs"
                    id="course_name"
                    aria-label=".form-select-sm example"
                   
                    onChange={(e) => getCourse(e.target.value)}>
                   
                    <option selected="selected" value={course} >Select Course</option>
                    {coursedata.map((crs, index) => {
                      return (
                        <option value={crs.course_id} key={index}>
                          {crs.course_name}
                        </option>
                      );
                    })}

                  </select>

                <div
                  class="CourseName"
                  style={{display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Course
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
              <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                  <label className="all_labels">Class</label>

                  <p className="all_stars">*</p>
                </div>

                <select className="form-select form-select-sm all_inputs"
                    id="subject_class"
                    aria-label=".form-select-sm example"
                    // onChange={(e) => updateClassName(e.target.value)}
                    onChange={(e) => getClass(e.target.value)}  >                 
                   
                    <option selected="selected" value={class_name} >Select Class</option>
                    
                    {classdata.length>0&&classdata.map((cls, index) => {
                      return (
                        <option value={cls.class_id} key={index}>
                          {cls.class_name}
                        </option>
                      );
                    })}
                   
                  </select>

                <div
                  class="SubjectClass"
                  style={{display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Class
                  </h4>
                </div>

              </div>

            </div>
            <div class="col-md-6">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Subject Name</label>

                  <p className="all_stars">*</p>
                </div>
                <input type="text"
                 id="subject_name"
                 onChange={(e) => updateSubject(e.target.value)}
                 value={subject} 
                 placeholder="Enter Subject Name"
                 className="all_inputs"
                 name="birthdaytime"
               />
              
                <div
                  class="SubjectName"
                  style={{display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter Subject Name
                  </h4>
                </div>

              </div>

            </div>

          </div>
        </div>


        {/* duration */}
        <div className="mt-2 p-0">
          <div class="row">
            <div class="col-md-12 d-flex">
              <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                  <label className="all_labels">Subject Type</label>

                  <p className="all_stars">*</p>
                </div>

                <select className="form-select form-select-sm all_inputs"
                    id="subject_type"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateSubjectType(e.target.value)}>
                   
                    <option selected="selected" value={subjectType}>Select Subject Type</option>
                    <option value="1" >Regular</option>
                    <option value="2" >Optional</option>
                  
                  </select>

                 <div
                  class="SubjectType"
                  style={{display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Subject Type
                  </h4>
                </div>

              </div>

            </div>

          </div>
        </div>


        {/* buttons */}
        <div className="d-flex form-buttons mt-4">

          <div class="ValueMsg" style={{ margin: "8px", width: "65%", display: "none" }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>         
        <div className='ml-auto'>
          <input
            type="button"
            className=" publish_button"     
            onClick={() => createSubject()}
            value="Publish"
            style={{marginRight:"11px"}}
            // style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginRight: "2s0PX" }}
          />
       </div>
        </div>


      </div>

    </div>
  )
}
