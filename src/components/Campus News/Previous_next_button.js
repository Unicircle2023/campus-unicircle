import React, { useState,useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Description } from "@material-ui/icons";


const Previous_next_button = ({viewData, passEditData,passDeleteData}) => {
 
  const token = localStorage.getItem("Token");
 
  // var startDate ="";
  // var endDate ="";
  // startDate = moment(publish_date).format("DD MMM YYYY");
  // endDate = moment(expire_date).format("DD MMM YYYY");

  // console.log("delivery_type",endDate)
  // const prevBtn = () => {
  //   setIndex((i) => {
  //     const newIndex = i - 1;
  //     return loopIndex(newIndex);
  //   });
  // };
  // const nextBtn = () => {
  //   setIndex((i) => {
  //     const newIndex = i + 1;
  //     return loopIndex(newIndex);
  //   });
  // };

  // const loopIndex = (i) => {
  //   if (i < 0) {
  //     return news.length - 1;
  //   } else if (i > news.length - 1) {
  //     return 0;
  //   }
  //   return i;
  // };
  // console.log(nextBtn);

  const passNewsEditData =() =>
  { 
    viewData.map((e)=>{
      passEditData(e.news_id);
    })
   
  
  }
  const passNewsDeleteData =() =>
  {
    viewData.map((e)=>{
      passDeleteData(e.news_id);
    })
   
  }
 
//  async function fetchSignleNews()
//  {
//   const formData = new FormData();
//     formData.append("news_id", news_id);
 
//     const editNewsResponse = await axios.post(
//       process.env.REACT_APP_API_KEY + "get_good_news",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//       }
//     );
//     console.log("Edit news response", editNewsResponse.data.data);
//  }

//  useEffect(() => {
//   fetchSignleNews();

// }, []);
 
  return (
   
    <div>
              

              <div className="d-flex">
             
              <img src={require("../images/Pencil.png")} 
               onClick={passNewsEditData}
               alt="dropdown" width="18px" height="18px" className=" ml-auto" />

             
                <img src={require("../images/delete.png")}
                   onClick={passNewsDeleteData}
                 alt="dropdown" width="18px" height="18px" />
               </div>

         <div>
                     
              {viewData.map((e)=>{
                return(
                  <>
                  <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                  <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Title </p>
                  <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {e.news_title}</p>
                </div>
 
                <div className="row preview_description" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Description </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",display:"flex",
                      }}>:  {<p style={{marginLeft:"10px"}}  dangerouslySetInnerHTML={{ __html:e.news_description}} />}  </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Delivery Type </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  
                {
                e.delivery_type === 1 ? 
                "Now":
                "Later"
                }</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" ,paddingRight:"0"}}>Publish Date </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",paddingRight:"0" }}>: {e.publish_date} </p>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", paddingRight:"0" }}>Expiry Date </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",  paddingRight:"0"}}>: {e.expire_date} </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>User Type</p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {e.send_to === 1? "All studnets":"Specific Recipient"}
               
                
                </p>
              </div>

              </>
                )
              })}

       </div> 

      {/* <div className="d-flex mt-2">


      <button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
      <button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
      </div> */}
    </div>
  );

};

export default Previous_next_button;
