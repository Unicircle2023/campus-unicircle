import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import toast,{Toaster} from "react-hot-toast";
import { useHistory } from "react-router-dom";

export function FaqForm() {
  $(".close_event").click(function() {
    $(".user_type").hide();
  });
  function preview() {
    $(".preview_polls").show();
    get_single_faq_category();
  }

  async function get_single_faq_category() {
    try {
      const formData = new FormData();
      formData.append("fid", category);

      const fetchcategoryResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "get_faq_single_category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Get Single Faq category", fetchcategoryResponse);

      const catErrorCode = fetchcategoryResponse.data.error_code;
      console.log("Faq category Error Code ", catErrorCode);

      const categoryList = fetchcategoryResponse.data.data;

      if (catErrorCode === 200) {
        const catListArray = fetchcategoryResponse.data.data;
        console.log("category list Array", catListArray);
        setCatData(catListArray);
      } else {
        setCatData([]);
      }

      categoryList.map((item) => {
        console.log("category item", item.category_name);
        updateCategoryName(item.category_name);
      });
    } catch (err) {
      console.log("Log in Fail", err);
    }
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
  const history = useHistory();

  const [category, updateCategory] = useState("");
  const [question, updateQuestion] = useState("");
  const [answer, updateAnswer] = useState("");
  const [error_message, updateError_message] = useState("");
  const [data, setData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [categoryName, updateCategoryName] = useState("");

  function cancelEdit() {
    $(".preview_category").hide();
  }

  const resetValues = () => {
    var dropDown = document.getElementById("faq_category");
    dropDown.selectedIndex = 0;
    updateCategory("");
    updateQuestion("");
    updateAnswer("");
  };
  async function createFaq() {
    try {
      const faqCategory = document.getElementById("faq_category");
      const quest = document.getElementById("faq_question");
      const ans = document.getElementById("faq_answer");

      if (faqCategory.value == "" && quest.value == "" && ans.value == "") {
        $(".FaqCategory").show();

        setTimeout(function() {
          $(".FaqCategory").hide();
        }, 3000);
        return;
      } else if (faqCategory.value == "") {
        $(".FaqCategory").show();

        setTimeout(function() {
          $(".FaqCategory").hide();
        }, 3000);
      } else if (quest.value == "") {
        $(".Question").show();

        setTimeout(function() {
          $(".Question").hide();
        }, 3000);
      } else if (ans.value == "") {
        $(".Answer").show();

        setTimeout(function() {
          $(".Answer").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("category", category);
        formData.append("question", question);
        formData.append("answer", answer);

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

        updateError_message(response.data.message);
        updateCategory("");
        updateQuestion("");
        updateAnswer("");

        toast.success(response.data.message);

        setTimeout(function() {
          history.push("/faqDetails")
        }, 3000);
       
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [catDetails, updateCatDetails] = useState([]);
  const [catId, updateCatId] = useState([]);
  const [catName, updateCatName] = useState([]);

  async function fetchFaqCategory() {
    updateShowFlag("1");
    console.log("student flag", showFlag);
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

  const [showFlag, updateShowFlag] = useState("1");
  const [excelError_message, updateExcelError_message] = useState("");

  function saveForm() {
    updateAnswer(answer);
    updateQuestion(question);
    updateCatId(catName);
  }

  return (
    <div className="content-wrapper">
        <Toaster
           position="top-right"
          reverseOrder={false}
     />
      <div className="border_class2 box_padding">
        <h1 className="main_heading_h1">CREATE FAQ</h1>
      </div>

      <div class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      <div>
        <div className="border_class2 box_padding">
          {/*select category  */}
          <div className=" p-0">
            <div class="row">
              <div class="col-md-5 d-flex">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Select Category</label>

                    <p className="all_stars">*</p>
                  </div>

                  <select
                    className="all_inputs"
                    id="faq_category"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateCategory(e.target.value)}
                  >
                    <option selected="selected" value={category}>
                      Select Category
                    </option>
                    {catDetails &&
                      catDetails.map((catItem, index) => {
                        console.log("Id", catItem.cat_id);
                        return (
                          <option value={catItem.cat_id}>
                            {catItem.category_name}
                          </option>
                        );
                      })}
                  </select>

                  <div class="FaqCategory" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Faq Category
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-7" style={{ paddingLeft: "0" }}></div>
            </div>
          </div>

          {/* question */}
          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-9 d-flex">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Enter FAQ</label>

                    <p className="all_stars">*</p>
                  </div>

                  <textarea
                    type="name"
                    id="faq_question"
                    className="dept-dropdown all_inputs"
                    placeholder="Your Question goes here..."
                    autoComplete="true"
                    onChange={(e) => updateQuestion(e.target.value)}
                    value={question}
                    style={{ height: "80px" }}
                  />

                  <div class="Question" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Enter Question
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* answer */}
        <div className="border_class2 box_padding">
          <div class="row">
            <div class="col-md-9 d-flex">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
              >
                <div className="d-flex">
                  <label className="all_labels">Enter Your Response</label>

                  <p className="all_stars">*</p>
                </div>

                <textarea
                  type="name"
                  id="faq_answer"
                  className="dept-dropdown all_inputs"
                  placeholder="Your Answer goes here..."
                  autoComplete="true"
                  onChange={(e) => updateAnswer(e.target.value)}
                  value={answer}
                  style={{ height: "80px" }}
                />
                <div class="Answer" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Enter Answer
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div
          className="d-flex border_class2 box_padding buttons_div mb-4"
         
        >
          <div
            class="ValueMsg"
            style={{ margin: "8px", width: "65%", display: "none" }}
          >
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>

          <img
            src="dist/img/delete.png"
            alt="dropdown"
            className="delete_img"
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
              alt="dropdown"
             
             
            />
            </div>
          </button>

         
          <input
            type="button"
            className=" publish_button"
            defaultValue="Sign Up"
            onClick={() => createFaq()}
            value="Publish"
            
          />
          
        </div>
      </div>

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
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div>
          <div className="edit_top_label d-flex" style={{marginTop:"0px"}}>
              <p> Category </p>
                
                  <img
                    src="dist/img/Pencil.png"
                    alt="dropdown"
                    className=" ml-auto preview_edit_img"
                    onClick={() => edit_category()}
                  />
            </div>

            <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-4">
                    <span className="preview_font">
                    Category Name
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{categoryName}</span>
                  </div>
                </div>
                </div>

                <div className="edit_top_label d-flex">
              <p> Question </p>
            </div>

            <div className="edit_border_class" style={{height:"80px"}}>
                <div className="row">
                 
                  <div className="">
                     <span className="preview_font" >{question}</span>
                  </div>

                </div>
                </div>

                <div className="edit_top_label d-flex">
              <p> Response </p>
            </div>

            <div className="edit_border_class" style={{height:"200px"}}>
                <div className="row">
                 
                  <div className="">
                     <span className="preview_font">{answer}</span>
                  </div>

                </div>
                </div>
          </div>
        </div>
      </div>

      {/* **********************************************preview category************************************* */}
      <div
        className="preview_category">
        <div className="edit_inner">
          <div className="d-flex edit_inner_div">
            <label className="main_labels">
              Faq
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              className="close_event ml-auto cancel_img"
              
              onClick={() => cancelEdit()}
            />
          </div>
         
          <div className="mt-2">
          <div className="edit_top_label">
                  <p> Category </p>
                </div>

                <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-3">
                    <span className="preview_font">
                    Category :
                    </span>
                  </div>
                  <div className="col-md-9">
                  <select
                      className="edit_inputs_class"
                      id="news_category"
                      aria-label=".form-select-sm example"
                      onChange={(e) => updateCatId(e.target.value)}
                    >
                      <option selected="selected" value={catName}>
                        {categoryName}
                      </option>
                      {catDetails &&
                        catDetails.map((catItem, index) => {
                          console.log("Id", catItem.cat_id);
                          return (
                            <option value={catItem.cat_id}>
                              {catItem.category_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                </div>

                <div className="edit_top_label">
                  <p> Question </p>
                </div>

                <div className="edit_border_class">
                <textarea className="edit_inputs_class"
                      autoComplete="true"
                      onChange={(e) => updateQuestion(e.target.value)}
                      value={question}
                      style={{height:"80px"}}
                    />
                </div>

                <div className="edit_top_label">
                  <p> Reason </p>
                </div>

                <div className="edit_border_class">
                <textarea className="edit_inputs_class"
                      autoComplete="true"
                      onChange={(e) => updateAnswer(e.target.value)}
                      value={answer}
                      style={{height:"200px"}}
                    />
                </div>

            {/* ******************button********************** */}
            <div
              className="d-flex form-buttons mt-4 edit_buttons_div border_class2"
              style={{justifyContent:"end"}}
            >
              <input
                type="button"
                className=" form-buttons3 edit_cancel_button"
                defaultValue="Next Step"
                onClick={() => cancelEdit()}
                value="Cancel"
                
              />

              <input
                type="button"
                className=" form-buttons3 edit_update_button"
                defaultValue="Next Step"
                onClick={() => saveForm()}
                value="Save"
               
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
