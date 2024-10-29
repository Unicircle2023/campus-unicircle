import React, { useState } from 'react'
// import $ from "jquery";
// import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi";
// import { MdEmojiSymbols } from "react-icons/md"
// import { AiOutlineCompass } from "react-icons/ai"
// import { ImLab } from "react-icons/im"
// import { TiSortAlphabetically } from "react-icons/ti"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { Tickets } from "./Tickets"
import 'react-tabs/style/react-tabs.css';
// import { FaUserGraduate } from "react-icons/fa"
import { AddCourse } from "../Students/AddCourse"
// import { ActivityLog } from '../Students/ActivityLog';
// import { Grade } from "./Grade"
// import { Courses } from './Courses';
// import { ExtraCourses } from './ExtraCourses';
export function TeacherTab(props) {
  

  return (
    <div>

      <Tabs style={{ marginTop: "0px", width: "100%", padding: "0" }} className="tabs">
        <TabList className="tablist" style={{ fontWeight: "600", width: "100%", flexDirection: "row", marginBottom: "0", display: "flex", color: "white", borderRadius: "5px 5px 0px 0px", fontSize: "12px", border: "none", cursor: "pointer" }} >
          <Tab className="tabs" style={{ marginLeft: "0px", background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX",  padding: "5px 10px" }}>Timetables</Tab>
          <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX", padding: "5px 10px" }}>Courses</Tab>
          <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX",  padding: "5px 10px" }}>Academics</Tab>
          <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX",  padding: "5px 10px" }}> Grades</Tab>
          <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX", padding: "5px 10px" }}>Engagement</Tab>
          <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX", padding: "5px 10px" }}>Achievements</Tab>
        </TabList>

        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", border: "0.2px solid #f5f5f5", width: "100%" }}>

          <div className="d-flex" style={{ paddingTop: "15PX", height: "250px" }}>
            <div style={{ width: "30%", overflowY: "auto" }} className='course'>
              <h2 style={{ fontWeight: "bold", borderBottom: "2PX SOLID #1F3977", paddingBottom: "5px" }}>COURSES</h2>

              <AddCourse />



            </div>
            <div style={{ width: "30%", overflowY: "auto" }} className='course'>
              <h2 style={{ fontWeight: "bold", borderBottom: "2PX SOLID #1F3977", paddingBottom: "5px" }}>EXTRA COURSES</h2>
              <AddCourse />
            </div>

            <div style={{ width: "40%", marginBottom: "10px", marginRight: "10PX", overflowY: "auto" }} className='course'>
              <h2 style={{ fontWeight: "bold", borderBottom: "2PX SOLID #1F3977", paddingBottom: "5px" }}>ADD COURSE</h2>
              <AddCourse />
              {/* <input
        type="button"
        id="coursebutton"
        className="create_btn myButton"
        defaultValue="Sign Up"
        value="Add Course"
        onClick={showCourse()}
        style={{float:"right", fontWeight:"bold",borderRadius:"5px", color:"#fff",marginLeft:"auto", backgroundColor:"#293043",padding:"10px",fontSize:"12PX", border:"1px solid #1F3977"}}
      />

      <div id="welcomeDiv" className="addCourse">
        <AddCourse  />
       </div> */}
            </div>
          </div>

        </TabPanel >

        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", border: "0.2px solid #f5f5f5", width: "100%" }}>
          <div className="form-group" style={{ height: "100%", width: "100%", padding: "15PX 15px 5px 15px" }}>
            <div style={{ fontWeight: "bold", fontSize: "15px", float: "left" }}>Select Exam*</div>
            <select className="form-select form-select-sm " aria-label=".form-select-sm example" style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid grey" }}>
              <option selected>None</option>
              <option value="1">Exam 1</option>
              <option value="2">Exam 2</option>
              <option value="3">Exam 3</option>
            </select>
          </div>
          <div className="d-flex" style={{ marginLeft: "5px" }}>
            <div style={{ width: "15%" }}>
              <section>
                <div className="container-fluid" style={{ padding: "0" }}>
                  <div className="row" style={{ margin: "0px", paddingRight: "0" }}>
                    <div className="col-xl-12 col-12" style={{ height: "100%", padding: "7px" }}>
                      <div style={{ fontWeight: "bold" }}>Upload Sheet</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div style={{ width: "70%" }}>

              <section >
                <div className="container-fluid" style={{ padding: "0" }}>
                  <div className="row" style={{ margin: "0px", paddingRight: "0" }}>
                    <div className="col-xl-12 col-12" style={{ height: "100%", paddingTop: "5px" }}>
                      <input type="file" style={{ float: "left" }} />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div style={{ width: "15%" }} >
              <input
                type="button"
                className="create_btn"
                defaultValue="Sign Up"
                value="Submit"
                style={{ marginTop: "0", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#1F3977", padding: "10px 30px", fontSize: "12PX" }}
              />

            </div>

          </div>
          <div>
            <AddCourse />
          </div>
        </TabPanel>

        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", border: "0.2px solid #f5f5f5", width: "100%" }}>
          <div className="form-group" style={{ height: "100%", width: "100%", padding: "15PX 15px 5px 0px" }}>
            <img src="dist/img/badge_list.png" width="300" height="300" />
          </div>
        </TabPanel>
        
          <TabPanel className="tabpanel course" style={{ padding: "0", marginTop: "0", background: "white", border: "0.2px solid #f5f5f5", width: "100%", overflowY: "auto" }}>  
            <AddCourse />
          </TabPanel>
       
        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", border: "0.2px solid #f5f5f5", width: "100%" }}>
          <h2 style={{ marginLeft: "10px" }}><AddCourse /></h2>
        </TabPanel>

        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", border: "0.2px solid #f5f5f5", width: "100%" }}>
          <h2 style={{ marginLeft: "10px" }}><AddCourse /></h2>
        </TabPanel>

      </Tabs>




    </div>
  )
}
