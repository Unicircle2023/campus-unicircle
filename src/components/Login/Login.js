import React, { useState, useEffect } from "react";
import $, { error } from "jquery";
import axios from "axios";
import ".././AdminLogin.css";
// import { ContactPhoneOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

import TextField from "@mui/material/TextField"
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';



export function Login() {
  const history = useHistory();
  // const location = useLocation();

  //    const userEmail= location.state || { id: "none" };
  //    const user_email = userEmail.userEmail


  const [email, updateEmail] = useState("");
  const [loginPassword, updatePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function setCokiee() {
    const u = document.getElementById("campus_email").value;

    const p = document.getElementById("campus_password").value;
    document.cookie = "myusername=" + u + ";path=http://localhost:3000/";
    document.cookie = "mypassword=" + p + ";path=http://localhost:3000/";
  }

  function getcokieedata() {
    var campus_id = getCookie("myusername");
    var campus_pswd = getCookiePassword("mypassword");
    document.getElementById("campus_email").value = campus_id;
    document.getElementById("campus_password").value = campus_pswd;
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCokiee = decodeURIComponent(document.cookie);
    var ca = decodedCokiee.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  function getCookiePassword(cname) {
    var name = cname + "=";
    var decodedCokiee = decodeURIComponent(document.cookie);
    var ca = decodedCokiee.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      if (c.indexOf(name) == 1) {
        return c.substring(12, 15);
      }
    }

    return "";
  }

  const [message, setmessage] = useState(false);
  const [errorCode, updateErrorCode] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");

  async function LoginPopUp() {
    try {
      document.getElementById('loader_block').classList.remove("loader--paused");
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", loginPassword);

      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Login response--------------",response);

      updateErrorCode(response.data.error_code);
      updateErrorMessage(response.data.message);

      if (response.data.error_code == 200) {
        localStorage.setItem("Token", response.data.data[0].jwt_token);
        localStorage.setItem("Uni_name", response.data.data[0].university_name);
        localStorage.setItem("Camp_name", response.data.data[0].campus_name);

        setmessage(true);
        setTimeout(function(){
          history.push("/homepage");
        },3000)

      } else if(response.data.error_code == 404 || response.data.error_code == 406){
        toast.error("Enter correct email and password");
      }else{
        document.getElementById('loader_block').classList.add("loader--paused");
         console.log("login error----",errorMessage);
        $(".failed-bottom").show();
        setTimeout(function() {
          $(".failed-bottom").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function togglePassword() {
    var x = document.getElementById("filled-basic");
    if (x.type == "password") {
      x.type = "text";
      setShowPassword(!showPassword);
      // $(".pass_hide_img").show();
      // $(".pass_show_img").hide();
      // document.getElementById("passwordShowHide").innerHTML = "Hide";
    } else {
      x.type = "password";
      // $(".pass_hide_img").hide();
      // $(".pass_show_img").show();
      setShowPassword(showPassword);
      // document.getElementById("passwordShowHide").innerHTML = "Show";
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div onLoad={() =>getcokieedata()}>
    <div>
      <Toaster
          position="top-right"
          reverseOrder={false}
       />
      <section className="unicircle_login">
        <div className="">
          <div
            className="user signinBx"
            style={{ padding: "0" }}
            id="accountLogin"
          >
            <div className="d-flex" style={{ width: "100%" }}>
              <div className="login_empty_div">
              <div class="vertical-line"
                //  style={{boxShadow:"rgba(0, 0, 0, 0.125) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 1px 0px 0px 0px"}}
                 ></div>

              </div>
              <div className="login_img_div">
                <img
                  src="dist/img/admin_login_img.png"
                  alt="logo"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <div className="border_class2 login_main_div"
              //  style={{boxShadow:"0 0 0 1px #4779F0"}}
            >
              <div style={{ padding: "20px" }}>
                <div>
                  <img
                    src="dist/img/uniLogo.png"
                    alt="logo"
                    style={{ width: "100px", height: "22px" }}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>
                      Sign in
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: "400" }}>
                      We make it easy for you to stay connected with students
                      anytime & anywhere.
                    </p>
                  </div>
                </div>

                <div id="loader_block" class="loader loader--solid loader--paused mt-4"></div>

                <div style={{ marginTop: "22px" }}>

               <TextField id="outlined-basic" label="Admin email" variant="outlined"
                      value={email}
                      onChange={(e) => updateEmail(e.target.value)}
                      style={{width:"100%"}}
                      autoComplete="off"
                   />
                <div className="d-flex mt-3">
                <TextField id="filled-basic" label="Password" variant="filled"
                type="password"
                  value={loginPassword}
                  onChange={(e) => updatePassword(e.target.value)}
                  style={{width:"100%",height:"24px"}}
                  autoComplete="off"
                />

                <IconButton onClick={togglePassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                </div>

                  {/* <div
                    className="d-flex all_inputs"
                    style={{
                      alignItems: "center",
                      border: "1px solid #4779F0",
                    }}
                  >
                    <img
                      src="dist/img/LoginAccount.png"
                      style={{
                        width: "14px",
                        height: "14px",
                        marginLeft: "5px",
                      }}
                    />



                    <input
                      type="email"
                      className=""
                      value={email}
                      onChange={(e) => updateEmail(e.target.value)}
                      placeholder="Admin email"
                      autoComplete="off"
                      id="campus_email"
                      style={{
                        border: "none",
                        width: "100%",
                        marginLeft: "5px",
                      }}
                    />
                  </div>

                  <div
                    className="d-flex all_inputs mt-2"
                    style={{
                      alignItems: "center",
                      border: "1px solid #4779F0",
                    }}
                  >
                    <img
                      src="dist/img/LoginPassword.png"
                      style={{
                        width: "14px",
                        height: "14px",
                        marginLeft: "5px",
                      }}
                    />
                    <input
                      type="password"
                      className=""
                      placeholder="Password"
                      id="campus_password"
                      value={loginPassword}
                      onChange={(e) => updatePassword(e.target.value)}
                      style={{
                        border: "none",
                        width: "100%",
                        marginLeft: "5px",
                      }}
                    />

                    <p
                      className="ml-auto"
                      id="passwordShowHide"
                      onClick={() => togglePassword()}
                      style={{

                        fontSize: "10PX",
                        fontWeight: "500",
                        cursor: "pointer",
                        marginRight: "5px",
                        fontFamily: "Poppins",
                      }}
                    >
                      <img className="pass_show_img" src="dist/img/Eye.png"
                       style={{height:"14px",width:"17px"}}/>

                      <img className="pass_hide_img" src="dist/img/PostHide.png"
                       style={{height:"14px",width:"17px",display:"none"}}/>
                    </p>
                  </div> */}

                  <div
                    className="d-flex mt-2 "
                    style={{
                      color: "rgba(0, 0, 0, 0.9)",
                      fontSize: "12PX",
                      fontWeight: "600",
                    }}
                  >
                    <p>
                      <input
                        type="checkbox"
                        id="rememberme"
                        name="rememberme"
                        onClick={() => setCokiee()}
                        style={{height:"16px",width:"16px"}}
                      />
                    </p>
                    <label
                      htmlFor="remember"
                      style={{
                        margin:"0px",
                        display:"flex",
                        alignItems:"center",
                        marginLeft: "6px",
                        fontSize: "9px",
                        color: "rgba(0, 0, 0, 0.9)",
                        fontWeight: "600",
                      }}
                    >
                      Remember me
                    </label>
                    <p className="ml-auto">
                      <a
                        href="/forgotpassword"
                        style={{
                          color: "rgba(0, 0, 0, 0.9)",
                          fontSize: "9PX",
                        }}
                      >
                        Forgot Password?
                      </a>
                    </p>
                  </div>

                  <div style={{ marginTop: "80PX" }}>
                    <input
                      type="button"
                      style={{
                        border: "none",
                        background: "#1F3977",
                        fontWeight: "600",
                        color: "white",
                        height: "37px",
                        width: "100%",
                        fontSize: "11px",
                        textAlign: "center",
                        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
                      }}
                      id="loginButton"
                      value="Log in"
                      onClick={() => LoginPopUp()}
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
                    {errorCode == 200 ? (
                      <div className="d-flex">
                        <img
                          src={require("../images/correct.png")}
                          style={{ width: "18px" }}
                        />
                        <p style={{ color: "green" }}>{errorMessage}</p>
                      </div>
                    ) : errorCode == 404 ? (<></>

                      // <div className="d-flex">
                      //   <img
                      //     src={require("../images/wrong.jpg")}
                      //     style={{ width: "18px" }}
                      //   />
                      //   <p style={{ color: "red" }}>{errorMessage}</p>
                      // </div>
                    ) : errorCode == 406 ? (<></>

                      // <div className="d-flex">
                      //   <img
                      //     src={require("../images/missing.png")}
                      //     style={{ width: "15px" }}
                      //   />
                      //   <p style={{ color: "red", marginLeft: "5PX" }}>
                      //     Please! Enter Email address and password
                      //   </p>
                      // </div>
                    ) : (
                      ""
                    )}
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
