import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import $ from "jquery";
import styled from "styled-components";
import toast from "react-hot-toast";
import FormData from "form-data";

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
      color: "#4AA081",
    },
  },

  rows: {
    style: {
      background: "#f5f5f5",
      // borderBottom: "0.5px solid #edebeb",
      padding: "0",
      minHeight: "30px !important",
      fontSize: "10px",
      fontWeight: "500",
      border:"0.5px solid #edebeb"
    },
  },

  table: {
    style: {
      fontSize: "12px",
      height: "100%",
      fontWeight: "500",
      height: "280px",
    },
  },
};

export function NewPersonaRecipients(props) {
  const token = localStorage.getItem("Token");

  const [data, setData] = useState([]);
  const [personaId, updatePersonaId] = useState([]);
  const [studentIds, updateStudentIds] = useState([]);
  // fetchList();
  async function fetchList() {
    try {
      const fetchPersonaResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_persona_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );


      if (fetchPersonaResponse.data.error_code == 200) {
        setData(fetchPersonaResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  var persona_name = [];
  async function InviteStudent() {
    const formData = new FormData();
    formData.append("users", JSON.stringify(studentIds));

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


    if (fetchNewsResponse.data.error_code == 200) {
      toast.success("Persona selected");
    } else {
      toast.error("Please select persona");
    }

    props.passPersonaData(JSON.stringify(personaId), persona_name);
  }
  useEffect(() => {
    fetchList();
  }, []);

  const handleCheckboxChange = async (row) => {
    try{
    const p_id = row.persona;
    const formData = new FormData();
    formData.append("persona",p_id);

    const fetchStudentIdResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_student_persona_ids",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    const std_ids = fetchStudentIdResponse.data.data;
    const isSelected = personaId.some((i) => i.id === row.persona_id);

    if (isSelected) {
      updatePersonaId((prev) => prev.filter((i) => i.id !== row.persona_id));
      std_ids.map((_item) =>{
        updateStudentIds((prew)=> prew.filter((f) => f.id !== _item.id))

      })

    } else {
      let obj = {
        id: row.persona_id,
        name: row.persona,
      };
      updatePersonaId((prev) => [...prev, obj]);

      let s_obj = {}
      std_ids.map((_item) =>{

        s_obj ={
          id : _item.id,
          name : _item.name
        }
        updateStudentIds((prev) => [...prev, s_obj])
      })
    }
  }catch(err){console.log("fetchStudentIdResponse--------",err);}
  };



  const columns = [
    {
      name: "",
      sortable: true,
      wrap: true,
      width: "10%",
      cell: (row) => {
        const isSelected = personaId.some((i) => i.id === row.persona_id);

        return (
          <div key={row.persona_id}>
             <div className="d-flex" id="sendNotification" >
                    <input  onChange={() => handleCheckboxChange(row)}
                      type="checkbox"
                      checked={isSelected}
                      id={`persona_checkbox_${row.persona_id}`}
                      name="eventUserType"
                      value="1"
                      style={{display:"none",
                        width: "20px",
                        height: "20px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <label
                       htmlFor={`persona_checkbox_${row.persona_id}`}
                      className="d-flex nine_font_class"
                      style={{
                        color: "black",
                        marginLeft: "10PX",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom:"0px"
                      }}
                      onChange={() => handleCheckboxChange(row)}
                    >

                    </label>
                  </div>
          </div>
        );
      },
    },
    {
      name: "Persona Name",
      selector: "persona",
      sortable: true,
      wrap: true,
      width: "auto",
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

    return <div></div>;
  }, [filterText, resetPaginationToggle]);

  const deleteSelectedStudent = (s_id) => {
    const updated_p_id = personaId.filter((item) => item.id !== s_id);
    const updated_std_id = studentIds.filter((item) => item.id !== s_id);
    updatePersonaId(updated_p_id);
    updateStudentIds(updated_std_id);
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
              placeholder="Search by Persona"
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
          subHeaderComponent={subHeaderComponent}
          highlightOnHover
          defaultSortFieldId={1}
          customStyles={customStyles}
        />
        {/* end news table */}

        <div className="border_class2 selected_std_main_div">
          {studentIds.map((s_item) => {
            return (
              <div className="selected_std_div" key={s_item.id}>
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => deleteSelectedStudent(s_item.id)}
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
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
