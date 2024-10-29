import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Previous_next_button from "./Previous_next_button";
import moment from "moment";
import { Recipient } from "./Recipient";
import { NewRecipient } from "./NewRecipient";
import { PersonaRecipient } from "./PersonaRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import Alert from "@mui/material/Alert";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";
import SummerNote from "../SummerNote/SummerNote";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
  autoComplete: "off",
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
      padding: "10px 0 10px 15px",
      border: "none",
    },
  },

  head: {
    style: {
      padding: "10px 0 10px 15px",
      fontWeight: "600",
      color: "#1F3977",
      fontSize: "10px",
    },
  },
  table: {
    style: {
      padding: "0",
    },
  },
};

export function News() {
  $(document).ready(function () {
    $("#news_title").keypress(function (e) {
      var key = e.keyCode;
      if (key >= 48 && key <= 57) {
        e.preventDefault();
      }
    });
  });

  var startDate = "";
  var expDate = "";

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };
  const [page, setPage] = useState(1);
  const history = useHistory();
  // console.log("history>>>>>>",history)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const token = localStorage.getItem("Token");

  console.log("token>>>", token)

  const [news, updateNews] = useState([]);
  const [catName, updateCatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [state, setState] = useState(true);
  const [counter, setCounter] = useState(0);
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const [addPersona, updatePersona] = useState([]);
  const [errorCodePersona, updateErrorCodePersona] = useState("");
  const [studentId, updateStudentId] = useState("");

  const [newsId, updateNewsId] = useState("");
  const [categoryId, updateCategoryId] = useState("");
  const [categoryName, updateCategoryName] = useState("");
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [deliveryType, updateDeliveryType] = useState("");
  const [publishDate, updatePublishDate] = useState("");
  const [expireDate, updateExpireDate] = useState("");
  const [sendTo, updateSendTo] = useState("");
  const [editSendToStudent, updateEditSendToStudent] = useState([]);
  // const [newsFile, updateNewsFile] = useState("")
  const [newsImage, updateNewsImage] = useState("")

  const [new_news_id, updateNewNewsId] = useState("");
  const [viewData, updateviewData] = useState([]);

  const [deletePassword, updateDeletePassword] = useState("");

  // var element = [];
  // for (let i = 0; i < news.length; i++) {
  //   element = news[i];
  // }

  function removeLink() {
    $(".xlx_link").hide();
  }
  // ****************************************PERSONA*******************************************************
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

    setTimeout(function () {
      $(".personaMsg").hide();
    }, 3000);
  }

  const [getFileName, updateGetFileName] = useState("");
  console.log("getFileName====", getFileName)

  const [getFile, updateGetFile] = useState("");
  console.log("getFile====", getFile)
  const [getImageName, updateGetImageName] = useState("");
  const [getImage, updateGetImage] = useState("");
  // *************************************************NEWS CATEGORY******************************************
  // async function getNewCategory() {
  //   const formData = new FormData();

  //   formData.append("n_cat_id", categoryId);

  //   const response = await axios.post(
  //     process.env.REACT_APP_API_KEY + "get_single_news_categories",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: token,
  //       },
  //     }
  //   );

  //   const response_news = response;

  //   if (response.data.error_code == 200) {
  //     updateCatName(response.data.data.category_name);
  //   }
  // }

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

    if (fetchResponse.data.error_code == 200) {
      fetchResponse.data.data.map((fetchItem) => {
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
  }

  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);
    setChildData(data);
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);
  };

  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (newsId) => {
    setChildNewsData(newsId);
    edit_category(newsId);
  };

  const passDeleteData = (newsId) => {
    setChildNewsData(newsId);
    delete_category(newsId);
  };

  async function edit_category(newsId) {
    updateNewsId(newsId);

    $(".preview_category").show();

    const formData = new FormData();

    formData.append("news_id", newsId);

    const fetchNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_good_news",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    $(".edit_campus_modal").hide();

    if (fetchNewsResponse.data.error_code == 200) {
      fetchNewsResponse.data.data.map((item) => {
        console.log("item====", item)
        updateCategoryId(item.cat_id);
        updateCategoryName(item.category);
        updateTitle(item.news_title);
        updateDescription(item.news_description);
        updateDeliveryType(item.delivery_type);
        updatePublishDate(item.publish_date);
        updateGetFile(item.news_file);
        updateExpireDate(item.expire_date);
        updateSendTo(item.send_to);
      });
    }
  }

  async function viewDescription(new_news_id) {
    updateNewNewsId(new_news_id);
    // $(".preview_polls").show();

    // const formData = new FormData();

    // formData.append("news_id", new_news_id);
    // const fetchNewsResponse = await axios.post(
    //   process.env.REACT_APP_API_KEY + "get_good_news",
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",

    //       Authorization: token,
    //     },
    //   }
    // );
    // if (fetchNewsResponse.data.error_code == 200) {
    //   updateviewData(fetchNewsResponse.data.data)

    // }

    history.push("/newspreview", { new_news_id });
  }

  function closePreviewDescription() {
    updateNewsId("");
    $(".preview_polls").hide();
  }

  function delete_category(newsId) {
    $(".preview_polls").hide();
    $(".delete_preview_polls").show();
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

      formData.append("news_id", childNewsData);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_news",
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
  async function fetchList(page, per_page) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("sort_flag", counter);

      // console.log("formData>>>>>>>>>>",counter)
      // console.log("formData>>>>>>>>>>",formData)

      const fetchClassResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "get_all_news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("get_all_news------------", fetchClassResponse);

      setIsLoading(false);
      if (fetchClassResponse.data.error_code == 200) {
        updateNews(fetchClassResponse.data.data);
        setIsLoaded(true);
        console.log(fetchClassResponse.data, '============---------------')
        setItems(fetchClassResponse.data);
        setTotalRows(fetchClassResponse.total);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
    getUserDetails();
  }, [page]);

  const [chooseFile, setChooseFile] = useState("");
  const [chooseFileImage, setChooseFileImage] = useState("");
  const [newsFile, updateNewsFile] = useState([]);
  const [image, updateImage] = useState("");
  const [anyFile, updateAnyFile] = useState("");
  const [chooseFileAny, setChooseFileAny] = useState();

  const uploadingFile = (e) => {
    updateNewsFile(e.target.files[0]);
    var fileName = e.target.files[0].name;
    // console.log("fileName====", fileName)
    setChooseFile(fileName);
  };

  // console.log("uploadingFile======", uploadingFile)
  // ***************************************************

  // ***************************************************

  const uploadingFileImage = (e) => {
    updateImage(e.target.files[0]);
    var fileNameImage = e.target.files[0].name;
    setChooseFileImage(fileNameImage);
  };

  const uploadingFileAny = (e) => {
    updateAnyFile(e.target.files[0]);
    var fileNameAny = e.target.files[0].name;
    setChooseFileAny(fileNameAny);
    console.log("fileNameAny>>>>", fileNameAny)
  };

  const [campusNewsDescription, updateCampusNewsDescription] = useState("");
  const [campusNewsTitle, updateCampusNewsTitle] = useState("");
  const [campusNewsPublish_date, updateCampusNewsPublish_date] = useState("");
  const [campusNewsExpire_date, updateCampusNewsExpire_date] = useState("");
  const [campusNewsSend_to, updateCampusNewsSend_to] = useState("");

  let pubDate = "";

  pubDate = moment(campusNewsPublish_date).format("YYYY-MM-DDThh:mm");
  // ************************************************PREVIEW**************************************************

  $(".close_event").click(function () {
    $(".preview_polls").hide();
    $(".user_type").hide();
  });

  const openActionsModal = (e) => {
    // setTId(e);
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    // $(".actions_modal" + tId).hide();
    $(".edit_campus_modal").hide();
  };

  const columns = [
    {
      name: "Title",
      wrap: true,
      width: "35%",
      cell: (row) => {
        console.log(">>>>>>>>>", row);
        return (
          <div
            className="ten_font_class"
            onClick={() => viewDescription(row.news_id)}
            style={{
              backgroundColor: "transparent",
              cursor: "pointer",
              fontWeight: "600",
              color: "black",
              cursor: "pointer",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {row.news_title}
          </div>
        );
      },
    },

    // *********************************************************
    // {
    //   name: "Image",
    //   wrap: true,
    //   width: "15%",
    //   cell: (row) => {
    //     console.log("Row data:", row);
    //     return (
    //       <div
    //         className="ten_font_class"
    //         onClick={() => viewDescription(row.image)}
    //         style={{
    //           backgroundColor: "transparent",
    //           cursor: "pointer",
    //           fontWeight: "600",
    //           color: "black",
    //           cursor: "pointer",
    //           overflow: "hidden",
    //           whiteSpace: "nowrap",
    //           textOverflow: "ellipsis",
    //         }}

    //       >
    //         <img
    //           src={row.image}
    //           // alt={row.news_title}
    //           style={{
    //             width: "40px",
    //             height: "40px",
    //             objectFit: "cover",
    //             marginRight: "10px",
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },


    // *********************************************************

    {
      name: "Category",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div
            className="ten_font_class"
            onClick={() => viewDescription(row.news_id)}
            style={{
              backgroundColor: "transparent",
              color: "black",
              cursor: "pointer",
            }}
          >
            {row.category == "Announcement" ? (
              <div
                className="ten_font_class"
                style={{
                  color: "#2D5DD0",
                  fontStyle: "normal",
                  fontFamily: "Poppins",
                }}
              >
                {row.category}
              </div>
            ) : row.category == "Circular" ? (
              <div
                className="ten_font_class"
                style={{
                  color: "#C0A200",
                  fontStyle: "normal",
                  fontFamily: "Poppins",
                }}
              >
                {row.category}
              </div>
            ) : row.category == "Notice" ? (
              <div
                className="ten_font_class"
                style={{
                  color: "#EB2424",
                  fontStyle: "normal",
                  fontFamily: "Poppins",
                }}
              >
                {row.category}
              </div>
            ) : row.category == "" ? (
              <div
                className="ten_font_class"
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Poppins",
                }}
              >
                -
              </div>
            ) : (
              <div className="ten_font_class" style={{ color: "#15A312" }}>
                {row.category}
              </div>
            )}
          </div>
        );
      },
    },

    {
      name: "Publish Date",
      wrap: true,
      width: "auto",
      cell: (row) => {
        const dateString = row.publish_date;
        startDate = moment(dateString).format("DD MMM YYYY");

        return (
          <div
            className="ten_font_class"
            onClick={() => viewDescription(row.news_id)}
            style={{
              color: "rgba(0, 0, 0, 0.6)",
              cursor: "pointer",
            }}
          >
            {startDate}
          </div>
        );
      },
    },
    {
      name: "Recipients",
      wrap: true,
      width: "auto",
      width: "auto",
      cell: (row) => {
        return (
          <div
            className="ten_font_class"
            onClick={() => viewDescription(row.news_id)}
            style={{
              color: "rgba(0, 0, 0, 0.6)",
              cursor: "pointer",
            }}
          >
            {row.send_to == 1 ? "All Students" : "Specific Recipient"}
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
                onClick={() => openActionsModal(row.news_id)}
              >
                Actions
              </button>

              <div
                class={`edit_campus_modal actions_modal${row.news_id}`}
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
                  onClick={() => editNewsRow(row.news_id)}
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
                  onClick={() => deleteNews(row.news_id)}
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
                className="modal fade deleteNewsModal"
                id="deleteNewsModal"
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
                      <button className="delete_btn" onClick={deletePopupFunc}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade deleteNewsWithPass"
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
                        <h5
                          className="modal-title"
                          id="exampleModalLabel"
                          style={{ color: "white" }}
                        >
                          Delete News
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
                              You are deleting a screen. This operation cannot
                              be
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
                              <div
                                className="col-md-4 d-flex p-0"
                                style={{ alignItems: "center" }}
                              >
                                <p>Admin Password:</p>
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
                            <div style={{ marginTop: "10PX" }}></div>
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
                        <h5
                          className="modal-title"
                          id="exampleModalLabel"
                          style={{ color: "white" }}
                        >
                          Edit News
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
                              You are deleting a screen. This operation cannot
                              be
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
                              <div
                                className="col-md-4 d-flex p-0"
                                style={{ alignItems: "center" }}
                              >
                                <p>Admin Password:</p>
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
                            <div style={{ marginTop: "10PX" }}></div>
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

  const filteredItems = news.filter(
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

    return (<div></div>);
  }, [filterText, resetPaginationToggle]);

  // *******************************************edit news*********************************************

  const [newsCategorydata, setNewsCategoryData] = useState([]);

  const [editCategoryName, updateEditCategoryName] = useState("");
  const [editNewsTitle, updateEditNewsTitle] = useState("");
  const [editNewsDescription, updateEditNewsDescription] = useState("");
  const [editPublishDate, updateEditPublishDate] = useState("");
  const [editExpireDate, updateEditExpireDate] = useState("");
  const [editSendTo, updateEditSendTo] = useState("");
  const [editNewsId, updateEditNewsId] = useState("");
  const [editDeliveryType, updateEditDeliveryType] = useState("");
  const [editSend_to_student_name, updateEditSend_to_student_name] = useState(
    []
  );

  async function editNewsRow(NewsId) {
    updateNewsId("");
    $(".preview_polls").hide();
    $(".edit_container").show();

    const formData = new FormData();
    formData.append("news_id", NewsId);

    const editNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_good_news",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    $(".edit_campus_modal").hide();
    if (editNewsResponse.data.error_code == 200) {
      editNewsResponse.data.data.map((item) => {
        console.log(item, '--------------------', item)

        updateNewsId(item.news_id);
        updateCategoryId(item.cat_id);
        updateCategoryName(item.category);
        updateTitle(item.news_title);
        updateDescription(item.news_description);
        updateDeliveryType(item.delivery_type);
        updatePublishDate(item.publish_date);
        updateExpireDate(item.expire_date);
        updateGetFileName(item.news_file);
        updateGetImageName(item.image);


        console.log("item ========", item.image)
        console.log("item.news_file====", item.news_file)
        console.log(" editNewsResponse ====", editNewsResponse)
        console.log("formData===", formData)



        // var _length = item.news_file.length;
        // var array = item.news_file.slice(60, _length);
        // updateGetFile(array);

        // const _url = item.news_files[0];
        // const urlParts = _url.split("/");
        // const fileName = _url[_url.length - 1];
        // const fileNameWithoutExtension = fileName.split(".")[0];

        var imageLength = item.image.length;
        var imageArray = item.image.slice(60, imageLength);
        updateGetImage(imageArray);
        updateImage(item.image);
        updateSendTo(item.send_to);
        if (item.send_to == 2) {
          const name = item.send_to_student.map((item) => item.student_name);
          const student_id = item.send_to_student.map(
            (item) => item.student_id
          );

          setChildNewsData(name);
          updateStudentId(student_id);
        }
      });
    }
  }

  async function fetchNewsList() {
    // console.log('lllllllllllllllllllllllll')
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
        // console.log(NewsCategoryListArray,'------------------------------------------')
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

  const summernoteCssFunc = () => {
    $(".note-statusbar").hide();
    $(".note-toolbar").hide();
    $(".note-editable").css("height", "250px");
  };

  useEffect(() => {
    fetchNewsList();
    summernoteCssFunc();
    setFilterText("")
  }, []);

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
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleButton = () => {
    $(".edit_container").hide();
    $("#delete_with_password").hide();
    fetchList();
    toast.success("News Deleted Successfully!!");
  };

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
    } else {
      toast.error(deleteNewsResponse.data.message);
    }
  }

  //  ********************* Update form ************************

  async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();

    formData.append("news_id", newsId);
    formData.append("category", categoryId);
    formData.append("title", title);
    formData.append("news_content", description);
    formData.append("delivery_type", deliveryType);
    formData.append("publish_date", publishDate);
    formData.append("expire_date", expireDate);
    formData.append("send_to", sendTo);
    formData.append("file", newsFile);
    formData.append("image", image);
    formData.append("users", childId);


    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_news",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("event response====", eventResponse)
    console.log('formdata=========', formData)


    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      $(".edit_container").hide();
      fetchList();
      toast.success("Campus News Edited Successfully!!");
    } else {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".required_filed").show();
      }, 1000);
    }
  }

  // ******************************************************delete news*****************************************
  const [getNewsTitle, updateGetNewsTitle] = useState("");
  const [getNewsID, updateGetNewsID] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");

  function deleteNews(news_id, news_title) {
    updateGetNewsTitle(news_title);
    updateGetNewsID(news_id);
    $(".deleteNewsModal").show();
  }
  function closeDeleteNewsModal() {
    $(".deleteNewsModal").hide();
    $(".edit_campus_modal").hide();
    $(".deleteNewsWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("");
  }

  function deletePopupFunc() {
    // $("#delete_with_password").show();
    $(".deleteNewsWithPass").show();
    $(".deleteNewsModal").hide();
  }

  function deleteNewsModal(news_id, news_title) {
    updateCampusNewsTitle(news_title);
    updateGetNewsID(news_id);
    $(".delete_container").show();
  }

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
      deleteNewsApi();
    } else {
      toast.error(deleteNewsResponse.data.message);
    }
  }

  async function deleteNewsApi() {
    try {
      const formData = new FormData();
      formData.append("news_id", getNewsID);
      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if (deleteResponse.data.error_code == 200) {
        $("#delete_with_password").hide();
        updateDeletePassword("");
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function close_delete_modal() {
    $(".edit_campus_modal").hide();
    $(".preview_category").hide();
    $(".deleteNewsModal").hide();
  }

  function currentDate() {
    var date = new Date();
    const getDate = moment(date).format("YYYY-MM-DDThh:mm");
    updatePublishDate(getDate);
  }

  function close_edit_modal() {
    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
  }
  function update_edited_News() {
    $(".editWithPassModal").show();
    // $(".edit_popup_password").show();
  }

  function close_preview_edit_modal() {
    $(".preview_category").hide();
    $(".preview_polls").show();
  }
  function cancel_delete_poll() {
    $(".delete_preview_polls").hide();
    $(".preview_polls").show();
  }

  const handelSummenrnote = (e) => {
    updateDescription(e);
  };

  const close_welcome_modal = () => {
    $(".welcome_modal").hide();
  };

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="row border_class2 search_box_padding">
        <div className="col-md-3 d-flex flex-row ">
          <div className="search_box_div">
            <img
              className="search_box_img"
              src={require("../images/Search.png")}
            />
            <Input
              className="search_box"
              id="search"
              type="text"
              placeholder="Search by category"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div
          className="col-md-9 d-flex flex-row"
          style={{ justifyContent: "end" }}
        >
          <div style={{ marginTop: "0px", padding: "0" }}>
            <Link to="/createNews">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
              >
                <div className="create_button_inner">Create News</div>
                <img
                  className="create_button_img"
                  src="dist/img/Progress.png"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/*================================= edit campus news ================================*/}
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Campus News</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div className="card-body " style={{ margin: "0px", padding: "0" }}>
            <div className="preview_form">
              <div className="edit_top_label">
                <p>Category & Title</p>
              </div>
              <div className="edit_border_class">
                <div class="row">
                  {/* <div class="col-md-3">
                    <div>
                      <label className="all_labels">Category :</label>
                    </div>
                  </div> */}
                  {/* <div class="col-md-9"> */}

                  {/* <div >

                      <select
                        className="form-select-sm edit_inputs_class "
                        id="news_category"
                        aria-label=".form-select-sm example"
                        onChange={(e) => updateCategoryId(e.target.value)}
                        style={{ fontWeight: 'bold', fontSize: '14px', background: "none", padding: "5px" }}>

                        <option
                          selected="selected"
                          value={categoryId}>
                          {categoryName}
                        </option>

                        {newsCategorydata.length > 0 ? (
                          newsCategorydata.map((news, index) => {
                            return (
                              <option value={news.cat_id} key={index}>
                                {news.category_name}
                              </option>
                            );
                          })
                        ) : (
                          <div>Data Not Found</div>
                        )}
                      </select>
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
                    </div> */}

                  {/* </div> */}

                  {/* *************Tittle and category ********** */}

                  <div
                    style={{
                      borderBottom: "2px solid #C4C4C4",
                      marginBottom: "20px"
                    }}
                    className="edit_border_class"
                  >
                    <div className="row">
                      <div className="col-md-8"
                        style={{
                          marginLeft: "-10px"
                        }}
                      >
                        <select
                          className="form-select-sm edit_inputs_class "
                          id="news_category"
                          aria-label=".form-select-sm example"
                          onChange={(e) => updateCategoryId(e.target.value)}
                          style={{ fontWeight: 'bold', background: "none", padding: "5px" }}
                        >
                          <option
                            style={{ fontSize: "10px", padding: "5px", margin: "5px" }}
                            className="preview_font_category"
                            selected="selected"
                            value={categoryId}>
                            {categoryName}
                          </option>
                          {newsCategorydata.length > 0 ? (
                            newsCategorydata.map((news, index) => {
                              return (
                                <option value={news.cat_id} key={index}>
                                  {news.category_name}
                                </option>
                              );
                            })
                          ) : (
                            <div>Data Not Found</div>
                          )}
                        </select>
                      </div>
                    </div>


                    <div className="row">
                      {/* <div className="col-md-4" style={{marginLeft: "-10px"}}> */}
                      <input
                        className="preview_font_title"
                        type="name"
                        id="news_title"
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        autoComplete="true"
                        style={{ background: "none", border: "none" }}
                      >
                        {/* {title} */}
                      </input>
                      {/* </div> */}
                    </div>
                  </div>

                  {/* *********************************************** */}

                  <div className="edit_top_label_2">
                    <div className="datemain" style={{
                      marginTop: "-10px",
                      marginBottom: "5px",
                      marginLeft: "-2px"
                    }}>
                      <div className="publishdate">
                        <span className="preview_font">Publish Date/ Time</span> :
                        <span
                          className="preview_font"
                          style={{ color: "#4a0ff5" }}
                        >
                          {/* {publishDate} */}
                        </span>
                      </div>
                      <div className="closedate">
                        <span className="preview_font">Close Date/ Time</span> :
                        <span
                          className="preview_font"
                          style={{ color: "#4a0ff5", marginLeft: "0px" }}
                        >
                          {/* {expireDate} */}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <div class="col-md-3">
                    <div>
                      <label className="all_labels">Title :</label>
                    </div>
                  </div> */}
                  <div class="col-md-9">
                    <div>

                      {/* <input
                        type="name"
                        className="input_fields edit_inputs_class"
                        id="news_title"
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        autoComplete="true"
                        style={{ fontWeight: 'bold', fontSize: '10px', background: "none", marginTop: "-10px", position: "absolute", color: "#4AA081" }}

                      /> */}


                      <div
                        class="NewsTitle"
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
                          Please Write News Title
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* <div className="edit_top_label">
                <p> Message</p>
              </div> */}

              <div>
                {/* <textarea
                            id="publishdate"
                            className="edit_border_class edit_inputs_class"
                            value={description}
                            onChange={(e) => handelSummenrnote(e.target.value)}
                            name="birthdaytime"
                            style={{height:"240px"}}
                          /> */}

                <SummerNote _onChange={handelSummenrnote} value={description} />

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

              <div
                className="reciepientsDiv"
                style={{
                  marginTop: "10px",
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
                    padding: "10px",
                    height: "50px",
                    width: "100%",
                  }}
                ></div>
              </div>

              <div
                className="reciepientsDiv"
                style={{
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "#4779F0",
                    marginBottom: "10px",
                  }}
                >
                  Attachments :
                </p>
              </div>
              <div>
                <h1>{chooseFile}</h1>
              </div>
              {/* <div>
                <h1>Hello</h1>
              </div> */}


              {/* {chooseFile != "" ? ( */}

              <div>
                {chooseFile && chooseFile.length > 0 ? (
                  chooseFile.map((item, index) => (
                    <div
                      key={index + 1}
                      className="item-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0px",
                        marginLeft: "-8px",
                      }}
                    >
                      <p
                        className="news_doc"
                        style={{
                          marginBottom: "15px",
                          backgroundColor: "#E6E6E6",
                        }}
                      >{item}


                        <img
                          src="dist/img/Cancel.png"
                          alt="cancel"
                          className="cancel_img"
                          style={{ cursor: "pointer", marginLeft: "40px" }}
                        />
                      </p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>



              {/* <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-6">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                    <div className="d-flex">
                      <label className="all_labels">
                        Publish Date/Time
                      </label>
                      <p className="all_stars">
                        *
                      </p>
                      </div>

                      <input
                        type="datetime-local"
                        class="input_fields all_edit_inputs"
                        placeholder="dd-mm-yyyy hh-mm"
                        id="publishdate"
                        value={publishDate}
                        onChange={(e) => updatePublishDate(e.target.value)}
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

                  <div class="col-md-6">
                    <div className="edit_left_padding">
                     <div className="d-flex">
                     <label className="all_labels">
                        Expire Date/Time
                      </label>
                     </div>

                      <input
                        type="datetime-local"
                        placeholder="dd-mm-yyyy hh-mm"
                        id="expiredate"
                        className="input_fields all_edit_inputs"
                        value={expireDate}
                        onChange={(e) => updateExpireDate(e.target.value)}
                        name="birthdaytime"

                      />

                      <div
                        class="ExpireDate"
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
                          Please Select Expire Date
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                      id="news_sendto"
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


                      <div className="d-flex">
                        <input
                          type="radio"
                          id="all students"
                          name="userType"
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
                          for="all students"
                          className="d-flex"
                          style={{
                            color: "black",
                            fontSize: "12px",
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
                          name="userType"
                          value="2"
                          checked={sendTo == 2}
                          onChange={(e) => updateSendTo(e.target.value)}
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
                            fontSize: "11px",
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
                      class="SendToAll"
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
                        Please Select User Type
                      </h4>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="mt-1 p-0 ">
                <div class="row">
                  <div
                    class="col-md-12"
                    style={{
                      fontSize: "12px",
                      margin: "8px 20px",

                    }}
                  >
                    {sendTo == 2 ? <div>{childNewsData}</div> : ""}
                  </div>
                </div>
              </div> */}

              <div className="d-flex border_class2 edit_buttons_div">
                <button
                  className="edit_cancel_button"
                  type="button"
                  value="Cancel"
                  onClick={() => close_edit_modal()}
                >
                  Cancel
                </button>

                <button
                  className="edit_update_button"
                  id="delete_single_student"
                  value="Update"
                  onClick={() => update_edited_News()}
                >
                  Update
                </button>
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
      </div>
      {/* } */}

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
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Edit Campus News
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

      <div id="deleterow" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p className="delete_container_heading">Delete message</p>
              <p className="delete_container_p">
                Your thoughtful reconsideration is encouraged, as this
                information holds significance. Thank you for your
                consideration.
              </p>

              <div className="d-flex mt-3">
                <a
                  onClick={close_delete_modal}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className="create_btn delete_container_cancel_button"
                    value="Cancel"
                  />
                </a>

                <a
                  className="cta"
                  href="#delete_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="create_btn delete_container_delete_button"
                    id="delete_single_student"
                    value="Delete"
                  />
                </a>
              </div>
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
                color: "white",
                fontSize: "12px",
                fontWeight: "500",
                marginTop: "5PX",
              }}
            >
              Delete News
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
            style={{
              background: "white",
              padding: "15px",
              fontSize: "10px",
              fontWeight: "500",
            }}
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
                  fontSize: "12PX",
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
                  width: "100%",
                  borderRadius: "5px",
                  background: "white",
                  height: "30px",
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
                  fontSize: "10px",
                  fontWeight: "500",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="welcome_modal">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="welcome_msg_main_div">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p className="welcome_msg_main_p">WELCOME TO NOTICEBOARD!</p>
                <img
                  src="dist/img/Welcom_msg_close.png"
                  onClick={() => close_welcome_modal()}
                  alt="dropdown"
                  className="close_event ml-auto cancel_img"
                />
              </div>
              <div>
                <p className="welcome_msg_inner_p">
                  Broadcast custom campus news, inspiring alumni stories, and
                  RSS feeds to students on their mobile app to keep them
                  up-to-date on campus happenings..
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="border_class2">
          <DataTable
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
            customStyles={customStyles}
          />
        </div>
      )}

      {/**********************************************8PREVIEW********************************************8*/}
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
              paddingBottom: "10px",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Campus News
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
              padding: "13px 10PX",
              border: "0.4px solid #C4C4C4",
            }}
          >
            {news.length != "" ? (
              // <Previous_next_button
              //   new_news_id={new_news_id}
              //   viewData={viewData}
              //   passEditData={passEditData}
              //   passDeleteData={passDeleteData}
              // />

              <div>
                <div className="d-flex">
                  <img
                    src={require("../images/Pencil.png")}
                    onClick={() => editNewsRow(new_news_id)}
                    alt="dropdown"
                    width="18px"
                    height="18px"
                    className=" ml-auto"
                  />

                  <img
                    src={require("../images/delete.png")}
                    onClick={() => passDeleteData(new_news_id)}
                    alt="dropdown"
                    width="18px"
                    height="18px"
                  />
                </div>

                <div>
                  {viewData.map((e) => {
                    return (
                      <>
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
                            Title{" "}
                          </p>
                          <p
                            className="col-md-9"
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "10PX",
                            }}
                          >
                            : {e.news_title}
                          </p>
                        </div>

                        <div
                          className="row preview_description"
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
                            Description{" "}
                          </p>
                          <p
                            className="col-md-9"
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "10PX",
                              display: "flex",
                            }}
                          >
                            :{" "}
                            {
                              <p
                                style={{ marginLeft: "10px" }}
                                dangerouslySetInnerHTML={{
                                  __html: e.news_description,
                                }}
                              />
                            }{" "}
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
                            Delivery Type{" "}
                          </p>
                          <p
                            className="col-md-9"
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "10PX",
                            }}
                          >
                            :{e.delivery_type === 1 ? "Now" : "Later"}
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
                              paddingRight: "0",
                            }}
                          >
                            Publish Date{" "}
                          </p>
                          <p
                            className="col-md-3"
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "10PX",
                              paddingRight: "0",
                            }}
                          >
                            : {e.publish_date}{" "}
                          </p>
                          <p
                            className="col-md-3"
                            style={{
                              color: "rgba(0, 0, 0, 0.5)",
                              fontWeight: "600",
                              fontSize: "10PX",
                              paddingRight: "0",
                            }}
                          >
                            Expiry Date{" "}
                          </p>
                          <p
                            className="col-md-3"
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "10PX",
                              paddingRight: "0",
                            }}
                          >
                            : {e.expire_date}{" "}
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
                            User Type
                          </p>
                          <p
                            className="col-md-9"
                            style={{
                              color: "black",
                              fontWeight: "600",
                              fontSize: "10PX",
                            }}
                          >
                            :{" "}
                            {e.send_to === 1
                              ? "All studnets"
                              : "Specific Recipient"}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>

                {/* <div className="d-flex mt-2">


      <button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
      <button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
      </div> */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* *****************************PREVIEW EDIT CATEGORY********************************************8 */}

      <div className="preview_category">
        <div className="edit_container_inner">
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label className="main_labels">Edit Campus News</label>

            <a
              onClick={() => close_preview_edit_modal()}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="close_event ml-auto cancel_img"
              />
            </a>
          </div>
          {/* category & question */}
          <div className="preview_form">
            <div className="mt-2 border_class2 edit_row_padding">
              <div class="row ">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">Select Category</label>

                      <p className="all_stars">*</p>
                    </div>
                    <select
                      className="form-select form-select-sm all_edit_inputs"
                      id="news_category"
                      aria-label=".form-select-sm example"
                      value={categoryId}
                      onChange={(e) => updateCategoryId(e.target.value)}
                    >
                      <option selected="selected" value={categoryName}>
                        {categoryName}
                      </option>
                      {newsCategorydata.length > 0 ? (
                        newsCategorydata.map((news, index) => {
                          return (
                            <option value={news.cat_id} key={index}>
                              {news.category_name}
                            </option>
                          );
                        })
                      ) : (
                        <div>Data Not Found</div>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 border_class2 edit_row_padding">
              <div class="row ">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">Enter your title</label>

                      <p className="all_stars">*</p>
                    </div>
                    <input
                      type="name"
                      className="input-field all_edit_inputs"
                      autoComplete="true"
                      value={title}
                      onChange={(e) => updateTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border_class2 mt-2 edit_row_padding">
              <div className=" p-0">
                <div class="row ">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <label className="all_labels">Enter your message</label>

                      <SummerNote
                        _onChange={handelSummenrnote}
                        value={description}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex" style={{ padding: "10px" }}>
                <label
                  for="add_docs"
                  style={{
                    color: "#339dd8",
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginLeft: "auto",
                  }}
                >
                  <img
                    src="dist/img/create_document.png"
                    alt="dropdown"
                    style={{ width: "25px", height: "24px" }}
                    for="add_docs"
                  />
                </label>

                <input
                  type="file"
                  name="photo"
                  accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                  onChange={uploadingFile}
                  id="add_docs"
                  style={{ visibility: "hidden", width: "0PX" }}
                />
                <div
                  class="d-flex"
                  style={{
                    position: "absolute",
                    top: "473px",
                    right: "14px",
                    fontSize: "11px",
                  }}
                >
                  <input
                    value={chooseFile}
                    type="text"
                    readonly="readonly"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                {/* add images */}
                <label
                  for="add_imagee"
                  style={{
                    color: "#339dd8",
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginLeft: "5px",
                  }}
                >
                  <img
                    src="dist/img/add_image.png"
                    alt="dropdown"
                    style={{ width: "25px", height: "24px" }}
                    for="add_imagee"

                  />
                </label>

                <input
                  type="file"
                  name="photo"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={uploadingFileImage}
                  id="add_imagee"
                  style={{ visibility: "hidden", width: "0PX" }}
                />

                <div
                  class="d-flex"
                  style={{
                    position: "absolute",
                    top: "490px",
                    right: "14px",
                    fontSize: "11px",
                  }}
                >
                  <input
                    value={chooseFileImage}
                    type="text"
                    readonly="readonly"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                {/* add link */}
                <label
                  for="upload-photo"
                  style={{
                    color: "#339dd8",
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginLeft: "5px",
                  }}
                >
                  <img
                    src="dist/img/add_link.png"
                    alt="dropdown"
                    style={{ width: "25px", height: "24px" }}
                    for="upload-photo"
                  />
                </label>

                <input
                  type="file"
                  name="photo"
                  onChange={uploadingFileAny}
                  id="upload-photo"
                />

                <div
                  class="d-flex"
                  style={{
                    position: "absolute",
                    top: "500px",
                    marginTop: "15px",
                    right: "14px",
                    fontSize: "11px",
                  }}
                >
                  <input
                    value={chooseFileAny}
                    type="text"
                    readonly="readonly"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </div>
              <div className="mt-0 edit_row_margin">
                <div class="row ">
                  <div class="col-md-12">
                    <label className="all_labels">Delivery Type</label>

                    <div className="d-flex">
                      <input
                        type="radio"
                        id="now1"
                        name="deliveryType1"
                        value="1"
                        checked={deliveryType == 1}
                        onChange={(e) => updateDeliveryType(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="now1"
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
                        id="later1"
                        name="deliveryType1"
                        value="2"
                        checked={deliveryType == 2}
                        onChange={(e) => updateDeliveryType(e.target.value)}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />

                      <label
                        for="later1"
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
                </div>
              </div>
            </div>

            <div className="border_class2 mt-2 edit_row_padding">
              <div className=" p-0">
                <div class="row ">
                  <div class="col-md-12">
                    <div className="d-flex">
                      <label className="all_labels">Publish Date/Time</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      type="dateTime-local"
                      className="input_fields all_edit_inputs"
                      id="publish_date"
                      value={publishDate}
                      onChange={(e) => updatePublishDate(e.target.value)}
                      name="birthdaytime"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 p-0">
                <div class="row edit_row_margin">
                  <div class="col-md-12">
                    <div className="d-flex">
                      <label className="all_labels">Expiry Date/Time</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      type="dateTime-local"
                      className="input_fields all_edit_inputs"
                      id="publish_date"
                      value={expireDate}
                      onChange={(e) => updateExpireDate(e.target.value)}
                      name="birthdaytime"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 border_class2 edit_row_padding">
              <div class="row ">
                <div class="col-md-12">
                  <label className="all_labels">User Type</label>

                  <div className="d-flex">
                    <input
                      type="radio"
                      id="all students"
                      name="editUserType"
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
                      for="all students"
                      className="d-flex"
                      style={{
                        color: "black",
                        fontSize: "10px",
                        marginLeft: "10PX",
                        marginTop: "4px",
                        fontWeight: "600",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ marginLeft: "5px" }}>All Students</p>
                    </label>
                    <input
                      type="radio"
                      id="specific class"
                      name="editUserType"
                      value="2"
                      checked={sendTo == 2}
                      onChange={(e) => updateSendTo(e.target.value)}
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
                        marginLeft: "10PX",
                        marginTop: "4PX",
                        fontWeight: "600",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => specific_class()}
                    >
                      <p style={{ marginLeft: "8px" }}>Specific Recipients</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* ******************button********************** */}
            <div className="d-flex mt-3 edit_buttons_div border_class2">
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

            <div style={{ display: "none" }} className="saveMessage">
              Data Saved Successfully
            </div>
          </div>
        </div>
      </div>

      {/* preview edit with password */}
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
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Edit Campus News
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
              Delete message
            </p>
            <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
              Are You Sure You Want To Delete This Campus News?
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
      {/* <div
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
      </div> */}

      {/*  specific student pop up  */}
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
                      <div style={{ color: "green", marginLeft: "50px" }}>
                        {errorMessagePersona}
                      </div>
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
