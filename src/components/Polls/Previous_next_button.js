import React, { useState,useEffect } from "react";
import moment from "moment";

const Previous_next_button = ({data,passEditData,passDeleteData}) => {
  const [index, setIndex] = useState(0);
  const { poll_id,questions,publish_date, expire_date,category,send_to,poll_status,delivery_type ,option_1,option_2,option_3,option_4,option_5,send_to_student} = data[index];
  var studnet_name = [];
  // {console.log("send_to_student",send_to_student)
  const pubDate = moment(publish_date).format("YYYY-MM-DD HH:mm");
  const expDate = moment(expire_date).format("YYYY-MM-DD HH:mm");

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

  const passPollsEditData =() =>
  {
   
    passEditData(poll_id);
  }
  const passPollsDeleteData =() =>
  {
    console.log("get poll id",poll_id)
    passDeleteData(poll_id);
  }
 
 
  return (
    <div>
      {/* <img src={require("../images/Pencil.png")} 
              onClick={passPollsData}
              alt="dropdown" width="18px" height="18px" /> */}

              <div className="d-flex">
             
              <img src={require("../images/Pencil.png")} 
               onClick={passPollsEditData}
               className=" ml-auto preview_edit_img" />

             
                <img src={require("../images/delete.png")}
                   onClick={passPollsDeleteData}
                 alt="dropdown" width="18px" height="18px" />
            
            </div>
    <div>
      
    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Category :</p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>{category}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Question </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {questions}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Answer </p>
                <div className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}> 
                <p>{option_1} </p>
                <p>{option_2} </p> 
                <p>{option_3} </p> 
                <p>{option_4} </p> 
                <p>{option_5} </p> 
                </div>

              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Delivery Type </p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {delivery_type == 1 ?
                "Now":"Later"}</p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Date </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX", }}>: {pubDate} </p>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX",  }}>Expire </p>
                <p className="col-md-3" style={{ color: "black", fontWeight: "600", fontSize: "10PX",  }}>: {expDate} </p>
              </div>

              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Poll Status</p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",  }}>: {poll_status} </p>
              </div>


              <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px 0px 3px" }}>
                <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>User Type</p>
                <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX",}}>: {send_to ==  1 ?
                "All Students":"Specific Recipient"} 
                {/* {
                  send_to == 2 ?
                  (
                    <div className="mt-2">
{
  send_to_student.map((item) =>
  {
  
    console.log("send_to_student",item.student_name)
    studnet_name.push(item.student_name);
    return(
      <div style={{fontWeight:"500"}}>
        {item.student_name}
        </div>
    )
  })
}
                    </div>
                  ):(
                    <div>
                      
                    </div>
                  )
                } */}
                
                </p>
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
