import React, { useState } from 'react'
import axios from 'axios';
import $ from "jquery";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Header } from "./Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { Menu } from "./Menu"
import * as FormData from "form-data";

export function ChangePassword() {

  $(".validateFail").show();

  setTimeout(function () {
    $(".validateFail").hide();
  }, 5000);



  const token = localStorage.getItem("Token");
  const [oldPassword, updateOldPassword] = useState("");
  const [newPassword, updateNewPassword] = useState("");
  const [confirmPassword, updateConfirmPassword] = useState("");
  const [error_message, updateError_message] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function changePwd() {

    try {
      const old_password = document.getElementById("old_password");
      const new_password = document.getElementById("new_password");
      const confirm_password = document.getElementById("confirm_password");

      if (old_password.value == "" &&
        new_password.value == "" &&
        confirm_password.value == "") {
        $(".ValueMsg").show();

        setTimeout(function () {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      }

      else if (old_password.value == "") {

        $(".OldPassword").show();

        setTimeout(function () {
          $(".OldPassword").hide();
        }, 3000);

      }

      else if (new_password.value == "") {

        $(".NewPassword").show();

        setTimeout(function () {
          $(".NewPassword").hide();
        }, 3000);

      }

      else if (confirm_password.value == "") {

        $(".ConfirmPassword").show();

        setTimeout(function () {
          $(".ConfirmPassword").hide();
        }, 3000);

      }

      else if (new_password.value != confirm_password.value) {
        $(".ValidateMsg").show();

        setTimeout(function () {
          $(".ValidateMsg").hide();
        }, 3000);
      }

      else {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("old", oldPassword);
        formData.append("new", confirmPassword);

        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_change_password",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: token,
            },
          }
        );

        console.log("Response", response);
        console.log("Code", response.data.error_code);
        console.log("Message", response.data.message);

        updateError_message(response.data.message);
        setIsLoading(false);
        updateOldPassword("");
        updateNewPassword("");
        updateConfirmPassword("");
    
        if(response.data.error_code == 200){
          $(".formSuccess").show();

          setTimeout(function () {
            $(".formSuccess").hide();
          }, 5000);
        }

        else{
          $(".errorMsg").show();

          setTimeout(function () {
            $(".errorMsg").hide();
          }, 5000);
        }

       
      }



    }

    catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }

  }


  function Password() {
    return (
      <div className="content-wrapper">

        <div className="border_class2">

          <h1 className="main_heading_h1" style={{padding:"15px 30px"}}>CHANGE PASSWORD</h1>
        </div>


        <div class="formSuccess" style={{display:"none",marginTop:"10px" }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity="success">
              {error_message}
            </Alert>
          </Stack>
        </div>
    

        <div class="errorMsg" style={{display:"none",marginTop:"10px" }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity="error">
              {error_message}
            </Alert>
          </Stack>
        </div>

        <div class="ValueMsg" style={{display:"none",marginTop:"10px"}}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity="error">
              Error! You Must Fill In All The Fields
            </Alert>
          </Stack>
        </div>

        <div class="ValidateMsg" style={{ display:"none",marginTop:"10px" }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity="error">
              Password and Confirm Password Do not Matched...
            </Alert>
          </Stack>
        </div>

        {isLoading ? <LoadingSpinner />
          :
          <div>

            {/*reason  */}
            <div className="border_class2 box_padding">
              <div class="row">
                <div class="col-md-6">
                  <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                    <div className="d-flex">
                      <label className="all_labels">Current Password</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      type="password"
                      className="all_inputs"
                      id="old_password"
                      autoComplete='off'
                      value={oldPassword}
                      onChange={(e) => updateOldPassword(e.target.value)}
                      placeholder="Enter Current Password"
                      
                    />


                    <div
                      class="OldPassword"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                        Please Enter Old Password
                      </h4>
                    </div>

                  </div>

                </div>

                <div class="col-md-6">
                  <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                    <div className="d-flex">
                      <label className="all_labels">New Password</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      type="password"
                      className="all_inputs"
                      autoComplete='off'
                      id="new_password"
                      value={newPassword}
                      onChange={(e) => updateNewPassword(e.target.value)}
                      placeholder="Enter New Password"
                      
                    />

                    <div
                      class="NewPassword"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                        Please Enter New Password
                      </h4>
                    </div>

                  </div>

                </div>
              </div>
            



            {/* start time */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-6">
                  <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                    <div className="d-flex">
                      <label className="all_labels">Confirm Password</label>

                      <p className="all_stars">*</p>
                    </div>

                    <input
                      type="password"
                      className="all_inputs"
                      //  name="confirm_password"
                      id="confirm_password"
                      autoComplete='off'
                      value={confirmPassword}
                      onChange={(e) => updateConfirmPassword(e.target.value)}
                      placeholder="Enter Confirm New Password"
                      
                    />

                    <div
                      class="ConfirmPassword"
                      style={{ margin: "0", display: "none" }}
                    >
                      <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                        Please Enter Confirm Password
                      </h4>
                    </div>

                  </div>

                </div>

              </div>
            </div>
            

            {/* buttons */}
            <div className="d-flex form-buttons mt-4 buttons_div">


              <div className='ml-auto'>
                <input
                  type="button"
                  className=" form-buttons3 publish_button"
                  defaultValue="Sign Up"
                  onClick={() => changePwd()}
                  value="Publish"
                 
                />
              </div>
            </div>
            </div>
          </div>
        }

      </div>
    )
  }
  return (
    <div>
      <Header />
      <div className='d-flex'>
        <Menu />
        {Password()}
      </div>
    </div>
  )
}
