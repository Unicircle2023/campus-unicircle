import React, { useState, useEffect, useMemo } from "react";
import { RiCameraLensLine } from "react-icons/ri";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import axios from "axios";
import $ from "jquery";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";

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


const customStyles = {

  head: {
    style: {

      // borderBottom: "0.5px solid #edebeb",
      marginTop: "0PX",
      fontSize:"11px",
      fontWeight:"600",
      color:"#4AA081",
    },
  },

  rows: {
    style: {
      background: "#f5f5f5",
      borderBottom: "0.5px solid #edebeb",
      padding: "0",
      minHeight:"30px !important",
      fontSize:"10px",
      fontWeight:"500"
    }
  },

  table: {
    style: {

      fontSize:"10px",
      height: "100%",
      fontWeight:"500",
      height:"360px"

    },
  },

};


export function NewRecipient(props) {
  const token = localStorage.getItem("Token");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [stdid, updateStdid] = useState([]);
 
  
  async function fetchList() {
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_students_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if(fetchClassResponse.data.error_code == 200)
      {
        setData(fetchClassResponse.data.data);
      }
      
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  var std_name = [];
  async function InviteStudent() {
    const formData = new FormData();

    formData.append("users", JSON.stringify(stdid));

    const fetchNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_user_id_name",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get_user_id_name", fetchNewsResponse.data.data);
    if (fetchNewsResponse.data.error_code == 200) {
      $(".invitation").show();
      $(".invitee").hide();
      setTimeout(() => {
        $(".invitation").hide();
      }, 3000);
      fetchNewsResponse.data.data.map((item) => {

        std_name.push(item.name);

      });
      console.log("item.name", std_name)
    }
    else {
      $(".invitee").show();
      $(".invitation").hide();
      setTimeout(() => {
        $(".invitee").hide();
      }, 3000);
    }

    props.passData(JSON.stringify(stdid), std_name);
  }
  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      name: "",
      sortable: true,
      wrap: true,
      width: "10%",
      cell: (row) => {
        const isSelected =
          stdid.filter((i) => i.id === row.student_id).length > 0; // checking if the item is already selected
        var checked = ""

        return (
          <div
            onClick={() => {
              if (isSelected) {
                updateStdid((prev) =>
                  prev.filter((i) => i.id !== row.student_id)                 
                );
              } else {
                let obj = {
                  id: row.student_id,
                  name:row.first_name
                };
                updateStdid((prev) => [...prev, obj]);
              }
            }}
          >
           
            <input type="checkbox" />

          </div>
        );
      },
    },
    {
      name: "Student Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      wrap: true,
      width: "auto",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      wrap: true,
      width: "auto",
    },
  ];

 
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      // <FilterRecipient
      //   onFilter={(e) => setFilterText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterText}
      // />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);

  const deleteSelectedStudent = (s_id) =>{
     
  }

  return (
    <div>
      <div
        className="recipient_class"
        style={{ marginTop: "0px", height: "100%", padding: "0" }}
      >

        <div className="mt-2" style={{ width: "100%"}}>

        <div className=" d-flex flex-row" style={{ borderRadius: "2px", height: "35px", background: "rgba(228, 233, 243, 0.6)", padding: "0px", border: "none"}}>
            <img src={require("../images/Search.png")} style={{ width: "21px", height: "21px", margin: "5px 0px 0px 3px", background:"transparent"}} />
           
            <Input
              id="search"
              type="text"
              placeholder="Search by Name"
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              style={{ background: "transparent", height: "35px", width: "100%", border: "none", fontWeight: "600", borderRadius: "2PX" }}
            />
          </div>

        </div>

        <DataTable
          columns={columns}
          data={filteredItems}
          striped
          // pagination
          subHeader
          // paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          subHeaderComponent={subHeaderComponent}
          highlightOnHover

          defaultSortFieldId={1}
          customStyles={customStyles}
        />
        {/* end news table */}
        <div className="d-flex">
        <div style={{ color: "green", marginLeft: "10px", fontSize: "12px", display: "none" }} className="invitation">
          Student Invited Successfully
        </div>

        <div style={{ color: "red", marginLeft: "10px", fontSize: "12px", display: "none" }} className="invitee">
          Please select Invitee
        </div>
          {/* <input
            type="button"
            className=" form-buttons3"
            defaultValue="Sign Up"
            onClick={() => InviteStudent()}
            value="Invite"
            style={{ fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "auto", backgroundColor: "#1F3977", padding: "7px 20px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginBottom: "20px",marginRight:"5px" }}
          /> */}
        </div>

        <div className="border_class2 selected_std_main_div">
          
         {stdid.map((s_item) =>{
          return(
            <div className="selected_std_div">
              <button style={{background:"none",border:"none"}}
                onClick={() => deleteSelectedStudent(s_item.id)}
              >   
            <img  src="dist/img/selected_std_close.png"
             className="selected_std_close_img"
            />
            </button>  
            <p>{s_item.name}</p>
          </div>
          )
         })}
                
                 
                </div>

                <div
            className="d-flex form-buttons p-0 border_class2 box_padding buttons_div"
            
          >
            <input
              type="button"
              className="publish_button"
              defaultValue="Sign Up"
              onClick={() => InviteStudent()}
              value="Publish"
             
            />
          </div>

     
      </div>
    </div>
  );
}
