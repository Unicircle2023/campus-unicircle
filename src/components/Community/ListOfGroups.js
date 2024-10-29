import React, { useState, useEffect, useMemo } from "react";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import Alert from "@mui/material/Alert";
import axios from "axios";
import $ from "jquery";
import { Recipient } from "./Recipient";
import { NewRecipient } from "./NewRecipient";
import { NewClassRecipient } from "./NewClassRecipient";
import { PersonaRecipient } from "./PersonaRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import Swal from "sweetalert2";
import { useHistory, Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
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
      background: "rgba(228, 233, 243, 0.6)",
      marginTop: "3PX",
      border: "none",
      fontSize: "9px",
      fontWeight: "500",
    },
  },
  headCells: {
    style: {
      color: "#1F3977",
      fontSize: "10px",
      fontWeight: "600",
    },
  },

  head: {
    style: {
      boxShadow: "0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2)",
    },
  },
};

export function ListOfGroups() {
  function viewDescription(
    groupId,
    groupName,
    groupCategory,
    groupDescription,
    groupIcon,
    groupStatus,
    sendTo
  ) {
    $(".preview_polls").show();
    updateGroupId(groupId);
    updateGroupName(groupName);
    updateGroupCategory(groupCategory);
    updateGroupDescription(groupDescription);

    updateGroupIcon(groupIcon);
    updateGroupStatus(groupStatus);
    updateSendTo(sendTo);
  }
  var friendObj = [];

  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const passData = (id, data) => {
    setChildId(id);

    setChildData(data);
    friendObj = [
      {
        friend_id: id,
      },
    ];
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);
  };

  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (newsId) => {
    setChildNewsData(newsId);
    edit_category(newsId);
  };

  const passDeleteData = (newsId) => {
    setChildNewsData(newsId);
    // delete_category(newsId);
  };
  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };
  const token = localStorage.getItem("Token");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [grpId, updateGrpId] = useState("");
  const [grpName, updateGrpName] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editGroupId, updateEditGroupId] = useState("");
  const [editGroupName, updateEditGroupName] = useState("");
  const [editGroupCategory, updateEditGroupCategory] = useState("");
  const [editGroupDescription, updateEditGroupDescription] = useState("");
  const [editGroupType, updateEditGroupType] = useState("");
  const [editGroupImage, updateEditGroupImage] = useState("");
  const [editUserType, updateEditUserType] = useState("");
  const [groupData, updateGroupData] = useState([]);
  const [editSendTo, updateEditSendTo] = useState("");
  const [editDeliveryType, updateEditDeliveryType] = useState("");
  const [studentId, updateStudentId] = useState("");
  const [personaId, updatePersonaId] = useState("");
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");
  const [addPersona, updatePersona] = useState([]);
  const [errorCodePersona, updateErrorCodePersona] = useState("");

  const [user_type, updateUserType] = useState("");
  const [groupName, updateGroupName] = useState("");
  const [groupCategory, updateGroupCategory] = useState("");
  const [groupDescription, updateGroupDescription] = useState("");
  const [groupIcon, updateGroupIcon] = useState("");
  const [groupStatus, updateGroupStatus] = useState("");
  const [sendTo, updateSendTo] = useState("");
  const [groupId, updateGroupId] = useState("");
  const [categoryName, updateCategoryName] = useState("");
  const [editNewsSendTo, updateEditNewsSendTo] = useState("");
  const [groupType, updateGroupType] = useState("");
  const [groupCategoryId, updateGroupCategoryId] = useState("");

  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();

    updateEditNewsSendTo(editSendTo);
  }

  function cancelEdit() {
    $(".preview_category").hide();
  }

  function closePreview() {
    $(".preview_polls").hide();
  }
  function closeEditPreview() {
    $(".preview_category").hide();
    $(".preview_polls").show();
  }
  function all_student() {
    $(".user_type").hide();
  }
  async function specific_class() {
    $(".user_type").show();
    try {
      const fetchClassResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_classes_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      updateUserType(fetchClassResponse.data.data);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  async function editGroupRow(GroupId) {
    $(".edit_container").show();
    const formData = new FormData();
    formData.append("group_id", GroupId);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_single_group",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (eventResponse.data.error_code == 200) {
      eventResponse.data.data.map((item) => {
        updateGroupId(item.group_id);
        updateGroupName(item.group_name);
        updateGroupCategory(item.category);
        updateGroupDescription(item.description);

        updateGroupIcon(item.group_icon);
        updateGroupType(item.type);
        updateSendTo(item.user_type);

        if (item.user_type == 2) {
          const name = item.group_member_details.map((item) => item.name);
          const student_id = item.group_member_details.map(
            (item) => item.member_id
          );
          const persona_name = item.group_member_details.map(
            (item) => item.persona
          );
          const persona_id = item.group_member_details.map(
            (item) => item.persona_id
          );

          setChildNewsData(name, persona_name);
          updateStudentId(student_id);
          updatePersonaId(persona_id);
        }
      });
    }

    // if (type == "Public") {
    //   updateEditDeliveryType(1)
    // } else if (type == "Private") {
    //   updateEditDeliveryType(2)
    // }
  }

  function close_button() {
    $(".preview_polls").hide();
  }

  async function editGroup() {
    const formData = new FormData();
    formData.append("group_id", groupId);
    formData.append("group_name", groupName);
    formData.append("category", groupCategory);
    formData.append("group_description", groupDescription);
    formData.append("image", groupIcon);
    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_group",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    if (eventResponse.data.error_code == 200) {
      $(".editWithPassModal").hide();
      handleEditButton();
    }
  }

  const handleEditButton = () => {
    fetchList();
    $(".edit_container").hide();
    toast.success("Group Edited Successfully!!");
  };

  const getImage = (e) => {
    updateEditGroupImage(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
    $(".image_std").hide();
  };

  const getImageEdit = (e) => {
    updateGroupIcon(e.target.files[0]);
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
    $(".image_std").hide();
  };

  async function fetchGroupCategoriesList() {
    const token = localStorage.getItem("Token");
    try {
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "get_group_categories",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      const GroupErrorCode = fetchResponse.data.error_code;
      const GroupErrorMsg = fetchResponse.data.message;
      if (GroupErrorCode == 200) {
        const groupListArray = fetchResponse.data.data;
        updateGroupData(groupListArray);
      } else {
        updateGroupData([]);
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    fetchGroupCategoriesList();
  }, []);

  async function fetchList() {
    try {
      setIsLoading(true);
      const fetchGroupResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_all_group",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      setIsLoading(false);

      const GroupErrorCode = fetchGroupResponse.data.error_code;

      const GroupErrorMsg = fetchGroupResponse.data.message;

      if (GroupErrorCode == 200) {
        const groupListArray = fetchGroupResponse.data.data;
        setData(groupListArray);
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

  {
    data.map((item, index) => {});
  }
  useEffect(() => {
    getUserDetails();
    fetchList();
  }, []);

  function deleteGroup(grpId, grpName) {
    updateGrpId(grpId);
    updateGrpName(grpName);
    $(".deleteGroupModal").show();
  }

  const handleButton = () => {
    fetchList();
    $(".edit_popup_password").hide();
    toast.success("Group Deleted Successfully!!");
  };

  async function createPersona() {
    const formData = new FormData();
    formData.append("persona", addPersona);
    const personaResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "add_persona",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    updateErrorMessagePersona(personaResponse.data.message);
    updateErrorCodePersona(personaResponse.data.error_code);
    $(".personaMsg").show();

    setTimeout(function() {
      $(".personaMsg").hide();
    }, 3000);
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

    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
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
      updateDeletePassword("")
      deleteGroupApi();
    }else{
      toast.error(deleteNewsResponse.data.message);
    }
  }

  async function deleteGroupApi() {
    try {
      const formData = new FormData();

      formData.append("group_id", grpId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_group",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();
        updateDeletePassword("");
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function close_delete_modal() {
    $(".delete_container").hide();
    $(".edit_campus_modal").hide();
  }

  function close_edit_modal() {
    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
  }

  function fetchGroup(getgroupid) {
    setTimeout(function() {
      history.push("/club", { getgroupid });
    }, 1000);
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
    $(".edit_campus_modal").hide();
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateDeletePassword("")
      editGroup();
    }else{toast.error(deleteNewsResponse.data.message)}
  }

  const openActionsModal = (e) => {
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };
  
  function update_edit_group() {
    $(".editWithPassModal").show();
  }

  function deletePopupFunc() {
    $(".deleteGroupWithPass").show();
    $(".deleteGroupModal").hide();
  }

  function closeDeleteNewsModal() {
    $(".deleteGroupModal").hide();
    $(".edit_campus_modal").hide();
    $(".deleteGroupWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("")
  }

  const columns = [
    {
      name: "Community Name",
      selector: "group_name",
      sortable: true,
      wrap: true,
      width: "30%",
      cell: (row) => {
        return (
          <div className="d-flex">
            <img
              src={row.group_icon}
              alt="view"
              style={{ height: "30px", width: "40px" }}
            />
            {/* <a href="#" onClick={() => fetchGroup(row.group_id)}> */}
            <div
              style={{
                marginLeft: "10px",
                fontWeight: "700",
                color: "black",
                marginTop: "9px",
              }}
            >
              {row.group_name}
            </div>
            {/* </a> */}
          </div>
        );
      },
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div>
            <div
              style={{ cursor: "pointer", fontWeight: "700" }}
              onClick={() =>
                viewDescription(
                  row.group_id,
                  row.group_name,
                  row.category,
                  row.description,
                  row.group_icon,
                  row.status,
                  row.group_member_count,
                  row.type
                )
              }
            >
              {row.status}
            </div>
          </div>
        );
      },
    },
    {
      name: "Active Members",
      selector: "group_member_count",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontWeight: "700", cursor: "pointer" }}>
              {row.group_member_count}
            </div>
          </div>
        );
      },
    },
    {
      name: "Community Type",
      selector: "category",
      sortable: true,
      wrap: true,
      width: "auto",
      width: "auto",
      cell: (row) => {
        return (
          <div style={{ fontWeight: "700", cursor: "pointer" }}>
            {row.category}
          </div>
        );
      },
    },

    {
      name: "",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <>
            <div className="action_buttons_end_css">
              <button
                className="all_action_buttons"
                onClick={() => openActionsModal(row.group_id)}
              >
                Actions
              </button>

              <div
                class={`edit_campus_modal actions_modal${row.group_id}`}
                id=""
                style={{
                  display: "none",
                  position: "absolute",
                  top: "22px",
                  right: "0px",
                }}
              >
                <div className="  ">
                  <div className=" d-flex ml-auto">
                    <img
                      className="campus_img ml-auto"
                      src="dist/img/Cancel.png"
                      onClick={closeActionsModal}
                    />
                  </div>
                </div>

                <div
                  className=" d-flex flex-row hover_class"
                  onClick={() => editGroupRow(row.group_id)}
                >
                  <div className=" d-flex flex-row">
                    <div>
                      <img className="campus_img" src="dist/img/Pencil.png" />
                    </div>
                    <div className="campus_inner_div">
                      <span>Edit</span>
                    </div>
                  </div>
                </div>

                <button
                  className=" d-flex flex-row hover_class"
                  onClick={() => deleteGroup(row.group_id, row.group_name)}
                  style={{ color: "#000" }}
                >
                  <div className=" d-flex flex-row">
                    <div>
                      <img
                        className="campus_img"
                        src={require("../images/delete.png")}
                      />
                    </div>
                    <div className="campus_inner_div">
                      <span>Delete</span>
                    </div>
                  </div>
                </button>
              </div>

              <div
                className="modal fade deleteGroupModal"
                id="deleteGroupModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete Message
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={closeDeleteNewsModal}
                      >
                        <span aria-hidden="true">
                          <img
                            src="dist/img/Cancel.png"
                            className="cancel_img"
                          />
                        </span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p className="pl-3 pb-2">
                        Your thoughtful reconsideration is encouraged, as this
                        information holds significance. Thank you for your
                        consideration.
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="delete_cancel_btn"
                        data-dismiss="modal"
                        onClick={closeDeleteNewsModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="delete_btn"
                        onClick={deletePopupFunc}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade deleteGroupWithPass"
                id="deleteGroupWithPass"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="delet_with_pass_main_contener">
                      <div className="modal-header delet_with_pass_header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                          Delete Event
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={closeDeleteNewsModal}
                        
                        >
                          <span aria-hidden="true">
                            <img
                              src="dist/img/Cancel.png"
                              className="cancel_img"
                              style={{background:"white"}}
                            />
                          </span>
                        </button>
                      </div>
                   

                    <div className="modal-body">
                      <div className="delet_with_pass_body_main_div">
                        <div className="d-flex">
                          <p style={{ color: "#2D5DD0" }}>Warning:</p>
                          <p style={{ marginLeft: "5px" }}>
                            You are deleting a screen. This operation cannot be
                          </p>
                        </div>

                        <p>
                          {" "}
                          undone. Please type the password of the screen Admin
                          into the box below to confirm you really want to do
                          this.
                        </p>

                        <div className="mt-4">
                          <div className="row">
                            <div className="col-md-4 d-flex p-0" style={{alignItems:"center"}}>
                            <p>
                            Admin Password:
                          </p>
                            </div>
                            <div className="col-md-8 p-0">
                            <input
                            type="password"
                            className="delet_with_pass_input"
                            value={deletePassword}
                            onChange={(e) =>
                              updateDeletePassword(e.target.value)
                            }
                          />
                            </div>
                          </div>
                          
                          
                        </div>
                        <div className="d-flex">
                          <div style={{ marginTop: "10PX" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer delet_with_pass_footer">
                    <input
                            type="button"
                            className="delet_with_pass_delete_button"
                            value="Delete"
                            onClick={() => deleteWithPassword()}
                          />
                     
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade editWithPassModal"
                id="editWithPassModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="delet_with_pass_main_contener">
                      <div className="modal-header delet_with_pass_header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                          Edit Poll
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={closeDeleteNewsModal}
                        
                        >
                          <span aria-hidden="true">
                            <img
                              src="dist/img/Cancel.png"
                              className="cancel_img"
                              style={{background:"white"}}
                            />
                          </span>
                        </button>
                      </div>
                   

                    <div className="modal-body">
                      <div className="delet_with_pass_body_main_div">
                        <div className="d-flex">
                          <p style={{ color: "#2D5DD0" }}>Warning:</p>
                          <p style={{ marginLeft: "5px" }}>
                            You are deleting a screen. This operation cannot be
                          </p>
                        </div>

                        <p>
                          {" "}
                          undone. Please type the password of the screen Admin
                          into the box below to confirm you really want to do
                          this.
                        </p>

                        <div className="mt-4">
                          <div className="row">
                            <div className="col-md-4 d-flex p-0" style={{alignItems:"center"}}>
                            <p>
                            Admin Password:
                          </p>
                            </div>
                            <div className="col-md-8 p-0">
                            <input
                            type="password"
                            className="delet_with_pass_input"
                            value={deletePassword}
                            onChange={(e) =>
                              updateDeletePassword(e.target.value)
                            }
                          />
                            </div>
                          </div>
                          
                          
                        </div>
                        <div className="d-flex">
                          <div style={{ marginTop: "10PX" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer delet_with_pass_footer">
                    <input
                            type="button"
                            className="delet_with_pass_delete_button"
                            value="Edit"
                            onClick={() => editWithPassword()}
                          />
                     
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // {
    //   name: "Action",

    //   wrap: true,
    //   width: "auto",
    //   cell: (row) => {
    //     return (
    //       <div className="d-flex">
    //         <a
    //           className="cta"
    //           href="#edit"
    //           onClick={() => editGroupRow(row.group_id)}
    //           style={{ backgroundColor: "transparent" }}
    //         >
    //           <img
    //             src={require("../images/Pencil.png")}
    //             alt="edit"
    //             style={{ width: "18px", height: "18px", marginLeft: "5px" }}
    //           />
    //         </a>

    //         <a
    //           className="cta"
    //           href="#deleterow"
    //           onClick={() => deleteGroup(row.group_id, row.group_name)}
    //           style={{ backgroundColor: "transparent" }}
    //         >
    //           <img
    //             style={{ width: "18px", height: "18px", marginLeft: "2px" }}
    //             src={require("../images/delete.png")}
    //           />
    //           &nbsp;
    //         </a>
    //       </div>
    //     );
    //   },
    // },
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
      // <FilterComponentPolls
      //   onFilter={e => setFilterText(e.target.value)}
      //   onClear={handleClear}
      //   filterText={filterText}

      // />
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);
  function showImagePreview() {
    $("#file-ip-1-preview").show();
  }

  function closeUserType() {
    $(".user_type").hide();
  }

  const handelSummenrnote = (e) => {
    updateGroupDescription(e.target.value);
  };

  const close_welcome_modal = () =>{
    $(".welcome_modal").hide();
  }

  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />

      <div style={{ width: "100%" }}>
        <div className="row border_class2 search_box_padding">
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
                placeholder="Search by group name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div
            className="col-md-9 d-flex flex-row"
            style={{ justifyContent: "end" }}
          >
            <div style={{ marginTop: "0px", padding: "0" }}>
              <Link to="/createGroup">
                <button
                  type="button"
                  className="d-flex create_button"
                  defaultValue="Sign Up"
                >
                  {/* <BiPlusMedical className="appointment-plus-sign" style={{ marginTop: "1px", fontSize: "12.25px", fontWeight: "400", fontFamily: "Poppins" }} /> */}
                  <div className="create_button_inner">Create Group</div>
                  <img
                    className="create_button_img"
                    src="dist/img/Progress.png"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="row mt-2" style={{ margin:"0",background: "white", padding: "10px", fontSize: "12PX", fontWeight: "600",width:"100%" }}>Upcoming Events</div> */}
      </div>

      <div className="welcome_modal">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="welcome_msg_main_div">
              <div className="d-flex" style={{justifyContent:"space-between"}}>
                <p className="welcome_msg_main_p">WELCOME TO GROUPS!</p>
                <img
                    src="dist/img/Welcom_msg_close.png"
                    onClick={() => close_welcome_modal()}
                    alt="dropdown"
                    className="close_event ml-auto cancel_img"
                />
              </div>
              <div>
                <p className="welcome_msg_inner_p"> 
                  Forge meaningful connections and foster community spirit
                  by creating student groups on Unicircle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="border_class">
          {filteredItems == ""?(<>
              <div className="no_data_main_div">
                <p>No data available  </p>
                <Link to="/createGroup">
                  Create group
                </Link>
              </div>
          </>):(
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
            // selectableRows
          />
          )}
        </div>
      )}
      {/* </div> */}

      {/* edit campus news */}
      <div id="edit" className="edit_container">
        <div className="edit_container_inner">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Group</label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>

          <div className="card-body" style={{ margin: "0px", padding: "0" }}>
            <div className="preview_form">
              <div className="edit_top_label">
                <p>Name & Community</p>
              </div>
              <div className="edit_border_class">
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <label className="all_labels">Group Name :</label>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <input
                      type="name"
                      // id="item_name"
                      className="input-field edit_inputs_class"
                      placeholder="Group name goes here..."
                      autoComplete="true"
                      value={groupName}
                      onChange={(e) => updateGroupName(e.target.value)}
                    />
                  </div>

                  <div class="col-md-4">
                    <div>
                      <label className="all_labels">Community :</label>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <select
                      className="edit_inputs_class"
                      id="news_category"
                      aria-label=".form-select-sm example"
                      //value={categoryId}
                      onChange={(e) => updateCategoryName(e.target.value)}
                    >
                      <option selected="selected" value={categoryName}>
                        {groupCategory}
                      </option>
                      {groupData.length > 0 ? (
                        groupData.map((news, index) => {
                          return (
                            <option value={news.cat_id} key={index}>
                              {news.category_name}
                            </option>
                          );
                        })
                      ) : (
                        <div>Data Not Found</div>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="edit_top_label">
                <p> Group Logo</p>
              </div>
              <div className="edit_border_class">
                <div class="row">
                  <div class="col-md-12">
                    <div style={{ padding: "5px" }}>
                      {groupIcon == "" ? (
                        <label for="file-ip-1">
                          <img
                            className="image_std"
                            src={require("../images/no_image.png")}
                            alt="dropdown"
                            style={{ height: "60px", width: "60px" }}
                          />
                          <img
                            id="file-ip-1-preview"
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "0PX",
                            }}
                          />
                        </label>
                      ) : (
                        <label for="file-ip-1">
                          <img
                            className="image_std"
                            onClick={() => showImagePreview()}
                            src={groupIcon}
                            alt="dropdown"
                            style={{ height: "60px", width: "60px" }}
                          />
                          <img
                            id="file-ip-1-preview"
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "0PX",
                              display: "none",
                            }}
                          />
                        </label>
                      )}
                      {/* <label for="file-ip-1" >
                      <img className="image_std" src={groupIcon} alt="dropdown" style={{ height: "60px",width:"60px" }} />
                      <img id="file-ip-1-preview" style={{ height: "60px",width:"60px", position: "absolute", top: "26px", left: "10px", borderRadius: "6PX" }} />
                    </label> */}

                      <input
                        type="file"
                        name="photo"
                        style={{ visibility: "hidden", display: "none" }}
                        // value={eventImage}
                        onChange={getImageEdit}
                        id="file-ip-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="edit_top_label">
                  <p> Group Description</p>
                </div>

                <div>
                  <textarea
                    id="publishdate"
                    className="edit_border_class edit_inputs_class"
                    value={groupDescription}
                    onChange={handelSummenrnote}
                    name="birthdaytime"
                    style={{ height: "200px" }}
                  />

                  {/* <SummerNote
                        _onChange={handelSummenrnote}
                        value={groupDescription}
                      /> */}
                </div>
              </div>

              {/* type */}
              {/* <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div className="d-flex">
                      <label className="all_labels">
                        Type
                      </label>

                      <p className="all_stars">
                        *
                      </p>
                    </div>

                    <div className="d-flex">
                      <input
                        type="radio"
                        id="public"
                        name="group_type"
                        value="1"
                        onChange={(e) => updateGroupType(e.target.value)}
                        checked={groupType == 1}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                          marginLeft: "5PX",
                        }}
                      />
                      <label
                        for="public"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "10PX",
                          fontWeight: "600",
                          marginTop: "0",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ marginLeft: "5PX", fontSize: "11px" }}>
                          Public
                        </p>
                      </label>

                      <input
                        type="radio"
                        id="private"
                        name="group_type"
                        value="2"
                        onChange={(e) => updateGroupType(e.target.value)}
                        checked={groupType == 2}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="private"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "10PX",
                          marginTop: "1PX",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ marginLeft: "5PX", fontSize: "11px" }}>
                          Private
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="mt-2 border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <label className="all_labels">
                      User Type
                    </label>

                    <div className="d-flex">
                      <input
                        type="radio"
                        id="all students"
                        name="user_Type"
                        value="1"
                        checked={sendTo == 1}
                        onChange={(e) => updateSendTo(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="all students"
                        onClick={() => all_student()}
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ marginLeft: "5px", fontSize: "11px" }}>
                          All Students
                        </p>
                      </label>
                      <input
                        type="radio"
                        id="specific class"
                        name="user_Type"
                        value="2"
                        checked={sendTo == 2}
                        onChange={(e) => updateSendTo(e.target.value)}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="specific class"
                        onClick={() => specific_class()}
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "10PX",
                          marginTop: "4PX",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ marginLeft: "8px", fontSize: "11px" }}>
                          Specific Recipients
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}

              <div
                className="d-flex mt-3 edit_buttons_div border_class2"
                style={{ marginBottom: "10px" }}
              >
               
                  <button
                    className="edit_cancel_button"
                    value="Cancel"
                    onClick={() => close_edit_modal()}
                  >Cancel</button>

                  <button
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edit_group()}
                  >Update</button>
              
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
              Edit Group
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
              Delete Group
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

      {/* <div id="deletemodal" className="modaloverlay delete_container">

        <div className="modalContainer">

          <div className="card-body" style={{ marginTop: "0px", }} >
            <div >


              <p style={{ fontWeight: "600", color: "black", fontSize: "13px" }}>Delete message</p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>Are You Sure You Want To Delete This Group?</h2>

              <div className="d-flex mt-3">

                <a onClick={close_delete_modal} href="#" style={{ marginLeft: "auto" }}>
                  <input
                    type="button"
                    className="create_btn"
                    value="Cancel"

                    style={{ borderRadius: "5px", backgroundColor: "transparent", color: "#d21f3c", fontSize: "13PX", padding: "8px 12px", fontWeight: "600" }}
                  />
                </a>


                <a className="cta" href="#delete_with_password" style={{ backgroundColor: "transparent" }}>
                  <input
                    type="button"
                    className="create_btn"
                    id="delete_single_student"
                    value="Delete"
                   
                    style={{ borderRadius: "5px", marginRight: "7px", backgroundColor: "#d21f3c", fontSize: "13PX", padding: "8px 12px" }}
                  />

                </a>
              </div>

            </div>
          </div>
        

        </div>

      </div> */}

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
                Are You Sure You Want To Delete This Group?
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
              Delete Group
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
          {/* </div> */}
          {/* </form> */}
        </div>
      </div>

      {/*  specific student pop up  */}
      <div
        className="user_type"
        style={{
          position: "fixed",
          top: "0",
          left: "0px",
          right: "0",
          bottom: "0",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          width: "100%",
          height: "100%",
          zIndex: "20",
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
            overflow: "auto",
          }}
        >
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
            }}
          >
            <label
              style={{
                color: "black",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              Recipients
            </label>

            <img
              src="dist/img/Cancel.png"
              alt="dropdown"
              onClick={() => closeUserType()}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              className="close_event ml-auto"
            />
          </div>

          <div
            id="exTab2"
            class="container"
            style={{ marginTop: "10PX", height: "100%" }}
          >
            <ul class="nav nav-tabs">
              <li class="active">
                <a href="#1" data-toggle="tab" style={{ padding: "10px 20px" }}>
                  Persona
                </a>
              </li>
              <li style={{ marginLeft: "10px" }}>
                <a href="#2" data-toggle="tab">
                  Class
                </a>
              </li>
              <li style={{ marginLeft: "10px" }}>
                <a href="#3" data-toggle="tab">
                  Individual
                </a>
              </li>
            </ul>

            <div class="tab-content " style={{ height: "100%" }}>
              <div class="tab-pane active" id="1" style={{ height: "100%" }}>
                {/*  persona  */}
                <div
                  id="exTab4"
                  class="container"
                  style={{ marginTop: "0PX", height: "100%" }}
                >
                  <ul class="nav nav_tabs">
                    <li class="active">
                      <a href="#4" data-toggle="tab">
                        Recipient
                      </a>
                    </li>
                    <li style={{ marginLeft: "5px" }}>
                      <a href="#5" data-toggle="tab">
                        Add Persona
                      </a>
                    </li>
                  </ul>

                  {/*  persona tab content  */}
                  <div
                    class="tab-content "
                    style={{ padding: "0px", height: "auto" }}
                  >
                    <div
                      class="tab-pane active"
                      id="4"
                      style={{ height: "100%" }}
                    >
                      {personaId != "" ? (
                        <PersonaRecipient
                          style={{ height: "100%" }}
                          personaId={personaId}
                          passPersonaData={passPersonaData}
                        />
                      ) : (
                        <NewPersonaRecipient
                          style={{ height: "100%" }}
                          passPersonaData={passPersonaData}
                        />
                      )}
                    </div>
                    <div class="tab-pane" id="5" style={{ paddingTop: "20px" }}>
                      <h3 style={{ fontWeight: "600" }}>ADD PERSONA</h3>
                      <input
                        type="text"
                        value={addPersona}
                        onChange={(e) => updatePersona(e.target.value)}
                        style={{
                          border: "1px solid #c4c4c4",
                          width: "96%",
                          height: "35px",
                          fontSize: "11PX",
                          margin: "0 10px",
                          background: "transparent",
                        }}
                      />
                      <div className="d-flex mt-4">
                        <input
                          type="button"
                          className=" form-buttons3"
                          defaultValue="Sign Up"
                          value="Cancel"
                          style={{
                            fontWeight: "500",
                            border: "none",
                            color: "#1F3977",
                            borderRadius: "6px",
                            marginLeft: "auto",
                            backgroundColor: "transparent",
                            padding: "10px 40px",
                            fontSize: "10PX",
                            fontWeight: "600",
                          }}
                        />

                        <input
                          type="button"
                          className=" form-buttons3"
                          defaultValue="Sign Up"
                          onClick={() => createPersona()}
                          value="Submit"
                          style={{
                            fontWeight: "500",
                            border: "none",
                            color: "white",
                            borderRadius: "6px",
                            marginLeft: "8px",
                            backgroundColor: "#1F3977",
                            padding: "10px 40px",
                            fontSize: "10PX",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            marginRight: "10px",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          marginTop: "10px",
                        }}
                      >
                        {errorCodePersona == 200 ? (
                          <div
                            class="personaMsg"
                            style={{ marginLeft: "8px", width: "96%" }}
                          >
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="success">
                                {errorMessagePersona}
                              </Alert>
                            </Stack>
                          </div>
                        ) : errorCodePersona == 406 ? (
                          <div
                            className="personaMsg"
                            style={{ marginLeft: "8px", width: "96%" }}
                          >
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="error">
                                Please Enter the Field
                              </Alert>
                            </Stack>
                          </div>
                        ) : errorCodePersona == 409 ? (
                          <div
                            className="personaMsg"
                            style={{ marginLeft: "8px", width: "96%" }}
                          >
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="filled" severity="error">
                                {errorMessagePersona}
                              </Alert>
                            </Stack>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  group tab content */}
              <div class="tab-pane" id="2">
                <NewClassRecipient
                  style={{ height: "100%" }}
                  passData={passData}
                />
              </div>

              <div class="tab-pane" id="3">
                {/*  individual content  */}

                <div
                  id="exTab3"
                  class="container"
                  style={{ marginTop: "0PX", height: "100%" }}
                >
                  <ul class="nav nav_tabs">
                    <li class="active">
                      <a href="#6" data-toggle="tab">
                        Recipient
                      </a>
                    </li>
                    <li style={{ marginLeft: "5px" }}>
                      <a href="#7" data-toggle="tab">
                        Upload Recipient
                      </a>
                    </li>
                  </ul>

                  <div
                    class="tab-content "
                    style={{ padding: "0px", height: "auto" }}
                  >
                    <div
                      class="tab-pane active"
                      id="6"
                      style={{ height: "100%" }}
                    >
                      {studentId != "" ? (
                        <Recipient
                          style={{ height: "100%" }}
                          studentId={studentId}
                          passData={passData}
                        />
                      ) : (
                        <NewRecipient
                          style={{ height: "100%" }}
                          passData={passData}
                        />
                      )}
                    </div>
                    <div class="tab-pane" id="7">
                      <h3 style={{ fontWeight: "600" }}>UPLOAD RECIPIENT</h3>

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
                                <label
                                  style={{
                                    color: "#1F3977",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Upload ExcelSheet
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
                                type="file"
                                id="excelSheet"
                                placeholder="Your Title goes here..."
                                autoComplete="true"
                                style={{
                                  boxSizing: "border-box",
                                  fontSize: "12px",
                                  paddingLeft: "5PX",
                                }}
                              />

                              <div className="d-flex mt-3">
                                <input
                                  type="button"
                                  className=" form-buttons3"
                                  defaultValue="Sign Up"
                                  value="Publish"
                                  style={{
                                    marginLeft: "auto",
                                    fontWeight: "500",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "6px",
                                    backgroundColor: "#1F3977",
                                    padding: "6px 20px",
                                    fontSize: "12PX",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ color: "green", marginLeft: "50px" }}>
                        {errorMessagePersona}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
