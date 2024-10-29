import React, { useState, useEffect,useMemo } from "react";
import {RiCameraLensLine} from "react-icons/ri";
import {Header} from "../Header"
import {Menu} from "../Menu"
import DataTable from 'react-data-table-component';
import FilterListOfCommunity from "./FilterListOfCommunity";
import axios from "axios";
import $ from "jquery";
import {BsFillPencilFill} from "react-icons/bs"
import {MdDelete} from "react-icons/md"
import Events from "material-ui/utils/events";
const customStyles = {
   
    rows: {
        style: {
          background:"rgba(228, 233, 243, 0.6)",
          marginTop:"3PX",
          border:"none"
        }
      },
    table: {
      style: {
       
        width:"100%"
      },
    },

    head: {
        style: {
         
          border:"0.5px solid #e7e5e5",
          marginTop:"0PX"
        },
      },

     
   
   
  };

export function ListOfCommunity() {

    
  const token = localStorage.getItem('Token');
  const[data, setData] = useState([]);
  async function fetchList() {
    console.log("Access Token-",token);
    try{
      
        const fetchClassResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_all_news",
        {
          headers: 
        {
          "Content-Type": 'multipart/form-data',
        
          "Authorization": token,
        } 
        }
      );
     
        console.log("Get Class List Details",fetchClassResponse);

        const ClassErrorCode = fetchClassResponse.data.error_code;
        console.log("Class Error Code ", ClassErrorCode);
  
        const ClassErrorMsg = fetchClassResponse.data.message;
        console.log("Class Error msg ", ClassErrorMsg);

      

      if (ClassErrorCode == 200) {
          const classListArray = fetchClassResponse.data.data;
          console.log("Class list Array", classListArray);

          setData(classListArray);
        }
        else {
          setData([]);
  
          console.log(fetchClassResponse.data.message);
          $(".alert-danger").show();
          setTimeout(function () {
            $(".alert-danger").hide();
          }, 3000);
        }
      
    }
    catch(err)
    {
      console.log("Log in Fail",err);
     
    }
   
  }
  
  {data.map((item, index) => {
    console.log("data",data);
  })}
  useEffect(() => {
  
    fetchList();
  },[]);

 
  const columns = [
    {
      name: 'Name',
      // selector: 'news_title',
    //   sortable: true,
      wrap: true,
      width:"auto",
      cell: (row) =>{
       
        return(
          <div className="d-flex">
            
     
          <div style={{marginLeft:"10px",fontWeight:"700",color:"black"}}>Aakash Harish Punshi</div>
         
          </div>
        )}
    },
    {
      name: 'Member Type',
      // selector: 'category',
    //   sortable: true,
      wrap: true,
      width:"auto",
      cell: (row) =>{
       
        return(
          <div>
          <div style={{fontWeight:"700"}}>Group Admin</div>
        
          </div>
        )}
     
    },
   

    {
      name: 'Actions',
    //   sortable: true,
      wrap: true,
      width:"auto",
      cell: () =>{
        return(
         <div className="d-flex">
             <img src="dist/img/No Entry.png"  style={{width:"17px",height:"17px"}}/>
             <img src="dist/img/delete.png"  style={{width:"17px",height:"17px"}}/>
        {/* <BsFillPencilFill style={{fontSize:"16px", color:"grey",marginTop:"2PX"}}/>&nbsp;
    
        <MdDelete  style={{fontSize:"20px", marginLeft:"5px",color:"grey"}}/> */}
     
        {/* <img src="dist/img/view-icon.png" alt="view" style={{fontSize:"18px", marginLeft:"5px",color:"blue"}} /> */}
      
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

return (
  
 <FilterListOfCommunity

    onFilter={e => setFilterText(e.target.value)}
    onClear={handleClear}
    filterText={filterText}
    
  />
 
 
  
);
}, [filterText, resetPaginationToggle]);


    return (
        <div className="d-flex">
           <Header />
           <Menu />
<div className="content-wrapper" >
    

    
<div id="exTab2" class="container" style={{marginTop:"50PX",background:"white",padding:"10px"}}>	
<ul class="nav nav-tabs-community">
			<li class="active"><a  href="#1" data-toggle="tab">All Members</a></li>
			<li><a href="#2" data-toggle="tab">Requested</a></li>
			<li><a href="#3" data-toggle="tab">Invited</a></li>
            <li><a href="#4" data-toggle="tab">Blocked</a></li>
            <li><a href="#5" data-toggle="tab">Declined</a></li>
		</ul>

			<div class="tab-content" style={{border:"none"}}>
			  <div class="tab-pane active" id="1" style={{padding:"0"}}>
              <DataTable


columns={columns}

data={filteredItems}
striped
pagination
subHeader
subHeaderComponent={subHeaderComponent}
// highlightOnHover
defaultSortFieldId={1}
customStyles={customStyles}

/>
				</div>
				<div class="tab-pane" id="2">
          <h3>This Is Requested</h3>
				</div>
        <div class="tab-pane" id="3">
         
        <h3>This Is Invited</h3>

				</div>

                <div class="tab-pane" id="4">
         
         <h3>This Is blocked</h3>
 
                 </div>

                 <div class="tab-pane" id="5">
         
         <h3>This Is Declined</h3>
 
                 </div>
			</div>
  </div>
  

        </div>
        </div>
    )
}
