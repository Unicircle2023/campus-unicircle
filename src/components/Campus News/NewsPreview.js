import React, { useState, useEffect } from "react";
import { Menu } from "../Menu";
import { Header } from "../Header";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
// import image from "./NewsFormNew"
// import FileViewer from "react-file-viewer"

export const NewsPreview = () => {

  const token = localStorage.getItem("Token");
  const location = useLocation();
  const { new_news_id } = location.state || { id: "none" };

  const [newsData, setNewsData] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');




  async function getNewsData(new_id) {
    const formData = new FormData();


    formData.append("news_id", new_id);
    const fetchNewsResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_good_news",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log('formdata=========', formData)

    if (fetchNewsResponse.data.error_code == 200) {
      setNewsData(fetchNewsResponse.data.data)
      const responseData = fetchNewsResponse.data.data;


      // switch (fileType) {
      //   case 'pdf':
      //     setFileUrl(URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' })));
      //     break;
      //   case 'doc':
      //   case 'docx':
      //     content = await mammoth.convertToHtml({ arrayBuffer: response.data });
      //     setFileUrl(URL.createObjectURL(new Blob([content.value], { type: 'text/html' })));
      //     break;
      //   // Add cases for other file types like 'ppt', 'pptx', 'txt', etc. as needed
      //   default:
      //     console.error('Unsupported file type');
      // }


      // if (responseData) {
      //   let firstFileUrl = "";
      //   responseData.map((e)=>{

      //     firstFileUrl = e.news_files[0].uri;
      //   })

      //   setFileUrl(firstFileUrl);
      //   const fileExtension = getFileExtension(firstFileUrl);
      //   setFileType(fileExtension);

      // } else {
      //   console.warn('No news files found in the response.');
      // }
    } else {
      console.log('Content-Disposition--------------------');

    }
  }

  function getFileExtension(url) {
    const parts = url.split('.');
    return parts[parts.length - 1].toLowerCase();
  }

  useEffect(() => {
    getNewsData(new_news_id);
  }, [])
  return (
    <>
      <div>
        <Header />

        <div className="d-flex">
          <Menu />

          <div className="content-wrapper">
            <div className="card_div mt-2" style={{ width: "100%" }}>
              <div className="card-header bg-white p-0">
                {newsData.map((n_data) => {
                  var dateeee = n_data.publish_date;
                  var n_date = moment(dateeee).format("D MMM YYYY");
                  return (<>

                    <div className="card_inner_div">
                      <div
                        className="mt-3 eleven_font_class"
                        style={{ color: "#1F3977" }}
                      >
                        <p>Announcement</p>
                      </div>

                      <div className="mt-3 twelve_font_class">
                        <p>
                          {n_data.news_title}

                        </p>
                      </div>

                      <div
                        className="mt-3 ten_font_class"
                        style={{ display: "flex" }}
                      >
                        <p style={{ color: "#1F3977" }}>Date : </p>
                        <p className="pl-2">{n_date}</p>
                      </div>

                      <div className="mt-2">
                        <hr className="card_inner_hr_css" />
                      </div>

                      <div className="row">
                        <div className="p-0">
                          <div className="">
                            <p className="desc_class" dangerouslySetInnerHTML={{ __html: n_data.news_description }} />

                          </div>
                        </div>
                      </div>

                      <div className="">
                        <hr className="card_inner_hr_css" />
                      </div>


                      <div>
                        <div
                          className="ten_font_class"
                          style={{ color: "#1F3977" }}
                        >
                          <p>Attachments</p>

                        </div>

                        {/* <div>
                    {fileType && (
                      <FileViewer
                        fileType={fileType}
                        filePath={fileUrl}
                      />
                    )}
                  </div> */}
                      </div>


                      <div className="">
                        <hr className="card_inner_hr_css" />
                      </div>


                      <div className="row">
                        <div className="p-0">
                          <p className="ten_font_class"
                            style={{ color: "#4AA081" }}
                          >
                            Engagement Analytics
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5 pl-0">
                          <section style={{ margin: "15px 0px" }}>
                            <div className=" table-cards">
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
                                            <h5 className="eleven_font_class"
                                              style={{
                                                color: "#1F3977"
                                              }}
                                            >
                                              Views
                                            </h5>
                                          </div>

                                          <div
                                            className="d-flex twenty_font_class"
                                            style={{
                                              flexWrap: "wrap",
                                              marginTop: "5px",
                                            }}
                                          >
                                            {" "}

                                            <div>{n_data.view_count}</div>
                                          </div>
                                        </div>

                                        <div className="all_icon_imgs_div"
                                          style={{
                                            background: "#FBE1FF",

                                          }}
                                        >
                                          <img className="all_icon_imgs"
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

                        <div className="col-md-5">
                          <section style={{ margin: "15px 0px" }}>
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
                                            <h5 className="eleven_font_class"
                                              style={{
                                                color: "#1F3977"
                                              }}
                                            >
                                              Likes
                                            </h5>
                                          </div>

                                          <div
                                            className="d-flex twenty_font_class"
                                            style={{
                                              flexWrap: "wrap",
                                              marginTop: "5px",
                                            }}
                                          >
                                            <div>{n_data.likes_count}</div>
                                          </div>
                                        </div>

                                        <div className="all_icon_imgs_div"
                                          style={{
                                            background: "#BEF5C3"
                                          }}
                                        >
                                          <img className="all_icon_imgs"
                                            src="dist/img/Thumbs_Up.png"
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
                  </>)
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
