import React from 'react'

export function Tickets() {
    return (
        <div>
          <div style={{ background:"white",}}>
            <p style={{margin:"10px", fontWeight:"bold"}}>Tickets</p>
            <table style={{width:"100%"}}>
                 <tr>
                     <td style={{padding:"8px"}}>
                         <div style={{fontWeight:"bold",fontSize:"12px"}}>11924</div>    
                    </td>
                    <td style={{padding:"0px"}}>
                        
                         <div style={{fontWeight:"bold",fontSize:"12px",color:"#339dd8"}}>Regarding Audition</div>
                    </td>
                     <td style={{padding:"0px", marginLeft:"0"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px", padding:"0", margin:"0",float:"right"}}>Date:</div>
                         
                    </td>
                    <td style={{padding:"8px", paddingLeft:"3px"}}>
                        
                         <div style={{fontWeight:"600",fontSize:"12px"}}>April 03, 2021</div>
                    </td>
                    <td style={{padding:"0px",}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px", padding:"0", margin:"0",float:"right"}}>Status:</div>
                         
                    </td>
                    <td style={{padding:"8px", paddingLeft:"3px"}}>
                        
                         <div style={{fontWeight:"500",fontSize:"12px", color:"red"}}>Closed</div>
                    </td>
                    <td style={{padding:"0px"}}>
                         <div style={{color:"grey", fontWeight:"bold",fontSize:"12px", padding:"0", margin:"0",float:"right"}}>Priority:</div>
                         
                    </td>
                    <td style={{padding:"8px", paddingLeft:"3px"}}>
                        
                         <div style={{fontWeight:"600",fontSize:"12px"}}>High</div>
                    </td>
                 </tr>

                 <tr>
                     <td style={{padding:"8px"}}>
                         <div style={{fontWeight:"bold",fontSize:"12px"}}>16879</div>    
                    </td>
                    <td style={{padding:"0px"}}>
                        
                         <div style={{fontWeight:"bold",fontSize:"12px",color:"#339dd8"}}>Degree Planning</div>
                    </td>
                     <td style={{padding:"0px", marginLeft:"0"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px", padding:"0", margin:"0",float:"right"}}>Date:</div>
                         
                    </td>
                    <td style={{padding:"8px", paddingLeft:"3px"}}>
                        
                         <div style={{fontWeight:"600",fontSize:"12px"}}>March 30, 2021</div>
                    </td>
                    <td style={{padding:"0px",}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px", padding:"0", margin:"0",float:"right"}}>Status:</div>
                         
                    </td>
                    <td style={{padding:"8px", paddingLeft:"3px"}}>
                        
                         <div style={{fontWeight:"500",fontSize:"12px", color:"#32cd32"}}>Pending</div>
                    </td>
                    <td style={{padding:"0px"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px", padding:"0", margin:"0",float:"right"}}>Priority:</div>
                         
                    </td>
                    <td style={{padding:"8px", paddingLeft:"3px"}}>
                        
                         <div style={{fontWeight:"600",fontSize:"12px"}}>Low</div>
                    </td>
                 </tr>
                 </table>
                 <div className="d-flex" style={{padding:"0"}}>
                     <p style={{fontSize:"10px", color:"darkgrey", marginLeft:"auto", marginTop:"0px", marginBottom:"0",fontWeight:"bold"}}>View All</p>
                     </div>
           </div>   
        </div>
    )
}
