import React, { useState } from 'react'

import {GrClose} from "react-icons/gr";
import $ from "jquery";
export function BirthdayPopup() 
{
 

  
    return (
        <div id="open-modal-birthdayview" className="modal-window" >
      <div style={{ padding:"10px 0px 0px 0px", borderRadius:"8px", background:"#f2f2f2", border:"1px solid darkgrey", boxShadow:"none"}} className="popup">
        {/* header */}
        <div style={{marginBottom: "0px", marginRight:"0px", display:"flex", flexWrap:"wrap" , paddingBottom:"5px"}} >
        
        <h5 style={{fontWeight:"bold", marginLeft:"200px"}}>Birthdays</h5>
               {/* <div style={{background:"#e4e6eb",padding:"10px 10px 10px 10px", marginLeft:"auto", marginRight:"5px"}}> */}
               <a
            href="#"
            title="Close"
            className="modal-close " style={{background:"#E4E6EB",marginTop:"10px", marginLeft:"450px", padding:"0px",width:"8%", borderRadius:"50%"}}
            
          >
            
                   <GrClose style={{color:"#60676F", fontweight:"bold", marginRight:"10px"}}/>
                   </a>
               {/* </div> */}
               
        </div>
        {/* end header */}

        {/* birthday wishes */}
        <div style={{background:"white", borderRadius:"10px", marginBottom:"50px", borderTop:"1px solid #E4E6EB", borderBottom:"1px solid #E4E6EB"}}>
            {/* 1st person */}
              <div style={{display:"flex", flexWrap:"wrap", borderBottom:"1px solid #e6e7e9", marginTop:"10px"}}>
                  <div>
                      <img src="dist/img/avatar5.png"
                
                alt="User Image" 
                style={{ width: "80px", height: "80px", padding:"10px"}}
              /></div>

              <div className="birthday_name mt-3" >
                  Ashutosh Joshi
                   {/* input emoji */}
                   <div style={{width:"100%", marginLeft:"8px"}}>
      <div class="row justify-content-center">
            <p class="lead emoji-picker-container" style={{width:"100%"}}>
              <input type="text" data-emoji-input="unicode" 
              placeholder="Write on his Timeline"  id="exampleInputEmail1" data-emojiable="true" style={{width: "100%", height:"35px", paddingTop:"8px", borderRadius:"10px", border:"1px solid grey"}} />
              

            
            </p>            
      </div>
</div>
                   {/* end input emoji */}
              </div>
               {/* smiley */}
          <div id="emoji-picker">
  <input type="search" placeholder="Search" />
  <div id="container" />
  <ol id="categories" />
</div>
        {/* end amiley */}
              </div>
              {/* end */}

              {/* 2nd person */}
              <div style={{display:"flex", flexWrap:"wrap",  marginTop:"10px"}}>
                  <div>
                      <img
                src="dist/img/avatar5.png"
                
                alt="User Image" 
                style={{ width: "80px", height: "80px", padding:"10px"}}
              /></div>

              <div className="birthday_name mt-3">
                  Harsh Ambadkar
                  {/* input emoji */}
                  <div style={{width:"100%", marginLeft:"8px"}}>
      <div class="row justify-content-center">
            <p class="lead emoji-picker-container" style={{width:"100%"}}>
              <input type="text" data-emoji-input="unicode" 
              placeholder="Write on his Timeline"  id="exampleInputEmail1" data-emojiable="true" style={{width: "100%", height:"35px", paddingTop:"8px", borderRadius:"10px", border:"1px solid grey"}} />
              

            
            </p>            
      </div>
</div>
                   {/* end input emoji */}
              </div>
               {/* smiley */}
          <div id="emoji-picker">
  <input type="search" placeholder="Search" />
  <div id="container" />
  <ol id="categories" />
</div>
        {/* end amiley */}
              </div>
              {/* end */}
        </div>
        {/* end birthday wishes */}
      </div>
    </div>
    )
}
