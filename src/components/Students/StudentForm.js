import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function StudentForm() {
  const token = localStorage.getItem("Token");
  const history = useHistory();

  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [dateOfBirth, updateDateOfBirth] = useState("");
  const [gender, updateGender] = useState("");
  const [email, updateEmail] = useState("");
  const [mobile, updateMobile] = useState("");
  const [classdata, setClassData] = useState([]);

  const [stdClassName, updateStdClassName] = useState("");
  const [studentStatus, setStudentStatus] = useState("");
  const [freezeStatus, setFreezeStatus] = useState("");
  const [address, updateAddress] = useState("");
  const [persona, updatePersona] = useState("");
  const [genderName, updateGenderName] = useState("");
  const [studentClass, updateStudentClass] = useState("");
  const [image, updateImage] = useState("");
  const [personaValue, updatePersonaValue] = useState("");

  const [personadata, setPersonaData] = useState([]);
  const [data, setData] = useState([]);
  const [error_message, updateError_message] = useState("");

  const [errorCode, updateErrorCode] = useState("");
  const [personaName, updatePersonaName] = useState("");

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

    $("#parent_name").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });

    $("#blood_type").keypress(function(e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
  });

  function cancelPersona() {
    $(".modaloverlay").hide();
  }

  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
    updateMobile(onlyDigits);
  };

  function closeEditPreview() {
    $(".preview_category").hide();
    $(".preview_polls").show();
  }
  function closePreview() {
    $(".preview_polls").hide();
  }

  useEffect(() => {
    fetchClassList();
    fetchPersonaList();
  }, []);

  async function fetchClassList() {
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_classes_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      setClassData(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [personaErrorMessage, updatePersonaErrorMessage] = useState("");
  async function createPersona() {
    try {
      const formDataPersona = new FormData();

      formDataPersona.append("persona", personaValue);

      const responsePersona = await axios.post(
        process.env.REACT_APP_API_KEY + "add_persona",
        formDataPersona,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      updatePersonaErrorMessage(responsePersona.data.message);
      if (responsePersona.data.error_code == 200) {
        setData([responsePersona.data]);
        fetchPersonaList();
        $(".modaloverlay").hide();
        // window.location.href="./addStudent"
      }

      updatePersonaValue("");
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchPersonaList() {
    const token = localStorage.getItem("Token");

    try {
      const fetchPersonaResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_persona_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      const PersonaErrorCode = fetchPersonaResponse.data.error_code;
      const PersonaErrorMsg = fetchPersonaResponse.data.message;
      if (PersonaErrorCode == 200) {
        const personaListArray = fetchPersonaResponse.data.data;
        setPersonaData(personaListArray);
      } else {
        setPersonaData([]);

        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function createStudent() {
    try {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (
        firstName == "" &&
        lastName == "" &&
        persona == "" &&
        gender == "" &&
        mobile == "" &&
        studentClass == "" &&
        email == ""
      ) {
        toast.error("Fill the required fields", {
          duration: 2000,
        });
        return;
      } else if (firstName == "") {
        $(".first_name").show();

        setTimeout(function() {
          $(".first_name").hide();
        }, 3000);
      } else if (lastName == "") {
        $(".last_name").show();

        setTimeout(function() {
          $(".last_name").hide();
        }, 3000);
      } else if (gender == "") {
        $(".std_gender").show();

        setTimeout(function() {
          $(".std_gender").hide();
        }, 3000);
      } else if (email == "") {
        $(".std_email").show();

        setTimeout(function() {
          $(".std_email").hide();
        }, 3000);
      } else if (!filter.test(email)) {
        $(".validEmail").show();

        setTimeout(function() {
          $(".validEmail").hide();
        }, 3000);
        return;
      } else if (mobile == "") {
        $(".std_mobile").show();

        setTimeout(function() {
          $(".std_mobile").hide();
        }, 3000);
      } else if (mobile.length != 10) {
        $(".validMobileNumber").show();

        setTimeout(function() {
          $(".validMobileNumber").hide();
        }, 3000);
      } else if (studentClass == "") {
        $(".std_class").show();

        setTimeout(function() {
          $(".std_class").hide();
        }, 3000);
      } else if (persona == "") {
        $(".std_persona").show();

        setTimeout(function() {
          $(".std_persona").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("first_name", firstName);
        formData.append("surname", lastName);
        formData.append("persona", persona);
        formData.append("gender", gender);
        formData.append("phone_no", mobile);
        formData.append("email", email);
        // formData.append("address", address);
        // formData.append("status",studentStatus);
        // formData.append("acc_freeze", freezeStatus);
        formData.append("dob", dateOfBirth);
        formData.append("class_id", studentClass);
        // for (var i = 0; i < image.length; i++) {
        //   formData.append("prof_photo[]", image[i]);
        // }
        // for (const pair of formData.entries()) {
        //   console.log(`formData-----------${pair[0]},${pair[1]}`);
        // }
        const studentResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "create_student",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        // console.log("Create Student response-----------", student/Response);
        if (studentResponse.data.error_code == 200) {
          toast.success(studentResponse.data.message);
          setTimeout(function() {
            history.push("/student");
          }, 3000);
        } else {
          toast.error(studentResponse.data.message);
        }
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  function fetchClass(e) {
    updateStudentClass(e.target.value);
    updateStdClassName(e.target.options[e.target.selectedIndex].text);
  }

  function fetchGender(e) {
    updateGender(e.target.value);
    updateGenderName(e.target.options[e.target.selectedIndex].text);
  }

  const [stdProfile, updateStdProfile] = useState();
  // var s_img = [];
  // const getImage = (e) => {
  //   $(".image_std").hide();
  //   for (let i = 0; i < e.target.files.length; i++) {
  //   s_img.push(e.target.files[i]);
  //   updateImage(s_img)
  //   if (e.target.files.length > 0) {
  //     var src = URL.createObjectURL(e.target.files[0]);
  //     var preview = document.getElementById("file-ip-1-preview");
  //     preview.src = src;
  //     preview.style.display = "block";
  //     updateStdProfile(src);
  //   }
  //   }
  // };

  function resetValue() {
    updateFirstName("");
    updateLastName("");

    $("#gender option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateGenderName("");
    updateDateOfBirth("");
    updatePersonaName("");
    updateAddress("");

    $("#student_class option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateStdClassName("");
    updateEmail("");
    updateMobile("");
    updateStdProfile("");
    $("#file-ip-1-preview").hide();
    $(".image_std").show();
  }

  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
  }

  const preview = () => {
    $(".preview_polls").show();
  };

  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="border_class2 box_padding">
        <h1 className="main_heading_h1">Create Student</h1>
      </div>

      <div class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <form>
        <div className="create_form">
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
                        pattern="[A-Za-z]"
                        onChange={(e) => updateFirstName(e.target.value)}
                        placeholder="Enter Your First Name"
                        autoComplete="off"
                      />

                      <div
                        class="first_name"
                        style={{ margin: "0", display: "none" }}
                      >
                        <h4 class="login-text all_validations_h4">
                          Please Enter First Name
                        </h4>
                      </div>
                    </div>

                    {/* last name */}
                    <div className="col-md-6">
                      <div className="left_padding">
                        <div className="d-flex ">
                          <label className="all_labels">Last Name</label>

                          <p className="all_stars">*</p>
                        </div>

                        <input
                          className="all_inputs"
                          type="name"
                          id="last_name"
                          value={lastName}
                          onChange={(e) => updateLastName(e.target.value)}
                          placeholder="Enter Your Last Name"
                          autoComplete="off"
                        />

                        <div
                          class="last_name"
                          style={{ margin: "0", display: "none" }}
                        >
                          <h4 class="login-text all_validations_h4">
                            Please Enter Last Name
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 row d-flex">
                    {/* DOB */}
                    <div className="col-md-6">
                      <div className="d-flex">
                        <label className="all_labels">Date Of Birth</label>
                        <p className="all_stars">*</p>
                      </div>
                      <input
                        type="date"
                        className="all_inputs"
                        placeholder="dd-mm-yyyy"
                        id="dob"
                        value={dateOfBirth}
                        onChange={(e) => updateDateOfBirth(e.target.value)}
                      />
                    </div>

                    {/* last name */}
                    <div className="col-md-6">
                      <div>
                        <div className="d-flex">
                          <label className="all_labels">Gender</label>
                          <p className="all_stars">*</p>
                        </div>
                        <select
                          className="all_inputs"
                          aria-label=".form-select-sm example"
                          id="gender"
                          onChange={fetchGender}
                        >
                          <option selected value={gender}>
                            Select Gender
                          </option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                        </select>
                        <div
                          class="std_gender"
                          style={{ margin: "0", display: "none" }}
                        >
                          <h4 class="login-text all_validations_h4">
                            Please select gender
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 row d-flex">
                    <div class="col-md-6">
                      <div className="">
                        <div className="d-flex">
                          <label className="all_labels">Email</label>

                          <p className="all_stars">*</p>
                        </div>

                        <input
                          type="email"
                          className="all_inputs"
                          autoComplete="off"
                          placeholder="Enter Email"
                          id="email"
                          value={email}
                          onChange={(e) => updateEmail(e.target.value)}
                        />

                        <div
                          class="std_email"
                          style={{ margin: "0", display: "none" }}
                        >
                          <h4 class="login-text all_validations_h4">
                            Please Enter Email Name
                          </h4>
                        </div>

                        <div
                          class="validEmail"
                          style={{ margin: "0", display: "none" }}
                        >
                          <h4 className="login-text all_validations_h4">
                            Please Enter valid Email Address with @
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div className="">
                        <div className="d-flex">
                          <label className="all_labels">Mobile Number</label>

                          <p className="all_stars">*</p>
                        </div>

                        <input
                          type="text"
                          className="all_inputs"
                          placeholder="Enter Mobile Number"
                          id="mobile_new"
                          value={mobile}
                          minLength="10"
                          pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                          maxLength="10"
                          onChange={(e) => checkInput(e)}
                          autoComplete="off"
                        />

                        <div
                          class="std_mobile"
                          style={{ margin: "0", display: "none" }}
                        >
                          <h4 class="login-text all_validations_h4">
                            Please Enter Mobile
                          </h4>
                        </div>

                        <div
                          class="validMobileNumber"
                          style={{ margin: "0", display: "none" }}
                        >
                          <h4 class="login-text all_validations_h4">
                            Please Enter 10 digit mobile number
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div class="col-md-4">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">Class</label>
                    <p className="all_stars">*</p>
                  </div>
                  <select
                    className="all_inputs"
                    aria-label=".form-select-sm example"
                    id="student_class"
                    onChange={fetchClass}
                  >
                    <option selected="selected" value={studentClass}>
                      Select Class
                    </option>

                    {classdata && classdata.length > 0 ? (
                      classdata.map((item, index) => {
                        return (
                          <option value={item.class_id} key={index}>
                            {item.class_name}
                          </option>
                        );
                      })
                    ) : (
                      <div>Data Not Found</div>
                    )}
                  </select>
                  <div
                    class="std_class"
                    style={{ margin: "0", display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Select Class
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-4 d-flex">
                <div style={{ width: "100%" }}>
                  <div className="d-flex">
                    <label className="all_labels">Persona</label>
                    <p className="all_stars">*</p>
                  </div>
                  <select
                    className="all_inputs"
                    aria-label=".form-select-sm example"
                    id="persona"
                    onChange={(e) => updatePersona(e.target.value)}
                  >
                    <option selected="selected" value={persona}>
                      Select Persona
                    </option>
                    {personadata.map((item, index) => {
                      return (
                        <option value={item.persona} key={index}>
                          {item.persona}
                        </option>
                      );
                    })}
                  </select>
                  <div
                    class="std_persona"
                    style={{ margin: "0", display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please select persona
                    </h4>
                  </div>
                </div>
              </div>
              <div class="col-md-3 d-flex p-0" style={{ alignItems: "end" }}>
                <a className="cta" href="#google">
                  <img
                    src={require("../images/add.png")}
                    style={{ height: "20px", width: "20px" }}
                  />
                </a>

                <div id="google" className="modaloverlay">
                  <div className="modalContainer" style={{ width: "33%" }}>
                    <form role="form">
                    <div style={{padding:"0px 6px"}}>
                            <a
                              class="close"
                              href="#"
                              style={{

                              }}
                            >
                              &times;
                            </a>
                          </div>
                      <div className="card-body" style={{ marginTop: "0px" }}>
                        <div style={{ width: "100%" }}>
                          {/* CATEGORY */}


                          <div
                            className="form-group"
                            style={{ marginTop: "0px" }}
                          >
                            <label
                              htmlFor="exampleInputEmail1"
                              style={{ color: "#1F3977", fontSize: "11px" }}
                            >
                              Add Persona
                            </label>
                            <input
                              type="name"
                              className="all_inputs"
                              id="exampleInputEmail1"
                              placeholder="Add Persona"
                              value={personaValue}
                              onChange={(e) =>
                                updatePersonaValue(e.target.value)
                              }
                            />
                          </div>

                          <div
                            className="d-flex mt-3"
                            style={{ gap: "7px", alignItems: "center" }}
                          >
                            <div
                              style={{
                                fontSize: "12px",
                                color: "blue",
                                marginTop: "20px",
                              }}
                            >
                              {personaErrorMessage}
                            </div>
                            <input
                              type="button"
                              className="create_btn"
                              defaultValue="Sign Up"
                              value="Cancel"
                              onClick={() => cancelPersona()}
                              style={{
                                borderRadius: "5px",
                                fontWeight: "500",
                                fontSize: "10px",
                                marginLeft: "auto",
                                color: "#1F3977",
                                background: "transparent",
                              }}
                            />
                            <input
                              type="button"
                              className=""
                              defaultValue="Sign Up"
                              value="Submit"
                              onClick={() => createPersona()}
                              style={{
                                borderRadius: "5px",
                                fontSize: "10px",
                                fontWeight: "500",
                                color: "#fff",
                                border: "none",
                                height: "25px",
                                backgroundColor: "#1F3977",
                                padding: "0px 15px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="d-flex border_class2 box_padding buttons_div">
            <div
              class="ValueMsg"
              style={{ margin: "8px", width: "71%", display: "none" }}
            >
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="error">
                  Error! You Must Fill In Mandatory Fields
                </Alert>
              </Stack>
            </div>

            <img
              src="dist/img/delete.png"
              alt="dropdown"
              className="delete_img"
              onClick={() => resetValue()}
            />
            <p className="news_bar">|</p>
            <button
              className="preview_button"
              type="button"
              onClick={() => preview()}
            >
              <p className="preview_font">Preview</p>
              <div className="preview_img_div">
                <img className="preview_img" src="dist/img/view.png" />
              </div>
            </button>

            <input
              type="button"
              className="publish_button"
              defaultValue="Sign Up"
              onClick={() => createStudent()}
              value="Publish"
            />
          </div>
        </div>
      </form>

      {/* PREVIEW */}
      <div className="preview_polls">
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
                Student
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
                    Persona
                  </p>
                  <p
                    className="col-md-9"
                    style={{
                      color: "#1f3977",
                      fontWeight: "600",
                      fontSize: "10PX",
                    }}
                  >
                    : <span style={{ marginLeft: "10px" }}>{persona}</span>{" "}
                  </p>
                </div>
              </div>
            }
          </div>
          {/* )} */}
        </div>
      </div>

      {/* **********************************************edit category************************************* */}
      <div className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">Student</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closeEditPreview()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
          {/* category & question */}
          <div className="preview_form mt-2">
            {/* first name */}
            <div className="border_class2 edit_row_padding2">
              <div className="mt p-0">
                <div class="row">
                  <div class="col-md-6">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">First Name</label>

                        <p className="all_stars">*</p>
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
                  <div class="col-md-6">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">Last Name</label>

                        <p className="all_stars">*</p>
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

              {/* gender */}
              <div className="mt-2 p-0">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">Gender</label>

                        <p className="all_stars">*</p>
                      </div>
                      <select
                        className="form-select form-select-sm all_inputs"
                        aria-label=".form-select-sm example"
                        id="gender"
                        onChange={fetchGender}
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

            <div className="border_class2 edit_row_padding2">
              {/* dob */}
              <div className="mt-0 p-0">
                <div class="row">
                  <div class="col-md-12">
                    <div className="d-flex">
                      <label className="all_labels">Date Of Birth</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      className="all_inputs"
                      type="date"
                      id="editDob"
                      required
                      value={dateOfBirth}
                      onChnage={(e) => updateDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* persona */}
              <div className="mt-2 p-0">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">Persona</label>

                        <p className="all_stars">*</p>
                      </div>
                      <select
                        className="form-select form-select-sm all_inputs"
                        aria-label=".form-select-sm example"
                        id="persona"
                        onChange={(e) => updatePersona(e.target.value)}
                        required
                      >
                        <option selected="selected" value={persona}>
                          {persona}
                        </option>
                        {personadata.map((item, index) => {
                          return (
                            <option value={item.persona_id} key={index}>
                              {item.persona}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ******************button********************** */}
            <div
              className="d-flex form-buttons mt-4 edit_buttons_div border_class2"
              style={{ justifyContent: "end" }}
            >
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
