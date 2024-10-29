import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
export function StudentBirthdays() {
  var Cevent = "";

  const monthNames = [
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

  const currentMonth = new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [selectedMonthPrev, setSelectedMonthPrev] = useState(13);
  const d = new Date();
  const [currYear, setCurrYear] = useState(d.getFullYear());

  const currMonth = moment(d).format("MMMM");
  const [month, updateMonth] = useState(currMonth);

  const token = localStorage.getItem("Token");
  const [event, updateEvent] = useState([]);
  const [error_code, updateError_code] = useState("");
  const [error_message, updateError_message] = useState("");

  const currentDate = new Date();
  const [currentMonth1, setCurrentMonth1] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  var eNow = new Date();
  var eMoment = moment(eNow);

  var lastYear = eMoment.format("YYYY") - 1;

  var nextyear = moment()
    .add(1, "years")
    .format("YYYY");

  var eventList = "";
  var eventList_prev = "";

  async function nextClick() {
    let s_month = selectedMonth + 1;
    let c_year = currYear;

    let currentData = monthNames[s_month - 1];

    updateMonth(currentData);
    if (s_month == 13) {
      updateMonth("January");
    }
    if (s_month == 13) {
      s_month = 1;
      c_year = c_year + 1;

      setCurrYear(c_year);
    }

    let result_month = monthNames[s_month - 1];
    let result_year = c_year;
    eventList = result_month + "," + " " + result_year;

    setSelectedMonth(s_month);

    fetchList(eventList);
  }

  async function prevClick() {
    let s_month = selectedMonth - 1;
    console.log("selected_month", s_month);
    let c_year = currYear;
    let currentData = monthNames[s_month - 1];

    updateMonth(currentData);

    if (s_month <= 0) {
      s_month = 12;
      c_year = c_year - 1;
      setCurrYear(c_year);
    }

    console.log("dateTest Month:", monthNames[s_month - 1]);
    console.log("dateTest Year:", c_year);

    let result_month = monthNames[s_month - 1];
    let result_year = c_year;
    eventList = result_month + "," + " " + result_year;

    console.log("date result:", eventList);

    setSelectedMonth(s_month);

    fetchList(eventList);
  }

  async function fetchList(data) {

    try {
      updateEvent([]);
      const formData = new FormData();
      formData.append("month", data);
      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_birthdays_monthwise",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      // console.log("bdaysssssssssssssssssssssss-------------", fetchResponse);
      updateError_message(fetchResponse.data.message);
      updateError_code(fetchResponse.data.error_code);
      if (fetchResponse.data.error_code == 200) {
        updateEvent(fetchResponse.data.data);
      } else {
        updateEvent([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  useEffect(() => {
    let data = monthNames[selectedMonth - 1] + ", " + currYear;
    let t_string = currentMonth1 + 1 + "," + currentYear;
    fetchList(t_string);
  }, []);

  function set_d_prv() {
    if (currentMonth1 === 0) {
      let yyy = currentYear - 1;
      setCurrentYear(yyy);
      setCurrentMonth1(11);
      fetchList(currentMonth1 + "," + currentYear);
    } else {
      let mmm = currentMonth1 - 1;
      setCurrentMonth1(mmm);
      fetchList(currentMonth1 + "," + currentYear);
    }
  }

  function set_d_nxt() {
    if (currentMonth1 == 11) {
      setCurrentMonth1(0);
      let yy = currentYear + 1;
      setCurrentYear(yy);

      fetchList(currentMonth1 + 2 + "," + currentYear);
    } else {
      let mm = currentMonth1 + 1;
      setCurrentMonth1(mm);
      fetchList(currentMonth1 + 2 + "," + currentYear);
    }
  }

  const monthName = new Date(
    currentYear,
    currentMonth1
  ).toLocaleString("default", { month: "long" });
  return (
    <>
      <div
        className="col-md-12 p-0"
        style={{
          height: "100%",
        }}
      >
        <div>
          <div className="">
            <div>
              <div
                style={{
                  background: "rgb(108, 122, 153)",
                  color: "#fff",
                  padding: "3px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  id="prevMonth"
                  onClick={set_d_prv}
                  style={{
                    marginRight: "25px",
                    border: "none",
                    background: "rgb(108, 122, 153)",
                  }}
                >
                  <img
                    src="dist/img/prev_img.png"
                    style={{ height: "18px", width: "18px" }}
                  />
                </button>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  <span>Student Birthdays in</span>
                  <span id="">{monthName}</span>
                  <span>{currentYear}</span>
                </div>

                <button
                  onClick={set_d_nxt}
                  id="nextMonth"
                  style={{
                    marginLeft: "25px",
                    border: "none",
                    background: "rgb(108, 122, 153)",
                  }}
                >
                  <img
                    src="dist/img/next_img.png"
                    style={{ height: "18px", width: "18px" }}
                  />
                </button>
              </div>
            </div>

            <div className="event_inner_div" style={{ padding: "10px 0px" }}>
              <div className="row m-0">
                {event == "" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "100px",
                    }}
                  >
                    <p style={{ fontSize: "10px", fontWeight: "500" }}>
                      No Birthdays In This Month
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="col-md-12 mt-1">
                      <div>
                        <ul>
                          {event.map((_item, index) => {
                            return (
                              <li
                                key={index}
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "500",
                                  padding:"5px 15px",
                                  fontFamily:'poppins',
                                  gap: "30px",
                                  display: "flex",
                                  backgroundColor:
                                    index % 2 === 0 ? "#fff" : "#D9D9D94D",
                                }}
                              >
                                <i>{_item.full_name}</i>
                                <i>{_item.dob}</i>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
