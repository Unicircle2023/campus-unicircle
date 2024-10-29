import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import Previous_next_button from "./Previous_next_button";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi";
import Swal from "sweetalert2";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#e4e9f4",
      marginRight: "0",
    },
  },

  table: {
    style: {
      backgroundColor: "#e4e9f4",
    },
  },
};

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

export function Tickets() {
  console.log("get parameter", process.env);
  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (ticket_id) => {
    setChildNewsData(ticket_id);
  };
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const passDeleteData = (ticket_id) => {
    setChildNewsData(ticket_id);
  };

  const [imgData, setImgData] = useState([]);
  const uploadingFileImage = (e) => {
    $(".hide_image").hide();
    updateFile(e.target.files[0]);
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
        imgData.push(src);
      }
    }
  };

  console.log("choosefile", chooseFileImage);
  const uploadingFile = (e) => {
    updateFile(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  };
  const [link, updateLink] = useState("");

  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  const closeWindow = () => {
    $(".preview_polls").hide();
  };

  function closeModal() {
    $(".preview_category").hide();
  }

  function edit_category() {
    $(".preview_tickets").hide();
    $(".preview_category").show();
  }

  const token = localStorage.getItem("Token");
  const [resolution, updateResolution] = useState("");
  const [ticketId, updateTicketId] = useState("");
  const [file, updateFile] = useState(null);
  const [data, setData] = useState([]);
  const [errorCode, updateErrorCode] = useState("");
  const [error_message, updateError_message] = useState("");
  const [chooseFile, setChooseFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [chooseFileImage, setChooseFileImage] = useState("");
  console.log("chooseFileImage", file);
  const [requestedby, updateRequestedBy] = useState("");
  const [category, updateCategory] = useState("");
  const [subject, updateSubject] = useState("");
  const [description, updateDescription] = useState("");
  const [image, updateImage] = useState(null);
  const [status, updateStatus] = useState("");
  const [priority, updatePriority] = useState("");
  const [analysisData, setAnalysisData] = useState([]);

  function deleteTicketModal(ticket_id) {
    console.log("ticket id", ticket_id);
    $(".delete_container").show();
  }

  function viewDescription(
    ticketId,
    requestedby,
    category,
    subject,
    description,
    image,
    status,
    priority
  ) {
    $(".preview_tickets").show();
    console.log("Tick Id", ticketId);
    updateGetTicketID(ticketId);
    updateRequestedBy(requestedby);
    updateCategory(category);
    updateSubject(subject);
    updateDescription(description);
    updateImage(image);
    updateStatus(status);
    updatePriority(priority);
  }
  $(".close_event").click(function() {
    $(".preview_tickets").hide();
  });

  const [catDetails, updateCatDetails] = useState([]);
  const [categoryName, updateCategoryName] = useState("");
  const [question, updateQuestion] = useState("");
  const [ticketCategories, setTicketCategories] = useState([]);
  const [answer, updateAnswer] = useState("");
  const [keywords, updateKeywords] = useState("");
  async function create_faqs() {
    try {
      const faqQuestion = document.getElementById("faqQuestion");
      const faqAnswer = document.getElementById("faq_Answer");
      const faqCategory = document.getElementById("faqCategory");
      const faqKeywords = document.getElementById("faqKeywords");
      if (
        faqQuestion.value == "" &&
        faqAnswer.value == "" &&
        faqCategory.value == "" &&
        faqKeywords.value == ""
      ) {
        $(".ValueMsg").show();
        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (faqQuestion.value == "") {
        $(".FaqQuestion").show();
        setTimeout(function() {
          $(".FaqQuestion").hide();
        }, 3000);
      } else if (faqAnswer.value == "") {
        $(".FaqAnswer").show();
        setTimeout(function() {
          $(".FaqAnswer").hide();
        }, 3000);
      } else if (faqKeywords.value == "") {
        $(".FaqKeywords").show();
        setTimeout(function() {
          $(".FaqKeywords").hide();
        }, 3000);
      } else {
        const formData = new FormData();
        formData.append("question", question);
        formData.append("answer", answer);
        formData.append("category", category);
        formData.append("keyword", keywords);
        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "create_faqs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: token,
            },
          }
        );
        console.log("Create Faq", response);
        setTimeout(() => {
          updateError_message(response.data.message);
        }, 3000);
        updateQuestion("");
        updateAnswer("");
        updateCategory("");
        updateKeywords("");
        $(".formSuccess").show();
        setTimeout(function() {
          $(".formSuccess").hide();
          $(".preview_polls").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchFaqCategory() {
    try {
      const fetchFaqCategoryResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_faq_categories",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log("Get FAQ Category", fetchFaqCategoryResponse.data.data);
      updateCatDetails(fetchFaqCategoryResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchFaqCategory();
  }, []);

  console.log("onChnage image FILE", file);
  async function edit_ticket() {
    try {
      const formData = new FormData();
      formData.append("tid", ticketId);
      formData.append("description", solutionData);
      formData.append("image", file);
      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_edit_ticket_solution",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Create Resolution", response);
      setTimeout(() => {
        updateError_message(response.data.message);
      }, 3000);

      updateErrorCode(response.data.error_code);
      updateResolution("");
      updateFile("");
      $(".alertMsg").show();
      setTimeout(function() {
        $(".preview_polls").hide();
        $(".alertMsg").hide();
      }, 2000);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [solutionData, setSolutionData] = useState([]);
  const [ticketDesc, updateTicketDesc] = useState("");
  const [ticketData, updateTicketData] = useState([]);
  const [getTicketTitle, updateGetTicketTitle] = useState("");
  const [getTicketID, updateGetTicketID] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [Image, setImage] = useState("");

  function deleteTicket(ticket_id, requested_by) {
    updateGetTicketTitle(requested_by);
    updateGetTicketID(ticket_id);
    console.log("name_of_student", requested_by);
    console.log("student id", ticket_id);
    $(".delete_container").show();
  }

  function preview() {
    $(".preview_polls").show();
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  async function fetchEditId(tick_id) {
    const formData = new FormData();
    formData.append("tid", tick_id);
    const ticketSolutionResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_ticket_solution",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("ticket Solution Response..........>>", ticketSolutionResponse);
    if (ticketSolutionResponse.data.error_code == 200) {
      ticketSolutionResponse.data.data.map((item) => {
        updateTicketDesc(item.description);
        console.log("get image file", item.file);
        setChooseFileImage(item.file_name);
        updateLink(item.file);
        updateFile(item.file);
      });
    }

    updateTicketId(tick_id);
    admin_open_ticket(tick_id);
    fetchTicket(tick_id);
  }
  console.log("file", file);
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

    console.log("Get campus info", fetchResponse.data.data);
    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  async function deleteWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteTicketResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("check password and verify", deleteTicketResponse);
    updatedeleteErrorCode(deleteTicketResponse.data.error_code);
    updatedeleteErrorMessage(deleteTicketResponse.data.message);

    if (deleteTicketResponse.data.error_code == 200) {
      deleteTicketApi();
    }
  }

  async function deleteTicketApi() {
    try {
      console.log("Ticket id", getTicketID);
      const formData = new FormData();

      formData.append("id", getTicketID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_ticket",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Ticket", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "'Yes, delete it!'..",
      type: "success",
      text: "Ticket Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/ticketsDashboard";
    });
  };

  var ticketDescription = "";
  var ticketImage = "";
  async function fetchTicket(tick_id) {
    console.log("Access Token-", ticketId);
    try {
      const formData = new FormData();

      formData.append("tid", tick_id);

      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_ticket_solution",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get single Ticket Details", fetchResponse);

      const TicketErrorCode = fetchResponse.data.error_code;
      console.log("Ticket Error Code ", TicketErrorCode);

      if (TicketErrorCode == 200) {
        const ticketListArray = fetchResponse.data.data;
        console.log("Ticket list Array", ticketListArray);

        ticketListArray.map((item) => {
          ticketDescription = item.description;
          ticketImage = item.file;
          console.log("Ticket Image", ticketImage);
        });

        console.log("ticketDescription", ticketDescription);
        setSolutionData(ticketDescription);
        setImage(ticketImage);
      } else {
        setSolutionData([]);

        console.log(fetchResponse.data.message);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function fetchDeleteId(id) {}
  async function deleteTick() {
    $(".delete_container").hide();
    try {
      console.log("Ticket idsdddddddddddddddddddddddddd", getTicketID);
      const formData = new FormData();

      formData.append("id", getTicketID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_ticket",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Ticket", deleteResponse);

      if (deleteResponse.data.error_code == 200) {
        handleButton();
        //   $(".show_delete_message").show();
        // window.location.href = "/ticketsDashboard";
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  const getImage = (e) => {
    updateImage(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
    $(".showImg").hide();
  };

  //console.log("Ticket Id",ticketId)
  async function admin_open_ticket(tick_id) {
    try {
      setIsLoadingPreview(true);
      // console.log("ticket idddd", id)
      const formData = new FormData();

      formData.append("tid", tick_id);

      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_open_ticket",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      console.log("Ticket Response", response.data);
      setIsLoadingPreview(false);
      // if(response.data.error_code == 200){
      //   preview();
      //   updateTicketData([response.data])
      // }
      // else{
      //   updateTicketData([])
      // }

      if (response.data.error_code == 200) {
        preview();
        const ticketListArray = response.data.data;
        console.log("Ticket list Array", ticketListArray);
        updateTicketData(ticketListArray);
      } else {
        updateTicketData([]);

        console.log(response.data.message);
      }

      console.log("get single ticket", response.data);
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoadingPreview(false);
    }
  }

  async function fetchList() {
    console.log("Access Token-", token);
    try {
      setIsLoading(true);
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_all_ticket",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("admin_get_all_ticket", fetchResponse);
      setIsLoading(false);

      const TicketErrorCode = fetchResponse.data.error_code;
      console.log("Ticket Error Code ", TicketErrorCode);

      if (TicketErrorCode == 200) {
        const ticketListArray = fetchResponse.data.data;
        console.log("Ticket list Array", ticketListArray);
        setData(ticketListArray);
      } else {
        setData([]);
        console.log(fetchResponse.data.message);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  async function fetchTicketAnalysis() {
    console.log("Access Token-", token);
    try {
      setIsLoading(true);
      const ticketAnalysis = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_ticket_analysis",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("ticket analysis", ticketAnalysis);
      setIsLoading(false);

      const AnalysisErrorCode = ticketAnalysis.data.error_code;
      console.log("Analysis Error Code ", AnalysisErrorCode);

      if (AnalysisErrorCode == 200) {
        const analysisListArray = ticketAnalysis.data.data;
        console.log("Ticket list Array", analysisListArray);
        setAnalysisData(analysisListArray);
      } else {
        setAnalysisData([]);

        console.log(ticketAnalysis.data.message);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  async function fetchCategories() {
    console.log("Access Token-", token);
    try {
      setIsLoading(true);
      const fetchCategory = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_all_ticket_category",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Ticket Categories", fetchCategory);
      setIsLoading(false);

      const TicketErrorCode = fetchCategory.data.error_code;
      console.log("Ticket Error Code ", TicketErrorCode);

      if (TicketErrorCode == 200) {
        const ticketcatArray = fetchCategory.data.data;
        console.log("Ticket list Array", ticketcatArray);
        setTicketCategories(ticketcatArray);
      } else {
        setTicketCategories([]);

        console.log(fetchCategory.data.message);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }
  {
    data.map((item, index) => {
      // console.log("student id", item.student_id);
    });
  }
  useEffect(() => {
    fetchList();
    fetchCategories();
    fetchTicketAnalysis();
  }, []);

  const columns = [
    {
      name: "ID",
      // selector: 'student_name',
      // sortable: true,
      width: "10%",
      wrap: true,
      cell: (row) => {
        console.log("row ticket id", row.ticket_id);
        return (
          <div
            onClick={() =>
              viewDescription(
                row.ticket_id,
                row.requested_by,
                row.category,
                row.subject,
                row.description,
                row.image,
                row.status,
                row.priority
              )
            }
          >
            {row.ticket_id}
          </div>
        );
      },
    },

    {
      name: "Requested By",
      // selector: 'student_id',
      // sortable: true,
      width: "auto",
      wrap: true,
      cell: (row) => {
        console.log("ROW REQUESTED BY", row.subject);
        return (
          <div
            onClick={() =>
              viewDescription(
                row.ticket_id,
                row.requested_by,
                row.category,
                row.subject,
                row.description,
                row.image,
                row.status,
                row.priority
              )
            }
          >
            {row.requested_by}
          </div>
        );
      },
    },
    {
      name: "Subject",
      // selector: 'persona',
      // sortable: true,
      width: "30%",
      wrap: true,
      cell: (row) => {
        console.log("ROW", row.persona);
        return (
          <div
            onClick={() =>
              viewDescription(
                row.ticket_id,
                row.requested_by,
                row.category,
                row.subject,
                row.description,
                row.image,
                row.status,
                row.priority
              )
            }
          >
            {row.subject}
          </div>
        );
      },
    },
    {
      name: "Status",
      // selector: 'email',
      // sortable: true,
      width: "10%",
      wrap: true,
      cell: (row) => {
        console.log("ROW", row.email);
        return (
          <div
            onClick={() =>
              viewDescription(
                row.ticket_id,
                row.requested_by,
                row.category,
                row.subject,
                row.description,
                row.image,
                row.status,
                row.priority
              )
            }
            style={{ color: "#c0a200", fontSize: "12PX", marginTop: "5px" }}
          >
            {row.status}
          </div>
        );
      },
    },
    {
      name: "Action",
      // selector: 'campus',
      // sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        console.log("fetch image", row);
        return (
          <div className="d-flex">
            <div
              className="dropdown"
              style={{
                marginTop: "5px",
                float: "right",
                marginLeft: "20px",
                zIndex: "10px",
                padding: "0",
              }}
            >
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  border: "none",
                  background: "#4779f0",
                  color: "white",
                  fontSize: "12PX",
                  borderRadius: "3px",
                  padding: "5px 12px",
                  margin: "0 0 0 40px",
                }}
              >
                Actions
              </button>

              <ul
                className="dropdown-menu"
                style={{
                  width: "193px",
                  padding: "10px",
                  border: "0.2px solid #f5f5f5",
                  borderRadius: "0PX",
                  marginTop: "2PX",
                }}
              >
                <li>
                  <a onClick={preview} class="dropdown-item">
                    <div
                      className="d-flex"
                      onClick={() => fetchEditId(row.ticket_id)}
                    >
                      <img
                        src={require("../images/Reply Arrow.png")}
                        style={{ width: "30px", height: "25px" }}
                      />
                      <p
                        style={{
                          marginLeft: "10PX",
                          fontSize: "12px",
                          fontWeight: "500",
                          marginTop: "5PX",
                        }}
                      >
                        Resolve
                      </p>
                    </div>
                  </a>
                </li>

                <li>
                  <a onClick={preview} class="dropdown-item">
                    <div className="d-flex">
                      <img
                        src={require("../images/Multimedia Publishing.png")}
                        style={{ width: "30px", height: "25px" }}
                      />
                      <p
                        style={{
                          marginLeft: "10PX",
                          fontSize: "12px",
                          fontWeight: "500",
                          marginTop: "5PX",
                        }}
                        onClick={() => fetchDeleteId(row.ticket_id)}
                      >
                        Add to FAQ
                      </p>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    className="cta dropdown-item"
                    href="#delete"
                    onClick={() =>
                      deleteTicket(row.ticket_id, row.requested_by)
                    }
                  >
                    <div className="d-flex">
                      <img
                        src={require("../images/Close Window.png")}
                        style={{ width: "30px", height: "25px" }}
                      />
                      <p
                        style={{
                          marginLeft: "10PX",
                          fontSize: "12px",
                          fontWeight: "500",
                          marginTop: "5PX",
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
      // <FilterComponentTicket
      //   onFilter={e => setFilterText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterText}
      // />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div
      className="content-wrapper">
      <div id="delete" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete Ticket
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure, You Want To Delete This Ticket?
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
      </div>
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
              Delete Ticket
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

      {/* ****************************edit Form********************************************************8 */}
      <div
        className="preview_category"
        id="previewNews"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          display: "none",
          zIndex: "8",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "absolute",
            bottom: "0px",
            right: "5px",
            width: "420px",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              marginTop: "28px",
              transform: "rotate(0.13deg)",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "600" }}
            >
              Tickets
            </label>

            <a
              href="#"
              onClick={closeModal}
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                width="18px"
                height="16px"
                className="close_event ml-auto"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
          {/* category & question */}
          <div>
            <div className="mt-2 p-0">
              <div className="row">
                <div className="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Requested By
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
                      type="name"
                      className="input-field"
                      autoComplete="true"
                      value={requestedby}
                      onChange={(e) => updateRequestedBy(e.target.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "0.5px solid #c4c4c4",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0">
              <div className="row">
                <div className="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Category
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
                      id="news_category"
                      aria-label=".form-select-sm example"
                      onChange={(e) => updateCategory(e.target.value)}
                      style={{
                        fontSize: "10px",
                        width: "100%",
                        height: "35px",
                        padding: "5px",
                        color: "black",
                        border: "1px solid #c4c4c4",
                        borderRadius: "0px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option
                        selected="selected"
                        value={category}
                        style={{ padding: "6px" }}
                      >
                        {category}
                      </option>
                      {ticketCategories.map((news, index) => {
                        return (
                          <option value={news.cat_id} key={index}>
                            {news.cat_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0">
              <div className="row">
                <div className="col-md-11">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      type="name"
                      rows="4"
                      className="input_fields"
                      id="news_description"
                      value={description}
                      onChange={(e) => updateDescription(e.target.value)}
                      style={{
                        width: "100%",
                        height: "80px",
                        border: "0.5px solid #c4c4c4",
                        boxSizing: "border-box",
                        fontSize: "10PX",
                        padding: "5px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-0 p-0">
              <div className="row">
                <div className="col-md-11">
                  <label
                    style={{
                      color: "#1F3977",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Image
                  </label>
                  <label for="file-ip-1">
                    <img
                      className="showImg"
                      src={image}
                      style={{
                        height: "115px",
                        width: "126px",
                        marginLeft: "10px",
                      }}
                    ></img>
                    <img
                      id="file-ip-1-preview"
                      style={{
                        display: "none",
                        height: "115px",
                        width: "126px",
                        marginLeft: "10px",
                      }}
                    />
                  </label>

                  <input
                    type="file"
                    name="photo"
                    style={{ visibility: "hidden", height: "10px" }}
                    onChange={getImage}
                    id="file-ip-1"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 p-0">
              <div className="row">
                <div className="col-md-11">
                  <div className="d-flex">
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      Status
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
                    id="news_category"
                    aria-label=".form-select-sm example"
                    value={status}
                    onChange={(e) => updateStatus(e.target.value)}
                    style={{
                      fontSize: "10px",
                      width: "100%",
                      height: "35px",
                      padding: "5px",
                      color: "black",
                      border: "1px solid #c4c4c4",
                      borderRadius: "0px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option
                      selected="selected"
                      value="1"
                      style={{ padding: "6px" }}
                    >
                      Open
                    </option>
                    <option
                      selected="selected"
                      value="2"
                      style={{ padding: "6px" }}
                    >
                      Closed
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-2 p-0">
              <div className="row">
                <div className="col-md-11">
                  <div className="d-flex">
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      Priority
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
                    id="news_category"
                    aria-label=".form-select-sm example"
                    value={priority}
                    onChange={(e) => updatePriority(e.target.value)}
                    style={{
                      fontSize: "10px",
                      width: "100%",
                      height: "35px",
                      padding: "5px",
                      color: "black",
                      border: "1px solid #c4c4c4",
                      borderRadius: "0px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option
                      selected="selected"
                      value="1"
                      style={{ padding: "6px" }}
                    >
                      Low
                    </option>
                    <option value="2" style={{ padding: "6px" }}>
                      Medium
                    </option>
                    <option value="3" style={{ padding: "6px" }}>
                      High
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* ******************button********************** */}
            <div
              className="d-flex form-buttons mt-4"
              style={{ paddingRight: "30px" }}
            >
              <input
                type="button"
                className=" form-buttons3 ml-auto"
                defaultValue="Next Step"
                onClick={closeModal}
                value="Cancel"
                style={{
                  fontWeight: "500",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  backgroundColor: "#6e7781",
                  padding: "5px 30px",
                  fontSize: "10PX",
                }}
              />

              <input
                type="button"
                className=" form-buttons3"
                defaultValue="Next Step"
                //onClick={() => saveTicket()}
                value="Save"
                style={{
                  fontWeight: "500",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  marginLeft: "5px",
                  backgroundColor: "#1F3977",
                  padding: "5px 30px",
                  fontSize: "10PX",
                }}
              />
            </div>
            <div
              style={{ display: "none", color: "green" }}
              className="saveNewsMsg"
            >
              Ticket Edited Successfully...
            </div>
          </div>
        </div>
      </div>

      <div
        className="show_delete_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        {/* <img src={require("../images/tick.png")} style={{width:"18px",height:"18px",marginRight:"5px"}}/> */}
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Ticket Deleted Successfully!!
        </p>
      </div>

      <div>
        {/* <div className="row" style={{ width: "100%", margin: "0", padding: "5px 0", marginTop: "21px" }} > */}

        {/* <div className="col-md-6" style={{ height: "100%", padding: "0px" }}>
            <h4 style={{ color: "#000000", fontWeight: "600", fontFamily: "Poppins", fontStyle: "normal", fontSize: "16px", lineHeight: "24px", marginTop: "7px" }} >Tickets</h4>
          </div> */}

        {/* <div className="col-md-2 d-flex flex-row">
            <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} />

          </div> */}
        {/* </div> */}
        {analysisData.map((item) => {
          console.log("Ticket Item", item);
          return (
            <div
              className="row mt-2 border_class2 box_padding">
              <div className="col-md-2" style={{ height: "100%" }}>
                <div
                  className="small-box"
                  style={{
                    width: "185px",
                    height: "97px",
                    padding: "5px 15px 1px 5px",
                    borderRadius: "10PX",
                  }}
                >
                  <div className="inner">
                    <div className="d-flex">
                      <img
                        src={require("../images/Two Tickets.png")}
                        style={{
                          marginTop: "-4px",
                          height: "43px",
                          width: "43px",
                        }}
                        alt="dropdown"
                      />
                    </div>

                    <div
                      className="d-flex"
                      style={{
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-31px",
                        fontSize: "25px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">{item.total_ticket}</div>
                    </div>

                    <div
                      className="d-flex"
                      style={{
                        color: "rgba(0, 0, 0, 0.7)",
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-15px",
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">Total Tickets</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-2" style={{ height: "100%" }}>
                <div
                  className="small-box"
                  style={{
                    width: "185px",
                    height: "97px",
                    padding: "5px 15px 1px 5px",
                    borderRadius: "10PX",
                  }}
                >
                  <div className="inner">
                    <div className="d-flex">
                      <img
                        src={require("../images/Hourglass.png")}
                        style={{
                          marginTop: "-4px",
                          height: "43px",
                          width: "43px",
                        }}
                        alt="dropdown"
                      />
                    </div>
                    <div
                      className="d-flex"
                      style={{
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-31px",
                        fontSize: "25px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">{item.open_ticket}</div>
                    </div>
                    <div
                      className="d-flex"
                      style={{
                        color: "rgba(0, 0, 0, 0.7)",
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-15px",
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">Open Tickets</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-2" style={{ height: "100%" }}>
                <div
                  className="small-box"
                  style={{
                    width: "185px",
                    height: "97px",
                    padding: "5px 15px 1px 5px",
                    borderRadius: "10PX",
                  }}
                >
                  <div className="inner">
                    <div className="d-flex">
                      <img
                        src={require("../images/Closed Sign.png")}
                        style={{
                          marginTop: "-4px",
                          height: "43px",
                          width: "43px",
                        }}
                        alt="dropdown"
                      />
                    </div>
                    <div
                      className="d-flex"
                      style={{
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-31px",
                        fontSize: "25px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">{item.close_ticket}</div>
                    </div>
                    <div
                      className="d-flex"
                      style={{
                        color: "rgba(0, 0, 0, 0.7)",
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-15px",
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">Closed Tickets</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-2" style={{ height: "100%" }}>
                <div
                  className="small-box"
                  style={{
                    width: "185px",
                    height: "97px",
                    padding: "5px 15px 1px 5px",
                    borderRadius: "10PX",
                  }}
                >
                  <div className="inner">
                    <div className="d-flex">
                      <img
                        src={require("../images/Remove.png")}
                        style={{
                          marginTop: "-4px",
                          height: "43px",
                          width: "43px",
                        }}
                        alt="dropdown"
                      />
                    </div>

                    <div
                      className="d-flex"
                      style={{
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-31px",
                        fontSize: "25px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">{item.delete_count}</div>
                    </div>

                    <div
                      className="d-flex"
                      style={{
                        color: "rgba(0, 0, 0, 0.7)",
                        marginLeft: "auto",
                        fontWeight: "600",
                        lineHeight: "36px",
                        marginTop: "-15px",
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      <div className="ml-auto">Deleted Tickets</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="d-flex flex-row search_box_div">
                  <img
                    className="search_box_img"
                    src={require("../images/Search.png")}
                  />
                  <Input
                    className="search_box"
                    id="search"
                    type="text"
                    placeholder="Search by ticket ID"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  ></Input>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="row mt-2"
        style={{
          background: "#e4e9f4 ",
          padding: "0",
          marginLeft: "0",
          marginRight: "0",
        }}
      >
        <div style={{ background: "rgba(31, 57, 119, 0.9)", height: "40px" }}>
          <br></br>
          <center>
            <div>
              <p
                style={{
                  color: "#FFFFFF",
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "21px",
                  marginTop: "-14px",
                }}
              >
                All Tickets
              </p>
            </div>
          </center>
        </div>
      </div>
      {/* </div> */}

      {/* Dropdown end here */}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="border_class">
          <DataTable
            style={{ border: "1px solid green" }}
            // class="table" id="grid1"
            columns={columns}
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
            // selectableRows
            customStyles={customStyles}
          />
        </div>
      )}
      {/* PREVIEW  for resolve*/}
      <div
        className="preview_tickets"
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
              marginTop: "28px",
              transform: "rotate(0.13deg)",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Tickets
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* category & question */}

          <div
            style={{
              background: "white",
              marginTop: "10PX",
              padding: "5px 10PX",
              border: "0.4px solid #C4C4C4",
              height: "100%",
            }}
          >
            {data.length != "" ? (
              <Previous_next_button
                data={data}
                passEditData={passEditData}
                passDeleteData={passDeleteData}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* <StudentTable /> */}
      {/* end news table */}

      {/* PREVIEW  for Tickets Display*/}

      <div
        className="preview_polls"
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
        {isLoadingPreview ? (
          <LoadingSpinner />
        ) : (
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
                marginTop: "28px",
                transform: "rotate(0.13deg)",
              }}
            >
              <label
                style={{ color: "black", fontSize: "13px", fontWeight: "700" }}
              >
                Ticket
              </label>

              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="close_event ml-auto"
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
              />
            </div>

            <div
              className="preview_form"
              style={{
                fontSize: "11PX",
                margin: "5px 0 0 0",
                padding: "0px 5px 60px 0px",
                overflowY: "auto",
                height: "600px",
              }}
            >
              {/* category & question */}
              <div
                style={{
                  background: "white",
                  marginTop: "5PX",
                  padding: "10PX ",
                  border: "0.4px solid #C4C4C4",
                }}
              >
                <div className="d-flex">
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    Ticket ID
                  </h4>
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    :
                  </h4>
                  {ticketData.length > 0 ? (
                    ticketData.map((item) => {
                      return (
                        <div>
                          <h4
                            style={{
                              fontSize: "10PX",
                              fontWeight: "500",
                              color: "#4779f0",
                            }}
                          >
                            {item == "" ? <p>-</p> : <p>{item.ticket_id}</p>}
                          </h4>
                        </div>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}

                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginLeft: "87px",
                      marginRight: "7PX",
                    }}
                  >
                    Priority
                  </h4>
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    :
                  </h4>

                  {ticketData.length > 0 ? (
                    ticketData.map((item) => {
                      return (
                        <h4
                          style={{
                            fontSize: "10PX",
                            fontWeight: "500",
                            color: "#6948c5",
                          }}
                        >
                          {item == "" ? <p>-</p> : <p>{item.priority}</p>}
                        </h4>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}

                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginLeft: "auto",
                      marginRight: "7PX",
                    }}
                  >
                    Status
                  </h4>
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    :
                  </h4>
                  {ticketData.length > 0 ? (
                    ticketData.map((item) => {
                      return (
                        <h4
                          style={{
                            fontSize: "10PX",
                            fontWeight: "500",
                            color: "#15a312",
                          }}
                        >
                          {item == "" ? <p>-</p> : <p>{item.status}</p>}
                        </h4>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}
                </div>

                <div
                  className="d-flex"
                  style={{
                    background: "#e4e9f3",
                    padding: "7px",
                    margin: "7px 3px 0px 3px",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: "600",
                      fontSize: "11PX",
                      marginRight: "7PX",
                    }}
                  >
                    Requested By :
                  </p>
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    {ticketData.length > 0 ? (
                      ticketData.map((item) => {
                        return (
                          <p
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "11PX",
                            }}
                          >
                            {item == "" ? <p>-</p> : <p>{item.requested_by}</p>}
                          </p>
                        );
                      })
                    ) : (
                      <div>Data Not Found</div>
                    )}
                  </h4>
                </div>

                <div
                  className="d-flex"
                  style={{
                    background: "#e4e9f3",
                    padding: "7px",
                    margin: "7px 3px 0px 3px",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: "600",
                      fontSize: "11PX",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    Subject
                  </p>
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    :
                  </h4>

                  {ticketData.length > 0 ? (
                    ticketData.map((item) => {
                      return (
                        <p
                          style={{
                            color: "black",
                            fontWeight: "600",
                            fontSize: "11PX",
                          }}
                        >
                          {item == "" ? <p>-</p> : <p> {item.subject}</p>}
                        </p>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}
                </div>

                <div
                  className="d-flex"
                  style={{
                    background: "#e4e9f3",
                    padding: "7px",
                    margin: "7px 3px 0px 3px",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: "600",
                      fontSize: "11PX",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    Description
                  </p>
                  <h4
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "10PX",
                      fontWeight: "500",
                      marginRight: "7PX",
                    }}
                  >
                    {" "}
                    :
                  </h4>
                  {ticketData.length > 0 ? (
                    ticketData.map((item) => {
                      return (
                        <p
                          style={{
                            color: "black",
                            fontWeight: "600",
                            fontSize: "11PX",
                          }}
                        >
                          {item == "" ? <p>-</p> : <p> {item.description}</p>}
                        </p>
                      );
                    })
                  ) : (
                    <div>Data Not Found</div>
                  )}
                </div>
              </div>

              {/* response */}

              <div
                className="d-flex"
                style={{
                  color: "black",
                  fontSize: "11PX",
                  fontWeight: "600",
                  margin: "10px 0px",
                }}
              >
                <p>Actions:</p>
                <p style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "5px" }}>
                  {" "}
                  Performing Actions related to the above ticket
                </p>
              </div>

              <div
                id="exTab4"
                className="container"
                style={{ marginTop: "10PX", padding: "0" }}
              >
                <ul className="nav nav-tabs-ticket">
                  <li className="active">
                    <a href="#1" data-toggle="tab">
                      Resolve
                    </a>
                  </li>
                  <li style={{ marginLeft: "5PX" }}>
                    <a href="#2" data-toggle="tab">
                      Add to FAQ
                    </a>
                  </li>
                </ul>

                <div className="tab-content ">
                  <div className="tab-pane active" id="1">
                    <div>
                      <p
                        style={{
                          color: "rgba(0, 0, 0, 0.7)",
                          fontSize: "11PX",
                          fontWeight: "600",
                        }}
                      >
                        Resolution
                      </p>
                      <div
                        style={{
                          background: "#e4e9f3",
                          fontWeight: "600",
                          padding: "5px",
                          margin: "7px 3px 0px 3px",
                          color: "#1f3977",
                          fontSize: "10PX",
                        }}
                      >
                        <textarea
                          id="faqAnswer"
                          value={solutionData}
                          onChange={(e) => setSolutionData(e.target.value)}
                          style={{
                            height: "300px",
                            border: "none",
                            background: "#e4e9f3",
                            fontWeight: "600",
                            padding: "10px",
                            margin: "3px",
                            fontSize: "11PX",
                            width: "100%",
                            color: "black",
                          }}
                        />
                      </div>

                      <div
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "11PX",
                          fontWeight: "600",
                          margin: "10px 0px",
                        }}
                      >
                        <p>Attachments:</p>
                        <p
                          style={{
                            color: "rgba(0, 0, 0, 0.6)",
                            marginLeft: "5px",
                          }}
                        >
                          {" "}
                          Attach files and documents related to this ticket
                        </p>
                      </div>
                      <div className="d-flex">
                        <label
                          for="add_imagee"
                          style={{
                            background: "#15a312",
                            color: "white",
                            borderRadius: "2px",
                            fontSize: "12PX",
                            padding: "4px",
                            border: "none",
                          }}
                        >
                          Attach Files
                        </label>
                        <input
                          type="file"
                          name="photo"
                          onChange={uploadingFileImage}
                          id="add_imagee"
                          style={{ width: "2PX", position: "absolute" }}
                        />

                        {file != "" ? (
                          <div>
                            {/* preview file */}
                            <div
                              className="d-flex multipleImages"
                              id="file-ip-1-preview"
                              style={{ width: "100%" }}
                            >
                              {imgData.map((item) => {
                                console.log("print attach document", item);
                                return (
                                  <div style={{ marginLeft: "5px" }}>
                                    <a
                                      href={item}
                                      target="_blank"
                                      className="hide_image"
                                    >
                                      <p>Document Uploded Successfully</p>
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {ticketData.length > 0 ? (
                          ticketData.map((item) => {
                            return (
                              <p
                                style={{
                                  color: "black",
                                  fontWeight: "600",
                                  fontSize: "11PX",
                                }}
                              >
                                {file == "" ? (
                                  <p>-</p>
                                ) : (
                                  <div>
                                    <a
                                      href={file}
                                      target="_blank"
                                      className="hide_image"
                                    >
                                      <p> click here to view</p>
                                    </a>
                                  </div>
                                )}
                              </p>
                            );
                          })
                        ) : (
                          <div>Data Not Found</div>
                        )}
                      </div>
                      <div className="d-flex mt-4">
                        <button
                          onClick={() => closeWindow()}
                          style={{
                            background: "white",
                            color: "#1f3977",
                            borderRadius: "2px",
                            fontSize: "12PX",
                            padding: "8PX 15PX",
                            border: "none",
                            marginLeft: "AUTO",
                            fontWeight: "600",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          style={{
                            background: "#1f3977",
                            color: "white",
                            borderRadius: "6px",
                            fontSize: "12PX",
                            padding: "8PX 25PX",
                            border: "none",
                            fontWeight: "600",
                          }}
                          onClick={() => edit_ticket()}
                        >
                          Submit
                        </button>
                      </div>
                      <div
                        style={{
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          marginTop: "10px",
                        }}
                      >
                        {errorCode == 200 ? (
                          <div className="alertMsg">
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="success">
                                {error_message}
                              </Alert>
                            </Stack>
                          </div>
                        ) : errorCode == 406 ? (
                          <div className="alertMsg">
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="error">
                                Please Enter Some Resolution..
                              </Alert>
                            </Stack>
                          </div>
                        ) : errorCode == 409 ? (
                          <div className="alertMsg">
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="error">
                                {error_message}
                              </Alert>
                            </Stack>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {ErrorMessage} */}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="2">
                    <div>
                      <p
                        style={{
                          color: "black",
                          fontSize: "11PX",
                          fontWeight: "600",
                          marginTop: "10PX",
                        }}
                      >
                        Question *
                      </p>

                      <input
                        type="text"
                        placeholder="Add a question..."
                        id="faqQuestion"
                        value={question}
                        onChange={(e) => updateQuestion(e.target.value)}
                        style={{
                          height: "38px",
                          border: "none",
                          background: "#e4e9f3",
                          fontWeight: "600",
                          padding: "10px",
                          margin: "7px 3px 0px 0px",
                          color: "grey",
                          fontSize: "8PX",
                          width: "100%",
                        }}
                      />

                      <div
                        className="FaqQuestion"
                        style={{ margin: "0", display: "none" }}
                      >
                        <h4
                          className="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Question
                        </h4>
                      </div>

                      <p
                        style={{
                          color: "black",
                          fontSize: "11PX",
                          fontWeight: "600",
                          marginTop: "10PX",
                        }}
                      >
                        Answer *
                      </p>

                      <textarea
                        id="faq_Answer"
                        onChange={(e) => updateAnswer(e.target.value)}
                        value={answer}
                        style={{
                          height: "300px",
                          border: "none",
                          background: "#e4e9f3",
                          fontWeight: "600",
                          padding: "10px",
                          margin: "7px 3px 0px 0px",
                          color: "grey",
                          fontSize: "8PX",
                          width: "100%",
                        }}
                      />

                      <div
                        className="FaqAnswer"
                        style={{ margin: "0", display: "none" }}
                      >
                        <h4
                          className="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Answer
                        </h4>
                      </div>

                      <p
                        style={{
                          color: "black",
                          fontSize: "11PX",
                          fontWeight: "600",
                          marginTop: "10PX",
                        }}
                      >
                        Category *
                      </p>

                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        id="faqCategory"
                        onChange={(e) => updateCategory(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "5px",
                          fontSize: "12px",
                          color: "grey",
                          border: "0.5px solid #c4c4c4",
                          height: "30px",
                          borderRadius: "0",
                          marginTop: "3px",
                        }}
                      >
                        <option selected="selected" value={category}>
                          Select Category
                        </option>
                        {catDetails &&
                          catDetails.map((catItem, index) => {
                            console.log("Id", catItem.cat_id);
                            return (
                              <option value={catItem.cat_id} key={index}>
                                {catItem.category_name}
                              </option>
                            );
                          })}
                      </select>
                      <div
                        className="FaqCategory"
                        style={{ margin: "0", display: "none" }}
                      >
                        <h4
                          className="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select Category
                        </h4>
                      </div>

                      <p
                        style={{
                          color: "black",
                          fontSize: "11PX",
                          fontWeight: "600",
                          marginTop: "10PX",
                        }}
                      >
                        Keywords *
                      </p>

                      <input
                        type="text"
                        placeholder="Enter keywords"
                        id="faqKeywords"
                        value={keywords}
                        onChange={(e) => updateKeywords(e.target.value)}
                        style={{
                          height: "30px",
                          border: "none",
                          background: "#e4e9f3",
                          fontWeight: "600",
                          padding: "10px",
                          margin: "7px 3px 0px 0px",
                          color: "grey",
                          fontSize: "8PX",
                          width: "100%",
                        }}
                      />
                      <div
                        className="FaqKeywords"
                        style={{ margin: "0", display: "none" }}
                      >
                        <h4
                          className="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Keywords
                        </h4>
                      </div>

                      <div className="d-flex mt-5">
                        <input
                          type="button"
                          className="create_btn form-buttons3"
                          defaultValue="Sign Up"
                          value="Publish"
                          onClick={() => create_faqs()}
                          style={{
                            background: "#1f3977",
                            color: "white",
                            borderRadius: "6px",
                            fontSize: "12PX",
                            padding: "8PX 25PX",
                            border: "none",
                            fontWeight: "600",
                            marginLeft: "AUTO",
                          }}
                        />
                      </div>
                      <div
                        className="formSuccess"
                        style={{
                          marginTop: "5px",
                          marginLeft: "14px",
                          width: "94%",
                          marginRight: "198px",
                          display: "none",
                        }}
                      >
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert variant="filled" severity="success">
                            {error_message}
                          </Alert>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
