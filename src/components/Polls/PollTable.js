import React from 'react'

export function PollTable() {
    return (
        <div style={{ overflowX: "hidden", margin: "0px", width:"100%", height:"100%"}}>
        <div className="card-body">
    
    <table className="table table-striped" id="example"
    style={{backgroundColor:"#EFF6FF", color:"black",height:"100px", width:"100%", padding:"10px"}}>
                  <thead style={{background:"white"}}>
                    <tr style={{padding:"10px", marginBottom:"10px", borderBottom:"none"}}>
                   
                    <th style={{ width: "15%" ,borderBottom:"none",fontSize:"15px",textAlign:"center"}} >
                    Recipient 
                      </th>
                      <th style={{ width: "20%" ,borderBottom:"none",fontSize:"15px",textAlign:"center"}} >
                      Question
                      </th>
                      <th style={{ width: "20%" , borderBottom:"none",fontSize:"15px",textAlign:"center"}} >
                      Comment
                      </th>
                      <th style={{ width: "15%" , borderBottom:"none",fontSize:"15px",textAlign:"center"}} >
                      Response
                      </th>
                      <th style={{ width: "30%" , borderBottom:"none",fontSize:"15px",textAlign:"center"}} >
                      Student-Advisor Meeting
                      </th>
                    </tr>
                  </thead>
    
                  <tbody style={{width:"100%" }}>
                    <tr style={{padding:"0"}}><td colspan="6" style={{backgroundColor:"#EFF6FF",border:"none", padding:"0px", margin:"7px"}}></td></tr>
                    <tr className="text-center" style={{background:"white"}}>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Persona</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Do you think that the school provides you with adequate sports facilities?</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item" >Yes</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Positive</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">None</li></td>
                  </tr>
  
                  <tr className="text-center" style={{background:"white"}}>
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Group</li></td>
                 <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Do you liked the orientation?</li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item" >Orientation was not up to the mark</li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Negative</li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">
                       <div style={{fontSize:"12PX"}}>Date-Nov 20,2021</div>
                       <div style={{fontSize:"12PX"}}>Time-02:00 p.m.</div>
                       </li></td>
                 </tr>
  
                 <tr className="text-center" style={{background:"white"}}>
                 
                 <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Group</li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item" >
                   <label style={{ fontSize:"15px",fontWeight:"400"}}>Who should lead your class?</label><br />
           <input type="radio"style={{float:"left"}}/>
             <label for="html" style={{fontSize:"15px",fontWeight:"400"}}>Pranav</label><br />
           <input type="radio" id="css" name="fav_language" value="CSS" style={{float:"left"}}/>
             <label for="css" style={{fontSize:"15px",fontWeight:"400"}}>Abhishekh</label><br />
<input type="radio" id="css" name="fav_language" value="CSS" style={{float:"left"}}/>
             <label for="css" style={{ fontSize:"15px",fontWeight:"400"}}>Disha</label>
                           </li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Abhishekh</li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Positive</li></td>
                   <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">None</li></td>
                 </tr>
    
                    <tr className="text-center" style={{background:"white"}}>
                 
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Individual</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item" >Do you think you are getting all the facility?</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">No</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">Negative</li></td>
                    <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item">
                       <div style={{fontSize:"12PX"}}>Date-Nov 20,2021</div>
                       <div style={{fontSize:"12PX"}}>Time-02:00 p.m.</div>
                       </li></td>
                  </tr>
  
                  </tbody>
                </table>
                </div>
    
      
      </div>
    )
}
