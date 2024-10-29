import React, { useState,useEffect } from "react";
// import "../App.css";
import $ from "jquery";
import axios from "axios";
import ".././AdminLogin.css";
import { red } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
export function SecurityCode() 
{
  const location = useLocation();
  const history = useHistory();
  const array= location.state || { id: "none" };
  const otpCode= location.state || { id: "none" };
  const username= location.state || { id: "none" };
  const u_id= location.state || { id: "none" };
 const admin_id = u_id.u_id;
 const admin_email = u_id.username

  console.log("userrrrrrrrrrrrrrr",u_id)
const user_id = array.array
const user_otp =otpCode.otpCode
const[code, updateCode] =useState([])
const [errorCode,updateErrorCode] = useState([]);
const [errorMessage,updateErrorMessage] = useState([]);
const [data,setData]= useState([])



function togglePassword() {
  var x = document.getElementById("password");
  if (x.type == "password") {
    x.type = "text";
    
    document.getElementById("passwordShowHide").innerHTML="Hide";
  } else {
    x.type = "password";
   
    document.getElementById("passwordShowHide").innerHTML="Show";
  }
} 
// document.getElementById("didntGetCode").addEventListener("click", resentCode);
const [otpErrorMessage,updateOtpErrorMessage] = useState("")
async function resentCode()
{
  
  const btn = document.getElementById("didntGetCode")
  document.getElementById("didntGetCode").disabled = true;
 
    // $(".resendmessage").show();
    // setTimeout(function(){
    //   $(".resendmessage").hide();
    // }, 3000);
 
  setTimeout(function(){
    document.getElementById("didntGetCode").disabled = false;
  }, 5000);
 
  const formData = new FormData();
  formData.append("id", admin_id);
  formData.append("username", admin_email);
  const OtpResponse = await axios.post(
    process.env.REACT_APP_API_KEY + "admin_sent_otp",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
       
      },
    }
  );
 
  console.log("Resend OTP RESPONSE", OtpResponse.data.data.otp);
  
  if(OtpResponse.data.error_code == 200)
  {
   updateOtpErrorMessage(OtpResponse.data.message)
  //  setTimeout(() => {
  //   $(".otpmessage").hide()
  // }, 3000);
  $(".resendmessage").show();
    setTimeout(function(){
      $(".resendmessage").hide();
    }, 3000);
   
  }


  
}
  async function ConfirmOTP() {
 
    try{
    
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("otp", code);
      const OtpResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "confirm_otp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
           
          },
        }
      );
     
      console.log("CONFIRM OTP RESPONSE", OtpResponse);
      updateErrorCode(OtpResponse.data.error_code);
      updateErrorMessage(OtpResponse.data.message);
      setData(OtpResponse.data.data)
      if(OtpResponse.data.error_code == 200)
  {
  setTimeout(() => {
   
  
      history.push("/newPassword", { user_id });
     
    
  }, 3000);
  
  }
  else{
  {
    console.log("error")
  }
  }
  
  
     
    }
    catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const [userData,setUserData] = useState([]);

//   async function VerifyUser() {
  
//     try{
     
//       const formData = new FormData();
//       formData.append("username", userEmail);
//       const response = await axios.post(
//         process.env.REACT_APP_API_KEY + "admin_verify_username",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
           
//           },
//         }
//       );
     
//       console.log("login", response.data.data);
      
//       setUserData(response.data.data)
//       if(response.data.error_code == 200)
// {
//   setTimeout(() => {
   
  

     
    
//   }, 3000);
  
// }
// else{
//   {
//     console.log("error")
//   }
// }


     
//     }
//     catch (err) {
//       console.log("Log in Fail", err);
//     }
// }
   
// useEffect(() => {

