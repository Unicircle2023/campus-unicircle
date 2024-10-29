import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
export function CampusEvents() {
  var Cevent = "";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [selectedMonthPrev, setSelectedMonthPrev] = useState(13);
  const d = new Date();
  const [currYear, setCurrYear] = useState(d.getFullYear());

  const currMonth = moment(d).format("MMMM");
  const [month, updateMonth] = useState(currMonth);

  const token = localStorage.getItem("Token");
  const [event, updateEvent] = useState([]);
  const [error_code, updateError_code] = useState("");
  const [error_message, updateError_message] = useState("");

  const currentDate = new Date();
  const [currentMonth1, setCurrentMonth1] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  var eNow = new Date();
  var eMoment = moment(eNow);

  var lastYear = eMoment.format("YYYY") - 1;

  var nextyear = moment()
    .add(1, "years")
    .format("YYYY");

  var eventList = "";
  var eventList_prev = "";

  async function nextClick() {
    let s_month = selectedMonth + 1;
    let c_year = currYear;

    let currentData = monthNames[s_month - 1];

    updateMonth(currentData);
    if (s_month == 13) {
      updateMonth("January");
    }
    if (s_month == 13) {
      s_month = 1;
      c_year = c_year + 1;

      setCurrYear(c_year);
    }

    let result_month = monthNames[s_month - 1];
    let result_year = c_year;
    eventList = result_month + "," + " " + result_year;

    setSelectedMonth(s_month);

    fetchList(eventList);
  }

  async function prevClick() {
    let s_month = selectedMonth - 1;
    console.log("selected_month", s_month);
    let c_year = currYear;
    let currentData = monthNames[s_month - 1];

    updateMonth(currentData);

    if (s_month <= 0) {
      s_month = 12;
      c_year = c_year - 1;
      setCurrYear(c_year);
    }

    console.log("dateTest Month:", monthNames[s_month - 1]);
    console.log("dateTest Year:", c_year);

    let result_month = monthNames[s_month - 1];
    let result_year = c_year;
    eventList = result_month + "," + " " + result_year;

    console.log("date result:", eventList);

    setSelectedMonth(s_month);

    fetchList(eventList);
  }

  async function fetchList(data) {

    try {
      updateEvent([]);
      const formData = new FormData();
      formData.append("month", data);
      const fetchResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_monthwise_event_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      // console.log("momthwise events-------------",fetchResponse);
      updateError_message(fetchResponse.data.message);
      updateError_code(fetchResponse.data.error_code);
      if(fetchResponse.data.error_code == 200){
        updateEvent(fetchResponse.data.data);
      }else{
        updateEvent([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  useEffect(() => {
    let data = monthNames[selectedMonth - 1] + ", " + currYear;
    // fetchList(data);
    let t_string = (currentMonth1+1) + "," + currentYear;
    fetchList(t_string);
  }, []);

  function set_d_prv() {

    if (currentMonth1 === 0) {
      let yyy = currentYear - 1;
      setCurrentYear(yyy);
      setCurrentMonth1(11);
      fetchList((currentMonth1) + "," + currentYear);

    }else{
    let mmm = currentMonth1 - 1;
    setCurrentMonth1(mmm);
    fetchList((currentMonth1) + "," + currentYear);
  }}

  function set_d_nxt() {
    if (currentMonth1 == 11) {
      setCurrentMonth1(0);
      let yy = currentYear + 1;
      setCurrentYear(yy);

      fetchList((currentMonth1+2) + "," + currentYear)
    } else {
      let mm = currentMonth1 + 1;
      setCurrentMonth1(mm);
      fetchList((currentMonth1+2) + "," + currentYear)
    }
  }

  const monthName = new Date(currentYear, currentMonth1).toLocaleString(
    "default",
    { month: "long" }
  );
  return (
    <>

              <div
                className="col-md-12 p-0"
                style={{
                  height: "100%",
                  marginTop: "10PX",
                }}
              >
                <div
                  className="small-box "
                  style={{
                    padding: "0px",
                    minHeight:"190px",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                    borderRadius: "0px 0px 5px 5px",
                  }}
                >
                  <div className="">
                    <div>
                      <div
                        style={{
                          background: "rgb(108, 122, 153)",
                          color: "#fff",
                          padding: "7px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          id="prevMonth"
                          onClick={set_d_prv}
                          style={{
                            marginRight: "25px",
                            border: "none",
                            background: "rgb(108, 122, 153)",
                          }}
                        >
                          <img
                            src="dist/img/prev_img.png"
                            style={{ height: "18px", width: "18px" }}
                          />
                        </button>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            fontSize:"10px",
                            fontWeight:"500"
                          }}
                        >
                          <span>Campus Events in</span>
                          <span id="">{monthName}</span>
                          <span>{currentYear}</span>
                        </div>

                        <button
                          onClick={set_d_nxt}
                          id="nextMonth"
                          style={{
                            marginLeft: "25px",
                            border: "none",
                            background: "rgb(108, 122, 153)",
                          }}
                        >
                          <img
                            src="dist/img/next_img.png"
                            style={{ height: "18px", width: "18px" }}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="event_inner_div" style={{padding:"10px 0px"}}>
                      <div className="row m-0">
                        {event == "" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center", minHeight: "100px",
                            }}
                          >
                            <p style={{ fontSize: "10px", fontWeight: "500" }}>
                              No Events This Month

                            </p>
                          </div>
                        ) : (
                          <>
                            {event.map((item) => {
                              let array = [];
                              var s_date = moment(item.start_date).format("D MMM")
                              var e_date = moment(item.end_date).format("D MMM")
                              item.images.map((e) => {
                                array.push(e.image);
                              });

                              return (
                                <>
                                  <div className="col-md-4 mt-1">
                                    <div
                                      className="small-box"
                                      style={{
                                        width: "100%",
                                        paddingLeft: "10px",

                                        background: "transparent",
                                        // height: "100px",
                                        minHeight: "75px",
                                        boxShadow:
                                          "0px 1px 1px rgba(0, 0, 0, 0.2)",
                                        borderRadius: "3px",
                                      }}
                                    >
                                      <div
                                        className="inner"
                                        style={{
                                          height: "100%",
                                          padding: "0",
                                          margin: "0",
                                        }}
                                      >
                                        <div className="row">
                                          <div>
                                            <div
                                              className="col-md-4"
                                              style={{
                                                height: "100%",
                                              }}
                                            >
                                              <div>
                                                {array.length == 0 ? (
                                                  <div>
                                                    <img
                                                      src={require("../images/no_image.png")}
                                                      alt="Default"
                                                      style={{
                                                        padding: "5px",
                                                        width: "70px",
                                                        height: "50px",
                                                      }}
                                                    />
                                                  </div>
                                                ) : (
                                                  <div>
                                                    <img
                                                      src={array[0]}
                                                      style={{
                                                        height: "50px",
                                                        width: "70px",
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            <div className="col-md-8">
                                              <div className="mt-1">
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    width:"190px",
                                                    overflow:"hidden",
                                                    whiteSpace:"nowrap",
                                                    textOverflow:"ellipsis",
                                                    display:"block"
                                                  }}
                                                >
                                                  {item.label}
                                                </span>
                                              </div>

                                                <p
                                                  style={{
                                                    fontSize: "9px",
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  <span style={{fontWeight:"600"}}>Start Date :  </span>
                                                  {s_date}   -   {item.start_time}
                                                </p>


                                                <p
                                                  style={{
                                                    fontSize: "9px",
                                                    fontWeight: "500",
                                                  }}
                                                > <span style={{fontWeight:"600"}}>End Date :  </span>
                                                 {" "}{e_date}   -   {item.end_time}
                                                </p>

                                              <div
                                                className=""
                                                style={{
                                                  display: "flex",
                                                  gap: "5px",
                                                  fontSize: "9px",
                                                  fontWeight: "600",
                                                }}
                                              >
                                                <span>{item.location}</span>
                                                {/* <span>16:47:00</span>
                                        <span></span>
                                        <span>22:40:00</span> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            {/* <div className="carousel slide" data-ride="carousel" id="event-carousel" data-interval="false">
              <div className="carousel-inner">

                <div className="carousel-item active">
                  <div className="event-container " >
                    <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 className="ms-3 me-3">Campus Events in {currMonth} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                          event == null ?
                          (
                              <div>
                              No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>


                    </div>

                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                           No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>



                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                           No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0px"}}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>


                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel" >
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                           No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date " style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>



                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel" >
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                           No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>



                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel" >
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                         event == null ?

                          (
                            <div>
                           No Data Available.
                          </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>



                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                           No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>


                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel" >
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                            No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>


                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                        No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date " style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>


                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                         No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>


                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                         No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }

                      </div>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="event-container">
                  <div className="event-header d-flex campus_event_carousel">
                    <a className="" href="#event-carousel" role="button"
               onClick={() => prevClick()}
              data-slide="prev">

              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            <h1 style={{margin:"0px 10px"}}>Campus Events in {month} {currYear}</h1>

                      <a className="" href="#event-carousel" role="button"

           onClick={() =>
             nextClick()
           }
           data-slide="next" >

           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="sr-only">Next</span>
         </a>

                    </div>
                    <div className="container event-item">
                    <div className="row" >
                        {

                     event == null ?
                          (
                              <div>
                            No Data Available.
                            </div>
                            ):

                          (
                            event.map((item) =>
                            {
                              const dateString = item.start_date;
                              var date = new Date(dateString + 'T00:00:00');
                              const options = {
                                year: 'numeric', month: 'long', day: 'numeric'
                              };

                              const getDate = date.toLocaleString('en-US', options);
                              const array = [];


                              item.images.map((imgItme) => {
                                array.push(imgItme.image)
                              })
                              return(
                                <div className='col-md-6' >
                               <div className="row mt-2" style={{ padding: "0", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)", height: "108px" }}>
                                   <div className="col-md-5 event-date" style={{ padding: "0" }}>
                                     {array == 0 ?
                                        (
                                          <div>
                                            <img src={require('../images/no_image.png')} alt="Default" style={{ width: "100px", height: "100px" }} />

                                          </div>
                                        ) : (
                                          <div>
                                            <img src={array[0]} alt="No Image" style={{ width: "100px", height: "100px" }} />
                                          </div>
                                        )
                                      }
                                    </div>

                                    <div className="col-md-7 event-desc" style={{ padding: "10px", fontWeight: "500" }}>
                                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.label}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.9)", fontSize: "10px" }}>{getDate}</div>
                                      <div style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "12px", marginTop: '20px' }} className="d-flex">
                                        <p>{item.location}, </p>
                                        <p style={{marginLeft:"2px"}}>{item.start_time} - {item.end_time}</p>
                                      </div>
                                    </div>


                                  </div>


                                </div>
                              )
                            })
                          )
                          }


                      </div>


                    </div>
                  </div>
                </div>


              </div>
            </div> */}


        </>
  );
}
