import React, { useState, useEffect } from 'react'
import axios from 'axios';
import $, { map } from "jquery"
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Select from 'react-select'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { IoMdAddCircle } from "react-icons/io"
import { BsImageFill } from "react-icons/bs"
import { Link } from 'react-router-dom';


export function AddTeacherFormNew() {

    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [preferredName, updatePreferredName] = useState("");
    const [dateOfBirth, updateDateOfBirth] = useState("");
    const [gender, updateGender] = useState("");
    const [department, updateDepartment] = useState("");
    const [teacherClass, updateTeacherClass] = useState("");
    const [subject, updateSubject] = useState("");
    const [mobile, updateMobile] = useState("");
    const [email, updateEmail] = useState("");
    const [spokenLanguage, updateSpokenLanguage] = useState("");
    const [race, updateRace] = useState("");
    const [password, updatePassword] = useState("");
    const [image, updateImage] = useState("");
    const [designation, updateDesignation] = useState("");
    const token = localStorage.getItem('Token');
    const [data, setData] = useState([]);
    const [departmentdata, setDepartmentData] = useState([]);
    const [racedata, setRaceData] = useState([]);
    console.log("race data", racedata);
    const [languagedata, setLanguageData] = useState([]);
    const [error_message, updateError_message] = useState("");



    const [classList, setclassList] = useState([]);
    const [classdata, setClassData] = useState([]);

    const [subjectList, setsubjectList] = useState([]);
    const [subjectdata, setSubjectData] = useState([])

    const [DisplayValue, getValue] = useState();
    const [DisplaySubjectValue, setDisplaySubjectValue] = useState([]);

    const [class_arr, setclass_arr] = useState([])


    async function createTeacher() {


        // DisplayValue.map(item => {
        //     console.log(item);
        //     let d = {
        //         "class_name": item
        //     }
        //     class_arr.push(d)
        // })
        // console.log(JSON.stringify(class_arr));

        let sub_arr = [];

        DisplaySubjectValue.map(sub => {
            console.log(sub);
            let subject = {
                "subject_name": sub
            }

            sub_arr.push(subject)
        })

        console.log("pallavi", JSON.stringify(sub_arr));
        console.log("DisplaySubjectValue =>", DisplaySubjectValue)

        try {
            const firstt_name = document.getElementById("first_name");
            const lastt_name = document.getElementById("last_name");
            const preferred_name = document.getElementById("preferred_name");
            const dobb = document.getElementById("dob");
            const gender_new = document.getElementById("gender_neww");
            const department_new = document.getElementById("department_neww");
           // const class_new = document.getElementById("class_neww");
           //const subject_new = document.getElementById("subject_neww");
            const mobile_new = document.getElementById("mobile_neww");
            const email_new = document.getElementById("email_neww");
            const spokenn_language = document.getElementById("spokenn_language");
            const race_new = document.getElementById("race_neww");
            const password_new = document.getElementById("password_neww");
            const image_new = document.getElementById("file-ip-1");
            const designation_new = document.getElementById("designation_neww");

            if (firstt_name.value == "" &&
                lastt_name.value == "" &&
                preferred_name.value == "" &&
                dobb.value == "" &&
                gender_new.value == "" &&
                department_new.value == "" &&
               // class_new.value == "" &&
                //subject_new.value == "" &&
                mobile_new.value == "" &&
                email_new.value == "" &&
                spokenn_language.value == "" &&
                race_new.value == "" &&
                password_new.value == "" &&
                image_new.value == "" &&
                designation_new.value == "") {
                $(".ValueMsg").show();

                setTimeout(function () {
                    $(".ValueMsg").hide();
                }, 3000);
                return;
            }

            else if (firstt_name.value == "") {

                $(".FirstName").show();

                setTimeout(function () {
                    $(".FirstName").hide();
                }, 3000);

            }

            else if (lastt_name.value == "") {

                $(".LastName").show();

                setTimeout(function () {
                    $(".LastName").hide();
                }, 3000);

            }

            else if (preferred_name.value == "") {

                $(".PreferredName").show();

                setTimeout(function () {
                    $(".PreferredName").hide();
                }, 3000);

            }

            else if (dobb.value == "") {

                $(".Dob").show();

                setTimeout(function () {
                    $(".Dob").hide();
                }, 3000);

            }

            else if (gender_new.value == "") {

                $(".Gender").show();

                setTimeout(function () {
                    $(".Gender").hide();
                }, 3000);

            }

            else if (department_new.value == "") {

                $(".Department").show();

                setTimeout(function () {
                    $(".Department").hide();
                }, 3000);

            }


            // else if (class_new.value == "") {

            //     $(".ClassesList").show();

            //     setTimeout(function () {
            //         $(".ClassesList").hide();
            //     }, 3000);

            // }

            // else if (subject_new.value == "") {

            //     $(".Subjects").show();

            //     setTimeout(function () {
            //         $(".Subjects").hide();
            //     }, 3000);

            // }

            else if (mobile_new.value == "") {

                $(".Mobile").show();

                setTimeout(function () {
                    $(".Mobile").hide();
                }, 3000);

            }

            else if (email_new.value == "") {

                $(".Email").show();

                setTimeout(function () {
                    $(".Email").hide();
                }, 3000);

            }

            else if (spokenn_language.value == "") {

                $(".SpokenLanguage").show();

                setTimeout(function () {
                    $(".SpokenLanguage").hide();
                }, 3000);

            }

            else if (race_new.value == "") {

                $(".Race").show();

                setTimeout(function () {
                    $(".Race").hide();
                }, 3000);

            }

            else if (password_new.value == "") {

                $(".Password").show();

                setTimeout(function () {
                    $(".Password").hide();
                }, 3000);

            }
            else if (image_new.value == "") {

                $(".Image").show();

                setTimeout(function () {
                    $(".Image").hide();
                }, 3000);

            }

            else if (designation_new.value == "") {

                $(".Designation").show();

                setTimeout(function () {
                    $(".Designation").hide();
                }, 3000);

            }

            else {

                const formData = new FormData();

                formData.append("first_name", firstName);
                formData.append("last_name", lastName);
                formData.append("preffered_name", preferredName);
                formData.append("dob", dateOfBirth);
                formData.append("image", image);
                formData.append("gender", gender);
                formData.append("department_id", department);
                formData.append("classes", JSON.stringify(teacherClass));
                formData.append("subjects", JSON.stringify(subject));
                formData.append("mobile", mobile);
                formData.append("email", email);
                formData.append("spoken_language", spokenLanguage);
                formData.append("race", race);
                formData.append("password", password);
                formData.append("designation", designation);

                const response = await axios.post(process.env.REACT_APP_API_KEY + "add_teacher",
                    formData,
                    {
                        headers:
                        {
                            "Content-Type": 'multipart/form-data',
                            // "X-Requested-With": "XMLHttpRequest",
                            "Authorization": token,
                        }
                    });

                console.log("Create Teacher", response);
                setData([response.data]) 

                updateError_message(response.data.message);

                // console.log("Campus Name",campusName);
                // console.log("Address",address);
                // console.log("City",city);
                // console.log("State",state);


                updateFirstName("");
                updateLastName("");
                updatePreferredName("");
                updateDateOfBirth("");
                updateGender("");
                updateDepartment("");
                updateTeacherClass([]);
                updateSubject([]);
                updateMobile("");
                updateEmail("");
                updateSpokenLanguage("");
                updateRace("");
                updatePassword("");
                updateImage("");
                updateDesignation("");

                 window.location.href = "/teachers";

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

    async function fetchList() {
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

            console.log("Get Department List Details", fetchDepartmentResponse);

            const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
            console.log("Department Error Code ", DepartmentErrorCode);

            const DepartmentErrorMsg = fetchDepartmentResponse.data.message;
            console.log("Department Error msg ", DepartmentErrorMsg);

            //   const campusListArry = fetchStudentResponse.data.data;
            //   console.log("Campus listArry", campusListArry);

            //   setData(campusListArry);

            if (DepartmentErrorCode == 200) {
                const departmentListArray = fetchDepartmentResponse.data.data;
                console.log("Department list Array", departmentListArray);
                setDepartmentData(departmentListArray);
            }
            else {
                setDepartmentData([]);

                console.log(fetchDepartmentResponse.data.message);
                $(".alert-danger").show();
                setTimeout(function () {
                    $(".alert-danger").hide();
                }, 3000);
            }

            

        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    {
        departmentdata.map((item, index) => {
            console.log("data", departmentdata);
        })
    }
    useEffect(() => {
        fetchList();
    }, []);


    async function fetchRaceList() {
        console.log("Access Token-", token);
        try {

            const fetchRaceResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_race_list",
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',

                        "Authorization": token,
                    }
                }
            );

            console.log("Get Race List Details", fetchRaceResponse);

            const RaceErrorCode = fetchRaceResponse.data.error_code;
            console.log("Race Error Code ", RaceErrorCode);

            const RaceErrorMsg = fetchRaceResponse.data.message;
            console.log("Race Error msg ", RaceErrorMsg);


            if (RaceErrorCode == 200) {
                const raceListArray = fetchRaceResponse.data.data;
                console.log("Race list Array", raceListArray);
                setRaceData(raceListArray);
            }
            else {
                setRaceData([]);

                console.log(fetchRaceResponse.data.message);
                $(".alert-danger").show();
                setTimeout(function () {
                    $(".alert-danger").hide();
                }, 3000);
            }

        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    {
        racedata.map((item, index) => {
            console.log("data", racedata);
        })
    }
    useEffect(() => {
        fetchRaceList();
    }, []);



    async function fetchLanguageList() {
        console.log("Access Token-", token);
        try {

            const fetchLanguageResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_languages_list",
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',

                        "Authorization": token,
                    }
                }
            );

            console.log("Get Language List Details", fetchLanguageResponse);

            const LanguageErrorCode = fetchLanguageResponse.data.error_code;
            console.log("Language Error Code ", LanguageErrorCode);

            const LanguageErrorMsg = fetchLanguageResponse.data.message;
            console.log("Language Error msg ", LanguageErrorMsg);


            if (LanguageErrorCode == 200) {
                const languageListArray = fetchLanguageResponse.data.data;
                console.log("Language list Array", languageListArray);
                setLanguageData(languageListArray);
            }
            else {
                setLanguageData([]);

                console.log(fetchLanguageResponse.data.message);
                $(".alert-danger").show();
                setTimeout(function () {
                    $(".alert-danger").hide();
                }, 3000);
            }

        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }


    useEffect(() => {
        fetchLanguageList();
    }, []);

    async function fetchClassList() {
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
            console.log("Get Classes List Details", fetchClassResponse);
            const ClassErrorCode = fetchClassResponse.data.error_code;
            console.log("Class Error Code ", ClassErrorCode);
            const ClassErrorMsg = fetchClassResponse.data.message;
            console.log("class Error msg ", ClassErrorMsg);
            if (ClassErrorCode == 200) {
                const classListArray = fetchClassResponse.data.data;
                console.log("Class list Array", classListArray);
                setClassData(classListArray);


                classListArray.map(item => {
                    console.log(item);
                    let d = {
                        "label": item.class_name,
                        "value": item.class_id
                    }
                    console.log("d", d)
                    class_arr.push(d)
                    setclassList(class_arr);
                    console.log("classListArray", classListArray)
                })
            }
            else {
                setClassData([]);
                console.log(fetchClassResponse.data.message);
                $(".alert-danger").show();
                setTimeout(function () {
                    $(".alert-danger").hide();
                }, 3000);
            }
        }
        catch (err) {
            console.log("Log in Fail", err);
        }

    }

    // {
    //     classdata.map((item, index) => {
    //         console.log("data", item);
    //         var classlist = [];
    //         classlist = item.class_name;
    //         setClassData(classlist);
    //         console.log("classes list here", classesList);
    //     })
    // }
    useEffect(() => {
        fetchClassList();
    }, []);


    async function fetchSubjectList() {
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
            console.log("Get Subject List Details", fetchSubjectResponse);
            const SubjectErrorCode = fetchSubjectResponse.data.error_code;
            console.log("Subject Error Code ", SubjectErrorCode);
            const SubjectErrorMsg = fetchSubjectResponse.data.message;
            console.log("subject Error msg ", SubjectErrorMsg);
            if (SubjectErrorCode == 200) {
                const subjectListArray = fetchSubjectResponse.data.data;
                console.log("Subject list Array", subjectListArray);
                setSubjectData(subjectListArray);

                let sub_arr = [];

                // subjectListArray.map(item => {
                //     console.log(item);
                //     let sub = {
                //         "label": item.subject_name,
                //         "value": item.subject_id
                //     }
                //     console.log("sub", sub)
                //     sub_arr.push(sub)
                //     setsubjectList(sub_arr);

                // })

                subjectListArray.map(item => {
                    console.log(item);
                    let d = {
                        "label": item.subject_name,
                        "value": item.subject_id
                    }
                    console.log("d", d)
                    subjectList.push(d)
                    setsubjectList(subjectList);
                    console.log("subjectListArray", subjectListArray)
                })
            }
            else {
                setSubjectData([]);
                console.log(fetchSubjectResponse.data.message);
                $(".alert-danger").show();
                setTimeout(function () {
                    $(".alert-danger").hide();
                }, 3000);
            }
        }
        catch (err) {
            console.log("Log in Fail", err);
        }

    }

    useEffect(() => {
        fetchSubjectList();
    }, []);
    const [value, setvalue] = useState("");
    const handleOnchange = (val) => setvalue(val);


    // console.log("DisplayValue =>", DisplayValue)

    // const jsonString = JSON.stringify(Object.assign({}, DisplayValue))
    // console.log("jsonString", jsonString)

    // const handleDropdown=(e)=> {
    //     console.log("sss", e);

    //     e.map(item => {
    //         console.log(item);
    //         let d = {
    //             "class_id": item.value,

    //         }
    //         console.log("d", d)
    //         class_arr.push(d)

    //         console.log("classListArray", class_arr)
    //     })

    // }

    const handleDropdown = (cls) => {
        console.log("cls values", cls);
        let sel_class = [];
        // [{"subject_id":"1"},{"subject_id":"2"}]
        // subject_arr=[];
        cls.map(item => {
            console.log(item);
            let class_id = {
                "class_id": item.value,
            }
            sel_class.push(class_id);

        })
        updateTeacherClass(sel_class);

    }


    // function handleDropdownSubject(p) {
    //     setDisplaySubjectValue(Array.isArray(p) ? p.map(x => x.label) : []);
    // }

    const handleDropdownSubject = (sub) => {
        console.log("sub values", sub);
        let sel_subject = [];
        sub.map(item => {
            console.log(item);
            let subject_id = {
                "subject_id": item.value,
            }
            sel_subject.push(subject_id);

        })
        updateSubject(sel_subject);
    }

    const getImage = (e) => {
        updateImage(e.target.files[0]);
        if (e.target.files.length > 0) {
            var src = URL.createObjectURL(e.target.files[0]);
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }

    return (
        <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
            <Link to="/teachers" >
                <div className="d-flex" style={{ padding: "0", margin: "0" }}>
                    <i class="fas fa-arrow-alt-circle-left" style={{ color: "black", margin: "0px 0px 0px 10px", fontSize: "24px", padding: "0", fontWeight: "bold" }} />
                </div>
            </Link>

            <div class="formSuccess" style={{ marginTop: "5px", marginLeft: "18px", marginRight: "198px", display: "none" }}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="success">
                        {error_message}
                    </Alert>
                </Stack>
            </div>


            <div style={{ background: "white", margin: "5px 20px 0px 20px", padding: "15px", width: "80%" }}>
                <div>
                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>First Name*</label>
                                    <input
                                        type="name"
                                        id="first_name"
                                        placeholder="Enter First Name..."
                                        autoComplete="true"
                                        value={firstName}
                                        onChange={(e) => updateFirstName(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX" }}

                                    />

                                    <div
                                        class="FirstName"
                                        style={{ margin: "0", display: "none" }}
                                    >
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter First Name
                                        </h4>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Last Name*</label>
                                    <input
                                        type="name"
                                        id="last_name"
                                        placeholder="Enter Last Name..."
                                        autoComplete="true"
                                        value={lastName}
                                        onChange={(e) => updateLastName(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX" }}

                                    />
                                    <div
                                        class="LastName"
                                        style={{ margin: "0", display: "none" }}
                                    >
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Last Name
                                        </h4>
                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>

                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Preferred Name*</label>
                                    <input
                                        type="name"
                                        className="stud-prefered-name"
                                        id="preferred_name"
                                        placeholder="Enter Preferred Name..."
                                        autoComplete="true"
                                        value={preferredName}
                                        onChange={(e) => updatePreferredName(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX" }}

                                    />
                                    <div
                                        class="PreferredName"
                                        style={{ margin: "0", display: "none" }}
                                    >
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Preferred Name
                                        </h4>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Date Of Birth*</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        className="stud-dob"
                                        placeholder="Enter Date Of Birth..."
                                        value={dateOfBirth}
                                        onChange={(e) => updateDateOfBirth(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX" }}

                                    />
                                    <div
                                        class="Dob"
                                        style={{ margin: "0", display: "none" }}
                                    >
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Date of Birth
                                        </h4>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Gender*</label>
                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        onChange={(e) => updateGender(e.target.value)}
                                        id="gender_neww"
                                        style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid grey" }}>
                                        <option selected value={gender}>Select Gender</option>
                                        <option value="1">Female</option>
                                        <option value="2">Male</option>

                                    </select>

                                    <div
                                        class="Gender"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Gender
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Department*</label>
                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        onChange={(e) => updateDepartment(e.target.value)}
                                        id="department_neww"
                                        style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid grey" }}>
                            

                                        <option selected="selected" value={department}>Select Department</option>
                                        {departmentdata.map((dept, index) => {
                                            console.log("department_name", dept.department_name)
                                            // console.log("department data", departmentdata)
                                            return (
                                                <option value={dept.department_id} key={index} >
                                                    {dept.department_name}
                                                </option>
                                            );
                                        })}

                                    </select>
                                    <div
                                        class="Department"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Department
                                        </h4>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Add Class*</label>

                                    {/* <MultiSelect
                                        className="multi-select"
                                      // onChange={handleOnchange}
                                        onChange={handleDropdown}
                                        //onChange={(e) => {updateTeacherClass(e.target.value); handleOnchange}}
                                        placeholder="Select class"
                                        options={classes}
                                        style={{ width: "100%", padding: "0px", fontSize: "12px", color: "grey", borderRadius: "0" }}
                                    /> */}

                                    <Select isMulti
                                        options={classList}
                                        id="class_neww"
                                        //value={teacherClass}
                                        onChange={(item) => handleDropdown(item)}
                                        placeholder="Select class"
                                        style={{ width: "100%", padding: "0px", height: "10px", fontSize: "12px", color: "grey", borderRadius: "10", border: "1px solid grey" }}>

                                    </Select>
                                    <div
                                        class="ClassesList"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Classes
                                        </h4>
                                    </div>



                                    {/* <center>
                                        <b>The Selected Class Names: </b>
                                        <pre>{JSON.stringify(DisplayValue)}</pre>
                                    </center> */}

                                </div>

                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Add Subject*</label>
                                    {/* <MultiSelect
                                        className="multi-select"
                                        onChange={handleOnchange}
                                     //  onChange={(e) => {updateSubject(e.target.value); handleOnchange}}
                                        placeholder="Select Subject"
                                        options={subjects}
                                        style={{ width: "100%", padding: "0px", fontSize: "12px", color: "grey", borderRadius: "0" }}
                                    /> */}


                                    <Select isMulti options={subjectList}
                                        id="subject_neww"
                                        //value={subject}
                                        onChange={handleDropdownSubject}
                                        placeholder="Select Subject"
                                        style={{ width: "100%", padding: "0px", fontSize: "12px", color: "grey", borderRadius: "0" }}
                                    ></Select>

                                    <div
                                        class="Subjects"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Subjects
                                        </h4>
                                    </div>


                                    {/* <center>
                                        <b>The Selected subject Names: </b>
                                        <pre>{JSON.stringify(DisplaySubjectValue)}</pre>
                                    </center> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Mobile Number*</label>
                                    <input
                                        type="number"
                                        id="mobile_neww"
                                        placeholder="Enter Mobile Number..."
                                        autocomplete="true"
                                        value={mobile}
                                        onChange={(e) => updateMobile(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX" }}

                                    />

                                    <div
                                        class="Mobile"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Mobile Number
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Email Address*</label>
                                    <input
                                        type="email"
                                        id="email_neww"
                                        placeholder="Enter Email Address..."
                                        autoComplete="true"
                                        value={email}
                                        onChange={(e) => updateEmail(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX", marginLeft: "0px", marginBottom: "0px" }}

                                    />

                                    <div
                                        class="Email"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Enter Email Id
                                        </h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Spoken Language*</label>
                                    {/* <input
                                        type="name"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Spoken Language..."
                                        autocomplete="true"
                                        value={spokenLanguage}
                                        onChange={(e) => updateSpokenLanguage(e.target.value)}
                                        style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX" }}

                                    /> */}
                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        onChange={(e) => updateSpokenLanguage(e.target.value)}
                                        id="spokenn_language"
                                        style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid grey" }}>

                                        <option selected="selected" value={spokenLanguage}>Select Spoken Language</option>
                                        {languagedata.map((sp, index) => {
                                            console.log("spoken_language", sp.language)
                                            return (
                                                <option value={sp.language_id} key={index} >
                                                    {sp.language}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    <div
                                        class="SpokenLanguage"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Spoken Language
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Race/Ethnicity*</label>
                                   
                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        onChange={(e) => updateRace(e.target.value)}
                                        id="race_neww"
                                        style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid grey" }}>

                                        <option selected="selected" value={race}>Select Race</option>
                                        {racedata.map((rc, index) => {
                                            console.log("race_name", rc.race)
                                            return (
                                                <option value={rc.race_id} key={index} >
                                                    {rc.race}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    <div
                                        class="Race"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Race/ Ethinicity
                                        </h4>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-12">
                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Password*</label>
                                <input
                                    type="password"
                                    id="password_neww"
                                    placeholder="Enter Password..."
                                    value={password}
                                    onChange={(e) => updatePassword(e.target.value)}
                                    style={{ width: "100%", height: "30px", border: "1px solid grey", fontSize: "12px", paddingLeft: "5PX", marginLeft: "0" }}

                                />

                                <div
                                    class="Password"
                                    style={{ margin: "0", display: "none" }}>
                                    <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                        Please Enter Password
                                    </h4>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="mt-2 p-0">
                        <div class="row">
                            <div class="col-md-6">
                                <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold", marginTop: "0" }}>Add Image</label>
                                <div class="d-flex flex-row">
                                    <div class="">
                                        <div class="preview" style={{ borderRadius: "3PX", background: "#293043", padding: "5PX", width: "80px", height: "80%" }}>
                                            <img id="file-ip-1-preview" />
                                            < div class="gallery" style={{ borderRadius: "3PX" }} />
                                        </div>
                                    </div>

                                    <div className="img-label" style={{ width: "40%", marginLeft: "10px" }}>
                                        <div style={{ fontSize: "10px", marginTop: "2px", color: "grey" }}>
                                            Max. file size 2MB<br />
                                            <div className="d-flex">
                                                <div style={{ color: "black", fontSize: "10px", fontWeight: "BOLD" }}>Allowed file types</div>
                                                <div style={{ fontSize: "10px", marginLeft: "2px" }}>:jpg, jpgs,png,gif</div>
                                            </div>


                                        </div>
                                        <label className="img-button mt-1" for="file-ip-1" style={{ color: "#339dd8", fontWeight: "bold", fontSize: "12px", background: " #1F3977", color: "white", padding: "5px", borderRadius: "3px", }}>
                                            Select Image
                                        </label>
                                        <input type="file" style={{ visibility: "hidden" }} accept="image/*" name="photo" id="file-ip-1"
                                            onChange={getImage}
                                        />
                                        <div
                                            class="Image"
                                            style={{ margin: "0", display: "none" }}>
                                            <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                                Please Select Image
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Designation*</label>
                                    <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                                        onChange={(e) => updateDesignation(e.target.value)}
                                        id="designation_neww"
                                        style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid grey" }}>
                                        <option selected value={designation}>Select Designation</option>
                                        <option value="Assistant Professor">Assistant Professor</option>
                                        <option value="Associate Professor">Associate Professor</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Lab Assistant">Lab Assistant</option>
                                        <option value="Lecturer">Lecturer</option>
                                        <option value="librarian">librarian</option>
                                        <option value="Principal">Principal</option>
                                        <option value="Vice Principal">Vice Principal</option>

                                    </select>
                                    <div
                                        class="Designation"
                                        style={{ margin: "0", display: "none" }}>
                                        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                                            Please Select Designation 
                                        </h4>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* footer of student table */}

            <div className="" style={{ margin: "10px 20px 10px 20px", background: "white", padding: "10px", width: "80%" }}>
                {/* publish button */}
                <div className="d-flex form-buttons">
                    <input
                        type="button"
                        className="create_btn form-buttons1"
                        defaultValue="Sign Up"
                        value="Preview"
                        style={{ borderRadius: "5px", backgroundColor: "#293043", padding: "10px 30px", fontSize: "12PX", fontWeight: "bold" }}
                    />

                    <div class="ValueMsg" style={{ margin: "8px", width: "57%", display: "none" }}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">
                                Error! You Must Fill In All The Fields
                            </Alert>
                        </Stack>
                    </div>

                    <input
                        type="button"
                        className="create_btn form-buttons2"
                        defaultValue="Sign Up"
                        value="Save"
                        style={{ fontWeight: "bold", borderRadius: "5px", color: "#1F3977", marginLeft: "auto", backgroundColor: "white", padding: "10px 30px", fontSize: "12PX", border: "1px solid #1F3977", color: "#1F3977" }}
                    />
                    {/* <a href="/student"> */}
                    <input
                        type="button"
                        className="create_btn form-buttons3"
                        defaultValue="Sign Up"
                        value="Publish"
                        onClick={() => createTeacher()}
                        style={{ fontWeight: "bold", borderRadius: "5px", marginLeft: "5px", backgroundColor: "#1F3977", padding: "10px 30px", fontSize: "12PX" }}
                    />
                    {/* </a> */}
                </div>
            </div>
        </div >
    )
}