//   VerifyUser();
// }, []);

  return (
    <div>
      <section className="unicircle_login">
        <div class="container">
          <div class="user signinBx">

{/* left box */}
<div class="imgBx">
            
            <img src="dist/img/forgotpassword_img.png" className="img elevation right_side_img" alt="User Image" style={{position:"absolute",top:"0",left:"0",height:"100%"}}/>
            <img src={require('../images/logo.png')} alt="logo" style={{width:"148px",height:"55px",zIndex:"10",position:"absolute",top:"30px", left:"30px"}}/>
          
          </div>

            {/* right box */}
            <div class="formBx" style={{ padding:"70px 80px 70px 70px"}}>
              <form
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  height: "100%", 
                  width: "100%",
                  
                }}
              >
            
                <h4 style={{fontSize:"18px"}} class="d-flex mt-5">
                  <p style={{color:"rgba(0, 0, 0, 0.6)",fontWeight:"600"}}>Enter Security</p> 
                <p style={{color:"#1F3977",marginLeft:"3PX",fontWeight:"bold"}}>Code</p>
                </h4>
               <p style={{fontSize:"12PX",marginTop:"20px",fontWeight:"600",color:"rgba(0, 0, 0, 0.6)"}}>Please check your emails for a message with your code. Your code is 6 numbers long.</p>
               
               <div className="d-flex" style={{marginTop:"60px"}}>
               <img src="dist/img/Line 7.png" style={{width:"72px"}}/>
               <img src="dist/img/Line 8.png" style={{width:"72px",marginLeft:"10PX"}}/>
               </div>
               <div className="d-flex" style={{marginTop:"20px",padding:"0"}}>
              
               <input type="password"   
               className="login_plceholder"
                  value={code}
                  onChange={(e) => updateCode(e.target.value)}
                  placeholder="Enter Code"
                  autoComplete="off"
                  id="password"
                  style={{border:"1px solid #c4c4c4",background:"white",height:"35px",width:"203px",marginTop:"0",borderRadius:"9PX"}}/>
               <p className="ml-auto mt-1 " id="passwordShowHide" style={{color:"#2d5dd0",fontSize:"10PX", fontWeight:"500",padding:"5px",fontFamily:"Poppins"}} 
              onClick={() =>togglePassword()}>
                  Show
                  </p>
              <div style={{fontSize:"10PX", fontWeight:"500",lineHeight:"12px",marginLeft:"8px",marginTop:"5px"}}>
              <p>We sent your code to :</p>
               <p>{username.username}</p>
              </div>
               </div>
               
          
                <div style={{marginTop:"40PX"}} className="row">
                  <div className="col-md-5">
                  <a href="/forgotpassword">
                  <input
                  type="button"
                
                  style={{
                    border: "none",
                    background: "#6e7781",
                    fontWeight:"500",
                    color: "white",      
                    height:"35px",
                    width:"100%",
                    fontSize:"13PX",
                    textAlign:"center",
                  
                    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)"
                  }}
                  id="go"
                  defaultValue="Sign In"
                  value="Cancel"
                  // onClick={() => LoginPopUp()}
                />
                </a>
                  </div>
                
                <div className="col-md-6">
                  {/* <a href="/newPassword"> */}
                <input
                  type="button"
                  
                  style={{
                    border: "none",
                    background: "#2d5dd0",
                    fontWeight:"500",
                    color: "white",
                    fontSize:"13PX",
                    height:"35px",
                    width:"100%",
                   
                    textAlign:"center",
                   
                    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)"
                  }}
                  id="go"
                  defaultValue="Sign In"
                  value="Continue"
                  onClick={() => ConfirmOTP()}
                />
                {/* </a> */}
                </div >
                
                <button id ="didntGetCode" style={{color:"#2d5dd0",fontWeight:"600",fontSize:"12px",marginTop:"15PX",textAlign:"left",border:"none",background:"none"}} onClick={() => resentCode()}>
                  Didn't get a code?
                  </button>
               <div className="resendmessage" style={{display:"none" ,fontSize:"12px",fontWeight:"500",color:"green"}}>New Otp has been sent to your Email/Mobile</div>
                </div>
                
                <div style={{fontWeight:"500",fontFamily:"Poppins",fontSize:"11px",marginTop:"10px"}} >
               {/* Password has been sent to your email id. Please check your email */}
               {
                 errorCode == 200 ?
                 (
                    <div className="d-flex">
                      <img src={require('../images/correct.png')} style={{width:"26px",height:"23px"}}/>
                      <p style={{color:"green",marginLeft:"5PX"}}>{errorMessage}</p>
                      </div>
                 ) : errorCode == 403 ?
                 (
                   <div className="d-flex">
                     <img src={require('../images/wrong.jpg')} style={{width:"18px"}}/>
                     <p style={{color:"red"}}>{errorMessage}</p>
                   </div>
                 ):errorCode == 406 ?
                 (
                   <div className="d-flex">
                      <img src={require('../images/missing.png')} style={{width:"15px"}}/>
                     <p style={{color:"blue",marginLeft:"5PX"}}>Please enter code</p>
                   </div>
                 ):
                 
                 ""
                 
                   
                
                
              }
               </div> 
               
            
               {/* <div style={{fontSize:"12px",color:"blue"}} className="otpmessage">
                 {otpErrorMessage}
                 </div>  */}
               
                
              </form>
            </div>

            
          </div>

          
        </div>
      </section>
      
    </div>
  );
}
