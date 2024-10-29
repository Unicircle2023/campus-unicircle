import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import $ from "jquery";
import styled from "styled-components";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner";
import { Link,useHistory} from "react-router-dom";
import SummerNote from "../SummerNote/SummerNote";

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
export function Department() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [deptId, updateDeptId] = useState("");
  const history = useHistory();
  
  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };
  async function fetchList() {
    try {
      setIsLoading(true);
      const fetchDepartmentResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_department_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      setIsLoading(false);
      const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
      const DepartmentErrorMsg = fetchDepartmentResponse.data.message;
      if (DepartmentErrorCode == 200) {
        const departmentListArray = fetchDepartmentResponse.data.data;
        setData(departmentListArray);
      } else {
        setData([]);
     
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
   
    fetchList();
    getUserDetails();
  }, []);


  function close_edit_modal() {
    $(".image_std").show();
    $("#file-ip-1-preview").hide();
    $(".edit_container").hide();
  }

  const columns = [
    {
      name: "Department ID",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div className="d-flex">
            <div>
              <div>{row.department_id}</div>
            </div>
          </div>
        );
      },
    },
    {
      name: "Department Logo",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div>
            <div>
              {row.department_logo == " " ? (
                <div>
                  <img
                    src={require("../images/no_image.png")}
                    alt="no image"
                    style={{ width: "50px", height: "45px" }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={row.department_logo}
                    style={{ width: "45px", height: "45px" }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Department Name",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div className="d-flex">
            <div>
              <div>{row.department_name}</div>
            </div>
          </div>
        );
      },
    },
    {
      name: "Action",
      wrap: true,
      width: "auto",
      cell: (row) => {
      

        return (
          <div className="d-flex">
            <a
              className="cta"
              href="#edit"
              style={{ backgroundColor: "transparent" }}
            >
              <img
                onClick={() => editDept(row.department_id)}
                src={require("../images/Pencil.png")}
                alt="edit"
                style={{ width: "18px", height: "18px", marginLeft: "5px" }}
              />
            </a>

            <a
              className="cta"
              href="#deleterow"
              style={{ backgroundColor: "transparent" }}
            >
              <img
                onClick={() => deleteDept(row.department_id)}
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

  $(".close_event").click(function() {
    $(".preview_polls").hide();
  });

  const [departmentID, updateDepartmentID] = useState("");
  const [departmentDesc, updateDepartmentDesc] = useState("");
  const [departmentLogo, updateDepartmentLogo] = useState(null);
  const [departmentName, updateDepartmentName] = useState("");

  function deleteDept(department_id) {
    updateDepartmentID(department_id);
    $(".delete_container").show();
  }



  async function editDept(dept_id) {
    console.log("dept Id", dept_id);

    $(".edit_container").show();

    const formData = new FormData();
    formData.append("department_id", dept_id);
    const editDeptResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_department_info",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
   
    if (editDeptResponse.data.error_code == 200) {
      updateDeptId(editDeptResponse.data.data.department_id);
      updateDepartmentName(editDeptResponse.data.data.department_name);
      updateDepartmentDesc(editDeptResponse.data.data.department_description);
      updateDepartmentLogo(editDeptResponse.data.data.department_logo);  
    }
  }

  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");


  const handleButton = () => {
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Department Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      fetchList()
      $(".edit_container").hide();
      history.push("/departmentDetails")
    });
  };

  const handleEditButton = () => {
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Department Edited Successfully!!",
      icon: "success",
    }).then(function() {   
      fetchList();
      $(".edit_container").hide();
      history.push("/departmentDetails")
    });
  };

  async function deleteNewsApi() {
    try {
      const formData = new FormData();

      formData.append("department_id", departmentID);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_department",
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
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
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
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deleteNewsApi();
    }
  }

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
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }

  async function updateForm() {
    const formData = new FormData();
    formData.append("department_id", deptId);
    formData.append("department_name", departmentName);
    formData.append("department_desc", departmentDesc);
    formData.append("department_logo", departmentLogo);
    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "edit_department",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    // console.log("Update Campus Event", eventResponse);

    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    }
  }

  function showImage() {
    $(".image_std").hide();
    $("#file-ip-1-preview").show();
  }

  const getImage = (e) => {
    updateDepartmentLogo(null);
    updateDepartmentLogo(e.target.files[0]);   
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      $(".image_std").hide();  
    }
  };

  function close_delete_modal() {
    $(".preview_category").hide();
  }

  const handelSummenrnote = (e) => {
    updateDepartmentDesc(e);
  };

  return (
    <div className="content-wrapper">
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label className="main_labels">Edit Department</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div className="preview_form">
              {/*reason  */}
              <div className="mt-2  border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Department Name
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="text"
                        value={departmentName}
                        onChange={(e) => updateDepartmentName(e.target.value)}
                        className="input_fields all_edit_inputs"
                        id="dept_name"
                        name="birthdaytime"
                        
                      />
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Department Description
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <SummerNote
                        _onChange={handelSummenrnote}
                        value={departmentDesc}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/*Logo  */}
              <div className="mt-2  border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Department Logo
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      {departmentLogo == "" ? (
                        <div>
                          <label for="file-ip-1">
                            <img
                              className="image_std"
                              src={require("../images/no_image.png")}
                              onClick={() => showImage()}
                              alt="no image"
                              style={{ height: "150px" }}
                            />
                            <img
                              id="file-ip-1-preview"
                              style={{
                                display: "none",
                                height: "150px",
                                top: "40px",
                                left: "30px",
                              }}
                            />
                          </label>
                          <input
                            type="file"
                            name="photo"
                            style={{ visibility: "hidden", height: "10px",width:"100%" }}
                            onChange={getImage}
                            id="file-ip-1"
                          />
                        </div>
                      ) : (
                        <div>
                          <label for="file-ip-1">
                            <img
                              className="image_std"
                              src={departmentLogo}
                              onClick={() => showImage()}
                              alt="dropdown"
                              style={{ height: "150px" }}
                            />
                            <img
                              id="file-ip-1-preview"
                              style={{
                                display: "none",
                                height: "150px",
                                top: "40px",
                                left: "30px",
                              }}
                            />
                            <input
                              type="file"
                              name="photo"
                              style={{ visibility: "hidden", height: "10px",width:"100%" }}
                              onChange={getImage}
                              id="file-ip-1"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex mt-3 edit_buttons_div border_class2">
                <a
                  onClick={() => close_edit_modal()}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className="edit_cancel_button"
                    value="Cancel"
                  />
                </a>

                <a
                  className="cta"
                  href="#edit_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
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
            </div>
          </div>
        </div>
      </div>

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
              Edit Department
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
                Are You Sure You Want To Delete This Department?
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
                      backgroundColor: "#c4c4c4",
                      fontSize: "13PX",
                      padding: "8px 12px",
                    }}
                  />
                </a>

                <a
                  className="cta"
                  href="#delete_with_protection"
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
        </div>
      </div>
      {/* delete popuop with password */}
      <div
        id="delete_with_protection"
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
          <div className="d-flex" style={{ padding: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                marginTop: "5PX",
              }}
            >
              Delete Department
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
        </div>
      </div>

      <div
        className="show_delete_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Appointment Deleted Successfully!!
        </p>
      </div>

      <div
        className="show_edit_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Appointment Updated Successfully!!
        </p>
      </div>

      <div className="row border_class2 search_box_padding" >
        <div
          className="col-md-4 d-flex flex-row"
          style={{ alignItems:"center" }}
        >
          <h4 className="main_heading_h1">
            Departments
          </h4>
        </div>

        <div
          className="col-md-4 d-flex flex-row">
             <div className="search_box_div">
          <img className="search_box_img"
            src={require("../images/Search.png")}
            
          />
          <Input className="search_box"
            id="search"
            type="text"
            placeholder="Search by Course"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            
          />
        </div>
        </div>

        <div className="col-md-4 d-flex flex-row">
          <div style={{ marginTop: "0px", padding: "0",marginLeft: "auto"  }}>
            <Link to="/createDepartment">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
               
                >
               
                <div className="create_button_inner">
                   Create Department
                </div>
                <img className="create_button_img"
                    src="dist/img/Progress.png"
                    
                  />
                
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="border_class datatable_padding">
          <DataTable
            style={{ border: "1px solid green" }}
            columns={columns}
            data={filteredItems}
            striped
            paginationPerPage={10}
            pagination
            paginationRowsPerPageOptions={[
              10,
              20,
              30,
              40,
              50,
              60,
              70,
              80,
              90,
              100,
            ]}
            paginationComponentOptions={paginationComponentOptions}
            subHeader
            subHeaderComponent={subHeaderComponent}
            highlightOnHover
            defaultSortFieldId={1}
          />
        </div>
      )}
    </div>
  );
}
