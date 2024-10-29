import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from 'jquery'
import moment from 'moment'

export function HolidayList() {

  function nextMonth()
  {
    let s_month = selectedMonth + 1;
    let currentData = monthNames[s_month - 1]
    // console.log("currentData",currentData)
  }
  

  var Cevent = "";

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = new Date().getMonth() + 1;
  // console.log("selectedMonth",selectedMonth);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const d = new Date();
  const [currYear, setCurrYear] = useState(d.getFullYear());

  const currMonth = moment(d).format("MMMM");
  const [month, updateMonth] = useState(currMonth);


  const token = localStorage.getItem('Token');
  const [event, updateEvent] = useState([]);

  var eNow = new Date();
  var eMoment = moment(eNow);

  var lastYear = eMoment.format('YYYY') - 1;
  var nextyear = moment().add(1, 'years').format('YYYY');
  var eventList = "";

  async function nextClick() {
    let s_month = selectedMonth + 1;
    let c_year = currYear;
    let currentData = monthNames[s_month - 1]
    // console.log("get previous/next month", currentData);
    updateMonth(currentData)
    if(s_month == 13)
    {
      updateMonth("January")
    }
    if (s_month == 13) {
      s_month = 1;
      c_year = c_year + 1;
      setCurrYear(c_year)
    }

    // console.log("dateTest Month:", monthNames[s_month - 1])
    // console.log("dateTest Year:", c_year)

    let result_month = monthNames[s_month - 1];
    let result_year = c_year
    eventList = result_month + ',' + ' ' + result_year

    // console.log("date result:", eventList)

    await setSelectedMonth(s_month)

    fetchList(eventList);
  }

  async function prevClick() {
    let s_month = selectedMonth - 1;
    // console.log("selected_month", s_month)
    let c_year = currYear;
 let currentData = monthNames[s_month - 1]
 
    updateMonth(currentData)
    if (s_month <= 0) {
      s_month = 12;
      c_year = c_year - 1;
      setCurrYear(c_year)
    }

    // console.log("dateTest Month:", monthNames[s_month - 1])
    // console.log("dateTest Year:", c_year)

    let result_month = monthNames[s_month - 1];
    let result_year = c_year
    eventList = result_month + ',' + ' ' + result_year

    // console.log("date result:", eventList)

    await setSelectedMonth(s_month)

    fetchList(eventList);
  }

  async function fetchList(data) {

    try {
      const formData = new FormData();

      formData.append("month", data);

      // console.log("Cevent", Cevent)
      const fetchResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_monthwise_holiday_list",
        formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        });

      // console.log("CAMPUS EVENTS ALL", fetchResponse);
      
        updateEvent(fetchResponse.data.data)
      
     
    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }
  useEffect(() => {
    let data = monthNames[selectedMonth - 1] + ', ' + currYear;
    fetchList(data);
  }, []);

  return (
   <div>
     <div id="gallerywrapper">
	    <div id="gallery">
        {/* first month */}
		    <div id="pic1" >
      
        <p className="calender_p">Holiday List in {currMonth} {currYear}
        <a class="previous" href="#pic12" onClick={() =>prevClick()} > <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic2" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
			    <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                                 console.log("item------------------->>",item);
                                const getDate = date.toLocaleString('en-US', options);
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* second month */}
		    <div id="pic2" style={{fontSize:"14px",fontWeight:"500"}}>
        {/* Holiday List in {month} {currYear} */}
        <p className="calender_p">Holiday List in  {month} {currYear}
			    <a class="previous" href="#pic1" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic3" onClick={() =>nextClick()}><span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* third month */}
		    <div id="pic3" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic2" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic4" onClick={() =>nextClick()}><span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* forth month */}
		    <div id="pic4" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic3" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic5" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* fifth month */}
		    <div id="pic5" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic4" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic6" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* sixth month */}
        <div id="pic6" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic5" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic7" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* 7th month */}
        <div id="pic7" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic6" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic8" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* 8th month */}
        <div id="pic8" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic7" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic9" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* 9th month */}
        <div id="pic9" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic8" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic10" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* 10th month */}
        <div id="pic10" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p"> Holiday List in {month} {currYear}
			    <a class="previous" href="#pic9" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic11" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>
        {/* 11th month */}
        <div id="pic11" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p">  Holiday List in {month} {currYear}
			    <a class="previous" href="#pic10" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic12" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

                              </div>
                            </div>

                            )
                          })
                        )
                        }
                        
                    </div>
		    </div>

        {/* 12th month */}
        <div id="pic12" style={{fontSize:"14px",fontWeight:"500"}}>
        <p className="calender_p">Holiday List in {month} {currYear}
			    <a class="previous" href="#pic11" onClick={() =>prevClick()}> <span className="carousel-control-prev-icon"/></a>
			    <a class="next" href="#pic1" onClick={() =>nextClick()}> <span className="carousel-control-next-icon"/></a>
          </p>
          <div className="row" > 
                      {
                   
                        event == null ?
                        (
                            <div>
                           <div style={{fontSize:"12px",textAlign:"center"}}>
                         No Holiday In This Month
                          </div>
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
                            return(
                              <div>
                              <div className="col-md-3 event-date">
                                <span>{item.date}</span>
                              </div>
                              <div className="col-md-9 event-desc">

                                <p style={{marginLeft:"10px"}}>{item.festival}</p>

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

  )
}
