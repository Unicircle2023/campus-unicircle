import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import moment from "moment"
import { useHistory } from "react-router-dom";
import { ResponsiveContainer } from "recharts";

export function PreviewForm({
  reason,
  dateOfAppointment,
  duration,
  venue,
  startTime,
  endTime,
  classId,passEditAppointmentData
}) {
    
  const [teacherName, updateTeacherName] = useState("");
  const token = localStorage.getItem("Token");
  const [data, setData] = useState(false);
  const history = useHistory();

  const [Reason, updateReason] = useState("");
const [date, updateDate] = useState("");
const [Duration, updateDuration] = useState("");
const [Venue, updateVenue] = useState("");
const [StartTime, updateStartTime] = useState("");
const [EndTime, updateEndTime] = useState("");
const [ClassId,updateClassId] = useState("")

console.log("ClassId",ClassId)
  useEffect(() => {
   
    if(data){
        updateReason(reason)
        updateDate(dateOfAppointment)
        updateDuration(duration)
        updateVenue(venue)
        updateStartTime(startTime)
        updateEndTime(endTime)
        updateClassId(classId)
    }
    console.log(Reason);
  }, [data]);

  function Compare() {

    if (startTime > endTime) {
      alert("End Time should be greater than start time");
    }
   
  }
  function getDuration(e) {
 
    updateEndTime(e.target.value)
    var endDate = moment(document.getElementById("end_time").value, "H:mm");
    var startDate = moment(document.getElementById("start_time").value, "H:mm");

    const hourDiff = moment(endDate).diff(moment(startDate), 'hours')

    const getMinutes = hourDiff * 60;

    const minuteDiff = moment(endDate).diff(moment(startDate), 'minutes') - getMinutes;


    const diff = `${hourDiff} hrs ${minuteDiff} mins `;
    document.getElementById("app_duration").value = diff;

    updateDuration(diff);



  }
  const [studentDetails, updateStudentDetails] = useState([]);
  async function getStudentList() {

   
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
      if(fetchStudentResponse.data.error_code ==  200)
      {
        updateStudentDetails(fetchStudentResponse.data.data);
      }
      

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }
  useEffect(() => {

    getStudentList();
  }, []);

  function preview() {
    $(".preview_polls").show();
    getTeacherName();
  }

  async function getTeacherName() {
    const formData = new FormData();

    formData.append("teacher_id", classId);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "get_teacher_profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Edit Appointment", response);
    if (response.data.error_code == 200) {
      response.data.data.map((item) => {
        const first_name = item.first_name;
        const last_name = item.last_name;
        const full_name = first_name.concat(" ", last_name);

        updateTeacherName(full_name);
      });
    }
  }

  function edit_category() {
    $(".preview_polls").hide();
    setData(true)
    $(".preview_category").show();
  }

