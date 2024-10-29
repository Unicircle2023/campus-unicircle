import React,{useEffect,useState} from 'react'
import axios from "axios";

export function AppNotification() {
  const token = localStorage.getItem('Token');
  const [notificationData,updateNotificationData] = useState([])
  async function getNotification()
  {
    const fetchMarketplaceResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_notification",
    {
      headers:
      {
        "Content-Type": 'multipart/form-data',

        "Authorization": token,
      }
    }
  );

  // console.log("Get app notification", fetchMarketplaceResponse);
  if(fetchMarketplaceResponse.data.error_code == 200)
  {
    updateNotificationData(fetchMarketplaceResponse.data.data)
  }
  }
  useEffect(() => {
    getNotification();
  }, [])
  
  return (
    <div style={{ paddingBottom: "10PX" }}>
      <div className="d-flex" style={{ borderBottom: "1px solid black", margin: "10px", paddingBottom: "5PX" }}>
        <div style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "16px", color: "black" }}>Notification</div>
        {/* <div style={{ background: "#f4f4f4", borderRadius: "50%", marginLeft: "auto", padding: "3px", width: "30px", height: "30px", textAlign: "center", color: "black" }}><BiSearchAlt2 style={{ borderRadius: "50%" }} /></div> */}
      </div>

      {/* 1st notification */}
      {notificationData == "" ?
      (<div style={{color:"black",fontSize:"15PX",marginLeft:"10px"}}>
        NO DATA AVAILABLE
        </div>):
        (
          <div>
            {notificationData.map((item) =>
      {
        return(
<div className="d-flex notification_dropup" style={{ width: "100%", marginTop: "5px" }}>
        <div style={{ textAlign: "center", marginLeft: "10px", width: "15%" }}>
          <img style={{ borderRadius: "50%", width: "50px", height: "50px" }} className="ml-auto " alt="App_notificatione" src="dist/img/GIRL.jpg" />
        </div>
        <div style={{ marginLeft: "5px", marginRight: "5px", fontSize: "12PX", width: "70%", color: "black" }} >
         {item.description}
          <div style={{ color: "#339dd8", fontSize: "11PX", padding: "0" }}>{item.created_at}</div>
        </div>
        {/* <div style={{ width: "15%", paddingRight: "10px", color:"black"}} className='d-flex'><BsThreeDots style={{ marginLeft: "auto" }} /></div> */}
      </div>
        )
      })}
            </div>
        )}
      
      
      {/* end 1st notification */}
      
    </div>
  )
}
