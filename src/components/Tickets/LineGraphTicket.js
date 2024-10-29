import React, { useState, useEffect } from 'react'
import axios from "axios"
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';


export function LineGraphTicket() {

  const [data, setData] = useState([])
  const token = localStorage.getItem('Token');

  async function fetchTicketGraph() {

    try {

      const fetchGraphResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_ticket_graph",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get Ticket graph Details", fetchGraphResponse);

      const graphData = fetchGraphResponse.data.data;
      console.log("Ticket graph List ", graphData);
      setData(graphData);


    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  

  useEffect(() => {
    fetchTicketGraph();
  }, []);

  //   data.map((item, index) => {
  //   console.log("ticket graph item today", item.today);
  //   console.log("ticket graph item yesterday", item.yesterday);

  //   return(
     
  //    [
  //       {
  //         name: '0',
  //         yesterday: item.yesterday,
  //         today: item.today
  //       }
  //     ]  
      
  //   )
  // }

  // )


  const pdata = [
    
    {
      name: '0',
      yesterday: 50,
      today: 40
    },
    {
      name: '1',
      yesterday: 50,
      today: 50
    },
    {
      name: '2',
      yesterday: 25,
      today: 55
    },
    {
      name: '3',
      yesterday: 32,
      today: 28
    },
    {
      name: '4',
      yesterday: 23,
      today: 15
    },
    {
      name: '5',
      yesterday: 26,
      today: 18
    },
    {
      name: '6',
      yesterday: 28,
      today: 20
    },
    {
      name: '7',
      yesterday: 18,
      today: 10
    },
    {
      name: '8',
      yesterday: 22,
      today: 12
    },
    {
      name: '9',
      yesterday: 20,
      today: 20
    },
    {
      name: '10',
      yesterday: 12,
      today: 12
    },
    {
      name: '11',
      yesterday: 21,
      today: 25
    },
    {
      name: '12',
      yesterday: 50,
      today: 27
    },
    {
      name: '13',
      yesterday: 52,
      today: 25
    },
    {
      name: '14',
      yesterday: 70,

    },
    {
      name: '15',
      yesterday: 70,

    },
    {
      name: '16',
      yesterday: 55,

    },
    {
      name: '17',
      yesterday: 64,

    },
    {
      name: '18',
      yesterday: 60,

    },
    {
      name: '19',
      yesterday: 66,

    },
    {
      name: '20',
      yesterday: 66,

    },
    {
      name: '21',
      yesterday: 60

    },
    {
      name: '22',
      yesterday: 35

    },
    {
      name: '23',
      yesterday: 45

    },
  ];

  return (
    <div style={{ marginTop: "10PX" }} className='Ticket_line_graph'>
      <ResponsiveContainer width="100%" aspect={3} >
        <LineChart data={pdata}>
          {/* <CartesianGrid />    */}
          <XAxis dataKey="name"
            interval={'preserveStartEnd'} />
          <YAxis ></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="yesterday"
            stroke="#1F3977" activeDot={{ r: 8 }} />
          <Line dataKey="today"
            stroke="#339dd8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
