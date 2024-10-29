import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Select from "react-select";
import { stepperClasses } from "@mui/material";
import { Link } from "react-router-dom";

export function TeacherForm() {
  $(document).ready(function() {
    $("#first_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
    $("#last_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });

    $("#preferred_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });

    $("#designation_neww").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
  });

  $(".close_event").click(function() {
    $(".user_type").hide();
  });
  function preview() {
    $(".preview_polls").show();
    // fetchSingleDepartment();
    // fetchSingleCourse();
    // fetchSingleClass();
    // fetchSingleSubject();
  }

  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  $(".close_event").click(function() {
    $(".preview_category").hide();
  });
  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
  }

  const token = localStorage.getItem("Token");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [preferredName, updatePreferredName] = useState("");
  const [dateOfBirth, updateDateOfBirth] = useState("");
  const [gender, updateGender] = useState("");
  const [genderName, updateGenderName] = useState("");
  const [studentClass, updateStudentClass] = useState("");
  const [department, updateDepartment] = useState("");
  const [departmentName, updateDepartmentName] = useState("");
  const [course, updateCourse] = useState("");
  const [courseName, updateCourseName] = useState("");
  const [teacherClass, updateTeacherClass] = useState("");
  const [subject, updateSubject] = useState("");
  const [mobile, updateMobile] = useState("");
  const [email, updateEmail] = useState("");
  const [spokenLanguage, updateSpokenLanguage] = useState("");
  const [spokenLanguageName, updateSpokenLanguageName] = useState("");
  const [raceId, updateRaceId] = useState("");
  const [password, updatePassword] = useState("");
  const [image, updateImage] = useState("");
  const [designation, updateDesignation] = useState("");
  const [departmentdata, setDepartmentData] = useState([]);
  const [errorCode, updateErrorCode] = useState("");
  const [raceData, setRaceData] = useState([]);
  const [raceName, updateRaceName] = useState("");
  const [languagedata, setLanguageData] = useState([]);
  const [classId, updateClassId] = useState([]);
  const [classList, setclassList] = useState([]);
  const [classdata, setClassData] = useState([]);
  const [stdClassName, updateStdClassName] = useState("");
  const [subjectList, setsubjectList] = useState([]);
  const [subjectId, updateSubjectId] = useState(""); /* changes "" to [] */
  const [subjectdata, setSubjectData] = useState([]);
  const [subjectName, updateSubjectName] = useState("");
  const [DisplayValue, getValue] = useState();
  const [DisplaySubjectValue, setDisplaySubjectValue] = useState([]);
  const [error_message, updateError_message] = useState("");
  const [class_arr, setclass_arr] = useState([]);
  const [data, setData] = useState([]);

  console.log("error_message", gender);
  async function fetchDepartmentList() {
    console.log("Access Token-", token);
    try {
      const fetchDepartmentResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_department_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Department List Details", fetchDepartmentResponse);

      const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
      console.log("Department Error Code ", DepartmentErrorCode);

      const DepartmentErrorMsg = fetchDepartmentResponse.data.message;
      console.log("Department Error msg ", DepartmentErrorMsg);

      if (DepartmentErrorCode == 200) {
        const departmentListArray = fetchDepartmentResponse.data.data;
        console.log("Department list Array", departmentListArray);
        setDepartmentData(departmentListArray);
      } else {
        setDepartmentData([]);

        console.log(fetchDepartmentResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }

      // if (fetchDepartmentResponse.data.error_code == 404) {
      //   alert("Invalid Token OR Non Authorized User");
      //   window.location.href = "/";
      // }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [courseData, updateCourseData] = useState([]);

  async function fetchDepartmentWiseCourseList(e) {
    console.log("get department id", e.target.value);
    updateDepartment(e.target.value);
    updateDepartmentName(e.target.options[e.target.selectedIndex].text);

    try {
      const formData = new FormData();
      formData.append("d_id", e.target.value);
      const fetchDepartmentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get Department List Details", fetchDepartmentResponse);
      updateErrorCode(fetchDepartmentResponse.data.error_code);
      if (fetchDepartmentResponse.data.error_code == 200) {
        updateCourseData(fetchDepartmentResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchRaceList() {
    console.log("Access Token-", token);
    try {
      const fetchRaceResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_race_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
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
      } else {
        setRaceData([]);

        console.log(fetchRaceResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchRaceList();
  }, []);

  async function fetchLanguageList() {
    console.log("Access Token-", token);
    try {
      const fetchLanguageResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_languages_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
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
      } else {
        setLanguageData([]);

        console.log(fetchLanguageResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchLanguageList();
  }, []);

  // async function fetchClassList() {
  //   console.log("Access Token-", token);
  //   try {
  //     const fetchClassResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_classes_list",
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',
  //           "Authorization": token,
  //         }
  //       }
  //     );
  //     console.log("Get Classes List Details", fetchClassResponse);
  //     const ClassErrorCode = fetchClassResponse.data.error_code;
  //     console.log("Class Error Code ", ClassErrorCode);
  //     const ClassErrorMsg = fetchClassResponse.data.message;
  //     console.log("class Error msg ", ClassErrorMsg);
  //     if (ClassErrorCode == 200) {
  //       const classListArray = fetchClassResponse.data.data;
  //       console.log("Class list Array", classListArray);
  //       setClassData(classListArray);

  //       classListArray.map(item => {
  //         console.log(item);
  //         let d = {
  //           "label": item.class_name,
  //           "value": item.class_id
  //         }
  //         console.log("d", d)
  //         class_arr.push(d)
  //         setclassList(class_arr);
  //         console.log("classListArray", classListArray)
  //       })
  //     }
  //     else {
  //       setClassData([]);
  //       console.log(fetchClassResponse.data.message);
  //       $(".alert-danger").show();
  //       setTimeout(function () {
  //         $(".alert-danger").hide();
  //       }, 3000);
  //     }
  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);
  //   }

  // }

  // useEffect(() => {
  //   fetchClassList();
  // }, []);

  async function fetchCourseWiseClassList(cource_id) {
    try {
      const formData = new FormData();
      formData.append("department_id", department);
      formData.append("cource_id", cource_id);
      const fetchClassResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "dept_by_get_classes_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get Class List Details", fetchClassResponse);

      const ClassErrorCode = fetchClassResponse.data.error_code;
      console.log("Class Error Code ", ClassErrorCode);

      if (ClassErrorCode === 200) {
        const classListArray = fetchClassResponse.data.data;
        console.log("Class list Array", classListArray);
        setClassData(classListArray);
      } else {
        setClassData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchSubjectList() {
    console.log("Access Token-", token);
    try {
      const fetchSubjectResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_subject_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
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

        subjectListArray.map((item) => {
          console.log(item);
          let d = {
            label: item.subject_name,
            value: item.subject_id,
          };
          console.log("d", d);
          subjectList.push(d);
          setsubjectList(subjectList);
          console.log("subjectListArray", subjectListArray);
        });
      } else {
        setSubjectData([]);
        console.log(fetchSubjectResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [subjectData, updateSubjectData] = useState([]);
  async function courseWiseSubjectList(e) {
    fetchCourseWiseClassList(e.target.value);
    updateCourse(e.target.value);
    updateCourseName(e.target.options[e.target.selectedIndex].text);
    const formDataPersona = new FormData();

    formDataPersona.append("d_id", department);
    formDataPersona.append("c_id", e.target.value);

    const responsePersona = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_coursewise_subject",
      formDataPersona,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("Coursewise subject list", responsePersona.data);
    if (responsePersona.data.error_code == 200) {
      updateSubjectData(responsePersona.data.data);
    }
  }
  useEffect(() => {
    fetchDepartmentList();
    // fetchClassList();
    fetchSubjectList();
  }, []);

  const handleDropdown = (cls) => {
    console.log("cls values", cls);
    let sel_class = [];
    // [{"subject_id":"1"},{"subject_id":"2"}]
    // subject_arr=[];
    cls.map((item) => {
      console.log(item);
      let class_id = {
        class_id: item.value,
      };
      sel_class.push(class_id);
    });
    updateTeacherClass(sel_class);
  };

  const handleDropdownSubject = (sub) => {
    console.log("sub values", sub);
    let sel_subject = [];
    sub.map((item) => {
      console.log(item);
      let subject_id = {
        subject_id: item.value,
      };
      console.log(
        "subject_iddddddddddddddddddddddddddddddd",
        subject_id.subject_id
      );
      sel_subject.push(subject_id);
      updateSubjectId(subject_id.subject_id);
    });
    updateSubject(sel_subject);
  };

  var obj = [
    {
      class_id: classId,
    },
  ];
  const [errorMessage, setErrorMessage] = useState("");
  async function createTeacher() {
    let sub_arr = [];

    DisplaySubjectValue.map((sub) => {
      console.log(sub);
      let subject = {
        subject_name: sub,
      };

      sub_arr.push(subject);
    });

    console.log("pallavi", JSON.stringify(sub_arr));
    console.log("DisplaySubjectValue =>", DisplaySubjectValue);

    try {
      const firstt_name = document.getElementById("first_name");
      const lastt_name = document.getElementById("last_name");
      const department_new = document.getElementById("department_neww");
      const course_new = document.getElementById("course_neww");
      const student_class = document.getElementById("student_class");
      const subject_new = document.getElementById("student_subject");
      const email_new = document.getElementById("email_neww");
      const mobile_new = document.getElementById("mobile_neww");
      const password_new = document.getElementById("password_neww");

      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (
        firstt_name.value == "" &&
        lastt_name.value == "" &&
        department_new.value == "" &&
        course_new.value == "" &&
        student_class.value == "" &&
        subject_new.value == "" &&
        email_new.value == "" &&
        mobile_new.value == "" &&
        password_new.value == ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (firstt_name.value == "") {
        $(".FirstName").show();

        setTimeout(function() {
          $(".FirstName").hide();
        }, 3000);
      } else if (lastt_name.value == "") {
        $(".LastName").show();

        setTimeout(function() {
          $(".LastName").hide();
        }, 3000);
      } else if (department_new.value == "") {
        $(".Department").show();

        setTimeout(function() {
          $(".Department").hide();
        }, 3000);
      } else if (course_new.value == "") {
        $(".neww_class").show();

        setTimeout(function() {
          $(".neww_class").hide();
        }, 3000);
      } else if (student_class.value == "") {
        $(".StudentClass").show();

        setTimeout(function() {
          $(".StudentClass").hide();
        }, 3000);
      } else if (subject_new.value == "") {
        $(".std_subject").show();

        setTimeout(function() {
          $(".std_subject").hide();
        }, 3000);
      } else if (email_new.value == "") {
        $(".std_email").show();

        setTimeout(function() {
          $(".std_email").hide();
        }, 3000);
      } else if (!filter.test(email_new.value)) {
        $(".validEmail").show();

        setTimeout(function() {
          $(".validEmail").hide();
        }, 5000);
        return;
      } else if (mobile_new.value == "") {
        $(".Mobile").show();

        setTimeout(function() {
          $(".Mobile").hide();
        }, 3000);
      } else if (mobile_new.value.length != 10) {
        $(".tenDigitMobileNumber").show();

        setTimeout(function() {
          $(".tenDigitMobileNumber").hide();
        }, 5000);
      } else if (password_new.value == "") {
        $(".pass").show();

        setTimeout(function() {
          $(".pass").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("preffered_name", preferredName);
        formData.append("dob", dateOfBirth);
        formData.append("gender", gender);
        formData.append("spoken_language", spokenLanguage);
        formData.append("email", email);
        formData.append("race", raceId);
        formData.append("department_id", department);
        formData.append("image", image);
        // formData.append("class", JSON.stringify(obj));  stringyfy not required
        formData.append("class", classId);
        // formData.append("subjects", JSON.stringify(subject));  stringyfy not required
        formData.append("subjects", subject);
        formData.append("password", password);
        formData.append("mobile", mobile);
        formData.append("designation", designation);
        formData.append("course_id", course);
        for (const pair of formData.entries()) {
          console.log("Form Data===", pair[0], pair[1]);
        }

        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "add_teacher",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        console.log("Create Teacher", response);
        updateError_message(response.data.message);
        setData(response.data);

        $(".formSuccess").show();

        setTimeout(function() {
          $(".formSuccess").hide();
        }, 5000);

        window.location.href = "/teachers";
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function all_student() {
    $(".user_type").hide();
  }

  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
    updateMobile(onlyDigits);
  };

  const [stdProfile, updateStdProfile] = useState("");
  console.log("stdProfile", stdProfile);
  const getImage = (e) => {
    $(".default_image").hide();
    updateImage(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
      updateStdProfile(src);
    }
    $(".image_std").hide();
  };

  function hide_date() {
    $(".show_date").hide();
  }
  function show_date() {
    $(".show_date").show();
  }
  function closePreview() {
    $(".preview_polls").hide();
  }

  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
  }
  function closeEditPreview() {
    $(".preview_category").hide();
    $(".preview_polls").show();
  }
  function closePreview() {
    $(".preview_polls").hide();
  }
  function fetchGender(e) {
    updateGender(e.target.value);
    updateGenderName(e.target.options[e.target.selectedIndex].text);
  }
  function fetchClass(e) {
    updateClassId(e.target.value);
    updateStdClassName(e.target.options[e.target.selectedIndex].text);
  }
  function fetchSubject(e) {
    updateSubject(e.target.value);
    // updateSubjectId(e.target.value) diffrent state variable updated
    updateSubjectName(e.target.options[e.target.selectedIndex].text);
  }
  function fetchSpokenLangugae(e) {
    updateSpokenLanguage(e.target.value);
    updateSpokenLanguageName(e.target.options[e.target.selectedIndex].text);
  }
  function fetchRace(e) {
    updateRaceId(e.target.value);
    updateRaceName(e.target.options[e.target.selectedIndex].text);
  }
  function resetValues() {
    updateFirstName("");
    updateLastName("");
    updatePreferredName("");
    $("#gender_neww option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateGenderName("");
    updateDateOfBirth("");
    updateDesignation("");

    $("#department_neww option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateDepartmentName("");

    $("#course_neww option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateCourseName("");

    $("#student_class option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateStdClassName("");

    $("#student_subject option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateSubjectName("");
    updateEmail("");
    updateMobile("");

    $("#spokenn_language option").prop("selected", function() {
      return this.defaultSelected;
    });

    updateSpokenLanguageName("");
    $("#race_neww option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateRaceName("");
    updatePassword("");
    updateStdProfile("");
    $("#file-ip-1-preview").hide();
    $(".image_std").show();
  }
  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
      <div className="border_class2 box_padding">
        <h1 className="main_heading_h1">CREATE TEACHER</h1>
      </div>

      <div>
        <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-8 p-0">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
              >
                <div className="row d-flex">
                  {/* first name */}
                  <div className="col-md-6">
                    <div className="d-flex">
                      <label className="all_labels">First Name</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      className="all_inputs"
                      type="name"
                      id="first_name"
                      value={firstName}
                      onChange={(e) => updateFirstName(e.target.value)}
                      placeholder="Your First Name..."
                      autoComplete="true"
                    />

                    <div class="FirstName" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter First Name
                      </h4>
                    </div>
                  </div>

                  {/* last name */}
                  <div className="col-md-6">
                    <div className="left_padding">
                      <div className="d-flex">
                        <label className="all_labels">Last Name</label>

                        <p className="all_stars">*</p>
                      </div>

                      <input
                        className="all_inputs"
                        type="name"
                        id="last_name"
                        value={lastName}
                        onChange={(e) => updateLastName(e.target.value)}
                        placeholder="Your Last Name..."
                        autoComplete="true"
                      />
                      <div class="LastName" style={{ display: "none" }}>
                        <h4 class="login-text all_validations_h4">
                          Please Enter Last Name
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* preffered name */}
                <div className="mt-2 row d-flex">
                  <div className="col-md-6">
                    <label className="all_labels">Preffered Name</label>

                    <input
                      className="all_inputs"
                      type="name"
                      id="preferred_name"
                      value={preferredName}
                      onChange={(e) => updatePreferredName(e.target.value)}
                      placeholder="Your Preferred Name..."
                      autoComplete="true"
                    />
                    <div class="PreferredName" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Preferred Name
                      </h4>
                    </div>
                  </div>

                  {/* last name */}
                  <div className="col-md-6">
                    <div className="left_padding">
                      <label className="all_labels">Gender</label>
                      <select
                        className="form-select form-select-sm all_inputs"
                        aria-label=".form-select-sm example"
                        id="gender_neww"
                        onChange={fetchGender}
                      >
                        <option selected value={gender}>
                          Select Gender
                        </option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>

                      <div class="Gender" style={{ display: "none" }}>
                        <h4 class="login-text all_validations_h4">
                          Please Select Gender
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 row d-flex">
                  {/* first name */}
                  <div className="col-md-6">
                    <label className="all_labels">Date Of Birth</label>

                    <input
                      type="date"
                      className="all_inputs"
                      placeholder="dd-mm-yyyy"
                      id="dob"
                      value={dateOfBirth}
                      onChange={(e) => updateDateOfBirth(e.target.value)}
                      required
                      name="birthdaytime"
                    />


                    <div class="Dob" style={{ display: "none" }}>
                      <h4 class="login-text all_validations_h4">
                        Please Enter Date of Birth
                      </h4>
                    </div>
                  </div>

                  {/* last name */}
                  <div className="col-md-6">
                    <div className="left_padding">
                      <label className="all_labels">Designation</label>

                      <input
                        className="all_inputs"
                        type="name"
                        id="designation_neww"
                        value={designation}
                        onChange={(e) => updateDesignation(e.target.value)}
                        placeholder="Enter Designation..."
                        autoComplete="true"
                      />

                      <div class="Designation" style={{ display: "none" }}>
                        <h4 class="login-text all_validations_h4">
                          Please Select Designation
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Teacher's Profile</label>
                </div>

                <label
                  for="file-ip-1"
                  class="file-ip-1 x"
                  style={{ height: "180px" }}
                >
                  <img
                    class="default_image "
                    src="dist/img/event_photo.png"
                    id="comp_logo"
                  />

                  <img
                    id="file-ip-1-preview"
                    style={{ display: "none", height: "170px" }}
                  />
                </label>
                <input
                  type="file"
                  name="photo"
                  style={{ visibility: "hidden" }}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={getImage}
                  multiple
                  id="file-ip-1"
                />

                <div class="Image" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Image
                  </h4>
                </div>

                {/* </img> */}
              </div>
            </div>
          </div>
        </div>

        <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-4">
              <div className="" style={{ width: "100%" }}>
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Department</label>

                    <p className="all_stars">*</p>
                  </div>

                  <select
                    className="form-select form-select-sm all_inputs"
                    aria-label=".form-select-sm example"
                    id="department_neww"
                    onChange={fetchDepartmentWiseCourseList}
                  >
                    <option selected="selected" value={department}>
                      Select Department
                    </option>

                    {departmentdata.length > 0 ? (
                      departmentdata.map((dept, index) => {
                        return (
                          <option value={dept.department_id} key={index}>
                            {dept.department_name}
                          </option>
                        );
                      })
                    ) : (
                      <div>Data Not Found</div>
                    )}
                  </select>

                  <div class="Department" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Department
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Course</label>

                    <p className="all_stars">*</p>
                  </div>

                  <select
                    className="form-select form-select-sm all_inputs"
                    aria-label=".form-select-sm example"
                    id="course_neww"
                    onChange={courseWiseSubjectList}
                  >
                    <option selected="selected" value={course}>
                      Select Course
                    </option>

                    {courseData.length > 0 ? (
                      courseData.map((dept, index) => {
                        return (
                          <option value={dept.course_id} key={index}>
                            {dept.course_name}
                          </option>
                        );
                      })
                    ) : (
                      <div>Data Not Found</div>
                    )}
                  </select>

                  <div class="neww_class" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Course
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Class</label>

                  <p className="all_stars">*</p>
                </div>

                <select
                  className="form-select form-select-sm all_inputs"
                  aria-label=".form-select-sm example"
                  id="student_class"
                  onChange={fetchClass}
                >
                  <option selected="selected" value={teacherClass}>
                    Select Class
                  </option>

                  {classdata.length > 0 ? (
                    classdata.map((item, index) => {
                      return (
                        <option
                          value={item.class_id}
                          key={index}
                          style={{
                            color: "#000000",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "14px",
                            lineHeight: "21px",
                          }}
                        >
                          {item.class_name}
                        </option>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}
                </select>

                <div class="StudentClass" style={{ display: "none" }}>
                  <h4 class="login-text" className="all_validations_h4">
                    Please Select Class
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-4">
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
                <div className="d-flex">
                  <label className="all_labels">Subject</label>
                  <p className="all_stars">*</p>
                </div>
                <select
                  className="form-select form-select-sm all_inputs"
                  aria-label=".form-select-sm example"
                  id="student_subject"
                  onChange={fetchSubject}
                >
                  <option selected="selected" value={subject}>
                    Select Subject
                  </option>

                  {subjectData.map((item, index) => {
                    //console.log("Id", item.class)
                    return (
                      <option value={item.subject_id} key={index}>
                        {item.subject_name}
                      </option>
                    );
                  })}
                </select>

                <div class="std_subject" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Subject
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Email</label>

                  <p className="all_stars">*</p>
                </div>

                <input
                  type="email"
                  className="all_inputs"
                  placeholder="Enter Email"
                  id="email_neww"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  name="birthdaytime"
                />
                <div class="std_email" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter Email Id
                  </h4>
                </div>
                <div class="validEmail" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter valid Email Address with @
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Mobile Number</label>

                  <p className="all_stars">*</p>
                </div>

                <input
                  type="text"
                  className="all_inputs"
                  maxLength="10"
                  placeholder="Enter Mobile Number"
                  id="mobile_neww"
                  value={mobile}
                  minLength="10"
                  pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  onChange={(e) => checkInput(e)}
                  name="birthdaytime"
                />

                <div class="Mobile" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter Mobile Number
                  </h4>
                </div>
                <div class="tenDigitMobileNumber" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter 10 digit mobile number
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-4">
              <div className="" style={{ width: "100%" }}>
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Spoken Language</label>
                  </div>

                  <select
                    className="form-select form-select-sm all_inputs"
                    aria-label=".form-select-sm example"
                    id="spokenn_language"
                    onChange={fetchSpokenLangugae}
                  >
                    <option selected="selected" value={spokenLanguage}>
                      Select Spoken Language
                    </option>

                    {languagedata.length > 0 ? (
                      languagedata.map((lang, index) => {
                        return (
                          <option value={lang.language_id} key={index}>
                            {lang.language}
                          </option>
                        );
                      })
                    ) : (
                      <div>Data Not Found</div>
                    )}
                  </select>

                  <div class="SpokenLanguage" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Spoken Language
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Race Ethnicity</label>
                </div>
                <select
                  className="form-select form-select-sm all_inputs"
                  aria-label=".form-select-sm example"
                  id="race_neww"
                  onChange={fetchRace}
                >
                  <option selected value={raceId}>
                    Select Race/Ethnicity
                  </option>
                  <option value="1">White</option>
                  <option value="2">Black</option>
                  <option value="3">Asian</option>
                  <option value="4">American Indian</option>
                </select>

                <div class="Race" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Race/ Ethinicity
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div className="left_padding">
                <div className="d-flex">
                  <label className="all_labels">Password</label>

                  <p className="all_stars">*</p>
                </div>

                <input
                  type="password"
                  className="all_inputs"
                  placeholder="Enter Password"
                  id="password_neww"
                  value={password}
                  onChange={(e) => updatePassword(e.target.value)}
                  name="birthdaytime"
                />
                <div class="pass" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter Password
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div
          className="d-flex border_class2 box_padding buttons_div">
          <div
            class="ValueMsg"
            style={{ margin: "8px", width: "57%", display: "none" }}
          >
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>
          <div
            class="formSuccess success_msg">
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="success">
                {error_message}
              </Alert>
            </Stack>
          </div>
          <img  className="delete_img"
            src="dist/img/delete.png"
            alt="dropdown"
            
            onClick={() => resetValues()}
            
          />
          <p
            className="news_bar"
           
          >
            |
          </p>
          <button className="preview_button " onClick={() => preview()}>
            <p className="preview_font">
              Preview
            </p>
             <div className="preview_img_div">
             <img className="preview_img"
              src="dist/img/view.png"
              alt="dropdown"
              
            />
             </div>
          </button>

          
          <input
            type="button"
            className="publish_button"
            defaultValue="Sign Up"
            onClick={() => createTeacher()}
            value="Publish"

           
          />
         
        </div>
      </div>

      {/* PREVIEW */}
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
            <label
              style={{ color: "black", fontSize: "13px", fontWeight: "600" }}
            >
              Preview
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closePreview()}
              className="close_event ml-auto"
              style={{ cursor: "pointer", height: "20px", width: "20px" }}
            />
          </div>

          <div
            style={{
              background: "white",
              marginTop: "10PX",
              padding: "5px 10PX 0px 10px",
              border: "none",
            }}
          >
            <div className="d-flex" style={{ padding: "7px 0px 4px  0" }}>
              <h4
                style={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "12PX",
                  fontWeight: "600",
                }}
              >
                Teacher
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
              <div
                className="preview_form"
                style={{
                  height: "600px",
                  overflowY: "auto",
                  padding: "0 10px 50px 0px",
                }}
              >
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
                    Teacher's Profile
                  </p>
                  <p
                    className="col-md-9 d-flex"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    :{" "}
                    <span style={{ marginLeft: "10px" }}>
                      <img
                        src={stdProfile}
                        style={{ width: "60px", height: "60px" }}
                      />
                      {/* {stdProfile == "" ?
                        (<div>

                  <img className="image_std" src="dist/img/event_photo.png" alt="dropdown" style={{ height: "60px",width:"60px" }} />

                        </div>):(
                          <div>
                             <img src={stdProfile} style={{width:'60px',height:"60px"}}/>
                          </div> 
                         )} */}
                    </span>
                  </p>
                </div>

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
                    First Name
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{firstName}</span>
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
                    Last Name
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{lastName}</span>{" "}
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
                    Preffered Name
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    :{" "}
                    <span style={{ marginLeft: "10px" }}>{preferredName}</span>{" "}
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
                    Gender
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{genderName}</span>{" "}
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
                    Date Of Birth
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{dateOfBirth}</span>{" "}
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
                    Designation
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{designation} </span>{" "}
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
                    Department
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    :{" "}
                    <span style={{ marginLeft: "10px" }}>{departmentName}</span>{" "}
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
                    Course
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{courseName}</span>{" "}
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
                    Class
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{stdClassName}</span>{" "}
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
                    Subject
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{subjectName}</span>{" "}
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
                    Email
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{email}</span>{" "}
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
                    Mobile Number
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{mobile}</span>{" "}
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
                    Spoken Language
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    :{" "}
                    <span style={{ marginLeft: "10px" }}>
                      {spokenLanguageName}
                    </span>{" "}
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
                    Race/Ethnicity
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{raceName}</span>{" "}
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
                    Password
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{password}</span>{" "}
                  </p>
                </div>
              </div>
            }
          </div>
          {/* )} */}
        </div>
      </div>

      {/* **********************************************edit category************************************* */}
      <div
        className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">
              Teacher
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closeEditPreview()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
              
            />
          </div>
          {/* category & question */}
          <div
            className="preview_form">
            {/* first name */}
            <div className="border_class2 edit_row_padding2">
            <div className="p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        First Name
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="name"
                      className="all_inputs"
                      autoComplete="true"
                      value={firstName}
                      onChange={(e) => updateFirstName(e.target.value)}
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* last name */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Last Name
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="name"
                      className="all_inputs"
                      autoComplete="true"
                      value={lastName}
                      onChange={(e) => updateLastName(e.target.value)}
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* preffered name */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Preffered Name
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="name"
                      className="all_inputs"
                      autoComplete="true"
                      value={preferredName}
                      onChange={(e) => updatePreferredName(e.target.value)}
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* gender */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Gender
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="gender"
                      onChange={(e) => updateGender(e.target.value)}
                     
                    >
                      <option selected value={gender}>
                        {genderName}
                      </option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* photo */}
            <div className="border_class2 edit_row_padding2">
            <div className=" p-0">
              <div class="row">
                {/* <div class="col-md-4" style={{ padding: "0 50px 0px 10px" }}>
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
                <div className="d-flex">

                  <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold", marginLeft: "10PX" }}>Student's Profile</label>
                </div>
                <label for="file-ip-1" >
                  
                  <img className="image_std" src={stdProfile} alt="dropdown" style={{ height: "150px" }} />
                  <img id="file-ip-1-preview" style={{ height: "150px", position: "absolute", top: "33px", left: "50px" }} />
                </label>

                <input type="file" name="photo"
                  style={{ visibility: "hidden" }}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={getImage}
                  id="file-ip-1" />
             

           
  
              </div>
            </div> */}

                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Student Photo
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <label for="upload-photo">
                      <img
                        src={stdProfile}
                        alt="dropdown"
                        style={{ height: "80px" ,width:"120px"}}
                      />
                      <img
                        id="file-ip-1-preview"
                        style={{
                          display:"none",
                          height: "80px",
                          width:"120px"
                        }}
                      />
                    </label>

                    <input
                      type="file"
                      name="photo"
                      style={{ visibility: "hidden" }}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={getImage}
                      id="upload-photo"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* dob */}
            <div className="mt-0 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="d-flex">
                    <label className="all_labels">
                      Date Of Birth
                    </label>

                    <p className="all_stars">
                      *
                    </p>
                  </div>

                 
                  <input className="all_inputs"
                    type="date"
                    id="editDob"
                    required
                    value={dateOfBirth}
                    onChnage={() => updateDateOfBirth()}
                    
                  />

                  
                </div>
              </div>
            </div>
            </div>

            {/* designation */}
            <div className="border_class2 edit_row_padding2">
            <div className=" p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Designation
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="name"
                      className="all_inputs"
                      autoComplete="true"
                      value={designation}
                      onChange={(e) => updateDesignation(e.target.value)}
                      
                    />

                   
                  </div>
                </div>
              </div>
            </div>

            {/* department */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Department
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="department"
                      onChange={(e) => updateDepartment(e.target.value)}
                      
                    >
                      <option selected="selected" value={department}>
                        {departmentName}
                      </option>
                      {departmentdata.map((dept, index) => {
                        return (
                          <option value={dept.department_id} key={index}>
                            {dept.department_name}
                          </option>
                        );
                      })}
                    </select>

                    <div
                      class="Department"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Select Department
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* course */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels"
                      >
                        Course
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="student_course"
                      onChange={(e) => updateCourse(e.target.value)}
                     
                    >
                      <option selected="selected" value={course}>
                        {courseName}
                      </option>
                      {errorCode == 404 ? (
                        <div>
                          <option>NO DATA</option>
                        </div>
                      ) : (
                        <div>
                          {courseData.map((item, index) => {
                            //console.log("Id", item.class)
                            return (
                              <option value={item.course_id} key={index}>
                                {item.course_name}
                              </option>
                            );
                          })}
                        </div>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* class */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels"
                      >
                        Class
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="class"
                      onChange={(e) => updateStudentClass(e.target.value)}
                     
                    >
                      <option selected="selected" value={stdClassName}>
                        {stdClassName}
                      </option>
                      <option value="1">First Year</option>
                      <option value="2"> Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Fourth Year</option>
                      <option value="5">Fifth Year</option>
                      <option value="6">Sixth Year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* subject */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Subject
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="student_course"
                      onChange={(e) => updateSubjectId(e.target.value)}
                     
                    >
                      <option selected="selected" value={subjectName}>
                        {subjectName}
                      </option>
                      {errorCode == 404 ? (
                        <div>
                          <option>NO DATA</option>
                        </div>
                      ) : (
                        <div>
                          {subjectData.map((item, index) => {
                            //console.log("Id", item.class)
                            return (
                              <option value={item.subject_id} key={index}>
                                {item.subject_name}
                              </option>
                            );
                          })}
                        </div>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* email */}
            <div className="border_class2 edit_row_padding2">
            <div className=" p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Email
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="email"
                      id="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                      className="all_inputs"
                      autoComplete="true"
                      value={email}
                      onChange={(e) => updateEmail(e.target.value)}
                      
                    />

                    <div class="Email" style={{ margin: "0", display: "none" }}>
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter Email Address
                      </h4>
                    </div>

                    <div
                      class="validEmail"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter valid Email Address with @
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile number */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Mobile Number
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input  className="all_inputs"
                      type="text"
                      // placeholder="Enter Mobile Number"
                      id="mobile_new"
                      autoComplete="true"
                      minLength="10"
                      required
                      maxlength="10"
                      pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                      value={mobile}
                      onChange={(e) => checkInput(e)}
                      
                    />

                    <div
                      class="Mobile"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter Mobile Number
                      </h4>
                    </div>

                    <div
                      class="tenDigitMobileNumber"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter 10 digit mobile number
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* spoken language */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Spoken Language
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="first_language"
                      onChange={(e) => updateSpokenLanguage(e.target.value)}
                     
                    >
                      <option selected="selected" value={spokenLanguageName}>
                        {spokenLanguageName}
                      </option>
                      {languagedata.map((lang, index) => {
                        //  console.log("Id", language.country)
                        return (
                          <option value={lang.language_id} key={index}>
                            {lang.language}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* race */}
            <div className="border_class2 edit_row_padding2">
            <div className=" p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Race/Ethnicity
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm all_inputs"
                      aria-label=".form-select-sm example"
                      id="race"
                      onChange={(e) => updateRaceId(e.target.value)}
                     
                    >
                      <option selected="selected" value={raceName}>
                        {raceName}
                      </option>
                      {raceData.map((item, index) => {
                        return (
                          <option value={item.race_id} key={index}>
                            {item.race}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* password */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">
                        Password
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>
                    <input
                      type="name"
                      id="password_neww"
                      className="all_inputs"
                      autoComplete="true"
                      value={password}
                      onChange={(e) => updatePassword(e.target.value)}
                      
                    />

                    <div class="pass" style={{ margin: "0", display: "none" }}>
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Enter Password
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* ******************button********************** */}
            <div
              className="d-flex form-buttons mt-2  edit_buttons_div border_class2"
              style={{justifyContent:"end"}}
            >
              {/* <img src="dist/img/delete.png" alt="dropdown" style={{width:"33px", height:"33px",marginTop:"5px"}} className="ml-auto" /> */}
              {/* <img src="dist/img/view.png" alt="dropdown" style={{width:"33px", height:"33px",marginLeft:"8PX",marginTop:"5px"}} /> */}
              <input
                type="button"
                className=" form-buttons3 edit_cancel_button"
                defaultValue="Next Step"
                onClick={() => closeEditPreview()}
                value="Cancel"
                
              />

              <input
                type="button"
                className=" form-buttons3 edit_update_button"
                defaultValue="Next Step"
                onClick={() => closeEditPreview()}
                value="Save"
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
