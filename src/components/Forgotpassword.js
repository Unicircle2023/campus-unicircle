// ===================================================================

import React, { useState } from "react";
import "../Components/AdminLogin.css";
import { AiFillLock } from "react-icons/ai";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
export function Forgotpassword() {
  const token = localStorage.getItem("Token");
  const [email, updateEmail] = useState("");
  const [data, setData] = useState([]);
  const [errorMsg, seterrorMsg] = useState();
  async function forgotPwd() {
    try {
      const formData = new FormData();
      console.log("enter email", email);
      formData.append("email", email);
      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "super_forgot_password",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Response", response);
      console.log("forgot password", response.data.error_code);

      console.log("Message", response.data.message);
      setData(response.data.message);
      updateEmail("");

      $(".forgot_pass_text").show();
      setTimeout(() => {
        $(".forgot_pass_text").hide();
      }, 5000);

      if (response.data.error_code == 200) {
        window.location.href = "/";
      } else {
        //seterrorMsg(response.data.message);
        seterrorMsg("Enter Email Id First");
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function backToLogin() {
    window.location.href = "/";
  }

  return (
    <div className="mt-3 mx-5">
      <div
        style={{
          background: "#293043",
          margin: "30PX auto",
          paddingTop: "40px",
          paddingBottom: "100px",
          textAlign: "center",
          height: "100%",
          width: "35%",
        }}
      >
        {/* <div style={{background:"#293043"}}> */}
        <div style={{ textAlign: "center" }}>
          <AiFillLock
            style={{ color: "white", width: "60px", height: "60px" }}
          />
        </div>

        <h1
          style={{
            fontSize: "bold",
            textAlign: "center",
            color: "white",
            marginTop: "10PX",
            fontSize: "20px",
          }}
        >
          FORGOT PASSWORD
        </h1>
        <p style={{ color: "white", fontSize: "11PX", marginTop: "20PX" }}>
          Please Enter The Email Address you'd like your password reset
          information sent to
        </p>
        <div style={{ margin: "10px 20px" }}>
          <input
            type="text"
            name=""
            placeholder="Enter Your Email Id"
            autoComplete="off"
            id="email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            style={{
              border: "none",
              width: "100%",
              margin: "40PX AUTO 10px",
              borderRadius: "5px",
              paddingLeft: "10px",
              height: "32px",
            }}
          />
          <div className="d-flex">
            <input
              type="button"
              style={{
                border: "none",
                background: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                color: "#293043",
                textAlign: "center",
                padding: "10px 15px",
                marginLeft: "auto",
                width: "100%",
              }}
              id="go"
              defaultValue="Sign In"
              onClick={() => forgotPwd()}
              value="Submit"
            />
          </div>
          <div
            className="forgot_pass_text"
            style={{
              display: "none",
              color: "white",
              fontSize: "12PX",
              marginTop: "50PX",
              fontSize: "10PX",
            }}
          >
            {" "}
            {errorMsg}
          </div>
          {/* <Link to ="/">
                <p style={{color:"white",marginTop:"50px",fontSize:"10PX"}}>Back to login</p>

                </Link> */}

          <div
            style={{
              color: "white",
              fontSize: "12PX",
              marginTop: "50PX",
              fontSize: "10PX",
            }}
          >
            <button
              onClick={backToLogin}
              style={{ width: "30%", borderRadius: "5px" }}
            >
              <p
                style={{
                  color: "#293043",
                  fontSize: "12PX",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Back to login
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




// New Updated Code...
// _____________________________________________________________
// import React, { useState } from "react";
// import "../App.css";
// import $ from "jquery";
// import axios from "axios";
// import "../components/AdminLogin.css";
// import { useHistory } from "react-router-dom";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Typography, Button } from '@mui/material';

// export function Forgotpassword(props) {

//   const [emailId, updateemailId] = useState("");
//   const [errorCode, updateErrorCode] = useState("");
//   const [errorMessage, updateErrorMessage] = useState("");

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
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <ArrowBackIcon style={{ marginRight: '6px' }} />
//                       <Typography style={{ fontSize: "16px", fontWeight: "400"}}>
//                         Back
//                       </Typography>
//                     </div>
//                     <div>
//                       <Typography style={{ fontSize: "16px", fontWeight: "600" ,marginTop:"20px" }}>
//                         Forgot Password
//                       </Typography>
//                     </div>

//                   </div>

//                   <div style={{ marginTop: "20px" }}>
//                     <div
//                       className="d-flex all_inputs"
//                       style={{
//                         alignItems: "center",
//                         border: "1px solid #4779F0",
//                       }}
//                     >
//                       <input
//                         type="email"
//                         className=""
//                         id="emailId"
//                         value={emailId}
//                         onChange={(e) => updateemailId(e.target.value)}
//                         placeholder="Super Admin email"
//                         autoComplete="off"
//                         style={{
//                           border: "none",
//                           width: "100%",
//                           marginLeft: "5px",
//                         }}
//                       />
//                     </div>

//                     <div style={{ marginTop: "20px" }}>
//                       <Typography style={{ fontSize: "12px", fontWeight: "500" }}>
//                         We'll send a verification code to this email or phone number if it matches an existing Unicircle account.
//                       </Typography>
//                     </div>

//                     <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: "40px" }}>
//                       <Button
//                         variant="contained"
//                         style={{
//                           background: "#1F3977",
//                           fontWeight: "500",
//                           color: "white",
//                           width: "110px",
//                           height: "30px",
//                           fontSize: "12px",
//                           boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
//                           marginRight:'20px',

//                         }}
//                         id="loginButton"
//                       >
//                         Send
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         style={{
//                           color: "#1F3977",
//                           borderColor: "#1F3977",
//                           width: "110px",
//                           height: "30px",
//                           fontSize: "12px",
//                           fontWeight: "500",
//                         }}
//                         onClick={() => history.push("/")}
//                       >
//                         Cancel
//                       </Button>
//                     </div>

//                     <div
//                       style={{
//                         fontWeight: "500",
//                         fontFamily: "Poppins",
//                         fontSize: "11px",
//                         marginTop: "10px",
//                       }}
//                     >
//                       {errorCode === 200 ? (
//                         <div className="d-flex">
//                           <img
//                             src={require("../Images/correct.png")}
//                             style={{ width: "18px" }}
//                           />
//                           <span style={{ color: "green" }}>{errorMessage}</span>
//                         </div>
//                       ) : errorCode === 404 ? (
//                         <div className="d-flex">
//                           <img
//                             src={require("../Images/wrong.jpg")}
//                             style={{ width: "18px" }}
//                           />
//                           <span style={{ color: "red" }}>{errorMessage}</span>
//                         </div>
//                       ) : errorCode === 406 ? (
//                         <div className="d-flex">
//                           <img
//                             src={require("../Images/missing.png")}
//                             style={{ width: "15px" }}
//                           />
//                           <span style={{ color: "red", marginLeft: "5px" }}>
//                             Please! Enter Email address and password
//                           </span>
//                         </div>
//                       ) : (
//                         ""
//                       )}
//                     </div>
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
