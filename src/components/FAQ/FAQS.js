import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import { BiSearchAlt2} from "react-icons/bi";
import styled from "styled-components";
import Swal from "sweetalert2";
import "react-web-tabs/dist/react-web-tabs.css";
import FAQ from "./FAQ";
import { DownloadTableExcel } from "react-export-table-to-excel";
import toast,{Toaster} from "react-hot-toast";

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

export function FAQS() {
  const tableRef = useRef(null);
  var faq_Id = "";
  var array = "";
  const exampleRef = useRef(null);
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [errorMessage, updateErrorMessage] = useState("");
  const [errorCode, updateErrorCode] = useState("");
  const [faqCategory, updateFaqCategory] = useState("");
  const [catId, updateCatId] = useState("");
  const [faqId, updateFaqId] = useState("");
  const [singleData, setSingleData] = useState({});
  const [emailAddress, updateEmailAddress] = useState("");
  const [categoryName, updateCatName] = useState("");
  const [question, updateQuestion] = useState("");
  const [answer, updateAnswer] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [fAQId, updateFAQId] = useState("");
  const [faqCatId, updateFaqCatId] = useState("");

  function edit_faqForm(id) {  
    $(".edit_faq").show();
  }

  async function createFaqCategory() {
    try {
      const faqCategorycheck = document.getElementById("faq_category_single");
    
      if (faqCategorycheck.value == "") {
        $(".FaqCategorySingle").show();

        setTimeout(function() {
          $(".FaqCategorySingle").hide();
        }, 3000);
      } else {
        const formDataCategory = new FormData();

        formDataCategory.append("category_name", faqCategory);

        const responseCategory = await axios.post(
          process.env.REACT_APP_API_KEY + "create_faqs_category",
          formDataCategory,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        updateErrorMessage(responseCategory.data.message);
        updateErrorCode(responseCategory.data.error_code);
        if (responseCategory.data.error_code == 200) {
          $(".SuccessMsg").show();

          setTimeout(function() {
            $(".SuccessMsg").hide();
          }, 2000);
          updateFaqCategory("");
          window.location.href = "/faqDetails";
        }
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleEditButton = () => {
    $(".edit_container").hide();
    fetchList();
    toast.success("Faq Edited Successfully!!");
   
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

    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }

  const [firstData, updateFirstData] = useState([]);
  async function fetchList() {
    $(".new_faq").hide();
    try {
      const fetchFaqResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_categoriwise_faqs",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", fetchFaqResponse);

      const firstData = fetchFaqResponse.data.data[0];
      const FaqErrorCode = fetchFaqResponse.data.error_code;
      const FaqErrorMsg = fetchFaqResponse.data.message;
      if (FaqErrorCode == 200) {
        const faqListArray = fetchFaqResponse.data.data;
        setData(faqListArray);
        console.log("faqListArray-----------",faqListArray);
      } else {
        setData([]);

         $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  
  function close_edit_modal() {
    $(".edit_container").hide();
  }

  function close_edit_form() {
    $(".edit_faq").hide();
  }

  const [active, setInactive] = useState(true);
  async function QuestionAnswer(id) {
    const updatedUsers = data.map((user) =>
      user.category_id === id
        ? { ...user, isActive: true }
        : { ...user, isActive: false }
    );
   
    setData(updatedUsers);

    $(".old_faq").hide();
    $(".new_faq").show();
    
    updateCatId(id);

    const formData = new FormData();

    formData.append("category", id);
    // get_category_faqs
    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "get_category_faqs",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (response.data.error_code == 200) {
      setCatData(response.data.data);
     
    }
  }
  async function fetch(id) {
   
    updateCatId(id);

    const formData = new FormData();

    formData.append("category", id);
    // get_category_faqs
    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "get_category_faqs",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (response.data.error_code == 200) {
      setCatData(response.data.data);
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

  async function updateForm() {
    // setIsEditLoading(true)
    const formData = new FormData();

    formData.append("faq_id", fAQId);
    formData.append("category", faqCatId);
    formData.append("question", question);
    formData.append("answer", answer);

    const editResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_faq",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    if (editResponse.data.error_code == 200) {
      $(".edit_container").hide();
      $(".editWithPassModal").hide();
      updateDeletePassword("")
      handleEditButton();
    } else {
      $(".editWithPassModal").hide();
    }
  }

  function update_edited_Event() {
    $(".editWithPassModal").show();
    $(".edit_container").hide();
  }

  async function faqDetails(id) {
    $(".edit_container").show();
    
    const formData = new FormData();

    formData.append("faq_id", id);
    // get_category_faqs
    const faqresponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_faq_info",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    const response_news = faqresponse.data.data;
    const FaqErrCode = faqresponse.data.error_code;
    if (FaqErrCode == 200) {
      const singleArray = faqresponse.data.data;
      setSingleData(singleArray);
      const catName = faqresponse.data.data.faq_cat_name;
      const catQuestion = faqresponse.data.data.faq_question;
      const catAnswer = faqresponse.data.data.faq_answer;
      const fId = faqresponse.data.data.faq_id;
      const catId = faqresponse.data.data.faq_cat_id;

      updateCatName(catName);
      updateQuestion(catQuestion);
      updateAnswer(catAnswer);
      updateFAQId(fId);
      updateFaqCatId(catId);
    } else {
      setSingleData([]);
    }
  }
  useEffect(() => {
    getUserDetails();
    fetchList();
  }, []);

  $(".faq_question").click(function() {
    $(".faq_answer").toggle();
  });

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  function closeDeleteNewsModal() {
    $(".editWithPassModal").hide();
    updateDeletePassword("")
  }


  return (
    <div className="content-wrapper" style={{ overflowX: "auto" }}>
        <Toaster
          position="top-right"
          reverseOrder={false}
       />
      {/* <FilterComponentFaq /> */}

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
                    style={{ color: "#1F3977", fontSize: "10px" }}
                  >
                    Add Faq Category
                  </label>
                  <br />
                  <input
                    type="text"
                    className="input_fields all_inputs"
                    id="faq_category_single"
                    placeholder="Add Faq Category"
                    value={faqCategory}
                    onChange={(e) => updateFaqCategory(e.target.value)}
                  />
                  <div
                    class="FaqCategorySingle"
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
                      Please Enter Faq Category
                    </h4>
                  </div>
                </div>

                <div className="d-flex mt-3">
                  <input
                    type="button"
                    className="create_btn"
                    value="Submit"
                    onClick={() => createFaqCategory()}
                    style={{
                      borderRadius: "3px",
                      marginLeft: "auto",
                      backgroundColor: "#1F3977",
                      fontSize: "10PX",
                      fontWeight:"500",
                      padding: "5px 15px",  
                    }}
                  />
                </div>
              </div>
              {errorCode == 200 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/correct.png")}
                    style={{ width: "18px" }}
                  />
                  <p style={{ color: "green" }}>{errorMessage}</p>
                </div>
              ) : errorCode == 406 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/wrong.jpg")}
                    style={{ width: "18px" }}
                  />
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </div>
              ) : errorCode == 409 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/wrong.jpg")}
                    style={{ width: "18px" }}
                  />
                  <p style={{ color: "blue" }}>{errorMessage}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
          <a
            class="close"
            href="#"
            style={{ marginTop: "-135px", marginRight: "8px" }}
          >
            &times;
          </a>
        </div>
      </div>

      <div className="row border_class2 search_box_padding" >
        <div
          className="col-md-3 d-flex flex-row">
          <div className="search_box_div">

            <BiSearchAlt2
               className="search_box_img"
           />
            <Input className="search_box"
              id="search"
              type="text"
              placeholder="Search by FAQ"
              autoComplete="off"
            />
          </div>
        </div>

        <div
          className="col-md-9 d-flex flex-row"
          style={{ alignItems: "center",justifyContent:"end" }}
        >
          <div style={{ marginTop: "0px", padding: "0" }}>
            <Link to="/createFaq">
              <button
                type="button"
                className="d-flex add_faq_button"
                defaultValue="Sign Up"
              >
                <div
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  Add FAQ
                </div>

                <img className="create_button_img"
                  src="dist/img/AddNew.png"
                  style={{marginLeft: "55px" }}
                />
              </button>
            </Link>
          </div>

          <div className="d-flex flex-row" style={{ alignItems: "center" }}>
            <p
              className="faq_bar"
              style={{
                marginLeft: "13px",
                marginRight: "13px",
                color: "#4AA081",
              }}
            >
              |
            </p>
          </div>

          <div style={{ marginTop: "0px", padding: "0" }}>
            <a>
              <DownloadTableExcel
                filename="uploadStudent"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button
                  type="button"
                  className="d-flex add_faq_button"
                  defaultValue="Sign Up"
                >
                  <div
                    style={{
                      marginLeft: "5px",
                    }}
                  >
                    Download Excel
                  </div>
                  <img className="create_button_img"
                    src="dist/img/Download.png"
                    style={{
                      marginLeft: "13px",
                    }}
                  />
                </button>
              </DownloadTableExcel>
            </a>
          </div>

          <div
            className="d-flex flex-row"
            style={{ marginTop: "0px", padding: "0", marginLeft: "5px" }}
          >
            <a>
              <button
                type="button"
                className="d-flex add_faq_button"
                defaultValue="Sign Up"
                style={{ background: "#000000", color: "#ffffff" }}
              >
                <div
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  Upload List
                </div>
                <img className="create_button_img"
                  src="dist/img/Progress.png"
                  style={{marginLeft: "42px" }}
                />
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        className="row border_class2 " style={{padding:"10px"}}>
        <div
          className="col-md-3 faq_Content_scrollbar"
          style={{
            // background: "#E4E9F3",
            padding: "10px",
            overflowY: "auto",
            height: "450px",
          }}
        >
          <div
            style={{
              padding: "0px",
              width: "100%",
              height: "30px",
              background: "#FFFFFF",
              border: "1px solid #15A312",
              borderRadius: "3px",
              boxSizing: "border-box",
              marginBottom: "10PX",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Poppins",
            }}
          >
            <a
              className="cta"
              href="#google"
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "10px",
                lineHeight: "15px",
                color: "#15A312",
                textAlign: "center",
                marginTop: "8px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              (+)Add Category
            </a>
          </div>

          <div id="myDIV">
            {data &&
              data.map((item) => {
                return (
                  <div
                    id="faq_category"
                    key={item.category_id}
                    className={item.isActive ? "aaaactive item" : "item"}
                    onClick={() => QuestionAnswer(item.category_id)}
                    style={{
                      padding: "6px 0px 0px 10px",
                      width: "100%",
                      height: "28px",
                      color: "#1F3977",
                      border: "1px solid #c5c5c5",
                      borderRadius: "3px",
                      alignItems: "left",
                      justifyContent: "left",
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "10px",
                      textAlign: "left",
                      cursor: "pointer",
                      margin: "0 0 2px 0",
                      background: "white",
                    }}
                  >
                    {item.category_name}
                  </div>
                );
              })}
          </div>
        </div>

        <div
          className="col-md-9 faq_Content_scrollbar"
          style={{
            border: "1px solid #f5f5f5",
            overflowY: "auto",
            height: "450px",
          }}
        >
          <div style={{ display: "block" }} className="faq_content">
            <div className="old_faq">
              {firstData.map((item) => {
                return (
                  <div
                    style={{
                      padding: "0",
                      margin: "5px 0 5px 0",
                      background: "#E4E9F3",
                      height: "auto",
                      borderRadius: "2PX",
                    }}
                  >
                    <FAQ>
                      <FAQ.QAItem>
                        <FAQ.Question answerId={item.faq_id}>
                          {(isOpen, onToggle) => {
                            return (
                              <div className="d-flex" style={{ width: "100%" }}>
                                <p>@</p>
                                <span
                                  style={{ width: "100%", marginLeft: "6px" }}
                                >
                                  {item.question}
                                </span>
                                <a
                                  className="cta ml-auto"
                                  href="#editFaq"
                                  onClick={() => faqDetails(item.faq_id)}
                                  style={{ backgroundColor: "transparent" }}
                                >
                                  <img
                                    src={require("../images/Pencil.png")}
                                    alt="edit"
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      marginLeft: "auto",
                                    }}
                                  />
                                </a>
                              </div>
                            );
                          }}
                        </FAQ.Question>

                        <FAQ.Answer id={item.faq_id}>
                          {" "}
                          {item.answer}{" "}
                        </FAQ.Answer>
                      </FAQ.QAItem>
                    </FAQ>
                  </div>
                );
              })}
            </div>

            <div className="new_faq">
              {catData == "" ? (
                <div>NO DATA AVAILABLE</div>
              ) : (
                <div>
                  {catData.map((item) => {
                    return (
                      <div
                        style={{
                          padding: "0",
                          margin: "5px 0 5px 0",
                          background: "#E4E9F3",
                          height: "auto",
                          borderRadius: "2PX",
                        }}
                      >
                        <FAQ>
                          <FAQ.QAItem>
                            <FAQ.Question answerId={item.faq_id}>
                              {(isOpen, onToggle) => {
                                return (
                                  <div
                                    className="d-flex"
                                    style={{
                                      width: "100%",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div className="faq_dot"></div>
                                    <span
                                      style={{
                                        width: "100%",
                                        fontSize: "11px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {item.question}
                                    </span>
                                    <a
                                      className="cta ml-auto"
                                      href="#editFaq"
                                      onClick={() => faqDetails(item.faq_id)}
                                      style={{ backgroundColor: "transparent" }}
                                    >
                                      <img
                                        src={require("../images/Pencil.png")}
                                        alt="edit"
                                        style={{
                                          width: "12px",
                                          height: "12px",
                                          marginLeft: "auto",
                                        }}
                                      />
                                    </a>
                                  </div>
                                );
                              }}
                            </FAQ.Question>
                            <FAQ.Answer id={item.faq_id}>
                              {" "}
                              {item.answer}{" "}
                            </FAQ.Answer>
                          </FAQ.QAItem>
                        </FAQ>
                      </div>
                    );
                  })}

                  {/* {catData.map((faq) => {
                    return (
                      <div>
                        <div className="mt-2 p-0 "  >

                          <div className="row faq_question" onClick={() => clickOnFaqQuestion(faq.faq_id)} style={{ padding: "0", margin: "0", background: "#E4E9F3", padding: "10px 15px", height: "auto", borderRadius: "2PX" }}>
                            <aside class="col-md-10" style={{ padding: "0", color: "#1F3977", fontSize: "10px" }}>
                              {faq.question}
                            </aside>

                            <div class="col-md-2 d-flex" style={{ padding: "0", color: "#1F3977" }}>
                              <a
                                className="cta ml-auto"
                                href="#editFaq"
                                onClick={() => faqDetails(faq.faq_id)}
                                style={{ backgroundColor: "transparent" }}
                              >
                                <img
                                  src={require("../images/Pencil.png")}
                                  alt="edit"
                                  style={{ width: "15px", height: "15px", marginLeft: "auto" }}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="row faq_answer" style={{ padding: "0", margin: "0", background: "rgba(228, 233, 243, 0.4)", padding: "10px 15px", height: "auto", borderRadius: "2PX",display:"none" }}>
                            <aside class="col-md-12" style={{ padding: "0", color: "black", fontSize: "10px" }}>
                            {faq.answer}
                            </aside>
                            </div>



                      </div>
                      <div>
                         <Faq data={faqData} />
                        </div>
                    )
                  }
       )} */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div
          id="editFaq"
          className="edit_container"
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
              width: "400px",
              height: "100%",
            }}
          >
            <div
              className="d-flex"
              style={{
                borderBottom: "2px solid #15a312",
                transform: "rotate(0.13deg)",
                paddingBottom: "10px",
                marginTop: "28px",
              }}
            >
              <label
                style={{ color: "black", fontSize: "13px", fontWeight: "700" }}
              >
                Edit FAQ
              </label>

              <img
                src="dist/img/Cancel.png"
                onClick={() => close_edit_modal()}
                alt="dropdown"
                className="close_event ml-auto"
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
              />
            </div>

            <div className="card-body" style={{ margin: "0px", padding: "0" }}>
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
                <div
                  style={{
                    background: "white",
                    marginTop: "10PX",
                    padding: "5px 10PX",
                    border: "0.4px solid #C4C4C4",
                  }}
                >
                  <div className="d-flex" style={{ padding: "10px 0px" }}>
                    <h4
                      style={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "12PX",
                        fontWeight: "600",
                      }}
                    >
                      Category & Question
                    </h4>

                    <img
                      src="dist/img/Pencil.png"
                      alt="dropdown"
                      width="15px"
                      height="15px"
                      className=" ml-auto"
                      onClick={() => edit_faqForm(fAQId)}
                    />
                  </div>

                  <div>
                    <div
                      className="row"
                      style={{
                        background: "#E4E9F3B2",
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
                        Category
                      </p>
                      <p
                        className="col-md-9"
                        style={{
                          color: "#1f3977",
                          fontWeight: "600",
                          fontSize: "10PX",
                        }}
                      >
                        : {categoryName}
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
                        Question
                      </p>
                      <p
                        className="col-md-9"
                        style={{
                          color: "#1f3977",
                          fontWeight: "600",
                          fontSize: "10PX",
                        }}
                      >
                        : {question}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "white",
                    marginTop: "10PX",
                    padding: "5px 10PX",
                    height: "100%",
                    border: "0.4px solid #C4C4C4",
                  }}
                >
                  <div className="d-flex" style={{ padding: "10px 0px" }}>
                    <h4
                      style={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "12PX",
                        fontWeight: "600",
                      }}
                    >
                      Response
                    </h4>
                  </div>

                  <div>
                    <div
                      className="row"
                      style={{
                        background: "#E4E9F3B2",
                        height: "auto",
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
                        Answer
                      </p>
                      <p
                        className="col-md-9"
                        style={{
                          color: "#1f3977",
                          fontWeight: "600",
                          fontSize: "10PX",
                        }}
                      >
                        : {answer}
                      </p>
                    </div>
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
        </div> */}

        {/* edit popuop with password */}
        <div
          id="edit_with_password"
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
                Edit FAQ
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
                undone. Please type the password of the screen Admin into the
                box below to confirm you really want to do this.
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
                          Edit FAQ
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

        {/* *******************************************Edit Form ************************************** */}
        <div
          className="edit_faq edit_container">
          <div className="edit_container_inner">
            <div className="d-flex edit_top_container">
              <label className="main_labels">
                Faq
              </label>

              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
               
                className="close_event ml-auto cancel_img"
                
                onClick={() => close_edit_form()}
              />
            </div>
            
            <div>
            <div className="edit_top_label">
                  <p>Category & Question</p>
                </div>
              <div className="edit_border_class">
                <div class="row">
                  <div class="col-md-3">
                      <div>
                        <label className="all_labels">
                           Category :
                        </label>
                      </div>
                  </div>
                  <div class="col-md-9">
                  <select
                        className="edit_inputs_class"
                        id="news_category"
                        aria-label=".form-select-sm example"
                        onChange={(e) => updateFaqCatId(e.target.value)}                        
                      >
                        <option selected="selected" value={faqCatId}>
                          {categoryName}
                        </option>
                        {data.length > 0 ? (
                          data.map((item, index) => {
                            return (
                              <option value={item.category_id} key={index}>
                                {item.category_name}
                              </option>
                            );
                          })
                        ) : (
                          <div>Data Not Found</div>
                        )}
                      </select>
                  </div>

                  <div class="col-md-3">
                      <div>
                        <label className="all_labels">
                        Question :
                        </label>
                      </div>
                  </div>
                  <div class="col-md-9">
                    <div>
                     <input
                        type="name"
                        className="input-field edit_inputs_class"
                        autoComplete="true"
                        value={question}
                        onChange={(e) => updateQuestion(e.target.value)}
                        
                      />
                      </div>
                  </div>
                </div>
              </div>

              
              <div>
              <div className="edit_top_label">
                  <p>Answer</p>
                </div>
                  <div>
                      <textarea
                        rows="4"
                        className="edit_inputs_class edit_border_class"
                        id="news_description"
                        value={answer}
                        onChange={(e) => updateAnswer(e.target.value)}
                        style={{
                          height: "200px"
                        }}
                      />
                </div>
              </div>

              {/* ******************button********************** */}

              <div className="d-flex mt-3 edit_buttons_div border_class2">
                  <button
                    className="edit_cancel_button"
                    value="Cancel"
                    onClick={() => close_edit_form()}
                  >Cancel</button>

                  <button
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edited_Event()}
                  >Update</button>
              </div>

              <div
                style={{ display: "none", color: "green" }}
                className="saveMessage"
              >
                Faq Edited Successfully...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
