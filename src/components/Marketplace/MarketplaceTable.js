import React from 'react'
import { Link } from "react-router-dom";

export function MarketplaceTable() {
    return (
      <div style={{ overflowX: "auto", padding:"0",margin: "0px", width:"90%", height:"100%"}}>
    <div className="card-body" style={{paddingTop:"0",paddingRight:"80PX"}}>

    <table className="table table-striped" id="example"
style={{backgroundColor:"#EFF6FF", color:"black",height:"100px", width:"100%", padding:"0px",fontFamily:"Poppins"}}>
              <thead style={{background:"white"}}>
                <tr style={{padding:"10px", marginBottom:"10px", borderBottom:"none"}}>
                
                <td style={{ textAlign:"center",width: "20%",borderBottom:"none",fontSize:"12px",fontWeight:"700",}}  >
                  Item Image
                  </td>
                  <td style={{textAlign:"left", width: "22%" ,fontWeight:"700",borderBottom:"none",fontSize:"12px"}}>
                    Item Name
                  </td>
                  <td style={{ textAlign:"left",width: "18%" , fontWeight:"700",borderBottom:"none",fontSize:"12px",}} >
                    Prize
                  </td>
                  <td style={{ textAlign:"left",width: "20%" ,fontWeight:"700", borderBottom:"none",fontSize:"12px"}} >
                    Category
                  </td>
                  <td style={{ textAlign:"center",width: "20%", fontWeight:"700",borderBottom:"none" ,fontSize:"12px"}} >
                    Contact
                  </td>
                </tr>
              </thead>

              <tbody style={{width:"100%" }}>
                <tr style={{padding:"0"}}><td colspan="7" style={{backgroundColor:"#EFF6FF",border:"none", padding:"0px", margin:"7px",textAlign:"center"}}></td></tr>
                <tr className="text-center" style={{padding:"10px", fontSize:"10px"}}>
                  <td style={{padding:"10px", borderTop:"0" }}><li className="list-inline-item" >
                  <img
                src="dist/img/pencil.jpg"
                className="text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px"}}
              />
   
                </li></td>
                
                <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}>
                <Link to="/viewItem">
                  <li className="list-inline-item" style={{color:"black"}}>Staedtler Colour Pencil</li>
                  </Link>
                  </td>
              
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item" STYLE={{verticalAlign: "middle"}}>Rs. 580</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">College Stationary</li></td>
                  
                  <td style={{padding:"10px", borderTop:"0",fontWeight:"500"}}>
                  <li className="list-inline-item">
                  <div className="d-flex" style={{textAlign:"center"}}>
                        <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977",padding:"5px"}}>
                            <i class="fas fa-mobile-alt" style={{color:"white", marginTop:"3px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977", padding:"5px",marginLeft:"10px"}}>
                            <i class="fas fa-paper-plane" style={{color:"white", marginTop:"5px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        </div>
                        </li>
                  </td>
                </tr>

                <tr className="text-center" style={{background:"white"}}>
              
               
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item " >
                  <img
                src="dist/img/pencil.jpg"
                className="img elevation text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px"}}
              />
              
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Physics</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Rs. 1000</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Used Stationary</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}>
                  <li className="list-inline-item">
                  <div className="d-flex">
                  <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977",padding:"5px"}}>
                            <i class="fas fa-mobile-alt" style={{color:"white", marginTop:"3px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977", padding:"5px",marginLeft:"10px"}}>
                            <i class="fas fa-paper-plane" style={{color:"white", marginTop:"5px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        </div>
                        </li>
                  </td>
                </tr>
               
                <tr className="text-center">
               
               
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item " >
                  <img
                src="dist/img/pencil.jpg"
                className="img elevation text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px"}}
              />
              
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Bagpack</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Rs. 2000</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Used Stationary</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}>
                  <li className="list-inline-item">
                  <div className="d-flex">
                  <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977",padding:"5px"}}>
                            <i class="fas fa-mobile-alt" style={{color:"white", marginTop:"3px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977", padding:"5px",marginLeft:"10px"}}>
                            <i class="fas fa-paper-plane" style={{color:"white", marginTop:"5px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        </div>
                        </li>
                  </td>
                </tr>

                <tr className="text-center" style={{background:"white"}}>
                
              
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item " >
                  <img
                src="dist/img/pencil.jpg"
                className="img elevation text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px"}}
              />
               
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Pens</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Free</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">Charity</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}>
                  <li className="list-inline-item">
                  <div className="d-flex">
                  <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977",padding:"5px"}}>
                            <i class="fas fa-mobile-alt" style={{color:"white", marginTop:"3px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        <div style={{borderRadius:"50%", width:"35px", height:"35px", background:"#1F3977", padding:"5px",marginLeft:"10px"}}>
                            <i class="fas fa-paper-plane" style={{color:"white", marginTop:"5px",fontSize:"20px",borderRadius:"50%"}}></i>
                        </div>
                        </div>
                        </li>
                  </td>
                </tr>

                
              </tbody>
            </table>
            </div>

  
  </div>
    )
}
