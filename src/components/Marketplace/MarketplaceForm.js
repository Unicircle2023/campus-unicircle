import React from "react";
import ImageUploader from "react-images-upload";
import { useState } from "react";
import $ from "jquery";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import { NewRecipient } from "./NewRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import { NewClassRecipient } from "./NewClassRecipient";
import { ExportToExcel } from "./ExportToExcel";
import toast, { Toaster } from "react-hot-toast";
import { NewRecipients } from "../Specific Students/NewRecipients";
import { NewClassRecipients } from "../Specific Students/NewClassRecipients";
import { NewPersonaRecipients } from "../Specific Students/NewPersonaRecipients";

export function MarketplaceForm() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [state, setState] = React.useState({
    pictures: [],
  });

  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);

    setChildData(data);
    if(data != ""){
    setTimeout(() => {
      $(".user_type").hide();
    }, 2000);
  }
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);
  };

  const student_name = childData.join(", ");
  const [addPersona, updatePersona] = useState([]);
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const [errorCodePersona, updateErrorCodePersona] = useState("");
  async function createPersona() {
    const formData = new FormData();
    formData.append("persona", addPersona);
    const personaResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "add_persona",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    // console.log("Create Persona", personaResponse);
    if (personaResponse.data.error_code == 200) {
      updatePersona("");
    }
    updateErrorCodePersona(personaResponse.data.error_code);

    updateErrorMessagePersona(personaResponse.data.message);

    $(".personaMsg").show();

    setTimeout(function() {
      $(".personaMsg").hide();
    }, 3000);
  }

  const fileName = "uploadStudent";
  // const[studentList,updateStudentList] = useState([])
  // async function fetchStdList() {
  //   try {
  //     const fetchClassResponse = await axios.get(
  //       process.env.REACT_APP_API_KEY + "get_students_list",
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",

  //           Authorization: token,
  //         },
  //       }
  //     );

  //     console.log("Student Details", fetchClassResponse.data.data);
  //     updateStudentList(fetchClassResponse.data.data);
  //   } catch (err) {
  //     console.log("Log in Fail", err);
  //   }
  // }

  var studentList = [
    {
      "First Name": "",
      "Last Name": "",
      "Preferred Name": "",
      "Father Name": "",
      dob: "",
      "Mother Name": "",
      Gender: "",
      Country: "",
      Mobile: "",
      password: "",
      "First Language": "",
      Class: "",
      Department: "",
      "First Nationality": "",
      "Second Nationality": "",
      Email: "",
      "Spoken Language": "",
      Race: "",
      persona: "",
    },
  ];

  const [excel, setExcel] = useState([]);
  const [excelError_code, updateExcelError_code] = useState("");
  const [excelError_message, updateExcelError_message] = useState("");
  async function uploadExcel() {
    try {
      const formData = new FormData();

      formData.append("uploadFile", excel);

      const excelResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_upload_excel_file_student",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      updateExcelError_code(excelResponse.data.error_code);
      updateExcelError_message(excelResponse.data.message);

      $(".excel_message").show();
      setTimeout(() => {
        $(".excel_message").hide();
      }, 3000);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const onDrop = (picture, e) => {
    setState({
      pictures: state.pictures.concat(picture),
    });
    // updatePhotos(e.target.value)
  };

  const [images, setImages] = useState([
    {
      data: [],
      url: "",
    },
  ]);

  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [photos, updatePhotos] = useState([]);
  const [price, updatePrice] = useState("");
  const [send_to, updateSend_to] = useState("");
  const [imgData, setImgData] = useState([]);
  const [imgDataMarketplace, setImgDataMarketplace] = useState([]);
  const history = useHistory();
  const [jobDescription_text, updateJobDescription_text] = useState("");

  const getMultipleImage = (e) => {
    $(".default_image").hide();
    updatePhotos(e.target.files);

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        // var src = URL.createObjectURL(e.target.files[i]);
        // var preview = document.getElementById("file-ip-1-preview");
        // preview.src = src;
        // preview.style.display = "block";

      
        const newFiles = Array.from(e.target.files);
        const newUrls = newFiles.map((file) => URL.createObjectURL(file));
        setImgData([])
        setImgData(newUrls);
      }
    }
  };

  const [userType, updateUserType] = useState([]);
  function all_student() {
    $(".user_type").hide();
  }
  async function specific_class() {
    $(".user_type").show();
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

      //console.log("Get class List Details", fetchClassResponse.data.data);
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const checkRadioForUserType = () => {
    var user = document.getElementById("tblFruitsUserType");
    var radioInput = user.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("spnErrorUserType").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  async function createMarketplace() {
    try {
      const m_title = document.getElementById("title");

      const m_photos = document.getElementsByClassName("add_imagee");
      const m_price = document.getElementById("price");
      const newsSendTo = document.getElementById("sendNotification");

      if (
        m_title.value == "" &&
        description == "" &&
        m_photos.value == "" &&
        m_price.value == ""
        // m_send_to.value == ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (m_title.value == "") {
        $(".Title").show();

        setTimeout(function() {
          $(".Title").hide();
        }, 3000);
      } else if (description == "") {
        $(".Description").show();

        setTimeout(function() {
          $(".Description").hide();
        }, 3000);
      } else if (m_photos.value == "") {
        $(".Photos").show();

        setTimeout(function() {
          $(".Photos").hide();
        }, 3000);
      } else if (m_price.value == "") {
        $(".Price").show();

        setTimeout(function() {
          $(".Price").hide();
        }, 3000);
      } else if (send_to == "") {
        checkRadioForUserType();
        $(".SendToAll").show();

        setTimeout(function() {
          $(".SendToAll").hide();
        }, 3000);
      } else {
        toast.success("Data saved");

        setTimeout(function() {
          history.push("/marketplaceStep2", {
            title,
            description,
            imgData,
            photos,
            price,
            send_to,
            childId,
          });
        }, 2000);
      }
    } catch (err) {
      console.log("Log in Fail....", err);
    }
  }
  $(".close_event").click(function() {
    $(".user_type").hide();
  });

  const handelSummenrnote = (e) => {
    updateDescription(e);
  };

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="border_class2 box_padding">
        <h1 className="main_heading_h1">ADD PRODUCT</h1>
      </div>

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

      <div>
        {/* TITLE */}
        <div className=" border_class2 box_padding">
          <div className=" p-0">
            <div class="row">  
            <div className="col-md-6 p-0">
              <div class="col-md-12">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Title</label>

                    <p className="all_stars">*</p>
                  </div>
                  <input
                    type="name"
                    id="title"
                    className="all_inputs"
                    value={title}
                    onChange={(e) => updateTitle(e.target.value)}
                    placeholder="Your title goes here..."
                    autoComplete="off"
                  />
                  <div class="Title" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Write Item Name
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-12 mt-2">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Product Description</label>

                    <p className="all_stars">*</p>
                  </div>

                  <textarea
                    id="publishdate"
                    className="all_inputs"
                    placeholder="Description goes here.."
                    value={description}
                    onChange={(e) => handelSummenrnote(e.target.value)}
                    name="birthdaytime"
                    style={{ height: "123px" }}
                    autoComplete="off"
                  />
                  <div class="Description" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Write Item Description
                    </h4>
                  </div>
                </div>
              </div>
              </div>

              <div class="col-md-6">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">
                     
                      Add Photos
                    </label>

                    <p className="all_stars">
                      *
                    </p>
                  </div>

                  <label for="file-ip-1" class="file-ip-1 x">
                    <div>
                    <img
                      class="default_image "
                      src="dist/img/event_photo.png"
                      id="comp_logo"
                    />
                    </div>
                    

                        <div className="d-flex">
                        {imgData.length > 0 ? (
                          imgData.map((item, index) => (
                            <div key={index} style={{ margin: "2px" }}>
                              <img className="preview_form_event_imgs" src={item}/>
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>

                    
                  </label>
                  <input
                    type="file"
                    name="photo"
                    style={{ visibility: "hidden",display:"none" }}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={getMultipleImage}
                    multiple
                    id="file-ip-1"
                  />

                <div class="Photos" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Item Images
                  </h4>
                </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
        {/* MEDIA */}
        {/* <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-3">
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
                <div className="d-flex">
                  <label className="all_labels">Media</label>

                  <p className="all_stars">*</p>
                </div>

                <label
                  id="photos"
                  for="add_imagee"
                  className="ten_font_class"
                  style={{
                    background: "rgba(71, 121, 240, 0.3)",
                    borderRadius: "2px",
                    padding: "10px",
                    color: "2D5DD0",
                    border: "none",
                  }}
                >
                  Add Photos
                </label>

                <label
                  for="file-ip-1"
                  class="file-ip-1 x"
                  style={{ width: "220px", height: "140px" }}
                >
                  <img
                    class="default_image "
                    src="dist/img/event_photo.png"
                    id="comp_logo"
                    style={{ height: "215px" }}
                  />

                  <img
                    id="file-ip-1-preview"
                    style={{ display: "none", height: "130px" }}
                  />
                </label>
                <input
                  type="file"
                  name="photo"
                  style={{ visibility: "hidden" }}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={getMultipleImage}
                  multiple
                  id="file-ip-1"
                  class="add_imagee"
                />

                <div class="Photos" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Item Images
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div
                className="d-flex"
                id="file-ip-1-preview"
                style={{ width: "100%", height: "100%", alignItems: "center" }}
              >
                {imgData.map((item) => {
                  return (
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        marginLeft: "4px",
                      }}
                    >
                      <img
                        src={item}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}
        {/* PRICE */}
        <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-3">
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
                <div className="d-flex">
                  <label className="all_labels">Price</label>

                  <p className="all_stars">*</p>
                </div>
                <input
                  type="number"
                  id="price"
                  className="all_inputs"
                  value={price}
                  onChange={(e) => updatePrice(e.target.value)}
                  placeholder="&#x20B9;"
                  autoComplete="off"
                />
                <div class="Price" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Write Price of Item
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div className="d-flex" style={{ width: "100%", height: "100%" }}>
                <div className="d-flex">
                  <input
                    type="radio"
                    name="tax"
                    value=""
                    checked="checked"
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid rgba(0, 0, 0, 0.5)",
                    }}
                  />

                  <label
                    for="now"
                    className="d-flex nine_font_class"
                    style={{
                      color: "black",
                      marginLeft: "10PX",
                      marginTop: "4px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ marginLeft: "5px" }}>
                      Charge tax on this product?
                    </p>
                  </label>
                </div>

                <div class="NewsTitle" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Write News Title
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* user type */}

        <div className=" border_class2 box_padding">
          <div class="row">
            <div class="col-md-12">
              <div
                className=""
                style={{ width: "100%", marginTop: "0px" }}
                id="news_sendto"
                value={send_to}
                onChange={(e) => updateSend_to(e.target.value)}
              >
                
                <div className="d-flex">
                  <label className="all_labels">
                    Who are you sending this notification to?
                  </label>

                  <p className="all_stars">*</p>
                </div>
                <label className="all_labels">User Type</label>

                <div className="d-flex" id="tblFruitsUserType">
                  <input
                    type="radio"
                    id="all students"
                    name="userType"
                    value="1"
                  />
                  <label
                    for="all students"
                    className="specific_recipients_label"
                    onClick={() => all_student()}
                  >
                    <p style={{ marginLeft: "5PX" }}>All Students</p>
                  </label>
                  <input
                    type="radio"
                    id="specific class"
                    name="userType"
                    value="2"
                  />
                  <label
                    for="specific class"
                    className="specific_recipients_label"
                    style={{marginLeft: "15px"}}
                    onClick={() => specific_class()}
                  >
                    <p style={{ marginLeft: "5PX" }}>Specific Recipients</p>
                  </label>
                </div>
              </div>

              <div
                class="SendToAll"
                id="spnErrorUserType"
                style={{ display: "none" }}
              >
                <h4 class="login-text all_validations_h4">
                  Please Select User Type
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="border_class2 box_padding">
          <div className="d-flex ml-auto" style={{ justifyContent: "end" }}>
            <button
              type="button"
              className=" form-buttons3"
           
              onClick={() => createMarketplace()}
              value="Next Step"
              style={{
                marginRight: "30px",
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
                border: "1px solid #000000",
                borderRadius: "6px",
                marginLeft: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.01)",
                height: "28px",
                width: "130px",
                fontSize: "10PX",
              }}
            >
              <div
                style={{
                  marginLeft: "5px",
                  fontSize: "10PX",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
              >
                Next Step
              </div>
              <img
                src="dist/img/next.png"
                style={{ width: "17px", height: "17px", marginLeft: "auto" }}
              />
            </button>
          </div>
        </div>
      </div>

      <div
            className="user_type selected_std_modal"
            style={{display: "none"}}
          >
            <div className="selected_std_modal_inner_div">
              <div className="d-flex edit_top_container">
                <label className="main_labels">
                  Specific Recipients
                </label>

                <img
                  src="dist/img/Cancel.png"
                  className="close_event ml-auto cancel_img"
                />
              </div>

              <div
                id="exTab2"
                class="container p-0"
                style={{ marginTop: "10PX", height: "100%" }}
              >
                <ul className="nav nav-tabs">
                <li className="active mb-0">
                    <a href="#3" data-toggle="tab">
                      Individual
                    </a>
                  </li>
                   <li style={{ marginLeft: "10px" }}>
                    <a href="#2" data-toggle="tab">
                      Class
                    </a>
                  </li>
                  
                  <li className="mb-0"  style={{ marginLeft: "10px" }}>
                    <a
                      href="#1"
                      data-toggle="tab"
                      style={{ padding: "10px 20px" }}
                    >
                      Persona
                    </a>
                  </li>
                 
                </ul>

                <div class="tab-content ">
                <div class="tab-pane active" id="3">
                    <div
                      id="exTab3"
                      class="container"
                      style={{ marginTop: "0PX", height: "100%" }}
                    >
                      <div
                        class="tab-content "
                        style={{ padding: "0px", height: "auto" }}
                      >
                        <div
                          class="tab-pane active"
                          id="6"
                          style={{ height: "100%" }}
                        >
                          <NewRecipients
                          style={{ height: "100%" }}
                          passData={passData}
                          />
                        </div>
                        
                      </div>
                    </div>
                  </div>

                   <div class="tab-pane" id="2">
                    <NewClassRecipients
                      style={{ height: "100%" }}
                      passData={passData}
                    />
                  </div>

                  <div
                    class="tab-pane"
                    id="1"
                    style={{ height: "100%" }}
                  >
                   
                    <div
                      id="exTab4"
                      class="container"
                      style={{ marginTop: "0PX", height: "100%" }}
                    >
                      
                      <div
                        class="tab-content "
                        style={{ padding: "0px", height: "auto" }}
                      >
                        <div
                          class="tab-pane active"
                          id="4"
                          style={{ height: "100%" }}
                        >
                         
                          <NewPersonaRecipients
                            style={{ height: "100%" }}
                            passPersonaData={passPersonaData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
