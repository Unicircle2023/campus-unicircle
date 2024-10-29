import React ,{useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import $ from "jquery"
import moment from "moment"
const events = [
    {
      id: 1,
      title: 'event 1',
      start: '2021-06-14T10:00:00',
      end: '2021-06-14T12:00:00',
    },
    {
      id: 2,
      title: 'event 2',
      start: '2021-06-16T13:00:00',
      end: '2021-06-16T18:00:00',
    },
    { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
  ];
  
export  function Table() {
  $(".fc-prev-button").html('<i class="fa fa-arrow-circle-left"></i>');
  $(".fc-next-button").html('<i class="fa fa-arrow-circle-right"></i>');
    const [date,updateDate] = useState("")
    const [month, updateMonth] = useState("")
    const getWeekNumOfMonthOfDate = (d) => {
        const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
      }
      
      const weekNumOfDate = getWeekNumOfMonthOfDate(new Date(date))
      console.log("weekNumOfDate",weekNumOfDate)
      

      
  return (
    <div className="App">

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
       
        datesSet={(arg) => {
            console.log("arg",arg)
          
            //arg includes data about current visible dates
            console.log("starting visible date",arg.view.activeStart) //starting visible date
            const month =  moment(arg.view.activeStart).format("MMMM")
            updateMonth(month)
            console.log("get month",month)
            const StartDate = moment(arg.view.activeStart).format("YYYY, MM, DD")
           
            updateDate(StartDate)
            console.log("ending visible date",arg.view.activeEnd) //ending visible date
            return moment(arg.date).format('dddd Do')
          }}
        initialView="timeGridWeek"
        firstDay= '1'
        headerToolbar={{
            start: 'timetable',
            center: '',
            end: 'excel,print,edit,prev,new,next'
            
          }}
          customButtons={{
            new: {
              text: weekNumOfDate + " " + "Week," + " " + month,
              click: () => console.log('new event',weekNumOfDate),

            },
            edit: {
               
                click: () => console.log('new event',weekNumOfDate),
              },
              print: {
               
                click: () => console.log('new event',weekNumOfDate),
              },
              excel: {
               
                click: () => console.log('new event',weekNumOfDate),
              },
              timetable: {
               text:"Timetable - B.com -First Year",
                click: () => console.log('new event',weekNumOfDate),
              },
              prev: {
                icon:"fas fa-lock",
                 click: () => console.log('new event',weekNumOfDate),
               },
          }}
        
      dayHeaderFormat ={{
        weekday: 'long', day: 'numeric',month: 'long', year:"numeric", omitCommas: true
      }}

      
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
    </div>
  )
}
