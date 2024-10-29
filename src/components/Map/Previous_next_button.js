import React, { useState,useEffect } from "react";
import axios from "axios";
import {moment} from "moment";

const Previous_next_button = ({data,passEditData,passDeleteData}) => {

  const [index, setIndex] = useState(0);
  const {map_id,latitude,longitude,title} = data[index];


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

  const passAppointmentEditData =() =>
  {
   
    passEditData(map_id);
  }
  const passAppointmentDeleteData =() =>
  {
    console.log("get poll id",map_id)
    passDeleteData(map_id);
  }
 

  return (
    <div>
     

              {/* <div className="d-flex">
             
              <img src={require("../images/Pencil.png")} 
               onClick={passAppointmentEditData}
               alt="dropdown" width="18px" height="18px" className=" ml-auto" />

             
                <img src={require("../images/delete.png")}
                   onClick={passAppointmentDeleteData}
                 alt="dropdown" width="18px" height="18px" />
            
            </div> */}
    <div>
      
    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Title </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{title}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Latitude </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: {latitude}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Longitude </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: {longitude}</p>
              </div>
            

           

            </div>

<div className="d-flex mt-2">


      <button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
      <button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
      </div>
    </div>
  );
};

export default Previous_next_button;
