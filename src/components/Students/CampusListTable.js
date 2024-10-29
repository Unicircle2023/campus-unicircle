import React, { useState, useEffect,useMemo } from "react";
import DataTable from 'react-data-table-component';
import FilterComponent from "../ViewCampusList/FilterComponent";
import axios from "axios";

export function CampusListTable(props) 
{
 
  const token = localStorage.getItem('Token');
  const[data, setData] = useState([]);
  async function fetchList() {
   
    try{
      
        const fetchResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_campus_details_list",
        {
          headers: 
        {
          "Content-Type": 'multipart/form-data',
        
          "Authorization": token,
        } 
        }
      );
        const campusListArry = fetchResponse.data.data;
        setData(campusListArry);
      
    }
    catch(err)
    {
      console.log("Log in Fail",err);
     
    }
   
  }
  useEffect(() => {
    fetchList();
  },[]);

  const columns = [
    {
      name: 'ID',
      selector: 'campus_info.campus_id',
      sortable: true,
      width:"8%"
    },
    {
      name: 'Campus Name',
      selector: 'campus_info.campus_name',
      sortable: true,
      width:"15%"
    },
    {
      name: ' Email',
      selector: 'email',
      sortable: true,
      width:"15%"
    },
    {
      name: 'Contact',
      selector: 'mobile',
      sortable: true,
      width:"15%"
    },
    {
      name: 'Address',
      selector: 'campus_info.address',
      sortable: true,
      width:"20%"
    },
    {
      name: 'City',
      selector: 'campus_info.city',
      sortable: true,
      width:"10%"
    },
    {
      name: 'State',
      selector: 'campus_info.state',
      sortable: true,
      width:"10%"
    },
  
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
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

    return (
        <div classname="content-wrapper" style={{width:"80%",marginLeft:"20PX"}}>
 <DataTable
 style={{border:"1px solid green"}}
  // class="table" id="grid1"
        columns={columns}
        data={filteredItems}
        striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
        highlightOnHover  
      />
 



</div>

        
    )
}
