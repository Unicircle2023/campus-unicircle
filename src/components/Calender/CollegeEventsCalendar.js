import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../AdminLogin.css";
import axios from "axios";
import $ from "jquery";
import { DayPickerRangeController, NavButton } from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import sortBy from "lodash/fp/sortBy";
import last from "lodash/fp/last";
import { memoize } from "lodash";
import moment from "moment";
import { format } from "date-fns";
import { Calendar } from "react-calendar";
import { Nav } from "@patternfly/react-core";
import { DoDisturb } from "@mui/icons-material";

const Wrapper = styled.div`
  .CalendarDay__highlighted_calendar {
    background: rgba(45, 93, 208, 0.2) !important;
    border-radius: 50%;
    margin-top: 10px !important;
    text-align: center !important;
    color: black !important;
  }

  .CalendarDay__today {
    border-radius: 50%;
    color: inherit;

    background: rgba(21, 163, 18, 0.2) !important;
  }

  .CalendarDay__selected_span {
    border: 2px double #0c6776 !important;
    color: inherit;
    background: rgba(21, 163, 18, 0.2);
  }
`;

const DETAILS = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Number = styled.div`
  position: absolute;

  font-size: 12px;
  align-items: center !important;
  text-align: center !important;
`;

const Event = styled.div`
  ${({ green }) =>
    green &&
    `
    color: white;
    background: #0c6776;
  `}
`;

const EventStart = styled(Event)`
  margin-left: 2px;
  margin-right: -2px;
`;

const EventSpan = styled(Event)`
  margin-left: -2px;
  margin-right: -2px;
  padding-left: 8px;
`;

const EventEnd = styled(Event)`
  /* margin-right: 2px; */
  margin-left: -2px;
`;

var array = [];

