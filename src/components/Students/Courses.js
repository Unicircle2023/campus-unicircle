import React, { useState ,useEffect} from 'react'
import $ from "jquery";
import moment from "moment"
import axios from "axios";
import {MdEmojiSymbols} from "react-icons/md"
import {ImLab} from "react-icons/im"
import {TiSortAlphabetically} from "react-icons/ti"
import {AiOutlineCompass} from "react-icons/ai"
export function Courses() {
  const token = localStorage.getItem('Token');
  const[data,setData] = useState([])
  async function fetchSubject() {
    try {
      

        // const formData = new FormData();
        // formData.append("course_id", 1);
        const response = await axios.get(process.env.REACT_APP_API_KEY + "campus_get_course",
          // formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',
              
              "Authorization": token,
            }
          });

        // console.log("Show course list", response.data.data);
       
        if(response.data.error_code == 200)
        {
          setData(response.data.data)
        }
       
    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }
  useEffect(() => {
    fetchSubject() 
  }, [])
  
    return (
      
      <div>
  
  <section >
          <div className="container-fluid" style={{padding:"0",fontFamily:"Poppins"}}>
         
          <p style={{fontSize:"14px",fontWeight:"600",float:"left",padding:"15px"}}>COURSE LIST</p>
            <div className="row" style={{margin:"0px", paddingRight:"0"}}>
              {data.map((item =>
                {
                  return(
                    <div className="col-md-4" style={{height:"100%",  padding:"5px"}}>
                    <div className="small-box" style={{background:"WHITE",height:"AUTO",marginRight:"10PX",borderLeft:"3px solid #339dd8",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}>
                   
                    <p style={{fontSize:"15px", fontWeight:"500"}}>
                    {item.course_name}
                    </p>
                    <input
                    type="button"
                    className="create_btn"
                    value="Add To Suggestion"
                    // onClick={() => createMessage()}
                    style={{ borderRadius: "5px", marginLeft: "auto", backgroundColor: "#339dd8",fontSize:"13PX",padding:"8px 12px" }}
                  />
       
                      </div>
                    </div>
                  )
                }))}
            
              </div>
    
              </div>
  </section>
</div>

    )
}
