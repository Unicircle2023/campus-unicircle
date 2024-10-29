import React, { useState, useEffect, useMemo } from "react";

import styled from "styled-components";
import Previous_next_button from "./Previous_next_button";
import DataTable from "react-data-table-component";
import axios from "axios";
import { PersonaRecipient } from "./PersonaRecipient";
import { Recipient } from "./Recipient";
import { NewRecipient } from "./NewRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import $ from "jquery";
import moment from "moment";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DonutChart from "react-donut-chart";
import "@patternfly/react-core/dist/styles/base.css";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
  autoComplete:"off"
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const customStyles = {
  rows: {
    style: {
      // background: "rgba(228, 233, 243, 0.6)",
      // marginTop: "3PX",
      border: "none",
      fontSize: "10px",
      fontWeight: "500",
    },
  },
  headCells: {
    style: {
      color: "#1F3977",
      fontWeight: "600",
      fontSize: "10px",
    },
  },

  table: {
    style: {
      padding: "0px 10px 0 10px",
      marginTop: "0PX",
      // height: "180px",
      // minHeight:"414px"
    },
  },
};
export function PollDetails(props) {
  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };
  $(".donutchart-innertext-label");
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const history = useHistory();

  const [category, updateCategory] = useState("");
  const [categoryId, updateCategoryId] = useState("");
  const [question, updateQuestion] = useState("");
  const [questionType, updateQuestionType] = useState("");
  const [answer1, updateAnswer1] = useState("");
  const [answer2, updateAnswer2] = useState("");
  const [answer3, updateAnswer3] = useState("");
  const [answer4, updateAnswer4] = useState("");
  const [answer5, updateAnswer5] = useState("");
  const [deliveryType, updateDeliveryType] = useState("");
  const [publishDate, updatePublishDate] = useState("");
  const [expireDate, updateExpireDate] = useState("");
  const [pollStatus, updateStatus] = useState("");
  const [pollSendTo, updatePollSendTo] = useState("");
  const [editSendToStudent, updateEditSendToStudent] = useState([]);

  const [getPollsTitle, updateGetPollsTitle] = useState([]);
  const [getPollsID, updateGetPollsID] = useState("");

  const [isEditLoading, setIsEditLoading] = useState(false);

  const [childData, setChildData] = useState({});
  const [childPollData, setChildPollData] = useState([]);
  const [childId, setChildId] = useState({});
  const passEditData = (pollId) => {
    setChildData(pollId);
    edit_category(pollId);
  };

  const passDeleteData = (pollId) => {
    setChildData(pollId);
    delete_category(pollId);
  };
  const passData = (id, data) => {
    setChildId(id);
    setChildPollData(data);
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);
    setChildPollData(Pdata);
  };

  function update_edited_News() {
    $(".editWithPassModal").show();
  }

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
    updateErrorMessagePersona(personaResponse.data.message);
    updateErrorCodePersona(personaResponse.data.error_code);
    $(".personaMsg").show();

    setTimeout(function() {
      $(".personaMsg").hide();
    }, 3000);
  }

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
      setData(excelResponse.data.data);
      updateExcelError_code(excelResponse.data.error_code);
      updateExcelError_message(excelResponse.data.message);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function cancel_delete_poll() {
    $(".delete_preview_polls").hide();
    $(".preview_polls").show();
  }

  function closePreviewDescription() {
    $(".preview_polls").hide();
  }
  function closeRecipient() {
    $(".user_type").hide();
  }
  async function previewDeleteWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);
    if (deleteNewsResponse.data.error_code == 200) {
      previewDeleteNewsApi();
    }
  }

  async function previewDeleteNewsApi() {
    try {
      const formData = new FormData();

      formData.append("poll_id", childData);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_polls",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  var expDate = "";
  var startDate = "";
  var TodaysDate = "";
  var pubDate = "";

  pubDate = moment(publishDate).format("DD MMM YYYY");
  expDate = moment(expireDate).format("DD MMM YYYY");
  var currDate = new Date();
  TodaysDate = moment(currDate).format("DD MMM YYYY");

  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");

  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [getPollID, updateGetPollID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pId, updatePid] = useState("");

  const series = [44, 55, 41, 17, 15];
  const options = {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const [categoryIdForPreview, updateCategoryIdForPreview] = useState("");

  async function viewDescription(pollId) {
    $(".preview_polls").show();
  }
  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  function close_edit_modal() {
    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
  }
  function close_preview_edit_modal() {
    $(".preview_category").hide();
    $(".preview_polls").show();
    $(".edit_campus_modal").hide();
  }

  const tableCss = () => {
    $(".jPpcqH").css("height", "125px");
  };

  useEffect(() => {
    fetchList();
    getUserDetails();
  }, []);
  async function getUserDetails() {
    const fetchResponse = await axios.get(
      process.env.REACT_APP_API_KEY + "admin_get_Primary_user_info",

      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }

  async function fetchList() {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const fetchPollResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_poll",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      setIsLoading(false);
      setData(fetchPollResponse.data.data);
      const PollErrorCode = fetchPollResponse.data.error_code;
      const PollsErrorMsg = fetchPollResponse.data.message;
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  function currentDate() {
    var date = new Date();
    const getDate = moment(date).format("YYYY-MM-DDThh:mm");
    updatePublishDate(getDate);
  }
  function laterDate() {
    $("#new_publishdate").hide();
    $("#publishdate").show();
  }

  const handleButton = () => {
    $(".edit_popup_password").hide();
    $(".delete_popup_password").hide();
    fetchList();
    toast.success("Poll Deleted Successfully!!");
  };

  const handleEditButton = () => {
    $(".editWithPassModal").hide();
    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
    fetchList();
    toast.success("Poll Edited Successfully!!");
  };

  function deletePolls(poll_id, questions) {
    updateGetPollsTitle(questions);
    updateGetPollsID(poll_id);
    $(".deletePollModal").show();
    $(".edit_campus_modal").hide();
  }

  function close_delete_modal() {
    $(".delete_container").hide();
    $(".view_container").hide();
    $(".edit_campus_modal").hide();
  }

  const [editQuestionType, updateEditQuestionType] = useState("");
  const [studentId, updateStudentId] = useState("");
  async function edit_category(id) {
    $(".edit_campus_modal").hide();
    $(".preview_category").show();
    const formData = new FormData();

    formData.append("poll_id", id);

    const fetchPollResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_poll",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    if (fetchPollResponse.data.error_code == 200) {
      fetchPollResponse.data.data.map((item) => {
        updateCategoryId(item.category_id);
        updateCategory(item.category);
        updateQuestion(item.questions);
        updateQuestionType(item.polls_que_type);
        if (item.polls_que_type == 2) {
          updateAnswer1(item.option_1);
          updateAnswer2(item.option_2);
          updateAnswer3(item.option_3);
          updateAnswer4(item.option_4);
          updateAnswer5(item.option_5);
        }
        updateDeliveryType(item.delivery_type);
        updatePublishDate(item.publish_date);
        updateExpireDate(item.expire_date);

        updatePollSendTo(item.send_to);
        if (item.send_to == 2) {
          const name = item.sent_to_student.map((item) => item.student_name);
          const student_id = item.sent_to_student.map(
            (item) => item.student_id
          );
          setChildPollData(name);
          updateStudentId(student_id);
        } else {
        }
      });
    }
  }

  function delete_category(id) {
    $(".edit_campus_modal").hide();
    $(".preview_polls").hide();
    $(".delete_preview_polls").show();
  }

  async function deleteNewsApi() {
    try {
      $(".edit_campus_modal").hide();
      const formData = new FormData();

      formData.append("poll_id", getPollsID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_polls",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        $(".delete_popup_password").hide();
          updateDeletePassword("");
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [deletePassword, updateDeletePassword] = useState("");

  async function deleteWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);
    if (deleteNewsResponse.data.error_code == 200) {
      updateDeletePassword("");
      deleteNewsApi();
    }else{
      toast.error(deleteNewsResponse.data.message);
    }
  }
  const [pollsCount, updatePollsCount] = useState([]);
  const [positiveCount, updatePositiveCount] = useState("");
  const [negativeCount, updateNegativeCount] = useState("");
  const [neutralCount, updateNeutralCount] = useState("");
  const [noCount, updateNoCount] = useState("");
  const [viewQuestion, updateViewQuestion] = useState("");

  async function viewGraph(polls_id, questions) {
    updatePollId(polls_id);
    $(".edit_campus_modal").hide();
    updateViewQuestion(questions);
    $(".view_container").show();
    try {
      const formData = new FormData();

      formData.append("poll_id", polls_id);

      const fetchPollResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_poll_analysis",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      console.log("fetchPollResponse------------------", fetchPollResponse);
      updatePollsCount(fetchPollResponse.data.error_code);
      if (fetchPollResponse.data.error_code == 404) {
        updatePositiveCount("0%");
        updateNegativeCount("0%");
        updateNeutralCount("0%");
        updateNoCount("0%");
      } else {
        fetchPollResponse.data.data.map((pollsItem) => {
          updatePositiveCount(pollsItem.positive);
          updateNegativeCount(pollsItem.negative);
          updateNeutralCount(pollsItem.netural);
          updateNoCount(pollsItem.no);
        });
      }
    } catch (e) {
      console.log("ERROR OCCURED", e);
    }
  }

  const positiveNumber = positiveCount;
  const negativeNumber = negativeCount;
  const neutralNumber = neutralCount;
  const noNumber = noCount;
  const reactDonutChartdata = [
    {
      label: "Positive",
      value: positiveNumber,
      color: "green",
    },

    {
      label: "Negative",
      value: negativeNumber,
      color: "red",
    },
    {
      label: "Neutral",
      value: neutralNumber,
      color: "purple",
    },
    {
      label: "No Answer",
      value: noNumber,
      color: "blue",
    },
  ];
  const reactDonutChartBackgroundColor = ["green", "red", "purple", "blue"];
  const reactDonutChartInnerRadius = 0.8;
  const reactDonutChartSelectedOffset = 0;
  const reactDonutChartOuterRadius = 0.7;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      // console.log("item", item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };

  const openActionsModal = (e) => {
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };

  function deletePopupFunc() {
    $(".deletePollWithPass").show();
    $(".deletePollModal").hide();
  }

  function closeDeleteNewsModal() {
    $(".deletePollModal").hide();
    $(".edit_campus_modal").hide();
    $(".deletePollWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("")
  }

  const columns = [
    {
      name: "List of polls Created",
      wrap: true,
      width: "45%",

      cell: (row) => {
        return (
          <div className="d-flex">
            <div
              onClick={() => viewDescription(row.poll_id)}
              style={{
                marginLeft: "10px",
                color: "#1F3977",
                cursor: "pointer",
                fontFamily: "poppins",
                fontStyle: "normal",
              }}
            >
              {row.questions}
            </div>
          </div>
        );
      },
    },
    {
      name: "Start Date",

      wrap: true,
      width: "auto",
      cell: (row) => {
        const dateString = row.publish_date;
        startDate = moment(dateString).format("DD MMM YYYY");
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => viewDescription(row.poll_id)}
          >
            {startDate}
          </div>
        );
      },
    },
    {
      name: "Expiry Date",

      wrap: true,
      width: "auto",
      cell: (row) => {
        var expire_date = row.expire_date;
        expDate = moment(expire_date).format("DD MMM YYYY");

        return (
          <div>
            {row.expire_date == "" ? (
              <div>-</div>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => viewDescription(row.poll_id)}
              >
                {expDate}
              </div>
            )}
          </div>
        );
      },
    },
    {
      name: "Status",

      wrap: true,
      width: "auto",
      width: "auto",
      cell: (row) => {
        // expire date
        const Exp = row.expire_date;
        var expDate = moment(Exp).format("YYYY-MM-DD HH:mm");

        // todays date
        var date = new Date();
        var todayy = moment(date).format("YYYY-MM-DD HH:mm");
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => viewDescription(row.poll_id)}
          >
            {expDate >= todayy ? (
              <div
                style={{
                  color: "#2D5DD0",
                  fontStyle: "normal",
                }}
              >
                Schedule
              </div>
            ) : expDate <= todayy ? (
              <div
                style={{
                  color: "#15A312",
                  fontStyle: "normal",
                }}
              >
                Completed
              </div>
            ) : (
              <div
                style={{
                  color: "red",
                  fontStyle: "normal",
                }}
              >
                Last Date
              </div>
            )}
          </div>
        );
      },
    },

    {
      name: "",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <>
            <div className="action_buttons_end_css">
              <button
                className="all_action_buttons"
                onClick={() => openActionsModal(row.poll_id)}
              >
                Actions
              </button>

              <div
                class={`edit_campus_modal actions_modal${row.poll_id}`}
                id=""
                style={{
                  display: "none",
                  position: "absolute",
                  top: "22px",
                  right: "0px",
                }}
              >
                <div className="  ">
                  <div className=" d-flex ml-auto">
                    <img
                      className="campus_img ml-auto"
                      src="dist/img/Cancel.png"
                      onClick={closeActionsModal}
                    />
                  </div>
                </div>

                <a
                  className=" d-flex flex-row hover_class"
                  href="#view"
                  onClick={() => viewGraph(row.poll_id, row.questions)}
                  style={{ color: "#000" }}
                >
                  <div className=" d-flex flex-row">
                    <div>
                      <img className="campus_img" src="dist/img/Chart1.png" />
                    </div>
                    <div className="campus_inner_div">
                      <span>Results</span>
                    </div>
                  </div>
                </a>

                <div
                  className=" d-flex flex-row hover_class"
                  onClick={() =>
                    editNews(
                      row.poll_id,
                      row.polls_que_type,
                      row.questions,
                      row.publish_date,
                      row.expire_date,
                      row.category,
                      row.category_id,
                      row.option_1,
                      row.option_2,
                      row.option_3,
                      row.option_4,
                      row.option_5,
                      row.send_to,
                      row.send_to_student,
                      row.delivery_type
                    )
                  }
                >
                  <div className=" d-flex flex-row">
                    <div>
                      <img className="campus_img" src="dist/img/Pencil.png" />
                    </div>
                    <div className="campus_inner_div">
                      <span>Edit</span>
                    </div>
                  </div>
                </div>

                <button
                  className=" d-flex flex-row hover_class"
                  onClick={() => deletePolls(row.poll_id, row.questions)}
                  style={{ color: "#000" }}
                >
                  <div className=" d-flex flex-row">
                    <div>
                      <img
                        className="campus_img"
                        src={require("../images/delete.png")}
                      />
                    </div>
                    <div className="campus_inner_div">
                      <span>Delete</span>
                    </div>
                  </div>
                </button>
              </div>

              <div
                className="modal fade deletePollModal"
                id="deletePollModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete Message
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={closeDeleteNewsModal}
                      >
                        <span aria-hidden="true">
                          <img
                            src="dist/img/Cancel.png"
                            className="cancel_img"
                          />
                        </span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p className="pl-3 pb-2">
                        Your thoughtful reconsideration is encouraged, as this
                        information holds significance. Thank you for your
                        consideration.
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="delete_cancel_btn"
                        data-dismiss="modal"
                        onClick={closeDeleteNewsModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="delete_btn"
                        onClick={deletePopupFunc}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade deletePollWithPass"
                id="deletePollWithPass"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="delet_with_pass_main_contener">
                      <div className="modal-header delet_with_pass_header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                          Delete Poll
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={closeDeleteNewsModal}
                        
                        >
                          <span aria-hidden="true">
                            <img
                              src="dist/img/Cancel.png"
                              className="cancel_img"
                              style={{background:"white"}}
                            />
                          </span>
                        </button>
                      </div>
                   

                    <div className="modal-body">
                      <div className="delet_with_pass_body_main_div">
                        <div className="d-flex">
                          <p style={{ color: "#2D5DD0" }}>Warning:</p>
                          <p style={{ marginLeft: "5px" }}>
                            You are deleting a screen. This operation cannot be
                          </p>
                        </div>

                        <p>
                          {" "}
                          undone. Please type the password of the screen Admin
                          into the box below to confirm you really want to do
                          this.
                        </p>

                        <div className="mt-4">
                          <div className="row">
                            <div className="col-md-4 d-flex p-0" style={{alignItems:"center"}}>
                            <p>
                            Admin Password:
                          </p>
                            </div>
                            <div className="col-md-8 p-0">
                            <input
                            type="password"
                            className="delet_with_pass_input"
                            value={deletePassword}
                            onChange={(e) =>
                              updateDeletePassword(e.target.value)
                            }
                          />
                            </div>
                          </div>
                          
                          
                        </div>
                        <div className="d-flex">
                          <div style={{ marginTop: "10PX" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer delet_with_pass_footer">
                    <input
                            type="button"
                            className="delet_with_pass_delete_button"
                            value="Delete"
                            onClick={() => deleteWithPassword()}
                          />
                     
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade editWithPassModal"
                id="editWithPassModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="delet_with_pass_main_contener">
                      <div className="modal-header delet_with_pass_header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                          Edit Poll
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={closeDeleteNewsModal}
                        
                        >
                          <span aria-hidden="true">
                            <img
                              src="dist/img/Cancel.png"
                              className="cancel_img"
                              style={{background:"white"}}
                            />
                          </span>
                        </button>
                      </div>
                   

                    <div className="modal-body">
                      <div className="delet_with_pass_body_main_div">
                        <div className="d-flex">
                          <p style={{ color: "#2D5DD0" }}>Warning:</p>
                          <p style={{ marginLeft: "5px" }}>
                            You are deleting a screen. This operation cannot be
                          </p>
                        </div>

                        <p>
                          {" "}
                          undone. Please type the password of the screen Admin
                          into the box below to confirm you really want to do
                          this.
                        </p>

                        <div className="mt-4">
                          <div className="row">
                            <div className="col-md-4 d-flex p-0" style={{alignItems:"center"}}>
                            <p>
                            Admin Password:
                          </p>
                            </div>
                            <div className="col-md-8 p-0">
                            <input
                            type="password"
                            className="delet_with_pass_input"
                            value={deletePassword}
                            onChange={(e) =>
                              updateDeletePassword(e.target.value)
                            }
                          />
                            </div>
                          </div>
                          
                          
                        </div>
                        <div className="d-flex">
                          <div style={{ marginTop: "10PX" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer delet_with_pass_footer">
                    <input
                            type="button"
                            className="delet_with_pass_delete_button"
                            value="Edit"
                            onClick={() => editWithPassword()}
                          />
                     
                    </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* <div className="d-flex">
            <a
              className="cta"
              href="#edit"
              onClick={() =>
                editNews(
                  row.poll_id,
                  row.polls_que_type,
                  row.questions,
                  row.publish_date,
                  row.expire_date,
                  row.category,
                  row.category_id,
                  row.option_1,
                  row.option_2,
                  row.option_3,
                  row.option_4,
                  row.option_5,
                  row.send_to,
                  row.send_to_student,
                  row.delivery_type
                )
              }
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={require("../images/Pencil.png")}
                alt="edit"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </a>

            <a
              className="cta"
              href="#delete"
              onClick={() => deletePolls(row.poll_id, row.questions)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                style={{ width: "20px", height: "20px", marginLeft: "2px" }}
                src={require("../images/delete.png")}
              />
              &nbsp;
            </a>

            <a
              className="cta"
              href="#view"
              onClick={() => viewGraph(row.poll_id, row.questions)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={require("../images/Doughnut Chart.png")}
                alt="view"
                style={{
                  marginLeft: "5px",
                  width: "20px",
                  height: "20px",
                  color: "blue",
                }}
              />
            </a>
          </div> */}
          </>
        );
      },
    },
  ];

  const [stdData, updateStdData] = useState([]);
  const [errorCode, updateErrorCode] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  async function viewStdentAnswer() {
    const formData = new FormData();
    formData.append("poll_id", pollId);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_poll_answer_result",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    updateErrorCode(eventResponse.data.error_code);
    updateErrorMessage(eventResponse.data.message);
    if (eventResponse.data.error_code == 200) {
      updateStdData(eventResponse.data.data);
    }
  }
  const student_view = [
    {
      name: "Student Name",
      selector: "name",
      wrap: true,
      width: "50%",
    },

    {
      name: "Answer",
      selector: "answer",
      wrap: true,
      width: "50%",
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems =
    data &&
    data.filter(
      (item) =>
        JSON.stringify(item)
          .toLowerCase()
          .indexOf(filterText.toLowerCase()) !== -1
    );

  const filteredPollItems = stdData.filter(
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

    return <div></div>;
  }, [filterText, resetPaginationToggle]);

  // edit polls
  const [pollId, updatePollId] = useState("");

  const [editStartDate, updateEditStartDate] = useState("");

  const [editCategory, updateEditCategory] = useState("");
  const [editSendTo, updateEditSendTo] = useState("");

  function editNews(
    poll_id,
    polls_que_type,
    questions,
    publish_date,
    expire_date,
    category,
    cat_id,
    option1,
    option2,
    option3,
    option4,
    option5,
    send_to,
    send_to_student,
    delivery_type
  ) {
    $(".edit_container").show();
    updateCategoryId(cat_id);
    updatePollId(poll_id);
    updateQuestionType(polls_que_type);
    updateQuestion(questions);

    updateDeliveryType(delivery_type);
    updateEditStartDate(publish_date);
    updateExpireDate(expire_date);
    updateEditCategory(category);
    updateEditSendTo(send_to);

    if (send_to == 2) {
      const name = send_to_student.map((item) => item.student_name);
      const student_id = send_to_student.map((item) => item.student_id);
      setChildPollData(name);
      updateStudentId(student_id);
    }

    // updateEditSendToStudent(send_to_student)
    // if (send_to == 2) {
    //   send_to_student.map((item) => {

    //     childPollData.push(item.student_name)

    //   })
    // }

    updateAnswer1(option1);
    updateAnswer2(option2);
    updateAnswer3(option3);
    updateAnswer4(option4);
    updateAnswer5(option5);
  }

  function all_student() {
    $(".user_type").hide();
  }
  const [userType, updateUserType] = useState([]);
  async function specific_class() {
    $(".user_type").show();
    // passSpecificUserData(childId);
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

  // var delivery_id = ""
  // if (deliveryType == "Now.") {
  //   delivery_id = 1
  // }
  // else {
  //   delivery_id = 2
  // }

  // var sendTo_id = ""
  // if (editSendTo == "All Students.") {
  //   sendTo_id = 1
  // }
  // else {
  //   sendTo_id = 2
  // }
  async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();

    formData.append("poll_id", pollId);
    formData.append("category", categoryId);
    formData.append("polls_que_type", questionType);
    formData.append("delivery_type", deliveryType);
    formData.append("questions", question);
    formData.append("option_1", answer1);
    formData.append("option_2", answer2);
    formData.append("option_3", answer3);
    formData.append("option_4", answer4);
    formData.append("option_5", answer5);
    formData.append("publish_date", editStartDate);
    formData.append("expire_date", expireDate);
    formData.append("send_to", editSendTo);
    formData.append("users", childId);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_poll",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      $(".editWithPassModal").hide();
      updateDeletePassword("");
      handleEditButton();
    } else {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".required_filed").show();
      }, 3000);
    }
  }
  async function previewEditWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);
    if (deleteNewsResponse.data.error_code == 200) {
      previewUpdateForm();
    }
  }
  async function previewUpdateForm() {
    setIsEditLoading(true);
    const formData = new FormData();

    formData.append("poll_id", childData);
    formData.append("category", categoryIdForPreview);
    formData.append("polls_que_type", questionType);
    formData.append("delivery_type", deliveryType);
    formData.append("questions", question);
    formData.append("option_1", answer1);
    formData.append("option_2", answer2);
    formData.append("option_3", answer3);
    formData.append("option_4", answer4);
    formData.append("option_5", answer5);
    formData.append("publish_date", publishDate);
    formData.append("expire_date", expireDate);
    formData.append("send_to", pollSendTo);
    formData.append("users", childId);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_poll",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    }
  }

  async function editWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);
    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }else{toast.error(deleteNewsResponse.data.message)}
  }

  const [pollsCategory, updatePollsCategory] = useState([]);

  async function fetchPollsCategoryList() {
    const token = localStorage.getItem("Token");

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
      const PollsCategoryErrorCode = fetchPollsListResponse.data.error_code;
      const PollsCategoryErrorMsg = fetchPollsListResponse.data.message;
      if (PollsCategoryErrorCode == 200) {
        const PollsCategoryListArray = fetchPollsListResponse.data.data;
        updatePollsCategory(PollsCategoryListArray);
      } else {
        updatePollsCategory([]);
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
    tableCss();
  }, []);

  function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName("check");
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
  }

  const close_welcome_modal = () =>{
    $(".welcome_modal").hide();
  }

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Poll</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div className="preview_form">
              <div className="edit_top_label">
                <p>Category & Question</p>
              </div>

              <div className="edit_border_class">
                <div class="row">
                  <div class="col-md-3">
                    <div>
                      <label className="all_labels">Category :</label>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <select
                      className="form-select form-select-sm edit_inputs_class"
                      id="pollsCategory"
                      aria-label=".form-select-sm example"
                      onChange={(e) => updateCategoryId(e.target.value)}
                    >
                      <option
                        selected="selected"
                        value={categoryId}
                        style={{
                          padding: "6px",
                          fontSize: "11PX",
                          fontWeight: "600",
                        }}
                      >
                        {editCategory}
                      </option>

                      {pollsCategory.length > 0 ? (
                        pollsCategory.map((item, index) => {
                          return (
                            <option value={item.cat_id} key={index}>
                              {item.category_name}
                            </option>
                          );
                        })
                      ) : (
                        <div>Data not Found</div>
                      )}
                    </select>
                    <div
                      class="ValidReason"
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
                        Please Enter Reason Fo Appointment
                      </h4>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div>
                      <label className="all_labels">Question :</label>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <input
                      type="name"
                      id="validreason"
                      className="edit_inputs_class"
                      autoComplete="true"
                      onChange={(e) => updateQuestion(e.target.value)}
                      value={question}
                    />
                    <div
                      class="ValidReason"
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
                        Please Enter Reason Fo Appointment
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* responses */}
              <div
                className="mt-2 edit_border_class edit_row_padding"
                style={{ height: "385px" }}
              >
                <div className="row mt-1">
                  <div className="col-md-4" style={{ padding: "0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="Stars"
                            checked={editQuestionType == "Stars"}
                            onChange={(e) => updateQuestionType(e.target.value)}
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
                          height: "120px",
                        }}
                      >
                        <div className="d-flex">
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                        </div>

                        <div className="d-flex">
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                        </div>

                        <div className="d-flex">
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                        </div>

                        <div className="d-flex">
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                        </div>

                        <div className="d-flex">
                          <img
                            src="dist/img/Star.png"
                            alt="dropdown"
                            width="15"
                            height="15"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" style={{ padding: "0 2px 0 0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="4"
                            checked={questionType == 4}
                            onChange={(e) => updateQuestionType(e.target.value)}
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
                          height: "120px",
                        }}
                      >
                        <div className="edit_polls_response">
                          Highly Satisfied
                        </div>
                        <div className="edit_polls_response">Satisfied</div>
                        <div className="edit_polls_response">
                          Niether Satisfied nor Dissatisfied
                        </div>
                        <div className="edit_polls_response">Dissatisfied</div>
                        <div className="edit_polls_response">
                          Highly Disatisfied
                        </div>
                      </div>
                      {/* end */}
                    </div>
                  </div>
                  <div className="col-md-4" style={{ padding: "0 2px 0 0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="1"
                            checked={questionType == 1}
                            onChange={(e) => updateQuestionType(e.target.value)}
                            id="yesNo_symbol"
                          />
                        </p>
                        <p
                          style={{
                            marginLeft: "10px",
                            color: "#1F3977",
                            fontSize: "11PX",
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
                          height: "120px",
                        }}
                      >
                        <div className="edit_polls_response">Yes</div>
                        <div className="edit_polls_response">No</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-md-4" style={{ padding: "0 2px 0 0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="5"
                            checked={questionType == 5}
                            onChange={(e) => updateQuestionType(e.target.value)}
                            id="agree_symbol"
                          />
                        </p>
                        <p
                          style={{
                            marginLeft: "10px",
                            color: "#1F3977",
                            fontSize: "11PX",
                            fontWeight: "600",
                          }}
                        >
                          Agree or Disagree
                        </p>
                      </div>

                      <div
                        style={{
                          border: "1px solid #c4c4c4",
                          padding: "4px 10px",
                          height: "120px",
                        }}
                      >
                        <div className="edit_polls_response">
                          Strongly Agree
                        </div>
                        <div className="edit_polls_response">Agree</div>
                        <div className="edit_polls_response">
                          Niether Agree nor Disagree
                        </div>
                        <div className="edit_polls_response">Disagree</div>
                        <div className="edit_polls_response">
                          Strongly Disagree
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{ padding: "0 2px 0 0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="6"
                            checked={questionType == 6}
                            onChange={(e) => updateQuestionType(e.target.value)}
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
                          padding: "4px 5px",
                          height: "120px",
                        }}
                      >
                        <div className="edit_polls_response">
                          Extremly Intrested
                        </div>
                        <div className="edit_polls_response">
                          Very Intertsted
                        </div>
                        <div className="edit_polls_response">
                          Somewhat Intrested
                        </div>
                        <div className="edit_polls_response">Disagree</div>
                        <div className="edit_polls_response">
                          Not at all intrested
                        </div>
                      </div>
                      {/* end */}
                    </div>
                  </div>
                  <div className="col-md-4" style={{ padding: "0 2px 0 0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="7"
                            checked={questionType == 7}
                            onChange={(e) => updateQuestionType(e.target.value)}
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
                          padding: "4px 10px",
                          height: "120px",
                        }}
                      >
                        <div className="edit_polls_response">Always</div>
                        <div className="edit_polls_response">Usually</div>
                        <div className="edit_polls_response">Sometime</div>
                        <div className="edit_polls_response">Rarely</div>
                        <div className="edit_polls_response">Never</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-4" style={{ padding: "0 2px 0 0" }}>
                    <div style={{ padding: "10px" }}>
                      <div className="d-flex">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            onclick={onlyOne(this)}
                            value="2"
                            checked={questionType == 2}
                            onChange={(e) => updateQuestionType(e.target.value)}
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
                          Custom Answer
                        </p>
                      </div>

                      <div
                        style={{
                          border: "1px solid #c4c4c4",
                          padding: "4px 10px",
                          height: "120px",
                        }}
                      >
                        <div className="edit_polls_response">
                          <input
                            type="text"
                            className="cutsome_answers"
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
                          />
                        </div>

                        <div className="edit_polls_response">
                          <input
                            type="text"
                            className="cutsome_answers"
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
                          />
                        </div>

                        <div className="edit_polls_response">
                          <input
                            type="text"
                            className="cutsome_answers"
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

                        <div className="edit_polls_response">
                          <input
                            type="text"
                            className="cutsome_answers"
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

                        <div className="edit_polls_response">
                          <input
                            type="text"
                            className="cutsome_answers"
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
              </div>
              {/* delivery type */}

              {/* <div className="mt-1 border_class2 edit_row_padding">
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

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                      <div className="d-flex" id="tblFruits">
                        <input
                          type="radio"
                          id="now"
                          name="editDeliveryType"
                          value="1"
                          checked={deliveryType == 1}
                          onChange={(e) => updateDeliveryType(e.target.value)}
                          onClick={() => currentDate()}
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        />
                        <label
                          for="now"
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
                          id="later"
                          name="editDeliveryType"
                          value="2"
                          checked={deliveryType == 2}
                          onClick={() => laterDate()}
                          onChange={(e) => updateDeliveryType(e.target.value)}
                          style={{
                            marginLeft: "78px",
                            width: "20px",
                            height: "20px",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        />
                        <label
                          for="later"
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
              </div> */}

              {/* start time */}
              {/* <div className="mt-1 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-6">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Start Date
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="datetime-local"
                        onChange={(e) => updateEditStartDate(e.target.value)}
                        // placeholder="Enter Your Reason For Appointment..."
                        value={editStartDate}
                        className="input_fields all_edit_inputs"
                        id="publishdate"
                        name="birthdaytime"
                        
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="edit_left_padding">
                      <div className="d-flex">
                        <label className="all_labels">
                          Expire Date
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                      <input
                        type="datetime-local"
                        onChange={(e) => updateExpireDate(e.target.value)}
                        value={expireDate}
                        id="expiredate"
                        className="input_fields all_edit_inputs"
                        name="birthdaytime"
                        
                      />

                      <div
                        class="EndTime"
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
                          Please Select End Time
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* user type */}
              {/* <div className="mt-1 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                      id="send_to"
                    >
                      
                      <div className="d-flex">
                        <label className="all_labels">
                          Who are you sending this notification to?
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                      <label className="all_labels">
                        User type
                      </label>
                      
                      <div className="d-flex" id="sendNotification">
                        <input
                          type="radio"
                          id="all students"
                          name="editUserType"
                          value="1"
                          checked={editSendTo == 1}
                          onChange={(e) => updateEditSendTo(e.target.value)}
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        />

                        <label
                          for="all students"
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
                          id="specific class"
                          name="editUserType"
                          value="2"
                          checked={editSendTo == 2}
                          onChange={(e) => updateEditSendTo(e.target.value)}
                          style={{
                            marginLeft: "78px",
                            width: "20px",
                            height: "20px",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        />

                        <label
                          for="specific class"
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
                          <p style={{ marginLeft: "5PX" }}>
                            Specific Recipients
                          </p>
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
              </div> */}

              <div className="">
                <div class="row">
                  <div
                    class="col-md-12"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {editSendTo == 2 ? (
                      <div>{childPollData.join(", ")}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex mt-2 edit_buttons_div border_class2">
               
                  <button
                    className="edit_cancel_button"
                    value="Cancel"
                    onClick={() => close_edit_modal()}
                  >Cancel</button>

                  <button
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edited_News()}
                  >Update</button>
              
              </div>
            </div>

            <div
              className="required_filed"
              style={{
                display: "none",
                fontSize: "12px",
                textAlign: "center",
                color: "red",
              }}
            >
              Please Fill The Require Field !!!
            </div>
          </div>
        </div>
      </div>

      {/* edit popuop with password */}
      <div
        id="edit_with_protection"
        className="modaloverlay edit_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Edit Polls
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are editing a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4 delete_message">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Edit"
                onClick={() => editWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="delete" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message?
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure You Want To Delete This Poll
              </h2>

              <div className="d-flex mt-3">
                <a
                  onClick={close_delete_modal}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    value="Cancel"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#c4c4c4",
                      fontSize: "13PX",
                      padding: "8px 12px",
                    }}
                  />
                </a>

                <a
                  className="cta"
                  href="#delete_with_protection"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Delete"
                    // onClick={() =>deleteMessage()}
                    style={{
                      borderRadius: "5px",
                      marginRight: "7px",
                      backgroundColor: "#d21f3c",
                      fontSize: "13PX",
                      padding: "8px 12px",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>

      {/* delete popuop with password */}
      <div
        id="delete_with_protection"
        className="modaloverlay delete_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Poll
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are deleting a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                // className="create_btn"
                // id="delete_single_student"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Delete"
                onClick={() => deleteWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="view" className="modaloverlay view_container">
        <div className="modalContainer">
          <div className="card-body" style={{ padding: "8px 15px 0px 15px" }}>
            <div>
              <div className="d-flex">
                <Link
                  to="/polls"
                  onClick={close_delete_modal}
                  style={{ marginLeft: "auto" }}
                >
                  <img
                    src={require("../images/Cancel.png")}
                    style={{ width: "20px", height: "20px" }}
                  />
                </Link>
              </div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "11PX" }}
              >
                Donut chart for Polls
              </p>
              <div
                style={{
                  fontSize: "10px",
                  color: "#15a312",
                  fontWeight: "500",
                }}
              >
                Polls Question - {viewQuestion}
              </div>
              <div className="mt-2" style={{ height: "300px" }}>
                <p>
                  {pollsCount == 404 ? <div>No answer found...!!</div> : ""}
                </p>
                <DonutChart
                  width={630}
                  height={450}
                  onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
                  strokeColor={reactDonutChartStrokeColor}
                  data={reactDonutChartdata}
                  colors={reactDonutChartBackgroundColor}
                  innerRadius={reactDonutChartInnerRadius}
                  selectedOffset={reactDonutChartSelectedOffset}
                  onClick={(item, toggled) =>
                    reactDonutChartHandleClick(item, toggled)
                  }
                />
              </div>

              {/* <div className="d-flex mt-3">

                <div style={{ marginLeft: "auto" }}>
                  <input
                    type="button"
                    className="create_btn"
                    value="View More"
                    onClick={() => viewStdentAnswer()}
                    style={{ borderRadius: "5px", backgroundColor: "#1f3977", fontSize: "11PX", padding: "8px 12px", marginBottom: "15px" }}
                  />
                </div>
              </div> */}
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div>
                  {errorCode == 200 ? (
                    <DataTable
                      columns={student_view}
                      style={{ marginTop: "10PX" }}
                      data={filteredPollItems}
                      striped
                      paginationPerPage={10}
                      pagination
                      paginationRowsPerPageOptions={[
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100,
                      ]}
                      paginationComponentOptions={paginationComponentOptions}
                      customStyles={customStyles}
                      subHeader
                      subHeaderComponent={subHeaderComponent}
                      highlightOnHover
                      defaultSortFieldId={1}
                      // selectableRows
                    />
                  ) : (
                    <div>{errorMessage}</div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>

      <div className="row border_class2 search_box_padding">
        <div className="col-md-3 d-flex flex-row">
          <div className="search_box_div">
            <img
              className="search_box_img"
              src={require("../images/Search.png")}
            />

            <Input
              className="search_box"
              id="search"
              type="text"
              placeholder="Search by question"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* <div className="col-md-1 d-flex flex-row">
          <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} onClick={fetchList} />

        </div> */}
        <div
          className="col-md-9 d-flex flex-row"
          style={{ justifyContent: "end" }}
        >
          <div style={{ marginTop: "0px", padding: "0" }}>
            <Link to="/createPoll">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
              >
                <div className="create_button_inner">Create Polls</div>

                <img
                  className="create_button_img"
                  src="dist/img/Progress.png"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="welcome_modal">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="welcome_msg_main_div">
              <div className="d-flex" style={{justifyContent:"space-between"}}>
                <p className="welcome_msg_main_p">WELCOME TO POLLS!</p>
                <img
                    src="dist/img/Welcom_msg_close.png"
                    onClick={() => close_welcome_modal()}
                    alt="dropdown"
                    className="close_event ml-auto cancel_img"
                />
              </div>
              <div>
                <p className="welcome_msg_inner_p"> 
                    Proactively pulse, engage, and guide students by sending quick polls to their mobile apps,
                    and use their responses to ensure student satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border_class">
        <DataTable
          columns={columns}
          style={{ marginTop: "10PX" }}
          data={filteredItems}
          striped
          pagination
          customStyles={customStyles}
          subHeader
          subHeaderComponent={subHeaderComponent}
          highlightOnHover
          defaultSortFieldId={1}
        />
      </div>
      {/* {/ PREVIEW /} */}

      <div className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Polls</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closePreviewDescription()}
              className="ml-auto cancel_img"
            />
          </div>

          <div
            style={{
              background: "white",
              marginTop: "10PX",
              padding: "5px 10PX",
              border: "0.4px solid #C4C4C4",
              height: "100%",
            }}
          >
            {data && data.length != "" ? (
              <Previous_next_button
                data={data}
                passEditData={passEditData}
                passDeleteData={passDeleteData}
              />
            ) : null}
          </div>
        </div>
      </div>
      {/* end news table */}

      {/* **********************************************preview edit category************************************* */}
      <div className="preview_category">
        <div className="edit_container_inner">
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              paddingBottom: "28px",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label className="main_labels">Edit Poll</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_preview_edit_modal()}
              alt="dropdown"
              className="ml-auto cancel_img"
            />
          </div>
          <div className="modalContainer">
            <div className="poll-body">
              <div className="card-body" style={{ margin: "0", padding: "0" }}>
                <div>
                  <div className="preview_form">
                    {/* category */}
                    <div className="mt-1 border_class2 edit_row_padding">
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            style={{
                              width: "100%",
                              marginTop: "0px",
                              paddingRight: "0",
                            }}
                          >
                            <div className="d-flex">
                              <label className="all_labels">
                                Select Category
                              </label>

                              <p className="all_stars">*</p>
                            </div>

                            <select
                              className="form-select form-select-sm all_edit_inputs"
                              id="pollsCategory"
                              aria-label=".form-select-sm example"
                              onChange={(e) =>
                                updateCategoryIdForPreview(e.target.value)
                              }
                            >
                              <option
                                selected="selected"
                                value={categoryIdForPreview}
                                style={{
                                  padding: "6px",
                                  fontSize: "11PX",
                                  fontWeight: "600",
                                }}
                              >
                                {category}
                              </option>

                              {pollsCategory.length > 0 ? (
                                pollsCategory.map((item, index) => {
                                  return (
                                    <option value={item.cat_id} key={index}>
                                      {item.category_name}
                                    </option>
                                  );
                                })
                              ) : (
                                <div>Data not Found</div>
                              )}
                            </select>

                            <div
                              class="ValidReason"
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
                                Please Enter Reason Fo Appointment
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*question  */}
                    <div className="mt-2 border_class2 edit_row_padding">
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            style={{
                              width: "100%",
                              marginTop: "0px",
                              paddingRight: "0",
                            }}
                          >
                            <div className="d-flex">
                              <label className="all_labels">Question</label>

                              <p className="all_stars">*</p>
                            </div>

                            <input
                              type="name"
                              id="validreason"
                              className="input_fields all_edit_inputs"
                              // placeholder="Enter Your Reason For Appointment..."
                              autoComplete="true"
                              onChange={(e) => updateQuestion(e.target.value)}
                              value={question}
                            />
                            <div
                              class="ValidReason"
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
                                Please Enter Reason Fo Appointment
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* responses */}
                    <div className="mt-2 border_class2">
                      <div className="row mt-2">
                        <div className="col-md-4" style={{ padding: "0" }}>
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="3"
                                  checked={questionType == 3}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
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
                                height: "100px",
                              }}
                            >
                              <div className="d-flex">
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                              </div>

                              <div className="d-flex">
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                              </div>

                              <div className="d-flex">
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                              </div>

                              <div className="d-flex">
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                              </div>

                              <div className="d-flex">
                                <img
                                  src="dist/img/Star.png"
                                  alt="dropdown"
                                  width="15"
                                  height="15"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-4"
                          style={{ padding: "0 0 0 2px" }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="4"
                                  checked={questionType == 4}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
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
                                height: "120px",
                              }}
                            >
                              <div className="edit_polls_response">
                                Highly Satisfied
                              </div>
                              <div className="edit_polls_response">
                                Satisfied
                              </div>
                              <div className="edit_polls_response">
                                Niether Satisfied nor Dissatisfied
                              </div>
                              <div className="edit_polls_response">
                                Dissatisfied
                              </div>
                              <div className="edit_polls_response">
                                Highly Disatisfied
                              </div>
                            </div>
                            {/* end */}
                          </div>
                        </div>
                        <div
                          className="col-md-4"
                          style={{ padding: "0 2px 0 0" }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="1"
                                  checked={questionType == 1}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
                                  id="yesNo_symbol"
                                />
                              </p>
                              <p
                                style={{
                                  marginLeft: "10px",
                                  color: "#1F3977",
                                  fontSize: "11PX",
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
                                height: "100px",
                              }}
                            >
                              <div className="edit_polls_response">Yes</div>
                              <div className="edit_polls_response">No</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div
                          className="col-md-4"
                          style={{ padding: "0 2px 0 0" }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="5"
                                  checked={questionType == 5}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
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
                                padding: "4px 10px",
                                height: "120px",
                              }}
                            >
                              <div className="edit_polls_response">
                                Strongly Agree
                              </div>
                              <div className="edit_polls_response">Agree</div>
                              <div className="edit_polls_response">
                                Niether Agree nor Disagree
                              </div>
                              <div className="edit_polls_response">
                                Disagree
                              </div>
                              <div className="edit_polls_response">
                                Strongly Disagree
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-4"
                          style={{ padding: "0 2px 0 0" }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="6"
                                  checked={questionType == 6}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
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
                                padding: "4px 10px",
                                height: "120px",
                              }}
                            >
                              <div className="edit_polls_response">
                                Extremly Intrested
                              </div>
                              <div className="edit_polls_response">
                                Very Intertsted
                              </div>
                              <div className="edit_polls_response">
                                Somewhat Intrested
                              </div>
                              <div className="edit_polls_response">
                                Disagree
                              </div>
                              <div className="edit_polls_response">
                                Not at all intrested
                              </div>
                            </div>
                            {/* end */}
                          </div>
                        </div>
                        <div
                          className="col-md-4"
                          style={{ padding: "0 2px 0 0 " }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="7"
                                  checked={questionType == 7}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
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
                                padding: "4px 10px",
                                height: "120px",
                              }}
                            >
                              <div className="edit_polls_response">Always</div>
                              <div className="edit_polls_response">Usually</div>
                              <div className="edit_polls_response">
                                Sometime
                              </div>
                              <div className="edit_polls_response">Rarely</div>
                              <div className="edit_polls_response">Never</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* question type */}
                      <div className="row mt-2">
                        <div
                          className="col-md-4"
                          style={{ padding: "0 2px 0 0" }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div className="d-flex">
                              <p>
                                <input
                                  type="checkbox"
                                  name="check"
                                  value="2"
                                  checked={questionType == "2"}
                                  onChange={(e) =>
                                    updateQuestionType(e.target.value)
                                  }
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
                                Custom Answer
                              </p>
                            </div>

                            <div
                              style={{
                                border: "1px solid #c4c4c4",
                                padding: "4px 10px",
                                height: "100px",
                              }}
                            >
                              <div className="edit_polls_response">
                                <input
                                  type="text"
                                  className="cutsome_answers"
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
                                />
                              </div>

                              <div className="edit_polls_response">
                                <input
                                  type="text"
                                  className="cutsome_answers"
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
                                />
                              </div>

                              <div
                                style={{
                                  padding: "0px",
                                  color: "rgba(0, 0, 0, 0.5)",
                                  fontWeight: "500",
                                  background: "#f5f5f5",
                                  fontSize: "8px",
                                }}
                              >
                                <input
                                  type="text"
                                  className="cutsome_answers"
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

                              <div className="edit_polls_response">
                                <input
                                  type="text"
                                  className="cutsome_answers"
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

                              <div className="edit_polls_response">
                                <input
                                  type="text"
                                  className="cutsome_answers"
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
                    </div>

                    {/* delivery type */}

                    <div className="mt-1 border_class2 edit_row_padding">
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
                                checked={deliveryType == 1}
                                onClick={() => currentDate()}
                                onChange={(e) =>
                                  updateDeliveryType(e.target.value)
                                }
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  border: "1px solid rgba(0, 0, 0, 0.5)",
                                }}
                              />
                              <label
                                for="now"
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
                                id="later"
                                name="deliveryType"
                                value="2"
                                checked={deliveryType == 2}
                                onChange={(e) =>
                                  updateDeliveryType(e.target.value)
                                }
                                onClick={() => laterDate()}
                                style={{
                                  marginLeft: "78px",
                                  width: "20px",
                                  height: "20px",
                                  border: "1px solid rgba(0, 0, 0, 0.5)",
                                }}
                              />
                              <label
                                for="later"
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

                    {/* start time */}
                    <div className="mt-2 border_class2 edit_row_padding">
                      <div class="row">
                        <div class="col-md-6">
                          <div
                            style={{
                              width: "100%",
                              marginTop: "0px",
                              paddingRight: "0",
                            }}
                          >
                            <div className="d-flex">
                              <label className="all_labels">Start Date</label>

                              <p className="all_stars">*</p>
                            </div>

                            <input
                              type="datetime-local"
                              onChange={(e) =>
                                updatePublishDate(e.target.value)
                              }
                              value={publishDate}
                              className="input_fields all_edit_inputs"
                              id="publishdate"
                              name="birthdaytime"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div className="edit_left_padding">
                            <div className="d-flex">
                              <label className="all_labels">Expire Date</label>

                              <p className="all_stars">*</p>
                            </div>
                            <input
                              type="datetime-local"
                              onChange={(e) => updateExpireDate(e.target.value)}
                              value={expireDate}
                              id="expiredate"
                              className="input_fields all_edit_inputs"
                              name="birthdaytime"
                            />

                            <div
                              class="EndTime"
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
                                Please Select End Time
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* user type */}
                    <div className="mt-3 border_class2 edit_row_padding">
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            className=""
                            style={{ width: "100%", marginTop: "0px" }}
                            id="send_to"
                          >
                            {/* <label style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}>Who are you sending this notification to??</label><br /> */}
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
                                checked={pollSendTo == 1}
                                onChange={(e) =>
                                  updatePollSendTo(e.target.value)
                                }
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  border: "1px solid rgba(0, 0, 0, 0.5)",
                                }}
                              />

                              <label
                                for="all students"
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
                                <p style={{ marginLeft: "5PX" }}>
                                  All Students
                                </p>
                              </label>

                              <input
                                type="radio"
                                id="specific class"
                                name="userType"
                                value="2"
                                checked={pollSendTo == 2}
                                onChange={(e) =>
                                  updatePollSendTo(e.target.value)
                                }
                                style={{
                                  marginLeft: "78px",
                                  width: "20px",
                                  height: "20px",
                                  border: "1px solid rgba(0, 0, 0, 0.5)",
                                }}
                              />

                              <label
                                for="specific class"
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
                                <p style={{ marginLeft: "5PX" }}>
                                  Specific Recipients
                                </p>
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

                    <div className="d-flex mt-2 edit_buttons_div border_class2">
                      <a
                        onClick={() => close_preview_edit_modal()}
                        href="#"
                        style={{ marginLeft: "auto" }}
                      >
                        <input
                          type="button"
                          className="edit_cancel_button"
                          value="Cancel"
                        />
                      </a>

                      <a
                        className="cta"
                        href="#preview_edit_with_password"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <input
                          type="button"
                          className="edit_update_button"
                          id="delete_single_student"
                          value="Update"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>

      {/* preview edit with password */}
      {/* edit popuop with password */}
      <div
        id="preview_edit_with_password"
        className="modaloverlay edit_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Edit Polls
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are editing a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Edit"
                onClick={() => previewEditWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* delete preview */}
      <div
        className="delete_preview_polls"
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
            background: "#f2f2f2",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "relative",
            width: "420px",
            height: "auto",
            overflow: "auto",
            margin: "100px auto",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex">
            {/* <label style={{ color: "black", fontSize: "11px", fontWeight: "700" }}>Polls</label> */}

            <img
              src="dist/img/Cancel.png"
              onClick={() => cancel_delete_poll()}
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="mt-3">
            <p style={{ fontWeight: "600", color: "black", fontSize: "13px" }}>
              Delete message?
            </p>
            <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
              Are You Sure You Want To Delete This Poll?
            </h2>

            <div className="d-flex mt-3">
              <input
                type="button"
                className="create_btn"
                value="Cancel"
                onClick={() => cancel_delete_poll()}
                style={{
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  marginLeft: "auto",
                  color: "#d21f3c",
                }}
              />

              <a
                className="cta"
                href="#preview_delete_with_password"
                style={{ backgroundColor: "transparent" }}
              >
                <input
                  type="button"
                  className="create_btn"
                  id="delete_single_student"
                  value="Delete"
                  // onClick={() =>deleteMessage()}
                  style={{
                    borderRadius: "5px",
                    marginRight: "7px",
                    backgroundColor: "#d21f3c",
                    fontSize: "13PX",
                    padding: "8px 12px",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* preview delete  with password */}
      <div
        id="preview_delete_with_password"
        className="modaloverlay delete_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Poll
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are deleting a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                // className="create_btn"
                // id="delete_single_student"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Delete"
                onClick={() => previewDeleteWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* specific student pop up */}
      <div
        className="user_type"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          right: "0",
          bottom: "0",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          zIndex: "20",
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
              style={{ color: "black", fontSize: "10px", fontWeight: "600" }}
            >
              Recipients
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closeRecipient()}
              alt="dropdown"
              style={{ width: "21px", height: "21px", marginLeft: "auto" }}
            />
          </div>

          <div
            id="exTab2"
            class="container"
            style={{ marginTop: "10PX", height: "100%" }}
          >
            <ul class="nav nav-tabs">
              <li class="active">
                <a href="#1" data-toggle="tab" style={{ padding: "10px 20px" }}>
                  Persona
                </a>
              </li>
              <li style={{ marginLeft: "10px" }}>
                <a href="#2" data-toggle="tab">
                  Group
                </a>
              </li>
              <li style={{ marginLeft: "10px" }}>
                <a href="#3" data-toggle="tab">
                  Individual
                </a>
              </li>
            </ul>

            <div class="tab-content " style={{ height: "100%" }}>
              <div class="tab-pane active" id="1" style={{ height: "100%" }}>
                {/* persona */}
                <div
                  id="exTab4"
                  class="container"
                  style={{ marginTop: "0PX", height: "100%" }}
                >
                  <ul class="nav nav_tabs">
                    <li class="active">
                      <a href="#4" data-toggle="tab">
                        Recipient
                      </a>
                    </li>
                    <li style={{ marginLeft: "5px" }}>
                      <a href="#5" data-toggle="tab">
                        Add Persona
                      </a>
                    </li>
                  </ul>

                  {/* persona tab content */}
                  <div
                    class="tab-content "
                    style={{ padding: "0px", height: "auto" }}
                  >
                    <div
                      class="tab-pane active"
                      id="4"
                      style={{ height: "100%" }}
                    >
                      {/* Datatable */}
                      {studentId != "" ? (
                        <PersonaRecipient
                          style={{ height: "100%" }}
                          studentId={studentId}
                          passPersonaData={passPersonaData}
                        />
                      ) : (
                        <NewPersonaRecipient
                          style={{ height: "100%" }}
                          passPersonaData={passPersonaData}
                        />
                      )}
                      {/* <PersonaRecipient style={{ height: "100%" }} passPersonaData={passPersonaData} /> */}
                    </div>
                    <div class="tab-pane" id="5" style={{ paddingTop: "20px" }}>
                      <h3 style={{ fontWeight: "600" }}>ADD PERSONA</h3>
                      <input
                        type="text"
                        value={addPersona}
                        onChange={(e) => updatePersona(e.target.value)}
                        style={{
                          border: "1px solid #c4c4c4",
                          width: "96%",
                          height: "35px",
                          fontSize: "11PX",
                          margin: "0 10px",
                          background: "transparent",
                        }}
                      />
                      <div className="d-flex mt-4">
                        <input
                          type="button"
                          className=" form-buttons3"
                          defaultValue="Sign Up"
                          value="Cancel"
                          style={{
                            fontWeight: "500",
                            border: "none",
                            color: "#1F3977",
                            borderRadius: "6px",
                            marginLeft: "auto",
                            background: "transparent",
                            padding: "10px 40px",
                            fontSize: "10PX",
                            fontWeight: "600",
                          }}
                        />

                        <input
                          type="button"
                          className=" form-buttons3"
                          defaultValue="Sign Up"
                          onClick={() => createPersona()}
                          value="Submit"
                          style={{
                            fontWeight: "500",
                            border: "none",
                            color: "white",
                            borderRadius: "6px",
                            marginLeft: "8px",
                            backgroundColor: "#1F3977",
                            padding: "10px 40px",
                            fontSize: "10PX",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            marginRight: "10px",
                          }}
                        />
                      </div>
                      {/* <div style={{ color: "green", marginLeft: "50px", fontSize: "11px" }}>
                            {errorMessagePersona}
                          </div> */}

                      <div
                        style={{
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          marginTop: "10px",
                        }}
                      >
                        {errorCodePersona == 200 ? (
                          <div
                            class="personaMsg"
                            style={{ marginLeft: "8px", width: "96%" }}
                          >
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="success">
                                {errorMessagePersona}
                              </Alert>
                            </Stack>
                          </div>
                        ) : errorCodePersona == 406 ? (
                          <div
                            className="personaMsg"
                            style={{ marginLeft: "8px", width: "96%" }}
                          >
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="error">
                                Please Enter the Field
                              </Alert>
                            </Stack>
                          </div>
                        ) : errorCodePersona == 409 ? (
                          <div
                            className="personaMsg"
                            style={{ marginLeft: "8px", width: "96%" }}
                          >
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="error">
                                {errorMessagePersona}
                              </Alert>
                            </Stack>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* group tab content] */}
              <div class="tab-pane" id="2">
                <h3>This Is Group</h3>
              </div>

              <div class="tab-pane" id="3">
                {/* individual content */}

                <div
                  id="exTab3"
                  class="container"
                  style={{ marginTop: "0PX", height: "100%" }}
                >
                  <ul class="nav nav_tabs">
                    <li class="active">
                      <a href="#6" data-toggle="tab">
                        Recipient
                      </a>
                    </li>
                    <li style={{ marginLeft: "5px" }}>
                      <a href="#7" data-toggle="tab">
                        Upload Recipient
                      </a>
                    </li>
                  </ul>

                  <div
                    class="tab-content "
                    style={{ padding: "0px", height: "auto" }}
                  >
                    <div
                      class="tab-pane active"
                      id="6"
                      style={{ height: "100%" }}
                    >
                      {/* Datatable */}
                      {studentId != "" ? (
                        <Recipient
                          style={{ height: "100%" }}
                          studentId={studentId}
                          passData={passData}
                        />
                      ) : (
                        <NewRecipient
                          style={{ height: "100%" }}
                          passData={passData}
                        />
                      )}
                    </div>
                    <div class="tab-pane" id="7">
                      <h3 style={{ fontWeight: "600" }}>UPLOAD RECIPIENT</h3>

                      <div className="mt-0 p-0">
                        <div class="row">
                          <div class="col-md-12">
                            <div
                              style={{
                                width: "100%",
                                marginTop: "0px",
                                paddingRight: "0",
                              }}
                            >
                              <div className="d-flex">
                                <label
                                  style={{
                                    color: "#1F3977",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Upload ExcelSheet
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

                              <input
                                type="file"
                                id="excelSheet"
                                //value={excel}
                                onChange={(e) => setExcel(e.target.files[0])}
                                placeholder="Your Title goes here..."
                                autoComplete="true"
                                style={{
                                  boxSizing: "border-box",
                                  fontSize: "12px",
                                  paddingLeft: "5PX",
                                }}
                              />

                              <div className="d-flex mt-3">
                                <input
                                  type="button"
                                  className=" form-buttons3"
                                  defaultValue="Sign Up"
                                  onClick={() => uploadExcel()}
                                  value="Publish"
                                  style={{
                                    marginLeft: "auto",
                                    fontWeight: "500",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "6px",
                                    backgroundColor: "#1F3977",
                                    padding: "6px 20px",
                                    fontSize: "12PX",
                                  }}
                                />
                              </div>

                              <div>
                                {excelError_code == 200 ? (
                                  <div
                                    style={{
                                      color: "green",
                                      fontSize: "11px",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    {excelError_message}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      color: "red",
                                      fontSize: "11px",
                                      marginLeft: "20px",
                                      display: "none",
                                    }}
                                  >
                                    Students are not beed added
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ color: "green", marginLeft: "50px" }}>
                        {errorMessagePersona}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end' */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
