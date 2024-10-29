import React,{useState,useEffect,useMemo} from 'react'
import axios from "axios";
import $ from 'jquery'
import styled from "styled-components";
import DataTable from 'react-data-table-component';
import {Header} from "../Header"
import {Menu} from "../Menu"

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
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


const customStyles = {

    rows: {
      style: {
        background: "rgba(228, 233, 243, 0.6)",
        marginTop: "3PX",
        border: "none",
      
      }
    },
    headCells: {
      style: {
  
        color: "black"
      },
    },
  
    head: {
      style: {
  
        border: "0.5px solid #C4C4C4",
        marginTop: "10PX",
        marginLeft: "5PX"
      },
    },
  
  };

  
export  function Invite() {

    const token = localStorage.getItem('Token');
    const[data,setData] = useState([])
    console.log("get studnet data",data)
    // const [filteredResults, setFilteredResults] = useState([]);

    async function fetchStudentList() {
        
        try {
    
          const fetchStudentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_students_list",
            {
              headers:
              {
                "Content-Type": 'multipart/form-data',
    
                "Authorization": token,
              }
            }
          );
          console.log("Get Student List Details", fetchStudentResponse.data.error_code);
          console.log("Get Student List Details", fetchStudentResponse.data.data);
          if(fetchStudentResponse.data.error_code == 200)
          {
            setData(fetchStudentResponse.data.data)
          }
   
      
    
        }
        catch (err) {
          console.log("Log in Fail", err);
    
        }
    
      }
    
     
useEffect(() => {
  fetchStudentList();
},[]);
    
      const paginationComponentOptions = {
        selectAllRowsItem: true,
    
        selectAllRowsItemText: "ALL"
      };

     

const column= [
  {
        name: 'Student Name',
        // selector: 'group_name',
        sortable: true,
        wrap: true,
        width: "60%",
        cell: (row) => {
  
          return (
            <div className="d-flex">
              {row.profile_photo == ""?
              (
                <div>
                   <img src={require("../images/no_image.png")} alt="view" style={{height:"40px",width:"40px"}}/> 
                </div>
              ):(
<div>
<img src={row.profile_photo} alt="view" style={{height:"40px",width:"40px"}}/> 
</div>
              )}
                 {/* <img src={row.student_profile} alt="view" style={{height:"40px",width:"40px"}}/>  */}
              <p style={{marginLeft:"5px",marginTop:"5px"}}>{row.first_name} {row.last_name}</p>
             
             
            
            </div>
          )
        }
      },
      {
        name: 'Student Id',
        // selector: 'group_name',
        sortable: true,
        wrap: true,
        width: "20%",
        cell: (row) => {
  
          return (
            <div>
             
                
              <p style={{marginLeft:"5px",marginTop:"5px"}}>{row.student_id}</p>
             
             
            
            </div>
          )
        }
      },

      {
            name: 'Action',
            //   sortable: true,
            wrap: true,
            width: "20%",
            cell: (row) => {
              return (
                <div className="d-flex">
                 
               
                   <button style={{ backgroundColor: "green",color:"white",border:"none",padding:"10px 20px",borderRadius:"5px"}}>Invite</button>
                
      
                
      
                </div>
      
              )
            }
          }
]
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
    
        return (
    
       
          <div></div>
    
    
    
        );
      }, [filterText, resetPaginationToggle]);

  return (
    <div>
        <Header />
        <div className='d-flex'>
        <Menu />
      <div className='content-wrapper'> 
        
      <div
        className="row mt-2 mb-2"
        style={{
          width: "100%",
          marginLeft: "0",
          padding: "0px 10px",
          background: "transparent",
        }}
      >
        <div
          className="col-md-6 d-flex flex-row"
          style={{ height: "100%", padding: "0px 5px" }}
        >
          <h4 style={{ color: "black", fontWeight: "600", marginTop: "7px" }}>
            Invitation
          </h4>
        </div>

        <div
          className="col-md-5 d-flex flex-row"
          style={{
            height: "100%",
            background: "white",
            padding: "0",
            border: "1px solid lightgrey",
          }}
        >
          <img
            src={require("../images/Search.png")}
            style={{ width: "21px", height: "21px", margin: "5px 0px 0px 3px" }}
          />
         
          <Input
            id="search"
            type="text"
            placeholder="Search by Student Name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              border: "none",
              background: "white",
              height: "32px",
              width: "100%",
              fontWeight: "500",
              fontSize: "12PX",
              paddingLeft: "5px",
            }}
          />
        </div>

        <div className="col-md-1 d-flex flex-row">
          <img
            src="dist/img/Sorting.png"
            alt="view"
            style={{ width: "28px", height: "28px" }}
            className="sort_table"
            // onClick={fetchList}
          />
        </div>
        {/* <div className="col-md-2 d-flex flex-row">
          <div style={{ marginTop: "0px", padding: "0" }}>
            <a href="/createNews">
              <button
                type="button"
                className="d-flex buttonContainer news-button"
                defaultValue="Sign Up"
                style={{
                  padding: "10px 15px",
                  marginTop: "0",
                  fontSize: "12PX",
                  fontWeight: "400",
                  background: "#1F3977",
                  flexWrap: "wrap",
                  borderRadius: "5px",
                  marginLeft: "auto",
                  height: "auto",
                  fontFamily: "Poppins",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
               
                Create News
              </button>
            </a>
          </div>
        </div> */}
      </div>

           <DataTable
        columns={column}
      
        data={filteredItems}
        striped
        paginationPerPage={10}
        pagination
        paginationRowsPerPageOptions={[10,20,30,40,50,60,70,80,90,100]}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={subHeaderComponent}
        highlightOnHover
        defaultSortFieldId={1}
        customStyles={customStyles}
     
      />

        </div>
        </div>
      
    </div>
  )
}
