import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

export function PollsFormStep1() {
  const token = localStorage.getItem("Token");
  const [category, updateCategory] = useState("");
  const [categoryValue, updateCategoryValue] = useState("");
  const [que, updateQue] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, updateErrorMessage] = useState("");
  const [error_message, updateError_message] = useState("");
  const [pollsData, setPollsData] = useState([]);
  const history = useHistory();

  async function createPollStep1() {
    try {
      const pollsCategory = document.getElementById("pollsCategory");
      const questions = document.getElementById("questions");

      if (pollsCategory.value == "" && questions.value == "") {
        toast.error( "Fill the required fields", {
          duration: 2000,
        });
        return;
      } else if (pollsCategory.value == "") {
        $(".PollsCategory").show();

        setTimeout(function() {
          $(".PollsCategory").hide();
        }, 3000);
      } else if (questions.value == "") {
        $(".Question").show();

        setTimeout(function() {
          $(".Question").hide();
        }, 3000);
      } else {
        
        toast.success( "Data saved", {
          duration: 2000,
        });

        setTimeout(function() {
          history.push("/pollsFormStep2", { que, category });
        }, 2000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [errorCode, updateErrorCode] = useState("");
  async function createPollsCategory() {
    try {
      const newsCategory = document.getElementById("news_category_single");

      if (newsCategory.value == "") {
        $(".NewsCategorySingle").show();

        setTimeout(function() {
          $(".NewsCategorySingle").hide();
        }, 3000);
      } else {
        const formDataCategory = new FormData();

        formDataCategory.append("category_name", categoryValue);

        const responseCategory = await axios.post(
          process.env.REACT_APP_API_KEY + "create_poll_category",

          formDataCategory,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        console.log("Create Polls Category", responseCategory.data);

        // if (responseCategory.data.error_code == 404) {
        //   alert("Invalid Token OR Non Authorized User");
        //   window.location.href = "/";
        // }

        updateCategoryValue([responseCategory.data]);
        updateErrorMessage(responseCategory.data.message);
        updateErrorCode(responseCategory.data.error_code);
        updateCategoryValue("");

        $(".SuccessMsg").show();

        setTimeout(function() {
          $(".SuccessMsg").hide();
        }, 4000);

        window.location.href = "/createPoll";
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
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

      const PollsCategoryErrorCode = fetchPollsListResponse.data.error_code;

      if (PollsCategoryErrorCode == 200) {
        const PollsCategoryListArray = fetchPollsListResponse.data.data;
        setData(PollsCategoryListArray);
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

  return (
    <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
        <Toaster
          position="top-right"
          reverseOrder={false}
       />
      <div className="border_class2">
        <div style={{ padding: "6px" }}>
          <h1 className="polls_heading_h1">CREATE POLLS</h1>
        </div>
        <div className="ten_font_class"
          style={{
            padding: "5px",
           
            background: "rgba(110, 119, 129, 0.1)",
          }}
        >
          <div  className="d-flex ten_font_class">
            <p
              style={{
                color: "#1F3977",               
                paddingLeft: "42px",
              }}
            >
              Step 1 :
            </p>
            <p className="ten_font_class"
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                marginLeft: "20px",
                
              }}
            >
              Category & Question
            </p>
          </div>
        </div>
      </div>
      
      {/* CREATE news category pop up */}
      <div id="google" className="modaloverlay">
        <div className="modalContainer" style={{width:"30%"}}>
          <form role="form">
            <div className="card-body" style={{ width: "auto" }}>
             
              <div className="form-group" style={{ marginTop: "0px" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  style={{ color: "#1F3977", fontSize: "10px " }}
                >
                  Add Polls Category
                </label>
                <br />
                <input
                  type="name"
                  className="border all_inputs"
                  id="news_category_single"
                  placeholder="Add Polls Category"
                  value={categoryValue}
                  onChange={(e) => updateCategoryValue(e.target.value)}
                />
                <div
                  class="NewsCategorySingle"
                  style={{ marginTop: "-6px", display: "none" }}
                >
                  <h4
                    class="login-text"
                    style={{ color: "red", fontSize: "10PX", marginLeft: "0" }}
                  >
                    Please Enter Polls Category
                  </h4>
                </div>
              </div>

              <div className="mt-3 d-flex">
                <input
                  type="button"
                  className="create_btn"
                  //defaultValue="Sign Up"
                  value="Submit"
                  onClick={() => createPollsCategory()}
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
              {errorCode == 200 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/correct.png")}
                    style={{ width: "20px" }}
                  />
                  <p style={{ color: "green", marginLeft: "5px" }}>
                    {errorMessage}
                  </p>
                </div>
              ) : errorCode == 404 ? (
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
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </div>
              ) : (
                ""
              )}
              {/* </div> */}
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

      {/* end news category pop up */}
      <div>
        <div className=" p-0  border_class2 box_padding">
          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-6 d-flex">
                <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                  <div className="d-flex">
                    <label className="all_labels">Select Category</label>

                    <p className="all_stars">*</p>
                  </div>

                  <select
                    className="all_inputs"
                    id="pollsCategory"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateCategory(e.target.value)}
                  >
                    <option selected="selected" value={category}>
                      Select Category
                    </option>
                    {data.map((item, index) => {
                      return (
                        <option value={item.cat_id} key={index}>
                          {item.category_name}
                        </option>
                      );
                    })}
                  </select>
                  <div class="PollsCategory" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Category
                    </h4>
                  </div>
                </div>
                <div
                  style={{
                    display:"flex",
                    alignItems:"end",
                    height: "100%",
                    marginTop: "0px",
                    paddingLeft:"10px"
                  }}
                >
                  <a className="cta" href="#google">
                    <img
                      src="dist/img/add.png"
                      style={{ width: "20px", height: "19px" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 p-0">
            <div class="row">
              <div class="col-md-6">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Enter Your Question</label>

                    <p className="all_stars">*</p>
                  </div>
                  <textarea
                    className="all_inputs"
                    type="name"
                    rows="4"
                    id="questions"
                    value={que}
                    onChange={(e) => updateQue(e.target.value)}
                    placeholder="Your message goes here..."
                    maxLength={200}
                    style={{ height: "80px" }}
                  />

                  <div class="Question" style={{ display: "none" }}>
                    <p class="login-text all_validations_h4">
                      Please Write Question Here..
                    </p>
                  </div>
                  <div className="d-flex">
                    <p style={{ fontSize: "10px" }} className="ml-auto">
                      200 characters max
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="d-flex form-buttons border_class2 box_padding buttons_div">
          <img className="delete_img"
            src="dist/img/delete.png"
          />
          <p className="faq_bar">
            |
          </p>
          <button
            type="button"
            className=" form-buttons3"
            //defaultValue="Next Step"
            onClick={() => createPollStep1()}
            value="Next Step"
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "500",
              border: "1px solid #000000",
              borderRadius: "6px",
              backgroundColor: "rgba(0, 0, 0, 0.01)",
              height: "28px",
              width: "130px",
              fontSize: "10PX",
              marginLeft:"15px"
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
          {/* </a> */}
        </div>
      </div>
    </div>
  );
}
