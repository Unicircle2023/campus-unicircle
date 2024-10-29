import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery"
import { useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { BiSearchAlt2 } from "react-icons/bi"
import { BsImageFill } from "react-icons/bs"
// import { PollsFormStep2 } from "./PollsFormStep2"
import { useHistory } from "react-router-dom";
import {Header} from "../Header"
import {Menu} from "../Menu"

export function ExamForm3() {
  const location = useLocation();
  const { examName } = location.state || { id: "none" };
  const { examDesc } = location.state || { id: "none" };
  const { courseId } = location.state || { id: "none" };
  const { classExam } = location.state || { id: "none" };
  const { publishDate } = location.state || { id: "none" };
  const { scheduleDate } = location.state || { id: "none" };
  const { expireDate } = location.state || { id: "none" };
  const { deliveryType } = location.state || { id: "none" };
  const { inputFields } = location.state || { id: "none" };
  const { ExamSubjectName } = location.state || { id: "none" };
  console.log("ExamSubjectName",classExam)
const [exam, updateExam] = useState(examName)

const [examCourse, updateExamCourse] = useState(courseId)
const [examClass, updateExamClass] = useState(classExam)
const [examPublishDate, updateExamPublishDate] = useState(publishDate)
const [examExpiryDate, updateExamExpiryDate] = useState(expireDate)
const [subName,updateSubName] = useState("")

{
  inputFields.map((item) =>
  {
    console.log("get subject id",item.subject_id)
    
   
    
  })
}


const [dateOfExam,updateDateOfExam] = useState(publishDate)
  console.log("exam data in thrid step")
  var subjectId = "";



  function currentDate()
  {
    var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var time = date.getHours()+":"+date.getMinutes();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day + " " + time;

    console.log("current date/time",today);
   
    document.getElementById("publish_date").value  = today;
  }

  const token = localStorage.getItem('Token');
  const [category, updateCategory] = useState("");
  const [categoryValue, updateCategoryValue] = useState("");
  const [question, updateQuestion] = useState("");
  const [data, setData] = useState([]);
  const [error_message, updateError_message] = useState("");
  const [pollsData, setPollsData] = useState([]);
  const history = useHistory();

  async function createPollStep1() 
  {
    
        const formData = new FormData();
   
        formData.append("exam_name", examName);
        formData.append("delivery_type", deliveryType);
        formData.append("description", examDesc);
        formData.append("start_date", publishDate);
        formData.append("end_date", expireDate);
        formData.append("class", classExam);
        formData.append("course", courseId);
        formData.append("subject", inputFields);

        const pollsResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_add_exam_timetable_step_first",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',
              "Authorization": token,
            }
          });

        console.log("Create Polls", pollsResponse.data.data);
        const pollsData = pollsResponse.data.data.poll_id
        // setPollsData(pollsResponse.data.data)

        console.log("Polls ID", pollsData);

        updateError_message(pollsResponse.data.message);


        updateCategory("");
        updateQuestion("");

        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
        }, 5000);

        setTimeout(function () {
          history.push("/exam", { pollsData })
        }, 3000);

      
      
    
   
  }

  const [department,updateDepartment] = useState([]);
  // const [classList,updateClassList] = useState([])
  const [subject,updateSubject] = useState([])
  const [userType,updateUserType] =useState([]);
async function getClassList()
{
  try {

    const fetchClassResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_classes_list",
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      }
    );

    console.log("Get class List Details", fetchClassResponse.data.data);
    updateUserType(fetchClassResponse.data.data);
   
  }
  catch (err) {
    console.log("Log in Fail", err);

  }
}

