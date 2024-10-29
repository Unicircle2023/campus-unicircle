import React,{useState,useEffect,useCallback} from "react";
import axios from "axios"
import styled from "styled-components";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi"
import { BsSortUp } from "react-icons/bs"
import { useHistory } from "react-router-dom";
const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
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

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

 function FilterComponentSchedule({ filterText, onFilter, onClear,parentCallback  })
 {
  
  const token = localStorage.getItem('Token');
  const [courseID,updateCourseID] =  useState("")
  const [classID,updateClassID] =  useState([])
  const [errorCode,updateErrorCode] = useState([])
  const [courseData,updateCourseData] =  useState([])
  const [classData,updateClassData] =  useState([])
const [section,updateSection] =  useState([])
const [subjectData,updateSubjectData] = useState([])
const [subjectID,updateSubjectID] = useState([])
const history = useHistory();

  async function fetchCourseList() {
    const token = localStorage.getItem('Token');
    console.log("Access Token-", token);
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
        updateCourseData(fetchCourseResponse.data.data)
  
    }
    catch (err) {
        console.log("Log in Fail", err);

    }

}

async function fetchClassList(e) {
  console.log("print courseee iddddddddd",e.target.value)
  updateCourseID( e.target.value)
 const course_id = e.target.value
  try {
    
 
    const formData = new FormData();

    formData.append("course_id", course_id);
      const fetchClassResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_coursewise_class",
      formData,
      {
          headers:
          {
              "Content-Type": 'multipart/form-data',
              // "X-Requested-With": "XMLHttpRequest",
              "Authorization": token,
          }
      });

      console.log("Get Coursewise class List Details", fetchClassResponse.data.data);
      updateErrorCode(fetchClassResponse.data.error_code)
        updateClassData(fetchClassResponse.data.data)
      
     

  }
  catch (err) {
      console.log("Log in Fail", err);

  }

}

async function fetchSubjectList() {

  console.log("Access Token-", token);
  try {

      const fetchSubjectResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_subject_list",
          {
              headers:
              {
                  "Content-Type": 'multipart/form-data',
                  "Authorization": token,
              }
          }
      );

      console.log("Get Subject List Details", fetchSubjectResponse.data.data);
      updateSubjectData(fetchSubjectResponse.data.data)

  }
  catch (err) {
      console.log("Log in Fail", err);

  }

}

useEffect(() => {
  fetchCourseList();
  fetchSubjectList();
}, []);


const [day,updateDay] = useState([])
const [week,updateWeek] = useState([])
const [startTime,updateStartTime] = useState([])
const [end_Time,updateEndTime] = useState([])
// const [teacherid,updateTeacherid] = useState([])
async function createSubject(day,week) {
  
  try {
    const formData = new FormData();

    formData.append("course", courseID);
    formData.append("class", classID);
    formData.append("subject", subjectID);
    // formData.append("teacher", teacherid);
    formData.append("day", day);
    formData.append("week", week);
    formData.append("start_time", startTime);
    formData.append("end_time", end_Time);
    formData.append("section", section);
      const fetchResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_add_schedule",
      formData,
      {
          headers:
          {
              "Content-Type": 'multipart/form-data',
              // "X-Requested-With": "XMLHttpRequest",
              "Authorization": token,
          }
      });

      console.log("ADD SUBJECT", fetchResponse);
      
      // sendDataToParent(vehicle.name); 
  
     
      
     

  }
  catch (err) {
      console.log("Log in Fail", err);

  }

}

return(
  <div style={{ width: "100%",padding:"0",background:"#e4e9f4"}}>
        <div style={{background: "white",marginTop:"10PX",marginLeft:"0px",marginRight:"0"}} >

    <div className="row" style={{border:"1px solid red"}} >

      <div className="col-md-5" style={{ height: "100%", padding: "0px 5px"}}>
        <h4 style={{ color: "#000000", fontWeight: "600", fontFamily: "Poppins", fontStyle: "normal", fontSize: "13px", lineHeight: "24px", marginTop: "7px" }} >Timetable Schedule</h4>
      </div>


      <div className="col-md-3 d-flex flex-row" style={{
        height: "100%", background: "#FFFFFF",
        padding: "0", border: "0.5px solid #c4c4c4",
        backdropFilter: "blur(4px)", color: "#000000", width: "275px", boxSizing: "border-box"
      }}>
        <img src={require("../images/Search.png")} style={{width:"21px",height:"21px",margin: "5px 0px 0px 3px",}}/>
        {/* <BiSearchAlt2 style={{ fontSize: "28PX", verticalAlign: "middle", margin: "3px 0px 0px 3px", color: "darkgrey" }} /> */}
        <Input
          id="search"
          type="text"
          placeholder="Search by Name"
          value={filterText}
          onChange={onFilter}
          style={{ background: "white", marginLeft: "0px", height: "32px", width: "100%", border: "none", fontWeight: "600", borderRadius: "30PX" }}
        />
      </div>

      <div className="col-md-1 d-flex flex-row">
        <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} />

      </div>
    



    </div>

      <div className="row mt-3" >
        

        <div className="col-md-3" style={{paddingLeft:"10PX"}}>
          <label style={{
            fontFamily: "Poppins", fontWeight: "500", fontSize: "11px",
            color: "#1F3977"
          }}>Select Course</label><br></br>