function editAppointment()
{
    $(".save_Message").show();
    setTimeout(() => {
        $(".save_Message").hide();
        $(".preview_category").hide()
    }, 1000);
   
    passEditAppointmentData(Reason,date,Duration,Venue,StartTime,EndTime,ClassId,teacherName);
   
   
}

  return (
    <div className="preview_img_div">
      <img className="preview_img"
        src="dist/img/view.png"
        alt="dropdown"
        
        onClick={() => preview()}
      />

      <div
        className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
            }}
          >
            <label style={{ fontSize: "11px", fontWeight: "600" }}>
              Preview
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
             
              className="close_event ml-auto"
              style={{ cursor: "pointer",width:"20px",height:"20px" }}
            />
          </div>

        
            <div
              style={{
                background: "white",
                marginTop: "10PX",
                padding: "5px 10PX",
                height:"100%",
                border: "0.4px solid #C4C4C4",
              }}
            >
              <div className="d-flex" style={{ padding: "10px 0px" }}>
                <h4
                  style={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "12PX",
                    fontWeight: "600",
                  }}
                >
                  Appointment
                </h4>
                <img
                  src="dist/img/Pencil.png"
                  alt="dropdown"
                  width="18px"
                  height="18px"
                  className=" ml-auto"
                  onClick={() => edit_category()}
                />
              </div>

              {
                <div>
                  <div
                    className="row"
                    style={{
                      background: "#e4e9f3",
                      padding: "7px",
                      margin: "7px 3px",
                    }}
                  >
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      Reason
                    </p>
                    <p
                      className="col-md-9"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {reason}
                    </p>
                  </div>

                  <div
                    className="row"
                    style={{
                      background: "#e4e9f3",
                      padding: "7px",
                      margin: "7px 3px 0px 3px",
                    }}
                  >
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      Date
                    </p>
                    <p
                      className="col-md-9"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {dateOfAppointment}{" "}
                    </p>
                  </div>

                  <div
                    className="row"
                    style={{
                      background: "#e4e9f3",
                      padding: "7px 0 0 0",
                      margin: "7px 3px 0px 3px",
                    }}
                  >
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      Start Time
                    </p>
                    <p
                      className="col-md-3"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {startTime}
                    </p>
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      {" "}
                      End Time
                    </p>
                    <p
                      className="col-md-3"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {endTime}
                    </p>
                  </div>

                  <div
                    className="row"
                    style={{
                      background: "#e4e9f3",
                      padding: "7px 0 0 0",
                      margin: "7px 3px 0px 3px",
                    }}
                  >
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      Duration
                    </p>
                    <p
                      className="col-md-3"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {duration}
                    </p>
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      Venue
                    </p>
                    <p
                      className="col-md-3"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {venue}
                    </p>
                  </div>

                  <div
                    className="row"
                    style={{
                      background: "#e4e9f3",
                      padding: "7px",
                      margin: "7px 3px 0px 3px",
                    }}
                  >
                    <p
                      className="col-md-3"
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      Booked With
                    </p>
                    <p
                      className="col-md-9"
                      style={{
                        color: "#1f3977",
                        fontWeight: "600",
                        fontSize: "10PX",
                      }}
                    >
                      : {teacherName}{" "}
                    </p>
                  </div>
                </div>
              }
            </div>
         
        </div>
      </div>

      {/* **********************************************edit category************************************* */}
             

        <div
        className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">
              Edit Appointment
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* category & question */}
          <div>
            {/*reason  */}
            <div className="border_class2 edit_row_padding2">
            <div className=" p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">
                        Reason
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <input
                      type="name"
                      id="validreason"
                      name="reason"
                      className="dept-dropdown all_inputs"
                      placeholder="Enter Your Reason For Appointment..."
                      autoComplete="true"
                      onChange={(e) => updateReason(e.target.value)}
                      value={Reason}
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* date */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">
                        Date Of Appointment
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <input
                      type="date"
                      name="date"
                        onChange={(e) => updateDate(e.target.value)}
                        value={date}
                      placeholder="Enter Your Reason For Appointment..."
                      className="dept-dropdown all_inputs"
                      id="date_of_appointment"
                     
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* start time */}
            <div className="border_class2 edit_row_padding2">
            <div className=" p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">
                        Start Time
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <input
                      type="time"
                      id="start_time"
                      name="start_time"
                      onChange={(e) => updateStartTime(e.target.value)}
                        value={StartTime}
                      className="dept-dropdown all_inputs"
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* end time */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">
                        End Time
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="time"
                      id="end_time"
                      name="end_time"
                      value={EndTime}
                        onChange={getDuration}
                      
                      className="dept-dropdown all_inputs"
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* duration */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">
                        Duration
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <input
                      type="name"
                      name="duration"
                      id="app_duration"
                      className="dept-dropdown all_inputs"
                      placeholder="Duration Of Appointment..."
                      autoComplete="true"
                      disabled
                        value={Duration}

                    />
                  </div>
                </div>
              </div>
            </div>

            {/* venue */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      paddingRight: "0",
                    }}
                  >
                    <div className="d-flex">
                      <label className="all_labels">
                        Venue
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <input
                      type="name"
                      name="venue"
                      id="venue"
                      className="dept-dropdown all_inputs"
                      placeholder="Venue Of Appointment..."
                      autoComplete="true"
                        onChange={(e) => updateVenue(e.target.value)}
                        value={Venue}
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* boked for */}
            <div className="mt-0 p-0">
              <div class="row">
                <div class="col-md-12 d-flex">
                  <div
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      paddingRight: "0",
                    }}
                    className="row"
                  >
                    <div
                      className="d-flex col-md-4"
                      style={{ paddingLeft: "0" }}
                    >
                      <label className="all_labels">
                        Booked With
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <select
                    className="form-select form-select-sm all_inputs"
                    aria-label=".form-select-sm example"
                    name="booked_with"
                    onChange={(e) => updateClassId(e.target.value)}
                  >
                    <option selected="selected" value={teacherName}>
                      {teacherName}
                    </option>
                    {studentDetails.length > 0 ?
                      studentDetails.map((studentItem, index) => {
                        console.log("Id", studentItem.teacher_id)
                        return (
                          <option value={studentItem.teacher_id}>
                            {studentItem.teacher_name}
                          </option>
                        );
                      })
                      :
                      <div>
                        Data Not Found
                      </div>
                    }
                  </select>

                    <div
                      id="SendMsg"
                      class="BookedFor"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Select Booked For
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

           
            {/* ******************button********************** */}
            <div className="d-flex form-buttons mt-3 edit_buttons_div border_class2"
               style={{justifyContent:"end"}}>
              <input
                type="button"
                className="close_event edit_cancel_button"
                defaultValue="Next Step"
                value="Cancel"
                
              />

              <input
                type="button"
                className="edit_update_button "
                defaultValue="Next Step"
                onClick={() => editAppointment()}
                value="Save"
              
              />
            </div>

          
      <div style={{color:"green",fontSize:"12PX",display:"none"}} className="save_Message">
        Data Saved Successfully
      </div>

            <div>
              <div
                style={{
                  color: "green",
                  fontSize: "11px",
                  marginTop: "15px",
                  marginLeft: "50PX",
                }}
              >
               
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