useEffect(() => {
  getClassList();
}, []);
  async function createPollsCategory() {
    try {
      const formDataCategory = new FormData();

      formDataCategory.append("category_name", categoryValue);


      const responseCategory = await axios.post(process.env.REACT_APP_API_KEY + "create_poll_category",
        formDataCategory,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        });

      console.log("Create Polls Category", responseCategory.data);
      updateCategoryValue([responseCategory.data])

      updateCategoryValue("");

    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }

  async function fetchPollsCategoryList() {
    const token = localStorage.getItem('Token');
    console.log("Access Token-", token);
    try {

      const fetchPollsListResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_poll_categories",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get Polls Category List Details", fetchPollsListResponse);

      const PollsCategoryErrorCode = fetchPollsListResponse.data.error_code;
      console.log("Polls Category Error Code ", PollsCategoryErrorCode);

      const PollsCategoryErrorMsg = fetchPollsListResponse.data.message;
      console.log("Polls Category Error msg ", PollsCategoryErrorMsg);

      if (PollsCategoryErrorCode == 200) {
        const PollsCategoryListArray = fetchPollsListResponse.data.data;
        console.log("News Category list Array", PollsCategoryListArray);
        setData(PollsCategoryListArray);

      }
      else {
        setData([]);

        console.log(fetchPollsListResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function () {
          $(".alert-danger").hide();
        }, 3000);
      }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }
  const [courseName, updateCourseName] = useState("")
 async function fetchCourseList() {
  const formData = new FormData();

        formData.append("id", examCourse);
        

        const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_single_course",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',
              "Authorization": token,
            }
          });

        console.log("Create Polls", response);
        if(response.data.error_code == 200)
      {
        response.data.data.map((item) =>
        {
          updateCourseName(item.course_name)
        })
        
      }
   
   

  }
 
  const [className, updateClassName] = useState("")
  async function fetchClassList() {

    const formData = new FormData();

    formData.append("class_id", examClass);
    

    const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_single_class",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      });

    console.log("Create Polls", response);
    if(response.data.error_code == 200)
  {
    response.data.data.map((item) =>
    {
      updateClassName(item.class_name)
    })
    
  }

    
 
   }
  useEffect(() => {
    fetchPollsCategoryList();
    fetchCourseList();
    fetchClassList();
  }, []);

  const [courseList, updateCourseList] = useState([])
  const [classList,updateClassList] = useState([])
  async function getCourseList() {
    try {

      const fetchCourseResponse = await axios.get(process.env.REACT_APP_API_KEY + "campus_get_course",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get Course List Details", fetchCourseResponse.data.data);
      if(fetchCourseResponse.data.error_code == 200)
      {
        updateCourseList(fetchCourseResponse.data.data);
      }
   

    }
    catch (err) {
      console.log("Log in Fail", err);

    }
  }

  const[subjectData,updateSubjectData] = useState([])
  const [subjectName,updateSubjectName] = useState("")
  
  async function fetchCourseWiseSubject()
  {
    const formData = new FormData();
  
          formData.append("course_id", courseId);
         
  
          const response = await axios.post(process.env.REACT_APP_API_KEY + "get_coursewise_subjects_list",
            formData,
            {
              headers:
              {
                "Content-Type": 'multipart/form-data',
                "Authorization": token,
              }
            });
  
          console.log("Create Polls", response.data.data);
          if(response.data.error_code == 200)
          {
            updateSubjectData(response.data.data)
            response.data.data.map((item) =>
            {
              // updateSubjectId(item.subject_id)
              updateSubjectName(item.subject_name)
            })
          }
  }
 
  async function fetchSingleSubject()
  {
    const formData = new FormData();
  
          formData.append("subject_id", subjectId);
         
  
          const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_single_subject",
            formData,
            {
              headers:
              {
                "Content-Type": 'multipart/form-data',
                "Authorization": token,
              }
            });
  
          console.log("Create Polls", response.data.data);
          if(response.data.error_code == 200)
          {

            response.data.data.map((item) =>
            {
              console.log("get name of the subject",item.subject_name)
              updateSubName(item.subject_name)
            })
          }
  }
  useEffect(() => {
    getCourseList();
    getClassList();
    fetchCourseWiseSubject();
    fetchSingleSubject();
  }, []);

  
function editExam()
{
  document.getElementById("exam_name").disabled = false;
 
}
function editCourse()
{
  document.getElementById("course_name").disabled = false;
 
}
function editClass()
{
  document.getElementById("class_name").disabled = false;
 
}

const [disabledSubject, setDisableSubject] = useState(true);
function editSubject()
{
  setDisableSubject(false)
}
const [disabledDate, setDisableDate] = useState(true);
function editDate()
{
  setDisableDate(false)
}

