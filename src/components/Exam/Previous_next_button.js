import React, { useState,useEffect } from "react";
import axios from "axios";
import moment from "moment";

export function Previous_next_button ({data,passEditData,passDeleteData})
{
    const token = localStorage.getItem("Token");
    const [index, setIndex] = useState(0);
    // const { news_id,category,news_title,news_description,delivery_type,publish_date,expire_date,send_to} = news[index];
    const {exam_id,exam_name,description,delivery_type,course,start_date,end_date} = data[index];
   
    // var startDate ="";
    // var endDate ="";
    // startDate = moment(publish_date).format("DD MMM YYYY");
    // endDate = moment(expire_date).format("DD MMM YYYY");
    // console.log("delivery_type",endDate)
    const prevBtn = () => {
      setIndex((i) => {
        const newIndex = i - 1;
        return loopIndex(newIndex);
      });
    };
    const nextBtn = () => {
      setIndex((i) => {
        const newIndex = i + 1;
        return loopIndex(newIndex);
      });
    };
  
    const loopIndex = (i) => {
      if (i < 0) {
        return data.length - 1;
      } else if (i > data.length - 1) {
        return 0;
      }
      return i;
    };
    console.log(nextBtn);
  
    const passNewsEditData =() =>
    {
     
      passEditData(exam_id);
    }
    const passNewsDeleteData =() =>
    {
      console.log("get poll id",exam_id)
      passDeleteData(exam_id);
    }
    const [courseName,updateCourseName] = useState("")
    async function fetchCourseName()
    {
      const formData = new FormData();
      formData.append("id",course);


const singleCourseResponse = await axios.post(
  process.env.REACT_APP_API_KEY + "admin_get_single_course",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",

      Authorization: token,
    },
  }
);

// console.log("Get single exam timetable", deleteNewsResponse);
if(singleCourseResponse.data.error_code == 200)
{
  singleCourseResponse.data.data.map((item) =>
  {
    console.log("get course name",item.course_name)
    updateCourseName(item.course_name)
  })
 
}
    }
 
    useEffect(() => {
      fetchCourseName();
    
      
    }, [])
    
    return(
        <div>
     

              {/* <div className="d-flex">
             
              <img src={require("../images/Pencil.png")} 
               onClick={passNewsEditData}
               alt="dropdown"  className=" ml-auto" style={{width:"20px", height:"20px"}}/>

             
                <img src={require("../images/delete.png")}
                   onClick={passNewsDeleteData}
                 alt="dropdown" style={{width:"20px", height:"20px"}} />
            
            </div> */}
    <div>
      
    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Exam Name </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: {exam_name}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Exam Description </p>
                <p className="col-md-9" style={{ display:"flex",alignItems:"center", color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {<p style={{marginLeft:"3px"}}  dangerouslySetInnerHTML={{ __html:description}} />} </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Course </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {courseName}</p>
              </div>


              {/* <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}> Class </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {class}</p>
              </div> */}

              
              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}> Delivery Type </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {delivery_type}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}> Publish Date </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {start_date}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}> Expiry Date </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {end_date}</p>
              </div>


            
             

            </div>

<div className="d-flex mt-2">


      <button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
      <button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
      </div>
    </div>
    )
}

