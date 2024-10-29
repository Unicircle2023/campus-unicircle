import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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
  subWeeks,
} from "date-fns";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import $ from "jquery";
import moment from "moment";
import { Table } from "./Table";
import { Header } from "../Header";
import { ExportToExcel } from "./ExportToExcel";

import { Menu } from "../Menu";
import { useLocation } from "react-router-dom";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Week,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, Query } from "@syncfusion/ej2-data";

export default function NewTimeTable() {
  const token = localStorage.getItem("Token");
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [courseName, updateCourseName] = useState("");
  const [className, updateClassName] = useState("");
  const fileName = "timetable";
  const [timetableData, updateTimetableData] = useState([]);
  const [selectedCellId, updateSelectedCellId] = useState("");
  const [isCellSelected, updateIsCellSelected] = useState(false);

  const location = useLocation();
  const componentRef = useRef();

  function EditTimetable(scheduleId) {
    $(".preview_category").show();
  }

  function deleteSchedules(scheduledIDD) {
    updateSelectedCellId(scheduledIDD);
    $(".delete_container").show();
  }

  const print = () => window.print();

  const renderHeader = () => {
    const dateFormat = "MMM";

    return (
      <div className="header d-flex">
        <div>
          <div className="icon" onClick={() => {}}>
            {/* prev week */}
            <img
              src={require("../images/Forward Button.png")}
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>
        <div className="" style={{ marginLeft: "10PX", fontWeight: "500" }}>
          <span>
            {" "}
            {"weeknumber"} week, {moment().format("MMMM")}
          </span>
        </div>
        <div style={{ marginLeft: "10px" }} onClick={() => {}}>
          <div className="icon">
            <img
              src={require("../images/Forward Button.png")}
              style={{
                width: "15px",
                height: "15px",
                transform: "rotate(-180deg)",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const calendarHeader = () => (
    <div className="custom-header">
        <div className="custom-header-cell">Sunday</div>
        <div className="custom-header-cell">Monday</div>
        <div className="custom-header-cell">Tuesday</div>
        <div className="custom-header-cell">Wednesday</div>
        <div className="custom-header-cell">Thursday</div>
        <div className="custom-header-cell">Friday</div>
        <div className="custom-header-cell">Saturday</div>
      </div>
  );

  return (
    <div>
      <div className="d-flex">
        <Menu />
        <div className="content-wrapper">
          <div
            style={{
              background: "white",
              padding: "10PX",
              marginTop: "10PX",
              marginLeft: "0px",
              marginRight: "40px",
              height: "570px",
              overflowY: "auto",
            }}
          >
            <div className="d-flex">
              <p
                style={{
                  fontSize: "11PX",
                  fontWeight: "600",
                  marginTop: "10PX",
                  fontFamily: "Poppins",
                }}
              >
                Timetable -{" "}
              </p>
              <p
                style={{
                  color: "#1f3977",
                  fontSize: "11PX",
                  fontWeight: "600",
                  marginTop: "10PX",
                  fontFamily: "Poppins",
                }}
              >
                {courseName} - {className}
              </p>

              <div style={{ marginLeft: "auto", paddingTop: "7PX" }}>
                <ExportToExcel apiData={timetableData} fileName={fileName} />
              </div>

              {/* <img src={require("../images/Excel.png")} style={{width:"20px", height:"20px",marginLeft:"auto",marginTop:"10PX"}}/> */}
              <img
                src={require("../images/Print.png")}
                className="printButton"
                onClick={print}
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10PX",
                  marginTop: "10PX",
                  cursor: "pointer",
                }}
              />
              <a className="cta" href="#delete" onClick={() => EditTimetable()}>
                <img
                  src={require("../images/Edit.png")}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                    marginTop: "10PX",
                    cursor: "pointer",
                  }}
                />
              </a>
              <a
                className="cta"
                href="#deleterowSchedule"
                onClick={() => deleteSchedules(selectedCellId, isCellSelected)}
              >
                <img
                  src={require("../images/deleteBlueTrash.png")}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                    marginTop: "10PX",
                    cursor: "pointer",
                  }}
                />
              </a>
              <div className="calendar" style={{ marginLeft: "30PX" }}>
                {renderHeader()}
              </div>
            </div>

            <div>
              <br />

              <div className="calendar" ref={componentRef}>
                {/* {renderCells()} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
