import React, { useState, useEffect } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMM";
    // console.log("selected day", selectedDate);
    return (
      <div className="header d-flex" >
        <div >
        <div className="icon" onClick={() => changeWeekHandle("prev")}>
            {/* prev week */}
            <img src={require("../images/Forward Button.png")} style={{width:"15px", height:"15px"}} />
          </div>
        </div>
        <div className="" style={{marginLeft:"10PX",fontWeight:"500"}}>
          <span>1st week, {format(currentMonth, dateFormat)}</span>
        </div>
        <div style={{marginLeft:"10px"}} onClick={() => changeWeekHandle("next")}>
          <div className="icon">
              {/* next week */}
              <img src={require("../images/Forward Button.png")} style={{width:"15px", height:"15px",transform: "rotate(-180deg)"}} />
              </div>
        </div>
      </div>
    );
  };

//   const renderFooter = () => {
//     const dateFormat = "MMM yyyy";
//     return (
//       <div className="header row flex-middle" style={{border:"1px solid red"}}>
//         <div className="col col-start">
//           <div className="icon" onClick={() => changeWeekHandle("prev")}>
//             prev week
           
//           </div>
//         </div>
//         <div>
//         <span>{format(currentMonth, dateFormat)}</span>
//         </div>
//         <div className="col col-end" onClick={() => changeWeekHandle("next")}>
//           <div className="icon">next week</div>
//         </div>
//       </div>
//     );
//   };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
 
  return (
    <div className="calendar">
      {/* {renderHeader()} */}
      {/* {renderFooter()} */}
      {renderDays()}
      {renderCells()}
    
    </div>
  );
};

export default Calendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
