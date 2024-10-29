import React from "react";
import styled from "styled-components";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi"
import { BsSortUp } from "react-icons/bs"
import { Link } from "react-router-dom";

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponentStudent = ({ filterText, onFilter, onClear }) => (


  <div style={{ width: "100%",padding:"0",background:"#e4e9f4"}}>
    <div className="row" style={{ width: "100%", margin: "0",padding:"5px 0"}} >

      <div className="col-md-5" style={{ height: "100%", padding: "0px 5px"}}>
        <h4 style={{ color: "#000000", fontWeight: "600", fontFamily: "Poppins", fontStyle: "normal", fontSize: "16px", lineHeight: "24px", marginTop: "7px" }} >Students</h4>
      </div>


      <div className="col-md-3 d-flex flex-row" style={{
        height: "100%", background: "#FFFFFF",
        padding: "0", border: "0.5px solid #c4c4c4",
        backdropFilter: "blur(4px)", color: "#000000", width: "275px", boxSizing: "border-box"
      }}>
        <img src={require("../images/Search.png")} style={{width:"21px",height:"21px",margin: "5px 0px 0px 3px",}}/>
        {/* <BiSearchAlt2 style={{ fontSize: "28PX", verticalAlign: "middle", margin: "3px 0px 0px 3px", color: "darkgrey" }} /> */}
        <Input
          id="search"
          type="text"
          placeholder="Search by Name"
          value={filterText}
          onChange={onFilter}
          style={{ background: "white", marginLeft: "0px", height: "32px", width: "100%", border: "none", fontWeight: "600", borderRadius: "30PX" }}
        />
      </div>

      <div className="col-md-1 d-flex flex-row">
        <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} />

      </div>
      <div className="col-md-3 d-flex flex-row">
        <div style={{ marginTop: "0px", padding: "0", marginLeft:"-11px" }}>

          <Link to="/addStudent">
        


            <button
              type="button"
              className="d-flex buttonContainer news-button"
              defaultValue="Sign Up"

              style={{ padding: "8px 12px", marginTop: "0", background: "#1F3977", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", borderRadius: "6px", marginLeft: "auto", height: "auto" }}
            >
              {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
              <div style={{
                marginLeft: "5px", color: "#FFFFFF", fontSize: "12PX", lineHeight: "18px",
                fontWeight: "500", fontFamily: "Poppins", fontStyle: "normal"
              }}>Add Student</div>
            </button>

          </Link>

        </div>

        <div>
          <Link to="/uploadFile">


            <button
              type="button"
              className="d-flex buttonContainer news-button"
              defaultValue="Sign Up"

              style={{ padding: "8px 12px", marginTop: "0", background: "#1F3977", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", borderRadius: "6px", marginLeft: "auto", height: "auto" }}
            >
              {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
              <div style={{
                marginLeft: "5px", color: "#FFFFFF", fontSize: "12PX", lineHeight: "18px",
                fontWeight: "500", fontFamily: "Poppins", fontStyle: "normal"
              }}>Upload</div>
            </button>

          </Link>
        </div>
      </div>



    </div>

      <div className="row" style={{background: "white",padding:"10PX 20px",marginTop:"10PX",marginLeft:"0px",marginRight:"0"}}>
        <div className="col-md-5" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "12px",
           color: "#1F3977", marginLeft: "0px"
          }}>Select Category</label><br></br>

          <select className="cat_dropdown" style={{
            marginLeft: "0px", width: "100%",
            background: "#F5F5F5", fontWeight: "500",
            fontFamily: "Poppins", fontSize:"12PX",
            height: "38px", border: "0.5px solid #c4c4c4",
            boxSizing: "border-box", marginBottom: "8px",
            color:"black"
          }}>
            <option selected style={{
              color: "black", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>All Students</option>
            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>Specific Student</option>
          </select>
        </div>

        <div className="col-md-4" style={{paddingLeft:"10PX"}}>
          <label style={{
            fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "12px",
            lineHeight: "18px", color: "#1F3977"
          }}>Select Course</label><br></br>

          <select className="cat_dropdown" style={{
            width: "100%",
            background: "#F5F5F5", fontWeight: "500",fontSize:"12px",
            fontFamily: "Poppins", fontStyle: "normal",
            height: "38px", border: "0.5px solid #c4c4c4",
            boxSizing: "border-box", marginBottom: "8px"
          }}>
            <option selected style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>B.Com</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>BBA</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>BE</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>MBBS</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>MCA</option>

          </select>
        </div>

        <div className="col-md-3" style={{paddingLeft:"0PX"}}>
          <label style={{
            fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "12px",
            lineHeight: "18px", color: "#1F3977"
          }}>Select Class</label><br></br>

          <select className="cat_dropdown" style={{
            width: "100%",
            background: "#F5F5F5", fontWeight: "500",fontSize:"12px",
            fontFamily: "Poppins", fontStyle: "normal",
            height: "38px", border: "0.5px solid #c4c4c4",
            boxSizing: "border-box", marginBottom: "8px"
          }}>
            <option selected style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>First Year</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>Second Year</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>Third Year</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>Fourth Year</option>

            <option style={{
              color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
              fontWeight: "500", fontSize: "14px", lineHeight: "21px"
            }}>Final Year</option>

          </select>
        </div>
      </div>

      <div className="row" style={{background: "white",padding:"0 35px 0px 20px", marginLeft:"0",marginRight:"0"}}>
      <div style={{ background: "rgba(31, 57, 119, 0.9)", height: "40px" }}><br></br>
        <center><div>
          <p style={{
            color: "#FFFFFF", fontWeight: "500",
            fontFamily: "Poppins", fontStyle: "normal",
            fontSize: "14px", lineHeight: "21px", marginTop: "-14px"
          }}>All Students - B.Com - First Year</p>
        </div></center>

      </div>
      </div>
    {/* </div> */}

    {/* Dropdown end here */}
  </div>



);

export default FilterComponentStudent;
