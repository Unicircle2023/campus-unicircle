import React,{useState,useEffect} from "react";
import { InformationTab } from "./InformationTab";
import { StudentTabs } from "./StudentTabs";
import axios from 'axios';

import moment from "moment"
import DonutChart from "react-donut-chart";
import "@patternfly/react-core/dist/styles/base.css";




export function RightPart({transferDataToRightPart}) {

  

  const reactDonutChartBackgroundColor = ["green", "red", "purple"];
  const reactDonutChartInnerRadius = 0.7;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      // console.log("item", item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };



  const token = localStorage.getItem('Token');
  const student_id = transferDataToRightPart.studentId

  const studnetCreatedDate = moment(transferDataToRightPart.createDate).format("MMM DD, YYYY")

  const [friendList, updateFriendList] = useState([])
  const [remainingFriends, updateRemainingFriends] = useState([])
  async function getFriendList()
  {
    const formData = new FormData();

    formData.append("user_id", student_id);
    

    const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_my_friend_list",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      });

    if(response.data.error_code == 200)
    {
      const friend_list = response.data.data[0]
      
      const citrus = response.data.data.slice(0, 2);
      
      updateFriendList(citrus)

      const getData = response.data.data.slice(2)
      updateRemainingFriends(getData)
    }
  }
  const [errorCode, updateErrorCode] = useState("")
  const [errorMessage, updateErrorMessage] = useState("")
  const [presentCount, updatePresentCount] = useState("")
  const [absentCount, updateAbsentCount] = useState("")
  const [leaveCount, updateLeaveCount] = useState("")
  async function getAttendance()
  {
    const formData = new FormData();

    formData.append("student_id", student_id);
    

    const response = await axios.post(process.env.REACT_APP_API_KEY + "get_student_attendance_analysis",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      });

  
    updateErrorCode(response.data.error_code)
    updateErrorMessage(response.data.message)
    if(response.data.error_code == 200)
    {
      response.data.data.map((item) =>
      {
       
        updatePresentCount(item.present_count)
        updateAbsentCount(item.absent_count)
        updateLeaveCount(item.leave_count)
      })
    }
    
  }
  useEffect(() =>
  {
    getFriendList();
    getAttendance();
  })
 
  const reactDonutChartdata = [
    {
      label: "Present",
      value: presentCount,
      color: "#FF4560",
    },
  
    {
      label: "Absent",
      value: absentCount,
      color: "#FEB019",
    },
    {
      label: "Leave",
      value: leaveCount,
      color: "#00E396",
    },
  ];

 
  

  function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "View all"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "View less"; 
      moreText.style.display = "inline";
    }
  }
  return (
    <div className="right_part">
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
                  fontSize: "11px",
                  color: "grey",
                  marginLeft: "2px",
                  fontWeight: "500"
                }}
              >
                {/* - Mar 7, 2019 */}
                - {studnetCreatedDate}
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
            {/* all friend */}
            <p>
              {friendList == "" ?
              (
                <div style={{fontSize:"8PX"}}>
NO FRIENDS TO DISPLAY
                </div>
              ):(
                <div>
{
              friendList.map((item) =>
              {
                return(
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
                      src={item.profile}
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
                      {item.name}
                    </div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "10PX",
                        color: "grey",
                        margin: "0",
                      }}
                    >
                     {item.class} {item.course}
                    </p>
                  </div>
                </div>
                )
              })
            }
                </div>
              )}
            
         </p>  
            {/* end 1st friend */}
            <p>
            <span id="dots"></span>
              <span id="more">
            {
              remainingFriends.map((item) =>
              {
                return(
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
                      src={item.profile}
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
                      {item.name}
                    </div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "10PX",
                        color: "grey",
                        margin: "0",
                      }}
                    >
                     {item.class} {item.course}
                    </p>
                  </div>
                </div>
                )
              })
            }
            </span>
         </p>  



            {/* view aal friends */}
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
               onClick={() => myFunction()}
                 id="myBtn"
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
                  {transferDataToRightPart.fatherName}
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
                   {transferDataToRightPart.motherName}
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
              {
                errorCode == 200 ?
                (
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
                ):
                (
                  <div>{errorMessage}</div>
                )
              }
             
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