function editDates()
{
  document.getElementById("publish_date").disabled = false;
  document.getElementById("expiry_date").disabled = false;
}
  return (
    <div>
<Header />
<div className="d-flex">
<Menu />

    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>

      <div className="border_class2 box_padding">

        <h1 style={{ color: "black", fontWeight: "600", fontFamily: "Poppins", fontSize: "16PX", lineHeight: "24PX", marginLeft: "13PX" }}>EXAM PREVIEW</h1>
      </div>


      <div class="formSuccess success_msg">
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>
      {/* CREATE news category pop up */}
      <div id="google" className="modaloverlay">
        <div className="modalContainer">
          <form role="form">
            <div className="card-body" style={{ marginTop: "0px", marginLeft: "100px" }} >
              <div style={{ width: "50%" }}>

                {/* CATEGORY */}
                <div className="form-group" style={{ marginTop: "0px" }}>
                  <label htmlFor="exampleInputEmail1" style={{ color: "#1F3977" }}>Add News Category</label>
                  <input
                    type="name"
                    className="border"
                    id="exampleInputEmail1"
                    placeholder="Add News Category"
                    value={categoryValue}
                    onChange={(e) => updateCategoryValue(e.target.value)}
                    style={{ width: "410px", height: "35px" }}

                  />
                </div>

                <div className="mt-3">

                  <input
                    type="button"
                    className="create_btn"
                    //defaultValue="Sign Up"
                    value="Submit"
                    onClick={() => createPollsCategory()}
                    style={{ borderRadius: "5px", marginLeft: "342px", backgroundColor: "#1F3977" }}
                  />

                </div>

              </div>
            </div>
          </form>
          <a class="close" href="#" style={{ marginTop: "-171px", marginRight: "8px" }}>&times;</a>

        </div>
      </div>

      {/* end news category pop up */}
      <div className="border_class2 box_padding2" >
        <div style={{ borderBottom: "1px solid #15a312", padding: "10px", fontWeight: "500" }}>
          <div style={{ fontSize: "14px" }} class="d-flex">
            <p style={{ color: "#1F3977" }}>Preview:</p>
            <p style={{ color: "rgba(0, 0, 0, 0.5)", marginLeft: "5px",fontWeight:"600" }}>Preview before you publish</p>
          </div>
        </div>
         
  {/* 1st row */}
            <div  className="row  border_class2 box_padding" >
              
              <div className="col-md-4">
                <div className="d-flex">
                <p style={{fontSize:"13px",fontWeight:"600",color:"rgba(0, 0, 0, 0.7)"}}>Course & Class</p>
              <img src="dist/img/Pencil.png" alt="dropdown" style={{width:"18px", height:"18px",marginTop:"5px"}} className="ml-auto" onClick={() => editExam()} />
                
                </div>


<div className="row" style={{background:"#e4e9f3",padding:"7px 0px",margin:"7px 3px"}}>
    <p className="col-md-5" style={{color:"rgba(0, 0, 0, 0.5)",fontWeight:"600",fontSize:"11PX",marginTop:"5PX"}}>Exam Name </p>
    <p className="col-md-1" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",marginTop:"4px"}}>:</p>
    <p className="col-md-5" style={{padding:"0"}}>
    {/* <input type="name" id="exam_name" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",width:"100%"}} value={examName} /> */}
  
    <input
                  type="name"
                  id="exam_name"
                  value={exam}
                  onChange={(e) => updateExam(e.target.value)}
                  style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",width:"100%",margin:"0",padding:"0 0 0 5px",border:"none",height:"25px",}}
disabled
                />

     </p>
  </div>

              </div>

              <div className="col-md-4">
              <div className="d-flex">
                <p style={{fontSize:"13px",fontWeight:"600"}}></p>
              <img src="dist/img/Pencil.png" alt="dropdown" style={{width:"18px", height:"18px",marginTop:"5px"}} className="ml-auto" onClick={() => editCourse()} />
                
                </div>
<div className="row" style={{background:"#e4e9f3",padding:"7px 0px",margin:"7px 3px"}}>
    <p className="col-md-4" style={{color:"rgba(0, 0, 0, 0.5)",fontWeight:"600",fontSize:"12PX",marginTop:"4px"}}>Course</p>
    <p className="col-md-1" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",marginTop:"4px"}}>:</p>
    <p className="col-md-6" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",padding:"0"}}>
    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                  id="course_name"
                  onChange={(e) => updateExamCourse(e.target.value)}
                  style={{ padding:"0",width: "100%",color:"#1f3977",fontWeight:"600",  height: "25px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px",border:"none"}} disabled>


                  <option selected="selected" value={courseName} >{courseName}</option>

                  {
                    courseList.length > 0 ?
                    courseList.map((courseItem, index) => {
                      console.log("Course List",courseItem)
                      return (
                        <option value={courseItem.course_id} key={index}>
                          {courseItem.course_name}
                        </option>
                      );
                    }):
                    <div>
                      Data Not Found
                    </div>

                  }
                </select>
    {/* {courseName} */}
    </p>
  </div>
              </div>

              <div className="col-md-4">
              <div className="d-flex">
                <p style={{fontSize:"13px",fontWeight:"600"}}></p>
              <img src="dist/img/Pencil.png" alt="dropdown" style={{width:"18px", height:"18px",marginTop:"5px"}} className="ml-auto" onClick={() => editClass()} />
                
                </div>
                <div className="row" style={{background:"#e4e9f3",padding:"7px",margin:"7px 3px"}}>
                    <p className="col-md-4" style={{color:"rgba(0, 0, 0, 0.5)",fontWeight:"600",fontSize:"12PX",marginTop:"4px"}}>Class</p>
                    <p className="col-md-1" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",marginTop:"4px"}}>:</p>
                    <p className="col-md-6" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",padding:"0"}}>
                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                  id="class_name"
                  onChange={(e) => updateExamClass(e.target.value)}
                  style={{ padding:"0",width: "100%",color:"#1f3977",fontWeight:"600",  height: "25px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px",border:"none"}} disabled>


                  <option selected="selected" value={className} >Select Class</option>
                  <option  value="1" >First Year</option>
                  <option  value="2" >Second Year</option>
                  <option  value="3" >Third Year</option>
                  <option  value="4" >Fourth Year</option>
                  <option  value="5" >Fifth Year</option>
                  <option  value="6" >Sixth Year</option>



         
                </select>
    </p>
  </div>
              </div>
            </div>          
 {/* 2nd row */}
        <div className="row border_class2 box_padding">
              
              <div className="col-md-4">
                <div className="d-flex">
                <p style={{fontSize:"12px",fontWeight:"600",color:"rgba(0, 0, 0, 0.7)"}}>Subject Name</p>
              <img src="dist/img/Pencil.png" alt="dropdown" style={{width:"18px", height:"18px",marginTop:"5px"}} className="ml-auto" onClick={() => editSubject(this)}/>
             
                </div>
{
  ExamSubjectName.map((subjectname,index) =>
  {
    console.log("get subject name",subjectname)

    return(
<div className="row d-flex"   style={{background:"#e4e9f3",padding:"7px 3px",margin:"7px 3px",fontSize:"12px"}}>

<select className="form-select form-select-sm subject_name" aria-label=".form-select-sm example"
                 id="subject_name"
                 disabled={disabledSubject}
                  onChange={(e) => updateSubjectName(e.target.value)}
                  style={{ padding:"0",width: "100%",color:"#1f3977",fontWeight:"600",  height: "25px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px",border:"none"}} >


                  <option selected="selected"  value={subjectname}  >{subjectname}</option>

                  {
                    subjectData.length > 0 ?
                    subjectData.map((subjectItem, index) => {
                      console.log("SUBJECT List",subjectItem)
                      return (
                        <option value={subjectItem.subject_name}  key={index}>
                          {subjectItem.subject_name}
                        </option>
                      );
                    }):
                    <div>
                      Data Not Found
                    </div>

                  }
                </select>

              
  
  </div>
    )
  })
}



              </div>

              <div className="col-md-4">
              <div className="d-flex">
                <p style={{fontSize:"12px",fontWeight:"600",color:"rgba(0, 0, 0, 0.7)"}}>Schedule</p>
              <img src="dist/img/Pencil.png" alt="dropdown" style={{width:"18px", height:"18px",marginTop:"5px"}} className="ml-auto" onClick={() => editDate()}/>
                
                </div>
                {
                  inputFields.map((item) =>
                  {
                    return(
<div className="row" style={{background:"#e4e9f3",padding:"7px",margin:"7px 3px",fontSize:"12PX"}}>
<input
                  type="datetime-local"
                  id="publish_date"
                  disabled={disabledDate}
                  // value={item.date}
                  value={dateOfExam}
                  onChange={(e) => updateDateOfExam(e.target.value)}
                  style={{color:"#1f3977",fontWeight:"600",fontSize:"10PX",width:"100%",margin:"0 2px 0 0",padding:"0 0 0 2px",border:"none",height:"25px",}}

                />
                

  </div>
                    )
                  })
                }

              </div>

             
            </div> 

{/* 3rd row */}
<div className="row border_class2 box_padding">
              
              <div className="col-md-4">
                <div className="d-flex">
                <p style={{fontSize:"12px",fontWeight:"600",color:"rgba(0, 0, 0, 0.7)"}}>Schedule</p>
              <img src="dist/img/Pencil.png" alt="dropdown" style={{width:"18px", height:"18px",marginTop:"5px"}} className="ml-auto" onClick={() => editDates()}/>
                
                </div>


<div style={{background:"#e4e9f3",padding:"7px 0px",margin:"7px 3px"}}>
  <div className="row" style={{padding:"0"}}>
  <p className="col-md-4" style={{color:"rgba(0, 0, 0, 0.5)",fontWeight:"600",fontSize:"10PX"}}>Start Date/Time</p>
  <p className="col-md-1" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",padding:"0"}}>:</p>
    <p className="col-md-7" style={{color:"#1f3977",fontWeight:"600",fontSize:"10PX",padding:"0",margin:"0"}}>
    <input
                  type="datetime-local"
                  id="publish_date"
                  value={examPublishDate}
                  onChange={(e) => updateExamPublishDate(e.target.value)}
                  style={{color:"#1f3977",fontWeight:"600",fontSize:"10PX",width:"100%",margin:"0 2px 0 0",padding:"0 0 0 2px",border:"none",height:"25px",}}
disabled
                />
       {/* {publishDate} */}
       </p>
  </div>

  <div className="row mt-1" style={{padding:"0"}}>
  <p className="col-md-4" style={{color:"rgba(0, 0, 0, 0.5)",fontWeight:"600",fontSize:"10PX"}}>Close Date/Time</p>
  <p className="col-md-1" style={{color:"#1f3977",fontWeight:"600",fontSize:"12PX",padding:0}}>:</p>
    <p className="col-md-7" style={{color:"#1f3977",fontWeight:"600",fontSize:"10PX",padding:"0",margin:"0"}}>
    <input
                  type="datetime-local"
                  id="expiry_date"
                  value={examExpiryDate}
                  onChange={(e) => updateExamExpiryDate(e.target.value)}
                  style={{color:"#1f3977",fontWeight:"600",fontSize:"10PX",width:"100%",margin:"0 2px 0 0",padding:"0 0 0 2px",border:"none",height:"25px",}}
disabled
                />
    </p>
  </div>
    
  </div>

              </div>

              

             
            </div> 
                  

        {/* buttons */}
        <div className="d-flex border_class2 box_padding" style={{justifyContent:"end"}}>

          <div class="ValueMsg" style={{ margin: "8px", width: "57%", display: "none" }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>

          {/* <img src="dist/img/delete.png" alt="dropdown" style={{width:"33px", height:"33px",marginTop:"5px"}} className="ml-auto" /> */}
          {/* <img src="dist/img/view.png" alt="dropdown" style={{width:"33px", height:"33px",marginLeft:"8PX",marginTop:"5px"}} /> */}
          {/* <a href="/pollsFormStep2" className="d-flex"> */}
          <input
            type="button"
            className=" publish_button"
            //defaultValue="Next Step"
            onClick={() => createPollStep1()}
            value="Publish"
            // style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px",  backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginRight: "40PX", marginBottom: "20px" }}
          />
          {/* </a> */}
        </div>


      </div>



    </div>
    </div>
    </div>
  )
}
