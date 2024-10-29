import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./Header";
import { Menu } from "./Menu";
import $ from "jquery";
import { Footer } from "./Footer";
import { ChangePassword } from "./ChangePassword";
import { Xyz } from "./Xyz";
import "../Components/AdminLogin.css";

export function AdminProfile() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [email, updateEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  async function fetchList() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_KEY + "profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response", response);
      const listArry = response.data.data;
      console.log(listArry);
      updateFirstName(listArry.first_name);
      updateLastName(listArry.last_name);
      updateEmail(listArry.email);
      setData(listArry);
    } catch (err) {
      console.log("Error Occurred", err);
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  function saveInfo() {
    console.log("f_name", firstName);
    console.log("lastName", lastName);
    console.log("email", email);
    const response = axios.post(
      process.env.REACT_APP_API_KEY + "edit-profile",
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },

      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User response", response);

    fetchList();
    setTimeout(function () {
      document.location.reload();
    }, 2000);
    $(".myAlert-bottom").show();
    setTimeout(function () {
      $(".myAlert-bottom").hide();
    }, 4000);
  }

  function Profile() {
    return (
      <div className="user-profile mt-3 p-2">
        <div className="d-flex mt-5">
          <div className="mx-auto">
            <div className="d-flex">
              <h3 className="text-center">Basic Information</h3>
              <div className="text-center mx-auto"></div>
            </div>

            <form class="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-lg-5 control-label">First name:</label>
                <div className="col-lg-12">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={firstName}
                    onChange={(e) => updateFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-5 control-label">Last name:</label>
                <div className="col-lg-12">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={lastName}
                    onChange={(e) => updateLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-5 control-label">Email:</label>
                <div className="col-lg-12">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={email}
                    onChange={(e) => updateEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-3 control-label">Password:</label>
                <div className="col-lg-8">
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#changePassword"
                    onClick={togglePopup}
                  >
                    <u>Click to change password</u>
                  </a>
                  {isOpen && (
                    <ChangePassword
                      handleClose={togglePopup}
                      fetchList={fetchList}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="myAlert-bottom alert alert-success">
          <li class="close list" data-dismiss="alert" aria-label="close">
            &times;
          </li>
          <h6 class="login-text text-center">
            Admin Profile had been Updated successfully
          </h6>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary text-center"
            onClick={() => saveInfo()}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <Menu />
      {Profile()}
      {/* <Xyz /> */}
      <ChangePassword />
      <Footer />
    </div>
  );
}
