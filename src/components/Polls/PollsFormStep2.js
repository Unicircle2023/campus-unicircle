import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import { Header } from "../Header";
import { Menu } from "../Menu";
import Stack from "@mui/material/Stack";
import { useHistory,useLocation } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

export function PollsFormStep2(props) {
  const [childData, setChildData] = useState({});
  const passStep1Data = (data) => {
    setChildData(data);
  };

  const location = useLocation();
  const { category } = location.state || { id: "none" };
  const { que } = location.state || { id: "none" };

  const token = localStorage.getItem("Token");
  const [result, updateResult] = useState([]);
  const [answer1, updateAnswer1] = useState("");
  const [answer2, updateAnswer2] = useState("");
  const [answer3, updateAnswer3] = useState("");
  const [answer4, updateAnswer4] = useState("");
  const [answer5, updateAnswer5] = useState("");

  const [error_message, updateError_message] = useState("");
  const history = useHistory();

  async function createPollStep2() {
    if (result == "2") {
      if (answer1 == "") {
        toast.error( "Please enter minimum 2 answers");
        return;
      } else if (answer2 == "") {
        toast.error( "Please enter answer 2");
        return;
      }
    }

    try {
      var getSelectedValue = document.querySelector(
        'input[name="check"]:checked'
      );

      if (getSelectedValue == null) {
        toast.error( "Please select checkbox");
        return;
      } else {
        toast.success( "Data saved", {
          duration: 2000,
        });
        setTimeout(function() {
          history.push("/pollsFormStep4", {
            que,
            category,
            result,
            answer1,
            answer2,
            answer3,
            answer4,
            answer5,
          });
        }, 2000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

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

  return (
    <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
       />
      <Header />
      <div className="d-flex">
        <Menu />

        <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
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
              <div style={{ fontSize: "12px" }} class="d-flex">
                <p
                  style={{
                    color: "#1F3977",
                    fontWeight: "600",
                    paddingLeft: "42px",
                  }}
                >
                  Step 2 :
                </p>
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    marginLeft: "20px",
                    fontWeight: "700",
                    fontSize: "12px",
                  }}
                >
                  Responses
                </p>
              </div>
            </div>
          </div>

          <div id="tblFruits" className=" p-0 border_class2 box_padding">
            <div
              style={{
                borderBottom: "1px solid #1F3977",
                padding: "10px",
                fontWeight: "500",
              }}
            >
              <div style={{ fontSize: "12px" }} class="d-flex">
                <p style={{ color: "#15a312" }}>Poll Question:</p>
                <p
                  style={{
                    color: "#15a312",
                    marginLeft: "5px",
                    overflow: "auto",
                  }}
                >
                  {que}
                </p>
              </div>
            </div>

            <div style={{ height: "380px", overflowY: "auto" }}>
              <div className="row mt-2">
                <div className="col-md-4 ">
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
                <div className="col-md-4">
                  <div style={{ padding: "10px" }}>
                    <div className="d-flex">
                      <p>
                        <input
                          type="checkbox"
                          name="check"
                          onClick={checkSingle}
                          class="myCheckBox"
                          value="4"
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
                        height: "145px",
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
                        Highly Disatisfied
                      </div>
                    </div>
                    {/* end */}
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{ padding: "10px" }}>
                    <div className="d-flex">
                      <p>
                        <input
                          type="checkbox"
                          name="check"
                          onClick={checkSingle}
                          class="myCheckBox"
                          value="1"
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
              </div>

              <div className="row mt-2">
                <div className="col-md-4">
                  <div style={{ padding: "10px" }}>
                    <div className="d-flex">
                      <p>
                        <input
                          type="checkbox"
                          name="check"
                          onClick={checkSingle}
                          class="myCheckBox"
                          value="5"
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
                        height: "145px",
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
                <div className="col-md-4">
                  <div style={{ padding: "10px" }}>
                    <div className="d-flex">
                      <p>
                        <input
                          type="checkbox"
                          name="check"
                          onClick={checkSingle}
                          class="myCheckBox"
                          value="6"
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
                        height: "145px",
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
                <div className="col-md-4">
                  <div style={{ padding: "10px" }}>
                    <div className="d-flex">
                      <p>
                        <input
                          type="checkbox"
                          name="check"
                          onClick={checkSingle}
                          class="myCheckBox"
                          value="7"
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
                        height: "145px",
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

              <div className="row mt-2">
                <div className="col-md-4">
                  <div style={{ padding: "10px" }}>
                    <div className="d-flex">
                      <p>
                        <input
                          type="checkbox"
                          name="check"
                          onClick={checkSingle}
                          class="myCheckBox"
                          value="2"
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
                        height: "145px",
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
            </div>
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
            {/* buttons */}
            {/* <a href="/pollsFormStep4"> */}
            <div
              className="d-flex form-buttons buttons_div">
              <img className="delete_img"
                src="dist/img/delete.png"
                alt="dropdown"
                
              />
              <p className="faq_bar">
                |
              </p>
             

              <button
                type="button"
                className=" form-buttons3"
                //defaultValue="Next Step"
                onClick={() => createPollStep2()}
                value="Next Step"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  border: "1px solid #000000",
                  borderRadius: "6px",
                  marginLeft: "auto",
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                  height: "30px",
                  width: "130px",
                  fontSize: "10PX",
                 marginLeft:"15px"
                }}
              >
                <div
                  style={{
                    marginLeft: "5px",
                    fontSize: "12PX",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Next Step
                </div>
                <img
                  src="dist/img/next.png"
                  style={{ width: "20px", height: "20px", marginLeft: "auto" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
