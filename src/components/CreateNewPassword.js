import React, { useState } from "react";
import "../App.css";
import $ from "jquery";
import axios from "axios";
import "../components/AdminLogin.css";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Button } from "@mui/material";

export function CreateNewPassword(props) {
  const [newPassword, updateNewPassword] = useState("");
  const [retypePassword, updateRetypePassword] = useState("");
  const history = useHistory();
  const [errorCode, updateErrorCode] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");

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
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ArrowBackIcon style={{ marginRight: "6px" }} />
                      <Typography
                        style={{ fontSize: "16px", fontWeight: "400" }}
                      >
                        Back
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          marginTop: "20px",
                        }}
                      >
                        Change Password
                      </Typography>
                    </div>
                  </div>

                  <div style={{ marginTop: "5px" }}>
                    <Typography style={{ fontSize: "12px", fontWeight: "500" }}>
                      our password must be at least 6 characters and should
                      include a combination of numbers, letters and special
                      characters (!$@%)..
                    </Typography>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    {/*----------------------  */}
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        marginBottom: "5px",
                      }}
                    >
                      Type your new password
                    </Typography>
                    {/*----------------------  */}
                    <div
                      className="d-flex all_inputs"
                      style={{
                        alignItems: "center",
                        border: "1px solid #4779F0",
                      }}
                    >
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => updateNewPassword(e.target.value)}
                        style={{
                          border: "none",
                          width: "100%",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                    {/*----------------------  */}
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        marginBottom: "5px ",
                        marginTop: "5px",
                      }}
                    >
                      Type your new password
                    </Typography>
                    {/*----------------------  */}

                    <div
                      className="d-flex all_inputs"
                      style={{
                        alignItems: "center",
                        border: "1px solid #4779F0",
                      }}
                    >
                      <input
                        type="password"
                        placeholder="Retype Password"
                        value={retypePassword}
                        onChange={(e) => updateRetypePassword(e.target.value)}
                        style={{
                          border: "none",
                          width: "100%",
                          marginLeft: "5px",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: "40px",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          background: "#D9D9D9",
                          fontWeight: "500",
                          color: "#283035",
                          width: "130px",
                          height: "35px",
                          fontSize: "10px",
                          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
                          marginRight: "20px",
                        }}
                        id="loginButton"
                      >
                        Saved Password
                      </Button>
                    </div>
                    {/* ------------------------------------ */}
                    <p className="ml-auto" style={{marginTop:"20px"}}>
                      <a
                        href="/forgotpassword"
                        style={{
                          color: "rgba(0, 0, 0, 0.9)",
                          fontSize: "11px",
                        }}
                      >
                        Forgot Password?
                      </a>
                    </p>
                    {/* ------------------------------------ */}
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







// ===============================================================

// import React, { useState } from "react";
// import "../App.css";
// import $ from "jquery";
// import axios from "axios";
// import "../components/AdminLogin.css";
// import { useHistory } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Typography, Button } from "@mui/material";

// export function CreateNewPassword(props) {
//   const [newPassword, updateNewPassword] = useState("");
//   const [retypePassword, updateRetypePassword] = useState("");

//   const history = useHistory();

//   return (
//     <div>
//       <section className="unicircle_login">
//         <div className="">
//           <div
//             className="user signinBx"
//             style={{ padding: "0" }}
//             id="accountLogin"
//           >
//             <div className="d-flex" style={{ width: "100%" }}>
//               <div className="login_empty_div">
//                 <div
//                   className="vertical-line"
//                   style={{
//                     boxShadow:
//                       "rgba(0, 0, 0, 0.125) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 1px 0px 0px 0px",
//                   }}
//                 ></div>
//               </div>
//               <div className="login_img_div">
//                 <img
//                   src="dist/img/Group_login_img.png"
//                   style={{ width: "100%", height: "100%" }}
//                 />
//               </div>

//               <div
//                 className="border_class2 login_main_div"
//                 style={{
//                   boxShadow:
//                     "0px 0px 0px 0px rgba(0, 0, 0, .125), 2px 3px 1px 1px rgba(0, 0, 0, .2)",
//                 }}
//               >
//                 <div style={{ padding: "20px" }}>
//                   <div>
//                     <img
//                       src="dist/img/uniLogo.png"
//                       style={{ width: "130px", height: "25px" }}
//                     />
//                   </div>

//                   <div style={{ marginTop: "30px" }}>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <ArrowBackIcon
//                         style={{ marginRight: "6px" }}
//                         onClick={() => history.goBack()}
//                       />
//                       <Typography
//                         style={{ fontSize: "16px", fontWeight: "400" }}
//                       >
//                         Back
//                       </Typography>
//                     </div>
//                     <div>
//                       <Typography
//                         style={{
//                           fontSize: "16px",
//                           fontWeight: "600",
//                           marginTop: "20px",
//                         }}
//                       >
//                         Changed Password
//                       </Typography>
//                     </div>
//                   </div>

//                   <div style={{ marginTop: "20px" }}>
//                     <input
//                       type="password"
//                       placeholder="New Password"
//                       value={newPassword}
//                       onChange={(e) => updateNewPassword(e.target.value)}
//                       style={{
//                         width: "100%",
//                         padding: "10px",
//                         marginBottom: "20px",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                     <input
//                       type="password"
//                       placeholder="Retype Password"
//                       value={retypePassword}
//                       onChange={(e) => updateRetypePassword(e.target.value)}
//                       style={{
//                         width: "100%",
//                         padding: "10px",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "flex-start",
//                       marginTop: "40px",
//                     }}
//                   >
//                     <Button
//                       variant="contained"
//                       style={{
//                         background: "#1F3977",
//                         fontWeight: "500",
//                         color: "white",
//                         width: "140px",
//                         height: "30px",
//                         fontSize: "12px",
//                         boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
//                       }}
//                       onClick={() => {
//                         /* Handle Save Password */
//                       }}
//                     >
//                       Save Password
//                     </Button>
//                   </div>

//                   <div style={{ marginTop: "20px" }}>
//                     <Typography
//                       style={{
//                         fontSize: "12px",
//                         fontWeight: "500",
//                         color: "#4779F0",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => history.push("/forgot-password")}
//                     >
//                       Forgot password?
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
