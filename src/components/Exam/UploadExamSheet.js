import React, { useState, useEffect ,useMemo} from "react";
import axios from 'axios';
import $ from "jquery"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
//import FilterComponentStudentExcel from "./FilterComponentStudentExcel";
import DataTable from 'react-data-table-component';

export function UploadExamSheet() {

    const token = localStorage.getItem('Token');
    const [excel, setExcel] = useState([]);
    console.log("excel response",excel)
    const [error_message, updateError_message] = useState("");
    const [data, setData] = useState([]);
    const [department, setdepartment] = useState([])
    const [dept, setdept] = useState("")



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

                const excelResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_upload_excel_file_exam",
                    formData,
                    {
                        headers:
                        {
                            "Content-Type": 'multipart/form-data',
                            "Authorization": token,
                        }
                    });

                console.log("Upload Exam ExcelSheet", excelResponse);
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

    async function fetchDepartmentList() {
      console.log("Access Token-", token);
      try {
  
        const fetchDepartmentResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_all_department",
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',
  
              "Authorization": token,
            }
          }
        );
  
        console.log("Get Department List Details", fetchDepartmentResponse);
  
        const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
        console.log("Department Error Code ", DepartmentErrorCode);
  
        const DepartmentErrorMsg = fetchDepartmentResponse.data.message;
        console.log("Department Error msg ", DepartmentErrorMsg);
  
        
  
        if (DepartmentErrorCode == 200) {
          const departmentListArray = fetchDepartmentResponse.data.data;
          console.log("Department list Array", departmentListArray);
          setdepartment(departmentListArray);
        }
        else {
          setdepartment([]);
  
          console.log(fetchDepartmentResponse.data.message);
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

    {
      department.map((dept, index) => {
        console.log("department listing", dept);
      })
    }

    
    async function fetchList() {
      console.log("Access Token-", token);
      try {
  
        const fetchStudentResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_upload_excel_file_exam",
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',
  
              "Authorization": token,
            }
          }
        );
  
        console.log("Get Exam Excel List Details", fetchStudentResponse);
  
        const StudentErrorCode = fetchStudentResponse.data.error_code;
        console.log("Exam Error Code ", StudentErrorCode);
  
        const StudentErrorMsg = fetchStudentResponse.data.message;
        console.log("Exam Error msg ", StudentErrorMsg);
  
        
  
        if (StudentErrorCode == 200) {
          const studentListArray = fetchStudentResponse.data.data;
          console.log("Exam list Array", studentListArray);
          setExcel(studentListArray);
        }
        else {
          setExcel([]);
  
          console.log(fetchStudentResponse.data.message);
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
  
 
    useEffect(() => {
  
      fetchList();
      fetchDepartmentList();
    }, []);

  data.map((item) =>
  {
      console.log("excel dataaaaaa",item)
  })

  // if(dept.department_id == item.department){
  //     setdept(dept)
  
  // }
  // else{
  //   console.log("department not matched")
  
  // }

    const columns = [

        {
          name: 'Test Name',
          selector: 'test_name',
          sortable: true,
          width: "auto",
          wrap: true,
          cell: (row) => {
            console.log("ROW", row.test_name)
            return (
              <div style={{ fontWeight: "700" }}>{row.test_name}</div>
            )
          }
        },
    
        {
          name: 'Department',
          selector: 'department',
          sortable: true,
          width: "auto",
          wrap: true,
          cell: (row) => {
            console.log("ROW", row.department)
            return (
              <div>{row.department}</div>
            )
          }
        },
        {
          name: 'Class',
          selector: 'class',
          sortable: true,
          width: "auto",
          wrap: true,
          cell: (row) => {
            console.log("ROW", row.class)
            return (
              <div>{row.class}</div>
            )
          }
        },
        {
          name: 'Date',
          selector: 'date',
          sortable: true,
          width: "auto",
          wrap: true,
          cell: (row) => {
            console.log("ROW", row.date)
            return (
              <div>{row.date}</div>
              // <a href="#">{row.email}</a>
            )
          }
        },

        {
          name: 'Subject',
          selector: 'subject',
          sortable: true,
          width: "auto",
          wrap: true,
          cell: (row) => {
            console.log("ROW", row.subject)
            return (
              <div>{row.subject}</div>
              // <a href="#">{row.email}</a>
            )
          }
        },
    
        {
          name: 'Action',
          // selector: 'campus',
          sortable: true,
          wrap: true,
          width: "auto",
          cell: () => {
            return (
              <div className="d-flex">
                <img style={{ fontSize: "22px", marginLeft: "2px" }} src="dist/img/Pencil.png" />&nbsp;
                <img style={{ fontSize: "22px", marginLeft: "2px" }} src="dist/img/Delete.png" />&nbsp;
                <img style={{ fontSize: "22px", marginLeft: "30px" }} src="dist/img/New_message.png" />
              </div>
    
            )
          }
        }
    
      ];

      const [filterText, setFilterText] = React.useState("");
      const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
      );

      const filteredItems = data.filter(
        (item) =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );
    
      const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        // return (
        //   <FilterComponentStudentExcel
        //     onFilter={e => setFilterText(e.target.value)}
        //     onClear={handleClear}
        //     filterText={filterText}
        //   />
        // );
       }, [filterText, resetPaginationToggle]);


    return (
        <div className="content-wrapper" style={{ paddingBottom: "10PX" }}>
            <div style={{ padding: "15px", margin: "0", }}>
                <h1 style={{ color: "black", fontWeight: "600", fontFamily: "Poppins", fontSize: "16PX", lineHeight: "24PX", marginLeft: "42PX" }}>Upload Exam ExcelSheet</h1>
            </div>

            <div class="formSuccess" style={{ marginTop: "5px", width: "97%", marginLeft: "18px", marginRight: "198px", display: "none" }}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="success">
                        {error_message}
                    </Alert>
                </Stack>
            </div>

            <div style={{ background: "white", margin: "5px 30px 0px 8px", padding: "10px 10px 10px 20px", width: "98%", borderRadius: "10PX" }}>

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
                    {/* <div class="ValueMsg" style={{ margin: "8px", width: "57%", display: "none" }}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">
                                Error! You Must Fill In All The Fields
                            </Alert>
                        </Stack>
                    </div> */}
                </div>
            </div>

                <DataTable
                    style={{ border: "1px solid green" }}
                    // class="table" id="grid1"
                    columns={columns}
                    data={filteredItems}
                    striped
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                    highlightOnHover
                    defaultSortFieldId={1}
                    selectableRows
                />
        

        </div>
    )
}