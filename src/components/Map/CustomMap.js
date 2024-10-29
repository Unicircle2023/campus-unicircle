import React, { useState, useEffect } from "react";
import axios from 'axios';
import Geocode from "react-geocode";

export function CustomMap()
{
    const [lat, updateLat] = useState("");
    const [long, updateLong] = useState([]);
    const [address, updateAddress] = useState("");
    
    const token = localStorage.getItem('Token');
    const [data, setData] = useState([]);

    async function createCampusAddress() {
        try {
            const formDataCategory = new FormData();

           
            formDataCategory.append("lat", lat);
            formDataCategory.append("long", long);
            formDataCategory.append("address", address);
            const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_edit_campus_address",
                formDataCategory,
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',
                        "Authorization": token,
                    }
                });

            console.log("Create address from map", response);
            // setData([responseCategory.data])

            // updateNewsCategory("");

        }
        catch (err) {
            console.log("Log in Fail", err);

        }


    }
  
    return (
        <div className="content-wrapper">
              <div className="d-flex" style={{marginTop:"20px",padding:" 0PX 80px"}}>
                  <div>
                  <div id="latclicked" style={{textAlign:"left"}} ></div>
		<div id="longclicked"  style={{textAlign:"left"}} ></div>
                  </div>
            <h4 style={{color:"black",fontWeight:"bold", marginTop:"7px",marginLeft:"AUTO"}}>CAMPUS MAP</h4>
            <i class="fa fa-bars" style={{marginLeft:"10PX",marginTop:"7PX"}}></i>
          

</div>
{/* faq tabs */}
<div style={{margin:"20px 30px 0px 30px ",fontFamily:"Poppins"}}>
       
       
		<div style={{width:"100%"}} >
           
			<div id="map" style={{width:"100%"}}></div>
            
		</div>
    </div>
{/* faq tabs end */}


        </div>



    )
}
