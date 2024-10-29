import React, { useState } from "react";
import "../components/AdminLogin.css";
import "../App.css";
import $ from "jquery";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Button } from '@mui/material';

export function NewForgotPassword(props) {

  const [emailId, updateemailId] = useState("");
  const [errorCode, updateErrorCode] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");

  const history = useHistory();

  return (
    <div>
      <section className="unicircle_login">
        <div className="">
          <div
            className="user signinBx"
            style={{ padding: "0" }}
            id="accountLogin"
          >
            <div className="d-flex" style={{ width: "100%" }}>
              <div className="login_empty_div">
                <div
                  className="vertical-line"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.125) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 1px 0px 0px 0px",
                  }}

                ></div>
              </div>
              <div className="login_img_div">
                <img
                  src="dist/img/Group_login_img.png"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              <div
                className="border_class2 login_main_div"
                style={{
                  boxShadow:
                    "0px 0px 0px 0px rgba(0, 0, 0, .125), 2px 3px 1px 1px rgba(0, 0, 0, .2)",
                }}
              >
                <div style={{ padding: "20px" }}>
                  <div>
                    <img
                      src="dist/img/uniLogo.png"
                      style={{ width: "130px", height: "25px" }}
                    />
                  </div>

                  <div style={{ marginTop: "30px" }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ArrowBackIcon style={{ marginRight: '6px' }} />
                      <Typography style={{ fontSize: "16px", fontWeight: "400"}}>
                        Back
                      </Typography>
                    </div>
                    <div>
                      <Typography style={{ fontSize: "16px", fontWeight: "600" ,marginTop:"20px" }}>
                        Forgot Password
                      </Typography>
                    </div>

                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <div
                      className="d-flex all_inputs"
                      style={{
                        alignItems: "center",
                        border: "1px solid #4779F0",
                      }}
                    >
                      <input
                        type="email"
                        className=""
                        id="emailId"
                        value={emailId}
                        onChange={(e) => updateemailId(e.target.value)}
                        placeholder="Super Admin email"
                        autoComplete="off"
                        style={{
                          border: "none",
                          width: "100%",
                          marginLeft: "5px",
                        }}
                      />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <Typography style={{ fontSize: "12px", fontWeight: "500" }}>
                        We'll send a verification code to this email or phone number if it matches an existing Unicircle account.
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: "40px" }}>
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F3977",
                          fontWeight: "500",
                          color: "white",
                          width: "110px",
                          height: "30px",
                          fontSize: "12px",
                          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
                          marginRight:'20px',

                        }}
                        id="loginButton"
                      >
                        Send
                      </Button>
                      <Button
                        variant="outlined"
                        style={{
                          color: "#1F3977",
                          borderColor: "#1F3977",
                          width: "110px",
                          height: "30px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                        onClick={() => history.push("/")}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div
                      style={{
                        fontWeight: "500",
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        marginTop: "10px",
                      }}
                    >
                      {errorCode === 200 ? (
                        <div className="d-flex">
                          <img
                            src={require("../Images/correct.png")}
                            style={{ width: "18px" }}
                          />
                          <span style={{ color: "green" }}>{errorMessage}</span>
                        </div>
                      ) : errorCode === 404 ? (
                        <div className="d-flex">
                          <img
                            src={require("../Images/wrong.jpg")}
                            style={{ width: "18px" }}
                          />
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </div>
                      ) : errorCode === 406 ? (
                        <div className="d-flex">
                          <img
                            src={require("../Images/missing.png")}
                            style={{ width: "15px" }}
                          />
                          <span style={{ color: "red", marginLeft: "5px" }}>
                            Please! Enter Email address and password
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
