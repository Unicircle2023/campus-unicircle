import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import styled from "styled-components";
import $ from "jquery";
import Previous_next_button from "./Previous_next_button";
import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";

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
      padding: "10px 0 10px 15px",
      border: "none",
    },
  },

  head: {
    style: {
      padding: "10px 0 10px 15px",
      fontWeight: "600",
      color: "black",
    },
  },
  table: {
    style: {
      padding: "0",
    },
  },
};
export function Map() {
  const token = localStorage.getItem("Token");
  const [lat, updateLat] = useState("");
  const [long, updateLong] = useState("");
  const [address, updateAddress] = useState("");
  const [data, setData] = useState([]);

  const [campudId, updateCampudId] = useState();

  async function getUserDetails() {
    const fetchResponse = await axios.get(
      process.env.REACT_APP_API_KEY + "admin_get_Primary_user_info",

      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("Get campus info", fetchResponse.data.data);
    if (fetchResponse.data.error_code == 200) {
      fetchResponse.data.data.map((fetchItem) => {
        console.log(
          "jfbbcnbbbbbbbbbbbbbbbbbbiddddddddddddfetchItem.campus_id",
          fetchItem.campus_id
        );

        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
  }
  async function fetchCampus() {
    // const id= campudId;
    // console.log("token---------->", token);
    let formData = new FormData();
    formData.append("campus_id", campudId);
    let header = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };
    // console.log("--->>>",formData);
    try {
      // const resp = await axios({
      //   url: process.env.REACT_APP_API_KEY + "admin_get_all_campus_map",
      //   method: 'POST',
      //   headers: headers,
      //   data: formData,
      // });
      // // console.log("resp---->>>",resp);
      // if(resp.data.data && resp.data.error_code == '200'){
      //   setData(resp.data.data);
      // }
      // else{
      //   console.log('--->>>',resp.data);
      // }
      const response = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_all_campus_map",
        formData,
        header
      );

      console.log("Create address from map.........>>", response);
      if (response.data.error_code == 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (campudId) {
      fetchCampus();
    }
  }, [campudId]);

  function viewDescription() {
    $(".preview_polls").show();
  }
  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (map_id) => {
    setChildNewsData(map_id);

    // edit_category(appointment_id);
  };
  function closePreviewDescription() {
    $(".preview_polls").hide();
  }
  const passDeleteData = (map_id) => {
    setChildNewsData(map_id);
    // delete_category(appointment_id);
  };

  function close_edit_modal() {
    $(".edit_container").hide();
  }
  function update_edited_News() {
    $(".edit_popup_password").show();
  }
  function close_delete_modal() {
    $(".preview_category").hide();
  }

  const [mapId, updateMapId] = useState("");
  function deleteNews(map_id) {
    updateMapId(map_id);
    $(".delete_container").show();
  }
  async function editNewsRow(map_id) {
    console.log("get map id", map_id);
    $(".edit_container").show();
    updateMapId(map_id);
    const formDataCategory = new FormData();

    formDataCategory.append("map_id", map_id);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_campus_map",
      formDataCategory,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("Create address from map", response);
    if (response.data.error_code == 200) {
      response.data.data.map((item) => {
        updateLat(item.latitude);
        updateLong(item.longitude);
        updateAddress(item.title);
      });
    }
  }

  const columns = [
    {
      name: "Title",
      sortable: true,
      wrap: true,
      width: "20%",
      cell: (row) => {
        console.log("PRINT ROW DATA", row);
        return (
          <div
            onClick={() => viewDescription(row.map_id)}
            style={{
              backgroundColor: "transparent",
              fontWeight: "600",
              fontSize: "12px",
              color: "black",
            }}
          >
            {row.title}
          </div>
        );
      },
    },
    {
      name: "Longitude",
      // selector: 'category',
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div
            onClick={() => viewDescription(row.map_id)}
            style={{
              fontWeight: "500",
              fontSize: "11PX",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {row.longitude}
          </div>
        );
      },
    },
    {
      name: "Latitude",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div
            onClick={() => viewDescription(row.map_id)}
            style={{
              fontWeight: "500",
              fontSize: "11PX",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {row.latitude}
          </div>
        );
      },
    },

    {
      name: "Action",
      wrap: true,
      width: "auto",
      cell: (row) => {
        console.log("get row data", row);
        return (
          <div className="d-flex">
            <a
              className="cta"
              href="#edit"
              onClick={() => editNewsRow(row.map_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={require("../images/Pencil.png")}
                alt="edit"
                style={{ width: "18px", height: "18px", marginLeft: "5px" }}
              />
            </a>

            <a
              className="cta"
              href="#deleterow"
              onClick={() => deleteNews(row.map_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                style={{ width: "18px", height: "18px", marginLeft: "2px" }}
                src={require("../images/delete.png")}
              />
              &nbsp;
            </a>
          </div>
        );
      },
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

  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  // const [campudId, updateCampudId] = useState("");

  // async function getUserDetails() {
  //   const fetchResponse = await axios.get(
  //     process.env.REACT_APP_API_KEY + "admin_get_Primary_user_info",

  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",

  //         Authorization: token,
  //       },
  //     }
  //   );

  //   console.log("Get campus info", fetchResponse.data.data);
  //   if(fetchResponse.data.error_code == 200)
  //   {
  //     fetchResponse.data.data.map((fetchItem) => {
  //       updateEmailAddress(fetchItem.email);
  //       updateCampudId(fetchItem.campus_id);
  //     });
  //   }

  // }

  const [isEditLoading, setIsEditLoading] = useState(false);
  async function editWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
    // setIsEditLoading
    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }

  async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();

    formData.append("map_id", mapId);
    formData.append("title", address);
    formData.append("lat", lat);
    formData.append("long", long);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_campus_map",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("Update Campus Event", eventResponse);
    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    } else {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".required_filed").show();
      }, 1000);
    }
  }

  function showMap() {
    $(".preview_polls").show();
  }
  function closeMap() {
    $(".preview_polls").hide();
  }
  // delete
  function close_delete_modal() {
    $(".preview_category").hide();
  }
  async function deleteWithPassword() {
    const formData = new FormData();

    formData.append("username", emailAddress);
    formData.append("password", deletePassword);
    formData.append("campus_id", campudId);

    const deleteNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_check_password",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deleteNewsApi();
    }
  }

  async function deleteNewsApi() {
    try {
      const formData = new FormData();

      formData.append("map_id", mapId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_campus_map",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Campus News", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  const handleEditButton = () => {
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Campus Map Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/mapDetails";
    });
  };

  const handleButton = () => {
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Campus Map Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/mapDetails";
    });
  };

  return (
    <div className="content-wrapper">
      <div
        className="row mt-2 mb-2 border_class"
        style={{
          width: "100%",
          marginLeft: "0",
          padding: "0px 10px",
          background: "#ffffff",
          alignItems:"center",
          padding:"8px"
        }}
      >
        <div
          className="col-md-6 d-flex flex-row"
          style={{ height: "100%", padding: "0px 5px" }}
        >
          <h4 style={{ color: "black", fontWeight: "600" }}>
            CAMPUS MAP
          </h4>
        </div>

        <div
          className="col-md-3 d-flex flex-row"
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
          {/* <BiSearchAlt2 style={{fontSize:"28PX",verticalAlign:"middle",margin:"3px 0px 0px 3px",color:"darkgrey"}}/> */}
          <Input
            id="search"
            type="text"
            placeholder="Search by title"
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

       
        <div className="col-md-3 d-flex flex-row" style={{justifyContent:"end"}}>
          <div style={{ marginTop: "0px", padding: "0" }}>
            <a href="/createMapDetails">
              <button
                type="button"
                className="d-flex publish_button"
                defaultValue="Sign Up"
                style={{
                  height:"32px",
                  justifyContent:"center",
                  alignItems:"center",
                  fontSize:"12px",
                  padding:"0px",
                  width:"140px"
                }}
              >
                {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
                Create Map
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="border_class">
      <DataTable
        columns={columns}
        data={filteredItems}
        striped
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
        highlightOnHover
        defaultSortFieldId={1}
        customStyles={customStyles}
      />
      </div>

      {/* edit map */}

      <div
        id="edit"
        className="edit_container"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          zIndex: "10",
          display: "none",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "absolute",
            bottom: "0px",
            top: "0",
            right: "5px",
            width: "400px",
            height: "100%",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label
              style={{ color: "black", fontSize: "13px", fontWeight: "700" }}
            >
              Edit Campus Map
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto"
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            />
          </div>

          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div
              className="preview_form"
              style={{
                fontSize: "11PX",
                margin: "5px 0 0 0",
                padding: "0px 5px 60px 0px",
                overflowY: "auto",
                height: "600px",
              }}
            >
              {/* title */}

              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12" style={{ padding: "0" }}>
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label
                          style={{
                            color: "#1F3977",
                            fontSize: "11px",
                            fontWeight: "600",
                          }}
                        >
                          Enter Your Title
                        </label>

                        <p
                          style={{
                            color: "#EB2424",
                            fontWeight: "600",
                            marginLeft: "3PX",
                          }}
                        >
                          *
                        </p>
                      </div>
                      <input
                        type="name"
                        className="input_fields"
                        id="news_title"
                        value={address}
                        onChange={(e) => updateAddress(e.target.value)}
                        autoComplete="true"
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid #c4c4c4",
                          boxSizing: "border-box",
                          fontSize: "11px",
                          paddingLeft: "5PX",
                          color: "black",
                        }}
                      />
                      <div
                        class="NewsTitle"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Write News Title
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* latitude */}
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12" style={{ padding: "0" }}>
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label
                          style={{
                            color: "#1F3977",
                            fontSize: "11px",
                            fontWeight: "600",
                          }}
                        >
                          Latitude
                        </label>

                        <p
                          style={{
                            color: "#EB2424",
                            fontWeight: "600",
                            marginLeft: "3PX",
                          }}
                        >
                          *
                        </p>
                        <div
                          id="latclicked"
                          style={{
                            marginLeft: "5px",
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        ></div>
                      </div>
                      <input
                        type="name"
                        className="input_fields"
                        id="latclicked"
                        value={lat}
                        disabled
                        // onChange={(e) =>updateLat(e.target.value)}
                        autoComplete="true"
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid #c4c4c4",
                          boxSizing: "border-box",
                          fontSize: "11px",
                          paddingLeft: "5PX",
                          color: "black",
                        }}
                      />
                      <div
                        class="NewsTitle"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Write News Title
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* longitude */}
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12" style={{ padding: "0" }}>
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label
                          style={{
                            color: "#1F3977",
                            fontSize: "11px",
                            fontWeight: "600",
                          }}
                        >
                          Longitude
                        </label>

                        <p
                          style={{
                            color: "#EB2424",
                            fontWeight: "600",
                            marginLeft: "3PX",
                          }}
                        >
                          *
                        </p>
                        <div
                          id="longclicked"
                          style={{
                            marginLeft: "5px",
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        ></div>
                      </div>
                      <input
                        type="name"
                        className="input_fields"
                        id="longclicked"
                        value={long}
                        // onChange={(e) =>updateLong(e.target.value)}
                        disabled
                        autoComplete="true"
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid #c4c4c4",
                          boxSizing: "border-box",
                          fontSize: "11px",
                          paddingLeft: "5PX",
                          color: "black",
                        }}
                      />
                      <div
                        class="NewsTitle"
                        style={{ marginTop: "-6px", display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "12PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Write News Title
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-3">
                <a
                  onClick={() => close_edit_modal()}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    value="Cancel"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      color: "#1F3977",
                      fontWeight: "600",
                      fontSize: "13PX",
                      padding: "8px 12px",
                    }}
                  />
                </a>

                <a
                  className="cta"
                  href="#edit_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edited_News()}
                    style={{
                      borderRadius: "5px",
                      marginRight: "7px",
                      backgroundColor: "#1F3977",
                      fontSize: "13PX",
                      padding: "8px 12px",
                    }}
                  />
                </a>
              </div>

              <div
                className="required_filed"
                style={{
                  display: "none",
                  fontSize: "12px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Please Fill The Require Field !!!
              </div>

              <div
                style={{ margin: "10px 10px 0px 10px ", fontFamily: "Poppins" }}
              >
                {/* <div style={{width:"100%"}} >
          
           <div id="map" style={{width:"100%"}}></div>
           
       </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* } */}

      {/* edit popuop with password */}
      <div id="edit_with_password" className="modaloverlay edit_popup_password">
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Edit Campus Map
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are editing a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Edit"
                onClick={() => editWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>

          {/* </div> */}
          {/* </form> */}
        </div>
      </div>

      <div id="deleterow" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure You Want To Delete This Area?
              </h2>

              <div className="d-flex mt-3">
                <a
                  onClick={close_delete_modal}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    value="Cancel"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      color: "#d21f3c",
                      fontSize: "13PX",
                      padding: "8px 12px",
                      fontWeight: "600",
                    }}
                  />
                </a>

                <a
                  className="cta"
                  href="#delete_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Delete"
                    style={{
                      borderRadius: "5px",
                      marginRight: "7px",
                      backgroundColor: "#d21f3c",
                      fontSize: "13PX",
                      padding: "8px 12px",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>

      {/* delete popuop with password */}
      <div
        id="delete_with_password"
        className="modaloverlay delete_popup_password"
      >
        <div
          className="modalContainer"
          style={{
            width: "500px",
            borderRadius: "0",
            padding: "10PX",
            background: "#6C7A99",
          }}
        >
          {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Campus Map
            </p>
            <a
              onClick={close_delete_modal}
              href="#"
              style={{ marginLeft: "auto", marginTop: "0" }}
            >
              <img
                src={require("../images/delete_cancel.png")}
                style={{ height: "26px", width: "26px" }}
              />
            </a>
          </div>

          <div
            style={{ background: "white", padding: "15px", fontSize: "13px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#2D5DD0" }}>Warning:</p>
              <p style={{ marginLeft: "5px" }}>
                You are deleting a screen. This operation cannot be
              </p>
            </div>

            <p>
              {" "}
              undone. Please type the password of the screen Admin into the box
              below to confirm you really want to do this.
            </p>

            <div className="d-flex mt-4">
              <p
                style={{
                  marginTop: "10PX",
                  fontWeight: "600",
                  fontSize: "13PX",
                }}
              >
                Admin Password:
              </p>
              <input
                type="password"
                // className="create_btn"
                // id="delete_single_student"
                value={deletePassword}
                onChange={(e) => updateDeletePassword(e.target.value)}
                style={{
                  marginLeft: "6px",
                  width: "70%",
                  borderRadius: "5px",
                  background: "white",
                  height: "40px",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  border: "1px solid #2d5dd0",
                }}
              />
            </div>
            <div className="d-flex mt-4">
              <div style={{ marginTop: "10PX" }}>
                {deleteErrorCode == 200 ? (
                  <div style={{ color: "green" }}>{deleteErrorMessage}</div>
                ) : (
                  <div style={{ color: "red" }}>{deleteErrorMessage}</div>
                )}
              </div>
              <input
                type="button"
                className="create_btn ml-auto"
                id="delete_single_student"
                value="Delete"
                onClick={() => deleteWithPassword()}
                style={{
                  borderRadius: "5px",
                  marginRight: "7px",
                  background: "rgba(235, 36, 36, 0.95)",
                  fontSize: "13PX",
                  padding: "8px 25px",
                }}
              />
            </div>
          </div>

          {/* </div> */}
          {/* </form> */}
        </div>
      </div>

      {/**********************************************8PREVIEW********************************************8*/}
      <div
        className="preview_polls"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          zIndex: "10",
          display: "none",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "absolute",
            bottom: "0px",
            top: "0",
            right: "5px",
            width: "420px",
            height: "100%",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label
              style={{ color: "black", fontSize: "11px", fontWeight: "700" }}
            >
              Campus Map
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closePreviewDescription()}
              style={{
                cursor: "pointer",
                width: "20px",
                height: "20px",
                marginLeft: "auto",
              }}
            />
          </div>

          <div
            style={{
              background: "white",
              marginTop: "10PX",
              padding: "5px 10PX",
              border: "0.4px solid #C4C4C4",
              height: "100%",
            }}
          >
            {data.length != "" ? (
              <Previous_next_button
                data={data}
                passEditData={passEditData}
                passDeleteData={passDeleteData}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
