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

export function Course() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [courseId, updateCourseId] = useState("");
  const [course, updateCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [departmentId, updateDepartmentId] = useState("");
  const [department, updateDepartment] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [departmentdata, setDepartmentData] = useState([]);

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

  async function fetchDepartmentList() {
    try {
      const fetchDepartmentResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_department_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get Department List Details", fetchDepartmentResponse);

      const DepartmentErrorCode = fetchDepartmentResponse.data.error_code;
      console.log("Department Error Code ", DepartmentErrorCode);

      if (DepartmentErrorCode == 200) {
        const departmentListArray = fetchDepartmentResponse.data.data;
        console.log("Department list Array", departmentListArray);
        setDepartmentData(departmentListArray);
      } else {
        setDepartmentData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchDepartmentList();
  }, []);

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
      deleteCourseApi();
    }
  }

  async function deleteCourseApi() {
    try {
      const formData = new FormData();

      formData.append("id", courseId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Course", deleteResponse);
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

    formData.append("id", courseId);
    formData.append("course_name", course);
    formData.append("department_id", departmentId);

    const editResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_course",
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
      window.location = "/courseDetails";
    });
  };

  function update_edited_Event() {
    $(".edit_popup_password").show();
  }

  async function editCourse(course_id) {
    console.log("course Id", course_id);

    $(".edit_container").show();

    const formData = new FormData();
    formData.append("id", course_id);

    const editCourseResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_course",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("GET SINGLE COURSE", editCourseResponse.data.data);
    if (editCourseResponse.data.error_code == 200) {
      editCourseResponse.data.data.map((item) => {
        updateCourseId(item.course_id);
        updateDepartmentId(item.department_id);
        updateDepartment(item.department);
        updateCourse(item.course_name);
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
      window.location = "/courseDetails";
    });
  };

  function deleteCourse(id) {
    updateCourseId(id);
    $(".delete_container").show();
  }

  function close_delete_modal() {
    $(".delete_container").hide();
  }

  function close_edit_modal() {
    $(".edit_container").hide();
  }

  async function getCourseList() {
    try {
      setIsLoading(true);
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "campus_get_course",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Get all student", fetchResponse.data.data);
      setData(fetchResponse.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log("Log in Fail", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
    getCourseList();
  }, []);

  const columns = [
    {
      name: "Course Id",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.course_id}</div>;
      },
    },
    {
      name: "Department",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.department}</div>;
      },
    },
    {
      name: "Course Name",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.course_name}</div>;
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
              onClick={() => editCourse(row.course_id)}
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
              onClick={() => deleteCourse(row.course_id)}
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
            <label className="main_labels">Edit Course</label>

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
                          <label className="all_labels">
                            Department
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <select
                          className="form-select form-select-sm all_edit_inputs"
                          id="departmentName"
                          aria-label=".form-select-sm example"
                          onChange={(e) => updateDepartmentId(e.target.value)}
                          
                        >
                          <option selected="selected" value={department}>
                            {department}
                          </option>
                          {departmentdata.map((dept, index) => {
                            return (
                              <option value={dept.department_id} key={index}>
                                {dept.department_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* appointment date */}
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
                          <label className="all_labels">
                            Course Name
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <input
                          type="text"
                          onChange={(e) => updateCourse(e.target.value)}
                          value={course}
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
                Course already exist..!!
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
                Are You Sure You Want To Delete This Course?
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
              Delete Course
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

      <div className="row border_class2 search_box_padding" >
        <div
          className="col-md-4 d-flex flex-row"
          style={{alignItems:"center" }}
        >
          <h4 className="main_heading_h1">
            Courses
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
          <div style={{ marginTop: "0px", padding: "0",marginLeft:"auto" }}>
            <Link to="/createCourse">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
                >
               
                <div className="create_button_inner">
                    Create Course
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
