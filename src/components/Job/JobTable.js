import React from 'react'
import { Link } from "react-router-dom";

export function JobTable() 
{

     
    return (
      <div style={{ overflowX: "auto", padding:"0",margin: "0px", width:"90%", height:"100%"}}>
      <div className="card-body" style={{paddingTop:"0",paddingRight:"80PX"}}>
  
  <table className="table table-striped" id="example"
  style={{backgroundColor:"#EFF6FF", color:"black",height:"100px", width:"100%", padding:"0px",fontFamily:"Poppins"}}>
                <thead style={{background:"white"}}>
                  <tr style={{padding:"10px", marginBottom:"10px", borderBottom:"none"}}>
                 
                  <td style={{ textAlign:"left",width: "25%",borderBottom:"none",fontSize:"12px",fontWeight:"700"}} >
                      Job Title
                    </td>
                    <td style={{ textAlign:"left",width: "25%" ,borderBottom:"none",fontSize:"12px",fontWeight:"700"}} >
                    Company Name
                    </td>
                    <td style={{ textAlign:"left",width: "17%" , borderBottom:"none",fontSize:"12px",fontWeight:"700"}} >
                    Job Location
                    </td>
                    <td style={{textAlign:"left", width: "16%" , borderBottom:"none",fontSize:"12px",fontWeight:"700"}} >
                    Posted On
                    </td>
                    <td style={{textAlign:"left", width: "17%" , borderBottom:"none",fontSize:"12px",fontWeight:"700"}} >
                    Status
                    </td>
                   
                  </tr>
                </thead>
  
                <tbody style={{width:"100%" }}>
                  <tr style={{padding:"0"}}><td colspan="6" style={{backgroundColor:"#EFF6FF",border:"none", padding:"0px", margin:"7px"}}></td></tr>
                  <tr className="text-center" style={{background:"white"}}>
               
                <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}>
                  <Link to="/viewJob">
                  <li className="list-inline-item" style={{color:"black"}}>Frontend Developer</li>
                  </Link>
                 
                  </td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item" >Wipro</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Bangalore</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">17/10/21</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Status</li></td>
                </tr>

                <tr className="text-center" style={{background:"white"}}>
               
               <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Java Developer</li></td>
                 <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item" >TIBCO Software India Pvt Ltd</li></td>
                 <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Hydrabad</li></td>
                 <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">21/10/21</li></td>
                 <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">status</li></td>
               </tr>

               <tr className="text-center" style={{background:"white"}}>
               <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Software Engineer</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item" >Veritas Technologies</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Pune</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">25/11/21</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">status</li></td>
                  
               </tr>
  
               <tr className="text-center" style={{background:"white"}}>
               <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Graphic Designer</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item" >Reynold Infotech</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Delhi</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">27/11/21</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">status</li></td>
                  
               </tr>

               <tr className="text-center" style={{background:"white"}}>
               <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">.net Developer</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item" >JPMorgan</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Chennai</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">30/11/21</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">status</li></td>
                  
               </tr>
                </tbody>
              </table>
              </div>
  
    
    </div>
    )
}
