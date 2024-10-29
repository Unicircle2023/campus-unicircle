import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import { Link } from "react-router-dom";

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
      marginTop: "6PX",
      border: "none",
      height:"30px",
      fontSize:"10px",
      fontWeight:"500"

    },
  },
  headCells: {
    style: {
      color: "#1F3977",
    },
  },

  head: {
    style: {
      fontWeight:"400",
      fontSize:"9px",
      boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)",
    },
  },
  table: {
    style: {
      marginTop: "0PX",
      height: "auto",
      display:"flex"
    },
  },
};

export function Class() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);;
  const [isLoading, setIsLoading] = useState(false);
 
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [classId, updateClassId] = useState();
  const [className, updateClassName] = useState();
  const [uniName, setUniName] = useState("");
  const [campName, setCampName] = useState("");

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };

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

  // async function fetchDepartmentList() {
  //   try {
  //     const fetchDepartmentResponse = await axios.get(
  //       process.env.REACT_APP_API_KEY + "get_department_list",
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     console.log("Get Department List Details", fetchDepartmentResponse);

  //     const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
  //     console.log("Department Error Code ", DepartmentErrorCode);

  //     if (DepartmentErrorCode == 200) {
  //       const departmentListArray = fetchDepartmentResponse.data.data;
  //       console.log("Department list Array", departmentListArray);
  //       setDepartmentData(departmentListArray);
  //     } else {
  //       setDepartmentData([]);
  //     }
  //   } catch (err) {
  //     console.log("Log in Fail", err);
  //   }
  // }



  // const getDepartment = (e) => {
  //   updateDepartmentId(e);
   
  //   console.log("eventdId departmentID;;;;;", e);
  //   {
  //     departmentdata.map((dept) => {
  //       if (e == dept.department_id) {
  //         getCourseList(dept.department_id);
         
  //       }
  //     });
  //   }
  // };

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
      deleteClassApi();
    }
  }

  async function deleteClassApi() {
    try {
      const formData = new FormData();

      formData.append("class_id", classId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_class",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Classss", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }

  async function updateForm() {
    // setIsEditLoading(true)
    const formData = new FormData();

    formData.append("cid", classId);
    formData.append("class_name", className);
    
    
    const editResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_class",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("Update Course", editResponse);

    if (editResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    } else if (editResponse.data.error_code == 409) {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".course_exist").show();
      }, 1000);

      setTimeout(() => {
        $(".course_exist").hide();
      }, 3000);
    } else {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".required_filed").show();
      }, 1000);

      setTimeout(() => {
        $(".required_filed").hide();
      }, 3000);
    }
  }

  const handleEditButton = () => {
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Course Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/classDetails";
    });
  };

  function update_edited_Event() {
    $(".edit_popup_password").show();
  }

  async function editClass(class_id) {
    console.log("class Id", class_id);
    const formData = new FormData();
    formData.append("class_id", class_id);

    const editClassResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_class",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("GET SINGLE class------", editClassResponse);
    if (editClassResponse.data.error_code == 200) {
      editClassResponse.data.data.map((item) => {
        updateClassId(item.class_id);
        updateClassName(item.class_name);
        $(".edit_container").show();
      });
    }
  }


  const handleButton = () => {
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Course Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/classDetails";
    });
  };

  function deleteClass(id) {
    // updateCourseId(id);
    updateClassId(id);
    $(".delete_container").show();
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  function close_edit_modal() {
    $(".edit_container").hide();
  }

  // async function getCourseList(value) {
  //   try {
    
  //     const formData = new FormData();
  //     formData.append("d_id", value);
  //     const fetchResponse = await axios.post(
  //       process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     if (fetchResponse.data && fetchResponse.data.error_code == 200) {
  //       setCourseData(fetchResponse.data.data);
  //     } else if (fetchResponse.data.error_code != 200) {
  //       setCourseData([]);
  //     }
    
  //   } catch (err) {
  //     console.log("Log in Fail", err);
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    getUserDetails();
    getClassList();
  
  }, []);



  async function getClassList() {
    try {
      $(".edit_popup_password").hide();
      setIsLoading(true);
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_classes_list ",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get all student-------------", fetchResponse);
      setData(fetchResponse.data.data);
      const s_data = fetchResponse.data.data;
      s_data.map((e)=>{
        setUniName(e.university_name);
      setCampName(e.campus_name);
      })
     
      setIsLoading(false);
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  const columns = [
    {
      name: "Class Id",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.class_id}</div>;
      },
    },
    {
      name: "University",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div className="overflow_class"style={{width:"160px"}}>{row.university_name}</div>;
      },
    },
    {
      name: "Campus",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div className="overflow_class" style={{width:"160px"}}>{row.campus_name}</div>;
      },
    },
    {
      name: "Class Name",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div className="overflow_class"style={{width:"160px"}}>{row.class_name}</div>;
      },
    },
    {
      name: "Action",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div className="d-flex">
            <a
              className="cta"
              href="#edit"
              onClick={() => editClass(row.class_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={require("../images/Pencil.png")}
                alt="edit"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </a>

            <a
              className="cta"
              href="#delete"
              onClick={() => deleteClass(row.class_id)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                style={{ width: "20px", height: "20px", marginLeft: "2px" }}
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

  const filteredItems =
    data &&
    data.filter(
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
            <label className="main_labels">Edit Class</label>

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
              <div className="mt-2 border_class2 edit_row_padding">
                <div className=" p-0">
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
                          <label className="all_labels">University</label>

                          <p className="all_stars"></p>
                        </div>

                        <input
                          type="text"
                          value={uniName}
                          className="input_fields all_edit_inputs"
                          id="uni_name"
                          name="birthdaytime"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

               

                <div className="mt-2 p-0">
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
                          <label className="all_labels">Campus</label>

                          <p className="all_stars"></p>
                        </div>
                        <input
                          type="text"
                          value={campName}
                          className="input_fields all_edit_inputs"
                          id="camp_name"
                          name="birthdaytime"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* update class */}
                <div className="mt-2 p-0">
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
                          <label className="all_labels">Class Name</label>

                          <p className="all_stars">*</p>
                        </div>

                        <input
                          type="text"
                          onChange={(e) => updateClassName(e.target.value)}
                          value={className}
                          className="input_fields all_edit_inputs"
                          id="appointment_date"
                          name="birthdaytime"
                        />
                      </div>
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
                    onClick={() => update_edited_Event()}
                  />
                </a>
              </div>

              <div
                className="course_exist"
                style={{
                  display: "none",
                  fontSize: "12px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Class already exist..!!
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
          {/* </form> */}
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
              Edit Course
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

      <div id="delete" className="modaloverlay delete_container">
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete message
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure, You Want To Delete This Class?
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
              Delete Class
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
          Course Deleted Successfully!!
        </p>
      </div>

      <div
        className="show_edit_message "
        style={{ display: "none", marginLeft: "20px" }}
      >
        <p style={{ fontWeight: "600", fontSize: "14PX", color: "green" }}>
          Course Updated Successfully!!
        </p>
      </div>

      <div className="row border_class2 search_box_padding">
        <div
          className="col-md-4 d-flex flex-row"
          style={{ alignItems: "center" }}
        >
          <h4 className="main_heading_h1">Classes</h4>
        </div>

        <div className="col-md-3 d-flex flex-row">
          <div className="search_box_div">
            <img
              className="search_box_img"
              src={require("../images/Search.png")}
            />
            <Input
              className="search_box"
              id="search"
              type="text"
              placeholder="Search by Class"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-5 d-flex flex-row">
          <div style={{ marginTop: "0px", padding: "0",marginLeft:"auto" }}>
            <Link to="/createClass">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
                >
               
                <div className="create_button_inner">
                    Create Class
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
            customStyles={customStyles}
          />
        </div>
      )}

      {/* ****************************delete preview appointment**************************************** */}
      <div
        className="delete_preview_polls"
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
            background: "#f2f2f2",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)",
            position: "relative",
            width: "420px",
            height: "auto",
            overflow: "auto",
            margin: "100px auto",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex">
            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              width="18px"
              height="14px"
              className="close_event ml-auto"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="mt-3">
            <p style={{ fontWeight: "600", color: "black", fontSize: "13px" }}>
              Delete message
            </p>
            <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
              Are You Sure You Want To Delete This Course?
            </h2>

            <div className="d-flex mt-3">
              <input
                type="button"
                className="create_btn"
                value="Cancel"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  fontSize: "13PX",
                  padding: "8px 12px",
                  marginLeft: "auto",
                  color: "#d21f3c",
                }}
              />

              <a
                className="cta"
                href="#deletePreview_with_password"
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
  );
}
