import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import DataTable from 'react-data-table-component';
import FilterComponentStudent from "./FilterComponentStudent";
import "./StudentTable.css"

export function StudentTable() {


  const [data, setData] = useState([]);


  useEffect(() => {
    fetchStudentList();
  }, []);


  async function fetchStudentList() {
    const token = localStorage.getItem('Token');
   
    try {

      const fetchStudentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_students_list",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            // "X-Requested-With": "XMLHttpRequest",
            "Authorization": token,
          }
        }
      );


  


      const StudentErrorCode = fetchStudentResponse.data.error_code;
      const StudentErrorMsg = fetchStudentResponse.data.message;
      if (StudentErrorCode == 200) {
        const studentListArray = fetchStudentResponse.data.data;
        setData(studentListArray);
      }
      else {
        setData([]);
      
        $(".alert-danger").show();
        setTimeout(function () {
          $(".alert-danger").hide();
        }, 3000);
      }

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  return (
    <div className="table-content" style={{ overflowX: "auto", padding: "0", margin: "0px", width: "100%", height: "auto" }}>
      {/* {data.length != 0 ? */}
        <div className="card-body" style={{ paddingTop: "0", paddingRight: "80PX" }}>

          <table className="table table-striped" id="example"
            style={{ backgroundColor: "#EFF6FF", color: "black", height: "100px", width: "100%", padding: "0px", fontFamily: "Poppins" }}>
            <thead style={{ background: "white" }}>
              <tr style={{ padding: "10px", marginBottom: "10px", borderBottom: "none" }}>
                <td style={{ width: "5%", borderBottom: "none", fontSize: "15px", padding: "10px", verticalAlign: "middle" }} className="text-center">
                  <input type="checkbox" />
                </td>
                <td style={{ textAlign: "left", width: "15%", borderBottom: "none", fontSize: "12px", fontWeight: "700", }}  >
                  ID
             </td>
                <td style={{ textAlign: "left", width: "20%", fontWeight: "700", borderBottom: "none", fontSize: "12px" }}>
                  Name
             </td>
                <td style={{ width: "15%", fontWeight: "700", borderBottom: "none", fontSize: "12px", }} >
                  Class/Course
             </td>
                <td style={{ width: "15%", fontWeight: "700", borderBottom: "none", fontSize: "12px" }} >
                  Parent Name
             </td>
                <td style={{ width: "15%", fontWeight: "700", borderBottom: "none", fontSize: "12px" }} >
                  Persona
             </td>
                <td style={{ width: "15%", fontWeight: "700", borderBottom: "none", fontSize: "12px" }} >
                  Contact
             </td>
              </tr>
            </thead>

            <tbody style={{ width: "100%" }}>
              <tr style={{ padding: "0" }}><td colspan="7" style={{ backgroundColor: "#EFF6FF", border: "none", padding: "0px", margin: "7px", textAlign: "center" }}></td></tr>

              {data.map((item, index) => {
                return (
                  <tr className="text-center" style={{ background: "white" }} key={item.campus_id}>
                    <td style={{ width: "5%", borderBottom: "none", fontSize: "15px", padding: "10px", verticalAlign: "middle" }} className="text-center">
                      <input type="checkbox" />
                    </td>
                    <td style={{ padding: "20px 10px", borderTop: "0", textAlign: "left", fontSize: "12px", fontWeight: "500" }}><li className="list-inline-item" >{item.student_id}</li></td>
                    <td style={{ padding: "20px 10px", borderTop: "0", textAlign: "left", fontSize: "12px", fontWeight: "500" }}><li className="list-inline-item" >{item.student_name}</li></td>
                    <td style={{ padding: "20px 10px", borderTop: "0", textAlign: "left", fontSize: "12px", fontWeight: "500" }}><li className="list-inline-item">{item.class_course}</li></td>
                    <td style={{ padding: "20px 10px", borderTop: "0", textAlign: "left", fontSize: "12px", fontWeight: "500" }}><li className="list-inline-item">{item.parents_name}</li></td>
                    <td style={{ padding: "20px 10px", borderTop: "0", textAlign: "left", fontSize: "12px", fontWeight: "500" }}><li className="list-inline-item">{item.persona}</li></td>
                    <td style={{ padding: "10px", borderTop: "0", fontWeight: "500" }}>
                      <li className="list-inline-item">
                        <div className="d-flex" style={{ textAlign: "center" }}>
                          <div style={{ borderRadius: "50%", width: "35px", height: "35px", background: "#1F3977", padding: "5px" }}>
                            <i class="fas fa-mobile-alt" style={{ color: "white", marginTop: "3px", fontSize: "20px", borderRadius: "50%" }}></i>
                          </div>
                          <div style={{ borderRadius: "50%", width: "35px", height: "35px", background: "#1F3977", padding: "5px", marginLeft: "10px" }}>
                            <i class="fas fa-paper-plane" style={{ color: "white", marginTop: "5px", fontSize: "20px", borderRadius: "50%" }}></i>
                          </div>
                        </div>
                      </li>
                    </td>

                    {/* <td style={{padding:"20px 10px", borderTop:"0", textAlign:"left",fontSize:"12px",fontWeight:"500"}}><li className="list-inline-item">{item.password}</li></td>     */}

                  </tr>

                )

              })}



            </tbody>
          </table>
        </div>
        {/* // :
         <div class="alert alert-danger" role="alert" style={{ marginLeft: "18px", marginRight: "80px", padding: "5px", fontFamily: "Poppins" }}>
           Error Occurred While Fetching Data!!
         </div>
       } */}

         <div class="alert alert-danger" role="alert" style={{ marginLeft: "18px", marginRight: "80px", padding: "5px", fontFamily: "Poppins" }}>
           Error Occurred While Fetching Data!!
         </div>



    </div>

  )
}
