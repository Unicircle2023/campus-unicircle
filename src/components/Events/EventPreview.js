import React, { useState, useEffect } from "react";
import { Menu } from "../Menu";
import { Header } from "../Header";
import axios from "axios";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

export const EventPreview = () => {
  const location = useLocation();
  const token = localStorage.getItem("Token");
  const { e_id } = location.state || { id: "none" };
  const [eventData, setEventData] = useState([]);

  async function getEventData(eId) {
    try {
      const formData = new FormData();
      formData.append("event_id", eId);

      const eventResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_get_event_data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const ErrorCode = eventResponse.data.error_code;
      if (ErrorCode == 200) {
        const e_data = eventResponse.data.data;

        setEventData(e_data);
      } else {
      }
    } catch (err) {
      console.log("get event data error-----------", err);
    }
  }

  useEffect(() => {
    getEventData(e_id);
  }, []);

  return (
    <>
      <div>
        <Header />

        <div className="d-flex">
          <Menu />

          <div className="content-wrapper">
            {eventData.map((e_data) => {
              var date1 = e_data.start_date;
              var s_time = e_data.start_time;
              var e_time = e_data.end_time;
              var combinedDateTime = `${date1} ${s_time}`;
              var dateObject = moment(combinedDateTime, "YYYY-MM-DD HH:mm:ss");
              var s_date = dateObject.format("D MMM").toUpperCase();
              const hours = dateObject.hours();
              const minutes = dateObject.minutes();
              const formattedTime = `${hours}:${
                minutes < 10 ? `0${minutes}` : minutes
              }`;

              var e_combinedDateTime = `${date1} ${e_time}`;
              var e_dateObject = moment(
                e_combinedDateTime,
                "YYYY-MM-DD HH:mm:ss"
              );
              var s_date = e_dateObject.format("D MMM").toUpperCase();
              const e_hours = e_dateObject.hours();
              const e_minutes = e_dateObject.minutes();
              const e_formattedTime = `${e_hours}:${
                e_minutes < 10 ? `0${e_minutes}` : e_minutes
              }`;

              return (
                <>
                  <div className="border_class2 box_padding">
                    <div
                      className="main_heading_h1"
                      style={{ padding: "2px 30px" }}
                    >
                      {e_data.title}
                    </div>
                  </div>

                  <div className="card_div mt-2" style={{ width: "100%" }}>
                    <div className="card-header bg-white p-0">
                      <div className="card_inner_div">
                        <div className="row">
                          <div className="col-md-12 d-flex">
                            <div className="d-flex">
                              {e_data.event_img.map((e) => {
                                return (
                                  <div style={{ margin: "2px" }}>
                                    <img
                                      className="img_hover_class"
                                      src={e.event_img}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div style={{ marginTop: "30px" }}>
                            <div class="col-md-12 p-0">
                              <div
                                className="ten_font_class"
                                style={{
                                  color: "#1F3977",
                                  gap: "5px",
                                  display: "flex",
                                }}
                              >
                                <span>{s_date}</span>
                                <span>AT</span>
                                <span>{formattedTime}</span>
                                <span> - </span>
                                <span>{s_date}</span>
                                <span>AT</span>
                                <span>{e_formattedTime}</span>
                              </div>

                              <div className="mt-2 twelve_font_class">
                                <p>{e_data.title}</p>
                              </div>

                              <div className="d-flex mt-2">
                                <div
                                  className="ten_font_class"
                                  style={{
                                    color: "#1F3977",
                                  }}
                                >
                                  <p>Venue :</p>
                                </div>
                                <div
                                  className="ten_font_class"
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                >
                                  {e_data.location}
                                </div>
                              </div>

                              <div className="d-flex ten_font_class">
                                <div
                                  style={{
                                    color: "#1F3977",
                                  }}
                                >
                                  <p>Entry Fee :</p>
                                </div>
                                <div
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                >
                                  {e_data.entry_fee}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <hr className="card_inner_hr_css" />
                        </div>

                        <div className="row">
                          <div className="">
                            <div className="">
                              <label className="all_labels ten_font_class">
                                About Event
                              </label>
                            </div>
                            <div className="">
                              <p>
                                {
                                  <p
                                    className="desc_class"
                                    dangerouslySetInnerHTML={{
                                      __html: e_data.description,
                                    }}
                                  />
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <hr className="card_inner_hr_css" />
                        </div>

                        <div className="row">
                          <div>
                            <p
                              className="ten_font_class"
                              style={{ color: "#4AA081" }}
                            >
                              Engagement Analytics
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-5 mt-2">
                            <section>
                              <div className="table-cards">
                                <div className="table-cards">
                                  <div className="row">
                                    <div
                                      className="col-md-12 p-0"
                                      style={{ height: "100%" }}
                                    >
                                      <div
                                        className="small-box"
                                        style={{
                                          height: "70px",
                                          padding: "5px",
                                          borderRadius: "2.5PX",
                                          display: "flex",
                                        }}
                                      >
                                        <div
                                          className="inner"
                                          // onClick={UniDetails}
                                          style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div>
                                            <div>
                                              <h5
                                                className="eleven_font_class"
                                                style={{
                                                  color: "#1F3977",
                                                }}
                                              >
                                                Link Opened
                                              </h5>
                                            </div>

                                            <div
                                              className="d-flex twenty_font_class"
                                              style={{
                                                flexWrap: "wrap",
                                                marginTop: "5px",
                                              }}
                                            >
                                              <div>
                                                {e_data.total_links_open}
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className="all_icon_imgs_div"
                                            style={{ background: "#FBE1FF" }}
                                          >
                                            <img
                                              className="all_icon_imgs"
                                              src="dist/img/ComboChart.png"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>

                          <div className="col-md-5 mt-2">
                            <section>
                              <div className="table-cards">
                                <div className="table-cards">
                                  <div className="row">
                                    <div
                                      className="col-md-12 p-0"
                                      style={{ height: "100%" }}
                                    >
                                      <div
                                        className="small-box"
                                        style={{
                                          height: "70px",
                                          padding: "5px",
                                          borderRadius: "2.5PX",
                                          display: "flex",
                                        }}
                                      >
                                        <div
                                          className="inner"
                                          // onClick={UniDetails}
                                          style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div>
                                            <div>
                                              <h5
                                                className="eleven_font_class"
                                                style={{
                                                  color: "#1F3977",
                                                }}
                                              >
                                                Interested
                                              </h5>
                                            </div>

                                            <div
                                              className="d-flex twenty_font_class"
                                              style={{
                                                flexWrap: "wrap",
                                                marginTop: "5px",
                                              }}
                                            >
                                              <div>
                                                {" "}
                                                {e_data.total_intrested}
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className="all_icon_imgs_div"
                                            style={{ background: "#BEF5C3" }}
                                          >
                                            <img
                                              className="all_icon_imgs"
                                              src="dist/img/CircleChart.png"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
