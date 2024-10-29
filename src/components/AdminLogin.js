import React, {useState} from 'react'
import $ from "jquery";
export function AdminLogin()
{
  const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };
  function myAlertBottom() {

    const campusId = document.getElementById("campusId").value;
    const password = document.getElementById("password").value;
    if (campusId == "12345" && password == "admin@123") {
      $(".myAlert-bottom").show();

      setTimeout(function () {
        $(".myAlert-bottom").hide();

      }, 8000);
      window.location.href = "/homepage";

    } else {
      $(".failed-bottom").show();
      setTimeout(function () {
        $(".failed-bottom").hide();
      }, 8000);
    }
  }

    return (
      <div style={{width:"100%",border:"1px solid red"}}>

         <section style={{width:"100%",border:"1px solid green"}}>

    <div class="container" style={{border:"1px solid red"}}>

      <div class="user signinBx" >

        <div class="formBx" style={{paddingTop :"0"}}>

          <form style={{marginTop:"10px", padding:"10px", height:"100%", width:"100%"}}>
           <div className="unicircle_img ms-3"></div>

        <div className="admin_dashboard">
          <h1>
            Admin
            <br />
            Dashboard
          </h1>
        </div>
            {/* <h2>Sign In</h2> */}
            <input type="text" name="" placeholder="Campus Id"  id="campusId" />
            <input type="password" name="" placeholder="Password" id="password"/>
            <input type="submit" name="" value="Login" onClick={() => myAlertBottom()}/>

          </form>
        </div>
        <div class="imgBx" >
        <img
                src="dist/img/admin_login.png"
                className="img elevation text-center"
                alt="User Image"
                style={{ width: "30%", height:"60%", paddingBottom: "5px",  marginTop:"100px"}}
              />
          <p class="signup" style={{color:"black", marginLeft:"480px", marginTop:"5px"}}>
              Don't have an account ?
              <a href="#" onClick={() => toggleForm()} style={{color:"black", marginLeft:"20px  "}}>
                <button style={{background:"#F15CB5", color:"white", border:"none",fontSize: "15px",
	fontWeight: "300",
	padding: "10px",
	margin: "10px 10px 0px 0px",


	cursor: "pointer",

	transition: "all 0.3s linear"

	}}>
                Sign Up
                </button>
                </a>
            </p>
        </div>
      </div>
      <div class="user signupBx">
        <div class="formBx" style={{ paddingTop :"0"}}>
          <form style={{marginTop:"10px", padding:"10px", height:"100%", width:"100%"}}>
          <div className="unicircle_img ms-3"></div>

         <div className="admin_dashboard">
           <h1>
             Admin
             <br />
             Dashboard
           </h1>
         </div>
            <input type="text" name="" placeholder="Username" />
            <input type="email" name="" placeholder="Email Address" />
            <input type="password" name="" placeholder="Create Password" />
            <input type="password" name="" placeholder="Confirm Password" />
            <input type="submit" name="" value="Sign Up" onClick={() => myAlertBottom()}/>

          </form>
        </div>
        <div class="imgBx">
        <img
                src="dist/img/admin_login.png"
                className="img elevation text-center"
                alt="User Image"
                style={{ width: "30px", height:"30px", paddingBottom: "5px",  marginTop:"100px"}}
              />
          <p class="signup"  style={{color:"black", marginLeft:"40px", marginTop:"5px"}}>
              Already have an account ?
              <a href="#"  onClick={() => toggleForm()} style={{color:"black", marginLeft:"20px  "}}>
              <button style={{background:"#F15CB5", color:"white", border:"none",fontSize: "15px",
	fontWeight: "300",
	padding: "10px",
	margin: "10px 10px 0px 0px",


	cursor: "pointer",

	transition: "all 0.3s linear"

	}}>
                Sign in
                </button>
                </a>
            </p>
          </div>
      </div>
    </div>

  </section>
  {/* login pop up msg */}
  <div class="myAlert-bottom ">
      {/* <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li> */}
        <div className="success_img ms-3"></div>
        <h4 class="login-text text-center mt-0">Success</h4>
      </div>

      <div class="failed-bottom ">
      {/* <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li> */}
          <div className="fail_img ms-3"></div>
        <h4 class="loginfailed-text text-center mt-0">Error</h4>
      </div>
{/* end login pop up msg */}
      </div>
    )
}
