import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import "../AdminLogin.css"
import axios from "axios";
import $ from "jquery"
// import "./EventCalendar.css"
import { DayPickerRangeController } from 'react-dates'
import { START_DATE, END_DATE } from 'react-dates/constants'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import sortBy from 'lodash/fp/sortBy'
import last from 'lodash/fp/last'
import { memoize } from 'lodash'
import moment from 'moment';




const Wrapper = styled.div`
  .CalendarDay__highlighted_calendar {
    background:rgba(45, 93, 208, 0.2) !important;
    border-radius:50%;
margin-top:10px !important;
 text-align:center !important;
    color:black !important;
  }

  .CalendarDay__today
  {
   border-radius:50%;
    color: inherit;
 

    background: rgba(21, 163, 18, 0.2) !important;
  }

  .CalendarDay__selected_span {
    border: 2px double #0c6776 !important;
    color: inherit;
    background:  rgba(21, 163, 18, 0.2);
  }
`

const DETAILS = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const Number = styled.div`
  position: absolute;
  
  font-size: 12px;
  align-items: center !important;
text-align: center !important;
`

const Event = styled.div`
  

  ${({ green }) =>
    green &&
    `
    color: white;
    background: #0c6776;
  `}
`

const EventStart = styled(Event)`
  margin-left: 2px;
  margin-right: -2px;
`

const EventSpan = styled(Event)`
  margin-left: -2px;
  margin-right: -2px;
  padding-left: 8px;
`

const EventEnd = styled(Event)`
  /* margin-right: 2px; */
  margin-left: -2px;
`


var array= [];



