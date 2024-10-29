import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

export function ClassForm() {
  const token = localStorage.getItem("Token");
  const uniName = localStorage.getItem("Uni_name");
  const campName = localStorage.getItem("Camp_name");
  const history = useHistory();

  const [department, updateDepartment] = useState("");
  const [course, updateCourse] = useState("");
  const [className, setClassName] = useState("");
  const [departmentdata, setDepartmentData] = useState([]);
  const [coursedata, setCourseData] = useState([]);
  
  const [error_message, updateError_message] = useState("");
  const [courseId, setCourseId] = useState("");

  async function createClass() {
    console.log("daytaaaaaaa",departmentId,courseId,className)
    try {
      const getClassName = document.getElementById("class_namee");

      if (getClassName.value === "") {
        $(".SubjectName").show();

        setTimeout(function() {
          $(".SubjectName").hide();
        }, 3000);
       
      } else {
        const formData = new FormData();
        formData.append("class_name", className);
        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "create_class",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: token,
            },
          }
        );

        console.log("Create class-----------", response);

        updateError_message(response.data.message);
        setClassName("")
        

        $(".formSuccess").show();

        setTimeout(function() {
          $(".formSuccess").hide();
          history.push("/classDetails")
        }, 3000);

        // window.location.href = "/classDetails";
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

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

      console.log("Get Department List Details", fetchDepartmentResponse);

      const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
      console.log("Department Error Code ", DepartmentErrorCode);

      if (DepartmentErrorCode === 200) {
        const departmentListArray = fetchDepartmentResponse.data.data;
        console.log("Department list Array", departmentListArray);
        setDepartmentData(departmentListArray);
      } else {
        setDepartmentData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  // async function fetchClassList() {
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

  //     console.log("Get Class List Details", fetchClassResponse);

  //     const ClassErrorCode = fetchClassResponse.data.error_code;
  //     console.log("Class Error Code ", ClassErrorCode);

  //     if (ClassErrorCode === 200) {
  //       const classListArray = fetchClassResponse.data.data;
  //       console.log("Class list Array", classListArray);
  //       setClassData(classListArray);

  //     }
  //     else {
  //       setClassData([]);
  //   }
  // }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }

  // }

  const [departmentId, setDepartmentId] = useState("");

  const getDepartment = (e) => {
    updateDepartment(e);
    console.log("event", e);
    {
      departmentdata.map((dept) => {
        if (e == dept.department_id) {
          fetchDeptWiseCourseList(dept.department_id);
          setDepartmentId(dept.department_id);
        }
      });
    }
  };

  const getCourse = (e) => {
    updateCourse(e);
    console.log("get course", e);
    {
      coursedata.map((teach) => {
        if (e == teach.course_id) {
          setCourseId(teach.course_id);
        }
      });
    }
  };

  async function fetchDeptWiseCourseList(value) {
    console.log("value", value);
    try {
      const formData = new FormData();
      formData.append("d_id", value);
      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get Course List Details", fetchResponse);

      const ErrorCode = fetchResponse.data.error_code;
      console.log("course Error Code ", ErrorCode);

      if (ErrorCode == 200) {
        const courseListArray = fetchResponse.data.data;
        console.log("course list Array", courseListArray);
        setCourseData(courseListArray);
      } else {
        setCourseData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchDepartmentList();
    
  }, []);

  return (
    <div className="content-wrapper">
      <div className="border_class2 box_padding" >
        <h1  className="main_heading_h1"> 
        
          CREATE CLASS
        </h1>
      </div>

      <div
        class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <div className="border_class2 box_padding" >
      
        {/*reason  */}
        <div className=" p-0">
          <div class="row">
            <div class="col-md-6">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
              >
                <div className="d-flex">
                  <label className="all_labels">
                    University
                  </label>

                  <p className="all_stars">
                    
                  </p>
                </div>

                <input
                  type="text"
                  id="uni_name"
                  value={uniName}
                  placeholder="University Name"
                  className="all_inputs"
                  name="birthdaytime"
                  readOnly
                />
              </div>
            </div>

            <div class="col-md-6">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">
                    Campus Name
                  </label>

                  <p className="all_stars">
                    
                  </p>
                </div>

                <input
                  type="text"
                  id="camp_name"
                  value={campName}
                  placeholder="Campus Name"
                  className="all_inputs"
                  name="birthdaytime"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

     
        <div className="mt-2 p-0">
          <div class="row">
            
            <div class="col-md-6">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
              >
                <div className="d-flex">
                  <label className="all_labels">
                    Class Name
                  </label>

                  <p className="all_stars">
                    *
                  </p>
                </div>
                <input
                  type="text"
                  id="class_namee"
                  onChange={(e) => setClassName(e.target.value)}
                  value={className}
                  placeholder="Enter Class Name"
                  className="all_inputs"
                  name="birthdaytime"
                />

                <div
                  class="SubjectName"
                  style={{  display: "none" }}
                >
                  <h4
                    class="login-text all_validations_h4">
                    Please Enter Class Name
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="d-flex form-buttons mt-2">
          <div
            class="ValueMsg"
            style={{ margin: "8px", width: "65%", display: "none" }}
          >
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>
          <div className="ml-auto">
            <input
              type="button"
              className=" publish_button"
              onClick={() => createClass()}
              value="Publish"
              style={{
               marginRight:"12px"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
