import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import axios from "axios";
import $ from "jquery";
import { IoCloseCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Previous_next_button } from "./Previous_next_button";
import SummerNote from "../SummerNote/SummerNote";
import toast,{Toaster} from "react-hot-toast";

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
      fontSize:"9px",
      fontWeight:"500"
    },
  },
  headCells: {
    style: {
      color: "#1F3977",
      fontSize:"10px",
      fontWeight:"600"
    },
  },

  head: {
    style: {
      // border: "0.5px solid #C4C4C4",
      boxShadow: "0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2)"
    },
  },
  table: {
    style: {
      padding: "0px 10px 0 10px",
     
     
    },
  },
};

export function Marketplace() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [marketPlaceId, updateMarketPlaceId] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [photo, updatePhotos] = useState("");
  const [price, updatePrice] = useState("");
  const [sku, updateSku] = useState("");
  const [skuValue, updateSkuValue] = useState("");
  const [info, updateInfo] = useState("");
  const [optionId, updateOptionId] = useState("");
  const [optionName, updateOptionName] = useState("");
  const [optionValue, updateOptionValue] = useState("");
  const [send_to, updateSend_to] = useState("");

  const [previewPollData, setPreviewPollData] = useState([])
  const [previewM_Info, setPreviewM_Info] = useState([])
  const [previewM_Imgs, setPreviewM_Imgs] = useState([])
  console.log("previewM_Imgs----------",previewM_Imgs);
  

  const [inputList, setInputList] = useState([{ title: "", value: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { title: "", value: "" }]);
  };

  const chnageOption = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,

    selectAllRowsItemText: "ALL",
  };

  const [childNewsData, setChildNewsData] = useState([]);
  const passEditData = (marketPlaceId) => {
    setChildNewsData(marketPlaceId);
    edit_category(marketPlaceId);
  };

  const passDeleteData = (marketPlaceId) => {
    setChildNewsData(marketPlaceId);
    delete_category(marketPlaceId);
  };

  function close_delete_modal() {
    $(".delete_popup_password").hide();
  }
  async function edit_category(marketPlaceId) {
    $(".edit_container").show();
    const formData = new FormData();

    formData.append("m_id", marketPlaceId);

    const singleMarketplaceResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_get_marketplace",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );

    if (singleMarketplaceResponse.data.error_code == 200) {
      const item = singleMarketplaceResponse.data.data;
      updateMarketPlaceId(item.marketplace_id);
      updateTitle(item.title);
      updateDescription(item.description);
      updateMarketplaceImage(item.image);

      updatePrice(item.price);
      updateSku(item.sku);
      updateSend_to(item.send_to);
    
      updateSkuValue(item.manage_sku);
      setInputList(item.m_info);
      {
        item.m_info.map((infoItem) => {
          updateOptionId(infoItem.info_id);
          updateOptionName(infoItem.title);
          updateOptionValue(infoItem.value);
        });
      }
    }
  }
  function deleteFile(e) {
    const s = imgDataMarketplace.filter((item, index) => index !== e);
    setImgDataMarketplace(s);
  }

  async function deleteImage(image_id, evt) {
    const r = marketplaceImage.filter((item, index) => index !== evt);
    updateMarketplaceImage(r);

    const formData = new FormData();

    formData.append("img_id", image_id);

    const singleMarketplaceResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_delete_marketplace_image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: token,
        },
      }
    );
  }

  // async function deleteImage(image_id,index,evt)
  // {
  //   const t = marketplaceImage.filter((item, index) => index !== evt);
  //   updateMarketplaceImage(t);

  //   console.log("get index of that image",index)
  //   const formData = new FormData();

  //   formData.append("img_id", image_id);

  //     const singleMarketplaceResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_delete_marketplace_image",
  //     formData,
  //     {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',

  //           "Authorization": token,
  //         }
  //       }
  //     );

  //     console.log("delet marketplace imgage", singleMarketplaceResponse.data.data);
  //     // if(singleMarketplaceResponse.data.error_code == 200)
  //     // {
  //     //   alert("Click on submit to delete the image")

  //     //   $("#remove").hide(index);

  //     // }
  // }
  function delete_category(m_id) {
    $(".preview_polls").hide();
    $(".delete_preview_polls").show();
    updateMarketPlaceId(m_id);
  }

  function deleteMarketPlace(id) {
    updateMarketPlaceId(id);
    $(".deleteProductModal").show();
  }

  const [imgData, setImgData] = useState([]);
  const [imgDataMarketplace, setImgDataMarketplace] = useState([]);
  const [marketplaceImage, updateMarketplaceImage] = useState([]);
  const [marketplaceImageId, updateMarketplaceImageId] = useState([]);

  var newImage = [];
  var imgDataNew = [];
  var getMutipleImages = [];
  marketplaceImage.map((item) => {
    imgDataNew.push(item.imgs);
  });
  getMutipleImages = imgDataNew.concat(imgData);
  const getMultipleImage = (e) => {
    updatePhotos(e.target.files);

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";

        const l = src.length;
        const fruit = src.slice(5, l);
        imgData.push(fruit);

        imgDataMarketplace.push(src);
      }
    }
  };

  obj = [
    {
      imgs: imgData,
    },
  ];


  function createNewElement() {
    var txtNewInputBox = document.createElement("div");
    txtNewInputBox.innerHTML =
      "<input type='text' id='newInputBox' style='fontFamily: Poppins;background: #FFFFFF; width: 100%; height: 28px; font-size: 12px !important; margin-left: 0px; border: 1px solid #c4c4c4; margin-top:5px'>";
    document.getElementById("newElementId").appendChild(txtNewInputBox);
  }

  async function fetchList() {
  
    try {
      const fetchMarketplaceResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_marketplace_list",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("fetchMarketplaceResponse-------------",fetchMarketplaceResponse);
      const MArketplaceErrorCode = fetchMarketplaceResponse.data.error_code;
      const MArketplaceErrorMsg = fetchMarketplaceResponse.data.message;
      const imagearray = fetchMarketplaceResponse.data.data;
      {
        imagearray.map((item) => {
         
          const imgs = item.image[0];

          // item.image.map((item) =>
          // {
          //   console.log("print image array=>",item.imgs)
          //   array.push(item.imgs)
          //   //setImage(item.imgs)

          // })
        });
      }

      if (MArketplaceErrorCode == 200) {
        const marketplaceListArray = fetchMarketplaceResponse.data.data;
        setData(marketplaceListArray);
      } else {
        setData([]);
        $(".alert-danger").show();
        setTimeout(function() {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function editNewsRow(m_id) {
    $(".edit_container").show();
    $(".edit_campus_modal").hide();
    try {
      const formData = new FormData();

      formData.append("m_id", m_id);

      const singleMarketplaceResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_marketplace",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );
     
      if (singleMarketplaceResponse.data.error_code == 200) {
        const item = singleMarketplaceResponse.data.data;
        updateMarketPlaceId(item.marketplace_id);
        updateTitle(item.title);
        updateDescription(item.description);

        updateMarketplaceImage(item.image);
        item.image.map((item) => {
          updateMarketplaceImageId(item.img_id);
        });
        
        updatePrice(item.price);
        updateSku(item.sku);
        updateSend_to(item.send_to);
        updateSkuValue(item.manage_sku);
        setInputList(item.m_info);
        {
          item.m_info.map((infoItem) => {
            updateOptionId(infoItem.info_id);
            updateOptionName(infoItem.title);
            updateOptionValue(infoItem.value);
          });
        }
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

    fetchResponse.data.data.map((fetchItem) => {
      updateEmailAddress(fetchItem.email);
      updateCampudId(fetchItem.campus_id);
    });
  }

  useEffect(() => {
    fetchList();
    getUserDetails();
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

    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      $(".deleteProductWithPass").hide();
      updateDeletePassword("")
      deleteMarketPlaceApi();
    }else{toast.error(deleteNewsResponse.data.message)}
  }

  async function deleteMarketPlaceApi() {
    try {
      $(".edit_campus_modal").hide();
      const formData = new FormData();

      formData.append("m_id", marketPlaceId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_marketplace",
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
        $(".deleteProductWithPass").hide();
        updateDeletePassword("")
        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const handleButton = () => {
    fetchList();
    $(".edit_container").hide();
    toast.success("Item Deleted Successfully!!");
  };

  async function editMarketplace() {
    $(".edit_container").show();
  }

  function close_edit_modal() {
    $(".edit_container").hide();
    $(".edit_campus_modal").hide();
  }

 

  const openActionsModal = (e) => {
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };

  function update_edited_product() {
    $(".editWithPassModal").show();
  }

  function deletePopupFunc() {
    $(".deleteProductWithPass").show();
    $(".deleteProductModal").hide();
  }

  function closeDeleteNewsModal() {
    $(".deleteProductModal").hide();
    $(".edit_campus_modal").hide();
    $(".deleteProductWithPass").hide();
    $(".editWithPassModal").hide();
    updateDeletePassword("")
  }

  async function viewDescription(m_id) {
   
  
    try {
      const formData = new FormData();
      formData.append("m_id",m_id)
      const _previewResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_marketplace",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("_previewResponse-------------",_previewResponse);
      

      if (_previewResponse.data.error_code == 200) {
        setPreviewPollData(_previewResponse.data.data);
        setPreviewM_Info(_previewResponse.data.data.m_info);
        setPreviewM_Imgs(_previewResponse.data.data.image)
         $(".preview_polls").show();
      } else {
          toast.error("Something went wrong..")
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  // function viewDescription(m_id) {
  //   $(".preview_polls").show();
  // }

  const columns = [
    {
      name: "Image",
      wrap: true,
      width: "auto",
      cell: (row) => {
        const array = [];
        row.image.map((itemimage) => {
          array.push(itemimage.imgs);
        });

        return (
          <div
            onClick={() => viewDescription(row.marketplace_id)}
            style={{
              backgroundColor: "transparent",
              color: "black",
              cursor: "pointer",
              margin: "3px",
            }}
          >
            {array == "" ? (
              <div>
                <img
                  src={require("../images/no_image.png")}
                  alt="Default"
                  style={{ width: "40px", height: "30px", padding: "5px" }}
                />
              </div>
            ) : (
              <div>
                <img
                  src={array[0]}
                  style={{ width: "40px", height: "30px", padding: "5px" }}
                />
              </div>
            )}
          </div>
        );
      },
    },
    {
      name: "Title",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div
            onClick={() => viewDescription(row.marketplace_id)}
            style={{
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "black",
            }}
          >
            {row.title}
          </div>
        );
      },
    },
    {
      name: "Price",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div
            onClick={() => viewDescription(row.marketplace_id)}
            style={{
              backgroundColor: "transparent",
              color: "black",
              cursor: "pointer",
            }}
          >
            {row.price}
          </div>
        );
      },
    },
    {
      name: "Option Name",
      sortable: true,

      width: "auto",
      // height:"auto",
      cell: (row) => {
        return (
          <div
            onClick={() => viewDescription(row.marketplace_id)}
            style={{
              backgroundColor: "transparent",
              color: "black",
              cursor: "pointer",
              margin: "5px 0px",
              whiteSpace: "normal",
            }}
          >
            {row.m_info.map((item) => {
              return <div>{item.title}</div>;
            })}
          </div>
        );
      },
    },
    {
      name: "Option Value",
      selector: "description",
      sortable: true,
      width: "auto",
      // height:"auto",
      cell: (row) => {
        return (
          <div
            onClick={() => viewDescription(row.marketplace_id)}
            style={{
              backgroundColor: "transparent",
              color: "black",
              cursor: "pointer",
              margin: "5px 0px",
              whiteSpace: "normal",
            }}
          >
            {row.m_info.map((item) => {
              return <div>{item.value}</div>;
            })}
          </div>
        );
      },
    },

    {
      name: "",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (

          <div className="action_buttons_end_css">
          <button className="all_action_buttons"
            onClick={() =>
              openActionsModal(row.marketplace_id)
            }
           
          >
            Actions
          </button>

          <div
            class={`edit_campus_modal actions_modal${row.marketplace_id}`}
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
              onClick={() => editNewsRow(row.marketplace_id)}>
              <div className=" d-flex flex-row">
                <div>
                  <img
                    className="campus_img"
                    src="dist/img/Pencil.png"
                  />
                </div>
                <div className="campus_inner_div">
                  <span>Edit</span>
                </div>
              </div>
            </div>

            <button
              className=" d-flex flex-row hover_class"
              onClick={() => deleteMarketPlace(row.marketplace_id)}
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
                className="modal fade deleteProductModal"
                id="deleteProductModal"
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
                className="modal fade deleteProductWithPass"
                id="deleteProductWithPass"
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
                          Delete Item
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
                          Edit Item
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

    return (
     
      <div></div>
    );
  }, [filterText, resetPaginationToggle]);

  function closePreviewDescription() {
    $(".preview_polls").hide();
  }

  async function editWithPassword() {
    $(".edit_container").hide();
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
    }else{toast.error(deleteNewsResponse.data.message)}
  }

  var obj = [
    {
      id: optionId,
      title: optionName,
      value: optionValue,
    },
  ];

  const [isEditLoading, setIsEditLoading] = useState(false);
  async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();
    for (let i = 0; i < getMutipleImages.length; i++) {
     
    }

    formData.append("m_id", marketPlaceId);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("send_to", send_to);
    formData.append("charge_tax", 1);
    formData.append("description", description);
    formData.append("sku", sku);
    formData.append("manage_sku", skuValue);
    formData.append("info", JSON.stringify(inputList));
    formData.append("users", "");
    for (let i = 0; i < photo.length; i++) {
      formData.append("image[]", photo[i]);
    }
    // formData.append("image", array);
    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_marketplace",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("Update Campus Event------", eventResponse);
    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".editWithPassModal").hide();
      updateDeletePassword("")
      handleEditButton();
    } else {
      $(".editWithPassModal").hide();
    }
  }
  const handleEditButton = () => {
    $(".edit_popup_password").hide();
    $(".edit_container").hide();
    fetchList();
    toast.success("Item Updated Successfully!!");
  };

  function cancel_delete_poll() {
    $(".delete_preview_polls").hide();
  }

  const handelSummenrnote = (e) => {
    updateDescription(e);
  };

  return (
    <div className="content-wrapper">
             <Toaster
           position="top-right"
          reverseOrder={false}
     />
      {/* edit marketplace */}
      <div id="edit_marketplace" className="edit_container">
        <div className="edit_container_inner">
          <div
            className="d-flex edit_top_container">
            <label className="main_labels">Edit Item</label>

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
                  <p>Title & Price</p>
            </div>
              <div className="edit_border_class">
                <div class="row">
                  <div class="col-md-2">
                      <div>
                        <label className="all_labels">
                          Title :
                        </label>
                      </div>
                  </div>
                  <div class="col-md-10">
                    <div>
                    <input
                        type="name"
                        id="validreason"
                        className="edit_inputs_class"
                        autoComplete="true"
                        onChange={(e) => updateTitle(e.target.value)}
                        value={title}
                        
                      />
                    </div>
                  </div>

                  <div class="col-md-2">
                      <div>
                        <label className="all_labels">
                           Price :
                        </label>
                    </div>
                  </div>
                  <div class="col-md-10">
                    <div>
                    <input
                        type="name"
                        id="validreason"
                        className="edit_inputs_class"
                        autoComplete="true"
                        onChange={(e) => updatePrice(e.target.value)}
                        value={price}
                        
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="edit_top_label">
                  <p>Media</p>
              </div>
              <div className="edit_border_class">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                     

                      <label
                        for="add_imagee"
                        style={{
                          background: "rgba(71, 121, 240, 0.3)",
                          borderRadius: "2px",
                          fontSize: "10PX",
                          padding: "10px",
                          color: "2D5DD0",
                          border: "none",
                          fontWeight: "500",
                        }}
                      >
                        Add Photos
                      </label>
                      
                      {imgData == "null" ? (
                        <div>
                          <img
                            className="d-flex"
                            id="file-ip-1-preview"
                            src={require("../images/no_image.png")}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </div>
                      ) : (
                        <div className="d-flex">
                          {marketplaceImage.map((item, index) => {
                            return (
                              <div id="remove">
                                <IoCloseCircleSharp
                                  onClick={(evt) =>
                                    deleteImage(item.img_id, index, evt)
                                  }
                                  style={{ cursor: "pointer" }}
                                />

                                <img
                                  src={item.imgs}
                                  alt="marketpace"
                                  style={{ width: "50px", height: "50px" }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* add new image */}

                      <div
                        className="d-flex"
                        id="file-ip-1-preview"
                        style={{ width: "100%",display:"none" }}
                      >
                        {imgDataMarketplace.map((item, index) => {
                          
                          return (
                            <div
                              style={{ width: "50px", height: "50px" }}
                              id="remove"
                            >
                              <IoCloseCircleSharp
                                onClick={() => deleteFile(index)}
                                style={{ cursor: "pointer" }}
                              />
                              <img
                                src={item}
                                alt="new"
                                style={{ height: "100%", width: "100%" }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <input
                        type="file"
                        name="photo"
                        onChange={getMultipleImage}
                        
                        id="add_imagee"
                        multiple="multiple"
                        accept="image/*"
                        style={{
                          visibility: "hidden",display:"none",
                          width: "2PX",
                          position: "absolute",
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
                            fontSize: "10PX",
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

            
              <div className="edit_top_label">
                  <p> Description</p>
             </div>

             <div style={{ width: "100%", paddingRight: "0" }}>
                        <textarea
                            id="publishdate"
                            className="edit_border_class edit_inputs_class"
                            value={description}
                            onChange={(e) => handelSummenrnote(e.target.value)}
                            name="birthdaytime"
                            style={{height:"140px"}}
                          />
                       
                       {/* <SummerNote
                        _onChange={handelSummenrnote}
                        value={description}
                      /> */}

                        <div
                          class="NewsCategory"
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
                            Please Select Category
                          </h4>
                        </div>
             </div>
              
              {/* user type */}
              {/* <div className="mt-2  border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <label className="all_labels">
                      User Type
                    </label>

                    <div className="d-flex">
                      <input
                        type="radio"
                        id="all students"
                        name="editUserType"
                        value="1"
                        checked={send_to == 1}
                        onChange={(e) => updateSend_to(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="all students"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                       
                      >
                        <p style={{ marginLeft: "5px" }}>All Students</p>
                      </label>
                      <input
                        type="radio"
                        id="specific class"
                        name="editUserType"
                        value="2"
                        checked={send_to == 2}
                        onChange={(e) => updateSend_to(e.target.value)}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="specific class"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4PX",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                       
                      >
                        <p style={{ marginLeft: "8px" }}>Specific Recipients</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}

          
              {/* <div className="mt-2 border_class2 edit_row_padding">
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
                          SKU
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                      <input
                        type="text"
                        id="app_end_time"
                        onChange={(e) => updateSku(e.target.value)}
                        value={sku}
                        className="input_fields all_edit_inputs"
                        name="birthdaytime"
                        
                      />
                    </div>
                  </div>
                </div>
              </div> */}

            
              {/* <div className="mt-2  border_class2 edit_row_padding">
                <div class="row">
                  <div class="col-md-12">
                    <div className="d-flex">
                      <input
                        type="radio"
                        id="track_quantity"
                        name="trackInfo"
                        value="1"
                        checked={skuValue == 1}
                        onChange={(e) => updateSkuValue(e.target.value)}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="track_quantity"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
              
                      >
                        <p style={{ marginLeft: "5px" }}>Track Quantity</p>
                      </label>
                      <input
                        type="radio"
                        id="continue_selling"
                        name="trackInfo"
                        value="2"
                        checked={skuValue == 2}
                        onChange={(e) => updateSkuValue(e.target.value)}
                        style={{
                          marginLeft: "78px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="continue_selling"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "10px",
                          marginLeft: "10PX",
                          marginTop: "4PX",
                          fontWeight: "600",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                       
                      >
                        <p style={{ marginLeft: "8px" }}>
                          Continue selling when out of stock
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}

             
              {/* {inputList == "" ? (
                <div>data not found</div>
              ) : (
                <div>
                  {inputList.map((item, i) => {
                    return (
                      <div className="mt-2 border_class2 edit_row_padding">
                        <div className="row">
                        <div className="col-md-12">
                        <div className="d-flex ">
                          <label className="all_labels">
                            Option Name
                          </label>
                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <select
                          className="form-select form-select-sm all_edit_inputs"
                          name="title"
                          id="marketplaceOptionName"
                          aria-label=".form-select-sm example"
                          value={item.title}
                          onChange={(e) => chnageOption(e, i)}
                          
                        >
                          <option
                            selected="selected"
                            style={{ padding: "6px" }}
                          >
                            {item.title}
                          </option>
                          <option style={{ padding: "6px" }}>Size</option>
                          <option style={{ padding: "6px" }}>Color</option>
                          <option style={{ padding: "6px" }}>Material</option>
                        </select>
                        
                        <div className="d-flex mt-2">
                          <label className="all_labels">
                            Option Value
                          </label>

                          <p className="all_stars">
                            *
                          </p>
                        </div>

                        <div className="d-flex">
                          <input
                            type="text"
                            name="value"
                            id="optionValue"
                            
                            value={item.value}
                            onChange={(e) => chnageOption(e, i)}
                            className="input_fields all_edit_inputs"
                            
                          />
                          
                        </div>
                        
                        </div>
                      </div>
                      </div>
                    );
                  })}
                </div>
              )} */}

              
              <div className="mt-2 p-0">
                <div class="row"></div>
              </div>

              <div className="d-flex mt-3 edit_buttons_div border_class2">
               
                  <button
                    className="edit_cancel_button"
                    value="Cancel"
                    onClick={() => close_edit_modal()}
                  >Cancel</button>
                
                  <button
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                    onClick={() => update_edited_product()}
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
   

      {/* edit popuop with password  */}
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
              Edit Item
            </p>
            <a
              //onClick={close_delete_modal}
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

      {/* delete marketplace */}
      <div
        id="delete"
        className="modaloverlay delete_container"
        style={{ zIndex: "100" }}
      >
        <div className="modalContainer">
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Delete Item
              </p>
              <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                Are You Sure, You Want To Delete This Item?
              </h2>

              <div className="d-flex mt-3">
                <a
                  //onClick={close_delete_modal}
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
          {/* </form> */}
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
              Delete Item
            </p>
            <a
              //onClick={close_delete_modal}
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
          className="col-md-4 d-flex flex-row " style={{alignItems:"center"}}>
          <h4 className="main_heading_h1">
            Market Place
          </h4>
        </div>

        <div className="col-md-3 d-flex flex-row">
            <div className="search_box_div">

          <img className="search_box_img"
            src={require("../images/Search.png")}
            
          />
          <Input className="search_box"
            id="search"
            type="text"
            placeholder="Search by item name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            autoComplete="off"
          />
        </div>
        </div>

        {/* <div className="col-md-1 d-flex flex-row">
          <img src="dist/img/Sorting.png" onClick={fetchList} style={{ height: "28px", width: "28px", marginTop: "3px" }} />

        </div> */}
        <div className="col-md-5 d-flex flex-row">
          <div style={{ marginTop: "0px", padding: "0", marginLeft: "auto" }}>
            <Link to="/sellItem">
              <button
                type="button"
                className="d-flex create_button"
                defaultValue="Sign Up"
                
              >
                <div className="create_button_inner">
                  Sell Item
                </div>
                <img className="create_button_img"
                    src="dist/img/Progress.png"
                    
                  />
              </button>
            </Link>
          </div>
        </div>
      </div>
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
          customStyles={customStyles}
        />
      </div>
      {/* end news table */}

      {/* **************************preview******************************** */}

      <div
        className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div
            className="d-flex edit_top_container">
            <label className="main_labels">
                  Marketplace
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closePreviewDescription()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
         
          <div>     
            {
              <div>
                 <div className="edit_top_label">
                  <p> Title, Price, User Type, SKU, Manage SKU, Option Name & Option Value </p>
                </div>

                <div>
                   <div className="edit_border_class" style={{maxHeight:"200px"}}>
                <div className="row">
                  <div className="col-md-4">
                    <span className="preview_font">Title</span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                      <p>{previewPollData.title}</p></span>
                  </div>
                  
                  <div className="col-md-4">
                    <span className="preview_font">
                    Price
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                      {previewPollData.price}
                      </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    User Type
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {previewPollData.send_to == 1 ? "All Students" : "Specific Recipient"}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    SKU
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {previewPollData.sku}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    Manage SKU,
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {previewPollData.manage_sku == 1
                        ? "Track Quantity"
                        : "Continue selling when out of stock"}
                    </span>
                  </div>
                  
                  <div className="col-md-4">
                    <span className="preview_font">
                    Option Name
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font" style={{gap:"10px"}}>
                    {previewM_Info.map((item) => {
                        return <><p>{item.title}</p></>;
                      })}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    Option Value
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font" style={{gap:"10px"}}>
                    {previewM_Info.map((item) => {
                        return <><p>{item.value}</p></>;
                      })}
                    </span>
                  </div>

                </div>
                </div>

                <div className="edit_top_label">
                  <p>Product Image</p>
                </div>

                <div className="edit_border_class">
            <div className="p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      {previewM_Imgs == null ? (
                       <img  src={require("../images/no_image.png")}
                               className="preview_form_imgs"           
                       />
                      ) : (<>
                        {previewM_Imgs.map((item) => {
                          return (
                            <div style={{margin:"2px"}}>
                              <img className="image_std preview_form_imgs" 
                            
                                 src={item.imgs} />
                            </div>
                          );
                        })}
                         </>
                      )}
                     
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="edit_top_label">
                  <p> Product Description </p>
                </div>
                  
                      <div>
                        <div className="edit_border_class nine_font_class"
                            style={{height:"210px"}}
                          >
                          <p dangerouslySetInnerHTML={{ __html: previewPollData.description }}/>
                      </div>
                      </div>
                </div>

              </div>
            }
          </div>
        </div>
      </div>
      

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
              onClick={() => cancel_delete_poll()}
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
              Are You Sure That You Want To Delete This Item?
            </h2>

            <div className="d-flex mt-3">
              <input
                type="button"
                className="create_btn"
                value="Cancel"
                onClick={() => cancel_delete_poll()}
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
                href="#preview_delete_with_password"
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
     
      <div
        id="preview_delete_with_password"
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
              Delete Item
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
    </div>
  );
}