<select className="cat_dropdown" aria-label=".form-select-sm example"
                                        id="department"
                                        onChange={fetchClassList}
                                        // onChange={(e) => updateCourseID(e.target.value)}
                                        style={{
                                          width: "100%",
                                          background: "white", fontWeight: "500",fontSize:"12px",
                                          fontFamily: "Poppins", fontStyle: "normal",
                                          height: "38px", border: "0.5px solid #c4c4c4",
                                          boxSizing: "border-box", marginBottom: "8px",color:"black"
                                        }}>
                                      

                                        <option selected="selected" value={courseData} style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>All Course</option>
                                        {courseData.map((course, index) => {
                                            
                                            return (
                                                <option value={course.course_id} key={index} style={{
                                                  color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
                                                  fontWeight: "500", fontSize: "14px", lineHeight: "21px"
                                                }}>
                                                    {course.course_name}
                                                </option>
                                            );
                                        })}
                                    </select>
        </div>

        <div className="col-md-3" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins", fontWeight: "500", fontSize: "11px",
             color: "#1F3977"
          }}>Select Class</label><br></br>

{
  errorCode == 200?
  (
    <select className="cat_dropdown" aria-label=".form-select-sm example"
    id="department"
    onChange={(e) => updateClassID(e.target.value)}
    style={{
      width: "100%",
      background: "white", fontWeight: "500",fontSize:"12px",
      fontFamily: "Poppins", fontStyle: "normal",
      height: "38px", border: "0.5px solid #c4c4c4",
      boxSizing: "border-box", marginBottom: "8px",color:"black"
    }}>
      <option selected="selected" value={classID} style={{
color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
fontWeight: "500", fontSize: "14px", lineHeight: "21px"
}}>All Class</option>

{classData.map((classItem, index) => {
        
        return (
            <option value={classItem.class_id} key={index} style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>
                {classItem.class_name}
            </option>
        );
    })}
      </select>
  ):
  (
<select className="cat_dropdown" aria-label=".form-select-sm example"
                                        id="department"
                                        // onChange={(e) => updateClassID(e.target.value)}
                                        style={{
                                          width: "100%",
                                          background: "white", fontWeight: "500",fontSize:"12px",
                                          fontFamily: "Poppins", fontStyle: "normal",
                                          height: "38px", border: "0.5px solid #c4c4c4",
                                          boxSizing: "border-box", marginBottom: "8px",color:"black"
                                        }}>
                                          <option selected="selected" value={classID} style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>All Class</option>

                                          </select>
  )
}


        </div>
        <div className="col-md-3" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins",fontWeight: "500", fontSize: "11px",
           color: "#1F3977", 
          }}>Select Section</label><br></br>

<select className="cat_dropdown" aria-label=".form-select-sm example"
                                        id="department"
                                        onChange={(e) => updateSection(e.target.value)}
                                        style={{
                                          width: "100%",
                                          background: "white", fontWeight: "500",fontSize:"12px",
                                          fontFamily: "Poppins", fontStyle: "normal",
                                          height: "38px", border: "0.5px solid #c4c4c4",
                                          boxSizing: "border-box", marginBottom: "8px",color:"black"
                                        }}>
                                      

                                        <option selected="selected"  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>All Section</option>

<option  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>A</option>

<option  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>B</option>

<option  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>C</option>

<option  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>D</option>

<option  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>E</option>

<option  style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>F</option>
                                        
                                    </select>
        </div>
      </div>

      <div className="row mt-2" >
        

        <div className="col-md-2" style={{paddingLeft:"10PX"}}>
          <label style={{
            fontFamily: "Poppins",  fontWeight: "500", fontSize: "11px",
            color: "#1F3977"
          }}>Day</label><br></br>

          <select className="cat_dropdown" style={{
            width: "100%", color: "#4779F0",
            background: "white", fontWeight: "500",fontSize:"12px",
            fontFamily: "Poppins", 
            height: "38px", border: "0.5px solid #c4c4c4",
            borderRadius: "3px"
           
          }}
          value={day}
          onChange={(e) => updateDay(e.target.value)}
          >
            <option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>Monday</option>



