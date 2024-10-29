import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header";
import $ from "jquery";
import { Menu } from "../Menu";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { FiPlus } from "react-icons/fi";
import Geocode from "react-geocode";

export function CreateMapDetails() {
  const google = window.google;
  const [lat, updateLat] = useState("");
  const [long, updateLong] = useState("");
  const [address, updateAddress] = useState("");

  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [error_message, updateError_message] = useState("");
  async function createCampusAddress() {
    try {
      const mapTitle = document.getElementById("map_title");
      const mapLat = document.getElementById("map_lat");
      const mapLong = document.getElementById("map_long");

      if (mapTitle.value == "" && mapLat.value == "" && mapLong.value == "") {
        $(".ValueMsg").show();

        setTimeout(function() {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (mapTitle.value == "") {
        $(".maptitle").show();

        setTimeout(function() {
          $(".maptitle").hide();
        }, 3000);
      } else if (mapLat.value == "") {
        $(".maplat").show();

        setTimeout(function() {
          $(".maplat").hide();
        }, 3000);
      } else if (mapLong.value == "") {
        $(".maplong").show();

        setTimeout(function() {
          $(".maplong").hide();
        }, 3000);
      } else {
        const formDataCategory = new FormData();
        const lat = document.getElementById("latclicked").value;
        const long = document.getElementById("longclicked").value;

        formDataCategory.append("lat", lat);
        formDataCategory.append("long", long);
        formDataCategory.append("title", address);
        const response = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_add_campus_map",
          formDataCategory,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        console.log("Create address from map", response);
        updateError_message(response.data.message);
        if (response.data.error_code == 200) {
          $(".formSuccess").show();
          window.location.href = "/mapDetails";
        }
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function showMap() {
    $(".preview_polls").show();
  }
  function closeMap() {
    $(".preview_polls").hide();
  }

  var map;

  function initMap() {
    var latitude = 18.533; // YOUR LATITUDE VALUE
    var longitude = 73.8798; // YOUR LONGITUDE VALUE

    var myLatLng = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 14,
      disableDoubleClickZoom: true, // disable the default map zoom on double click
    });

    // Update lat/long value of div when anywhere in the map is clicked
    google.maps.event.addListener(map, "click", function(event) {
      document.getElementById("latclicked").value = event.latLng.lat();
      document.getElementById("longclicked").value = event.latLng.lng();
    });

    // Update lat/long value of div when you move the mouse over the map
    google.maps.event.addListener(map, "mousemove", function(event) {
      document.getElementById("latmoved").innerHTML = event.latLng.lat();
      document.getElementById("longmoved").innerHTML = event.latLng.lng();
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "Hello World",

      // setting latitude & longitude as title of the marker
      // title is shown when you hover over the marker
      title: latitude + ", " + longitude,
    });

    // Update lat/long value of div when the marker is clicked
    marker.addListener("click", function(event) {
      document.getElementById("latclicked").value = event.latLng.lat();
      document.getElementById("longclicked").value = event.latLng.lng();
    });

    // Create new marker on double click event on the map
    google.maps.event.addListener(map, "dblclick", function(event) {
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        title: event.latLng.lat() + ", " + event.latLng.lng(),
      });

      // Update lat/long value of div when the marker is clicked
      marker.addListener("click", function() {
        document.getElementById("latclicked").value = event.latLng.lat();
        document.getElementById("longclicked").value = event.latLng.lng();
      });
    });
  }

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Menu />
        <div className="content-wrapper" style={{ padding: "10px" }}>
          <div
            style={{
              padding: "8px",
              margin: "0",
              background: "#ffffff",
              margin: "5px 10px 10px 16px",
              alignItems: "center",
              justifyContent:"space-between"
            }}
            className="d-flex border_class"
          >
            <h1
              style={{
                color: "black",
                fontWeight: "600",
                fontSize: "15PX",
                marginLeft: "42PX",
              }}
            >
              CREATE CAMPUS MAP
            </h1>

            <button
              type="button"
              className="d-flex publish_button"
              defaultValue="Sign Up"
              onClick={() => showMap()}
              style={{
                height: "32px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "13px",
                padding: "0px",
                width: "114px",
                marginRight:"40px"
              }}
            >
              <FiPlus style={{ wight: "15px", height: "15px" }} />
              <p
                style={{
                  fontSize: "12PX",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                lat/long
              </p>
            </button>
          </div>

          <div
            id="myForm"
            className="border_class"
            style={{
              background: "white",
              margin: "5px 30px 0px 15px",
              padding: "10px 10px 10px 20px",
              width: "98%",
             
            }}
          >
            {/* custom maps */}
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
                  overflow: "auto",
                }}
              >
                <div
                  className="d-flex"
                  style={{
                    borderBottom: "2px solid #15a312",
                    marginTop: "28px",
                    transform: "rotate(0.13deg)",
                  }}
                >
                  <label style={{ fontSize: "11px", fontWeight: "600" }}>
                    Campus Map
                  </label>

                  <img
                    src="dist/img/Cancel.png"
                    alt="dropdown"
                    className="close_event ml-auto"
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    onClick={() => closeMap()}
                  />
                </div>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    padding: "10PX",
                  }}
                >
                  Click On The Area To Get Lat/Long
                </p>

                <div
                  style={{
                    margin: "10px 30px 0px 30px ",
                    fontFamily: "Poppins",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div id="map" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="formSuccess"
              style={{
                marginTop: "5px",
                marginLeft: "18px",
                width: "97%",
                marginRight: "198px",
                display: "none",
              }}
            >
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="success">
                  {error_message}
                </Alert>
              </Stack>
            </div>

            {/* <div className="" style={{marginTop:"10px",padding:" 0PX",fontSize:"12px",fontWeight:"500"}}>
                
                <div id="latclicked" style={{textAlign:"left"}} ></div>
      <div id="longclicked"  style={{textAlign:"left"}} ></div>
          
        

</div> */}
            {/* title */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Title
                      </label>

                      <p
                        style={{
                          color: "#EB2424",
                          fontWeight: "600",
                          marginLeft: "3PX",
                          fontSize: "10px",
                        }}
                      >
                        *
                      </p>
                    </div>
                    <input
                      type="text"
                      name="address"
                      id="map_title"
                      className="input_fields"
                      value={address}
                      onChange={(e) => updateAddress(e.target.value)}
                      placeholder="Your title goes here..."
                      autoComplete="true"
                      style={{
                        width: "80%",
                        height: "35px",
                        border: "1px solid #c4c4c4",
                        boxSizing: "border-box",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                        background: "white",
                      }}
                    />
                    <div
                      class="maptitle"
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
                        Please Write Title
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* lat */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
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
                          fontSize: "10px",
                        }}
                      >
                        *
                      </p>
                    </div>

                    <input
                      type="text"
                      name="lat"
                      id="map_lat"
                      className="input_fields"
                      // value={lat}
                      // onChange={(e) =>updateLat(e.target.value)}
                      placeholder="Your Latitude goes here..."
                      autoComplete="true"
                      disabled
                      style={{
                        width: "80%",
                        height: "35px",
                        border: "1px solid #c4c4c4",
                        boxSizing: "border-box",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                        background: "white",
                      }}
                    />
                    <div
                      class="maplat"
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
                        Please Add Latitude
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* long */}
            <div className="mt-2 p-0">
              <div class="row">
                <div class="col-md-12">
                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
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
                          fontSize: "10px",
                        }}
                      >
                        *
                      </p>

                      {/* <div id="longclicked"  style={{marginLeft:"5px",fontSize:"10px",fontWeight:"500"}} ></div> */}
                    </div>
                    <input
                      type="text"
                      name="long"
                      id="map_long"
                      className="input_fields"
                      // value={long}
                      // onChange={(e) =>updateLong(e.target.value)}
                      placeholder="Your Longitude goes here..."
                      disabled
                      autoComplete="true"
                      style={{
                        width: "80%",
                        height: "35px",
                        border: "1px solid #c4c4c4",
                        boxSizing: "border-box",
                        fontSize: "10px",
                        paddingLeft: "5PX",
                        background: "white",
                      }}
                    />
                    <div
                      class="maplong"
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
                        Please Add Longitute
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* buttons */}
            <div className="d-flex form-buttons mt-4">
              <div
                class="ValueMsg"
                style={{ margin: "8px", width: "57%", display: "none" }}
              >
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Error! You Must Fill In All The Fields
                  </Alert>
                </Stack>
              </div>

              <input
                type="button"
                className=" form-buttons3 ml-auto"
                defaultValue="Sign Up"
                onClick={() => createCampusAddress()}
                value="Publish"
                style={{
                  fontWeight: "500",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  marginLeft: "8px",
                  backgroundColor: "#000000",
                  padding: "10px 40px",
                  fontSize: "12PX",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  marginRight: "40PX",
                }}
              />
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
