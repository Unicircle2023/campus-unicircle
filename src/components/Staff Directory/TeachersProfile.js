import React from "react";
import { InfoTab } from "./InfoTab";
import { TeacherTab } from "./TeacherTab";

import DonutChart from "react-donut-chart";
import "@patternfly/react-core/dist/styles/base.css";

const reactDonutChartdata = [
  {
    label: "Present",
    value: 21,
    color: "#FF4560",
  },

  {
    label: "Absent",
    value: 4,
    color: "#FEB019",
  },
  {
    label: "Leave",
    value: 2,
    color: "#00E396",
  },
];
const reactDonutChartBackgroundColor = ["green", "red", "purple"];
const reactDonutChartInnerRadius = 0.7;
const reactDonutChartSelectedOffset = 0.04;
const reactDonutChartHandleClick = (item, toggled) => {
  if (toggled) {
    console.log("item", item);
  }
};
let reactDonutChartStrokeColor = "#FFFFFF";
const reactDonutChartOnMouseEnter = (item) => {
  let color = reactDonutChartdata.find((q) => q.label === item.label).color;
  reactDonutChartStrokeColor = color;
};

export function TeachersProfile() {
  return (
    
    <div className="content-wrapper">
    

      <div className="d-flex">
        {/* left part */}
        <div style={{ width: "100%", marginLeft: "10px", marginTop: "10PX" }}>
          {/* student content */}
          <div
            style={{
              background: "#1F3977",
              margin: "0px",
              
            }}
          >
            {/* student profile */}
            <div className="row">
              <div className="col-md-2">
                <img
                  src={require("../images/boy.jpg")}
                  className="text-center"
                  alt="User Image"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                />
              </div>
              <div className="col-md-10">
                <div style={{ color: "white", marginTop: "20px" }}>
                  <p>
                    <b style={{ fontSize: "15px",fontWeight:"500" }}>Abby Neil David</b>
                    <br />
                    <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px" ,fontWeight:"500"}}>
                      First Year B.Com(Class 11B)
                    </p>
                  </p>
                </div>
              </div>
            </div>
            {/* tabs */}
            <div
            className=""
            style={{
              margin: "0px 0px 0px 0px",
             
              background: "#1F3977",
              width: "100%",
            }}
          >
            <InfoTab />


          </div>
         
            {/* <br style={{ clear: "both" }} /> */}
           
            
          </div>
       
          <div
            className=""
            style={{
              margin: "10px 0px 0px 0px",
              
              background: "#e4e9f4",
              width: "100%",
            }}
          >
            <TeacherTab />


          </div>
         

          
        </div>
        {/* end left part */}

        {/* ******************************************************************************** */}

        
      </div>
    </div>
    
  
  );
}
