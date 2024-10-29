import React from 'react'

export function AddSellingItem() {
    return (
        <div className="form-group">
        {/* Teacher name */}
<div className="form-group" style={{marginTop:"10px"}}>
             <p style={{color:"#1F3977"}}>Item Name</p>
             <input
               type="name"
               className="border"
               id="exampleInputEmail1"
               placeholder="Enter Item Name"
               style={{width: "100%", height:"35px", border:"1px solid grey"}}
              
             />
           </div>

           {/* department */}
           <div className="form-group" style={{marginTop:"10px"}}>
             <p style={{color:"#1F3977"}}>Description</p>
             <textarea
               type="name"
               className="border"
               id="exampleInputEmail1"
               placeholder="Enter Description"
               style={{width: "100%", height:"35px", border:"1px solid grey"}}
              
             />
           </div>


          {/* conatct info */}
{/* student photo */}
     
     
            {/* Upload file */}
            <div className="form-group">
             <p style={{color:"#1F3977"}}>Upload File</p>
             <input type="file" id="myFile" name="filename" style={{width:"100%"}} />
           </div>
       {/* upload file */}
           
          
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
