import React, { useState, useEffect, useMemo } from "react";
import { RiCameraLensLine } from "react-icons/ri";
// import { NewsTable } from './NewsTable';
import styled from "styled-components";
import { BiSearchAlt2} from "react-icons/bi"
import DataTable from "react-data-table-component";

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
      borderBottom: "0.5px solid #C4C4C4",
      marginTop: "0PX",
    },
  },

  rows: {
    style: {
      background: "#f5f5f5",
      borderBottom: "0.5px solid #f5f5f5",
      padding: "0",
    },
  },

  table: {
    style: {
      height: "220px",
    },
  },
};

export function Recipient({ studentId, passData }) {
  const token = localStorage.getItem("Token");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [stdid, updateStdid] = useState([]);


  // const format_array = (array) => {
  //   let mapping = array.map(item => {
  //     let obj = {
  //       id: item
  //     }
  //     return obj
  //   })
  //   updateStdid(mapping)
  // }

  // useEffect(() => {

  //   format_array(studentId)

  // }, [])

  console.log("stdid", stdid)
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

      console.log("Student Details", fetchClassResponse.data.data);
      setData(fetchClassResponse.data.data);
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
    $(".invitation").show();
    fetchNewsResponse.data.data.map((item) => {

      std_name.push(item.name);

    });
    console.log("item.name", std_name)
    passData(JSON.stringify(stdid), std_name);
  }
  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      name: "",
      // selector: 'student_name',
      sortable: true,
      wrap: true,
      width: "10%",
      cell: (row) => {
        // console.log("get student id from parent", row.student_id)
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
                };
                updateStdid((prev) => [...prev, obj]);
              }
            }}
          >

            {stdid.map((item) => {

              if (item.id == row.student_id)
                checked = "true"
            })}
            <input type="checkbox"
              value={row.student_id}
              checked={checked}
            // onChange={(e) => updateStdid(e.target.value)}


            />

          </div>
        );
      },
    },
    {
      name: "Student Name",
      selector: "student_name",
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

  // console.log("print tudnet id", STUDENTID);
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

  return (
    <div>
      <div
        className="recipient_class"
        style={{ marginTop: "0px", height: "100%", padding: "0" }}
      >
        <div className="mt-2" style={{ width: "100%", margin: "0", paddingBottom: "10px", borderBottom: "0.5px solid #C4C4C4" }} >

          <div className=" d-flex flex-row" style={{ padding: "10px", borderRadius: "10px", height: "98%", background: "rgba(228, 233, 243, 0.6)", padding: "0px", border: "1px solid #E5E5E5", }}>
            <BiSearchAlt2 style={{ background: "rgba(228, 233, 243, 0.6)", fontSize: "28PX", verticalAlign: "middle", margin: "3px 0px 0px 3px", color: "darkgrey" }} />
            {/* <img src="dist/img/Search.png" alt="dropdown" width="18px" height="18px"   /> */}
            <Input
              id="search"
              type="text"
              placeholder="Search by Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{ background: "rgba(228, 233, 243, 0.6)", height: "35px", width: "100%", border: "none", fontWeight: "600", borderRadius: "10PX" }}
            />
          </div>

        </div>
        <DataTable
          columns={columns}
          data={filteredItems}
          striped
          pagination
          subHeader
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          subHeaderComponent={subHeaderComponent}
          highlightOnHover

          defaultSortFieldId={1}
          customStyles={customStyles}
        />
        {/* end news table */}
        <div className="d-flex">
          <input
            type="button"
            className=" form-buttons3"
            defaultValue="Sign Up"
            onClick={() => InviteStudent()}
            value="Invite"
            style={{
              fontWeight: "500",
              border: "none",
              color: "white",
              borderRadius: "6px",
              marginLeft: "auto",
              backgroundColor: "#000000 !important",
              padding: "8px 40px",
              textAlign: "center",
              fontSize: "11PX",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              marginRight: "60PX",
              marginBottom: "20px",
            }}
          />
        </div>

        <div
          style={{
            color: "black",
            marginLeft: "10px",
            fontSize: "12px",
            display: "none",
          }}
          className="invitation"
        >
          Student Invited Successfully
        </div>
      </div>
    </div>
  );
}
