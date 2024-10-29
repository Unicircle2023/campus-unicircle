import React from "react";
import styled from "styled-components";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi"
import { BsSortUp } from "react-icons/bs"

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

const FilterComponentTicket = ({ filterText, onFilter, onClear }) => (


  <div style={{ width: "100%",padding:"0"}}>
    <div className="row" style={{ width: "100%", margin: "0",padding:"5px 0"}} >

      <div className="col-md-5" style={{ height: "100%", padding: "0px"}}>
        <h4 style={{ color: "#000000", fontWeight: "600", fontFamily: "Poppins", fontStyle: "normal", fontSize: "16px", lineHeight: "24px", marginTop: "7px" }} >Tickets</h4>
      </div>


      <div className="col-md-4 d-flex flex-row" style={{
        height: "100%", background: "#FFFFFF",
        padding: "0", border: "0.5px solid #c4c4c4",
        backdropFilter: "blur(4px)", color: "#000000", width: "275px", boxSizing: "border-box"
      }}>
        <BiSearchAlt2 style={{fontSize: "20PX", margin: "7px 0px 0px 3px", color: "darkgrey",alignItems:"center",justifyContent:"center" }} />
        <Input
          id="search"
          type="text"
          placeholder="Search by ticket ID"
          value={filterText}
          onChange={onFilter}
          style={{ border:"none",background: "white",  height: "32px", width: "275PX",  fontWeight: "600", paddingLeft:"4PX"}}
        />
      </div>

      <div className="col-md-3 d-flex flex-row">
        <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} />

      </div>
      



    </div>

      <div className="row mt-4" style={{background: "#e4e9f4 ",padding:"0PX 80px 0px 0px",marginLeft:"0px",marginRight:"0"}}>
      <div className="col-md" style={{ height: "100%", padding: "0px 2px" }}>
            <div className="small-box" style={{ width:"185px",height: "97px", padding: "5px 15px 1px 5px", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
              <div className="inner">
                <div className="d-flex">
                  <img src={require("../images/Two Tickets.png")}  style={{  marginTop: "-4px",height:"43px",width:"43px" }} alt="dropdown" />
                </div>

                
                <div className="d-flex" style={{ marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-31px", fontSize: "25px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">578</div>
                </div>
              
                <div className="d-flex" style={{color:"rgba(0, 0, 0, 0.7)", marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-15px", fontSize: "12px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">Total Tickets</div>
                </div>
             
                
               
            
              </div>
             

            </div>
          </div>

         <div className="col-md" style={{ height: "100%", padding: "0px 2px" }}>
            <div className="small-box" style={{ width:"185px",height: "97px", padding: "5px 15px 1px 5px", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
              <div className="inner">
                <div className="d-flex">
                  <img src={require("../images/Hourglass.png")}  style={{  marginTop: "-4px",height:"43px",width:"43px" }} alt="dropdown" />
                </div>

                
                <div className="d-flex" style={{ marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-31px", fontSize: "25px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">102</div>
                </div>
              
                <div className="d-flex" style={{color:"rgba(0, 0, 0, 0.7)", marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-15px", fontSize: "12px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">Open Tickets</div>
                </div>
             
                
               
            
              </div>
             

            </div>
          </div>

           <div className="col-md" style={{ height: "100%", padding: "0px 2px" }}>
            <div className="small-box" style={{ width:"185px",height: "97px", padding: "5px 15px 1px 5px", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
              <div className="inner">
                <div className="d-flex">
                  <img src={require("../images/Closed Sign.png")}  style={{  marginTop: "-4px",height:"43px",width:"43px" }} alt="dropdown" />
                </div>

                
                <div className="d-flex" style={{ marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-31px", fontSize: "25px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">439</div>
                </div>
              
                <div className="d-flex" style={{color:"rgba(0, 0, 0, 0.7)", marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-15px", fontSize: "12px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">Closed Tickets</div>
                </div>
             
                
               
            
              </div>
             

            </div>
          </div>

           <div className="col-md" style={{ height: "100%", padding: "0px 2px" }}>
            <div className="small-box" style={{ width:"185px",height: "97px", padding: "5px 15px 1px 5px", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
              <div className="inner">
                <div className="d-flex">
                  <img src={require("../images/Remove.png")}  style={{  marginTop: "-4px",height:"43px",width:"43px" }} alt="dropdown" />
                </div>

                
                <div className="d-flex" style={{ marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-31px", fontSize: "25px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">37</div>
                </div>
              
                <div className="d-flex" style={{color:"rgba(0, 0, 0, 0.7)", marginLeft:"auto",fontWeight: "600", lineHeight: "36px", marginTop: "-15px", fontSize: "12px", fontFamily: 'Poppins', fontStyle: "normal" }}>
                    <div className="ml-auto">Deleted Tickets</div>
                </div>
             
                
               
            
              </div>
             

            </div>
          </div> 
         
       

        
      </div>

      <div className="row mt-5" style={{background: "#e4e9f4 ",padding:"0", marginLeft:"0",marginRight:"0"}}>
      <div style={{ background: "rgba(31, 57, 119, 0.9)", height: "40px" }}><br></br>
        <center><div>
          <p style={{
            color: "#FFFFFF", fontWeight: "500",
            fontFamily: "Poppins", fontStyle: "normal",
            fontSize: "14px", lineHeight: "21px", marginTop: "-14px"
          }}>All Tickets</p>
        </div></center>

      </div>
      </div>
    {/* </div> */}

    {/* Dropdown end here */}
  </div>



);

export default FilterComponentTicket;
