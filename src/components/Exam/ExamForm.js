import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { BiSearchAlt2 } from "react-icons/bi"
import { BsImageFill } from "react-icons/bs"
// import {Recipient} from "./Recipient"

export function ExamForm() {
    $(".close_event").click(function () {
        $(".user_type").hide();
    });
    function preview() {
        $(".preview_polls").show();
    }


    $(".close_event").click(function () {
        $(".preview_polls").hide();
    });

    $(".close_event").click(function () {
        $(".preview_category").hide();
    });

    function edit_category() {
        $(".preview_polls").hide();
        $(".preview_category").show();
    }

    const token = localStorage.getItem('Token');
    const [data, setData] = useState([])
    const [date, updateDate] = useState("");
    const [time, updateTime] = useState("")
    const [department, updateDepartment] = useState("");
    const [departmentdata, updateDepartmentData] = useState([]);
    const [examClass, updateExamClass] = useState("");
    const [examName, updateExamName] = useState("")
    const [subject, updateSubject] = useState("");
    const [subjectData, updateSubjectData] = useState([])
    const [syllabuss, updateSyllabus] = useState();
    const [error_message, updateError_message] = useState("");
    const [classData, updateClassData] = useState([]);


    async function createExam() {
        try {
            const exam_date = document.getElementById("exam_date");
            const exam_time = document.getElementById("exam_time");
            const department_name = document.getElementById("department_name");
            const class_name = document.getElementById("class_name");
            const exam_name = document.getElementById("exam_name");
            const subject_name = document.getElementById("subject_name");
            const syllabus = document.getElementById("syllabus");
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (exam_date.value == "" &&
                exam_time.value == "" &&
                department_name.value == "" &&
                class_name.value == "" &&
                exam_name.value == "" &&
                subject_name.value == "" &&
                syllabus.value == "") {
                $(".ValueMsg").show();

                setTimeout(function () {
                    $(".ValueMsg").hide();
                }, 3000);
                return;
            }

            else if (exam_date.value == "") {

                $(".ExamDate").show();

                setTimeout(function () {
                    $(".ExamDate").hide();
                }, 3000);

            }

            else if (exam_time.value == "") {

                $(".ExamTime").show();

                setTimeout(function () {
                    $(".ExamTime").hide();
                }, 3000);

            }

            else if (department_name.value == "") {

                $(".DepartmentName").show();

                setTimeout(function () {
                    $(".DepartmentName").hide();
                }, 3000);

            }

            else if (class_name.value == "") {

                $(".ExamClass").show();

                setTimeout(function () {
                    $(".ExamClass").hide();
                }, 3000);

            }

            else if (exam_name.value == "") {

                $(".ExamName").show();

                setTimeout(function () {
                    $(".ExamName").hide();
                }, 3000);

            }

            else if (subject_name.value == "") {

                $(".SubjectName").show();

                setTimeout(function () {
                    $(".SubjectName").hide();
                }, 3000);

            }

            else if (syllabus.value == "") {

                $(".Syllabus").show();

                setTimeout(function () {
                    $(".Syllabus").hide();
                }, 3000);

            }

            else {

                const formData = new FormData();

                formData.append("date", date);
                formData.append("department", department);
                formData.append("class", examClass);
                formData.append("test_name", examName);
                formData.append("subject", subject);
                formData.append("time", time);
                formData.append("syllabus", syllabuss)


                const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_add_exam_timetable",
                    formData,
                    {
                        headers:
                        {
                            "Content-Type": 'multipart/form-data',
                            // "X-Requested-With": "XMLHttpRequest",
                            "Authorization": token,
                        }
                    });

                console.log("Create Exam", response.data);
                setData([response.data])

                updateError_message(response.data.message);

                updateDate("");
                updateTime("");
                updateExamClass("");
                updateDepartment("");
                updateExamName("");
                updateSyllabus("");
                updateSubject("");

                window.location.href = "/Exam"

                $(".formSuccess").show();

                setTimeout(function () {
                    $(".formSuccess").hide();
                }, 5000);

            }
        }
        catch (err) {
            console.log("Log in Fail", err);

        }


    }

    async function fetchDepartmentList() {
        const token = localStorage.getItem('Token');
        console.log("Access Token-", token);
        try {

            const fetchDepartmentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_department_list",
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',
                        "Authorization": token,
                    }
                }
            );

            console.log("Get Department List", fetchDepartmentResponse);
            updateDepartmentData(fetchDepartmentResponse.data.data)


        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    async function fetchClassList() {
        const token = localStorage.getItem('Token');
        console.log("Access Token-", token);
        try {

            const fetchClassResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_classes_list",
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',
                        "Authorization": token,
                    }
                }
            );

            console.log("Get Class List", fetchClassResponse.data.data);
            updateClassData(fetchClassResponse.data.data)


        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    async function fetchSubjectList() {
        const token = localStorage.getItem('Token');
        console.log("Access Token-", token);
        try {

            const fetchSubjectResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_subject_list",
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',
                        "Authorization": token,
                    }
                }
            );

            console.log("Get Department List", fetchSubjectResponse.data.data);
            updateSubjectData(fetchSubjectResponse.data.data)


        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    useEffect(() => {
        fetchDepartmentList();
        fetchClassList();
        fetchSubjectList();
    }, []);


    return (
        <div>
            <div className="content-wrapper">

                <div style={{ padding: "8px", margin: "0", }}>

                    <h1 className="main_heading_h1">CREATE EXAM FORM</h1>
                </div>


                <div class="formSuccess" style={{ marginTop: "5px", width:"97%", marginLeft: "18px", marginRight: "198px", display: "none" }}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="success">
                            {error_message}
                        </Alert>
                    </Stack>
                </div>



                <div style={{ background: "white", margin: "5px 30px 0px 15px", padding: "10px 10px 10px 20px", width: "98%", borderRadius: "10PX" }}>

                    {/*exam date  */}
                    <div className="mt-2 p-0">
                        <div class="row" >
                            <div class="col-md-5">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Exam Date</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>
                                    {/* <div class="date-container" style={{ width: "100%" }}> */}
                                        <input type="date"

                                            placeholder="dd-mm-yyyy"
                                            id="exam_date"
                                            value={date}
                                            onChange={(e) => updateDate(e.target.value)}
                                            name="birthdaytime"
                                            style={{ border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", width: "100%", height: "35px", padding: "6px", background: "white" }}
                                        />
                                        {/* <i class="date-icon fa fa-calendar" aria-hidden="true"></i> */}
                                        {/* <img src="dist/img/calendar_plus.png" style={{ width: "25px", height: "25px" }} class="exam-date-icon" aria-hidden="true" /> */}
                                         
                                        <div
                                        class="ExamDate"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Exam Date
                                        </h4>
                                    </div>
                                    {/* </div> */}
                                </div>

                            </div>
                            <div class="col-md-5">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Exam Time</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>
                                    {/* <div class="date-container" style={{width:"100%"}}> */}
                                    <input type="time"

                                        placeholder="dd-mm-yyyy"
                                        id="exam_time"
                                        value={time}
                                        onChange={(e) => updateTime(e.target.value)}
                                        name="birthdaytime"
                                        style={{ border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", width: "100%", height: "35px", padding: "6px", background: "white" }}
                                    />

                                    <div
                                        class="ExamTime"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Time
                                        </h4>
                                    </div>
                                    {/* <i class="date-icon fa fa-calendar" aria-hidden="true"></i> */}
                                    {/* <img src="dist/img/calendar_plus.png" style={{width:"25px",height:"25px"}}  class="exam-date-icon" aria-hidden="true"/> */}

                                    {/* </div> */}
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* department */}
                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-5 d-flex">
                                <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Department</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>

                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        id="department_name"
                                        onChange={(e) => updateDepartment(e.target.value)}
                                      
                                        style={{ width: "100%", height: "35px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px" }}>


                                        <option selected="selected" value={department} >Select Department</option>
                                        {departmentdata.map((dept, index) => {
                                            console.log("department details",dept)

                                            return (
                                                <option value={dept.department_id} key={index}>
                                                    {dept.department_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div
                                        class="DepartmentName"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Department
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-5 d-flex">
                                <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Class</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>

                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        id="class_name"
                                        //value={examClass}
                                        onChange={(e) => updateExamClass(e.target.value)}
                                        style={{ width: "100%", height: "35px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px" }}>


                                        <option selected="selected" value={examClass} >Select Class</option>
                                        {classData.map((classItem, index) => {
                                            console.log("class list", classItem)
                                            return (
                                                <option value={classItem.class_id} key={index}>
                                                    {classItem.class_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div
                                        class="ExamClass"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Class
                                        </h4>
                                    </div>
                                    
                                   
                                </div>

                            </div>
                        </div>
                    </div>



                    {/* test name */}

                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-10 d-flex">
                                <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Exam Name</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>

                                    <input
                                        type="name"
                                        id="exam_name"
                                        value={examName}
                                        onChange={(e) => updateExamName(e.target.value)}
                                        placeholder="Enter Exam Name..."
                                        autoComplete="true"
                                        style={{ width: "100%", height: "35px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX" }}

                                    />
                                    <div
                                        class="ExamName"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Exam Name
                                        </h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* subject */}
                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-10 d-flex">
                                <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Subject</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>

                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        id="subject_name"
                                       // value={subject}
                                        onChange={(e) => updateSubject(e.target.value)}
                                        style={{ width: "100%", height: "35px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px" }}>


                                        <option selected="selected" value={subject} >Select Subject</option>
                                        {subjectData.map((subItem, index) => {

                                            return (
                                                <option value={subItem.subject_id} key={index}>
                                                    {subItem.subject_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div
                                        class="SubjectName"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Subject
                                        </h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* syllabus */}
                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-10">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <div className="d-flex">
                                        <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Syllabus</label>

                                        <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                    </div>
                                    <textarea
                                        type="name"
                                        rows="4"
                                        id="syllabus"
                                        value={syllabuss}
                                        onChange={(e) => updateSyllabus(e.target.value)}
                                        placeholder="Enter Syllabus..."
                                        style={{ width: "100%", height: "80px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "6px" }}

                                    />
                                    <div
                                        class="Syllabus"
                                        style={{ marginTop: "-6px", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Write Syllabus
                                        </h4>
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>




                    {/* buttons */}
                    <div className="d-flex mt-4 form-buttons">

                        <div class="ValueMsg" style={{ marginTop: "-17px", width: "69%", display: "none" }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert variant="filled" severity="error">
                                    Error! You Must Fill In All The Fields
                                </Alert>
                            </Stack>
                        </div>

                        <img src="dist/img/delete.png" alt="dropdown" style={{ width: "33px", height: "33px", marginTop: "5px" }} className="ml-auto" />
                        <img src="dist/img/view.png" alt="dropdown" style={{ width: "33px", height: "33px", marginLeft: "8PX", marginTop: "5px" }} onClick={() => preview()} />
                        {/* <a href="/student"> */}
                        <input
                            type="button"
                            className=" form-buttons3"
                            defaultValue="Sign Up"
                            onClick={() =>createExam()}
                            value="Publish"
                            style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "8px", backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginRight: "60PX" }}
                        />
                        {/* </a> */}
                    </div>


                </div>

                {/* PREVIEW */}
                <div className="preview_polls" style={{ position: "fixed", top: "0", left: "0px", background: "rgba(0,0,0,0.5)", padding: "10px", width: "100%", height: "100%", zIndex: "10", display: "none" }}>
                    <div style={{ padding: "15px", background: "#f5f5f5", boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)", position: "absolute", top: "140px", right: "5px", width: "403px", height: "485px", bottom: "0", overflow: "auto" }}>
                        <div className="d-flex" style={{ borderBottom: "2px solid #15a312", transform: "rotate(0.13deg)" }}>
                            <label style={{ color: "black", fontSize: "13px", fontWeight: "700" }}>Preview</label>


                            <img src="dist/img/Cancel.png" alt="dropdown" width="18px" height="14px" className="close_event ml-auto" style={{ cursor: "pointer" }} />

                        </div>
                        {/* category & question */}
                        <div style={{ background: "white", marginTop: "10PX", padding: "5px 10PX", border: "0.4px solid #C4C4C4" }}>
                            <div className="d-flex">
                                <h4 style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "14PX", fontWeight: "600" }}>Exam</h4>
                                <img src="dist/img/Pencil.png" alt="dropdown" width="18px" height="18px" className=" ml-auto" onClick={() => edit_category()} />
                            </div>

                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Exam Date</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: 26th April 2022</p>
                            </div>



                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Exam Time</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: 10:00 A.M </p>
                            </div>

                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Department</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: Computer Science </p>
                            </div>

                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Class</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: First Year </p>
                            </div>

                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Exam Name</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: Prelims I </p>
                            </div>

                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Subject</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: Maths </p>
                            </div>

                            <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                                <p className="col-md-4" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "12PX" }}>Syllabus</p>
                                <p className="col-md-8" style={{ color: "#1f3977", fontWeight: "600", fontSize: "12PX" }}>: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
                            </div>

                        </div>


                    </div>
                </div>


                {/* **********************************************edit category************************************* */}
                <div className="preview_category" style={{ position: "fixed", top: "0", left: "0px", background: "rgba(0,0,0,0.5)", padding: "10px", width: "100%", height: "100%", zIndex: "10", display: "none" }}>
                    <div style={{ padding: "15px", background: "#f5f5f5", boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)", position: "absolute", top: "140px", right: "5px", width: "400px", height: "480PX", overflow: "auto" }}>
                        <div className="d-flex" style={{ borderBottom: "2px solid #15a312", transform: "rotate(0.13deg)" }}>
                            <label style={{ color: "black", fontSize: "13px", fontWeight: "700" }}>Campus Event</label>


                            <img src="dist/img/Cancel.png" alt="dropdown" width="18px" height="14px" className="close_event ml-auto" style={{ cursor: "pointer" }} />

                        </div>
                        {/* category & question */}
                        <div>
                            {/* exam date */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                            <div className="d-flex">
                                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Exam Date</label>

                                                <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                            </div>
                                            <div class="date-container" style={{ width: "100%" }}>
                                                <input type="text"

                                                    placeholder="dd-mm-yyyy"
                                                    id="publish_date"

                                                    name="birthdaytime"
                                                    style={{ border: "0.5px solid #c4c4c4", boxSizing: "border-box", width: "100%", height: "35px", padding: "6px", background: "white" }}
                                                />
                                                {/* <i class="date-icon fa fa-calendar" aria-hidden="true"></i> */}
                                                <img src="dist/img/calendar_plus.png" style={{ width: "25px", height: "25px" }} class="exam-date-icon" aria-hidden="true" />

                                            </div>




                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* exam time */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                            <div className="d-flex">
                                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Exam Time</label>

                                                <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                            </div>

                                            <input type="time"

                                                placeholder="dd-mm-yyyy"
                                                id="publish_date"

                                                name="birthdaytime"
                                                style={{ border: "0.5px solid #c4c4c4", boxSizing: "border-box", width: "100%", height: "35px", padding: "6px", background: "white" }}
                                            />
                                            {/* <i class="date-icon fa fa-calendar" aria-hidden="true"></i> */}
                                            {/* <img src="dist/img/calendar_plus.png" style={{width:"25px",height:"25px"}}  class="exam-date-icon" aria-hidden="true"/> */}






                                        </div>
                                    </div>

                                </div>

                            </div>
                            {/* department */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                            <div className="d-flex">
                                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Department</label>

                                                <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                            </div>
                                            <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                                id="department"
                                                onChange={(e) => updateDepartment(e.target.value)}
                                                style={{ width: "100%", height: "35px", border: "0.5px solid #c4c4c4", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px" }}>


                                                <option selected="selected" value={department} >Select Department</option>
                                                {departmentdata.map((dept, index) => {

                                                    return (
                                                        <option value={dept.department_id} key={index}>
                                                            {dept.department_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>


                                            <div
                                                class="newsDescription"
                                                style={{ marginTop: "-6px", display: "none" }}>
                                                <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                                    Please Write News Description
                                                </h4>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* class */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                            <div className="d-flex">
                                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Class</label>

                                                <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                            </div>
                                            <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                                id="class"
                                                onChange={(e) => updateClassData(e.target.value)}
                                                style={{ width: "100%", height: "35px", border: "0.5px solid #c4c4c4", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px" }}>


                                                <option selected="selected" value={examClass} >Select Class</option>
                                                {classData.map((classItem, index) => {
                                                    console.log("class list", classItem)
                                                    return (
                                                        <option value={classItem.class_id} key={index}>
                                                            {classItem.class_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>


                                            <div
                                                class="newsDescription"
                                                style={{ marginTop: "-6px", display: "none" }}>
                                                <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                                    Please Write News Description
                                                </h4>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* exam name */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                            <div className="d-flex">
                                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Exam Name</label>

                                                <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                            </div>
                                            <input
                                                type="name"
                                                // id="item_name"
                                                // className="input-field"
                                                // placeholder="Enter Item Name..."
                                                autoComplete="true"
                                                // value={title}
                                                // onChange={(e) => updateTitle(e.target.value)}
                                                style={{ width: "100%", height: "30px", border: "0.5px solid #c4c4c4", fontSize: "12px", paddingLeft: "5PX" }}

                                            />


                                            <div
                                                class="newsDescription"
                                                style={{ marginTop: "-6px", display: "none" }}>
                                                <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                                    Please Write News Description
                                                </h4>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* subject */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                            <div className="d-flex">
                                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Subject</label>

                                                <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                                            </div>
                                            <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                                id="subject"
                                                onChange={(e) => updateSubject(e.target.value)}
                                                style={{ width: "100%", height: "35px", border: "0.5px solid #c4c4c4", boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX", borderRadius: "0px" }}>


                                                <option selected="selected" value={subject} >Select Subject</option>
                                                {subjectData.map((subItem, index) => {

                                                    return (
                                                        <option value={subItem.subject_id} key={index}>
                                                            {subItem.subject_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>


                                            <div
                                                class="newsDescription"
                                                style={{ marginTop: "-6px", display: "none" }}>
                                                <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                                    Please Write News Description
                                                </h4>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* syllabus */}
                            <div className="mt-2 p-0">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div className="" style={{ width: "100%", marginTop: "0px" }}>

                                            <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Syllabus</label>


                                            <textarea
                                                type="name"
                                                rows="4"
                                                id="syllabus"
                                                // value={newsContent}
                                                // onChange={(e) => updateNewsContent(e.target.value)}
                                                // placeholder="Your message goes here..."
                                                style={{ width: "100%", height: "80px", border: "0.5px solid #c4c4c4", boxSizing: "border-box" }}

                                            />

                                            <div
                                                class="newsDescription"
                                                style={{ marginTop: "-6px", display: "none" }}>
                                                <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                                    Please Write News Description
                                                </h4>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </div>










                            {/* ******************button********************** */}
                            <div className="d-flex form-buttons mt-4" style={{ paddingRight: "30px" }}>

                                {/* <div class="ValueMsg" style={{ margin: "8px", width:"57%", display: "none" }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                 Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div> */}

                                {/* <img src="dist/img/delete.png" alt="dropdown" style={{width:"33px", height:"33px",marginTop:"5px"}} className="ml-auto" /> */}
                                {/* <img src="dist/img/view.png" alt="dropdown" style={{width:"33px", height:"33px",marginLeft:"8PX",marginTop:"5px"}} /> */}
                                <input
                                    type="button"
                                    className=" form-buttons3 ml-auto"
                                    defaultValue="Next Step"
                                    // onClick={() =>createNews()}
                                    value="Cancel"
                                    style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", backgroundColor: "#6e7781", padding: "5px 30px", fontSize: "12PX" }}
                                />

                                <input
                                    type="button"
                                    className=" form-buttons3"
                                    defaultValue="Next Step"
                                    // onClick={() =>createNews()}
                                    value="Save"
                                    style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "5px", backgroundColor: "#1F3977", padding: "5px 30px", fontSize: "12PX" }}
                                />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
