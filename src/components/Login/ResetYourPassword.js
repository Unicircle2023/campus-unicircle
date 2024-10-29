import React, { useState, useEffect } from "react";
// import "../App.css";
import $ from "jquery";
import axios from "axios";
import ".././AdminLogin.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";


export function ResetYourPassword() {
  const location = useLocation();
  const [errorCode, updateErrorCode] = useState("")
  const [errorMessage, updateErrorMessage] = useState("");

  const [errorCode2, updateErrorCode2] = useState("")
  const [emailId, updateEmailId] = useState("")
  const [errorMessage2, updateErrorMessage2] = useState("");
  const history = useHistory();
  const userEmail = location.state || { id: "none" };
  console.log("userEmail", userEmail)
  const username = userEmail.userEmail
  console.log("emailllllllllllllllll", username)
  // history.push("/securityCode",{userEmail})
  const [data, setData] = useState([]);
  const [otp, setOtp] = useState([]);

  async function VerifyUser() {

    try {

      const formData = new FormData();
      formData.append("username", username);
      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_verify_username",
        formData,
        {
          headers: {
            "Content-Type": "application/json",

          },
        }
      );

      console.log("login", response.data.data);

      setData(response.data.data)
      if (response.data.error_code == 200) {


      }
      else {
        {
          console.log("error")
        }
      }



    }
    catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {

    VerifyUser();
  }, []);

  var u_id = ""
  var emailAddress = ""
  data.map((item) => {

    emailAddress = item.email;
    // updateEmailId(emailAddress)

    u_id = item.user_id
    console.log("useridddddddd", u_id);
  })
  console.log("userid", u_id);
  console.log("useremail", username);

  async function SendOTP() {

    try {

      const formData = new FormData();
      formData.append("id", u_id);
      formData.append("username", username);
      const OtpResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_sent_otp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",

          },
        }
      );

      console.log("OTP RESPONSE", OtpResponse);
      updateErrorCode2(OtpResponse.data.error_code);
      updateErrorMessage2(OtpResponse.data.message);
      const array = OtpResponse.data.data.id
      const otpCode = OtpResponse.data.data.otp
      
      setOtp(OtpResponse.data.data)

      console.log("otppppppppp", array)
      console.log("code", otpCode)

      if (OtpResponse.data.error_code == 200) {
        setTimeout(() => {


          history.push("/securityCode", { array, otpCode, username, u_id });


        }, 3000);

      }
      else {
        {
          console.log("error")
        }
      }



    }
    catch (err) {
      console.log("Log in Fail", err);
    }
  }

  // {
  //   data.map((item) => {
  //    var emailAddress =item.email;
  //    updateEmailId(emailAddress)
  //   })
  // }
  return (
    <div>
      <section className="unicircle_login">
        <div class="container">
          <div class="user signinBx">

            {/* left box */}
            <div class="imgBx">

              <img src="dist/img/forgotpassword_img.png" className="img elevation right_side_img" alt="User Image" style={{ position: "absolute", top: "0", left: "0", height: "100%" }} />
              <img src={require('../images/logo.png')} alt="logo" style={{ width: "148px", height: "55px", zIndex: "10", position: "absolute", top: "30px", left: "30px" }} />

            </div>

            {/* right box */}
            <div class="formBx" style={{ padding: "70px" }}>
              <form
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  height: "100%",
                  width: "100%",

                }}
              >

                <h4 style={{ fontSize: "18px" }} class="d-flex mt-5">
                  <p style={{ color: "rgba(0, 0, 0, 0.6)", fontWeight: "600" }}>Reset your</p>
                  <p style={{ color: "#1F3977", marginLeft: "3PX", fontWeight: "bold" }}>Password</p>
                </h4>
                <p style={{ fontSize: "12PX", marginTop: "20px", fontWeight: "600", color: "rgba(0, 0, 0, 0.6)" }}>How do you want to receive the code to reset your password?</p>

                <div className="d-flex" style={{ marginTop: "60px" }}>
                  <img src="dist/img/Line 7.png" style={{ width: "72px" }} />
                  <img src="dist/img/Line 8.png" style={{ width: "72px", marginLeft: "10PX" }} />
                </div>

                <div className="mt-4" value={username}>

                  {
                    username == emailAddress ?
                      (
                        <div>
                          <div class="text-group-field pickup-day choose-time">
                            <div class="inner-block">
                              <input id="pickup-3" class="radio-custom input-group-field" name="radio-group" type="radio" checked="checked" />
                              <label for="pickup-3" class="radio-custom-label d-flex" style={{ marginLeft: "5px", fontSize: "12PX", fontWeight: "600", lineHeight: "12PX", color: "rgba(0, 0, 0, 0.6)" }}>
                                <div>


                                  <p>Send code via email</p>
                                  {
                                    data.map((item) => {
                                      return (
                                        <p>{item.email}</p>
                                      )
                                    })
                                  }

                                </div>

                              </label>
                            </div>
                          </div>
                          <div class="text-group-field pickup-day choose-time">
                            <div class="inner-block">
                              <input id="pickup-4" class="radio-custom input-group-field" name="radio-group" type="radio" disabled="disabled"/>
                              <label for="pickup-4" class="radio-custom-label d-flex" style={{ marginLeft: "5px", fontSize: "12PX", fontWeight: "600", lineHeight: "12PX", color: "rgba(0, 0, 0, 0.6)" }}>
                                <div>
                                  <p>Send code via SMS</p>
                                  {
                                    data.map((item) => {
                                      return (
                                        <p>{item.mobile}</p>
                                      )
                                    })
                                  }
                                </div>

                              </label>
                            </div>
                          </div>

                        </div>

                      ) :
                      <div>
                        <div class="text-group-field pickup-day choose-time">
                          <div class="inner-block">
                            <input id="pickup-3" class="radio-custom input-group-field" name="radio-group" type="radio" disabled="disabled"/>
                            <label for="pickup-3" class="radio-custom-label d-flex" style={{ marginLeft: "5px", fontSize: "12PX", fontWeight: "600", lineHeight: "12PX", color: "rgba(0, 0, 0, 0.6)" }}>
                              <div>


                                <p>Send code via email</p>
                                {
                                  data.map((item) => {
                                    return (
                                      <p>{item.email}</p>
                                    )
                                  })
                                }

                              </div>

                            </label>
                          </div>
                        </div>
                        <div class="text-group-field pickup-day choose-time">
                          <div class="inner-block">
                            <input id="pickup-4" class="radio-custom input-group-field" name="radio-group" type="radio" checked="checked" />
                            <label for="pickup-4" class="radio-custom-label d-flex" style={{ marginLeft: "5px", fontSize: "12PX", fontWeight: "600", lineHeight: "12PX", color: "rgba(0, 0, 0, 0.6)" }}>
                              <div>
                                <p>Send code via SMS</p>
                                {
                                  data.map((item) => {
                                    return (
                                      <p>{item.mobile}</p>
                                    )
                                  })
                                }
                              </div>

                            </label>
                          </div>
                        </div>
                      </div>



                  }


                </div>

                <div style={{ marginTop: "40PX" }} className="row">
                  <div className="col-md-6">
                    <a href="/forgotpassword">
                      <input
                        type="button"

                        style={{
                          border: "none",
                          background: "#6e7781",
                          fontWeight: "500",
                          color: "white",
                          fontSize: "13PX",
                          height: "35px",
                          width: "100%",
                          textAlign: "center",

                          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)"
                        }}
                        id="go"
                        defaultValue="Sign In"
                        value="Not you?"
                      // onClick={() => LoginPopUp()}
                      />
                    </a>
                  </div>

                  <div className="col-md-6">
                    {/* <a href="/securityCode"> */}
                    <input
                      type="button"

                      style={{
                        border: "none",
                        background: "#2d5dd0",
                        fontWeight: "500",
                        color: "white",
                        fontSize: "13PX",
                        height: "35px",
                        width: "100%",

                        textAlign: "center",

                        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)"
                      }}
                      id="go"
                      defaultValue="Sign In"
                      value="Continue"
                      onClick={() => SendOTP()}
                    />
                    {/* </a> */}
                  </div >
                  <a href="/forgotpassword">
                    <p style={{ color: "#2d5dd0", fontWeight: "600", fontSize: "12px", marginTop: "10PX" }}>No longer have access to these?</p>
                  </a>

                  <div style={{ fontWeight: "500", fontFamily: "Poppins", fontSize: "11px", marginTop: "10px" }} >
                    {/* Password has been sent to your email id. Please check your email */}
                    {
                      errorCode2 == 200 ?
                        (
                          <div className="d-flex">
                            <img src={require('../images/correct.png')} style={{ width: "26px", height: "23px" }} />
                            <p style={{ color: "green", marginLeft: "5PX" }}>{errorMessage2}</p>
                          </div>
                        ) : errorCode2 == 404 ?
                          (
                            <div className="d-flex">
                              <img src={require('../images/wrong.jpg')} style={{ width: "18px" }} />
                              <p style={{ color: "blue" }}>{errorMessage2}</p>
                            </div>
                          ) :

                          ""




                    }
                  </div>
                </div>







              </form>
            </div>


          </div>


        </div>
      </section>

    </div>
  );
}
