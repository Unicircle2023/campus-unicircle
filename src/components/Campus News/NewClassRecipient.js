import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import axios from "axios";
import $ from "jquery";
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

      borderBottom: "0.5px solid #edebeb",
      marginTop: "0PX",
      fontSize: "12px"
    },
  },

  rows: {
    style: {
      background: "#f5f5f5",
      borderBottom: "0.5px solid #edebeb",
      padding: "0",
      minHeight: "30px !important",
      fontSize: "12px"
    }
  },

  table: {
    style: {

      fontSize: "12px",
      height: "100%",

    },
  },

};

export function NewClassRecipient(props) {
  const token = localStorage.getItem("Token");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [stdid, updateStdid] = useState([]);

  async function fetchList() {
    console.log("OKKKK------->>>>");
    try {
      const formData = new FormData();

      formData.append("department_id", departmentId);
      formData.append("course_id", courseId);
      formData.append("class_id", classId);

      const fetchClassResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "get_class_students_list",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Student Details--->>>", fetchClassResponse.data.data);
      if (fetchClassResponse.data.error_code == 200) {
        setData(fetchClassResponse.data.data);
        $(".invite_button").show();
      }

    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [departmentId, updateDepartmentId] = useState("")
  const [departmentName, updateDepartmentName] = useState("")
  const [courseId, updateCourseId] = useState("")
  const [courseName, updateCourseName] = useState("")
  const [classId, updateClassId] = useState("")
  const [className, updateClassName] = useState("")

  const [departmentdata, updateDepartmentData] = useState([]);
  async function fetchDepartmentList() {
    const token = localStorage.getItem('Token');
    console.log("Access Token-", token);
    try {

      const fetchDepartmentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_department_list",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get Department List Details", fetchDepartmentResponse);

      if (fetchDepartmentResponse.data.error_code == 200) {
        updateDepartmentData(fetchDepartmentResponse.data.data)
      }


    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }
  const [courseData, updateCourseData] = useState([]);

  async function fetchDepartmentWiseCourseList(e) {

    console.log("get department id", e.target.value)
    updateDepartmentId(e.target.value)
    try {
      const formData = new FormData();

      formData.append("d_id", e.target.value);
      const fetchDepartmentResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
        formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get Department List Details", fetchDepartmentResponse);

      if (fetchDepartmentResponse.data.error_code == 200) {
        updateCourseData(fetchDepartmentResponse.data.data)
      }


    }
    catch (err) {
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
    fetchDepartmentList()
  }, []);

  const columns = [
    {
      name: "",
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

            <input type="checkbox" />

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

      <div></div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <div
        className="recipient_class"
        style={{ marginTop: "0px", height: "100%", padding: "0" }}
      >

        {/* department */}

        <div className="mt-0 p-0">
          <div class="row" style={{ padding: "0 10px", margin: "0" }}>
            <div class="col-md-12" style={{ padding: "0" }}>
              <div
                className=""
                style={{ width: "100%", marginTop: "0px" }}
              >
                <label
                  style={{
                    color: "#1F3977",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  Department
                </label>
                <br />
                <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                  id="department"
                  onChange={fetchDepartmentWiseCourseList}
                  // onChange={(e) => updateDepartmentId(e.target.value)}
                  style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid #c4c4c4" }}>


                  <option selected="selected"
                    value={departmentName}
                  >Select Department</option>
                  {departmentdata.map((dept, index) => {

                    return (
                      <option value={dept.department_id} key={index}>
                        {dept.department_name}
                      </option>
                    );
                  })}
                </select>



                <div
                  class="PublishDate"
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
                    Please Select Publish Date
                  </h4>
                </div>
              </div>
            </div>


          </div>
        </div>


        {/* course */}

        <div className="mt-1 p-0">
          <div class="row" style={{ padding: "0 10px", margin: "0" }}>
            <div class="col-md-12" style={{ padding: "0" }}>
              <div
                className=""
                style={{ width: "100%", marginTop: "0px" }}
              >
                <label
                  style={{
                    color: "#1F3977",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  Course
                </label>
                <br />
                <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                  id="department"

                  onChange={(e) => updateCourseId(e.target.value)}
                  style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid #c4c4c4" }}>


                  <option selected="selected"
                    value={courseName}
                  >Select Course</option>
                  {courseData.map((dept, index) => {
                    // console.log("Id", dept.department_name)
                    return (
                      <option value={dept.course_id} key={index}>
                        {dept.course_name}
                      </option>
                    );
                  })}
                </select>



                <div
                  class="PublishDate"
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
                    Please Select Publish Date
                  </h4>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* CLASS */}
        <div className="mt-1 p-0">
          <div class="row" style={{ padding: "0 10px", margin: "0" }}>
            <div class="col-md-12" style={{ padding: "0" }}>
              <div
                className=""
                style={{ width: "100%", marginTop: "0px" }}
              >
                <label
                  style={{
                    color: "#1F3977",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  Class
                </label>
                <br />
                <select className="form-select form-select-sm " aria-label=".form-select-sm example"
                  id="department"
                  onChange={(e) => updateClassId(e.target.value)}
                  style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid #c4c4c4" }}>


                  <option selected="selected" value={className}>Select Class</option>
                  <option value="1" >First Year</option>
                  <option value="2" >Second Year</option>
                  <option value="3" >Third Year</option>
                  <option value="4" >Fourth Year</option>
                  <option value="5" >Fifth Year</option>
                  <option value="6" >Sixth Year</option>
                </select>



                <div
                  class="PublishDate"
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
                    Please Select Publish Date
                  </h4>
                </div>
              </div>
            </div>


          </div>
        </div>

        <input
          type="button"
          className="create_btn"
          id="delete_single_student"
          value="Get Student List"
          onClick={() => fetchList()}
          style={{
            borderRadius: "5px",
            margin: "10px",
            backgroundColor: "#1F3977",
            fontSize: "13PX",
            textAlign: "center",
            padding: "8px 12px",
            width: "95%"
          }}
        />
        <div className="mt-2" style={{ width: "100%", margin: "0", paddingBottom: "10px", borderBottom: "1px solid  #edebeb" }} >

          <div className=" d-flex flex-row" style={{ borderRadius: "2px", height: "35px", background: "rgba(228, 233, 243, 0.6)", padding: "0px", border: "none", margin: "0px 10px" }}>
            <img src={require("../images/Search.png")} style={{ width: "21px", height: "21px", margin: "5px 0px 0px 3px", background: "transparent" }} />

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
          pagination
          subHeader
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          subHeaderComponent={subHeaderComponent}
          highlightOnHover

          defaultSortFieldId={1}
          customStyles={customStyles}
        />

        <div className="d-flex mt-1">
          <div style={{ color: "green", marginLeft: "10px", fontSize: "12px", display: "none" }} className="invitation">
            Student Invited Successfully
          </div>

          <div style={{ color: "red", marginLeft: "10px", fontSize: "12px", display: "none" }} className="invitee">
            Please select Invitee!
          </div>
          <input
            type="button"
            className=" form-buttons3 invite_button ml-auto"
            defaultValue="Sign Up"
            onClick={() => InviteStudent()}
            value="Invite"
            style={{ display: "none", fontWeight: "500", border: "none", color: "white", borderRadius: "6px", marginLeft: "auto", backgroundColor: "#1F3977", padding: "7px 20px", fontSize: "12PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginBottom: "20px", marginRight: "5px" }}
          />
        </div>


      </div>
    </div>
  );
}
