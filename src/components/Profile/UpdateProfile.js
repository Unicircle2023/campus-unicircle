import React, { useState, useEffect } from 'react';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingSpinner from "../LoadingSpinner";
import validator from 'validator'
import $ from "jquery"
import { sliderClasses } from '@mui/material';



export function UpdateProfile() {



  const [data, setData] = useState([]);
  console.log("get data",data)
  const token = localStorage.getItem("Token");

  const [profileName, updateProfileName] = useState("");
  const [profileImage, updateProfileImage] = useState(null);
  const [mobile, updateMobile] = useState("");
  const [error_message, updateError_message] = useState("");
  const [email, updateEmail] = useState("");
  const [imgData, setImgData] = useState(null);
  const [loggeduser, setLoggedUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("profileImage..........................",profileImage);

  // console.log("logged user name", loggeduser)
  const [number, setNumber] = useState("");

  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, '');
    updateMobile(onlyDigits);
    
  };



  async function getLoggedUserInfo() {
    try {

      const loginResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_Primary_user_info",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Logged User Profile Response", loginResponse);
      const loginuser = loginResponse.data.data[0];
      console.log("Logged User Profile Data", loginuser);

      setLoggedUser(loginuser);
      updateProfileName(loginuser.admin_name);
      // updateProfileName(loginuser.profile);
      updateEmail(loginuser.email)
      updateMobile(loginuser.mobile)
      updateProfileImage(loginuser.profile)
      if(loginuser.profile){
        var preview = document.getElementById("file-ip-1-preview");
        preview.style.display = "block";
      }
      setImgData(loginuser.profile)
      console.log("profile pic..............",loginuser.profile)
      console.log("imgdata...................",imgData)
    }
    catch (err) {
      console.log("Log in Fail", err);

    }
  }

  useEffect(() => {
    getLoggedUserInfo();
  }, []);

  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    updateEmail(e.target.value)
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')
    
    } else {
      setEmailError('Enter Valid Email Address')
    }
  }

  async function updateAdminProfile() {
    
 
     
      const email_id = document.getElementById('email')

      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email_id.value.match(validRegex))
      {
 
  const formData = new FormData();
  formData.append("name", profileName);
  formData.append("profile", profileImage);
  formData.append("mobile", mobile);
  formData.append("email", email);
  

  const profileresponse = await axios.post(
    process.env.REACT_APP_API_KEY + "admin_update_profile_pic",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        // "X-Requested-With": "XMLHttpRequest",
        Authorization: token,
      },
    }
  );

  console.log("Update Profile ", profileresponse.data);
  if(profileresponse.data.error_code == 200)
  {
    setData(profileresponse.data)
  }
 
  setIsLoading(false);
  updateError_message(profileresponse.data.message);

  $(".formSuccess").show();

  setTimeout(function () {
    $(".formSuccess").hide();
  }, 3000);
  window.location.href = "/homepage"
      }
      else
      {
        $(".incorrect_email").show();
        setTimeout(() => {
          $(".incorrect_email").hide();
        }, [3000]);
       
      }
     
    }
     
     

  const getImage = (e) => {
    updateProfileImage(e.target.files[0]);
   
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("file-ip-1-preview");
      preview1.src = src;
      
      preview1.style.display = "block";
      setImgData(src)
    }


  }

  function event_image() {
    console.log("profileImage",profileImage)
    if(profileImage != null)
    {
      setTimeout(() => {
        $(".event_image").hide();
      }, 3000);
    }
  

  }

  return (
    <div className="content-wrapper">

      <div className="border_class2 box_padding">

        <h1 className="main_heading_h1">UPDATE PROFILE</h1>
      </div>


      <div class="formSuccess success_msg">
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      {isLoading ? <LoadingSpinner />
        :
      <div className="border_class2 box_padding ">

        {/*reason  */}
        <div className="">
          <div class="row">
            <div class="col-md-6">
              <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                  <label className="all_labels">Name</label>

                  <p className="all_stars">*</p>
                </div>

                <input type="text"
                  id="user_name"
                  value={profileName}
                  onChange={(e) => updateProfileName(e.target.value)}
                  placeholder="Enter User Name"
                  className="all_inputs" name="birthdaytime"
                 />
                <div
                  class="UserName"
                  style={{ marginTop: "-6px", display: "none" }}>
                  <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                    Please Enter User Name
                  </h4>
                </div>

              </div>

            </div>

            <div class="col-md-6">
              <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                  <label className="all_labels">Mobile</label>

                  <p className="all_stars">*</p>
                </div>

                <input type="text"
                 maxLength="10"
                  id="user_name"
                  // name="numonly"
                  value={mobile}
                  // onChange={(e) => updateMobile(e.target.value)}
                  onChange={(e) => checkInput(e)}
                  placeholder="Enter Mobile Number"
                  className="all_inputs" 
                 />
                <div
                  class="Mobile"
                  style={{ marginTop: "-6px", display: "none" }}>
                  <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                    Please Enter Mobile Number
                  </h4>
                </div>
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
                  <label className="all_labels">Email</label>

                  <p className="all_stars">*</p>
                </div>

                <input type="email"
                  id="email"
                  value={email}
                  // onChange={(e) => updateEmail(e.target.value)}
                  onChange={(e) => validateEmail(e)}
                  placeholder="Enter Email Address"
                  className="all_inputs" name="birthdaytime"
                  
                />
               <span className="incorrect_email" style={{fontWeight: '400',fontSize:"12PX",color: 'red',display:"none"}}>Incorrect Email Id</span>

                <div
                  class="Email"
                  style={{ marginTop: "-6px", display: "none" }}>
                  <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                    Please Enter Email
                  </h4>
                </div>

              </div>

            </div>

          </div>
        </div>


        <div className="mt-2 p-0">
          <div class="row">
           
            <div class="col-md-6">
              <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                  <label className="all_labels">Add Profile Photo</label>

             
                </div>
                <label for="file-ip-1" >

                  {
                    imgData === "" ?
                    (
                      <div>
                           <img src={require("../images/profile.jpg")} alt="Empty" style={{ height: "150px" }}  />
                      </div>
                    ):
                    (
                      <div>
                        {/* <img src={imgData} id="comp_logo" className="event_image" alt="dropdown" style={{ height: "100px" }}  /> */}
                        <img id="file-ip-1-preview" src={imgData} style={{ height: "117px", top: "40px", left: "30px" ,display:"none"}} alt="preview"/>
                      </div>
                    )
                  }
                 {/* {imgData } */}
                  {/* <img id="file-ip-1-preview" src={imgData}  style={{ height: "117px", top: "40px", left: "30px"}} alt="preview"/> */}
                </label>

                <input type="file" name="photo"
                  style={{ visibility: "hidden" }}
                  onChange={getImage}
                  accept="image/png, image/gif, image/jpeg"
                  id="file-ip-1" />


              </div>

            </div>

          </div>
        </div>


        {/* buttons */}
        <div className="d-flex form-buttons mt-4 buttons_div">

          <div class="ValueMsg" style={{ margin: "8px", width: "65%", display: "none" }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                Error! You Must Fill In All The Fields
              </Alert>
            </Stack>
          </div>
          <div className='ml-auto'>
          <input
              type="button"
              className=" form-buttons3 publish_button"
              defaultValue="Sign Up"
              onClick={updateAdminProfile}
              value="Update Profile"
              
            />
          </div>
        </div>


      </div>
     }

    </div>
  );
}
