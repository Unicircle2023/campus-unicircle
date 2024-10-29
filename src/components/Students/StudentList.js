import {Link} from "@react-router-dom";

function StudentList(){
    return(
        <div>
        <tr style={{padding:"0"}}><td colspan="7" style={{backgroundColor:"#EFF6FF",border:"none", padding:"0px", margin:"7px",textAlign:"center"}}></td></tr>
                <tr className="text-center" style={{padding:"10px", fontSize:"10px"}}>
                <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">
                <input type="checkbox"/>

                  </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0", float:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">#0001234</li></td>
                  <td style={{padding:"10px", borderTop:"0" }}><li className="list-inline-item d-flex" >
                  <img
                src="dist/img/boy.jpg"
                className="text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px", borderRadius:"50%"}}
              />
                <Link to="/viewStudent">
                      <p style={{fontSize:"14px",fontWeight:"600",marginLeft:"15px", marginTop:"8px",textAlign:"center",color:"black"}}>Dhruv Saigal</p>
                </Link>
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0",fontWeight:"500"}}><li className="list-inline-item" STYLE={{verticalAlign: "middle"}}>F.Y.B. Com</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0",fontWeight:"500"}}><li className="list-inline-item">Mr. Kawal Saigal</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0",fontWeight:"500"}}><li className="list-inline-item">Sports Quota</li></td>
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
                <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">
                <input type="checkbox"/>

                  </li></td>
                <td style={{padding:"20px 10px", borderTop:"0",float:"left",fontWeight:"500"}}><li className="list-inline-item">#0001234</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item d-flex" >
                  <img
                src="dist/img/boy.jpg"
                className="img elevation text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px", borderRadius:"50%"}}
              />
                <Link to="/viewStudent">
                      <p style={{fontWeight:"600",marginLeft:"15px", marginTop:"8px",color:"black",fontSize:"14PX"}}>Dhruv Saigal</p>
                </Link>
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">F.Y.B. Com</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">Mr. Kawal Saigal</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">Sports Quota</li></td>
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
                <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">
                <input type="checkbox" />

                  </li></td>
                <td style={{padding:"20px 10px", borderTop:"0",float:"left",fontWeight:"500"}}><li className="list-inline-item">#0001234</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item d-flex" >
                  <img
                src="dist/img/boy.jpg"
                className="img elevation text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px", borderRadius:"50%"}}
              />
              <Link to="/viewStudent">
                      <p style={{fontWeight:"600",marginLeft:"15px", marginTop:"8px",color:"black",fontSize:"14PX"}}>Dhruv Saigal</p>
                </Link>
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">F.Y.B. Com</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">Mr. Kawal Saigal</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">Sports Quota</li></td>
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
                <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">
                <input type="checkbox" />

                  </li></td>
                <td style={{padding:"20px 10px", borderTop:"0",float:"left",fontWeight:"500"}}><li className="list-inline-item">#0001234</li></td>
                  <td style={{padding:"10px", borderTop:"0"}}><li className="list-inline-item d-flex" >
                  <img
                src="dist/img/boy.jpg"
                className="img elevation text-center"
                alt="User Image" 
                style={{ width: "40px", height:"40px", borderRadius:"50%"}}
              />
                <Link to="/viewStudent">
                      <p style={{fontWeight:"600",marginLeft:"15px", marginTop:"8px",color:"black",fontSize:"14PX"}}>Dhruv Saigal</p>
                </Link>
                </li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">F.Y.B. Com</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">Mr. Kawal Saigal</li></td>
                  <td style={{padding:"20px 10px", borderTop:"0"}}><li className="list-inline-item">Sports Quota</li></td>
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
          </div>
    )
}
export default StudentList;