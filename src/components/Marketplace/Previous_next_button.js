import React, { useState,useEffect } from "react";
import axios from "axios";
import moment from "moment";


export function Previous_next_button({data,passEditData,passDeleteData}) 
{
    const token = localStorage.getItem("Token");
    const [index, setIndex] = useState(0);
 
    const {marketplace_id,title,description,image,price,send_to,sku,manage_sku,m_info} = data[index];

    // var optionName ="";
    // var optionValue = "";
    // m_info.map((item) =>
    // {
    //     optionName = item.title
    //     optionValue = item.value
    // })
var photo = []
    image.map((imgItem) =>
    {
        photo.push(imgItem.imgs)
        console.log("get photo",photo)
    })
    
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
     
      passEditData(marketplace_id);
    }
    const passNewsDeleteData =() =>
    {
      
      passDeleteData(marketplace_id);
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
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Title </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: {title}</p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Description </p>
      <p className="col-md-9" style={{display:"flex",alignItems:"center", color: "black", fontWeight: "600", fontSize: "10PX" }}>: {<p style={{marginLeft:"3px"}}  dangerouslySetInnerHTML={{ __html:description}} />} </p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Images </p>
      <p className="col-md-9 d-flex" style={{ color: "black", fontWeight: "600", fontSize: "10PX",height:"100px",overflowY:"AUTO" }}>: 
       {/* {photo.map((item) =>
      {
        return(
            <div >
                <img src ={item} style={{width:"25px", height:"25px",margin:"0 5px"}}/>
            </div>
        )
      })} */}
      
      
      <span style={{marginLeft:"10px"}}>
      {photo == "" ?
      (
        <div>
            <img src={require("../images/no_image.png")} alt="no image" style={{width:"25px", height:"25px"}}/>
        </div>
      ):(
        <div>
            {
                photo.map((item) =>
                {
                    return(
<img src={item} 
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
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Price </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {price}</p>
    </div>


    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>User Type </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  
      {
      send_to == 1 ? 
      "All Students":
      "Specific Students"
      }</p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>SKU </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  {sku}</p>
    </div>

    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      {/* <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Manage SKU </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>:  
      {
      manage_sku == 1 ? 
      "Track Quantity":
      "Continue selling when out of stock"
      }</p> */}


<div className="d-flex">
                      <input
                        type="radio"
                        id="track quantity"
                        name="track_info"
                        value="1"
                        checked={manage_sku == 1}
                        // onChange={(e) => updateSkuValue(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="track quantity"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      //  onClick={() => all_student()}
                      >
                        <p style={{ marginLeft: "5px",fontSize:"10PX" }}>Track Quantity</p>
                      </label>
                      <input
                        type="radio"
                        id="continue selling"
                        name="track_info"
                        value="2"
                    
                        checked={manage_sku == 2}
                        // onChange={(e) => updateSkuValue(e.target.value)}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="continue selling"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4PX",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      // onClick={() => specific_class()}
                      >
                        <p style={{ marginLeft: "8px" ,fontSize:"10px"}}>Continue selling when out of stock</p>
                      </label>
                    </div>

    </div>

    {m_info.map((item) =>
      {
        return(
          <div>
          <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Option Name </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: {item.title}</p>
    </div>


    <div className="row" style={{ background: "#e4e9f3", padding: "7px", margin: "7px 3px" }}>
      <p className="col-md-3" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "600", fontSize: "10PX" }}>Option Value </p>
      <p className="col-md-9" style={{ color: "black", fontWeight: "600", fontSize: "10PX" }}>: {item.value}</p>
    </div>
            </div>
        )
      })}
   


  
   

  </div>

<div className="d-flex mt-2">


<button onClick={prevBtn} style={{color:"#1F3977",border:"none",background:"white",fontSize:"12px"}}>Previous</button>
<button onClick={nextBtn} style={{color:"#1F3977",border:"none",background:"white",marginLeft:"AUTO",fontSize:"12px"}}>Next</button>
</div>
</div>
  )
}



