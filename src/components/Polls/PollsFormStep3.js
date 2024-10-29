import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { Recipient } from "./Recipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import { NewRecipient } from "./NewRecipient";
import { NewClassRecipient } from "./NewClassRecipient";
import { Header } from "../Header";
import { Menu } from "../Menu";
import { ExportToExcel } from "./ExportToExcel";
import FilterRecipient from "./FilterRecipient";
import { useLocation, useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { NewRecipients } from "../Specific Students/NewRecipients";
import { NewPersonaRecipients } from "../Specific Students/NewPersonaRecipients";
import { NewClassRecipients } from "../Specific Students/NewClassRecipients";

const customStyles = {
  head: {
    style: {
      marginTop: "-25PX",
    },
  },
  table: {
    style: {
      height: "150px",
    },
  },
};

export function PollsFormStep3() {
  var todayy = "";
  todayy = new Date().toISOString().slice(0, 16);
  console.log("Todayy", todayy);

  const location = useLocation();
  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);
    setChildData(data);
    if (data != "") {
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
  function closeEvent() {
    $(".preview_category").hide();
    $(".preview_polls").show();
  }

  function closeResponse() {
    $(".preview_response").hide();
    $(".preview_polls").show();
  }
  function closeSchedule() {
    $(".preview_schedule").hide();
    $(".preview_polls").show();
  }
  const student_name = childData.join(", ");

  const [categoryID, updateCategoryId] = useState("");

  const history = useHistory();

  const [que, updateQuestion] = useState(location.state.que);
  const [result, updateResult] = useState(location.state.result);
  const [answer1, updateAnswer1] = useState(location.state.answer1);
  const [answer2, updateAnswer2] = useState(location.state.answer2);
  const [answer3, updateAnswer3] = useState(location.state.answer3);
  const [answer4, updateAnswer4] = useState(location.state.answer4);
  const [answer5, updateAnswer5] = useState(location.state.answer5);

  const [risk_level1, setRisk_level1] = useState(location.state.select_data);
  const [risk_level2, setRisk_level2] = useState(location.state.select_data2);
  const [risk_level3, setRisk_level3] = useState(location.state.select_data3);
  const [risk_level4, setRisk_level4] = useState(location.state.select_data4);
  const [risk_level5, setRisk_level5] = useState(location.state.select_data5);

  const [follow_up1, setFollow_up1] = useState(location.state.follow_up1);
  const [follow_up2, setFollow_up2] = useState(location.state.follow_up2);
  const [follow_up3, setFollow_up3] = useState(location.state.follow_up3);
  const [follow_up4, setFollow_up4] = useState(location.state.follow_up4);
  const [follow_up5, setFollow_up5] = useState(location.state.follow_up5);

  const [response_one, setResponse_one] = useState(location.state.response_one);
  const [response_two, setResponse_two] = useState(location.state.response_two);
  const [response_three, setResponse_three] = useState(
    location.state.response_three
  );
  const [response_four, setResponse_four] = useState(
    location.state.response_four
  );
  const [response_five, setResponse_five] = useState(
    location.state.response_five
  );

  const [follow_up1_msg, setFollow_up1_msg] = useState(
    location.state.follow_up1_msg
  );
  const [follow_up2_msg, setFollow_up2_msg] = useState(
    location.state.follow_up2_msg
  );
  const [follow_up3_msg, setFollow_up3_msg] = useState(
    location.state.follow_up3_msg
  );
  const [follow_up4_msg, setFollow_up4_msg] = useState(
    location.state.follow_up4_msg
  );
  const [follow_up5_msg, setFollow_up5_msg] = useState(
    location.state.follow_up5_msg
  );

  const { category } = location.state || { id: "none" };

  const checkSingle = () => {
    //alert('Hii')
    var poll = document.getElementById("tblFruits");
    var chks = poll.getElementsByTagName("INPUT");
    for (var i = 0; i < chks.length; i++) {
      chks[i].onclick = function() {
        for (var i = 0; i < chks.length; i++) {
          if (chks[i] != this && this.checked) {
            chks[i].checked = false;
          }
        }
      };
    }
  };
  const token = localStorage.getItem("Token");
  const [delivered, updateDelivered] = useState("");
  const [publishDate, updatePublishDate] = useState("");
  const [expireDate, updateExpireDate] = useState("");
  const [sendTo, updateSendTo] = useState("");
  const [users, updateUsers] = useState([]);
  const [error_message, updateError_message] = useState("");
  const [userType, updateUserType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [pollsData, setPollsData] = useState([]);
  const [pollsId, updatePollsId] = useState("");

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

      // if(excelResponse.data.error_code == 200)
      // {
      // setData(excelResponse.data.data)
      // setTimeout(() => {
      //   $(".user_type").hide();
      // }, 3000);
      // }
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

  const [catName, updateCatName] = useState("");
  async function getCategoryName() {
    try {
      const formData = new FormData();

      formData.append("poll_cat_id", category);

      const excelResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "get_single_poll_categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log(
        "get poll cat name.......................",
        excelResponse.data.data
      );
      excelResponse.data.data.map((item) => {
        updateCatName(item.category_name);
      });
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function savePolls() {
    const formData = new FormData();

    formData.append("poll_id", "");
    formData.append("category", category);
    formData.append("polls_que_type", result);
    formData.append("delivery_type", delivered);
    formData.append("questions", que);
    formData.append("option_1", answer1);
    formData.append("option_2", answer2);
    formData.append("option_3", answer3);
    formData.append("option_4", answer4);
    formData.append("option_5", answer5);
    formData.append("publish_date", publishDate);
    formData.append("expire_date", expireDate);

    const editPollsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_poll",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("edit poll", editPollsResponse.data.data);

    $(".categoryMsg").show();
    $(".saveMessage").show();
    $(".recepientMsg").show();

    setTimeout(function() {
      $(".preview_category").hide();
      $(".categoryMsg").hide();
    }, 2000);

    setTimeout(function() {
      $(".preview_response").hide();
      $(".saveMessage").hide();
    }, 2000);

    setTimeout(function() {
      $(".preview_schedule").hide();
      $(".recepientMsg").hide();
    }, 2000);
  }

  const pubDate = moment(publishDate).format("YYYY-MM-DD HH:mm");
  const expDate = moment(expireDate).format("YYYY-MM-DD HH:mm");

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

    console.log("Create Persona", personaResponse);
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
  $(".close_event").click(function() {
    $(".user_type").hide();
  });

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
  function edit_response() {
    $(".preview_polls").hide();
    $(".preview_response").show();
  }
  function edit_schedule() {
    $(".preview_polls").hide();
    $(".preview_schedule").show();
  }
  function all_student() {
    $(".user_type").hide();
  }

  async function fetchPollsCategoryList() {
    const token = localStorage.getItem("Token");
    console.log("Access Token-", token);
    try {
      const fetchPollsListResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_poll_categories",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get Polls Category List Details", fetchPollsListResponse);

      const PollsCategoryErrorCode = fetchPollsListResponse.data.error_code;
      console.log("Polls Category Error Code ", PollsCategoryErrorCode);

      const PollsCategoryErrorMsg = fetchPollsListResponse.data.message;
      console.log("Polls Category Error msg ", PollsCategoryErrorMsg);

      if (PollsCategoryErrorCode == 200) {
        const PollsCategoryListArray = fetchPollsListResponse.data.data;
        console.log("News Category list Array", PollsCategoryListArray);
        setPollsData(PollsCategoryListArray);
      } else {
        setData([]);

        console.log(fetchPollsListResponse.data.message);
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
    fetchPollsCategoryList();
  }, []);

  var today = new Date();
  const checkRadio = () => {
    var table = document.getElementById("tblFruits");
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
    var user = document.getElementById("sendNotification");
    var radioInput = user.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("SendMsg").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  function currentDate() {
    var date = new Date();
    const getDate = moment(date).format("YYYY-MM-DDTHH:mm");
    updatePublishDate(getDate);
    console.log("print publish date", publishDate);
  }

  function laterDate() {
    $("#new_publishdate").hide();
    $("#publishdate").show();
  }

  const resetValues = () => {
    var ele = document.getElementsByName("userType");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;

    var delivered = document.getElementsByName("deliveryType");
    for (var i = 0; i < delivered.length; i++) delivered[i].checked = false;

    updateDelivered("");
    updatePublishDate("");
    updateExpireDate("");
    updateSendTo("");
  };

  const dateValidate = () => {
    // alert("Hiiii")
    var startDate = document.getElementById("publishdate").value;
    var endDate = document.getElementById("expire_date").value;

    if (Date.parse(startDate) > Date.parse(endDate)) {
      alert("Expire date should be greater than Publish date");
      document.getElementById("expire_date").value = "";
    }
  };

  async function admin_create_poll_step_three() {
    dateValidate();
    try {
      const delivery_type = document.getElementById("delivery_type");
      const publish_date = document.getElementById("publishdate");
      const expire_date = document.getElementById("expire_date");
      const send_to = document.getElementById("send_to");

      if (
        delivery_type.value == "" &&
        publish_date.value == "" &&
        expire_date.value == "" &&
        send_to.value == ""
      ) {
        $(".delivery_type").show();

        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (delivered == "") {
        checkRadio();
        $(".DeliveryType").show();

        setTimeout(function() {
          $(".DeliveryType").hide();
        }, 3000);
      } else if (publish_date.value == "") {
        $(".PublishDate").show();

        setTimeout(function() {
          $(".PublishDate").hide();
        }, 3000);
      } else if (expire_date.value == "") {
        $(".ExpireDate").show();

        setTimeout(function() {
          $(".ExpireDate").hide();
        }, 3000);
      } else if (sendTo == "") {
        checkRadioForUserType();
        $(".SendTo").show();

        setTimeout(function() {
          $(".SendTo").hide();
        }, 3000);
      } else {
        // setIsLoading(true);
        const formData = new FormData();

        formData.append("delivery_type", delivered);
        formData.append("send_to", sendTo);
        formData.append("expire_date", expireDate);
        formData.append("users", childId);
        formData.append("publish_date", publishDate);
        formData.append("cat", category);
        formData.append("que", que);
        formData.append("polls_que_type", result);
        formData.append("option_1", answer1);
        formData.append("option_2", answer2);
        formData.append("option_3", answer3);
        formData.append("option_4", answer4);
        formData.append("option_5", answer5);

        formData.append("option_1_risk_level", risk_level1.id);
        formData.append("option_2_risk_level", risk_level2.id);
        formData.append("option_3_risk_level", risk_level3.id);
        formData.append("option_4_risk_level", risk_level4.id);
        formData.append("option_5_risk_level", risk_level5.id);

        formData.append("option_1_follow_up", response_one);
        formData.append("option_2_follow_up", response_two);
        formData.append("option_3_follow_up", response_three);
        formData.append("option_4_follow_up", response_four);
        formData.append("option_5_follow_up", response_five);

        formData.append("option_1_follow_up_message", follow_up1_msg);
        formData.append("option_2_follow_up_message", follow_up2_msg);
        formData.append("option_3_follow_up_message", follow_up3_msg);
        formData.append("option_4_follow_up_message", follow_up4_msg);
        formData.append("option_5_follow_up_message", follow_up5_msg);

        for (const p of formData.entries()) {
          console.log(`${p[0]}----${p[1]}`);
        }

        const thirdStepResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_create_poll_step_three",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        console.log("thirdStepResponse---------", thirdStepResponse);
        updateDelivered();
        updateSendTo("");
        updateExpireDate("");
        setChildId("");
        updatePublishDate("");
        updateCategoryId("");

        updateQuestion("");
        updateResult("");
        updateAnswer1("");
        updateAnswer2("");
        updateAnswer3("");
        updateAnswer4("");
        updateAnswer5("");

        toast.success(thirdStepResponse.data.message);

        setTimeout(function() {
          history.push("/polls");
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  async function fetchSinglePoll(id) {
    try {
      const formData = new FormData();
      formData.append("poll_id", id);

      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_single_poll",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Single Polls", fetchResponse);

      const PollsErrorCode = fetchResponse.data.error_code;
      console.log("Polls Error Code ", PollsErrorCode);

      const PollsErrorMsg = fetchResponse.data.message;
      console.log("Polls Error msg ", PollsErrorMsg);

      if (PollsErrorCode == 200) {
        const pollsListArray = fetchResponse.data.data;
        console.log("Polls list Array", pollsListArray);
        setPollsData(pollsListArray);
      } else {
        setPollsData([]);

        console.log(fetchResponse.data.message);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchSinglePoll();
  }, []);

  function all_student() {
    $(".user_type").hide();
  }

  async function specific_class() {
    $(".user_type").show();
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

      console.log("Get class List Details", fetchClassResponse.data.data);
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function preview() {
    // add_poll();
    getCategoryName();
    $(".preview_polls").show();
  }

  async function fetchList() {
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_students_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Student Details", fetchClassResponse);
      setData(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      name: "Student Name",
      selector: "student_name",
      sortable: true,
      wrap: true,
      width: "auto",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      wrap: true,
      width: "auto",
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterRecipient
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="d-flex">
        <Menu />

        <div
          className="content-wrapper"
          style={{ paddingBottom: "10PX", height: "874px" }}
        >
          <div className="border_class2">
            <div style={{ padding: "6px" }}>
              <h1 className="polls_heading_h1">CREATE CAMPUS POLLS</h1>
            </div>
            <div
              style={{
                padding: "5px",
                fontWeight: "500",
                background: "rgba(110, 119, 129, 0.1)",
              }}
            >
              <div style={{ fontSize: "10px" }} class="d-flex">
                <p
                  style={{
                    color: "#1F3977",
                    fontWeight: "600",
                    paddingLeft: "42px",
                  }}
                >
                  Step 3:
                </p>
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    marginLeft: "20px",
                    fontWeight: "700",
                    fontSize: "10px",
                  }}
                >
                  Schedule & Recipient
                </p>
              </div>
            </div>
          </div>

          <div
            class="missingError"
            style={{
              marginTop: "5px",
              width: "97%",
              marginLeft: "15px",
              marginRight: "198px",
              display: "none",
            }}
          >
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                Please Enter Mandatory Fields
              </Alert>
            </Stack>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div style={{ width: "100%", borderRadius: "10PX" }}>
              <div className="  border_class2 box_padding">
                <div className="mt-1 p-0">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                        id="delivery_type"
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            When it should be delivered?
                          </label>

                          <p className="all_stars">*</p>
                        </div>
                        <div className="d-flex" id="tblFruits">
                          <input
                            type="radio"
                            id="now"
                            name="deliveryType"
                            value="1"
                            onClick={() => currentDate()}
                            onChange={(e) => updateDelivered(e.target.value)}
                          />
                          <label
                            for="now"
                            onClick={() => currentDate()}
                            className="specific_recipients_label"
                          >
                            <p style={{ marginLeft: "5px" }}>Now</p>
                          </label>
                          <input
                            type="radio"
                            id="later"
                            name="deliveryType"
                            value="2"
                            onChange={(e) => updateDelivered(e.target.value)}
                            onClick={() => laterDate()}
                          />
                          <label
                            for="later"
                            onClick={() => laterDate()}
                            className="specific_recipients_label"
                            style={{ marginLeft: "15PX" }}
                          >
                            <p style={{ marginLeft: "5px" }}>Later</p>
                          </label>
                        </div>
                      </div>

                      <div
                        id="spnError"
                        class="DeliveryType"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Delivery Type
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-0">
                  <div class="row">
                    <div class="col-md-4">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Publish Date/Time
                          </label>
                          <p className="all_stars">*</p>
                        </div>
                        <input
                          type="datetime-local"
                          className="all_inputs"
                          placeholder="dd-mm-yyyy hh-mm"
                          id="publishdate"
                          value={publishDate}
                          min={todayy}
                          onChange={(e) => updatePublishDate(e.target.value)}
                          name="datetime"
                        />

                        <div class="PublishDate" style={{ display: "none" }}>
                          <h4 className="all_validations_h4">
                            Please Select Publish Date
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div className="left_padding">
                        <div className="d-flex">
                          <label className="all_labels">Expiry Date/Time</label>
                        </div>

                        <input
                          type="datetime-local"
                          placeholder="dd-mm-yyyy hh-mm"
                          id="expire_date"
                          className="all_inputs"
                          value={expireDate}
                          min={todayy}
                          onChange={(e) => updateExpireDate(e.target.value)}
                          name="birthdaytime"
                        />

                        <div class="ExpireDate" style={{ display: "none" }}>
                          <h4 class="login-text all_validations_h4">
                            Please Select Expire Date
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border_class2 box_padding">
                <div class="row">
                  <div className="col-md-12">
                    <div
                      className="p-0"
                      style={{ width: "100%", marginTop: "0px" }}
                      id="send_to"
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Who are you sending this notification to?
                        </label>

                        <p className="all_stars">*</p>
                      </div>
                      <label className="all_labels">User type</label>

                      <div className="d-flex" id="sendNotification">
                        <input
                          type="radio"
                          id="all students"
                          name="userType"
                          value="1"
                          onChange={(e) => updateSendTo(e.target.value)}
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
                          onChange={(e) => updateSendTo(e.target.value)}
                          value="2"
                        />

                        <label
                          for="specific class"
                          className="specific_recipients_label"
                          style={{ marginLeft: "15px" }}
                          onClick={() => specific_class()}
                        >
                          <p style={{ marginLeft: "5PX" }}>
                            Specific Recipients
                          </p>
                        </label>
                      </div>
                    </div>

                    <div
                      id="SendMsg"
                      class="SendTo"
                      style={{ display: "none" }}
                    >
                      <h4 class="login-text all_validations_h4">
                        Please Select User Type
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* specific student pop up */}
              <div
                className="user_type selected_std_modal"
                style={{ display: "none" }}
              >
                <div className="selected_std_modal_inner_div">
                  <div className="d-flex edit_top_container">
                    <label className="main_labels">Specific Recipients</label>

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

                      <li className="mb-0" style={{ marginLeft: "10px" }}>
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

                      <div class="tab-pane" id="1" style={{ height: "100%" }}>
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
              <div className=" d-flex form-buttons border_class2 box_padding buttons_div">
                <img
                  className="delete_img"
                  src="dist/img/delete.png"
                  alt="dropdown"
                  onClick={() => resetValues()}
                />
                <p className="news_bar">|</p>
                <button className="preview_button" onClick={() => preview()}>
                  <p className="preview_font">Preview</p>
                  <div className="preview_img_div">
                    <img
                      className="preview_img"
                      src="dist/img/view.png"
                      alt="dropdown"
                    />
                  </div>
                </button>
                <input
                  type="button"
                  className=" publish_button"
                  defaultValue="Sign Up"
                  onClick={() => admin_create_poll_step_three()}
                  value="Publish"
                  style={{}}
                  // style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "8px", backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "10PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginRight: "60PX", marginBottom: "20px" }}
                />
                {/* </a> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ---------------------------------------- */}
      {/* PREVIEW */}
      <div className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Poll Preview</label>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              <img
                src="dist/img/Pencil.png"
                className=" ml-auto preview_edit_img"
                onClick={() => edit_category()}
                style={{ marginRight: "7px" }}
              />
              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="close_event ml-auto cancel_img"
              />
            </div>
          </div>
          {/* -- */}

          <div>
            <div className="edit_top_label d-flex">
              <p> Category & Question</p>
            </div>

            <div>
              <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-3">
                    <span className="preview_font">Category</span>
                  </div>
                  <div className="col-md-9">
                    : <span className="preview_font">{catName}</span>
                  </div>

                  <div className="col-md-3">
                    <span className="preview_font">Question</span>
                  </div>
                  <div className="col-md-9">
                    : <span className="preview_font">{que}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit_top_label d-flex">
              <p>Schedule & Recipients</p>
            </div>

            <div>
              <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-4">
                    <span className="preview_font">Delivery Type</span>
                  </div>
                  <div className="col-md-8">
                    :{" "}
                    <span className="preview_font">
                      {delivered == 1 ? "Now" : "Later"}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">Publish Date</span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{pubDate}</span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">Expiry Date</span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{expDate}</span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">Recipients</span>
                  </div>
                  <div className="col-md-8">
                    :{" "}
                    <span className="preview_font">
                      {sendTo == 1 ? "All Students" : "Specific Recipient"}
                      <br />
                      {student_name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------- */}
      {/* ************************edit category & question************************************* */}
      <div className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">Category</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closeEvent()}
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div>
            <div className="edit_top_label">
              <p> Category</p>
            </div>

            <div className="edit_border_class">
              <div className="row">
                <div className="col-md-3">
                  <span className="preview_font">Category :</span>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select form-select-sm edit_inputs_class"
                    id="pollsCategory"
                    aria-label=".form-select-sm example"
                    // value={category}
                    onChange={(e) => updateCategoryId(e.target.value)}
                  >
                    <option selected="selected" value={category}>
                      {catName}
                    </option>
                    {pollsData.map((item, index) => {
                      return (
                        <option value={item.cat_id} key={index}>
                          {item.category_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="edit_top_label">
              <p> Question</p>
            </div>

            <div className="edit_border_class">
              <textarea
                className="edit_inputs_class"
                autoComplete="true"
                value={que}
                onChange={(e) => updateQuestion(e.target.value)}
                style={{ height: "100px" }}
                maxLength={200}
              />
            </div>
            <div className="d-flex">
              <p style={{ fontSize: "10px" }} className="ml-auto">
                200 characters max
              </p>
            </div>

            {/* <div className="mt-2 p-0 border_class2">
              <div class="row" style={{ padding: "10px 0px" }}>
                <div class="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Category name
                      </label>

                      <p
                        style={{
                          color: "#EB2424",
                          fontWeight: "600",
                          marginLeft: "3PX",
                        }}
                      >
                        *
                      </p>
                    </div>
                    <select
                      className="form-select form-select-sm "
                      id="pollsCategory"
                      aria-label=".form-select-sm example"
                      value={category}
                      onChange={(e) => updateCategoryId(e.target.value)}
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        fontSize: "10px",
                        color: "black",
                        border: "1px solid #C4C4C4",
                        borderRadius: "0px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option selected="selected" value={category}>
                        {catName}
                      </option>
                      {pollsData.map((item, index) => {
                        return (
                          <option value={item.cat_id} key={index}>
                            {item.category_name}
                          </option>
                        );
                      })}
                    </select>

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0 border_class2">
              <div class="row" style={{ padding: "10px 0px" }}>
                <div class="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Question
                    </label>

                    <textarea
                      type="name"
                      rows="4"
                      id="news_description"
                      value={que}
                      onChange={(e) => updateQuestion(e.target.value)}
                      style={{
                        padding: "3px",
                        width: "100%",
                        height: "80px",
                        border: "0.5px solid #c4c4c4",
                        boxSizing: "border-box",
                        fontSize: "10px",
                      }}
                    />

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div
              className="d-flex  border_class2 edit_buttons_div"
              style={{ justifyContent: "end" }}
            >
              {/* <input
                type="button"
                className=" ml-auto"
                defaultValue="Next Step"
                onClick={() =>closeEvent()}
                value="Cancel"
                style={{border:"none",marginTop:"10px", color: "#1F3977", background: "transparent", fontWeight: "600", fontSize: "13PX", padding: "8px 12px" }}
              /> */}

              <input
                type="button"
                className=" edit_update_button"
                onClick={() => savePolls()}
                value="publish"
                style={{ width: "96%" }}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "green",
                display: "none",
              }}
              className="categoryMsg"
            >
              Data Saved Successfully
            </div>
          </div>
        </div>
      </div>

      {/* *************************************edit response********************************************8 */}
      <div
        className="preview_response"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          zIndex: "10",
          display: "none",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "absolute",
            bottom: "0px",
            top: "0",
            right: "5px",
            width: "420px",
            height: "100%",
            overflow: "auto",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Response
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closeResponse()}
              alt="dropdown"
              width="15px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* category & question */}
          <div id="tblFruits">
            <div className="row mt-2 border_class preview_response5">
              <div className="col-md-6">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        class="myCheckBox"
                        onClick={checkSingle}
                        value="3"
                        onChange={(e) => updateResult(e.target.value)}
                        id="star_symbol"
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Stars
                    </p>
                  </div>

                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "5px 10px",
                      height: "145px",
                    }}
                  >
                    <div className="d-flex">
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                    </div>

                    <div className="d-flex">
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                    </div>

                    <div className="d-flex">
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                    </div>

                    <div className="d-flex">
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                    </div>

                    <div className="d-flex">
                      <img
                        src="dist/img/Star.png"
                        alt="dropdown"
                        width="22"
                        height="22"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        onClick={checkSingle}
                        class="myCheckBox"
                        value="4"
                        checked={result == 4}
                        onChange={(e) => updateResult(e.target.value)}
                        id="satisfaction_symbol"
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Satisfaction
                    </p>
                  </div>

                  {/* content */}
                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "0px 10px",
                      height: "auto",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Highly Satisfied
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Satisfied
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Niether Satisfied nor Dissatisfied
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Dissatisfied
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Highly Disatisfied123
                    </div>
                  </div>
                  {/* end */}
                </div>
              </div>
            </div>

            <div className="row mt-2 border_class preview_response5">
              <div className="col-md-6">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        onClick={checkSingle}
                        class="myCheckBox"
                        value="1"
                        checked={result == 1}
                        onChange={(e) => updateResult(e.target.value)}
                        id="yesNo_symbol"
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Yes or No
                    </p>
                  </div>
                  {/* content */}
                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "5px 10px",
                      height: "145px",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px",
                        color: "#1F3977",
                        fontWeight: "500",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "5px",
                      }}
                    >
                      Yes
                    </div>
                    <div
                      style={{
                        padding: "5px",
                        color: "#1F3977",
                        fontWeight: "500",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "5px",
                      }}
                    >
                      No
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        onClick={checkSingle}
                        class="myCheckBox"
                        value="5"
                        checked={result == 5}
                        onChange={(e) => updateResult(e.target.value)}
                        id="agree_symbol"
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Agree or Disagree
                    </p>
                  </div>

                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "0px 10px",
                      height: "auto",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Strongly Agree
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Agree
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Niether Agree nor Disagree
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Disagree
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Strongly Disagree
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2 border_class preview_response5">
              <div className="col-md-6">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        onClick={checkSingle}
                        class="myCheckBox"
                        value="6"
                        checked={result == 6}
                        onChange={(e) => updateResult(e.target.value)}
                        id="interest_symbol"
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Interest
                    </p>
                  </div>

                  {/* content */}
                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "0px 10px",
                      height: "auto",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Extremly Intrested
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Very Intertsted
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Somewhat Intrested
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Disagree
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Not at all intrested
                    </div>
                  </div>
                  {/* end */}
                </div>
              </div>

              <div className="col-md-6">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        onClick={checkSingle}
                        class="myCheckBox"
                        value="7"
                        checked={result == 7}
                        onChange={(e) => updateResult(e.target.value)}
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Frequency
                    </p>
                  </div>
                  {/* content */}
                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "0px 10px",
                      height: "auto",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Always
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Usually
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Sometime
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Rarely
                    </div>
                    <div
                      style={{
                        padding: "4px",
                        color: "#1F3977",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "4px",
                      }}
                    >
                      Never
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2 border_class preview_response5">
              <div className="col-md-7">
                <div style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <p>
                      <input
                        type="checkbox"
                        name="check"
                        onClick={checkSingle}
                        class="myCheckBox"
                        value="2"
                        checked={result == 2}
                        onChange={(e) => updateResult(e.target.value)}
                      />
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#1F3977",
                        fontSize: "10PX",
                        fontWeight: "600",
                      }}
                    >
                      Custom Answer (min 2)
                    </p>
                  </div>

                  <div
                    style={{
                      border: "1px solid #c4c4c4",
                      padding: "0px 10px",
                      height: "auto",
                      width: "166px",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "3px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          height: "14px",
                          width: "100%",
                          border: "none",
                        }}
                        value={answer1}
                        onChange={(e) => {
                          updateAnswer1(e.target.value);
                        }}
                        placeholder="Fill in your answer 1"
                        required
                      />
                    </div>

                    <div
                      style={{
                        padding: "4px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "3px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          height: "14px",
                          width: "100%",
                          border: "none",
                        }}
                        value={answer2}
                        onChange={(e) => {
                          updateAnswer2(e.target.value);
                        }}
                        placeholder="Fill in your answer 2"
                        required
                      />
                    </div>

                    <div
                      style={{
                        padding: "4px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "3px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          height: "14px",
                          width: "100%",
                          border: "none",
                        }}
                        value={answer3}
                        onChange={(e) => {
                          updateAnswer3(e.target.value);
                        }}
                        placeholder="Fill in your answer 3"
                      />
                    </div>

                    <div
                      style={{
                        padding: "4px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "3px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          height: "14px",
                          width: "100%",
                          border: "none",
                        }}
                        value={answer4}
                        onChange={(e) => {
                          updateAnswer4(e.target.value);
                        }}
                        placeholder="Fill in your answer 4"
                      />
                    </div>

                    <div
                      style={{
                        padding: "4px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "600",
                        background: "#f5f5f5",
                        fontSize: "10px",
                        marginTop: "3px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          height: "14px",
                          width: "100%",
                          border: "none",
                        }}
                        value={answer5}
                        onChange={(e) => {
                          updateAnswer5(e.target.value);
                        }}
                        placeholder="Fill in your answer 5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="d-flex border_class "
              style={{
                paddingRight: "30px",
                background: "#ffffff",
                padding: "8px 30px",
                marginTop: "15px",
                justifyContent: "end",
              }}
            >
              {/* <input
                type="button"
                className=" ml-auto"
                defaultValue="Next Step"
                onClick={() =>closeResponse()}
                value="Cancel"
                style={{ border:"none",marginTop:'10px', color: "#1F3977", background: "transparent", fontWeight: "600", fontSize: "13PX", padding: "8px 12px" }}
              /> */}

              <input
                type="button"
                className=" publish_button"
                defaultValue="Next Step"
                onClick={() => savePolls()}
                value="Publish"
                style={{ fontSize: "12px", width: "160px" }}
                // style={{ fontWeight: "500",height:"37px",width:"66px",marginTop:"8px", border: "none", color: "white", borderRadius: "6px", marginLeft: "5px", backgroundColor: "#1F3977", padding: "9px 24px!important", fontSize: "12PX" }}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "green",
                display: "none",
              }}
              className="saveMessage"
            >
              Data Saved Successfully
            </div>
          </div>
        </div>
      </div>

      {/* ***********************edit schedule & recipient *****************8888 */}
      <div
        className="preview_schedule"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          zIndex: "10",
          display: "none",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "absolute",
            bottom: "0px",
            top: "0",
            right: "5px",
            width: "420px",
            height: "100%",
            overflow: "auto",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Schedule & Recipient
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closeSchedule()}
              alt="dropdown"
              width="15px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div>
            <div className="mt-2 p-0 border_class2">
              <div class="row" style={{ paddingTop: "10px" }}>
                <div class="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        When it should be delivered?
                      </label>

                      <p
                        style={{
                          color: "#EB2424",
                          fontWeight: "600",
                          marginLeft: "3PX",
                        }}
                      >
                        *
                      </p>
                    </div>
                    <div className="d-flex" id="tblFruits">
                      <input
                        type="radio"
                        id="edit_now"
                        name="delivery_Type"
                        value="1"
                        onClick={() => currentDate()}
                        checked={delivered == 1}
                        onChange={(e) => updateDelivered(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="edit_now"
                        onClick={() => currentDate()}
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ marginLeft: "5px" }}>Now</p>
                      </label>
                      <input
                        type="radio"
                        id="edit_later"
                        name="delivery_Type"
                        value="2"
                        checked={delivered == 2}
                        onChange={(e) => updateDelivered(e.target.value)}
                        onClick={() => laterDate()}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="edit_later"
                        onClick={() => laterDate()}
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "15PX",
                          marginTop: "4PX",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ marginLeft: "5px" }}>Later</p>
                      </label>
                    </div>

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0 border_class2">
              <div class="row" style={{ paddingBottom: "10px" }}>
                <div class="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Publish Date/Time
                    </label>

                    <input
                      type="datetime-local"
                      class="input_fields"
                      placeholder="dd-mm-yyyy hh-mm"
                      id="publishdate"
                      value={publishDate}
                      min={todayy}
                      onChange={(e) => updatePublishDate(e.target.value)}
                      name="datetime"
                      style={{
                        fontSize: "10px",
                        color: "black",
                        border: "1px solid #c4c4c4",
                        boxSizing: "border-box",
                        width: "100%",
                        height: "35px",
                        padding: "6px",
                        background: "white",
                      }}
                    />

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0 border_class2">
              <div class="row" style={{ paddingBottom: "10px" }}>
                <div class="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Expiry Date/Time
                    </label>

                    <input
                      type="datetime-local"
                      class="input_fields"
                      placeholder="dd-mm-yyyy hh-mm"
                      // className="publish_date_0n_later"
                      // id="datetime"
                      id="publishdate"
                      value={expireDate}
                      min={todayy}
                      onChange={(e) => updateExpireDate(e.target.value)}
                      name="datetime"
                      style={{
                        fontSize: "10px",
                        color: "black",
                        border: "1px solid #c4c4c4",
                        boxSizing: "border-box",
                        width: "100%",
                        height: "35px",
                        padding: "6px",
                        background: "white",
                      }}
                    />

                    <div
                      class="newsDescription"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Write News Description
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0 border_class2">
              <div class="row">
                <div class="col-md-12">
                  <div
                    className=""
                    style={{ width: "100%", marginTop: "0px" }}
                    id="send_to"
                  >
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                          margin: "10PX 0px 0px 0px",
                        }}
                      >
                        Who are you sending this notification to?
                      </label>

                      <p
                        style={{
                          color: "#EB2424",
                          fontWeight: "600",
                          marginLeft: "3PX",
                          marginTop: "5px",
                          fontSize: "10px",
                        }}
                      >
                        *
                      </p>
                    </div>
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      User type
                    </label>
                    <br />

                    <div className="d-flex" id="sendNotification">
                      <input
                        type="radio"
                        id="all_students"
                        name="user_Type"
                        value="1"
                        checked={sendTo == 1}
                        onChange={(e) => updateSendTo(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />

                      <label
                        for="all_students"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => all_student()}
                      >
                        <p style={{ marginLeft: "5PX" }}>All Students</p>
                      </label>

                      <input
                        type="radio"
                        id="specific_class"
                        name="user_Type"
                        checked={sendTo == 2}
                        onChange={(e) => updateSendTo(e.target.value)}
                        value="2"
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />

                      <label
                        for="specific_class"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "15PX",
                          marginTop: "4PX",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => specific_class()}
                      >
                        <p style={{ marginLeft: "5PX" }}>Specific Recipients</p>
                      </label>
                    </div>
                  </div>

                  <div
                    id="SendMsg"
                    class="SendTo"
                    style={{ marginTop: "-6px", display: "none" }}
                  >
                    <h4
                      class="login-text"
                      style={{
                        color: "red",
                        fontSize: "10PX",
                        marginLeft: "0",
                      }}
                    >
                      Please Select User Type
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 p-0">
              <div class="row">
                <div
                  class="col-md-12"
                  style={{ fontSize: "12px", margin: "8px 20px" }}
                >
                  {student_name}
                </div>
              </div>
            </div>

            <div
              className="d-flex form-buttons mt-3 border_class2"
              style={{
                paddingRight: "30px",
                padding: "8px 30px",
                marginTop: "15px",
                justifyContent: "end",
              }}
            >
              {/* <input
                type="button"
                className=" ml-auto"
                defaultValue="Next Step"
                onClick={() => closeSchedule()}
                value="Cancel"
                style={{ borderRadius: "5px", color: "#1F3977", background: "transparent", fontWeight: "600", fontSize: "13PX", padding: "8px 12px" }}
              /> */}

              {/* <input
                      type="button"
                      className=" ml-auto"
                      value="Cancel"
                      onClick={() =>closeSchedule()}
                      style={{border:"none", color: "#1F3977", background: "transparent", fontWeight: "600", fontSize: "13PX", padding: "8px 12px" }}
                    /> */}

              <input
                type="button"
                className=" publish_button"
                defaultValue="Next Step"
                onClick={() => savePolls()}
                value="Publish"
                style={{ fontSize: "12px", width: "160px" }}
                // style={{ fontWeight: "500",height:"37px",width:"66px",marginTop:"8px", border: "none", color: "white", borderRadius: "6px", marginLeft: "5px", backgroundColor: "#1F3977", padding: "9px 24px!important", fontSize: "12PX" }}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "green",
                display: "none",
              }}
              className="recepientMsg"
            >
              Data Saved Successfully
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
