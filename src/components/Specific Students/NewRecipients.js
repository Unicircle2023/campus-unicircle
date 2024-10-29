import React, { useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import axios from "axios";

import toast from "react-hot-toast";

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
  head: {
    style: {
      marginTop: "0PX",
      fontSize: "11px",
      fontWeight: "600",
      color: "#4AA081",
    },
  },

  rows: {
    style: {
      background: "#f5f5f5",
      border: "0.5px solid #edebeb",
      padding: "0",
      minHeight: "30px !important",
      fontSize: "10px",
      fontWeight: "500",
    },
  },

  table: {
    style: {
      fontSize: "10px",
      height: "100%",
      fontWeight: "500",
      height: "360px",
    },
  },
};

export function NewRecipients(props) {

  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [stdid, updateStdid] = useState([]);

  async function fetchList() {
    try {
      const fetchStdListResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_students_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if (fetchStdListResponse.data.error_code == 200) {
        setData(fetchStdListResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  var std_name = [];
  async function InviteStudent() {
    try {
      const formData = new FormData();
      formData.append("users", JSON.stringify(stdid));
      const fetchStdResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_user_id_name",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      if (fetchStdResponse.data.error_code == 200) {
        toast.success("Students selected");
        fetchStdResponse.data.data.map((item) => {
          std_name.push(item.name);
        });
      } else {
        toast.error("Please select Students");
      }

      props.passData(JSON.stringify(stdid), std_name);
    } catch (err) {
      console.log("err");
    }
  }
  useEffect(() => {
    fetchList();
  }, []);


  const handleCheckboxChange = (row) => {
    const isSelected = stdid.some((i) => i.id === row.student_id);

    if (isSelected) {
      updateStdid((prev) => prev.filter((i) => i.id !== row.student_id));
    } else {
      let obj = {
        id: row.student_id,
        name: row.first_name,
      };
      updateStdid((prev) => [...prev, obj]);
    }
  };

  const columns = [
    {
      name: "",
      sortable: true,
      wrap: true,
      width: "10%",
      cell: (row) => {
        const isSelected = stdid.some((i) => i.id === row.student_id);

        return (
          <div>
             <div className="d-flex">
                    <input  onChange={() => handleCheckboxChange(row)}
                      type="checkbox"
                      checked={isSelected}
                      id={`persona_checkbox_${row.student_id}`}
                      name="eventUserType"
                      value="1"
                      style={{ display:"none",
                        width: "20px",
                        height: "20px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <label
                       htmlFor={`persona_checkbox_${row.student_id}`}
                      className="d-flex nine_font_class"
                      style={{
                        color: "black",
                        marginLeft: "10PX",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom:"0px"
                      }}
                    >

                    </label>
                  </div>
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


  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );
  // props.setdataSet(filteredItems);

  const deleteSelectedStudent = (s_id, s_name) => {
    const updatedStdid = stdid.filter((item) => item.id !== s_id);
    updateStdid(updatedStdid);
  };

  return (
    <div>
      <div
        className="recipient_class"
        style={{ marginTop: "0px", height: "100%", padding: "0" }}
      >
        <div className="mt-2" style={{ width: "100%" }}>
          <div
            className=" d-flex flex-row"
            style={{
              borderRadius: "2px",
              height: "35px",
              background: "#E5E5E5",
              padding: "0px 10px",
              alignItems: "center",
            }}
          >
            <img
              src={require("../images/Search.png")}
              className="search_box_img"
            />

            <Input
              id="search"
              type="text"
              placeholder="Search by Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{
                background: "transparent",
                height: "35px",
                width: "100%",
                border: "none",
                fontSize: "10px",
                fontWeight: "500",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredItems}
          striped
          subHeader
          highlightOnHover
          defaultSortFieldId={1}
          customStyles={customStyles}
        />

        <div className="border_class2 selected_std_main_div">
          {stdid.map((s_item) => {
            return (
              <div className="selected_std_div">
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => deleteSelectedStudent(s_item.id, s_item.name)}
                >
                  <img
                    src="dist/img/selected_std_close.png"
                    className="selected_std_close_img"
                  />
                </button>
                <p>{s_item.name}</p>
              </div>
            );
          })}
        </div>

        <div className="d-flex form-buttons p-0 border_class2 box_padding buttons_div">
          <button
            type="button"
            className="publish_button"
            onClick={() => InviteStudent()}
            value="Publish"
          >Save</button>
        </div>
      </div>
    </div>
  );
}
