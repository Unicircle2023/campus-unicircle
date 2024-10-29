import React from "react";
import styled from "styled-components";
import { BiSearchAlt2} from "react-icons/bi"
import {BsSortUp} from "react-icons/bs"

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

const FilterRecipient = ({ filterText, onFilter, onClear }) => (

  <div className="mt-2" style={{width:"100%",margin:"0",paddingBottom:"10px",borderBottom:"0.5px solid #C4C4C4"}} >

    <div className=" d-flex flex-row" style={{ padding:"10px",borderRadius:"10px",height: "98%",background:"rgba(228, 233, 243, 0.6)",padding:"0px",border:"1px solid #E5E5E5",}}>
      <BiSearchAlt2 style={{background:"rgba(228, 233, 243, 0.6)",fontSize:"28PX",verticalAlign:"middle",margin:"3px 0px 0px 3px",color:"darkgrey"}}/>
      {/* <img src="dist/img/Search.png" alt="dropdown" width="18px" height="18px"   /> */}
    <Input
    id="search"
    type="text"
    placeholder="Search by Name"
    value={filterText}
    onChange={onFilter}
    style={{background:"rgba(228, 233, 243, 0.6)", height:"35px", width:"100%",border:"none",fontWeight:"600",borderRadius:"10PX"}}
  />
    </div>

  </div>
 
);

export default FilterRecipient;
