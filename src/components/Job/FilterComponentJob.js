import React from "react";
import styled from "styled-components";
import { BiSearchAlt2} from "react-icons/bi"
import {BsSortUp} from "react-icons/bs";
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

const FilterComponentJob = ({ filterText, onFilter, onClear }) => (
  
 

  <div className="row mt-2 mb-2" style={{width:"100%",marginLeft:"0",padding:"0px 10px",background:"transparent"}} >

  <div className="col-md-5 d-flex flex-row" style={{ height: "100%", padding: "0px 5px"}}>
  <h4 style={{color:"black",fontWeight:"600", marginTop:"7px"}} >List of Jobs</h4>
  </div>

    <div className="col-md-3 d-flex flex-row" style={{ height: "100%",background:"white",padding:"0",border:"1px solid lightgrey"}}>
    <img src={require("../images/Search.png")} style={{width:"21px",height:"21px",margin: "5px 0px 0px 3px",}}/>
      {/* <BiSearchAlt2 style={{fontSize:"28PX",verticalAlign:"middle",margin:"3px 0px 0px 3px",color:"darkgrey"}}/> */}
    <Input
    id="search"
    type="text"
    placeholder="Search by group name"
    value={filterText}
    onChange={onFilter}
    style={{border:"none",background:"white", height:"32px", width:"100%",fontWeight:"500",fontSize:"12PX",paddingLeft:"5px"}}
  />
    </div>

    <div className="col-md-1 d-flex flex-row">
    <img src="dist/img/Sorting.png" alt="view" style={{width:"28px",height:"28px"}} className="sort_table"/>
 
</div>
    <div className="col-md-3 d-flex flex-row">
      <div style={{ marginTop: "0px", padding: "0" }}>

        <Link to="/createJob">
          


          <button
            type="button"
            className="d-flex buttonContainer news-button"
            defaultValue="Sign Up"

            style={{ padding: "10px 15px", marginTop: "0", fontSize: "12PX", fontWeight: "400",background: "#1F3977", flexWrap: "wrap", borderRadius: "5px", marginLeft: "auto", height: "auto" ,fontFamily:"Poppins"}}
          >
            {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
            Create Job
          </button>

        </Link>

      </div>
    </div>
  </div>
 
);

export default FilterComponentJob;
