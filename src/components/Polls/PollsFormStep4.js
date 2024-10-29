import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory,useLocation} from "react-router-dom";
import { Header } from "../Header";
import toast,{Toaster} from "react-hot-toast";

import { Menu } from "../Menu";
import { Dropdown } from "bootstrap";
import { PollsDropdown } from "./PollsDropdown";

export function PollsFormStep4(props) {
  const [childData, setChildData] = useState({ });
  const passStep1Data = (data) => {
    setChildData(data);
  };
 
  const token = localStorage.getItem("Token");
 
  const [categoryValue, updateCategoryValue] = useState("");
 
  const [data, setData] = useState([]);
  const [errorMessage, updateErrorMessage] = useState("");
  const [error_message, updateError_message] = useState("");
  const [pollsData, setPollsData] = useState([]);
  const history = useHistory();
  const [cat, updateCategory] = useState("");

  //  Dropdown states
  const [select, setSelect] = useState(false);
  const [select_data, setSelect_data] = useState("");
  const [select2, setSelect2] = useState(false);
  const [select_data2, setSelect_data2] = useState("");
  const [select3, setSelect3] = useState(false);
  const [select_data3, setSelect_data3] = useState("");
  const [select4, setSelect4] = useState(false);
  const [select_data4, setSelect_data4] = useState("");
  const [select5, setSelect5] = useState(false);
  const [select_data5, setSelect_data5] = useState("");
  const [follow_up1, setFollow_up1] = useState();
  const [follow_up2, setFollow_up2] = useState();
  const [follow_up3, setFollow_up3] = useState();
  const [follow_up4, setFollow_up4] = useState();
  const [follow_up5, setFollow_up5] = useState();

  const [response_one, setResponse_one] = useState(0);
  const [response_two, setResponse_two] = useState(0);
  const [response_three, setResponse_three] = useState(0);
  const [response_four, setResponse_four] = useState(0);
  const [response_five, setResponse_five] = useState(0);

  const [follow_up1_msg, setFollow_up1_msg] = useState();
  const [follow_up2_msg, setFollow_up2_msg] = useState();
  const [follow_up3_msg, setFollow_up3_msg] = useState();
  const [follow_up4_msg, setFollow_up4_msg] = useState();
  const [follow_up5_msg, setFollow_up5_msg] = useState();
 

  // Dropdown Arrays
  const response1_arr = [
    {
      id: "1",
      name: "Positive",
      color: "#15A312",
    },
    {
      id: "2",
      name: "Neutral",
      color: "#C0A200",
    },
    {
      id: "3",
      name: "Negative",
      color: "#EB2424",
    },
  ];
  const location = useLocation();
  const { category } = location.state || { id: "none" };
  const { que } = location.state || { id: "none" };
  const { answer1 } = location.state || { id: "none" };
  const { answer2 } = location.state || { id: "none" };
  const { answer3 } = location.state || { id: "none" };
  const { answer4 } = location.state || { id: "none" };
  const { answer5 } = location.state || { id: "none" };
  const { result } = location.state || { id: "none" };
  
  async function createPollStep4() {
    try {
      const pollsCategory = document.getElementById("pollsCategory");
      const questions = document.getElementById("questions");
      const r1 =document.getElementsByClassName("checked_div_colorBox");
      const r2 =document.getElementsByClassName("checked_div_colorBox2");
      

  //     if (select_data=="") {
  //       $(".risk_level1").show();
      
  //       setTimeout(function() {
  //         $(".risk_level1").hide();
  //       }, 3000);
  //       return;
  //     } else if (select_data2=="") {
  //       $(".risk_level2").show();
       
  //       setTimeout(function() {
  //         $(".risk_level2").hide();
  //       }, 3000);
  //     } else if (select_data3=="") {
  //       $(".risk_level3").show();

  //       setTimeout(function() {
  //         $(".risk_level3").hide();
  //       }, 3000);
  //     } else if (select_data4=="") {
  //       $(".risk_level4").show();

  //       setTimeout(function() {
  //         $(".risk_level4").hide();
  //       }, 3000);
  //     } else if (select_data5=="") {
  //       $(".risk_level5").show();

  //       setTimeout(function() {
  //         $(".risk_level5").hide();
  //       }, 3000);
  //     }

  //     else if (follow_up1==null) {
  //     $(".follow_up1").show();

  //     setTimeout(function() {
  //       $(".follow_up1").hide();
  //     }, 3000);
  //   } else if (follow_up2==null) {
  //     $(".follow_up2").show();

  //     setTimeout(function() {
  //       $(".follow_up2").hide();
  //     }, 3000);
  //   } else if (follow_up3==null) {
  //     $(".follow_up3").show();
  //     setTimeout(function() {
  //       $(".follow_up3").hide();
  //     }, 3000);
  //   }
  //  else if (follow_up4==null) {
  //   $(".follow_up4").show();
  //   setTimeout(function() {
  //     $(".follow_up4").hide();
  //   }, 3000);

  // } else if (follow_up5==null) {
  //   $(".follow_up5").show();
  //   setTimeout(function() {
  //     $(".follow_up5").hide();
  //   }, 3000);
  // }
  //     else {}
       
              toast.success( "Data saved", {
                duration: 2000,
              });

        setTimeout(function() {
          history.push("/pollsFormStep3", {
            que,
            category,
            result,
            answer1,
            answer2,
            answer3,
            answer4,
            answer5,
            select_data,
            select_data2,
            select_data3,
            select_data4,
            select_data5,

            follow_up1,
            follow_up2,
            follow_up3,
            follow_up4,
            follow_up5,

            response_one,
            response_two,
            response_three,
            response_four,
            response_five,
            
            follow_up1_msg,
            follow_up2_msg,
            follow_up3_msg,
            follow_up4_msg,
            follow_up5_msg
          });
        }, 2000);
      
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

      console.log("Get Polls Category List Details", fetchPollsListResponse);

      // if (fetchPollsListResponse.data.error_code == 404) {
      //   alert("Invalid Token OR Non Authorized User");
      //   window.location.href = "/";
      // }

      const PollsCategoryErrorCode = fetchPollsListResponse.data.error_code;
      console.log("Polls Category Error Code ", PollsCategoryErrorCode);

      const PollsCategoryErrorMsg = fetchPollsListResponse.data.message;
      console.log("Polls Category Error msg ", PollsCategoryErrorMsg);

      if (PollsCategoryErrorCode == 200) {
        const PollsCategoryListArray = fetchPollsListResponse.data.data;
        console.log("News Category list Array", PollsCategoryListArray);
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

  const firstFollow_up = (e) =>{
    setFollow_up1_msg("")
    const _a = e.target.value;
    setFollow_up1(_a);
    setResponse_one(_a);
    if(_a == 1){
      $(".follow_up_one").show()
    }else{
      $(".follow_up_one").hide()
      setFollow_up1_msg("")
    }
  }

  const secondFollow_up = (e) =>{
    setFollow_up2_msg("")
    const _a = e.target.value;
    setFollow_up2(_a);
    setResponse_two(_a);
    if(_a == 1){
      $(".follow_up_two").show()
    }else{
      $(".follow_up_two").hide()
      setFollow_up2_msg("")
    }
  }

  const thirdFollow_up = (e) =>{
    setFollow_up3_msg("")
    const _a = e.target.value;
    setFollow_up3(_a); 
    setResponse_three(_a);
    if(_a == 1){
      $(".follow_up_three").show()
    }else{
      $(".follow_up_three").hide()
      setFollow_up3_msg("")
    }
  }

  const fourthFollow_up = (e) =>{
    setFollow_up4_msg("")
    const _a = e.target.value;
    setFollow_up4(_a); 
    setResponse_four(_a);
    if(_a == 1){
      $(".follow_up_four").show()
    }else{
      $(".follow_up_four").hide()
      setFollow_up4_msg("")
    }
  }

  const fifthFollow_up = (e) =>{
    setFollow_up5_msg("")
    const _a = e.target.value;
    setFollow_up5(_a); 
    setResponse_five(_a);
    if(_a == 1){
      $(".follow_up_five").show()
    }else{
      $(".follow_up_five").hide()
      setFollow_up5_msg("")
    }
  }

  return (
    <>
       <Toaster
          position="top-right"
          reverseOrder={false}
       />
      <Header />
      <div className="d-flex">
        <Menu />
        <div className="content-wrapper" style={{ paddingBottom: "22px" }}>
          <div className="border_class2">
            <div style={{ padding: "6px" }}>
              <h1 className="polls_heading_h1">
                CREATE POLLS
              </h1>
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
                  Step 3 :
                </p>
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    marginLeft: "20px",
                    fontWeight: "700",
                    fontSize: "10px",
                  }}
                >
                  Automated Actions
                </p>
              </div>
            </div>
          </div>

          <div>
            <div
              className=" border_class2 box_padding2" >   
            
              <div
                style={{
                  borderBottom: "1px solid #1F3977",
                  padding: "10px",
                  fontWeight: "500",
                }}
              >
                <div style={{ fontSize: "11px" }} class="d-flex">
                  <p style={{ color: "#15a312" }}>Poll Question:</p>
                  <p style={{ color: "#15a312", marginLeft: "5px" }}>
                    {que}
                  </p>
                </div>
              </div>

              <div className=" mt-2 border_class"
                 style={{
                  background: "#ffffff",
                  padding: "5px 12px",
                  marginTop: "13px",
                }}
              >   
                <div className="mt-2 p-0">
                  <div class="row">
                    <div class="col-md-4 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Response 1
                          </label>

                          {/* <p
                            style={{
                              color: "#EB2424",
                              fontWeight: "600",
                              marginLeft: "3PX",
                              fontSize: "10px",
                            }}
                          >
                            *
                          </p> */}
                        </div>
                       
                        <input
                          className="polls_response_section"
                          type="text"
                          readOnly
                          value="Heighly Satisfied"
                          style={{ color: "#1F3977" }}
                        />
                       
                      </div>
                    </div>

                    {/*Risk level Dropdown section */}
                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Risk Level
                          </label>

                        </div>
                        <div>
                          <div className="main_div">
                            <div onClick={() => setSelect(!select)}  id="risk1">
                              <div className="checked_div" >
                                <div
                                  className="checked_div_colorBox"
                                  style={{ background: select_data.color }}
                                >
                                  {" "}
                                </div>
                                <p className="checked_div_p">
                                  {select_data
                                    ? select_data.name
                                    : "Risk Level"}
                                </p>

                                <div className="down_arrow_alignment">
                                  <img
                                    className="down_arrow_image"
                                    src="dist/img/RightButton.png"
                                  />
                                </div>
                              </div>
                            </div>
                            {select == true ? (
                              <div className="selection_box">
                                {response1_arr.map((item) => {
                                  return (
                                    <div
                                      className="selection_div"
                                      onClick={() => {
                                        setSelect_data(item);
                                        $(".checked_div_colorBox").show();
                                        setSelect(false);
                                      }}
                                    >
                                      <div className="selection_inner">
                                        <div
                                          style={{
                                            height: "15px",
                                            width: "16px",
                                            marginTop: "3px",
                                            background: item.color,
                                          }}
                                        ></div>
                                        <div style={{ display: "flex" }}>
                                          <p className="checked_div_p">
                                            {item.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>

                          
                        </div>
                        <div
                          class="risk_level1"
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
                            Please Select Risk Level
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/*Risk Level Dropdown section end */}

                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Automated follow up
                          </label>
                        </div>

                        <div>
                          <select
                            className="  polls_followup down_arrow"
                            id="pollsCategory"
                            aria-label=".form-select-sm example"
                            value={follow_up1}
                            onChange={(e) => firstFollow_up(e)}>
                            <option
                              className="checked_div_p"
                              selected="selected"
                              value="2"
                            >
                             Select Follow up
                            </option>
                            <option
                              className="checked_div_p"
                              value="1"
                            >
                              Push Notification
                            </option>
                           
                            <option
                              className="checked_div_p"
                              value="0"
                            >
                              No Action
                            </option>
                            
                          </select>
                        </div>
                        <div
                          class="follow_up1"
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
                            Please Select Automated follow up
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-10 mt-2 follow_up_one" style={{display:"none"}}>
                     <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                   <input className="all_inputs"
                    type="text"
                    id="follow_up_two"
                    value={follow_up1_msg}
                    onChange={(e) => setFollow_up1_msg(e.target.value)}
                    placeholder="Message goes here..."
                    autoComplete="true"
                    
                  />
                </div>
                     </div>
                  </div>
                </div>
              </div>

              <div
                className="border_class"
                style={{
                  background: "#ffffff",
                  padding: "5px 12px",
                  marginTop: "13px",
                }}
              >
                <div className="mt-2 p-0">
                  <div class="row">
                    <div class="col-md-4 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Response 2
                          </label>
                        </div>

                        <input
                          className="polls_response_section"
                          type="text"
                          readOnly
                          value="Satisfied"
                          style={{ color: "#1F3977" }}
                        />
                      </div>
                    </div>

                    {/*Risk level Dropdown section */}
                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Risk Level
                          </label>

                        </div>
                        <div>
                          <div className="main_div">
                            <div onClick={() => setSelect2(!select2)} >
                              <div className="checked_div"id="risk2">
                                <div
                                  className="checked_div_colorBox2"
                                  style={{ background: select_data2.color }}
                                >
                                  {" "}
                                </div>
                                <p className="checked_div_p">
                                  {select_data2
                                    ? select_data2.name
                                    : "Risk Level"}
                                </p>

                                <div className="down_arrow_alignment">
                                  <img
                                    className="down_arrow_image"
                                    src="dist/img/RightButton.png"
                                  />
                                </div>
                              </div>
                            </div>
                            {select2 == true ? (
                              <div className="selection_box">
                                {response1_arr.map((item2) => {
                                  return (
                                    <div
                                      className="selection_div"
                                      onClick={() => {
                                        setSelect_data2(item2);
                                        $(".checked_div_colorBox2").show();
                                        setSelect2(false);
                                      }}
                                    >
                                      <div className="selection_inner">
                                        <div
                                          style={{
                                            height: "15px",
                                            width: "16px",
                                            marginTop: "3px",
                                            background: item2.color,
                                          }}
                                        ></div>
                                        <div style={{ display: "flex" }}>
                                          <p className="checked_div_p">
                                            {item2.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div
                          class="risk_level2"
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
                            Please Select Risk Level
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/*Risk Level Dropdown section end */}

                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Automated follow up
                          </label>

                          
                        </div>

                        <div>
                          <select
                            className="  polls_followup down_arrow"
                            id="pollsCategory"
                            aria-label=".form-select-sm example"
                            value={follow_up2}
                            onChange={(e) => secondFollow_up(e)}
                          >
                            <option
                              className="checked_div_p"
                              selected="selected"
                              value="2"
                            >
                              Select Follow up
                            </option>
                            <option
                              className="checked_div_p"
                              value="1"
                             
                            >
                               Push Notification
                            </option>
                            <option
                              className="checked_div_p"
                               value="0"
                               
                            >
                              No Action
                            </option>
                           
                          </select>
                        </div>
                        <div
                          class="follow_up2"
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
                            Please Select Automated follow up
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-10 mt-2 follow_up_two" style={{display:"none"}}>
                     <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                   <input className="all_inputs"
                    type="text"
                    id="follow_up_two"
                    value={follow_up2_msg}
                    onChange={(e) => setFollow_up2_msg(e.target.value)}
                    placeholder="Message goes here..."
                    autoComplete="true"
                    
                  />
                </div>
                     </div>


                  </div>
                </div>
              </div>

              <div
                className="border_class"
                style={{
                  background: "#ffffff",
                  padding: "5px 12px",
                  marginTop: "13px",
                }}
              >
                <div className="mt-2 p-0">
                  <div class="row">
                    <div class="col-md-4 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Response 3
                          </label>
                        </div>

                        <input
                          className="polls_response_section"
                          type="text"
                          readOnly
                          value="Neither satisfied nor Dissatisfied"
                          style={{ color: "#1F3977" }}
                        />
                        
                      </div>
                    </div>

                    {/*Risk level Dropdown section */}
                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Risk Level
                          </label>
                        </div>
                        <div>
                          <div className="main_div">
                            <div onClick={() => setSelect3(!select3)}>
                              <div className="checked_div">
                                <div
                                  className="checked_div_colorBox3"
                                  style={{ background: select_data3.color }}
                                >
                                  {" "}
                                </div>
                                <p className="checked_div_p">
                                  {select_data3
                                    ? select_data3.name
                                    : "Risk Level"}
                                </p>

                                <div className="down_arrow_alignment">
                                  <img
                                    className="down_arrow_image"
                                    src="dist/img/RightButton.png"
                                  />
                                </div>
                              </div>
                            </div>
                            {select3 == true ? (
                              <div className="selection_box">
                                {response1_arr.map((item2) => {
                                  return (
                                    <div
                                      className="selection_div"
                                      onClick={() => {
                                        setSelect_data3(item2);
                                        $(".checked_div_colorBox3").show();
                                        setSelect3(false);
                                      }}
                                    >
                                      <div className="selection_inner">
                                        <div
                                          style={{
                                            height: "15px",
                                            width: "16px",
                                            marginTop: "3px",
                                            background: item2.color,
                                          }}
                                        ></div>
                                        <div style={{ display: "flex" }}>
                                          <p className="checked_div_p">
                                            {item2.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div
                          class="risk_level3"
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
                            Please Select Risk Level
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/*Risk Level Dropdown section end */}

                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Automated follow up
                          </label>
                        </div>

                        <div>
                          <select
                            className="  polls_followup down_arrow"
                            id="pollsCategory"
                            aria-label=".form-select-sm example"
                            value={follow_up3}
                            onChange={(e) => thirdFollow_up(e)}
                          >
                            <option
                              className="checked_div_p"
                              selected="selected"
                              value="2"
                            >
                              Select Follow up
                            </option>
                            <option
                              className="checked_div_p"
                              value="1"
                            >
                              Push Notification
                            </option>
                            <option
                              className="checked_div_p"
                              value="0"
                            >
                              No Action
                            </option>
                          </select>
                        </div>
                        <div
                          class="follow_up3"
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
                            Please Select Automated follow up
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-10 mt-2 follow_up_three" style={{display:"none"}}>
                     <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                   <input className="all_inputs"
                    type="text"
                    id="follow_up_two"
                    value={follow_up3_msg}
                    onChange={(e) => setFollow_up3_msg(e.target.value)}
                    placeholder="Message goes here..."
                    autoComplete="true"
                    
                  />
                </div>
                     </div>

                     
                  </div>
                </div>
              </div>

              <div
                className="border_class"
                style={{
                  background: "#ffffff",
                  padding: "5px 12px",
                  marginTop: "13px",
                }}
              >
                <div className="mt-2 p-0">
                  <div class="row">
                    <div class="col-md-4 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Response 4
                          </label>
                        </div>

                        <input
                          className="polls_response_section"
                          type="text"
                          readOnly
                          value=" Dissatisfied"
                          style={{ color: "#1F3977" }}
                        />
                        
                      </div>
                    </div>

                    {/*Risk level Dropdown section */}
                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Risk Level
                          </label>

                        </div>
                        <div>
                          <div className="main_div">
                            <div onClick={() => setSelect4(!select4)}>
                              <div className="checked_div">
                                <div
                                  className="checked_div_colorBox4"
                                  style={{ background: select_data4.color }}
                                >
                                  {" "}
                                </div>
                                <p className="checked_div_p">
                                  {select_data4
                                    ? select_data4.name
                                    : "Risk Level"}
                                </p>

                                <div className="down_arrow_alignment">
                                  <img
                                    className="down_arrow_image"
                                    src="dist/img/RightButton.png"
                                  />
                                </div>
                              </div>
                            </div>
                            {select4 == true ? (
                              <div className="selection_box">
                                {response1_arr.map((item2) => {
                                  return (
                                    <div
                                      className="selection_div"
                                      onClick={() => {
                                        setSelect_data4(item2);
                                        $(".checked_div_colorBox4").show();
                                        setSelect4(false);
                                      }}
                                    >
                                      <div className="selection_inner">
                                        <div
                                          style={{
                                            height: "15px",
                                            width: "16px",
                                            marginTop: "3px",
                                            background: item2.color,
                                          }}
                                        ></div>
                                        <div style={{ display: "flex" }}>
                                          <p className="checked_div_p">
                                            {item2.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div
                          class="risk_level4"
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
                            Please Select Risk Level
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/*Risk Level Dropdown section end */}

                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Automated follow up
                          </label>
                        </div>

                        <div>
                          <select
                            className="  polls_followup down_arrow"
                            id="pollsCategory"
                            aria-label=".form-select-sm example"
                            value={follow_up4}
                            onChange={(e) => fourthFollow_up(e)}
                          >
                            <option
                              className="checked_div_p"
                              selected="selected"
                              value="2"
                            >Select follow up
                             
                            </option>
                            <option
                              className="checked_div_p"
                              value="1"
                            >
                               Push Notification
                            </option>
                            <option
                              className="checked_div_p"
                              value="0"
                            >
                              No Action
                            </option>
                           
                          </select>
                        </div>
                        <div
                          class="follow_up4"
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
                            Please Select Automated follow up
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-10 mt-2 follow_up_four" style={{display:"none"}}>
                     <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                   <input className="all_inputs"
                    type="text"
                    id="follow_up_two"
                    value={follow_up4_msg}
                    onChange={(e) => setFollow_up4_msg(e.target.value)}
                    placeholder="Message goes here..."
                    autoComplete="true"
                    
                  />
                </div>
                     </div>


                  </div>
                </div>
              </div>

              <div
                className="border_class"
                style={{
                  background: "#ffffff",
                  padding: "5px 12px",
                  marginTop: "13px",
                }}
              >
                <div className="mt-2 p-0">
                  <div class="row">
                    <div class="col-md-4 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Response 5
                          </label>

                        </div>

                        <input
                          className="polls_response_section"
                          type="text"
                          readOnly
                          value="Heighly Dissatisfied"
                          style={{ color: "#1F3977" }}
                        />
                        
                      </div>
                    </div>

                    {/*Risk level Dropdown section */}
                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Risk Level
                          </label>

                        </div>
                        <div>
                          <div className="main_div">
                            <div onClick={() => setSelect5(!select5)}>
                              <div className="checked_div">
                                <div
                                  className="checked_div_colorBox5"
                                  style={{ background: select_data5.color }}
                                >
                                  {" "}
                                </div>
                                <p className="checked_div_p">
                                  {select_data5
                                    ? select_data5.name
                                    : "Risk Level"}
                                </p>

                                <div className="down_arrow_alignment">
                                  <img
                                    className="down_arrow_image"
                                    src="dist/img/RightButton.png"
                                  />
                                </div>
                              </div>
                            </div>
                            {select5 == true ? (
                              <div className="selection_box">
                                {response1_arr.map((item2) => {
                                  return (
                                    <div
                                      className="selection_div"
                                      onClick={() => {
                                        setSelect_data5(item2);
                                        $(".checked_div_colorBox5").show();
                                        setSelect5(false);
                                      }}
                                    >
                                      <div className="selection_inner">
                                        <div
                                          style={{
                                            height: "15px",
                                            width: "16px",
                                            marginTop: "3px",
                                            background: item2.color,
                                          }}
                                        ></div>
                                        <div style={{ display: "flex" }}>
                                          <p className="checked_div_p">
                                            {item2.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div
                          class="risk_level5 follow_up5"
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
                            Please Select Risk Level
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/*Risk Level Dropdown section end */}

                    <div class="col-md-3 d-flex">
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
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Automated follow up
                          </label>
                        </div>

                        <div>
                          <select
                            className="  polls_followup down_arrow"
                            id="pollsCategory"
                            aria-label=".form-select-sm example"
                            value={follow_up5}
                            onChange={(e) => fifthFollow_up(e)}
                          >
                            <option
                              className="checked_div_p"
                              selected="selected"
                              value="2"
                            >
                             Select follow up
                            </option>
                            <option
                              className="checked_div_p"
                              value="1"
                            
                            >
                               Push Notification
                            </option>
                            <option
                              className="checked_div_p"
                              value="0"
                            >
                              No Action
                            </option>
                          
                          </select>
                        </div>
                        <div
                          class="follow_up5"
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
                            Please Select Automated follow up
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-10 mt-2 follow_up_five" style={{display:"none"}}>
                     <div
                  style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
                >
                   <input className="all_inputs"
                    type="text"
                    id="follow_up_two"
                    value={follow_up5_msg}
                    onChange={(e) => setFollow_up5_msg(e.target.value)}
                    placeholder="Message goes here..."
                    autoComplete="true"
                    
                  />
                </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* buttons */}
            <div
              className="d-flex form-buttons border_class2 box_padding buttons_div">
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

              {/* <img src="dist/img/view.png" alt="dropdown" style={{width:"33px", height:"33px",marginLeft:"8PX",marginTop:"5px"}} /> */}
              {/* <a href="/pollsFormStep2" className="d-flex"> */}

              <img className="delete_img"
                src="dist/img/delete.png"
                alt="dropdown"
                
              />
              <p className="faq_bar">
                |
              </p>
              {/* <a href="/pollsFormStep3" className="d-flex"> */}
                <button
                  type="button"
                  className=" form-buttons3"
                  //defaultValue="Next Step"
                  onClick={() => createPollStep4()}
                  value="Next Step"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "500",
                    border: "1px solid #000000",
                    borderRadius: "6px",
                   marginLeft:"15px",
                    backgroundColor: "rgba(0, 0, 0, 0.01)",
                    height: "28px",
                    width: "130px",
                    fontSize: "10px",
                   
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
                    style={{
                      width: "16px",
                      height: "16px",
                      marginLeft: "auto",
                    }}
                  />
                </button>
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
