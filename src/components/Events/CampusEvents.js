import React, { useState, useEffect, useMemo, useRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import moment from "moment";
import Alert from "@mui/material/Alert";
import DataTable from "react-data-table-component";
import axios from "axios";
import $ from "jquery";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { PreviousNext_Button_upcoming } from "./PreviousNext_Button_upcoming";
import { PreviousNext_Button_past } from "./PreviousNext_Button_past";
import styled from "styled-components";
import { PersonaRecipient } from "./PersonaRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import { Recipient } from "./Recipient";
import { NewRecipient } from "./NewRecipient";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import LoadingSpinner from "../LoadingSpinner";
import SummerNote from "../SummerNote/SummerNote";
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
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
      background: "rgba(228, 233, 243, 0.6)",
      marginTop: "3PX",
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#1F3977",
      fontSize: "10px",
      fontWeight: "600",
    },
  },

  head: {
    style: {
      // border: "0.5px solid #C4C4C4",
      boxShadow: "0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2)",
      height: "45px"
    },
  },
};

export function CampusEvents() {

  const token = localStorage.getItem("Token");
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(true);
  const [counter, setCounter] = useState(0);
  // console.log("showflag", counter);
  const [deletePassword, updateDeletePassword] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [eventID, updateEventID] = useState("");
  const [eventName, updateEventName] = useState("");
  const [eventDescription, updateEventDescription] = useState("");
  const [eventImageID, updateEventImageID] = useState("");
  const [eventImage, updateEventImage] = useState([]);
  const [venue, updateVenue] = useState("");
  const [eventDate, updateEventDate] = useState("");
  const [startTime, updateStartTime] = useState("");
  const [endTime, updateEndTime] = useState("");
  const [eventFee, updateEventFee] = useState("");
  const [eventCapacity, updateEventCapacity] = useState("");
  const [ticketUrl, updateTicketUrl] = useState("");
  const [sendTo, updateSendTo] = useState("");
  const [studentId, updateStudentId] = useState("");
  const [newEventId, updateNewEventId] = useState();

  const history = useHistory();

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };

  const [childNewsData, setChildNewsData] = useState([]);
  // upcoming
  const passEditDataUpcoming = (eventId) => {
    setChildNewsData(eventId);
    edit_category(eventId);
  };

  const passDeleteDataUpcoming = (eventId) => {
    setChildNewsData(eventId);
    delete_category(eventId);
  };

  // past
  const passEditDataPast = (eventId) => {
    setChildNewsData(eventId);
    edit_category(eventId);
  };

  const passDeleteDataPast = (eventId) => {
    setChildNewsData(eventId);
    delete_category(eventId);
  };

  async function edit_category(eventId) {
    $(".preview_polls_upcoming").hide();
    $(".preview_polls_past").hide();
    editNews(eventId);
  }

  function delete_category() {
    $(".delete_preview_container").show();
    $(".preview_polls_upcoming").hide();
    $(".preview_polls_past").hide();
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

    // console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deletePreviewMessage();
    }
  }

  async function deletePreviewMessage() {
    $(".delete_preview_container").hide();
    try {
      const formData = new FormData();

      formData.append("e_id", childNewsData);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      // console.log("Delete Campus News", deleteResponse);
      updatedeleteErrorMessage(deleteResponse.data.message);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  // ****************************************PERSONA*******************************************************
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const [addPersona, updatePersona] = useState([]);
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
    updateErrorMessagePersona(personaResponse.data.message);
    updateErrorCodePersona(personaResponse.data.error_code);
    $(".personaMsg").show();

    setTimeout(function () {
      $(".personaMsg").hide();
    }, 3000);
  }

  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);
    // console.log("childData", data);
    setChildData(data);
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);
  };

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

    // console.log("Get campus info----------------->>", fetchResponse.data.data);

    if (fetchResponse.data.error_code == 200) {
      fetchResponse.data.data.map((fetchItem) => {
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
  }
  const [newData, setNewData] = useState("");
  const [newEId, setNewEId] = useState("");
  const [rowIndex, setRowIndex] = useState(0);

  async function viewUpcomingDescription(e_id, rowIndex) {
    updateNewEventId(e_id);
    setRowIndex(rowIndex);

    // $(".preview_polls_upcoming").show();

    const formData = new FormData();
    const fetchNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_all_campus_event",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    if (fetchNewsResponse.data.error_code == 200) {
      const allData = fetchNewsResponse.data.data;
      setNewData(allData);
      const fData = allData.filter((item) => item.event_id === e_id);
    } else {
      console.log("fail---------------------------------");
    }

    history.push("/eventpreview", { e_id });
  }
  $(".close_event").click(function () {
    $(".preview_polls_upcoming").hide();
  });

  function viewDescriptionPast(e_id) {
    // $(".preview_polls_past").show();
    history.push("/eventpreview", { e_id });
  }

  $(".close_event").click(function () {
    $(".preview_polls_upcoming").hide();
    $(".user_type").hide();
  });

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

      console.log("Student Details", fetchClassResponse.data.data);

      if (fetchClassResponse.data.error_code == 200) {
        setEventData(fetchClassResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const summernoteCssFunc = () => {
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height", "150px");
  };

  useEffect(() => {
    fetchList();
    getUserDetails();
    summernoteCssFunc();
  }, []);

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
      updateDeletePassword("")
      deleteMessage();
    } else {
      toast.error(deleteNewsResponse.data.message)
    }
  }

  async function editWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const editNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    // console.log("check password and verify", editNewsResponse);
    updatedeleteErrorCode(editNewsResponse.data.error_code);
    updatedeleteErrorMessage(editNewsResponse.data.message);

    if (editNewsResponse.data.error_code == 200) {
      updateForm();
    } else { toast.error(editNewsResponse.data.message) }
  }

  const [filterEventText, setFilterEventText] = React.useState("");
  const [
    resetEventPaginationToggle,
    setEventResetPaginationToggle,
  ] = React.useState(false);

  const filteredEventItems = eventData.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterEventText.toLowerCase()) !== -1
  );

  const subHeaderEventComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setEventResetPaginationToggle(!resetEventPaginationToggle);
        setFilterEventText("");
      }
    };

    return (
      // <FilterRecipient
      //   onFilter={e => setFilterEventText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterEventText}
      // />
      <div></div>
    );
  }, [filterEventText, resetEventPaginationToggle]);

  const [data, setData] = useState([]);

  async function fetchUpcomingEvents() {
    try {
      setIsLoading(true);
      const formData = new FormData();

      const fetchEventResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_all_campus_event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("all events---------", fetchEventResponse);

      // if (fetchEventResponse.data.error_code == 200) {

      setData(fetchEventResponse.data.data);

      // }
      setIsLoading(false);
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const openActionsModal = (e) => {
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };

  function deleteNews(event_id, event_title) {
    updateGetEventTitle(event_title);
    updateGetEventID(event_id);

    $(".deleteEventModal").show();
  }

  function deletePopupFunc() {
    $(".deleteEventWithPass").show();
    $(".deleteEventModal").hide();
  }

  function closeDeleteNewsModal() {
    $(".deleteEventModal").hide();
    $(".edit_campus_modal").hide();
    $(".deleteEventWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("")
  }

  const upcomingColumns = [
    {
      name: "Event Name",
      wrap: true,
      width: "30%",
      cell: (row, rowIndex) => {
        const array = [];
        row.image.map((itemimage) => {
          array.push(itemimage.image);
        });

        return (
          <div className="d-flex">
            {array.length == 0 ? (
              <div>
                <img
                  src={require("../images/no_image.png")}
                  style={{ padding: "5px", width: "40px", height: "30px" }}
                />
              </div>
            ) : (
              <div>
                <img className="event_column_img"
                  src={array[0]}
                />
              </div>
            )}
            <div>
              <p
                className="ten_font_class"
                onClick={() => viewUpcomingDescription(row.event_id, rowIndex)}
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginLeft: "10px",
                  marginTop: "8px",
                  width: "160px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {row.label}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      name: "Date",
      wrap: true,
      width: "auto",
      cell: (row, rowIndex) => {
        const dateString = row.start_date;
        var date = new Date(dateString + "T00:00:00");
        const options = {
          day: "numeric",
          month: "long",
          year: "numeric",
        };

        const getDate = date.toLocaleString("en-GB", options);
        return (
          <div onClick={() => viewUpcomingDescription(row.event_id, rowIndex)}>
            <div className="ten_font_class" style={{ cursor: "pointer" }}>
              {getDate}
            </div>
          </div>
        );
      },
    },
    {
      name: "Venue",
      wrap: true,
      width: "auto",
      width: "20%",
      cell: (row, rowIndex) => {
        return (
          <div
            className="ten_font_class"
            style={{
              cursor: "pointer",
              width: "160px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            onClick={() => viewUpcomingDescription(row.event_id, rowIndex)}
          >
            {row.location}
          </div>
        );
      },
    },
    {
      name: "Invitees",
      wrap: true,
      width: "auto",
      cell: (row, rowIndex) => {
        return (
          <div
            className="ten_font_class"
            style={{ cursor: "pointer" }}
            onClick={() => viewUpcomingDescription(row.event_id, rowIndex)}
          >
            {row.send_to == 1 ? "All Students" : "Specific Recipient"}
          </div>
        );
      },
    },
    {
      name: "Entry Fee",
      selector: "send_to",
      wrap: true,
      width: "auto",
      cell: (row, rowIndex) => {
        return (
          <div
            className="ten_font_class"
            style={{ cursor: "pointer" }}
            onClick={() => viewUpcomingDescription(row.event_id, rowIndex)}
          >
            {row.entry_fee}
          </div>
        );
      },
    },
    {
      name: "Status",
      wrap: true,
      width: "auto",
      selector: "event_type",
      cell: (row) => {
        return (
          <div
            className="ten_font_class"
            style={{ cursor: "pointer" }}
            onClick={() => viewDescriptionPast(row.event_id)}
          >
            {row.event_type}
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
                onClick={() => openActionsModal(row.event_id)}
              >
                Actions
              </button>

              <div
                class={`edit_campus_modal actions_modal${row.event_id}`}
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

                <div
                  className=" d-flex flex-row hover_class"
                  onClick={() => editNews(row.event_id)}
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
                  onClick={() => deleteNews(row.event_id, row.label)}
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
                className="modal fade deleteEventModal"
                id="deleteEventModal"
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
                className="modal fade deleteEventWithPass"
                id="deleteNewsWithPass"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="delet_with_pass_main_contener">
                      <div className="modal-header delet_with_pass_header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: "white" }}>
                          Delete Event
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
                              style={{ background: "white" }}
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
                              <div className="col-md-4 d-flex p-0" style={{ alignItems: "center" }}>
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
                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: "white" }}>
                          Edit Event
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
                              style={{ background: "white" }}
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
                              <div className="col-md-4 d-flex p-0" style={{ alignItems: "center" }}>
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
          </>
        );
      },
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
      //  <FilterComponentEvent
      //     onFilter={e => setFilterText(e.target.value)}
      //     onClear={handleClear}
      //     filterText={filterText}

      //   />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);

  // edit event
  const [categoryId, updateCategoryId] = useState("");
  const [newsCategorydata, setNewsCategoryData] = useState([]);

  async function editNews(e_id) {

    const formData = new FormData();
    formData.append("e_id", e_id);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_event",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("eventResponse________", eventResponse);

    $(".edit_campus_modal").hide();
    $(".actions_modal").hide();

    if (eventResponse.data.error_code == 200) {
      eventResponse.data.data.map((item) => {

        updateEventID(item.event_id);
        updateEventName(item.title);
        updateEventDescription(item.description);
        updateEventImage(item.image);
        updateVenue(item.location);
        const StartDate = moment(item.start_date).format("YYYY-MM-DD");

        updateEventDate(StartDate);
        updateStartTime(item.start_time);
        updateEndTime(item.end_time);
        updateEventFee(item.fee);
        updateEventCapacity(item.capacity);
        updateTicketUrl(item.url);
        updateSendTo(item.send_to);

        if (item.send_to == 2) {
          const name = item.send_to_student.map(
            (stditem) => stditem.student_name
          );
          const student_id = item.send_to_student.map(
            (stditem) => stditem.student_id
          );

          setChildData(name);
          updateStudentId(student_id);


        } else {
          console.log("User type not define");
        }
        $(".edit_container").show();
      });
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
        setTimeout(function () {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchNewsList();
  }, []);
  function all_student() {
    $(".user_type").hide();
  }
  const [userType, updateUserType] = useState([]);
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

      if (fetchClassResponse.data.error_code == 200) {
        updateUserType(fetchClassResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleButton = () => {
    $(".edit_popup_password").hide();
    fetchUpcomingEvents();

    toast.success("Event Deleted Successfully!!");
  };

  const handleEditButton = () => {
    $(".edit_popup_password").hide();
    fetchUpcomingEvents();
    toast.success("Event Edited Successfully!!");
  };

  async function showEventImage() {
    const formData = new FormData();
    formData.append("event_id", eventID);

    for (let i = 0; i < photo.length; i++) {
      formData.append("File[]", photo[i]);
    }

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_add_event_image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
  }
  async function updateForm() {
    const formData = new FormData();
    formData.append("event_id", eventID);
    formData.append("title", eventName);
    formData.append("location", venue);
    formData.append("description", eventDescription);
    formData.append("url", ticketUrl);

    console.log('formdata=========', formData)

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_event",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    showEventNoImage();
    showEventImage();
    if (eventResponse.data.error_code == 200) {
      $(".editWithPassModal").hide();
      updateDeletePassword("");
      handleEditButton();
    }

    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
    $(".actions_modal").hide();

    $(".show_edit_message").show();
    setTimeout(function () {
      $(".show_edit_message").hide();
    }, 3000);
  }

  // delete events
  const [getEventTitle, updateGetEventTitle] = useState([]);
  const [getEventID, updateGetEventID] = useState("");


  async function deleteMessage() {
    $(".delete_container").hide();
    $(".edit_campus_modal").hide();
    $(".actions_modal").hide();
    try {
      const formData = new FormData();

      formData.append("e_id", getEventID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      updatedeleteErrorMessage(deleteResponse.data.message);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        updateDeletePassword("")
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function showEventNoImage() {
    const formData = new FormData();
    formData.append("File[]", eventImage);
    formData.append("event_id", eventID);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_add_event_image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
  }

  function close_delete_modal() {
    $(".delete_container").hide();
    $(".edit_campus_modal").hide();
    $(".actions_modal").hide();
  }

  const [photo, updatePhotos] = useState([]);

  const [imgData, setImgData] = useState([]);
  console.log("ImageData......", imgData)

  const [imgDataMarketplace, setImgDataMarketplace] = useState([]);

  const getMultipleImage = (e) => {
    updatePhotos(e.target.files);

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;

        preview.style.display = "block";
        var array = src.slice(5);

        imgData.push(src);
        imgDataMarketplace.push(array);
      }
    }
  };


  function close_edit_modal() {
    $(".edit_container").hide();
  }
  function update_edited_Event() {
    $(".editWithPassModal").show();
  }

  function closePreviewDescription() {
    $(".preview_polls_upcoming").hide();
    $(".preview_polls_past").hide();
  }
  function showImage() {
    $(".image_std").hide();
    $("#file-ip-1-preview").show();
  }

  function deleteFile(e) {
    const s = imgData.filter((item, index) => index !== e);
    setImgData(s);
  }

  const handelSummenrnote = (e) => {
    updateEventDescription(e);
  };

  const close_welcome_modal = () => {
    $(".welcome_modal").hide();
  }

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Campus Events</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div className="preview_form">
              <div style={{ marginTop: "5PX" }}>
                {/* <div style={{display:"flex",justifyContent:"end"}}>
                  <img
                    className="cancel_img"
                    src="dist/img/Pencil.png"
                  />
                </div> */}
                {/* <div className="edit_top_label">
                  <p>Name, Venue & URL</p>
                </div> */}
                <div
                  className="main-container"
                  style={{
                    border: "1px solid #4779F0",
                    padding: "5px",
                    borderRadius: "0px",
                  }}
                >
                  <div className="image-container">
                    <div
                      className="d-flex justify-content-left"
                      style={{ width: "100%", marginBottom: "10px" }}
                    >
                      {eventImage && eventImage.length > 0 ? (
                        eventImage.map((item, index) => (
                          <div key={index} style={{ margin: "2px" }}>
                            <img
                              className="event-image"
                              src={item.image} // Ensure this accesses the correct image URL
                              alt="Event Image"
                              style={{ width: "216px", height: "102px" }} // Set image size
                            />
                          </div>
                        ))
                      ) : (
                        <img
                          src={require("../images/no_image.png")}
                          className="event-image"
                          alt="No Image Available"
                          style={{ width: "216px", height: "102px" }} // Set image size
                        />
                      )}
                    </div>
                  </div>
                  {/* ************* */}
                  <div className="event-details-container">
                    {/* Event Name */}
                    <div className="event-title-container">
                      {/* <p
                        className="event-title"
                        style={{
                          color: "#0B0C0C",
                          fontSize: "14px",
                          textAlign: "left",
                          fontWeight: "bold",
                        }}
                      >
                        {eventName}
                      </p> */}
                      <input
                        type="text"
                        // className="input_fields edit_inputs_class"
                        className="event-title"
                        style={{
                          // color: "#0B0C0C",
                          fontSize: "14px",
                          textAlign: "left",
                          fontWeight: "bold",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        id="event_name"
                        value={eventName}
                        onChange={(e) => updateEventName(e.target.value)}
                        autoComplete="true"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="event-info" style={{ fontSize: "10px" }}>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <strong style={{ color: "#2F2F2F", fontWeight: "normal", marginRight: "5px" }}>
                          Venue:
                        </strong>
                        <input
                          style={{
                            color: "#0B0C0C",
                            border: "none", // Remove border if needed
                            outline: "none", // Remove outline on focus
                            backgroundColor: "transparent", // Remove background color
                            width: "50px", // Adjust the width as needed
                            padding: "5px", // Add padding for better appearance
                            fontWeight: "500"
                          }}
                          type="text"
                          id="publishdate"
                          className="input_fields edit_inputs_class"
                          value={venue}
                          onChange={(e) => updateVenue(e.target.value)}
                          name="birthdaytime"
                        />
                      </p>
                      <p>
                        <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                          Event Date/Time:
                        </strong>{" "}
                        <span style={{ color: "#0B0C0C", fontWeight: "500", }}>
                          {eventDate} {endTime}
                        </span>
                      </p>
                    </div>

                    {/* Divider with space */}
                    <div style={{ height: "10px" }}></div>

                    {/* Ticket Fee and URL */}
                    <div
                      className="ticket-info d-flex justify-content-between"
                      style={{
                        fontSize: "10px",
                        borderTop: "1px solid #D3D3D3",
                        padding: "5px",
                      }}
                    >
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <strong style={{ color: "#2F2F2F", fontWeight: "normal", marginRight: "2px", whiteSpace: "nowrap" }}>
                          Entry Fee:
                        </strong>
                        <input
                          type="text"
                          value={eventFee}
                          onChange={(e) => updateEventFee(e.target.value)}
                          style={{ color: "#0B0C0C", border: "none", backgroundColor: "transparent", whiteSpace: "nowrap", fontWeight: "500" }}
                        />
                      </p>

                      <p style={{ display: "flex", alignItems: "center", marginLeft: "12%" }} >
                        <strong style={{ color: "#2F2F2F", fontWeight: "normal", whiteSpace: "nowrap", }}>
                          Ticket URL :
                        </strong>{" "}
                        <span style={{ color: "#FF5733" }}>
                          {/* <a href={ticketUrl || "#"}>{ticketUrl}</a> */}
                          <input
                            type="text"
                            value={ticketUrl}
                            onChange={(e) => updateTicketUrl(e.target.value)}
                            placeholder="Enter ticket URL"
                            style={{ color: "#0B0C0C", border: "none", backgroundColor: "transparent", color: "#1F3977" }}
                          />

                        </span>
                      </p>
                    </div>

                    {/* Publish Date and Close Date */}
                    <div
                      className="publish-close-info d-flex justify-content-between"
                      style={{
                        fontSize: "10px",
                        borderTop: "1px solid #D3D3D3",
                        padding: "5px",
                      }}
                    >
                      <p>
                        <strong style={{ color: "#2F2F2F", fontWeight: "normal" }}>
                          Publish Date/Time:
                        </strong>
                        <br />
                        <span style={{ color: "#0B0C0C" }}>
                          {eventDate}/{startTime}
                        </span>
                      </p>
                      <p style={{}}>
                        <strong style={{ color: "#2F2F2F", fontWeight: "normal", marginLeft: "-12%" }}>
                          Close Date/Time:
                        </strong>{" "}
                        <br />
                        <span style={{ color: "#0B0C0C", marginLeft: "-12%" }}>
                          {eventDate}/{endTime}
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* ************* */}
                </div>


                {/* <div className="edit_border_class">
                  <div class="row ">
                    <div className="col-md-3">
                      <div>
                        <label className="all_labels">Name :</label>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="input_fields edit_inputs_class"
                        id="event_name"
                        value={eventName}
                        onChange={(e) => updateEventName(e.target.value)}
                        autoComplete="true"
                      />
                      <div
                        class="NewsCategory"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Category
                        </h4>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div>
                        <label className="all_labels">Venue :</label>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        id="publishdate"
                        className="input_fields edit_inputs_class"
                        value={venue}
                        onChange={(e) => updateVenue(e.target.value)}
                        name="birthdaytime"
                      />

                      <div
                        class="PublishDate"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div>
                        <label className="all_labels">Event Url :</label>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        id="publishdate"
                        className="input_fields edit_inputs_class"
                        value={ticketUrl}
                        onChange={(e) => updateTicketUrl(e.target.value)}
                        name="birthdaytime"
                      />

                      <div
                        class="PublishDate"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div style={{ marginTop: "-5px" }} >
                  <div className="edit_top_label">
                    <p style={{ color: " #4779F0", marginLeft: "-5px" }}> About Event </p>
                  </div>

                  <div style={{ width: "100%", paddingRight: "0" }}>
                    <SummerNote
                      _onChange={handelSummenrnote}
                      value={eventDescription}
                      placeholder="Enter Your Message here.."
                      height="200px"
                    // style={{ }} // Adjust the height as needed
                    />

                    {/* <textarea
                            id="publishdate"
                            className="edit_border_class edit_inputs_class"
                            value={eventDescription}
                            onChange={(e) => handelSummenrnote()}
                            name="birthdaytime"
                            style={{height:"200px"}}
                          /> */}

                    <div
                      class="NewsCategory"
                      style={{ marginTop: "-6px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "12PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Select Category
                      </h4>
                    </div>
                  </div>

                  {/* *************Receiptance section */}
                  <div
                    className="reciepientsDiv"
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#4779F0",
                        marginBottom: "10px",
                      }}
                    >
                      Recipients :
                    </p>
                    <div
                      style={{
                        border: "1px solid #4779F0",
                        // padding: "5px"
                        height: "35px",
                        width: "100%",
                        background: "transperent"
                      }}
                    >
                      <div
                        style={{ margin: "2px", marginTop: "-5px", }}
                      >
                        {/* <button style={{ background: "none", border: "none", }}>
                                  <img src="dist/img/selected_std_close.png"  class="selected_std_close_img"  />
                                    </button> */}
                        {/* <p style={{ padding: "10px 0px", Text: "center", fontSize: "0.7rem", marginTop: "9px", height: "4vh" }} class="selected_std_div">{student_name}</p> */}
                      </div>

                      {/* Your content goes here */}
                    </div>
                  </div>


                  {/* ************************End*********** */}


                </div>

                {/* <div className="mt-2 border_class2 edit_row_padding">
                  <div class="row  ">
                    <div class="col-md-8">
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            Event Photo
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <label
                          id="photos"
                          for="add_imagee"
                          style={{
                            background: "rgba(71, 121, 240, 0.3)",
                            borderRadius: "2px",
                            fontSize: "12PX",
                            padding: "10px",
                            color: "2D5DD0",
                            border: "none",
                            fontWeight: "500",
                          }}
                        >
                          Add Photos
                        </label>
                        {imgData == "null" ? (
                          <div>
                            <img
                              className="d-flex"
                              id="file-ip-1-preview"
                              src={require("../images/no_image.png")}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                        ) : (
                          <div className="d-flex">
                            {eventImage.map((item, index) => {
                              console.log("get event image", item);
                              return (
                                <div
                                  id="remove"
                                  style={{ width: "60px", height: "40px" }}
                                >
                                  <IoCloseCircleSharp
                                    onClick={(evt) =>
                                      deleteImage(item.image_id, index, evt)
                                    }
                                    style={{ cursor: "pointer" }}
                                  />

                                  <img
                                    src={item.image}
                                    alt="marketpace"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div
                          className="d-flex mt-4"
                          id="file-ip-1-preview"
                          style={{ width: "100%", gap: "2px" }}
                        >
                          {imgData.map((item, index) => {
                            console.log("get new image added", item);
                            return (
                              <div
                                style={{ width: "50px", height: "50px" }}
                                id="remove"
                              >
                                <IoCloseCircleSharp
                                  onClick={() => deleteFile(index)}
                                  style={{ cursor: "pointer" }}
                                />
                                <img
                                  src={item}
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        <input
                          type="file"
                          name="photo"
                          onChange={getMultipleImage}
                          id="add_imagee"
                          accept="image/png, image/gif, image/jpeg"
                          style={{
                            visibility: "hidden",
                            width: "2PX",
                            position: "absolute",
                          }}
                          multiple
                        />

                        <div
                          class="Photos"
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
                            Please Select Item Images
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="d-flex mt-3 edit_buttons_div border_class2">

                <button
                  className="edit_cancel_button"
                  value="Cancel"
                  onClick={() => close_edit_modal()}
                >Cancel</button>
                <button
                  className="edit_update_button"
                  id="delete_single_student"
                  value="Update"
                  onClick={() => update_edited_Event()}
                >Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* edit popuop with password */}
      <div id="edit_with_password" className="modaloverlay edit_popup_password">
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
              Edit Event
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

          {/* </div> */}
          {/* </form> */}
        </div>
      </div>

      <div id="delete" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure, You Want To Delete this Event?
              </h2>

              <div className="d-flex mt-3" style={{ gap: "10px" }}>
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
                  href="#delete_with_protection"
                  style={{ color: "grey", fontSize: "15PX" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Delete"
                    // onClick={() => deleteMessage()}
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

      <div id="delete_row" className="modaloverlay delete_container_row">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure That You Want To Delete This Event?
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
                  href="#delete_with_protection"
                  style={{ color: "grey", fontSize: "15PX" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Delete"
                    // onClick={() => deleteMessage()}
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
              Delete Event
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

          {/* </div> */}
          {/* </form> */}
        </div>
      </div>

      <div
        className="show_delete_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Campus Event Deleted Successfully!!
        </p>
      </div>

      <div
        className="show_edit_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Campus Event Updated Successfully!!
        </p>
      </div>

      <div style={{ width: "100%" }}>
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
                placeholder="Search by event name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          {/* <div className="col-md-1 d-flex flex-row">
            <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} />

          </div> */}
          <div
            className="col-md-9 d-flex flex-row"
            style={{ justifyContent: "end" }}
          >
            <div style={{ marginTop: "0px", padding: "0" }}>
              <Link to="/createEvent">
                <button
                  type="button"
                  className="d-flex  create_button"
                  defaultValue="Sign Up"
                >
                  <div className="create_button_inner">Create Event</div>
                  <img
                    className="create_button_img"
                    src="dist/img/Progress.png"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome_modal">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="welcome_msg_main_div mb-0">
              <div className="d-flex" style={{ justifyContent: "space-between" }}>
                <p className="welcome_msg_main_p">WELCOME TO EVENTS!</p>
                <img
                  src="dist/img/Welcom_msg_close.png"
                  onClick={() => close_welcome_modal()}
                  alt="dropdown"
                  className="close_event ml-auto cancel_img"
                />
              </div>
              <div>
                <p className="welcome_msg_inner_p">
                  Seamlessly create, share, and manage every aspect of campus events.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        className="border_class2"
        style={{ background: "#ffffff", marginTop: "10px" }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable
            columns={upcomingColumns}
            style={{ marginTop: "10PX" }}
            data={filteredItems}
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
            subHeader
            subHeaderComponent={subHeaderComponent}
            highlightOnHover
            defaultSortFieldId={1}
            customStyles={customStyles}
          />
        )}


      </div>

      {/**********************************************PREVIEW (UPCOMING)********************************************8*/}
      <div
        className="preview_polls_upcoming"
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
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Campus Event
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closePreviewDescription()}
              style={{
                cursor: "pointer",
                width: "20px",
                height: "20px",
                marginLeft: "auto",
              }}
            />
          </div>

          <div
            style={{
              background: "white",
              marginTop: "10PX",
              padding: "5px 10PX",
              border: "0.4px solid #C4C4C4",
            }}
          >
            {newData.length != "" ? (
              <PreviousNext_Button_upcoming
                data={data}
                newEventId={newEventId}
                rowIndex={rowIndex}
                passEditDataUpcoming={passEditDataUpcoming}

              />
            ) : null}
          </div>
        </div>
      </div>




      {/* *********************************************delete preview***********************88 */}

      <div
        className="delete_preview_container"
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
            <img
              src="dist/img/Cancel.png"
              onClick={close_delete_modal}
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="mt-3">
            <p style={{ fontWeight: "600", color: "black", fontSize: "13px" }}>
              Delete message
            </p>
            <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
              Are You Sure You Want To Delete This Event?
            </h2>

            <div className="d-flex mt-3">
              <input
                type="button"
                className="create_btn"
                value="Cancel"
                onClick={close_delete_modal}
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
                href="#delete_with_password"
                style={{ backgroundColor: "transparent" }}
              >
                <input
                  type="button"
                  className="create_btn"
                  id="delete_single_student"
                  value="Delete"
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

      {/* delete popuop with password */}
      <div
        id="delete_with_password"
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
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Event
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
              style={{
                color: "black",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              Recipients
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              width="21px"
              height="21px"
              className="close_event ml-auto"
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
                {/*  persona  */}
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

                  {/*  persona tab content  */}
                  <div
                    class="tab-content "
                    style={{ padding: "0px", height: "auto" }}
                  >
                    <div
                      class="tab-pane active"
                      id="4"
                      style={{ height: "100%" }}
                    >
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
                            backgroundColor: "transparent",
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

              {/*  group tab content */}
              <div class="tab-pane" id="2">
                <h3>This Is Group</h3>
              </div>

              <div class="tab-pane" id="3">
                {/*  individual content  */}

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

                      <div className="mt-2 p-0">
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ color: "green", marginLeft: "50px" }}></div>
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
