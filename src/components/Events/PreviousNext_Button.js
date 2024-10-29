import React, { useState,useEffect } from "react";
import axios from "axios";


export function PreviousNext_Button({data,passEditData,passDeleteData}) 
{
    const token = localStorage.getItem("Token");
  const [index, setIndex] = useState(0);
  const { event_id,send_to,location,label,start_date,end_date,start_time,end_time,entry_fee,capacity,url,description,image,send_to_student} = data[index];


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
 

  const passNewsEditData =() =>
  {
   
    passEditData(event_id);
  }
  const passNewsDeleteData =() =>
  {
   
    passDeleteData(event_id);
  }
 
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
    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Event Title </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {label}</p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Event Image </p>
      <p className="col-md-9 d-flex" style={{ color: "black", fontWeight: "600", fontSize: "10PX",height:"200px",overflowY:"auto" }}>:  
      <span>
      {image == "" ?
      (
        <div>
            <img src={require("../images/no_image.png")} alt="no image" style={{width:"25px", height:"25px"}}/>
        </div>
      ):(
        <div>
            {
                image.map((item) =>
                {
                    return(
<img src={item.image} 
                  alt="event" 
                  style={{width:"25pxpx", height:"25px"}}/>
                    )
                  
                })
            }
        </div>
      )
      }
      </span>
      </p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Location </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {location} </p>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", marginLeft: "0px", }}>Capacity </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {capacity} </p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Event Date </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {start_date} </p>
    
    </div>





    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Entry Fee </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {entry_fee} </p>
     
    </div>


    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Ticket URL </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {url}</p>
    </div>

  
    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Start Time </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {start_time} </p>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", marginLeft: "0px", }}>End Time </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {end_time} </p>
    </div>



    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Description </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX", }}>: {description} </p>

    </div>

  </div>

<div className="d-flex mt-2">


<button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
<button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
</div>
</div>
  )
}

