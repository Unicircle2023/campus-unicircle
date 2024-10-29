import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillSquareFill } from "react-icons/bs"
import { IoAnalyticsOutline } from "react-icons/io5"
import { IoIosPersonAdd } from "react-icons/io"
import { FiMail } from "react-icons/fi";
import moment from "moment";


export function IncomingTicket() {
  const token = localStorage.getItem('Token');
  const [data, setData] = useState([]);



  async function fetchList() {
    console.log("Access Token-", token);
    try {

      const fetchTicketResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_all_ticket",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get Ticket Details", fetchTicketResponse);

      const ticketData = fetchTicketResponse.data.data;
      console.log("Ricket List ", ticketData);
      setData(ticketData);


    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  useEffect(() => {


    fetchList();
  }, []);



  return (
    <div className="content-wrapper" style={{ background: "#ebedef" }}>
      <a href="/ticketsDashboard" >
        <div className="d-flex" style={{ padding: "0", margin: "0" }}>
          <i className="fa fa-angle-double-left" style={{ color: "black", margin: "0px 0px 0px 10px", fontSize: "24px", padding: "0" }} />
          <p style={{ fontSize: "12px", color: "black", margin: "0px", padding: "5px" }}>Back</p>
        </div>
      </a>

      <div className="d-flex" style={{ margin: "20px" }}>
        <div>
          <h4 style={{ color: "black", fontWeight: "bold", marginTop: "0" }}>
            TICKETS
          </h4>
          <div style={{ fontSize: "11PX", color: "darkgrey" }}>
            Create customizable badges to award any kind of skill, achievement or accomplishment you can think
          </div>
        </div>
      </div>



      <div className="d-flex" style={{ width: "100%" }}>
        <div style={{ width: "80%", marginLeft: "20px" }}>
          <section className="">

            <div className="container-fluid" style={{ padding: "0px" }}>
              <div className="row" style={{ margin: "0px", background: "transparent" }}>
                {
                  data.map((item, index) => {

                    // var curr_date = item.current_date;
                    // var end_date = item.end_date;

                    // var curr_date = moment('02-01-2021', 'DD-MM-YYYY');
                    // var end_date = moment('12-01-2021', 'DD-MM-YYYY');

                    var curr_date = moment(item.current_date, 'DD-MM-YYYY');
                    var end_date = moment(item.end_date, 'DD-MM-YYYY');
                    var result = end_date.diff(curr_date, 'days')

                    console.log("result", result);


                    return (
                      <div className="col-md-12 col-6" style={{ height: "100%", padding: "0px 5px 5px 0px", borderLeft: "4px solid #a3aeb8" }}>
                        <div className="small-box d-flex" style={{ border: "none", boxShadow: "none", width: "100%" }}>
                          <div style={{ width: "10%", marginLeft: "10px", marginTop: "20PX" }}>

                            <input type="checkbox" />


                          </div>
                          <div style={{ width: "10%", padding: "10px" }}>

                            <div style={{ fontWeight: "500", border: "1px solid #d3eac7", fontSize: "10px", color: "#bfd0ae", padding: "15px 20px", borderRadius: "10PX", background: "#d3eac7" }}>
                              <p>{item.uid[0]}</p>
                            </div>


                          </div>

                          <div style={{ width: "100%", marginLeft: "20px" }}>

                            <div style={{ fontWeight: "500", fontSize: "15px", color: "black", marginTop: "5px" }} className="d-flex">
                              <p>{item.subject}?</p>
                              <p style={{ color: "grey", marginLeft: "5px" }}>#{item.ticket_id}</p>
                            </div>

                            <div style={{ fontWeight: "500", marginTop: "5px", fontSize: "13px" }} className="d-flex">
                              <FiMail style={{ marginTop: "2PX" }} />  <p style={{ marginLeft: "5PX" }}>{item.uid} </p>
                              <p style={{ color: "grey", marginLeft: "5px" }}> . {item.message}.</p>
                              {/* <p style={{ color: "grey", marginLeft: "5PX" }}> */}

                                {result > 0 ?
                                  <div style={{ color: "grey",marginLeft: "5PX"}}>
                                     Due in {result} days
                                  </div> :
                                  <div style={{ color: "red",marginLeft: "5PX", }}>
                                     Ticket Expired
                                  </div>
                                }

                                {/* Due in {result} days</p> */}
                            </div>
                          </div>

                          <div style={{ width: "40%", marginLeft: "AUTO" }}>

                            <h5 style={{ fontWeight: "500", fontSize: "15px", color: "black", marginTop: "5px", marginLeft: "3PX" }}>
                              <BsFillSquareFill style={{ fontSize: "10PX", color: "#acd578", marginRight: "7px" }} />
                              <select name="cars" style={{ border: "none" }}>
                                <option selected value="Low" style={{ border: "none",  outline: "0px" }}>Low</option>
                                <option value="Urgent" style={{ border: "none",  outline: "0px" }}>Urgent</option>
                                <option value="Medium" style={{ border: "none",  outline: "0px" }}>Medium</option>
                              </select>
                            </h5>

                            <h5 style={{ fontWeight: "bold", marginTop: "5px", fontSize: "13px", color: "grey" }}>
                              <IoIosPersonAdd style={{ fontSize: "15PX", marginRight: "5px" }} />
                              -- / --
                            </h5>
                            <h5 style={{ fontWeight: "bold", marginTop: "5px", fontSize: "13px", color: "grey" }}>
                              <IoAnalyticsOutline style={{ fontSize: "15PX", marginRight: "5px" }} />
                              <select name="priority" style={{ border: "none" }}>
                                <option selected value="Unread" style={{ border: "none", outline: "0px" }}>Unread</option>
                                <option value="Open" style={{ border: "none",  outline: "0px" }}>Open</option>
                                <option value="Close" style={{ border: "none",  outline: "0px" }}>Close</option>
                                <option value="Onhold" style={{ border: "none", outline: "0px" }}>Onhold</option>
                              </select>
                            </h5>
                          </div>
                        </div>
                      </div>
                    )
                  })}

              </div>

            

            </div>

          </section>
        </div>
        {/* right part */}
        <div style={{ width: "20%", marginTop: "10px", padding: "20px" }}>
          <div style={{ background: "#f6f7f9", margin: "5px 0px", padding: "10px" }}>
            <img
              src="dist/img/ticket_award.png"
              alt="trophy"
              style={{ width: "40px", height: "50px" }}
            />

            <p style={{ fontSize: "10px", marginTop: "10px", color: "#adb6cd", fontWeight: "BOLD" }}>
              Digital badges are customizable digital credential that can be
              awarded to students at anytime.
            </p>
          </div>

          <div style={{ background: "#f6f7f9", margin: "5px 0px", padding: "10px" }}>
            <img
              src="dist/img/ticket_badge.png"
              alt="trophy"
              style={{ width: "40px", height: "40px" }}
            />

            <p style={{ fontSize: "10px", marginTop: "10px", color: "#adb6cd", fontWeight: "BOLD" }}>
              Give your students the status symbol they crave.Recognize their
              accomplishments with digital badges and triple their lifetime value
            </p>
          </div>

          <div style={{ background: "#f6f7f9", margin: "5px 0px", padding: "10px" }}>
            <img
              src="dist/img/ticket_notes.png"
              alt="trophy"
              style={{ width: "40px", height: "50px" }}
            />

            <p style={{ fontSize: "10px", marginTop: "10px", color: "#adb6cd", fontWeight: "BOLD" }}>
              Boost students carrer prospects with trusted,verifiable credentials
              that help learners be seen and shared.
            </p>
          </div>
        </div>
        {/* end right part */}



      </div>


    </div>
  )
}
