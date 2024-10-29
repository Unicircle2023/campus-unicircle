import React from "react";
import styled from "styled-components";
import {BiPlusMedical, BiSearchAlt2} from "react-icons/bi";
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

const FilterComponentSubject = ({ filterText, onFilter, onClear }) => (
  
 

    <div className="row mt-2" style={{ width: "100%", marginLeft: "0", paddingRight: "10PX" }} >
    <div className="col-md-6 d-flex flex-row" style={{ height: "100%", padding: "0px 5px" }}>
      <h4 style={{ color: "black", fontWeight: "bold", marginTop: "7px" }} className="ml-auto" >All Subjects</h4>
      <i class="fa fa-bars" style={{ marginLeft: "10PX", marginTop: "7PX" }}></i>
    </div>

    <div className="col-md-3 d-flex flex-row" style={{ height: "100%", background: "white", padding: "0", borderRadius: "30PX" }}>
      <BiSearchAlt2 style={{ fontSize: "28PX", verticalAlign: "middle", margin: "3px 0px 0px 3px" }} />
      <Input
        id="search"
        type="text"
        placeholder="Search By Subject..."
        value={filterText}
        onChange={onFilter}
        style={{ background: "white", height: "32px", width: "100%", border: "none", fontWeight: "600", borderRadius: "30PX" }}
      />
    </div>

    <div className="col-md-3">
      <div style={{ marginLeft: "20px", marginTop: "0px", padding: "0" }}>

        <Link to="/createSubject">


          <button
            type="button"
            className="d-flex buttonContainer"
            defaultValue="Sign Up"

            style={{ padding: "12px 20px", marginTop: "0", background: "#1F3977", flexWrap: "wrap", borderRadius: "5px", marginLeft: "auto", height: "auto" }}
          >
            <BiPlusMedical style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} />
            <div className="button-label" style={{ marginLeft: "5px", fontSize: "12.25PX", fontWeight: "400", fontFamily: "Poppins" }}>Create Subject</div>
          </button>

        </Link>

      </div>
    </div>
  </div>
 
);

export default FilterComponentSubject;
