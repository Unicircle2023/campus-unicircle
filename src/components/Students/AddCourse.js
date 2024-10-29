import React from 'react'
import {IoMdAddCircle} from "react-icons/io"
import {BsImageFill} from "react-icons/bs"
export function AddCourse() {
    return (
        <div style={{padding:"10px"}}>
          <div className="" style={{ width:"100%"}}>
           {/* <label style={{color:"#1F3977", fontSize:"12px", fontWeight:"bold",background:"none"}}>Select Category*</label> */}
           <select className="form-select form-select-sm " aria-label=".form-select-sm example" style={{width:"100%", padding:"5px",fontSize:"12px", color:"grey", border:"1px solid grey",marginTop:"10PX"}}>
  <option selected>Select Category</option>
  <option value="1">Course</option>
  <option value="2">Extra Course</option>
 
 
</select>
         </div>
         <div className="" style={{ width:"100%"}}>
           {/* <label style={{margin:"0",color:"#1F3977", fontSize:"12px", fontWeight:"bold",background:"none",padding:"0px",border:"1px solid red"}}> */}
               <div style={{fontSize:"12px", fontWeight:"bold",textAlign:"left",padding:"15px 0px 5px 5px"}}>Course Name*</div>
               {/* </label> */}
           <input
             type="name"
             id="exampleInputEmail1"
             placeholder="Enter Course Name..."
             style={{width: "100%", height:"30px", border:"1px solid grey",fontSize:"12px", paddingLeft:"5PX"}}
            
           />
         </div>
            
         <div >
         <div style={{fontSize:"12px", fontWeight:"bold",textAlign:"left",padding:"15px 0px 5px 5px"}}>Description*</div>
           {/* <input type="file" /> */}
           {/* <input
             type="name"
             placeholder="Enter Course Name..."
             style={{width: "100%", height:"30px", border:"1px solid grey",fontSize:"12px", paddingLeft:"5PX"}}
            
           /> */}

           <textarea style={{width: "100%", height:"40px", border:"1px solid grey",fontSize:"12px", paddingLeft:"5PX"}}
              placeholder="Enter Course Description..."
           >

           </textarea>

         </div>
           
           
            <div className="" style={{margin:"10px 20px 0px 20px",background:"white", padding:"10px"}}>

       <input
        type="button"
        className="create_btn"
        defaultValue="Sign Up"
        value="Submit"
        style={{ fontWeight:"bold",borderRadius:"5px", marginLeft:"5px", backgroundColor:"#1F3977",padding:"10px 30px",fontSize:"12PX" }}
      />
      
    
      </div>
        </div>
    )
}
