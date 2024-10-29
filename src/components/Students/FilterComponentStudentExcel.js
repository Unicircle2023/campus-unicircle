import React,{useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import $ from "jquery"
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


function FilterComponentStudentExcel({filterText, onFilter, onClear})
{
    const [excel, setExcel] = useState([]);
const token = localStorage.getItem('Token');
const [error_message, updateError_message] = useState("");
const [data, setData] = useState([]);

async function uploadExcel() {
    try {
        const excelSheet = document.getElementById("excelSheet");

        if (excelSheet.value == "") {
            $(".ValueMsg").show();

            setTimeout(function () {
                $(".ValueMsg").hide();
            }, 3000);
            return;
        }


        else {
            const formData = new FormData();

            formData.append("uploadFile", excel);

            const excelResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_upload_excel_file_student",
                formData,
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',
                        "Authorization": token,
                    }
                });
            setData(excelResponse.data.data)
            updateError_message(excelResponse.data.message);

            // setExcel("");

            $(".formSuccess").show();

            setTimeout(function () {
                $(".formSuccess").hide();
            }, 5000);
            //  window.location.href = "/faqDetails"
        }
    }
    catch (err) {
        console.log("Log in Fail", err);

    }
}
    return(
<div style={{ width: "100%" }}>
        <div className="row mt-2" style={{ width: "100%", marginLeft: "0", paddingRight: "10PX", marginLeft: "39px" ,marginBottom:"10PX"}} >

            
            <div className="col-md-7 d-flex flex-row" style={{ padding: "15px", margin: "0", }}>
                <h1 style={{ color: "black", fontWeight: "600", fontFamily: "Poppins", fontSize: "16PX", lineHeight: "24PX", marginLeft: "42PX" }}>Upload ExcelSheet</h1>
            </div>

            <div className="col-md-3 d-flex flex-row" style={{
                height: "100%", background: "#FFFFFF",
                padding: "0", border: "0.5px solid rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)", color: "#000000", width: "275px", boxSizing: "border-box"
            }}>
                <BiSearchAlt2 style={{ fontSize: "28PX", verticalAlign: "middle", margin: "3px 0px 0px 3px", color: "darkgrey" }} />
                <Input
                    id="search"
                    type="text"
                    placeholder="Search by category"
                    value={filterText}
                    onChange={onFilter}
                    style={{ background: "white", marginLeft: "-5px", height: "32px", width: "100%", border: "none", fontWeight: "600", borderRadius: "30PX" }}
                />
            </div>

            <div className="col-md-1 d-flex flex-row">
                <img src="dist/img/Sorting.png" style={{ height: "28px", width: "28px", marginTop: "3px" }} />

            </div>
            {/* <div className="col-md-1 d-flex flex-row">
                <div style={{ marginTop: "0px", padding: "0", marginLeft: "-11px" }}>

                </div>

            </div> */}



        </div>

        {/* <div style={{ background: "white", margin: "5px 30px 10px 8px", padding: "10px 10px 10px 20px", width: "98%", borderRadius: "10PX" }}>

<div className="mt-2 p-0">
    <div class="row">
        <div class="col-md-6">
            <div style={{ width: "100%", marginTop: "0px", paddingRight: "0" }} >
                <div className="d-flex">
                    <label style={{ color: "#1F3977", fontSize: "12px", fontWeight: "bold" }}>Upload ExcelSheet</label>

                    <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                </div>

                <input
                    type="file"
                    id="excelSheet"
                    //value={excel}
                    onChange={(e) => setExcel(e.target.files[0])}

                    placeholder="Your Title goes here..."
                    autoComplete="true"
                    style={{ boxSizing: "border-box", fontSize: "12px", paddingLeft: "5PX" }}

                />

                <div
                    class="ValueMsg"
                    style={{ marginTop: "-6px", display: "none" }}>
                    <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                        Please Select File
                    </h4>
                </div>


            </div>

        </div>



    </div>
    <div>
        <input
            type="button"
            className=" form-buttons3"
            defaultValue="Sign Up"
            onClick={() => uploadExcel()}
            value="Publish"
            style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "755px", backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginRight: "60PX", marginBottom: "2px" }}
        />
    </div>

</div>
</div> */}
    </div>
    )
}


export default FilterComponentStudentExcel;
