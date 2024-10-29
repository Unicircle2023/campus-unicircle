import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { AppNotification } from "./AppNotification";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "@mui/material/Alert";
export function Header() {
 
 
  const token = localStorage.getItem('Token');
  const [data, setData] = useState([]);
  const [bdaywish, setBdaywish] = useState([]);
  const [loggeduser, setLoggedUser] = useState([]);
  const [switchuserr, setSwitchUser] = useState([])
  const [searchList, setSearchList] = useState([])
  const [search, setSearch] = useState();
  const [profile, setProfile] = useState([]);
  const history = useHistory();
  const [profileImage, updateProfileImage] = useState("");

  const handleLogout = () => {
    var answer = window.confirm("Are you sure that you want to logout form the device?");
    if (answer) {
      window.location = "/";
      // console.log('Thing was saved to the database.');
    } else {
      
      // console.log('Thing was not saved to the database.');
    }
  
    
  
  };
  function logOutSuccesfull()
  {
    window.location = "/";
  }
  const handleButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "Are you sure that you want to logout form the device?",
      type: "success",
      text: "Logged Out Successfully!!",
      icon: "success",
    }).then(function () {
      window.location = "/";
    });

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

      if (loginResponse.data.error_code == 200) {
        setLoggedUser(loginResponse.data.data);
        }
        else{
          // $(".relogin_container").show();
          handleButton()
          alert("Invalid Token OR Non Authorized User");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
       
        }
     
      if (loginResponse.data.error_code == 404) {
        // $(".relogin_container").show();
        // handleButton()
        alert("Invalid Token OR Non Authorized User");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }

     
     
    }
    catch (err) {
      console.log("Log in Fail", err);

    }
  }

  async function getProfileInfo() {
    try {

      const profileResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_all_email_switch_user",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      // console.log("Fetch Profile Response", profileResponse.data.data);
      if(profileResponse.data.error_code == 200)
      {
        setProfile(profileResponse.data.data);
      }
     
      
    }
    catch (err) {
      console.log("Log in Fail", err);

    }
  }

  
  async function universalSearch(text) {
    setSearch(text);
    try {
      const formData = new FormData();

      formData.append("term", text);

      const searchresponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_search_menu",
        formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        });
      if (searchresponse.data.success != 0) {
        // console.log("Universal Search", searchresponse.data);
        setSearchList(searchresponse.data.data)

      } else {
        setSearchList([]);
      }

      

    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }

  function logoutPopup()
  {
    $("#logout_account").show();
  }
  async function switchNewUser() {
    try {

      const fetchUser = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_all_email_switch_user",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      // console.log("Fetch Switch User", fetchUser);
      const switchUser = fetchUser.data.data;
   if(fetchUser.data.error_code === 200)
   {

    fetchUser.data.data.map((item)=>{
     
      updateProfileImage(item.profile)
    })
    setSwitchUser(switchUser);
   }
   
    }
    catch (err) {
      console.log("Log in Fail", err);

    }
  }

  async function fetchList() {
   
    try {

      const fetchCountResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_count",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      // console.log("Get Dashboard count Details", fetchCountResponse);
      const CountErrorCode = fetchCountResponse.data.error_code;
      const CountErrorMsg = fetchCountResponse.data.message;
     

      if (CountErrorCode == 200) {
        const countListArray = fetchCountResponse.data.data[0];
       
        setData(countListArray);
      }
      else {
        setData([]);

        // console.log(fetchCountResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function () {
          $(".alert-danger").hide();
        }, 3000);
      }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  useEffect(() => {

    fetchList();
    getProfileInfo();
    switchNewUser();
    getLoggedUserInfo();
    universalSearch();
  }, []);

