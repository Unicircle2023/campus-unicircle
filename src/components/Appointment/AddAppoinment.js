import React from 'react'

export function AddAppoinment() 
{
    
    return (
        <div className="form-group">
      {/* Id */}
<div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Appointment ID</p>
           <input
             type="name"
             className="border"
             id="exampleInputEmail1"
             placeholder="Enter ID"
             style={{width: "100%", height:"35px", border:"1px solid grey"}}
            
           />
         </div>

         {/* Student name */}
         <div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Reason For Appointment</p>
           <input
             type="name"
             className="border"
             id="exampleInputEmail1"
             placeholder="Enter Student Name"
             style={{width: "100%", height:"35px", border:"1px solid grey"}}
            
           />
         </div>

          {/* class/course */}
          <div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Booked By</p>
          
           <select className="form-select form-select-sm border" aria-label=".form-select-sm example" style={{width:"100%", padding:"5px", color:"grey"}}>
               <option>Student</option>
               <option>Teacher</option>
           </select>
         </div>

         {/* Student name */}
         <div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Student Name</p>
           <input
             type="name"
             className="border"
             id="exampleInputEmail1"
             placeholder="Enter Student's Name"
             style={{width: "100%", height:"35px", border:"1px solid grey"}}
            
           />
         </div>

         {/* Teacher name */}
         <div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Teacher Name</p>
           <input
             type="name"
             className="border"
             id="exampleInputEmail1"
             placeholder="Enter Teacher's Name"
             style={{width: "100%", height:"35px", border:"1px solid grey"}}
            
           />
         </div>

            {/* date */}
            <div className="form-group">
                            <p style={{color:"#1F3977"}}>Date</p>
                            <input
                              type="date"
                              className="border"
                              id="exampleInputEmail1"
                              style={{width: "100%", height:"35px", color:"grey", paddingLeft:"10px"}}
                             
                            />
                          </div>

   {/* Duration */}
   <div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Duration</p>
           <input
             type="name"
             className="border"
             id="exampleInputEmail1"
             placeholder="Enter Duration"
             style={{width: "100%", height:"35px", border:"1px solid grey"}}
            
           />
         </div>
       
    {/* Venue */}
    <div className="form-group" style={{marginTop:"10px"}}>
           <p style={{color:"#1F3977"}}>Venue</p>
           <input
             type="name"
             className="border"
             id="exampleInputEmail1"
             placeholder="Enter Venue"
             style={{width: "100%", height:"35px", border:"1px solid grey"}}
            
           />
         </div>
     <div className="mt-3">
      
       
     <input
       type="button"
       className="create_btn"
       defaultValue="Sign Up"
     
       value="Submit"
       style={{ borderRadius:"5px", marginLeft:"370px", backgroundColor:"#1F3977" }}
     />
   
     
     </div>
    
    
</div>
    )
}
