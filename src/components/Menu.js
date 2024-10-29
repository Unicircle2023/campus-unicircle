import React from "react";
// import { useLocation } from 'react-router-dom';
// import {useLocation} from 'react'
import { Link } from "react-router-dom";
export function Menu() {

  const handleItemClick = (index) => {
    localStorage.setItem('active_index', JSON.stringify(index));
  };


// function findPath() {
//   const location = useLocation();
//   const activePath = location.pathname;
// console.log("paathhhh.......>",activePath)
//   // Your app code here...
// }
// useEffect(()=>{findPath()},[])

// console.log("localStorage ---->>>>",localStorage.getItem('active_index'));

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4" 
    style={{ overflowY: "auto", fontFamily: "Poppins", overflowX: "hidden", height: "100%"}}>
      <nav  class="main-sidebar sidebar-dark-primary elevation-4">
        <ul class="mainmenu">
          
          <li style={{marginTop:"25px"}}> 
            <div style={{paddingLeft: "0.0rem",fontFamily:'poppins' ,fontStyle: 'normal',fontWeight: '500',fontSize: '9px',lineHeight: '16px',color: 'rgba(255, 255, 255, 0.9)'}}>Dashboard </div>
              <ul style={{fontSize: "14px",color:'lightblue'}}>
                <li onClick={()=>handleItemClick(1)} className={localStorage.getItem('active_index') == 1 ? "active": ''}><Link to="/homepage">
                    <i class="fa fa-check-square" aria-hidden="true"></i>
                    Home
                    </Link></li>
                <li onClick={()=>handleItemClick(2)} className={localStorage.getItem('active_index') == 2 ? "active": ''}><Link to="/calender">
                  
                <i class="fa fa-check-square" aria-hidden="true"></i>Calender</Link></li>
                <li onClick={()=>handleItemClick(3)} className={localStorage.getItem('active_index') == 3 ? "active": ''}><Link to="/student"><i class="fa fa-check-square" aria-hidden="true"></i>Students</Link></li>
                {/* <li onClick={()=>handleItemClick(4)} className={localStorage.getItem('active_index') == 4 ? "active": ''}><Link to="/teachers" style={{padding:'5px'}}><i class="fa fa-check-square" aria-hidden="true"></i>FACULTY</Link></li>  */}
                {/* <li onClick={()=>handleItemClick(5)} className={localStorage.getItem('active_index') == 5 ? "active": ''}><Link to="/schedule" style={{padding:'5px'}}><i class="fa fa-check-square" aria-hidden="true"></i>SCHEDULE</Link></li> */}

              </ul>
          </li>

          <li style={{marginTop:"16px"}}>
            {/* <a href="#">Engage</a> */}
            <div style={{paddingLeft: "0.0rem",fontFamily:'poppins' ,fontStyle: 'normal',fontWeight: '500',fontSize: '9px',lineHeight: '16px',color: 'rgba(255, 255, 255, 0.9)'}}>Engage</div>
            <ul class="" style={{fontSize: "14px", color:'lightblue'}}>
              <li onClick={()=>handleItemClick(4)} className={localStorage.getItem('active_index') == 4 ? "active": ''}><Link to="/campusNews">
                <i class="fa fa-check-square" aria-hidden="true"></i>Notice Board</Link></li>
              <li onClick={()=>handleItemClick(5)} className={localStorage.getItem('active_index') == 5 ? "active": ''}><Link to="/event" >
                <i class="fa fa-check-square" aria-hidden="true"></i>Events</Link></li>
              <li onClick={()=>handleItemClick(6)} className={localStorage.getItem('active_index') == 6 ? "active": ''}><Link to="/polls">
              <i class="fa fa-check-square" aria-hidden="true"></i>Polls</Link></li>
              <li onClick={()=>handleItemClick(7)} className={localStorage.getItem('active_index') == 7 ? "active": ''}><Link to="/community">
              <i class="fa fa-check-square" aria-hidden="true"></i>Campus Groups</Link></li>

              <li onClick={()=>handleItemClick(12)} className={localStorage.getItem('active_index') == 12 ? "active": ''}><Link to="/jobDetails" >
              <i class="fa fa-check-square" aria-hidden="true"></i>Jobs</Link></li>
              
            </ul>
          </li>


          <li style={{marginTop:"16px"}}>
            {/* <a href="#">Service Desk</a> */}
          <div style={{paddingLeft: "0.0rem",fontFamily:'poppins' ,fontStyle: 'normal',fontWeight: '500',fontSize: '9px',lineHeight: '16px',color: 'rgba(255, 255, 255, 0.9)'}}>Service Desk</div>
            <ul class="" style={{fontSize: "14px", color:'lightblue'}}>
              {/* <li onClick={()=>handleItemClick(10)} className={localStorage.getItem('active_index') == 10 ? "active": ''}><Link to="/ticketsDashboard" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>TICKETS</Link></li> */}
              {/* <li onClick={()=>handleItemClick(11)} className={localStorage.getItem('active_index') == 11 ? "active": ''}><Link to="/appointmentDetails" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>APPOINTMENTS</Link></li> */}
              <li onClick={()=>handleItemClick(8)} className={localStorage.getItem('active_index') == 8 ? "active": ''}><Link to="/faqDetails">
              <i class="fa fa-check-square" aria-hidden="true"></i>FAQ'S</Link></li>
              {/* <li onClick={()=>handleItemClick(9)} className={localStorage.getItem('active_index') == 9 ? "active": ''}><Link to="/mapDetails" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>MAPS</Link></li> */}

              <li onClick={()=>handleItemClick(10)} className={localStorage.getItem('active_index') == 10 ? "active": ''}><Link to="/flaggedcontents">
              <i class="fa fa-check-square" aria-hidden="true"></i>Flagged Contents</Link></li>
              {/* <li><a href="badgeDetails">BADGES</a></li> */}
            </ul>
          </li>

          <li style={{marginTop:"16px"}}>
            {/* <a href="#">Marketplace</a> */}
            <div style={{paddingLeft: "0.0rem",fontFamily:'poppins' ,fontStyle: 'normal',fontWeight: '500',fontSize: '9px',lineHeight: '16px',color: 'rgba(255, 255, 255, 0.9)'}}>Marketplace</div>
            <ul class="" style={{fontSize: "14px",color:'lightblue'}}>
              <li onClick={()=>handleItemClick(11)} className={localStorage.getItem('active_index') == 11 ? "active": ''}><Link to="/marketplaceDetails">
              <i class="fa fa-check-square" aria-hidden="true"></i>Campus Shop</Link></li>
            </ul>
          </li>

          {/* <li style={{marginTop:"16px"}}>
         
            <div style={{paddingLeft: "0.0rem",fontFamily:'poppins' ,fontStyle: 'normal',fontWeight: '500',fontSize: '11px',lineHeight: '16px',color: 'rgba(255, 255, 255, 0.9)'}}>Jobs</div>
            <ul class="" style={{fontSize: "14px", color:'lightblue'}}>
              <li onClick={()=>handleItemClick(12)} className={localStorage.getItem('active_index') == 12 ? "active": ''}><Link to="/jobDetails" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>Jobs</Link></li>
            </ul>
          </li> */}

          <li style={{marginTop:"16px"}}>
          
             <div style={{paddingLeft: "0.0rem",fontFamily:'poppins' ,fontStyle: 'normal',fontWeight: '500',fontSize: '9px',lineHeight: '16px',color: 'rgba(255, 255, 255, 0.9)'}}>Settings</div>
            <ul class="" style={{fontSize: "14px",color:'lightblue'}}>
              {/* <li onClick={()=>handleItemClick(13)} className={localStorage.getItem('active_index') == 13 ? "active": ''}><Link to="/departmentDetails" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>Department</Link></li> */}
              {/* <li onClick={()=>handleItemClick(14)} className={localStorage.getItem('active_index') == 14 ? "active": ''}><Link to="/courseDetails" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>Course</Link></li> */}
              <li onClick={()=>handleItemClick(15)} className={parseInt(localStorage.getItem('active_index')) === 15 ? "active": ''}><Link to="/classDetails">
              <i class="fa fa-check-square" aria-hidden="true"></i>Class</Link></li>
              {/* <li onClick={()=>handleItemClick(19)} className={parseInt(localStorage.getItem('active_index')) === 19 ? "active": ''}><Link to="/subjectDetails" style={{padding:'5px'}}>
              <i class="fa fa-check-square" aria-hidden="true"></i>SUBJECT</Link></li> */}
               {/* <li onClick={()=>handleItemClick(20)} className={parseInt(localStorage.getItem('active_index')) === 20 ? "active": ''}><Link to="/exam" style={{padding:'5px'}}>
                
              <i class="fa fa-check-square" aria-hidden="true"></i>EXAM</Link></li>  */}
              
             
              {/* <li><a href="attendance">ATTENDANCE</a></li>  */}
            </ul>
          </li>

       
        </ul>
      </nav>
    </aside>
  );
}
