import React, { useState,useEffect } from "react";
import axios from "axios";

export  function PreviousNext_Button_past({pastEvent,passEditDataPast,passDeleteDataPast}) 
{
    // const token = localStorage.getItem("Token");
    const [index, setIndex] = useState(0);
    const { event_id,send_to,location,label,start_date,end_date,start_time,end_time,entry_fee,capacity,url,description,image,send_to_student} = pastEvent[index];
   
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
        return pastEvent.length - 1;
      } else if (i > pastEvent.length - 1) {
        return 0;
      }
      return i;
    };
   
  
    const passNewsEditData =() =>
    {
     
        passEditDataPast(event_id);
    }
    const passNewsDeleteData =() =>
    {
    
      passDeleteDataPast(event_id);
    }
  return (
    <div>
     

    <div className="d-flex">
    <div style={{fontSize:"12PX", color:"#1F3977",fontWeight:"600"}}>Past Events</div>
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
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: <span style={{marginLeft:"10px"}}>{label}</span></p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Event Image </p>
      <p className="col-md-9 d-flex" style={{ color: "black", fontWeight: "600", fontSize: "10PX" ,height:"100px",overflowY:"auto" }}>:  
      <span style={{marginLeft:"10px"}}>
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
                  style={{width:"25px", height:"25px",margin:"0 5px"}}/>
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
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: <span style={{marginLeft:"10px"}}>{location}</span> </p>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", marginLeft: "0px", }}>Capacity </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: <span style={{marginLeft:"10px"}}>{capacity}</span> </p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Event Date </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: <span style={{marginLeft:"10px"}}>{start_date}</span> </p>
    
    </div>





    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Entry Fee </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: <span style={{marginLeft:"10px"}}>{entry_fee}</span> </p>
     
    </div>


    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Ticket URL </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{url}</p>
    </div>

  
    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Start Time </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: <span style={{marginLeft:"10px"}}>{start_time}</span> </p>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX", marginLeft: "0px", }}>End Time </p>
      <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: <span style={{marginLeft:"10px"}}>{end_time} </span></p>
    </div>



    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Description </p>
      <p className="col-md-9" style={{display:"flex", alignItems:"center", color: "black", fontWeight: "600", fontSize: "10PX", }}>: {<p style={{marginLeft:"10px"}} dangerouslySetInnerHTML={{ __html:description}} />}</p> 

    </div>

  </div>

<div className="d-flex mt-2">


<button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
<button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
</div>
</div>
  )
}
