import React from "react";
// import { InformationTab } from "./InformationTab";
// import { StudentTabs } from "./StudentTabs";

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

export function RightPart() {
  return (
    <div style={{padding:"15px",width:"18%"}}>
        {/* right part */}
    <div style={{ marginTop: "10px"}}>
          <div style={{ fontWeight: "600", fontSize: "10px", color: "grey" }}>
            STATUS
            <div
              className="d-flex"
              style={{ background: "white", margin: "5px 7px", padding: "5px",border:"1px solid #c4c4c4" }}
            >
              {/* <div style={{border:"1px solid pink",padding:"0", margin:"0"}}> */}
              <i
                class="far fa-check-circle fa-2x"
                style={{ color: "#46d262", padding: "0", margin: "0px 5px" }}
              ></i>
              {/* </div> */}
              <p
                style={{ fontSize: "12px", color: "black", marginLeft: "10px" }}
              >
                Enrolled
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "grey",
                  marginLeft: "2px",
                  fontWeight: "500"
                }}
              >
                - Mar 7, 2019
              </p>
            </div>
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "10px",
              color: "grey",
              marginTop: "10px",
              borderBottom: "1px solid darkgrey",
            }}
          >
            FRIENDS & CLASSMATES
            {/* 1st friend */}
            <div
              className="d-flex"
              style={{
                padding: "5px",
                height: "auto",
                // background: "#eff6ff",
                fontSize: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ borderRadius: "50%" }}>
                <img
                  alt="Anne Hathaway picture"
                  src="dist/img/girl.jpg"
                  style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                />
              </div>
              <div style={{ marginLeft: "10px", padding: "0", lineHeight: "13PX" }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "11PX",
                    margin: "0",
                  }}
                >
                  Rubeena Anand
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "10PX",
                    color: "grey",
                    margin: "0",
                  }}
                >
                  {" "}
                  Strategic Business IT
                </p>
              </div>
            </div>
            {/* end 1st friend */}
            {/* 2nd friend */}
            <div
              className="d-flex"
              style={{
                padding: "5px",
                height: "auto",
                // background: "#eff6ff",
                fontSize: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ borderRadius: "50%" }}>
                <img
                  alt="Anne Hathaway picture"
                  src="dist/img/girl.jpg"
                  style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                />
              </div>
              <div style={{ marginLeft: "10px", padding: "0", lineHeight: "13PX" }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "11PX",
                    margin: "0",
                  }}
                >
                  Hanika Paryani
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "10PX",
                    color: "grey",
                    margin: "0",
                  }}
                >
                  IB Diploma
                </p>
              </div>
            </div>
            {/* end 2nd friend */}
            <div className="d-flex" style={{ padding: "0" }}>
              <p
                style={{
                  fontSize: "8px",
                  color: "darkgrey",
                  marginLeft: "auto",
                  marginTop: "0px",
                  fontWeight: "500",
                  marginBottom: "0",
                }}
              >
                View All
              </p>
            </div>
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "10px",
              color: "grey",
              marginTop: "10px",
              paddingBottom: "10px",
              borderBottom: "1px solid darkgrey",
            }}
          >
            PARENTS & GUARDIANS
            {/* FATHER */}
            <div
              className="d-flex"
              style={{
                padding: "5px",
                height: "auto",
                // background: "#eff6ff",
                fontSize: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ borderRadius: "50%" }}>
                <img
                  alt="Anne Hathaway picture"
                  src="dist/img/boy.jpg"
                  style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                />
              </div>
              <div style={{ marginLeft: "10px", padding: "0", lineHeight: "13PX" }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "11PX",
                    margin: "0",
                  }}
                >
                  Kawal Saigal
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "10PX",
                    color: "grey",
                    margin: "0",
                  }}
                >
                  Father
                </p>
              </div>

              <div className="d-flex ml-auto">
                <div style={{ borderRadius: "50%", width: "25px", height: "25px", background: "#1F3977", padding: "5px" }}>
                  <i class="fas fa-mobile-alt" style={{ color: "white", fontSize: "12px", borderRadius: "50%", padding:"3px", marginTop: "-2px" }}></i>
                </div>
                <div style={{ borderRadius: "50%", width: "25px", height: "25px", background: "#1F3977", padding: "5px", marginLeft:"5px"}}>
                  <i class="fas fa-paper-plane" style={{ color: "white", fontSize: "12px", borderRadius: "50%", marginTop: "-2px" }}></i>
                </div>
              </div>
            </div>
            {/* end FATHER */}
            {/* MOTHER */}
            <div
              className="d-flex"
              style={{
                padding: "5px",
                height: "auto",
                // background: "#eff6ff",
                fontSize: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ borderRadius: "50%" }}>
                <img
                  alt="Anne Hathaway picture"
                  src="dist/img/girl.jpg"
                  style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                />
              </div>
              <div style={{ marginLeft: "10px", padding: "0", lineHeight: "13PX" }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "11PX",
                    margin: "0",
                  }}
                >
                  Meera Saigal
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "10PX",
                    color: "grey",
                    margin: "0",
                  }}
                >
                  Mother
                </p>
              </div>

              <div className="d-flex ml-auto">
                <div style={{ borderRadius: "50%", width: "25px", height: "25px", background: "#1F3977", padding: "5px" }}>
                  <i class="fas fa-mobile-alt" style={{ color: "white", fontSize: "12px", borderRadius: "50%", padding:"3px", marginTop: "-2px" }}></i>
                </div>
                <div style={{ borderRadius: "50%", width: "25px", height: "25px", background: "#1F3977", padding: "5px", marginLeft:"5px"}}>
                  <i class="fas fa-paper-plane" style={{ color: "white", fontSize: "12px", borderRadius: "50%", marginTop: "-2px" }}></i>
                </div>
              </div>

            </div>
            {/* end MOTHER */}
          </div>
          {/* <div
            style={{
              fontWeight: "bold",
              fontSize: "10px",
              color: "grey",
              marginTop: "10px",
              paddingBottom: "10px",
              borderBottom: "1px solid darkgrey",
            }}
            className="d-flex"
          >
            SIBLINGS
            <i
              class="fas fa-plus fa-sm"
              style={{ color: "grey", marginLeft: "auto" }}
            ></i>
          </div> */}
          <div
            style={{
              fontWeight: "600",
              fontSize: "10px",
              color: "grey",
              marginTop: "10px",
              paddingBottom: "10px",
              borderBottom: "1px solid darkgrey",
            }}
          >
            ATTENDANCE
            <br />
            <div className="mt-2">
              <div style={{ width: "100%", height: "100px" }}>
                <DonutChart
                  style={{ width: "100%", height: "100%", padding: "5px" }}

                  onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
                  strokeColor={reactDonutChartStrokeColor}
                  data={reactDonutChartdata}
                  colors={reactDonutChartBackgroundColor}
                  innerRadius={reactDonutChartInnerRadius}
                  selectedOffset={reactDonutChartSelectedOffset}
                  onClick={(item, toggled) =>
                    reactDonutChartHandleClick(item, toggled)
                  }
                />
              </div>
            </div>
          </div>
          <div
            style={{
              color: "grey",
              marginTop: "10px",
              paddingBottom: "10px",
              borderBottom: "1px solid darkgrey",
            }}
          >
            <p style={{ fontWeight: "600", fontSize: "10px" }}>EXCUSALS</p>
            <p
              style={{
                fontSize: "10px",
                fontStyle: "italic",
                color: "black",
                fontWeight: "500",
              }}
            >
              "I have a doctor's appointment this Friday the 23 of Feburary
              around 2:30 P.M."
            </p>

            <div
              className="d-flex"
              style={{ padding: "0", fontSize: "10px", marginTop: "5px" }}
            >
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    color: "darkgrey",
                    marginTop: "0px",
                    marginBottom: "0",
                  }}
                >
                  Submited
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "black",
                    marginTop: "0px",
                    marginBottom: "0",
                    fontWeight: "bold",
                  }}
                >
                  May 8,2021
                </p>
              </div>
              <div style={{ marginLeft: "AUTO" }}>
                <p
                  style={{
                    fontSize: "10px",
                    color: "darkgrey",
                    marginLeft: "auto",
                    marginTop: "0px",
                    marginBottom: "0",
                  }}
                >
                  Absent Date(s)
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "black",
                    marginTop: "0px",
                    marginBottom: "0",
                    fontWeight: "bold",
                  }}
                >
                  May 14,2021
                </p>
              </div>
            </div>

            <div className="d-flex" style={{ padding: "0", fontSize: "10px" }}>
              <p
                style={{
                  fontSize: "10px",
                  color: "darkgrey",
                  marginLeft: "auto",
                  marginTop: "0px",
                  marginBottom: "0",
                  fontWeight: "bold",
                }}
              >
                View All
              </p>
            </div>
          </div>
        </div>
        {/* end right part */}
    </div>
  )
}
