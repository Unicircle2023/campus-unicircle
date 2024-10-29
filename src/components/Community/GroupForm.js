import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { NewRecipient } from "./NewRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import { NewClassRecipient } from "./NewClassRecipient";
import { ExportToExcel } from "./ExportToExcel";
import LoadingSpinner from "../LoadingSpinner";
import SummerNote from "../SummerNote/SummerNote";
import toast,{Toaster} from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { NewClassRecipients } from "../Specific Students/NewClassRecipients";
import { NewPersonaRecipients } from "../Specific Students/NewPersonaRecipients";
import { NewRecipients } from "../Specific Students/NewRecipients";

export function GroupForm() {
  $(".close_event").click(function() {
    $(".user_type").hide();
  });

  function preview() {
    $(".preview_polls").show();
    summernoteCssFunc();
  }

  $(".close_event").click(function() {
    $(".preview_polls").hide();
    summernoteCssFunc();
  });

  $(".close_event").click(function() {
    $(".preview_category").hide();
    summernoteCssFunc();
  });

  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
    summernoteCssEditFunc();

    updateEditGroupId(grpID);
    updateEditGroupType(group_type);
    updateEditGroupName(group_name);
    updateEditCommunityName(community);
    updateGroupDescription(description);
    updateEditNewsSendTo(user_type);
    updateEditGroupImage(logo);
  }
  const [addPersona, updatePersona] = useState([]);
  const [errorCodePersona, updateErrorCodePersona] = useState("");
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const history = useHistory();
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

    if (personaResponse.data.error_code == 200) {
      updatePersona("");
    }
    updateErrorCodePersona(personaResponse.data.error_code);

    updateErrorMessagePersona(personaResponse.data.message);

    $(".preview_category").hide();

    $(".personaMsg").show();

    setTimeout(function() {
      $(".personaMsg").hide();
    }, 3000);
  }
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
  const fileName = "uploadStudent";
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
  async function saveGroup() {
    const formData = new FormData();
    formData.append("group_id", grpID);
    formData.append("group_name", editGroupName);
    formData.append("category", editCommunityName);
    formData.append("group_description", editGroupDescription);
    formData.append("type", editGroupType);
    formData.append("image", "");
    formData.append("invited_friend_list", "");

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_group",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );


    updateGroupName(editGroupName);
    updateCommunity(editCommunityName);

    updateGroupType(editGroupType);

    $(".preview_category").hide();
  }

  const [group_name, updateGroupName] = useState("");
  const [community, updateCommunity] = useState("");
  const [logo, updateLogo] = useState("");
  const [description, updateDescription] = useState("");
  const [group_type, updateGroupType] = useState("");
  const [user_type, updateUserType] = useState("");
  const [groupData, updateGroupData] = useState([]);
  const [grpCategory, updateGrpCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [editGroupId, updateEditGroupId] = useState("");
  const [editGroupType, updateEditGroupType] = useState("");
  const [editGroupName, updateEditGroupName] = useState("");
  const [editCommunityName, updateEditCommunityName] = useState("");
  const [editGroupDescription, updateGroupDescription] = useState("");
  const [grpID, updateGrpId] = useState("");
  const [editNewsSendTo, updateEditNewsSendTo] = useState("");
  const [editGroupImage, updateEditGroupImage] = useState("");
  const [previewLogo, updatePreviewLogo] = useState(null);
  const [jobDescription_text, updateJobDescription_text] = useState("");

  const [error_message, updateError_message] = useState("");

  function resetValues() {
    updateGroupName("");
    $("#communityName option").prop("selected", function() {
      return this.defaultSelected;
    });
    updateDescription("");
    $("#file-ip-1-preview").hide();
    $(".image_std").show();
    var ele = document.getElementsByName("type");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;

    var ele = document.getElementsByName("userType");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  }

  async function createGroup() {
    try {
      const groupName = document.getElementById("groupName");
      const communityName = document.getElementById("communityName");
      const logoName = document.getElementById("file-ip-1");

      const groupType = document.getElementById("groupType");
      const userType = document.getElementById("userType");

      if (
        groupName.value == "" &&
        communityName.value == "" &&
        logoName.value == "" &&
        description == "" &&
        groupType.value == "" &&
        userType.value == ""
      ) {
        toast.error( "Fill the required fields", {
          duration: 2000,
        });
        return;
      } else if (groupName.value == "") {
        $(".GroupName").show();

        setTimeout(function() {
          $(".GroupName").hide();
        }, 3000);
      } else if (communityName.value == "") {
        $(".CommunityName").show();

        setTimeout(function() {
          $(".CommunityName").hide();
        }, 3000);
      } else if (logoName.value == "") {
        $(".LogoName").show();

        setTimeout(function() {
          $(".LogoName").hide();
        }, 3000);
      } else if (description == "") {
        $(".DescriptionName").show();

        setTimeout(function() {
          $(".DescriptionName").hide();
        }, 3000);
      } else if (group_type == "") {
        checkRadio();
        $(".GroupType").show();

        setTimeout(function() {
          $(".GroupType").hide();
        }, 3000);
      } else if (user_type == "") {
        checkRadioForUserType();
        $(".UserType").show();

        setTimeout(function() {
          $(".UserType").hide();
        }, 3000);
      } else {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("group_name", group_name);
        formData.append("category", community);
        formData.append("group_description", description);
        formData.append("type", group_type);
        formData.append("image", logo);
        formData.append("invited_friend_list", "");
        formData.append("user_type", user_type);

        const groupResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_create_group",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        setIsLoading(false);
        updateError_message(groupResponse.data.message);

        updateGroupName("");
        updateCommunity("");
        updateLogo("");
        updateDescription("");
        updateGroupType("");
        updateUserType("");

        toast.success( groupResponse.data.message);
        setTimeout(function() {
          history.push("/community")
        }, 3000);
  
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  function closePreview() {
    $(".preview_polls").hide();
    summernoteCssFunc();
  }
  function closeEditPreview() {
    $(".preview_category").hide();
    summernoteCssFunc();
  }
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
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchGroupCategoriesList() {
    const token = localStorage.getItem("Token");
    try {
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_group_categories",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      const GroupErrorCode = fetchResponse.data.error_code;
      const GroupErrorMsg = fetchResponse.data.message;
      if (GroupErrorCode == 200) {
        const groupListArray = fetchResponse.data.data;
        updateGroupData(groupListArray);
      } else {
        updateGroupData([]);

        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const summernoteCssEditFunc = () =>{
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height","250px")
}

  const summernoteCssFunc = () =>{
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height","113px")
}

  useEffect(() => {
    fetchGroupCategoriesList();
    summernoteCssFunc();
  }, []);

  const [newsCategory, updateNewsCategory] = useState("");
  const [newsCategorydata, setNewsCategoryData] = useState([]);
  const [image, updateImage] = useState("");
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);

  async function createGroupCategory() {
    try {
      const formDataCategory = new FormData();

      formDataCategory.append("category_name", newsCategory);

      const responseCategory = await axios.post(
        process.env.REACT_APP_API_KEY + "create_group_category",
        formDataCategory,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (responseCategory.data.error_code == 200) {
        setData([responseCategory.data]);
      }
      if (responseCategory.data.error_code == 200) {
        $(".SuccessMsg").show();

        setTimeout(function() {
          // $(".SuccessMsg").hide();
        }, 4000);

        window.location.href = "/community";
      }
      updateGrpCategory("");
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchNewsList() {
    const token = localStorage.getItem("Token");
    try {
      const fetchnewsListResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_news_category",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      const NewsCategoryErrorCode = fetchnewsListResponse.data.error_code;

      const NewsCategoryErrorMsg = fetchnewsListResponse.data.message;

      if (NewsCategoryErrorCode == 200) {
        const NewsCategoryListArray = fetchnewsListResponse.data.data;
        setNewsCategoryData(NewsCategoryListArray);
      } else {
        setNewsCategoryData([]);
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
    fetchNewsList();
    //fetchGroupCategoriesList();
  }, []);

  const getImage = (e) => {
    $(".default_image").hide();
    $(".image_std").hide();
    updateLogo(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
      updatePreviewLogo(src);
    }
  };

  const checkRadio = () => {
    var table = document.getElementById("groupType");
    var radio = table.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("spnError").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  const checkRadioForUserType = () => {
    var user = document.getElementById("userType");
    var radioInput = user.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("errorMsg").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  const handelSummenrnote = (e) => {
    updateDescription(e);
  };

  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
        <Toaster
          position="top-right"
          reverseOrder={false}
       />
      <div className=" border_class2 box_padding">
        <h1 className="main_heading_h1">CREATE GROUP</h1>
      </div>

      <div
        class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>
      {/* CREATE news category pop up */}
      <div id="google" className="modaloverlay">
        <div className="modalContainer" style={{ width: "30%" }}>
          <form role="form">
            <div className="card-body">
              <div>
                {/* CATEGORY */}
                <div className="form-group" style={{ marginTop: "0px" }}>
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{ color: "#1F3977",fontSize:"10px",fontWeight:"600" }}
                  >
                    Add Community Type
                  </label>
                  <input
                    type="name"
                    className="border all_inputs"
                    id="exampleInputEmail1"
                    placeholder="Add Community Type"
                    value={newsCategory}
                    onChange={(e) => updateNewsCategory(e.target.value)}
                  />
                </div>

                <div className="mt-3 d-flex">
                  <input
                    type="button"
                    className="create_btn ml-auto"
                    defaultValue="Sign Up"
                    value="Submit"
                    onClick={() => createGroupCategory()}
                    style={{
                      borderRadius: "3px",
                    marginLeft: "auto",
                    backgroundColor: "#1F3977",
                    fontSize: "10px",
                    fontWeight:"500",
                    padding: "5px 15px",  
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
          <a
            class="close"
            href="#"
            style={{ marginTop: "-135px", marginRight: "5px" }}
          >
            &times;
          </a>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className=" ">
          <div className=" border_class2 box_padding">
            <div class="row">
              <div class="col-md-6">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Name</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    className="all_inputs"
                    type="text"
                    id="groupName"
                    value={group_name}
                    onChange={(e) => updateGroupName(e.target.value)}
                    placeholder="Group Name goes here..."
                    autoComplete="off"
                  />
                  <div class="GroupName" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Group Name
                    </h4>
                  </div>

                  <div className="d-flex" style={{ marginTop: "10PX" }}>
                    <label className="all_labels">Community Type</label>

                    <p className="all_stars">*</p>
                  </div>

                  <div className="d-flex">
                    <select
                      className="all_inputs"
                      id="communityName"
                      aria-label=".form-select-sm example"
                      //value={community}
                      onChange={(e) => updateCommunity(e.target.value)}
                    >
                      <option value={community}>Select Category</option>
                      {groupData.map((grp, index) => {
                        return (
                          <option value={grp.category_name} key={index}>
                            {grp.category_name}
                          </option>
                        );
                      })}
                    </select>

                    <a className="cta" href="#google" style={{display:"flex",alignItems:"end"}}>
                      <img
                        src="dist/img/add.png"
                        alt="dropdown"
                        style={{
                          width: "18px",
                          height: "17px",
                          marginLeft: "3PX",
                        }}
                      />
                    </a>

                    {/* </div> */}
                  </div>
                  <div class="CommunityName" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Community Name
                    </h4>
                  </div>

                  <div className="d-flex" style={{ marginTop: "10PX" }}>
                    <label className="all_labels">Group Description</label>

                    <p className="all_stars">*</p>
                  </div>

                  <textarea
                            id="publishdate"
                            className="all_inputs"
                            placeholder="Description goes here.."
                            value={description}
                            onChange={(e) => handelSummenrnote(e.target.value)}
                            name="birthdaytime"
                            style={{height:"123px"}}
                          />

                  <div class="DescriptionName" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Description
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-6" style={{ textAlign: "center" }}>
                <div className="left_padding">
                  <div
                    className="d-flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <label className="all_labels">Add Group Logo</label>

                    <p className="all_stars" style={{ height: "100%" }}>
                      *
                    </p>
                  </div>

                  <label
                    for="file-ip-1"
                    class="file-ip-1 x"
                    style={{ height: "236px" }}
                  >
                    <img
                      class="default_image "
                      src="dist/img/event_photo.png"
                      id="comp_logo"
                      style={{ height: "215px" }}
                    />

                    <img
                      id="file-ip-1-preview"
                      style={{ display: "none", height: "200px" }}
                    />
                  </label>
                  <input
                    type="file"
                    name="photo"
                    style={{ visibility: "hidden",display:"none" }}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={getImage}
                    multiple
                    id="file-ip-1"
                  />

                  <div class="LogoName" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Image
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" border_class2 box_padding">
            <div class="row">
              <div class="col-md-12">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div
                    className="d-flex"
                    id="groupType"
                    value={group_type}
                    onChange={(e) => updateGroupType(e.target.value)}
                  >
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <label className="all_labels">Type</label>
                      <p
                        className="all_stars"
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        *
                      </p>
                    </div>

                    <input
                      type="radio"
                      id="public"
                      name="type"
                      value="1"
                    />
                    <label
                      for="public"
                      className="specific_recipients_label"
                      style={{marginLeft: "15px"}}
                    >
                      <p style={{paddingLeft:"5px"}}>Public</p>
                    </label>

                    <input
                      type="radio"
                      id="private"
                      name="type"
                      value="2"
                    />
                    <label
                      for="private"
                      className="specific_recipients_label"
                      style={{marginLeft: "15px"}}
                    >
                      <p style={{paddingLeft:"5px"}}>Private</p>
                    </label>
                  </div>

                  <div
                    class="GroupType"
                    id="spnError"
                    style={{ display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Select group type
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" border_class2 box_padding">
            <div class="row">
              <div class="col-md-12">
                <div
                  className=""
                  style={{ width: "100%", marginTop: "0px" }}
                  id="news_sendto"
                >
                  <div className="d-flex">
                    <label className="all_labels">
                      Who are you sending this invite to?
                    </label>

                    <p className="all_stars"></p>
                  </div>
                  <label className="all_labels">User type</label>

                  <div className="d-flex" id="userType">
                    <input
                      type="radio"
                      id="all students"
                      name="userType"
                      value="1"
                      onChange={(e) => updateUserType(e.target.value)}
                    />
                    <label
                      for="all students"
                      className="specific_recipients_label"
                      onClick={() => all_student()}
                    >
                      <p style={{paddingLeft:"5px"}}>All Students</p>
                    </label>
                    <input
                      type="radio"
                      id="specific class"
                      name="userType"
                      value="2"
                      onChange={(e) => updateUserType(e.target.value)}
                    />
                    <label
                      for="specific class"
                      className="specific_recipients_label"
                      style={{marginLeft: "15PX"}}
                      onClick={() => specific_class()}
                    >
                      <p style={{paddingLeft:"5px"}}>Specific Recipients</p>
                    </label>
                  </div>
                </div>

                <div
                  class="UserType"
                  id="errorMsg"
                  style={{ marginTop: "-6px", display: "none" }}
                >
                  <h4
                    class="login-text"
                    style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}
                  >
                    Please Select User Type
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* specific student pop up */}
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
                  alt="dropdown"
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

          {/* buttons */}
          <div
            className="d-flex border_class2 box_padding buttons_div"
            
          >
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

            <img  className="delete_img"
              src="dist/img/delete.png"
              alt="dropdown"
              
              onClick={() => resetValues()}
            />
            <p
              className="news_bar">
              |
            </p>
            <button className="preview_button" onClick={() => preview()}>
              <p className="preview_font">
                Preview
              </p>
               <div className="preview_img_div">
               <img className="preview_img"
                src="dist/img/view.png"
                
                
              />
               </div>
            </button>

           
            <input
              type="button"
              className="publish_button"
              defaultValue="Sign Up"
              onClick={() => createGroup()}
              value="Publish"
             
            />
            
          </div>
        </div>
      )}

      {/* PREVIEW */}
      <div
        className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">
              Preview
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closePreview()}
              className="close_event ml-auto cancel_img" 
            />
          </div>
         
          <div>
            <div className="d-flex">
              <img
                src="dist/img/Pencil.png"
                alt="dropdown"
                className=" ml-auto preview_edit_img"
                onClick={() => edit_category()}
              />
            </div>

            {
              <div>
                 <div className="edit_top_label" style={{marginTop:"0px"}}>
                  <p> Group Name, Category, Type & User Type Title </p>
                </div>

                <div>
                   <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-4">
                    <span className="preview_font">
                    Group Name
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{group_name}</span>
                  </div>
                  
                  <div className="col-md-4">
                    <span className="preview_font">
                    Category
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{community}</span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                       Type
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {group_type == ""
                        ? ""
                        : group_type == 1
                        ? "Public"
                        : "Private"}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                        User Type
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {user_type == ""
                        ? ""
                        : user_type == 1
                        ? "All Students"
                        : "Specific Recipient"}
                    </span>
                  </div>
                </div>
                </div>

                <div className="edit_top_label">
                  <p>Group Logo</p>
                </div>

                <div className="edit_border_class">
            <div className="p-0">
              <div class="row">
                <div class="col-md-12">
                {previewLogo ==  null?<img  src={require("../images/no_image.png")}
                                          className="preview_form_imgs"/>:
                   <img className="preview_form_imgs" src={previewLogo} />                
                }
                </div>
              </div>
            </div>
            </div>

            <div className="edit_top_label">
                  <p> Group Description </p>
                </div>
                  
                      <div>
                        <div className="edit_border_class nine_font_class"
                            style={{height:"270px"}}
                          >
                          <p dangerouslySetInnerHTML={{ __html: description }}/>
                      </div>
                      </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      {/* **********************************************edit category************************************* */}
      <div
        className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">
              Group
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
           <div className="edit_top_label">
                  <p>Group Name & Category</p>
                </div>

                <div className="edit_border_class">
                <div className="row">
                <div className="col-md-4">
                    <span className="preview_font">
                    Group Name:
                    </span>
                  </div>
                  <div className="col-md-8">
                    <input className="edit_inputs_class"
                      type="name"
                      autoComplete="true"
                      value={group_name}
                      onChange={(e) => updateGroupName(e.target.value)}
                    />
                  </div>

                  
                  <div className="col-md-4">
                    <span className="preview_font">
                    Category :
                    </span>
                  </div>
                  <div className="col-md-8">
                  <select
                      className="form-select form-select-sm edit_inputs_class"
                      id="communityName"
                      aria-label=".form-select-sm example"
                      
                      onChange={(e) => updateCommunity(e.target.value)}
                      
                    >
                      <option value={community}>Select Category</option>
                      {groupData.map((grp, index) => {
                        return (
                          <option value={grp.category_name} key={index}>
                            {grp.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                </div>

                <div className="edit_top_label">
                  <p>Group Logo</p>
                </div>

                <div className="edit_border_class">
            <div className="p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div>
                      {previewLogo == null ? (
                        <div>
                          <label for="file-ip-1" style={{ height: "100%",marginBottom:"0px" }}>
                            <img
                              className="image_std preview_form_imgs"
                              src={require("../images/no_image.png")}
                            />
                            <img className="preview_form_imgs"
                              id="file-ip-1-preview"
                              style={{
                                borderRadius: "6PX",
                                display: "none",
                              }}
                            />
                          </label>

                          <input
                            type="file"
                            name="photo"
                            style={{ visibility: "hidden",display:"none" }}
                            accept="image/png, image/gif, image/jpeg"
                            onChange={getImage}
                            readOnly
                            id="file-ip-1"
                          />
                        </div>
                      ) : (
                        <div>
                          <label
                            for="file-ip-1"
                            style={{ height: "100%", display: "flex",marginBottom:"0px" }}
                          >
                                <div >
                                  <img className="image_std preview_form_imgs"
                                     src={previewLogo} />
                                </div>
                             

                            <img className="preview_form_imgs"
                              id="file-ip-1-preview"
                              style={{
                                borderRadius: "6PX",
                                display: "none",
                              }}
                            />
                            <input
                              type="file"
                              name="photo"
                              style={{ visibility: "hidden",display:"none" }}
                              accept="image/png, image/gif, image/jpeg"
                              onChange={getImage}
                              readOnly
                              id="file-ip-1"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="edit_top_label">
                  <p> Group Description</p>
                </div>
                <div>
                <SummerNote
                    _onChange={handelSummenrnote}
                    value={description}
                    placeholder="Enter Your Message here.."
                  />
                </div>

            {/* ******************button********************** */}
            <div
              className="d-flex form-buttons mt-3 edit_buttons_div border_class2"
              style={{justifyContent:"end"}}
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
