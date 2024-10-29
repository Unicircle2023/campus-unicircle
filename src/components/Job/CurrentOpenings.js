import React from "react";

export function CurrentOpenings() 
{
    
        return(             
   <div>
  
  {/* post marketplace info */}
<div style={{ overflowX: "hidden", margin: "0px", width:"100%"}}>
        <div className="card-body" style={{margin:"0", padding:"10px"}}>
    
    <table className="table table-striped projects" id="example"
    style={{backgroundColor:"white", color:"black", width:"100%", marginLeft:"0px"}}>
                  <thead>
                    <tr style={{background:"#1F3977", color:"white"}}>
                    <th  style={{ width: "10%" }} className="text-center">
                        Date
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        Company Name
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        Job Location
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        Qualification
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        Interview Date
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        Job Description
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
    
                  <tbody style={{width:"100%"}}>
                   
                    <tr className="text-center">
                      <td><li className="list-inline-item">21/10/2021</li></td>
                      <td><li className="list-inline-item">Wipro</li></td>
                      <td><li className="list-inline-item">Bangalore</li></td>
                      <td><li className="list-inline-item">MCA</li></td>
                      <td><li className="list-inline-item">30/10/21</li></td>
                      <td ><p className="text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                         elit, sed do eiusmod tempor incididunt ut labore
                        </p></td>
                      <td >
                        <div className="d-flex">
                        <p><i class="fas fa-edit fa-lg" style={{color:"green", marginLeft:"40px"}}></i></p>
                        <p><i class="fas fa-trash-alt fa-lg" style={{color:"red", marginLeft:"10px",  textAlign:"center"}}></i></p>
                        </div>
                        </td>
                      
                    </tr>
    
                    <tr className="text-center">
                    <td><li className="list-inline-item">21/10/2021</li></td>
                      <td><li className="list-inline-item">Appzia</li></td>
                      <td><li className="list-inline-item">Pune</li></td>
                      <td><li className="list-inline-item">MCA</li></td>
                      <td><li className="list-inline-item">30/10/21</li></td>
                      <td ><p className="text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                         elit, sed do eiusmod tempor incididunt ut labore
                        </p></td>
                      <td >
                        <div className="d-flex">
                        <p><i class="fas fa-edit fa-lg" style={{color:"green", marginLeft:"40px"}}></i></p>
                        <p><i class="fas fa-trash-alt fa-lg" style={{color:"red", marginLeft:"10px",  textAlign:"center"}}></i></p>
                        </div>
                        </td>
                      
                    </tr>
                   
                    <tr className="text-center">
                    <td><li className="list-inline-item">21/10/2021</li></td>
                      <td><li className="list-inline-item">Tech Mahindra</li></td>
                      <td><li className="list-inline-item">Hydrabad</li></td>
                      <td><li className="list-inline-item">MCA</li></td>
                      <td><li className="list-inline-item">30/10/21</li></td>
                      <td ><p className="text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                         elit, sed do eiusmod tempor incididunt ut labore
                        </p></td>
                      <td >
                        <div className="d-flex">
                        <p><i class="fas fa-edit fa-lg" style={{color:"green", marginLeft:"40px"}}></i></p>
                        <p><i class="fas fa-trash-alt fa-lg" style={{color:"red", marginLeft:"10px",  textAlign:"center"}}></i></p>
                        </div>
                        </td>
                      
                      
                    </tr>
    
                  </tbody>
                </table>
                </div>
    
      
      </div>

{/* end marketplace info */}
      </div>  
     
            
    
  )
        
}
