import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery"
import { Header } from "../Header"
import { Menu } from "../Menu"
import { Link, useLocation } from "react-router-dom";

export function Club(props) {

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState([]);
  console.log("PICTURES",picture)
var eventImage =[]


  const getImage = (e) => {
   
    $(".event_image").hide();
  
    

    if (e.target.files.length > 0) {
      for (let i = 0 ; i < e.target.files.length ; i++) {
  
        eventImage.push(e.target.files[i])
       
        setPicture(eventImage)
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
    //     const atasi = src.substring(5)
    //  console.log("Atasi",atasi)
        imgData.push(src)
  }
    }}

  const location = useLocation();
  
  const { getgroupid } = location.state || { id: "none" };

// console.log("Group Id in club form", groupID)
console.log("passed data",getgroupid)
  const token = localStorage.getItem('Token');
  const [data, setData] = useState([]);

  async function fetchList() {
    console.log("Access Token-", token);
    try {
      const formData = new FormData();

      formData.append("group_id", getgroupid);

      const fetchResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_single_group",
      formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get single group details", fetchResponse.data.data);
      setData(fetchResponse.data.data)
      // const GroupErrorCode = fetchResponse.data.error_code;
      // console.log("Group Error Code ", GroupErrorCode);

      // const GroupErrorMsg = fetchResponse.data.message;
      // console.log("Group Error msg ", GroupErrorMsg);


      // if (GroupErrorCode == 200) {
      //   const groupListArray = fetchResponse.data.data;
      //   console.log("Get single group details", groupListArray);
      //   setData(groupListArray);
      // }
      // else {
      //   setData([]);

      //   console.log(fetchResponse.data.message);
      //   $(".alert-danger").show();
      //   setTimeout(function () {
      //     $(".alert-danger").hide();
      //   }, 3000);
      // }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

 
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex">

      
      <Menu />
      <div className='content-wrapper'>

{data.map((item) =>
{
  return(
    <div className="preview_form mt-2" style={{ background: "white" }}>

    {/* header */}
    <div style={{ background: "#f5f5f5", border: "0.2px solid #e7e5e5" }} className="row">

      <div className='col-md-1 d-flex' style={{ padding: "7px 0" }}> 

      <img src={item.group_icon} alt="dropdown" style={{ width: "50px", height: "50px" ,marginLeft:"10px",textAlign:"center",alignItems:"center",justifyContent:"center"}} /></div>

      <div className='col-md-7' style={{ }}>
        <p style={{ fontSize: "15PX", fontWeight: "600", marginTop: "20PX" }}>{item.group_name}</p>
        <div className='d-flex'>
          <p style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "13PX", fontWeight: "600" }}>{item.type == 1?"Public":"Private"} Group</p>
          <p style={{ marginLeft: "5px" }}>*</p>
          <p style={{ color: "#15a312", fontSize: "13PX", fontWeight: "500", marginLeft: "5PX" }}>{item.group_member_count} members</p>
        </div>

      </div>

      <div className='col-md-4 d-flex ' style={{alignItems:"center",justifyContent:"end"}} >
      {/* style={{padding:"0",justifyContent:"center",alignItems:"center"}}  */}
      <div className="d-flex">
      <Link to="/listOfCommunity" >
          <img src="dist/img/Settings.png" alt="dropdown" style={{ width: "25px", height: "25px"}} className="ml-auto" />
        </Link>
        </div>
        <div> 
          <p style={{transform:"scaleY(2.9)",margin:"20px",color:"#4AA081"}}>|</p>
        </div>
       
      <div className=' d-flex '>
      {/* style={{justifyContent:"center",alignItems:"center"}} */}
        {/* button */}
        <div style={{ marginTop: "0px", padding: "0" }} >

          <Link to="/invite">


            <button
              type="button"
              className="d-flex publish_button"
              defaultValue="Sign Up"
              style={{ alignItems:"center",justifyContent:'center' }}
            >              
              Invite
            </button>

          </Link>

        </div>
      </div>
      </div>
    </div>

    {/* description */}
    <div style={{ background: "#f5f5f5", border: "0.2px solid #f5f5f5" }} className="row mt-2 ">

      <div className="col-md-6" style={{ border: "0.2px solid #e7e5e5", padding: "15px" }}><p style={{ color: "#1f3977", fontWeight: "600", fontSize: "13px" }}>Description</p>
        <p style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "12PX", fontWeight: "500", marginTop: "8px" }}>  {<p style={{marginLeft:"3px"}}  dangerouslySetInnerHTML={{ __html:item.description}} />}</p>
      </div>

      <div className="col-md-6" style={{ padding: "15px", border: "0.2px solid #e7e5e5" }}>
        <p style={{ color: "#1f3977", fontWeight: "600", fontSize: "13px" }}>Activity</p>

        <div className='row mt-2'>
          <div className='col-md-6 p-0'>
            <p style={{ fontSize: "13PX", fontWeight: "600" }}>04 new post today</p>
            <p style={{ fontSize: "11PX", fontWeight: "400", color: "rgba(0, 0, 0, 0.5)" }}>102 posts in the last month</p>
          </div>
          <div className='col-md-6'>
            <p style={{ fontSize: "13PX", fontWeight: "600" }}>{item.group_member_count} Total Members</p>
            <p style={{ fontSize: "11PX", fontWeight: "400", color: "rgba(0, 0, 0, 0.5)" }}>7 New members in the last week</p>
          </div>
        </div>
      </div>



    </div>


    <div style={{ background: "white", border: "0.2px solid #e7e5e5",marginBottom:"40px" }} className="row mt-2">
      {/* create post */}
      <p style={{ color: "#1f3977", fontSize: "14PX", fontWeight: "600", marginTop: "15PX" }}>Create Post</p>

      <div className='row mt-2' style={{ border: "0.5px solid #f5f5f5", borderRadius: "12px", padding: "10px", marginLeft: "10px", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)", width: "80%" }}>
        <div className='col-md-7'>

          <div className='d-flex'>
            <div className='' style={{ padding: "0PX"}}>
              <img src={item.group_icon} alt="dropdown" style={{ width: "40px", height: "40px" }} />
            </div>
            <div className='' style={{ paddingLeft: "10PX" }}>
              <p style={{ fontSize: "15PX", fontWeight: "600", marginTop: "10PX" }}>{item.group_name}</p>


            </div>
          </div>

          <div className='row mt-2' >
            <div className='col-md-12' style={{ padding: "0" }}>
              <textarea
                type="name"
                rows="4"
                id="news_description"
                // value={newsContent}
                // onChange={(e) => updateNewsContent(e.target.value)}
                placeholder="Write something on Math Club.."
                style={{ paddingLeft:"5px",width: "100%", height: "80px", border: "0.5px solid #c4c4c4", boxSizing: "border-box" }}

              />
            </div>
          </div>



        </div>

        <div class="col-md-5" style={{ padding: "0 50px 0px 10px" }}>
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
               

                  <label for="file-ip-1" >
                    <img src="dist/img/club_photo.png" className="event_image" alt="dropdown" style={{ height: "100px" }} 
                    // onClick={() => event_image()} 
                    />
                    <div className="d-flex multipleImages" id="file-ip-1-preview" style={{width:"100%"}}>
            {
    imgData.map((item) =>
    {
      return(
<div style={{width:"70px",height:"50px"}}>
<img src={item} className="event_form_image"/>
</div>
      )
     
    })
  }
</div>
                  </label>
                   
            

                  <input type="file" name="photo"
                    style={{ visibility: "hidden" }}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={getImage}
                    multiple
                    id="file-ip-1" />



                </div>
              </div>

        {/* <div className='col-md-5'>
          <div style={{ padding: "30px", background: "rgba(196, 196, 196, 0.3)", borderRadius: "5px", marginTop: "10PX" }}>
            <img src="dist/img/club_photo.png" alt="dropdown" style={{ width: "100px", height: "100px", marginLeft: "40px" }} />
            <div>
            </div>
          </div>

        </div> */}





        <Link to="/club" className='d-flex mt-4'>


          <button
            type="button"
            className="d-flex buttonContainer news-button"
            defaultValue="Sign Up"

            style={{ padding: "8px 40px", marginLeft: "auto", marginTop: "0", background: "#1F3977", flexWrap: "wrap", borderRadius: "6px", height: "auto", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
            <div style={{ marginLeft: "5px", fontSize: "12.25PX", fontWeight: "400", fontFamily: "Poppins" }}>Post</div>
          </button>

        </Link>




      </div>


      {/* previous post */}
      <p style={{ color: "#1f3977", fontSize: "14PX", fontWeight: "600", margin: "20px 0PX 10px 0px" }}>Previous Posts</p>

      <div className='mt-1' style={{ border: "1px solid #f5f5f5", borderRadius: "12px", padding: "0px 0 20px 0", margin: "0 20px 0 10px", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)", width: "80%", marginBottom: "20px" }}>
        <div className='d-flex' style={{ margin: "12px 0px 0px 8px" }}>
          <div style={{ borderRadius: "50%", width: "40px", height: "40px", padding: "0" }}>
            <img src={require('../images/boy.jpg')} alt="dropdown" style={{ borderRadius: "50%" }} />
          </div>
          <div className='' style={{ paddingLeft: "10PX" }}>
            <p style={{ fontSize: "15PX", fontWeight: "600", marginTop: "2PX" }}>Renu Kumari</p>
            <p style={{ fontSize: "12px", color: " rgba(0, 0, 0, 0.7)", fontWeight: "500" }}>8 hours ago</p>
          </div>
        </div>

        <div className='mt-2'>
          <p style={{ fontSize: "13px", fontWeight: "500", marginLeft: "10PX" }}>Will you be able to solve this puzzle?</p>
        </div>

        <div className='mt-2'>
          <img src="dist/img/puzzle.png" />
        </div>

        <div className='d-flex' style={{ borderBottom: "0.2px solid #e7e5e5", padding: "10px", margin: "0 10px" }}>
          <img src="dist/img/Heart.png" style={{ width: "19px", height: "19px" }} className="ml-auto" />
          <p style={{ fontSize: "12px", fontWeight: "500", marginLeft: "8px" }}>21</p>
          <p style={{ fontSize: "12px", fontWeight: "500", marginLeft: "50px" }}>12</p>
          <p style={{ fontSize: "12px", fontWeight: "500", marginLeft: "8PX" }}>Comments</p>
        </div>

        <div style={{ padding: "15px 15px 15px 20px",height:"200px",overflowY:"auto" }}>

          {/* first comment */}
          <div className="d-flex mt-2" style={{width:"60%"}}>


            <div >
              <img src={require("../images/avatar2.png")} alt="dropdown" style={{ borderRadius: "50%", width: "40px", height: "40px", marginTop: "8PX" }} />
            </div>


            <div className='' style={{ padding: "0",marginLeft:"10px",width:"100%"}}>
              <div style={{ background: "rgba(196, 196, 196, 0.2)", borderRadius: "4PX", padding: "5px 0px 10px 10px", border: "1px solid #f5f5f5" }}>
                <p style={{ color: "#2d5dd0", fontSize: "13PX", fontWeight: "600" }}>Meera Rauniyar</p>
                <p style={{ fontSize: "14PX", fontWeight: "500" }}>7*6+8=42+8=50</p>
              </div>

            </div>

          </div>

          <div className="d-flex" style={{ padding: "0",width:"60%" }}>
              <p style={{ marginLeft: "auto", color: "rgba(0, 0, 0, 0.7)", fontSize: "11PX", fontWeight: "600" }}>Hide comment</p>
            </div>



          {/* 2nd comment */}
          <div className="d-flex mt-2" style={{width:"60%"}}>

            <div >
              <img src={require("../images/avatar5.png")} alt="dropdown" style={{ borderRadius: "50%", width: "40px", height: "40px", marginTop: "8PX" }} />
            </div>

            <div className='' style={{ padding: "0",marginLeft:"10px",width:"100%"}}>
              <div style={{ background: "rgba(196, 196, 196, 0.2)", borderRadius: "4PX", padding: "5px 0px 10px 10px", border: "1px solid #f5f5f5" }}>
                <p style={{ color: "#2d5dd0", fontSize: "13PX", fontWeight: "600" }}>Jean Robertson</p>
                <p style={{ fontSize: "14PX", fontWeight: "500" }}>50</p>
              </div>

            </div>
          </div>

       

            <div className="d-flex" style={{ padding: "0",width:"60%" }}>
              <p style={{ marginLeft: "auto", color: "rgba(0, 0, 0, 0.7)", fontSize: "11PX", fontWeight: "600" }}>Hide comment</p>
            </div>
        


        </div>

      </div>






    </div>
  </div>
  )
})}
       
      </div>
      </div>
    </div>
  )
}
