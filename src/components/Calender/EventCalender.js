import React, { useState, useEffect } from "react";
import { CollegeEventsCalendar } from "./CollegeEventsCalendar";
import { CampusEvents } from "./CampusEvents";
import { StudentBirthdays } from "./StudentBirthdays";
import axios from "axios";

export function EventCalender() {
  var [date, setDate] = useState(new Date());
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date();
  var monthName = months[d.getMonth()];
  var year = d.getFullYear();

  var options = { weekday: "long" };
  var dateOption = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const token = localStorage.getItem("Token");
  const [numberOfEvents, updateEvents] = useState("");
  const [campusEvents, updateCampusEvents] = useState([]);

  async function fetchCalendarList() {
    try {
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_event_date",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Calendar event", fetchResponse.data.data);

      if (fetchResponse.data.error_code == 200) {
        const events = fetchResponse.data.data;

        var myNumber = events.length;
        var formattedNumber = "0" + myNumber;

        updateEvents(myNumber);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchCalendarEvents() {
    try {
      const fetchEventResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_total_event_count",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      console.log("fetchEventResponse------", fetchEventResponse);
      if (fetchEventResponse.data.error_code == 200) {
        updateCampusEvents(fetchEventResponse.data);

      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  useEffect(() => {
    fetchCalendarList();
    fetchCalendarEvents();
  }, []);
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-6 p-0" style={{ height: "100%" }}>
          <div
            className="small-box mt-3"
            style={{
              height: "324px",
              width: "90%",
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="" style={{ height: "100%" }}>
              <CollegeEventsCalendar />
            </div>
          </div>
        </div>



        <div className="col-md-6 p-0" style={{ height: "100%" }}>
          <div
            className="small-box mt-2"
            style={{
              height: "320px",
              width: "100%",
              paddingLeft: "10px",
              borderRadius: "10PX",
              boxShadow: "none",
              background: "transparent",
            }}
          >
            <div
              className="inner"
              style={{ height: "100%", padding: "0", margin: "0" }}
            >
              <div className="row" style={{ padding: "0", margin: "0" }}>
                {/* total events */}
                <div
                  className="col-md-6"
                  style={{ height: "100%", padding: "0 5px 0 0", margin: "0" }}
                >
                  <div
                    className="small-box"
                    style={{
                      height: "80px",
                      boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
                      borderRadius: "3px",
                      width: "100%",
                      padding:"7px"
                    }}
                  >
                    <div className="inner" style={{ padding: "0" }}>
                      <div
                        className="d-flex"
                        style={{ padding: "0", marginLeft: "15PX" }}
                      >
                        <img
                          src="dist/img/Tent.png"
                          className="ml-auto all_icon_imgs"
                        />
                      </div>
                      <div className="twenty_font_class"
                        style={{
                          marginLeft: "15px",
                          marginTop: "-10px"
                        }}
                      >
                        {campusEvents.total_event_count}
                      </div>

                      <h5 className="eleven_font_class"
                        style={{
                          marginLeft: "15px",
                          color: "black",
                          marginTop: "0px",
                        }}
                      >
                        Total Events
                      </h5>
                    </div>
                  </div>
                </div>

                {/* events this month */}
                <div
                  className="col-md-6"
                  style={{ height: "100%", padding: "0 0 0 10px", margin: "0" }}
                >
                  <div
                    className="small-box"
                    style={{
                      height: "80px",
                      boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
                      borderRadius: "3px",
                      padding:"7px"
                    }}
                  >
                    <div className="inner" style={{ padding: "0" }}>
                      <div className="d-flex" style={{ padding: "0" }}>
                        <img
                          src="dist/img/Today.png"
                          className="ml-auto all_icon_imgs"
                        />
                      </div>
                      <div className="twenty_font_class"
                        style={{
                          marginLeft: "15px",
                          marginTop: "-10px"
                        }}
                      >
                        {campusEvents.monthly_event_count}
                      </div>

                      <h5 className="eleven_font_class"
                        style={{
                          marginLeft: "15px",
                          color: "black",
                          marginTop: "0px"
                        }}
                      >
                        Events This Month
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* holidays for this month */}
              <div className="row">
                <div
                  className="col-md-12"
                  style={{ height: "100%", marginTop: "10PX", padding: "0" }}
                >
                  <div
                    className="small-box preview_form"
                    style={{
                      padding: "0px",
                      height: "234px",
                      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                      borderRadius: "0px 0px 10px 10px",
                    }}
                  >
                    <div className="">
                      <StudentBirthdays />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <CampusEvents />
      </div>


      {/* 2nd row */}

      {/* <div className="row ">
      <div className="col-md-12 p-0" style={{ height: "100%" }}>
      <div className="small-box mt-3  campus_event" style={{ height: "220px", width:"90%", borderRadius: "0px 0px 10px 10px" ,boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",overflowY:"auto"}}>
      <div className="">

          </div>
       </div>
        </div>


      </div> */}
    </div>
  );
}
