import React, { useState,useEffect } from "react";
import axios from "axios";
import moment from "moment";


const Previous_next_button = ({data,passEditData,passDeleteData}) => {
 
  const token = localStorage.getItem("Token");
  const [index, setIndex] = useState(0);
  const { ticket_id,requested_by,category,subject,description,image,status,priority,current_date,end_date,message,user_id} = data[index];
//   var studnet_name = [];
//   var startDate ="";
//   var endDate ="";
//   startDate = moment(publish_date).format("DD MMM YYYY");
//   endDate = moment(expire_date).format("DD MMM YYYY");
//   console.log("delivery_type",endDate)
  const prevBtn = () => {
    setIndex((i) => {
      const newIndex = i - 1;
      return loopIndex(newIndex);
    });
  };
  const nextBtn = () => {
    setIndex((i) => {
      const newIndex = i + 1;
      return loopIndex(newIndex);
    });
  };

  const loopIndex = (i) => {
    if (i < 0) {
      return data.length - 1;
    } else if (i > data.length - 1) {
      return 0;
    }
    return i;
  };
  console.log(nextBtn);

  const passNewsEditData =() =>
  {
   
    passEditData(ticket_id);
  }
  const passNewsDeleteData =() =>
  {
    console.log("get poll id",ticket_id)
    passDeleteData(ticket_id);
  }
 
//  async function fetchSignleNews()
//  {
//   const formData = new FormData();
//     formData.append("news_id", ticket_id);
 
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
        

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Category </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{category}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3 " style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Subject </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{subject}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Description </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",  }}>
                    <textarea value={description} style={{width:"100%",height:"100px",border:"none",background: "#e4e9f3"}}></textarea>
                    
                    </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Image </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}><img src={image} style={{width:"70px", height:"70px"}} /></p>
              </div>
             

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" ,paddingRight:"0"}}>Start Date </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",paddingRight:"0" }}>{current_date} </p>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", paddingRight:"0" }}>End Date </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",  paddingRight:"0"}}>{end_date} </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Requested By </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{requested_by} </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Message </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{message} </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" ,paddingRight:"0"}}>Priority </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",paddingRight:"0" }}>{priority} </p>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", paddingRight:"0" }}>Status </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",  paddingRight:"0"}}>{status} </p>
              </div>

           

            
             

        

<div className="d-flex mt-2">


      <button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
      <button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
      </div>
    </div>
  );
};

export default Previous_next_button;