export function CollegeEventsCalendar() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [numberOfEvents, updateEvents] = useState("");
  const [eventDate, updateEventDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [month, updateMonth] = useState(currMonth);

  const [selectedDate, setSelectedDate] = useState("");
  const [onlyDate, setOnlyDate] = useState("");
  const [markData, setMarkData] = useState([]);

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
  const d = new Date();
  const [currYear, setCurrYear] = useState(d.getFullYear());
  const currMonth = monthNames[d.getMonth()];
  const [todaysDate, setTodaysDate] = useState(new Date());

  const Date_Click_Fun = (date) => {
    setSelectedDate(date);
    const onlyD = format(date, "dd MMM");
    setOnlyDate(onlyD);
    const dd = format(date, "YYY-MM-dd");
    showDate(dd);
  };

  const mark = markData;
  async function fetchList() {
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
        // console.log("==fetchResponse----------------",fetchResponse);
      const events = fetchResponse.data.data;
      if (fetchResponse.data.error_code === 200) {
        var myNumber = events.length;
        var formattedNumber = "0" + myNumber;
        updateEvents(myNumber);

        array.push(events);
        setMarkData(events);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    isDayHighlighted();
    fetchList();
  }, []);

  const [focusedInput, setFocusedInput] = useState(START_DATE);
  const [{ startDate, endDate }, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput ? END_DATE : START_DATE);
  };

  // const isDayHighlighted = day => {
  //   let isBlocked = false

  // array.map((item) =>
  // {

  //   item.map(({ start_date, end_date }) =>
  //   {

  //     if (day.isBetween(start_date, end_date, 'day', '[]')) {
  //           isBlocked = true
  //        }
  //        return;
  //   })

  // return
  // })

  //   return isBlocked

  // }

  const isBetween = (date, start, end) => {
    return moment(date).isBetween(start, end, null, "[]");
  };

  const isDayHighlighted = (day) => {
    let isBlocked = false;
    for (const item of array) {
      for (const { start_date, end_date } of item) {
        if (isBetween(day, start_date, end_date)) {
          isBlocked = true;
          return true;
        }
      }
    }

    return false;
  };

  const getEventForDay = memoize((day) =>
    flow(
      filter(({ start, end }) => day.isBetween(start, end, "day", "[]")),
      sortBy("start"),
      last
    )(array)
  );
  const renderEventForDay = (day) => {
    const event = getEventForDay(day);
    const eventForPreviousDay = getEventForDay(day.clone().subtract(1, "days"));
    if (!event) return null;
    const { start, end, label, color, type } = event;
    const isBooking = type === "booking";
    const isStart = day.isSame(start, "day");
    const isEnd = day.isSame(end, "day");

    if (isStart && isEnd) {
      return <Event green={isBooking}>{label}</Event>;
    } else if (isStart) {
      return <EventStart green={isBooking}>{label}</EventStart>;
    } else if (isEnd) {
      return <EventEnd green={isBooking} />;
    } else {
      return (
        <EventSpan green={isBooking}>
          {eventForPreviousDay && eventForPreviousDay.color !== color && label}
        </EventSpan>
      );
    }
  };

  async function showDate(day) {
    try {
      const formDataCategory = new FormData();
      formDataCategory.append("date", day);

      const responseDate = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_datewise_event_list_l_d",
        formDataCategory,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      // console.log("Get_Datewise_Event_List------", responseDate);

      if (responseDate.data.error_code == 200) {
        setData(responseDate.data.data);
        $(".show_events").show();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const Day = (day) => {
    return (
      <DETAILS>
        <Number onClick={() => showDate(day)}>{day.format("D")}</Number>

        {renderEventForDay(day)}
      </DETAILS>
    );
  };
  $(".close_event").click(function() {
    $(".show_events").hide();
  });
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  moment.updateLocale("en", {
    weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  });
  return (
    <div style={{ height: "100%" }}>
      <div
        className="d-flex align-items-center"
        style={{
          flexWrap: "wrap",
          background: "#6C7A99",
          color: "white",
          lineHeight: "43px",
        }}
      >
        <div
          style={{
            fontWeight: "500",
            marginLeft: "20px",
            marginTop: "0px",
            fontSize: "10px",
            padding: "0px",
          }}
        >
          Event Calender
        </div>
      </div>

      <Wrapper>
        {/* <DayPickerRangeController
        weekdaysMin={weeks}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        startDate={startDate}
        endDate={endDate}

        onDatesChange={setDates}

        daySize={100}
        hideKeyboardShortcutsPanel
        renderDayContents={Day}
        isDayHighlighted={isDayHighlighted}
        enableOutsideDays
        firstDayOfWeek={0}
        lineHeight="10px"


      /> */}
        <Calendar
          value={selectedDate}
          onClickDay={Date_Click_Fun}
          tileClassName={({ date, view }) => {
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return "highlight";
            }

            if (moment(todaysDate).format("YYYY-MM-DD") == moment(date).format("YYYY-MM-DD")) {
              return "current_date";
            }

          }}
        />

        <div
          className="show_events"
          style={{
            position: "absolute",
            top: "0",
            left: "0px",
            background: "rgba(0,0,0,0.5)",
            padding: "10px",
            width: "100%",
            height: "100%",
            zIndex: "2",
            display: "none",
          }}
        >
          <div
            style={{
              borderRadius: "10PX",
              width: "100%",
              height: "100%",
              overflowY: "scroll",
            }}
            className="datewise_events"
          >
            <div
              className="d-flex"
              style={{ background: " #f2f2f2", padding: "5px",alignItems:"center" }}
            >
              <p
                style={{
                 display:"flex",
                 alignItems: "center",
                  background: "#50404d",
                  borderRadius: "5PX",
                  padding: "5px 10PX",
                  color: "white",
                  fontSize:"10px",
                  fontWeight:"500"
                }}
              >
                {onlyDate}
              </p>
              <p
                style={{
                  marginLeft: "7px",
                  fontWeight: "600",
                  fontSize:"12px"
                }}
              >
                EVENTS OF THE DAY
              </p>
              <a
                href="#close"
                className="close_event ml-auto"
                style={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background: "darkgrey",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "15px",
                height:"20px",
                width:"21px"
                }}
              >
                ×
              </a>
            </div>
            <div style={{ overflowY: "auto", background: "#dbd7d2" }}>
              {data == "" ? (
                <div
                  style={{
                    overflowY: "auto",
                    background: "#dbd7d2",
                    padding: "15PX",
                    textAlign: "center",
                  }}
                >
                  NO EVENT TO DISPLAY
                </div>
              ) : (
                data.map((itemDate) => {
                  return (
                    <div style={{ padding: "10px" }} className="d-flex">
                      <div
                        style={{
                          borderRight: "3px solid #339dd8",
                          padding: "10px",
                          fontSize:"11px",
                          fontWeight:"500"
                        }}
                      >
                        {itemDate.start_time}
                      </div>
                      <div style={{ padding: "10px" }}>
                        <div
                          style={{
                            marginLeft: "5px",
                            fontWeight: "600",
                            fontSize: "12PX",
                          }}
                        >
                          {itemDate.label}
                        </div>
                        <div
                          style={{
                            marginLeft: "5px",
                            color: "grey",
                            fontSize: "10PX",
                          }}
                        >
                          {
                            <p className="desc_class"
                              dangerouslySetInnerHTML={{
                                __html: itemDate.description,
                              }}
                            ></p>
                          }
                        </div>
                        <div
                          style={{
                            marginLeft: "5px",
                            fontSize: "11PX",
                            fontStyle: "italic",
                            fontWeight:"600"
                          }}
                        >
                          {itemDate.location}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) }
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