<option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>Tuesday</option>

            <option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>Wednesday</option>

            <option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>Thrusday</option>

            <option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>Friday</option>

<option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>Saturday</option>

          </select>
        </div>

        <div className="col-md-2" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins", fontWeight: "500", fontSize: "11px",
             color: "#1F3977"
          }}>Week</label><br></br>

          <select className="cat_dropdown" style={{
            width: "100%", color: "#4779F0",
            background: "white", fontWeight: "500",fontSize:"11px",
            fontFamily: "Poppins", 
            height: "34px", border: "0.5px solid #c4c4c4",
            borderRadius:"3PX"
          }}
          value={week}
          onChange={(e) => updateWeek(e.target.value)}
          >
            <option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>1st Week, May</option>

<option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>2nd Week, May</option>

<option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>3rd Week, May</option>

<option selected style={{
              color: "#4779F0", fontFamily: "Poppins", 
              fontWeight: "500", fontSize: "11px", 
            }}>4th Week, May</option>

          </select>
        </div>
       
      </div>

      <div className="row mt-2" >
        

        <div className="col-md-3" style={{paddingLeft:"10PX"}}>
          <label style={{
            fontFamily: "Poppins",  fontWeight: "500", fontSize: "11px",
             color: "#1F3977"
          }}>Subject</label><br></br>

<select className="cat_dropdown" aria-label=".form-select-sm example"
                                        id="department"
                                        
                                        onChange={(e) => updateSubjectID(e.target.value)}
                                        style={{
                                          width: "100%",
                                          background: "white", fontWeight: "500",fontSize:"12px",
                                          fontFamily: "Poppins", fontStyle: "normal",
                                          height: "38px", border: "0.5px solid #c4c4c4",
                                          boxSizing: "border-box", marginBottom: "8px",color:"black"
                                        }}>
                                      

                                        <option selected="selected" value={courseData} style={{
            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
          }}>All Subject</option>
                                        {subjectData.map((subjectItem, index) => {
                                            // console.log("teacher id",subjectItem.teacher_id)
                                            // updateTeacherid(subjectItem.teacher_id)
                                            return (
                                                <option value={subjectItem.subject_id} key={index} style={{
                                                  color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
                                                  fontWeight: "500", fontSize: "14px", lineHeight: "21px"
                                                }}>
                                                    {subjectItem.subject_name}
                                                </option>
                                            );
                                        })}
                                    </select>
        </div>

        <div className="col-md-3" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins",  fontWeight: "500", fontSize: "11px",
             color: "#1F3977"
          }}> Begin Time</label><br></br>
<input
                    type="name"
                    className="input_fields"
                    id="emailId"
                    placeholder="Enter Start Time"
                    value={startTime}
                    onChange={(e) => updateStartTime(e.target.value)}
                    style={{ width: "100%", height: "35px",border:"1px solid #c4c4c4"  }}

                  />
        </div>
        <div className="col-md-3" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins",  fontWeight: "500", fontSize: "11px",
           color: "#1F3977", 
          }}>End Time</label><br></br>

<input
                    type="name"
                    className="input_fields"
                    id="emailId"
                    placeholder="Enter End Time"
                    value={end_Time}
          onChange={(e) => updateEndTime(e.target.value)}
                    style={{ width: "100%", height: "35px",border:"1px solid #c4c4c4"  }}

                  />
        </div>
        <div className="col-md-3" style={{paddingLeft:"0PX"}}>
        {/* <a href="/createSchedule"> */}


<button
  type="button"
  className="d-flex buttonContainer news-button"
  defaultValue="Sign Up"
onClick={() => createSubject(day,week)}
  style={{ padding: "8px 12px", marginTop: "30px", background: "#15a312", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", borderRadius: "3px", height: "35px" }}
>
  {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
  <div style={{
    marginLeft: "5px", color: "#FFFFFF", fontSize: "12PX", lineHeight: "18px",
    fontWeight: "400", fontFamily: "Poppins", fontStyle: "normal"
  }}>Add Subject</div>
</button>

{/* </a> */}
            </div>
      </div>


      <div className="row" >
      <div style={{ background: "rgba(31, 57, 119, 0.9)", height: "40px" }}><br></br>
        <center><div>
          <p style={{
            color: "#FFFFFF", fontWeight: "500",
            fontFamily: "Poppins", fontStyle: "normal",
            fontSize: "14px", lineHeight: "21px", marginTop: "-14px"
          }}>{day} | {week}</p>
        </div></center>

      </div>
      </div>

      </div>
   
  </div>
 )
        }



export default FilterComponentSchedule;
