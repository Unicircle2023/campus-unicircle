import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import $ from "jquery";
import axios from "axios";
import { useLocation,useHistory } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

export function MarketPlaceStep2() {
  const token = localStorage.getItem("Token");
  const history = useHistory();
  const location = useLocation();
  const { title } = location.state || { id: "none" };
  const { description } = location.state || { id: "none" };
  const { imgData } = location.state || { id: "none" };
  const { price } = location.state || { id: "none" };
  const { send_to } = location.state || { id: "none" };
  const { childId } = location.state || { id: "none" };
  const { photos } = location.state || { id: "none" };

  const [inputList, setInputList] = useState([{ title: "", value: "" }]);


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (i, e) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { title: "", value: "" }]);
  };

  function resetValues() {
    updateSku("");
    updateManageSku("");
    updateOptionName("");
    updateOptionValue("");
    var ele = document.getElementById("manage_sku");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  }
  const [sku, updateSku] = useState("");
  const [manageSku, updateManageSku] = useState("");
  const [optionName, updateOptionName] = useState("");
  const [optionValue, updateOptionValue] = useState("");
  const [error_message, updateError_message] = useState("");

  

  function closePreview() {
    $(".preview_polls").hide();
  }
  const obj = [
    {
      title: optionName,
      value: optionValue,
    },
  ];

  $("#myFunction").click(function() {
    alert("The paragraph was clicked.");
  });

  var letter =
    " <div class='next-referral'><label style=' color: #1F3977; font-size: 10px; fontWeight: 600; '>Option Name</label><br />   <select style='width: 100%;height: 35px;,padding: 5px;font-size:10px;color: black;border: 1px solid #c4c4c4;border-radius: 0px,padding: 6px;'><option  style=' padding: 6px; '>Select Option Name</option><option style=' padding: 6px; '>Size</option><option style=' padding: 6px; '>Color</option><option style=' padding: 6px; ' >Material</option></select><br /> <label style=' color:#1F3977; font-size: 10px; fontWeight: 600; '>Option Value</label><br /><input type='text' id='newInputBox' style='fontFamily: Poppins;background: #FFFFFF; width: 100%; height: 35px; font-size: 12px !important; margin-left: 0px; border: 1px solid #c4c4c4; margin-top:5px'></input></div><br /><input type='button' class='inputRemove' value='Remove' id='myFunction'/></div>";
  function createNewElement() {
    var txtNewInputBox = document.createElement("div");
    txtNewInputBox.innerHTML = letter;
    document.getElementById("newElementId").appendChild(txtNewInputBox);
    console.log("letter", letter);
    $(".delete_button").show();
  }
  function myFunction() {
    alert("ongoin");
  }
  function removeTextBox() {
    $(".next-referral")
      .last()
      .remove();
    // var txtNewInputBox = document.remove("div");
    // txtNewInputBox.innerHTML = letter;
    // document.getElementById("newElementId").removeChild(txtNewInputBox);
    // console.log("letter",letter)
  }
  async function submitMarketplace() {
    try {
        const m_sku = document.getElementById("sku_unit");

        const m_option_name = document.getElementById("marketplaceOptionName");
        const m_option_value = document.getElementById("optionValue");

      if (sku == "") {
          $(".skuUnit").show();

          setTimeout(function () {
            $(".skuUnit").hide();
          }, 3000);
        }
        else if (manageSku == "") {
          $(".manage_sku").show();

          setTimeout(function () {
            $(".manage_sku").hide();
          }, 3000);

        }
        else{
      const formData = new FormData();

      formData.append("title", title);
      formData.append("send_to", send_to);
      formData.append("sku", sku);
      formData.append("price", price);
      formData.append("description", description);
      for (let i = 0; i < photos.length; i++) {
        formData.append("image[]", photos[i]);
      }

      formData.append("charge_tax", 1);
      formData.append("manage_sku", manageSku);
      formData.append("users", childId);
      formData.append("info", JSON.stringify(inputList));
      const secondResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_add_marketplace",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
     

      console.log("Marketplace add response", secondResponse.data.data);
      updateError_message(secondResponse.data.message);
      toast.success(secondResponse.data.message);
     
      setTimeout(function() {    
        history.push("/marketplaceDetails")   
      }, 3000);

     
      }
    } catch (err) {
      console.log("Log in Fail", err);
      //   setIsLoading(false)
    }
  }

  function preview() {
    $(".preview_polls").show();
  }
  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
  }
  return (
    <div>
     <Toaster
           position="top-right"
          reverseOrder={false}
     />
      <Header />
      <div className="d-flex">
        <Menu />
        <div className="content-wrapper">
          <div className="border_class2 box_padding">
            <h1 className="main_heading_h1">ADD PRODUCT</h1>
          </div>

          <div class="formSuccess success_msg">
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="success">
                {error_message}
              </Alert>
            </Stack>
          </div>

          <div
            style={{
              width: "100%",
            }}
          >
            {/* inventory */}
            <div className="border_class2 box_padding">
              <div class="row">
                <div class="col-md-5">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label className="all_labels">Inventory</label>

                      <p className="all_stars">*</p>
                    </div>
                    <label
                      style={{
                        color: "#1F3977",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      SKU(Stock Keeping Unit)
                    </label>
                    <input
                      type="number"
                      id="sku_unit"
                      className="all_inputs"
                      value={sku}
                      onChange={(e) => updateSku(e.target.value)}
                      autoComplete="off"
                    />
                    <div class="skuUnit" style={{ display: "none" }}>
                      <h4 className="all_validations_h4">
                        Please Specify SKU unit
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* track quantity */}
            <div className="border_class2 box_padding">
              <div class="row ">
                <div class="col-md-12">
                  <div
                    className=""
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <div
                      id="manageSku"
                      className="d-flex"
                      value={manageSku}
                      onChange={(e) => updateManageSku(e.target.value)}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value="1"
                        id="manage_sku"
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="manage_sku"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "0PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            marginLeft: "5px",
                            fontSize: "10PX",
                            fontWeight: "600",
                          }}
                        >
                          Track Quantity
                        </p>
                      </label>

                      <input
                        type="radio"
                        name="userType"
                        value="2"
                        id="specific class"
                        style={{
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
                          fontSize: "12px",
                          marginLeft: "10PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            marginLeft: "5px",
                            fontSize: "10PX",
                            fontWeight: "600",
                          }}
                        >
                          Continue selling when out of stock
                        </p>
                      </label>
                    </div>

                    <div
                      class="manage_sku"
                      style={{ marginTop: "0px", display: "none" }}
                    >
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Select 1 of the option
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*OPTIONS  */}
            <div className="border_class2 box_padding">
              <div class="row ">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%" }}>
                    <div className="d-flex">
                      <label className="all_labels">Options</label>

                      <p className="all_stars">*</p>
                    </div>

                    <div
                      className="d-flex"
                      value={manageSku}
                      onChange={(e) => updateManageSku(e.target.value)}
                    >
                      <input
                        type="radio"
                        name="manage_sku"
                        value=""
                        id="now"
                        checked="checked"
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                        }}
                      />
                      <label
                        for="now"
                        className="d-flex"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "0PX",
                          marginTop: "4px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            marginLeft: "5px",
                            fontSize: "10PX",
                            fontWeight: "600",
                          }}
                        >
                          This Product has Options, like size or color
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form class="form-horizontal">
              <fieldset className="border_class2 box_padding">
                {/* <!-- Text input--> */}
                <div id="items" class="form-group m-0 p-0">
                  {inputList.map((x, i) => {
                    return (
                      <div className="col-md-5">
                        <div className="box" style={{ width: "100%" }}>
                          <div className="d-flex">
                            <label className="all_labels">Option Name</label>
                            <p className="all_stars">*</p>
                          </div>
                          <select
                            className="all_inputs"
                            name="title"
                            id="marketplaceOptionName"
                            aria-label=".form-select-sm example"
                            value={x.title}
                            onChange={(e) => handleInputChange(e, i)}
                            style={{
                              width: "35%",
                            }}
                          >
                            <option
                              selected="selected"
                              style={{ padding: "6px" }}
                            >
                              Select Option Name
                            </option>
                            <option style={{ padding: "6px" }}>Size</option>
                            <option style={{ padding: "6px" }}>Color</option>
                            <option style={{ padding: "6px" }}>Material</option>
                          </select>

                          {/* option value */}
                          <div className="d-flex mt-2">
                            <label className="all_labels">Option Value</label>

                            <p className="all_stars">*</p>
                          </div>

                          <div className="d-flex">
                            <input
                              type="text"
                              name="value"
                              id="optionValue"
                              // onChange={(e) => updateOptionValue(e.target.value)}
                              // value={optionValue}
                              value={x.value}
                              onChange={(e) => handleInputChange(e, i)}
                              className="input_fields ml10 all_inputs"
                              style={{
                                width: "35%",
                              }}
                            />
                            <div className="btn-box d-flex">
                              {inputList.length !== 1 && (
                                <button
                                  class=""
                                  onClick={(e) => handleRemoveClick(i, e)}
                                  style={{
                                    background: "transparent",
                                    marginTop: "0",
                                    padding: "0",
                                    border: "none",
                                  }}
                                >
                                  <span
                                    className="d-flex"
                                    style={{ marginLeft: "5px" }}
                                  >
                                    <img
                                      src={require("../images/Cancel.png")}
                                      alt="dropdown"
                                      style={{
                                        width: "18px",
                                        height: "18px",
                                        marginLeft: "auto",
                                      }}
                                    />
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="row btn-box d-flex mt-1">
                            {inputList.length - 1 === i && (
                              <button
                                className="col-md-6"
                                id="add"
                                type="button"
                                onClick={() => handleAddClick()}
                                style={{
                                  background: "transparent",
                                  marginTop: "0",
                                  padding: "0",
                                  border: "none",
                                }}
                              >
                                <span
                                  className="d-flex"
                                  style={{ marginLeft: "0px" }}
                                >
                                  <img
                                    src="dist/img/add.png"
                                    alt="dropdown"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                  <p
                                    className="add"
                                    style={{
                                      color: "#1f3977",
                                      fontWeight: "600",
                                      fontSize: "10PX",
                                    }}
                                  >
                                    Add another option
                                  </p>
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </form>

            <div className="d-flex border_class2 box_padding buttons_div">
              <img className="delete_img"
                src="dist/img/delete.png"
                onClick={() => resetValues()}
                alt="dropdown"
               
              />
              <p
                className="news_bar">
                |
              </p>
              <button className="preview_button" onClick={() => preview()}>
              <p className="preview_font">
                  Preview
                </p>
                <div className="preview_img_div">
                <img className="preview_img"
                  src="dist/img/view.png"
                  alt="dropdown"
                  
                  
                />
                </div>
              </button>

              <input
                type="button"
                className=" publish_button"
                onClick={() => submitMarketplace()}
                value="Publish"
              />
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW */}

      <div
        className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div
            className="d-flex edit_top_container">
            <label className="main_labels">
              Preview
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => closePreview()}
              alt="dropdown"
              className="close_event ml-auto cancel_img"
            />
          </div>
         
          <div>     
            {/* <div className="d-flex">
              <h4
                style={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "12PX",
                  fontWeight: "600",
                }}
              >
                Martketplace
              </h4>
              <img
                src="dist/img/Pencil.png"
                alt="dropdown"
                width="18px"
                height="18px"
                className=" ml-auto"
                onClick={() => edit_category()}
              />
            </div> */}

            {
              <div>
                 <div className="edit_top_label">
                  <p> Title, Price, User Type, SKU, Manage SKU, Option Name & Option Value </p>
                </div>

                <div>
                   <div className="edit_border_class">
                <div className="row">
                  <div className="col-md-4">
                    <span className="preview_font">
                    Title
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{title}</span>
                  </div>
                  
                  <div className="col-md-4">
                    <span className="preview_font">
                    Price
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">{price}</span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    User Type
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {send_to == 1 ? "All Students" : "Specific Recipient"}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    SKU
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {sku}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    Manage SKU,
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {manageSku == 1
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
                    : <span className="preview_font">
                    {inputList.map((item) => {
                        return <>{item.title}</>;
                      })}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <span className="preview_font">
                    Option Value
                    </span>
                  </div>
                  <div className="col-md-8">
                    : <span className="preview_font">
                    {inputList.map((item) => {
                        return <>{item.value}</>;
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
                      {imgData == null ? (
                       <img  src={require("../images/no_image.png")}
                               className="preview_form_imgs"           
                       />
                      ) : (<>
                        {imgData.map((item) => {
                          return (
                            <div style={{margin:"2px"}}>
                              <img className="image_std preview_form_imgs" 
                            
                                 src={item} />
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
                          <p dangerouslySetInnerHTML={{ __html: description }}/>
                      </div>
                      </div>
                </div>

              </div>
            }
          </div>
          {/* )
          } */}
        </div>
      </div>
    </div>
  );
}
