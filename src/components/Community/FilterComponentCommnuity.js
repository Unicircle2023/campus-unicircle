import React from "react";
import styled from "styled-components";
import { BiSearchAlt2} from "react-icons/bi"
import {BsSortUp} from "react-icons/bs";
import { Link, } from "react-router-dom";

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

const FilterComponentCommunity = ({ filterText, onFilter, onClear }) => (
  


  <div style={{width:"100%"}}>
   
<div  className="row mt-2" style={{width:"100%",marginLeft:"0",padding:"0px 10px"}}>
  <div className="col-md-4 d-flex flex-row" style={{ height: "100%", padding: "0px"}}>
  <h4 style={{color:"black",fontWeight:"bold", marginTop:"7px"}} >List of groups</h4>
  </div>

    <div className="col-md-4 d-flex flex-row" style={{ height: "100%",background:"white",padding:"0",border:"1px solid lightgrey"}}>
      <BiSearchAlt2 style={{fontSize:"28PX",verticalAlign:"middle",margin:"3px 0px 0px 3px",color:"darkgrey"}}/>
    <Input
    id="search"
    type="text"
    placeholder="Search by group name"
    value={filterText}
    onChange={onFilter}
    style={{background:"white", height:"32px", width:"100%",border:"none",fontWeight:"600",borderRadius:"30PX"}}
  />
    </div>

    <div className="col-md-1 d-flex flex-row">
  <BsSortUp style={{fontSize:"25PX"}} class="sc-fnykZs bbFOtt"/>
 
</div>
    <div className="col-md-3 d-flex flex-row">
      <div style={{ marginTop: "0px", padding: "0" }}>

        <Link to="/createGroup">


          <button
            type="button"
            className="d-flex buttonContainer news-button"
            defaultValue="Sign Up"

            style={{ padding: "8px 12px", marginTop: "0", background: "#1F3977", flexWrap: "wrap", borderRadius: "5px", marginLeft: "auto", height: "auto" }}
          >
            {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
            <div style={{ marginLeft: "5px", fontSize: "12.25PX", fontWeight: "400", fontFamily: "Poppins" }}>Create Group</div>
          </button>

        </Link>

      </div>
    </div>
  </div>
  <div className="row mt-2" style={{ margin:"0",background: "white", padding: "10px", fontSize: "12PX", fontWeight: "600",width:"100%" }}>Upcoming Events</div>
  </div>
);

export default FilterComponentCommunity;
