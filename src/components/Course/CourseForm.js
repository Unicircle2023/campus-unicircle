import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingSpinner from "../LoadingSpinner";

export function CourseForm() {
  const token = localStorage.getItem('Token');
  const [department, updateDepartment] = useState("");
  const [course, updateCourse] = useState("");
  const [departmentdata, setDepartmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error_message, updateError_message] = useState("");
  

  async function createCourse() {
    try {
      const department_name = document.getElementById("departmentName");
      const course_name = document.getElementById("courseName");

      if (department_name.value == "" &&
        course_name.value == ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function () {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      }

      else if (department_name.value == "") {

        $(".DepartmentName").show();

        setTimeout(function () {
          $(".DepartmentName").hide();
        }, 3000);

      }

      else if (course_name.value == "") {

        $(".CourseName").show();

        setTimeout(function () {
          $(".CourseName").hide();
        }, 3000);

      }

      else {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("course_name", course);
        formData.append("department_id", department);

        const courseResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_create_course",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',
              "Authorization": token,
            }
          });

        console.log("Create Course", courseResponse);
        setIsLoading(false)
        updateError_message(courseResponse.data.message);
        updateDepartment("");
        updateCourse("");
        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
        }, 3000);
        window.location.href = "/courseDetails"
      


      }
    }
    catch (err) {
        console.log("Log in Fail", err);
        setIsLoading(false)
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

      if (DepartmentErrorCode == 200) {
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

  useEffect(() => {
    fetchDepartmentList();
  }, []);

 

  return (
      <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>

        <div className="border_class2 box_padding" >

          <h1 className="main_heading_h1">CREATE COURSE</h1>
        </div>

        <div class="formSuccess success_msg">
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

        {/* end news category pop up */}
        {isLoading ? <LoadingSpinner />
        :
        <div className="border_class2 box_padding">
          <div style={{ borderBottom: "1px solid #1F3977", padding: "10px", fontWeight: "500" }}>
          </div>
          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-5 d-flex">
                <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                  <div className="d-flex">
                    <label className="all_labels">Department</label>

                    <p className="all_stars">*</p>
                  </div>

                  <select className="form-select form-select-sm all_inputs"
                    id="departmentName"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateDepartment(e.target.value)}>
                   
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

            </div>
          </div>

          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-5">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Course Name</label>

                    <p className="all_stars">*</p>
                  </div>
                  <input type="name"
                    placeholder="Enter Course Name"
                    id="courseName"
                    className="all_inputs"
                    value={course}
                    onChange={(e) => updateCourse(e.target.value)}
                   
                  />
                
                  <div
                    class="CourseName"
                    style={{display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Course Name.
                    </h4>
                  </div>


                </div>
              </div>

            </div>

          </div>


          {/* buttons */}
          <div className="d-flex form-buttons mt-1">

            <div class="ValueMsg" style={{ margin: "8px", width: "60%", display: "none" }}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                  Error! You Must Fill In All The Fields
                </Alert>
              </Stack>
            </div>

<div className="d-flex" style={{width:"100%",justifyContent:"end",marginRight:"30px"}}>
<input
              type="button"
              className=" publish_button"
              onClick={() => createCourse()}
              value="Publish"
              // style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "auto", backgroundColor: "#1F3977", padding: "10px 30px", fontSize: "10PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginBottom: "20px" }}
            />
</div>
           
           
          </div>


        </div>
       }



      </div>
    )
  }