function switchAccount(userEmail)
{
  // console.log("get user email",userEmail)
  localStorage.clear();
  history.push("/", { userEmail })
}
function profileDropdown()
{
  $(".dropdown-content").toggle()
}
function notificationDropdown()
{
  $(".dropdown-content-notification").toggle()
}
function cancelLogout()
{
 $("#logout_account").hide();
}
  return (
    <div className="scrollbar_css header_fade " id="header_fade" style={{ padding:"0", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", background:"white",width:"100%",top:"0",zIndex:"10"}}>
    
    {/* logout pop up invalid token */}
{/* <div id="relogin" className="modaloverlay relogin_container" style={{display:"visible"}}> */}
<div  className="relogin" style={{border:"1px solid red"}}>

</div>
      

  {/* unicircle logo */}
      {/* <div style={{ width: "18%", paddingTop: "1PX", boxshadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }} >
        <img src={require('./images/logo.png')} alt="Unicircle logo" style={{ width: "150px", height: "50px", margin: "auto", marginLeft: "15px", display: "block" }} />
      </div> */}
  {/* end unicircle logo */}
      <nav className="navbar navbar-expand" style={{  marginBottom: "0PX", boxshadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }} >
  {/* search */}
        <ul className="navbar-nav" style={{ padding: "0" }}>
          <li className="nav-item topnav" style={{ padding: "0" }}>
          
            {/* <div className="search-container" style={{ border: "none", width: "450px", height: "35px", borderRadius: "10px", background: "rgba(228, 233, 243, 0.6)" }}>
              <form className="d-flex flex-column">

                <div style={{ position: "relative" }}>
                  <BiSearchAlt2 style={{ color: "#293043", fontSize: "20px", margin: "1px 0px 0px 5px", fontWeight: "bold" }} />
                  <input type="text"
                    value={search}
                    placeholder="Search Anything"
                    onChange={(e) => { universalSearch(e.target.value) }}

                    style={{ background: "transparent", border: "none", fontWeight: "400", padding: '0', height: "32px",fontSize:"!2PX" }}
                  />

                  <div style={{ position: "absolute", width: "450px",  zIndex: "3",top:"40px",overflowY:"auto" }}>
                    {searchList != null && searchList.length > 0 ?
                      searchList.map((item, index) => {
                        const searchLink = item.link
                        console.log("Search Term", process.env.REACT_APP_BASE_URL + searchLink)
                        return (
                          <a href={process.env.REACT_APP_BASE_URL + searchLink}>

                            <ul class="list-group" style={{ zIndex: "5" }}>
                              <li class="list-group-item" style={{fontSize:"12px",padding:"5px",borderRadius:"0",border:"none",borderBottom:"1px solid #f5f5f5"}}>{item.term}</li>
                            </ul>

                          </a>
                        );
                      }) : null

                    }
                  </div>
                </div>
              </form>
            </div> */}
           
          </li>
        </ul>
 {/* end search */}

{/* profile */}
        <ul className="navbar-nav ml-auto">
          <li class="nav-item" style={{display:"flex",alignItems:"center" }}>

            {loggeduser.length > 0 ?
              loggeduser.map((profileItem) => {
                return (
                  profileItem.profile == "" ?
                  (
                    <div>
                          <img src={require("./images/profile.jpg")}  style={{ width: "28px", height:"28px", borderRadius: "50%" }} />
                    </div>
                  ):
                  (
                    <div>
                      <img src={profileItem.profile} 
                       style={{ width: "28px", height:"28px",borderRadius: "50%"}}></img>
                    </div>
                  )
                )
              })
              :
              <div style={{fontSize:"10px"}}>
                
              </div>
            }
            {/* </p> */}
          </li>



          {loggeduser.length > 0 ?
            loggeduser.map((profileItem) => {
          
              return (
                <li class="nav-item p-0" style={{fontFamily: "Poppins",display:"flex",alignItems:"center" }}>

                  <div>
                    <p className="eleven_font_class" style={{ color: "black", marginLeft: "5px" }}>{profileItem.admin_name}</p>
                  </div>


                </li>
              )
            })
            :
            <li class="nav-item" style={{fontFamily: "Poppins",display:"flex",alignItems:"center"}}>

            <div>
              <p className="eleven_font_class" style={{ color: "black", marginLeft: "5px" }}>
                Data Not Found
                </p>
            </div>


          </li>
          }
{/* notification */}
          {/* <li class="nav-item nav-notification" style={{ padding: "0" }}>

            <div class="dropdown" style={{ marginTop: "5px", float: "right", marginLeft: "20px", zIndex: "2" }}>

              <button class="dropbtn-notification"  onClick={() => notificationDropdown()}>
                <img src={require('./images/notification.PNG')} alt="notification" style={{ width: "27px", height: "26px" }} />
              </button>

              <div class="dropdown-content-notification" style={{ borderRadius: "5px", padding: "0px", width: "350px" }}>
                <AppNotification />
              </div>

            </div>

          </li> */}
{/* end notification */}

 {/* profile dropdown */}      
          <li class="nav-item nav-notification" style={{ padding: "0",display:"flex",alignItems:"center" }}>
           
            <div class="dropdown" style={{float: "right", marginLeft: "12px", zIndex: "2" }}>
              
              <button class="dropbtn" onClick={() => profileDropdown()}>
  
                <img src={require('./images/Drop Down.png')} alt="dropdown" style={{ width: "18px", height: "18px" }} />
              </button>

              <div className="dropdown-content" style={{ fontFamily: "Poppins" }}>

                <a href="#" style={{ padding: "0px", borderBottom: "1px solid #dbdbdd", margin: "0px 10px" }}>

                  <div className="d-flex">
                    <div style={{ width: "20%" }}>
                     

                      {loggeduser.length > 0 ?
                        loggeduser.map((profileItem) => {
                         
                      
                            return (
                              profileItem.profile == "" ?
                              (
                                <div>
                                      <img src={require("./images/profile.jpg")} alt="no image" style={{ width: "25px",height:"25px",marginTop:"15px", borderRadius: "50%" }} />
                                </div>
                              ):
                              (
                                <div>
                                 <img src={profileItem.profile} alt="profile image" style={{ margin: "10px 2px 10px 5px", padding: "0px", width: "25px", height: "25px" }}></img>
                                </div>
                              )
                            )
                          
                          
                        })
                        :
                        <div style={{fontSize:"10px"}}>
                          Data Not Found
                        </div>
                      }
                    </div>

                    <div style={{ width: "80%", marginLeft: "15px", marginTop: "10px" }}>

                      {loggeduser.length > 0 ?
                        loggeduser.map((uname) => {
                          return (
                            <div className="eleven_font_class">
                              <Link to="/profile">
                              {uname.admin_name}
                              </Link>
                            </div>
                          )
                        })
                        :
                        <div>
                          Data Not Found
                        </div>
                      }


                      <div ><Link to="/profile" style={{ color: "darkgrey", fontWeight: "500", fontSize: "13px" }}>See your profile</Link></div>
                    </div>


                  </div>
                </a>

              

                {/* setting */}
                <a href="#" style={{ padding: "0px", margin: "10px 5px 5px 5px", border: "none" }}>

                  <nav className="profile_dropdown" style={{ border: "none" }}>
                    <ul style={{ border: "none" }}>
                      {/* switch accounts */}
                      {/* <li>
                        <a className="" href="#switch" style={{ padding: "0", margin: "0" }}>

                          <div className="d-flex" style={{ padding: "0" }}>
                            <div> <img

                              alt="Anne Hathaway picture"
                              src="dist/img/z-21.png"
                              style={{ margin: "5px 2px 10px 5px", padding: "0px", width: "28px", height: "28px" }}
                            />
                            </div>
                            <div style={{ fontWeight: "500", fontSize: "13px", width: "70%", marginLeft: "3PX", marginTop: "10px", verticalAlign: "middle" }}>Switch Accounts</div>
                            <div className="ml-auto"> <img

                              alt="Anne Hathaway picture"
                              src="dist/img/a-21.png"
                              style={{ margin: "10px 0px 0px 0px", padding: "0px", width: "17px", height: "17px", float: "right" }}
                            />
                            </div>
                          </div>
                        </a>
                      </li> */}
                      {/* end switch accounts*/}

                      {/* settings & privacy */}
                      <li>

                        <Link to="/changePassword" className="d-flex" style={{ padding: "0" }}>
                          <div >
                            <img

                              alt="Anne Hathaway picture"
                              src="dist/img/a-16.png"
                              style={{ margin: "5px 2px 10px 5px", padding: "0px", width: "28px", height: "28px" }}
                            />
                          </div>
                          <div style={{ fontWeight: "500", fontSize: "13px", width: "70%", marginLeft: "3PX", marginTop: "10px", verticalAlign: "middle" }}>Settings & Privacy</div>
                          <div className="ml-auto"> <img

                            alt="Anne Hathaway picture"
                            src="dist/img/a-21.png"
                            style={{ margin: "10px 0px 0px 0px", padding: "0px", width: "17px", height: "17px", float: "right" }}
                          />
                          </div>
                        </Link>
                        {/* Begin*/}

                      </li>
                      {/* end settings & privacy */}
                      

                      {/* help and support */}
                      {/* <li>

                        <Link to="/displayHelp" className="d-flex" style={{ padding: "0" }}>
                          <div>
                            <img

                              alt="Anne Hathaway picture"
                              src="dist/img/a-17.png"
                              style={{ margin: "5px 2px 10px 5px", padding: "0px", width: "28px", height: "28px" }}
                            />
                          </div>
                          <div style={{ fontWeight: "500", fontSize: "13px", width: "70%", marginLeft: "3PX", marginTop: "10px", verticalAlign: "middle" }}>Help & Support</div>
                          <div className="ml-auto"> <img

                            alt="Anne Hathaway picture"
                            src="dist/img/a-21.png"
                            style={{ margin: "10px 0px 0px 0px", padding: "0px", width: "17px", height: "17px", float: "right" }}
                          />
                          </div>
                        </Link>

                      </li> */}
                      {/* end help & support */}



                      {/* logout */}
                      <li>
                       
                       <a
                      className="cta"
                      href="#logout_account"
                      style={{ backgroundColor: "transparent",padding:"0" }}
                    >
                          <div  className="d-flex" style={{ padding: "0" }} onClick={()=>logoutPopup()}>
                            <img

                              alt="Anne Hathaway picture"
                              src="dist/img/a-19.png"
                              style={{ margin: "5px 2px 10px 5px", padding: "0px", width: "28px", height: "28px" }}
                            />
                             <div style={{ fontWeight: "600", fontSize: "13px", width: "85%", marginLeft: "3PX", marginTop: "10px", verticalAlign: "middle" }} >Log Out</div>
                          </div>
                         
                       </a>

                      </li>
                      {/* end logout */}
                    </ul>
                  </nav>
                </a>
                {/* end setting */}
              </div>

            </div>
            {/* End profile dropdown */}
          </li>
 {/* end profile dropdown */}      
        </ul>

      </nav>
      
      <div
        id="logout_account"
        className="modaloverlay edit_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Logout
            </p>
           
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
             
              <p style={{ marginLeft: "5px" }}>
                You are sure you want to logout?
              </p>
            </div>

           

           
            <div className="d-flex mt-4" >

            <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Cancel"
                onClick={() => cancelLogout()}
                style={{
                  borderRadius: "5px",
                
                  color:"rgb(108, 122, 153)",
                  fontWeight:"500",
                  background: "transparent",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
              <input
                type="button"
                className="create_btn"
                id="delete_single_student"
                value="Yes"
                onClick={() => logOutSuccesfull()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgb(108, 122, 153)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
