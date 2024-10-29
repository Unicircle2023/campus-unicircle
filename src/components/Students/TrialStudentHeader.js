import React from 'react';
import {BiPlusMedical, BiSearchAlt2} from "react-icons/bi";
import { StudentTable } from './StudentTable';
import { Link } from 'react-router-dom';

function TrialStudentHeader() {
    return (
        <div className="content-wrapper">
            <div style={{marginTop:"20px",width:"100%"}}>
                <div className="row">
                    {/* <div className="col-md-5">

                    </div> */}

                    <div className="col-md-5">
                        <div className="d-flex">
                            <h4 className="ml-auto" style={{color:"black",fontWeight:"bold", marginTop:"7px"}}>All Students</h4>
                            <i class="fa fa-bars" style={{marginLeft:"10PX",marginTop:"7PX"}}></i>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="d-flex" style={{padding:"0",marginLeft:"10px",width:"250px",height:"35px",marginTop:"0px", border:"none", borderRadius:"20px",backgroundColor:"white"}}>
                            <div style={{padding:"5px 0px 5px 5px"}}><BiSearchAlt2 style={{color:"#293043", fontSize:"25px", marginTop:"0px",fontWeight:"bold"}}/></div>
                            <div style={{padding:"0px", width:"100%", height:"35px"}}><input type="text" placeholder="Student name/ID" style={{background:"white", height:"32px", width:"90%",border:"none",fontWeight:"600"}}/></div>
                        </div>
                    </div>

                    <div className="col-md-3" style={{marginTop:"0px",padding:"0"}}>
                        
                            <Link to="/addStudent">

                                <button
                                    type="button"
                                    className="d-flex buttonContainer"
                                    defaultValue="Sign Up"
                                    style={{ padding:"12px 20px", marginTop:"0",background:"#1F3977", flexWrap: "wrap", borderRadius:"5px"}}
                                >
                                    <BiPlusMedical  style={{marginTop:"1px",fontSize:"12.25px",fontWeight:"400",fontFamily:"Poppins"}}/>
                                    <div style={{fontSize:"12.25PX",fontWeight:"400",fontFamily:"Poppins"}}>New Student</div>
                                </button>

                            </Link>

                        
                    </div>

                    <div className="col-md-1">

                    </div>

                </div>
            </div>
            <StudentTable></StudentTable>
        </div>
    )
}
export default TrialStudentHeader;