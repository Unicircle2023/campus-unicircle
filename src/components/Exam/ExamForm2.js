import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery"
import { Button, Container, Divider, Stack, TextField } from "@mui/material"
import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import { BiSearchAlt2 } from "react-icons/bi"
import { BsImageFill } from "react-icons/bs"
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Header } from "../Header"
import { InputRow } from "./InputRow"
import { Menu } from "../Menu"
import { useLocation } from "react-router-dom";
import { NavItem } from "@patternfly/react-core";

export function ExamForm2() {

  const location = useLocation();
  const { examName } = location.state || { id: "none" };
  const { examDesc } = location.state || { id: "none" };
  const { courseId } = location.state || { id: "none" };
  const { classExam } = location.state || { id: "none" };
  const { publishDate } = location.state || { id: "none" };
  const { deliveryType } = location.state || { id: "none" };
  const { expireDate } = location.state || { id: "none" };

  const [formValues, setFormValues] = useState([{ subject_name: "", exam_time: "" }])
  
  function currentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var time = date.getHours() + ":" + date.getMinutes();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day + " " + time +"Am";

    console.log("current date/time", today);

    document.getElementById("publish_date").value = today;
  }

  const token = localStorage.getItem('Token');
  const [category, updateCategory] = useState("");
  const [categoryValue, updateCategoryValue] = useState("");
  const [question, updateQuestion] = useState("");
  const [data, setData] = useState([]);
  const [error_message, updateError_message] = useState("");
  const [pollsData, setPollsData] = useState([]);

  // const[subject2, updateSubject2]= useState("")
  // const[examDate2, updateExamDate2]= useState("")
  const[checkData, updateCheckData]= useState([])
  const history = useHistory();
  // console.log("examDate",examDate)


  
  const [name, setName] = useState("")
  const [story, setStory] = useState({})
  const [inputFields, setInputFields] = useState([
    {
      subject_id: "",
      date: "",
     
      total_mark: "",
      
    }
  ])


  const handleChange = (event, index) => {
   
    const values = [...inputFields]
    console.log("momo", values)
    values[index][event.target.name] = event.target.value
   
    setInputFields(values)
  }

  // var array = [];
  const [ExamSubjectName,updateExamSubjectName] = useState([])
  

  console.log("sdsadsdsd",ExamSubjectName)
  const handleSubjectChange = (event, index) => {
    var array = event.target.options[event.target.selectedIndex].text
    ExamSubjectName.push(array)
    const values = [...inputFields]
    console.log("momo", values)
    values[index][event.target.name] = event.target.value
   
    setInputFields(values)
  }
  

  // adds new input
  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      {
        subject_id: "",
      date: "",
     
      total_mark: "",
      
      }
    ])
  }

 
  console.log("get exam data",inputFields)
 
  
  const[subjectData,updateSubjectData] = useState([])
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
        }
}
useEffect(() =>
{
  fetchCourseWiseSubject();
  
},[])
  async function creatExamForm2() {
   console.log('crrrrrrrrrreeeeeeeeeee');
    try {
      const subject_name = document.getElementById("subject_name");
      const exam_date = document.getElementById("exam_date");

      if (subject_name.value == "" &&
        exam_date.value == ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function () {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      }

      else if (subject_name.value == "") {

        $(".SubjectName").show();

        setTimeout(function () {
          $(".SubjectName").hide();
        }, 3000);

      }

      else if (exam_date.value == "") {

        $(".Exam_date").show();

        setTimeout(function () {
          $(".Exam_date").hide();
        }, 3000);

      }

      else {
      

        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
          history.push("/examForm3", { examName,examDesc,courseId,classExam,publishDate,expireDate,inputFields,deliveryType,ExamSubjectName })
        }, 3000);

      
      }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }
  }


  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" }])
  }


 
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Menu />

        <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>

          <div className="border_class2 box_padding">

            <h1 style={{ color: "black", fontWeight: "600", fontFamily: "Poppins", fontSize: "16PX", lineHeight: "24PX", marginLeft: "16PX" }}>CREATE EXAM</h1>
          </div>


          <div class="formSuccess success_msg">
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="success">
             Step 2 data saved successfully
              </Alert>
            </Stack>
          </div>
         
          <div >
            <div className="border_class2 box_padding">
              <div style={{ fontSize: "14px",marginLeft:"17px" }} class="d-flex">
                <p style={{ color: "#1F3977" }}>Step 2:</p>
                <p style={{ color: "rgba(0, 0, 0, 0.5)", marginLeft: "5px" }}>Select Subject & Schedule</p>
              </div>
            </div>

            <form className="border_class2 box_padding">
              {inputFields.map((item, index) => 
              {
                console.log("item",item)
                return(
                  
                    <div className="mt-2 p-0 " key={index}>
                      <div class="row">
                        <div class="col-md-4" >
    
                         
                         
                          <div className="d-flex">
                              <label className="all_labels">Subject</label>

                              <p className="all_stars">*</p>
                            </div>
                    
                            <select className="form-select form-select-sm all_inputs" aria-label=".form-select-sm example"
                                    id="subject_name"
                                    name="subject_id"
                                    required
                                    onChange={(event) => handleSubjectChange(event, index)}
                              value={item.subject}>
           
                  <option selected="selected" value={subjectData} >Select Subject</option>

                  {
                    subjectData.length > 0 ?
                    subjectData.map((subjectItem, index) => {
                    
                      return (
                        <option value={subjectItem.subject_id} key={index}>
                          {subjectItem.subject_name}
                        </option>
                      );
                    }):
                    <div>
                      Data Not Found
                    </div>

                  }
                </select>
    
    
        
          <div>
            
           
          </div>
                         
    
    
    
                        </div>
    
                        <div class="col-md-4">
                        <div className="left_padding">
                        <div className="d-flex">
                          <label className="all_labels">Exam Date/Time</label>
                         </div>
                          <input type="datetime-local"  className="all_inputs"
                              name="date"
                              multiline
                              id="exam_date"
                              rows={6}
                              fullWidth
                              min={publishDate}
                              max={expireDate}
                              label="Description"
                              onChange={(event) => handleChange(event, index)}
                             
                              value={item.date}
                            />
                           
                           
                        
                        </div>
                      </div>
    
                      <div class="col-md-4">
                        <div className="left_padding">
                          <div className="d-flex">
                          <label className="all_labels">Total Marks</label>
                          </div>
                          <input type="number"  className="all_inputs"
                               name="total_mark"
                              id="total_marks"
                              onChange={(event) => handleChange(event, index)}
                              
                              value={item.marks}
                            />
                           
                           
                        
                        </div>
                      </div>
                      </div>
                    </div>
                  
                )
              }
             
              
              )}


              <div class="customer_records_dynamic" style={{paddingBottom:"10px"}}></div>

              <div className="d-flex mt-1 ms-2" onClick={() => handleAdd()}>
                <img src="dist/img/add.png" alt="dropdown" style={{ width: "25px", height: "24px" }} />
                <p style={{ color: "#1f3977", fontWeight: "600", fontSize: "14PX" }} >Add Subject</p>
              </div>
            </form>

            {/* buttons */}
            <div className="d-flex border_class2 box_padding">

              <div class="ValueMsg" style={{ margin: "8px", width: "57%", display: "none" }}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Error! You Must Fill In All The Fields
                  </Alert>
                </Stack>
              </div>

<div className="d-flex" style={{width:"100%",justifyContent:"end"}}>
<input
                type="button"
                className=" publish_button"
                onClick={() => creatExamForm2()}
                value="Next Step"
                // style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "auto", backgroundColor: "#1F3977", padding: "10px 20px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",  marginBottom: "20px" }}
              />
</div>
             
              {/* </a> */}
            </div>


          </div>



        </div>
      </div>
    </div>
  )
}
