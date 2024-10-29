import React, { useState } from 'react'
import $ from "jquery";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi";
import { MdEmojiSymbols } from "react-icons/md"
import { AiOutlineCompass } from "react-icons/ai"
import { ImLab } from "react-icons/im"
import { TiSortAlphabetically } from "react-icons/ti"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tickets } from "./Tickets"
import 'react-tabs/style/react-tabs.css';
import { FaUserGraduate } from "react-icons/fa"
import { AddCourse } from "./AddCourse"
import { ActivityLog } from '../Students/ActivityLog';
import { Grade } from "./Grade"
import { Courses } from './Courses';
import { ExtraCourses } from './ExtraCourses';
import {PersonalInformation} from "./PersonalInformation"
export function InformationTab(props) {
  function showCourse() {
    // $(".welcomeDiv").show();

  }

  return (
    <div>

      <Tabs style={{ marginTop: "0px", width: "100%", padding: "0" }} className="tabs">
        <TabList className="tablist" style={{ fontWeight: "bold", width: "75%", flexDirection: "row", marginBottom: "0", display: "flex", color: "white", borderRadius: "5px 5px 0px 0px", fontSize: "12px", border: "none", cursor: "pointer", paddingLeft: "5px" }} >
          <Tab className="tabs" style={{ marginLeft: "110px", background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX", textAlign:"center",height:"30px"}}>Personal Information</Tab>
          <Tab className="tabs" style={{ background: "#2b6dd4", borderRadius: "5PX 5PX 1PX 1PX",  padding: "5px 10px" ,marginLeft:"8PX"}}>Exam Registration Info.</Tab>

        </TabList>

{/* persona; */}
        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", borderTop: "none", width: "100%" ,border: "0.2px solid #f5f5f5"}}>

          <div className="d-flex" style={{ paddingTop: "0PX", height: "220px" }}>
              {/* personal */}
           
           <PersonalInformation />

           
          </div>


        </TabPanel >
{/* exam */}
        <TabPanel className="tabpanel" style={{ padding: "0", marginTop: "0", background: "white", borderTop: "none", width: "100%" }}>
          <div className="form-group" style={{ height: "100%", width: "100%", padding: "15PX 15px 5px 15px",height:"250px",overflowY:"auto" }}>
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
            <Grade />
          </div>
        </TabPanel>

      
        
          
       
     

      </Tabs>




    </div>
  )
}