export function EventCalendar(){

  const token = localStorage.getItem('Token');
  const[data,setData] = useState([]);
  const [numberOfEvents,updateEvents] = useState("");
  const [eventDate,updateEventDate] = useState("");
  // const moment = require("moment")

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();
 console.log("current month",monthNames[d.getMonth()]) ;
const currMonth = monthNames[d.getMonth()];
  console.log("NumberOfEvents",numberOfEvents)
  
  async function fetchCalendarList() {
    console.log("Access Token-", token);
    try {

      const fetchResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_event_date",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get Calendar event", fetchResponse.data.data);
      
      const events = fetchResponse.data.data;
      console.log("print the length of an array",events.length);
      var myNumber = events.length;
      var formattedNumber = "0" + myNumber;
      console.log("number",formattedNumber);
            updateEvents(myNumber);
   
      
    //  if(fetchResponse.data.error_code == 404)
    //  {
    //    alert("Invalid Token OR Non Authorized User");
    //   window.location.href = "/";
    //  }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }


  async function fetchList() {
   
    try {

      const fetchResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_event_date",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Event Response", fetchResponse);
      console.log("Get Calendar event", fetchResponse.data.data);
      
      
      
    //  if(fetchResponse.data.error_code == 404)
    //  {
    //    alert("Invalid Token OR Non Authorized User");
    //   window.location.href = "/";
    //  }

    if(fetchResponse.data.error_code === 200){
      const events = fetchResponse.data.data;
      console.log("eventssssssssssss",events);
     
      array.push(events);
    }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  useEffect(() => {
    isDayHighlighted();
    fetchList();
    fetchCalendarList();
  }, []);
  
  const [focusedInput, setFocusedInput] = useState(START_DATE)
  const [{ startDate, endDate }, setDates] = useState({
    startDate: null,
    endDate: null,
  })

  const handleFocusChange = focusedInput => {
    setFocusedInput(focusedInput ? END_DATE : START_DATE)
  }

  
  
  // const isDayHighlighted = day => {
  //   let isBlocked = false
    
  // array.map((item) =>
  // {
    
  //   item.map(({ start_date, end_date }) =>
  //   {
  //     if ( day.isBetween(start_date, end_date, 'day', '[]')) {
  //           isBlocked = true
  //        }
  //        return

  //   })
   
  // return
  // })
   
  //   return isBlocked
   
     
  // }

  const isBetween = (date, start, end) => {
    return moment(date).isBetween(start, end, null, '[]');
  };

  const isDayHighlighted = day => {
    let isBlocked = false
    for (const item of array) {
      for (const { start_date, end_date } of item) {
        if (isBetween(day, start_date, end_date)) {
          isBlocked = true
          return true;
          
        }
      }
    }
  
    return false;
  };
  
  const getEventForDay = memoize(day =>
    flow(
      filter(({ start, end }) => day.isBetween(start, end, 'day', '[]')),
      sortBy('start'),
      last
    )(array)
  )
  const renderEventForDay = day => {
    const event = getEventForDay(day)
    const eventForPreviousDay = getEventForDay(day.clone().subtract(1, 'days'))
    if (!event) return null
    const { start, end, label, color, type } = event
    const isBooking = type === 'booking'
    const isStart = day.isSame(start, 'day')
    const isEnd = day.isSame(end, 'day')
  
    if (isStart && isEnd) {
      return <Event green={isBooking}>{label}</Event>
    } else if (isStart) {
      return <EventStart green={isBooking}>{label}</EventStart>
    } else if (isEnd) {
      return <EventEnd green={isBooking} />
    } else {
      return (
        <EventSpan green={isBooking}>
          {eventForPreviousDay && eventForPreviousDay.color !== color && label}
          
        </EventSpan>
      )
    }
   
  }
 

 
  async function showDate(day)
{
console.log("SHOW DATE",day.format('YYYY-MM-DD'));
const getFullDate = day.format('YYYY-MM-DD');
const atasi = day.format('DD');
updateEventDate(atasi);
$(".show_events").show();

try {

  const formDataCategory = new FormData();
  formDataCategory.append("date", getFullDate);


  const responseDate = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_datewise_event_list",
    formDataCategory,
    {
      headers:
      {
        "Content-Type": 'multipart/form-data',
        "Authorization": token,
      }
    });

  console.log("Get_Datewise_Event_List", responseDate.data.data);
  // setError( responseDate.data.error_code)
  setData(responseDate.data)

  // updateCategoryName("");

}
catch (err) {
  console.log("Log in Fail", err);

}


}


 const Day = (day) => {
    
    return(
      <DETAILS >
     
         <Number onClick={() => showDate(day)}>
            
          {day.format('D')}
          </Number>
          
                
         {renderEventForDay(day)}
         
         </DETAILS>
    )
  }
  $(".close_event").click(function(){
    $(".show_events").hide();
  });
  const weeks =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  moment.updateLocale('en', {
    weekdaysMin : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  });
  return (
    <div>

<div className="d-flex align-items-center" style={{ flexWrap: "wrap",background:"#6C7A99",color:"white", lineHeight: "43px" }}>
  {/* <img  src="dist/img/Planner.png" alt="planner" height="23px" width="23px"/> */}
  <div style={{ fontWeight: "600", marginLeft:"10px",marginTop: "0px", fontSize: "13px", padding: "0px" }}>Event Calender</div> 
  <p className="ms-2"> |</p>
  <div className="ms-2" style={{fontSize:"10px", fontWeight: "300px"}}>You have {numberOfEvents} Events in {currMonth}</div>                   
</div>

<div className="d-flex" style={{padding:"10px",justifyContent:"end",paddingRight:"50px",margin:"10px"}}>
<a class="previous" href="#pic11" ><img src={require('../images/left_arrow.png')} style={{width:"20px", height:"17px",marginRight:"12px"}}/></a>
	   
<div >{currMonth}</div>
<a class="next" href="#pic1" ><img src={require('../images/right_arrow.png')} style={{width:"20px", height:"17px",marginLeft:"12px"}}/></a>
</div>

{/* <div className="d-flex" style={{padding:"10px"}}>
<div style={{ padding: "0px",fontWeight: "500",  fontSize: "13px", marginBottom: "10PX", color: "black", marginTop: "10px" ,marginRight:"40px"}} className="ml-auto">{currMonth}</div>
</div> */}

      <Wrapper>
      <DayPickerRangeController
    weekdaysMin={weeks}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={setDates}
        daySize={100}
     
        hideKeyboardShortcutsPanel
        renderDayContents={Day}
        isDayHighlighted={isDayHighlighted}
        enableOutsideDays
        firstDayOfWeek={0}
      />
    
      <div className="show_events" style={{position:"absolute",top:"0",left:"0px",background: "rgba(0,0,0,0.5)",padding:"10px",width:"100%",height:"100%",zIndex:"2",display:"none"}}>
       
     
        <div style={{borderRadius:"10PX",width:"100%",height:"100%",overflowY:"scroll"}} className="datewise_events">
          <div className="d-flex" style={{background:" #f2f2f2",padding:"5px"}}>
            
          <p style={{textAlign:"center",background:"#50404d", borderRadius:"5PX",padding:"5px 10PX",color:"white"}}>
            {eventDate}
            </p>
          <p style={{marginTop:"2px",marginLeft:"7px",fontWeight:"bold"}}>EVENTS OF THE DAY</p>
          <a href="#close" className="close_event ml-auto" 
          style={{background:"darkgrey",borderRadius:"50%",color: "white",fontSize: "15px",padding: "5px 10px"}}>×</a>

      
          </div>
      <div style={{overflowY:"auto",background:"#dbd7d2"}}>
      {data.error_code === 404 ?
  (
      <div style={{overflowY:"auto",background:"#dbd7d2",padding:"15PX",textAlign:"center"}}>
      NO EVENT TO DISPLAY
      </div>  
    ):data.error_code === 200 ?
    (
      data.data.map((itemDate) =>
        {
          return(
            <div style={{padding:"10px" }} className="d-flex">
                    <div style={{borderRight:"3px solid #339dd8",padding:"10px"}}>
                      {itemDate.time}
                    </div>
                    <div style={{padding:"10px"}}>
                      <div style={{marginLeft:"5px",fontWeight:"400",fontSize:"15PX"}}>{itemDate.title}</div>
                      <div  style={{marginLeft:"5px",color:"grey",fontSize:"13PX"}}>{<p  dangerouslySetInnerHTML={{ __html:itemDate.description }} ></p>}</div>
                      <div  style={{marginLeft:"5px",fontSize:"11PX",fontStyle:"italic"}}>{itemDate.location}</div>
                    </div>
                
                </div>
          )
        })
    ):
    "null"
    }

  </div>        
          </div>
        
       
      </div>
    </Wrapper>
    </div>
    
  )
}

// export default EventCalendar
