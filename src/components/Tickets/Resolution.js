import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function Resolution({ticket_id,ticketDesc}) {
  const token = localStorage.getItem('Token');
  const [resolution, updateResolution] = useState("");
  const [file, updateFile] = useState("");
  const[data , setData] = useState([]);
  const[errorCode,updateErrorCode] = useState("")
  const [error_message, updateError_message] = useState("");
console.log("iddddddddddddddddddddddddddd",ticket_id)
console.log("ticket description",ticketDesc)

  async function resolve_ticket() {

    try {
        const formData = new FormData();

        formData.append("tid", ticket_id);
        formData.append("description", resolution);
        formData.append("image", file);

        const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_close_ticket",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',

              "Authorization": token,
            }
          });

        console.log("Create Resolution", response);
        updateError_message(response.data.message);
        updateErrorCode(response.data.error_code)
        updateResolution("");
        updateFile("");
      
        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
        }, 5000);

    
    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }

  async function edit_ticket() {

    try {
        const formData = new FormData();
console.log("resoluation ticket",ticket_id)
        formData.append("tid", ticket_id);
        // formData.append("description", resolution);
        // formData.append("image", file);

        const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_edit_ticket_solution",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',

              "Authorization": token,
            }
          });

        console.log("Edit Resolution", response);
        updateError_message(response.data.message);
        updateErrorCode(response.data.error_code)
        updateResolution("");
        updateFile("");
      
        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
        }, 5000);

    
    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }
  

  async function fetchTicket() {
    console.log("Access Token-", token);
    try {
      const formData = new FormData();
console.log("ticket iddddddddddd",ticket_id)
      formData.append("tid", ticket_id);

      const fetchResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_ticket_solution",
      formData, 
      {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get Ticket Solution Details", fetchResponse.data.data);
      fetchResponse.data.data.map((item) =>
      {
        console.log("response",item.description)
      })
      const TicketErrorCode = fetchResponse.data.error_code;
      console.log("Ticket Error Code ", TicketErrorCode);
    
      // if (TicketErrorCode == 200) {
      //   const ticketListArray = fetchResponse.data.data;
      //   console.log("Ticket list Array", ticketListArray);
      //   updateResolution(ticketListArray);
      // }
      // else {
      //   updateResolution([]);

      //   console.log(fetchResponse.data.message);
      // }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <div>
      <p style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "11PX", fontWeight: "600" }}>Resolution</p>
      <div style={{ background: "#e4e9f3", fontWeight: "600", padding: "12px 10px 40px 10px", margin: "7px 3px 0px 3px", color: "#1f3977", fontSize: "10PX" }}>
        <textarea
          id="faqAnswer"
          //  value={ticketDesc}
           onChange={(e) => updateResolution(e.target.value)}
           style={{
            height: "300px", border: "none", background: "#e4e9f3",
            fontWeight: "600", padding: "10px", margin: "7px 3px 0px 0px", color: "grey",
            fontSize: "8PX", width: "100%"
          }} />


      </div>

      <div className="d-flex" style={{ color: "black", fontSize: "11PX", fontWeight: "600", margin: "10px 0px" }}>
        <p>Attachments:</p>
        <p style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "5px" }}>  Attach files and documents related to this ticket</p>
      </div>

      {/* <button style={{background:"#15a312",color:"white",borderRadius:"2px",fontSize:"12PX",padding:"7PX 15PX",border:"none"}}style={{background:"#15a312",color:"white",borderRadius:"2px",fontSize:"12PX",padding:"7PX 15PX",border:"none"}}>Attach Files</button> */}
      <label for="file-upload" style={{
        background: "#15a312", color: "white",
        borderRadius: "2px", fontSize: "12PX", padding: "7PX 15PX",
        border: "none"
      }}>
        Attach Files
      </label>
      <input type="file"
        id="file-upload"
       // value={file}
        onChange={(e) => updateFile(e.target.files[0])}
        style={{ visibility: "hidden" }}
      />

      <div className='d-flex mt-4'>
        <button style={{ background: "white", color: "#1f3977", borderRadius: "2px", fontSize: "14PX", padding: "7PX 15PX", border: "none", marginLeft: "AUTO", fontWeight: "600" }}>Cancel</button>
        <button style={{ background: "#1f3977", color: "white", borderRadius: "6px", fontSize: "14PX", padding: "12PX 35PX", border: "none", boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "600" }}
        onClick={resolve_ticket}
        >Submit</button>
      </div>
      <div style={{fontWeight:"500",fontFamily:"Poppins",fontSize:"11px",marginTop:"10px"}} >
                {
                 errorCode == 200 ?
                 (
                    <div className="d-flex formSuccess">
                      <img src={require('../images/correct.png')}style={{width:"18px"}}/>
                      <p style={{color:"green"}}>{error_message}</p>
                      </div>
                 ) : errorCode == 406 ?
                 (
                   <div className="d-flex formSuccess">
                     <img src={require('../images/wrong.jpg')} style={{width:"18px"}}/>
                     <p style={{color:"red"}}>Please Enter Some Resolution..</p>
                   </div>
                 ): errorCode == 409 ?
                 (
                  <div className="d-flex formSuccess">
                  <img src={require('../images/wrong.jpg')} style={{width:"15px"}}/>
                  <p style={{color:"red"}}>{error_message}</p>
                </div>
                 ):
                 ""
                            
              }
                {/* {ErrorMessage} */}
              </div>
    </div>
  )
}
