import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import $ from "jquery"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { IoMdAddCircle } from "react-icons/io"
import { BsImageFill } from "react-icons/bs"
import LoadingSpinner from "../LoadingSpinner";
import SummerNote from '../SummerNote/SummerNote';


export function DepartmentForm() {


  $(document).ready(function () {
    $("#dept_name").keypress(function (e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
  });

  const ref = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [departmentName, updateDepartmentName] = useState("");
  const [description, updateDescription] = useState("");
  
  const [departmentLogo, updateDepartmentLogo] = useState(null);
  
  
  const [error_message, updateError_message] = useState("");

  console.log("departmentName----------", departmentName)
  console.log("description----------", description)
  console.log("departmentLogo----------", departmentLogo)

 


  const token = localStorage.getItem('Token');
  const [data, setData] = useState([]);

  const [studentDetails, updateStudentDetails] = useState([]);
  const [studentId, updateStudentId] = useState([]);
  const [studentName, updateStudentName] = useState([]);
  const [showFlag, updateShowFlag] = useState("1");
  const [classId, updateClassId] = useState();
 
  async function getStudentList() {
    updateShowFlag("1");
    
    try {

      const fetchStudentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_teacher_list",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get all student", fetchStudentResponse.data.data);
      if (fetchStudentResponse.data.error_code == 200) {
        updateStudentDetails(fetchStudentResponse.data.data);
      }


    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  const [deptHeadName, updateDeptHeadName] = useState("")
  const [deptHeadId, updateDeptHeadId] = useState("")
  const getTeacherProfile = async (e) => {

    updateDeptHeadId(e.target.value)
    const formData = new FormData();
    console.log("get class id", e.target.value)
    formData.append("teacher_id", e.target.value);



    const response = await axios.post(process.env.REACT_APP_API_KEY + "get_teacher_profile",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',

          "Authorization": token,
        }
      });

    console.log("Get Teacher Profile", response.data.data);
    if (response.data.error_code == 200) {
      response.data.data.map((item) => {
        updateDeptHeadName(item.teacher_name)
      })
    }


  }
  useEffect(() => {
    getStudentList();

  }, []);


  function validation() {
    let form = document.getElementById('form')
    let email = document.getElementById('email').value
    let text = document.getElementById('text')
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if (email.match(pattern)) {
      form.classList.add('valid')
      form.classList.remove('invalid')
      text.innerHTML = "Your Email Address in valid"
      text.style.color = 'green'
    } else {
      form.classList.remove('valid')
      form.classList.add('invalid')
      text.innerHTML = "Please Enter Valid Email Address"
      text.style.color = '#ff0000'
    }

    if (email == '') {
      form.classList.remove('valid')
      form.classList.remove('invalid')
      text.innerHTML = ""
      text.style.color = '#00ff00'
    }
  }

 

  async function createDepartment() {
    try {
      //  setIsLoading(true)
      const deptName = document.getElementById("dept_name");
    
      const deptdesc = document.getElementById("dept_desc");
      


      if (deptName.value == "") {
        $(".DepartmentName").show();

        setTimeout(function () {
          $(".DepartmentName").hide();
        }, 3000);
        
      }

      else {
        const formData = new FormData();        
        formData.append("department_name", departmentName);
        formData.append("department_desc", description);
        formData.append("department_logo", departmentLogo);   
       
        const response = await axios.post(process.env.REACT_APP_API_KEY + "create_department",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',

              "Authorization": token,
            }
          });

        console.log("Create Department......................", response);
        setIsLoading(false)
        setData(response.data)
        updateError_message(response.data.message);

        updateDepartmentLogo("");
        updateDepartmentName("");
        updateDescription("");
        

        if (response.data.error_code == 200) {
          $(".formSuccess").show();

          setTimeout(function () {
            $(".formSuccess").hide();
          }, 5000);
          window.location.href = "/departmentDetails";
        }
        else {
          $(".formError").show();

          setTimeout(function () {
            $(".formError").hide();
          }, 5000);
        }
      }

    }
    catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false)
    }


  }


  function event_image() {
   // console.log("departmentLogo", departmentLogo)
    if (departmentLogo !== null) {
      console.log("logo is null....................")
    } else {

      $(".event_image").hide();

    }


  }
  
  function department_Logo() {

    if (departmentLogo != null) {
      setTimeout(() => {
        $(".event_image").hide();
       
        }, 3000);
    }


  }
  const [imgDeptLogo, setImgDeptLogo] = useState(null);
  const getImage = (e) => {
   
    updateDepartmentLogo(e.target.files[0]);
   
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display="block";
      setImgDeptLogo(src)
      if (src != null) {
        $(".event_image").hide();
       
      }
      
    }
  }
  const [imgData, setImgData] = useState(null);
  //console.log("preview image.................", imgData)
  

  // function edit_category() {
  //   $(".preview_polls").hide();
  //   $(".preview_category").show();
  // }
  // function closeEditCategory() {
  //   $(".preview_category").hide();
  // }
  // function close_preview() {
  //   $(".preview_polls").hide();
  // }


  const handelSummenrnote = (e) => {
    updateDescription(e);
  };

  return (
    <div className="content-wrapper">
      <div className="border_class2 box_padding">

        <h1 className="main_heading_h1">CREATE DEPARTMENT</h1>
      </div>


      <div class="formSuccess success_msg">
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>  

      <div class="formError" style={{ marginTop: "5px", marginLeft: "18px", width: "97%", marginRight: "198px", display: "none" }}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please Fill the Required Fields...
          </Alert>
        </Stack>
      </div>


      {isLoading ? <LoadingSpinner />
        :
        <form action="#" id="form">
          <div id="myForm">

            {/* department name */}
            <div className="border_class2 box_padding">
              <div class="row">
                <div class="col-md-7">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">Department Name</label>
                      <p className="all_stars">*</p>
                    </div>
                    <input
                      type="name"
                      id="dept_name"
                      className="all_inputs"
                      value={departmentName}
                      onChange={(e) => updateDepartmentName(e.target.value)}
                      placeholder="Department name goes here..."
                      autoComplete="true"
                      
                    />
                    <div
                      class="DepartmentName"
                      style={{display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Department Name
                      </h4>
                    </div>


                  </div>

                  <div className="mt-2" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">Department Description</label>

                    </div>

                    <SummerNote _onChange={handelSummenrnote}
                    value={description}
                    id="dept_desc"
                  />

                    <div
                      class="dept_desc"
                      style={{display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Department Description
                      </h4>
                    </div>

                  </div>
                </div>

                <div class="col-md-5" >
                  <div className="left_padding" >
                    <div className="d-flex">


                      <label className="all_labels">Department Logo</label>
                    </div>
                   
                    <label for="file-ip-1" class="file-ip-1 x" style={{width:"100%"}}>
                      <img
                        className="event_image "
                        src="dist/img/event_photo.png"
                        id="comp_logo"
                        onClick={() => department_Logo()}
                      />

                      <img id="file-ip-1-preview" style={{ display:"none", height:"175px"}} />
                    </label>
                    <input
                      type="file"
                      name="department_logo"
                      style={{ visibility: "hidden",display:"none" }}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={getImage}
                      multiple
                      id="file-ip-1"
                    />
                    <div
                      className="department_logo"
                      style={{display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Department Logo
                      </h4>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            

            {/* buttons */}
            <div className="border_class2 box_padding" style={{alignItems:"center"}}>

              <div class="ValueMsg" style={{ margin: "8px", width: "57%", display: "none" }}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Error! You Must Fill In All The Fields
                  </Alert>
                </Stack>
              </div>

              <div className='ml-auto' style={{display:"flex",justifyContent:"end"}}>

                <input
                  type="button"
                  className="publish_button"
                  defaultValue="Sign Up"
                  onClick={() => createDepartment()}
                  value="Publish"
                  // style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "10PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                />

              </div>

            </div>


          </div>
        </form>
      }

    </div>
  )
}
