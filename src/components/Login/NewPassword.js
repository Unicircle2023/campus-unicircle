import React, { useState } from "react";
// import "../App.css";
import $ from "jquery";
import axios from "axios";
import ".././AdminLogin.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { red } from "@material-ui/core/colors";

export function NewPassword() 
{
  const location = useLocation();
  const history = useHistory();
  const user_id= location.state || { id: "none" };
  const new_id =user_id.user_id

  function togglePassword() {
    var x = document.getElementById("myInput");
    if (x.type == "password") {
      x.type = "text";
      
      document.getElementById("passwordShowHide").innerHTML="Hide";
    } else {
      x.type = "password";
     
      document.getElementById("passwordShowHide").innerHTML="Show";
    }
  } 

  const [errorCode,updateErrorCode] = useState([]);
const [errorMessage,updateErrorMessage] = useState([]);
const [password,updatePassword] =  useState([])
const [data,setData]= useState([])
  async function NewPassowrd() {
 
    try{
    
      const formData = new FormData();
      formData.append("id", new_id);
      formData.append("password", password);
      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "change_password_admin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
           
          },
        }
      );
     
      console.log("New password response", response);
      updateErrorCode(response.data.error_code);
      updateErrorMessage(response.data.message);
      setData(response.data.data)
      if(response.data.error_code == 200)
  {
  setTimeout(() => {
   
  
      history.push("/");
     
    
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
                  <p style={{color:"rgba(0, 0, 0, 0.6)",fontWeight:"600"}}>Choose a new</p> 
                <p style={{color:"#1F3977",marginLeft:"3PX",fontWeight:"bold"}}>Password</p>
                </h4>
               <p style={{fontSize:"12PX",marginTop:"20px",fontWeight:"600",color:"rgba(0, 0, 0, 0.6)"}}>Create a new password that is at least 6 characters long. A strong password has a combination of letters, digits and punctuation marks.</p>
               
               <div className="d-flex" style={{marginTop:"60px"}}>
               <img src="dist/img/Line 7.png" style={{width:"72px"}}/>
               <img src="dist/img/Line 8.png" style={{width:"72px",marginLeft:"10PX"}}/>
               </div>
               <div className="d-flex" style={{marginTop:"20px",padding:"0",border:"1px solid #c4c4c4",borderRadius:"9PX",height:"38px"}}>
              
               <input type="password"   
               className="login_plceholder"
                  value={password}
                  onChange={(e) => updatePassword(e.target.value)}
                  placeholder="New Password"
                  autoComplete="off"
                  id="myInput"
                  style={{border:"none",background:"white",marginTop:"2PX",height:"32PX",marginLeft:"2px",width:"90%"}}/>
              
             
              <p className="ml-auto mt-1 " id="passwordShowHide" style={{color:"#2d5dd0",fontSize:"11PX", fontWeight:"500",padding:"5px",fontFamily:"Poppins"}} 
              onClick={() =>togglePassword()}>
                  Show
                  </p>
             
            
               </div>
               
          
                <div style={{marginTop:"40PX"}} className="row">
                  <div className="col-md-6">
                  <input
                  type="button"
                
                  style={{
                    border: "none",
                          background: "#6e7781",
                          fontWeight: "500",
                          color: "white",
                          height: "35px",
                          width: "100%",
                          fontSize: "13PX",
                          textAlign: "center",

                          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)"
                  }}
                  id="go"
                  defaultValue="Sign In"
                  value="Skip"
                  // onClick={() => LoginPopUp()}
                />
                  </div>
                
                <div className="col-md-6">
                  {/* <a href="/resetYourPassword"> */}
                <input
                  type="button"
                  
                  style={{
                    background: "#2d5dd0",
                    
                    border: "none",
                    
                    fontWeight: "500",
                    color: "white",
                    height: "35px",
                    width: "100%",
                    fontSize: "13PX",
                    textAlign: "center",

                    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)"

                  }}
                  id="go"
                  defaultValue="Sign In"
                  value="Continue"
                  onClick={() => NewPassowrd()}
                />
                {/* </a> */}
                </div >
                <p style={{color:"#2d5dd0",fontWeight:"600",fontSize:"12px",marginTop:"10PX"}}>Didn't get a code?</p>
                
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
                 ) : errorCode == 404 ?
                 (
                   <div className="d-flex">
                     <img src={require('../images/wrong.jpg')} style={{width:"18px"}}/>
                     <p style={{color:"red"}}>{errorMessage}</p>
                   </div>
                 ): errorCode == 406 ?
                 (
                  <div className="d-flex">
                    <img src={require('../images/missing.png')} style={{width:"15px"}}/>
                    <p style={{color:"blue",marginLeft:"5PX"}}>Please! Enter Your New Password</p>
                  </div>
                ):
                 
                 ""
                 
                   
                
                
              }
               </div> 
            
                
               
                
              </form>
            </div>

            
          </div>

          
        </div>
      </section>
      
    </div>
  );
}
