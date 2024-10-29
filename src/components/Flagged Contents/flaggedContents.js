import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import $ from "jquery";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import DataTable from "react-data-table-component";

export const flaggedContents = () => {
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
  const token = localStorage.getItem("Token");
  const [flaggedData, setFlaggedData] = useState([]);
  const [flaggedCount, setFlaggedCount] = useState("");

 
  async function getFlaggedContentData() {    
    try {
      const flaggedResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_reported_post_details",        
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log("flaggedResponse...===............", flaggedResponse);

      const ErrorCode = flaggedResponse.data.error_code;
      if (ErrorCode == 200) {
        const _data = flaggedResponse.data.data;
        setFlaggedData(_data);      
      } else {
       
      }
    } catch (err) {
      console.log("get flagged data error-----------", err);
    }
  }

  async function getFlaggedContentCount() {    
    try {
      const flaggedCountResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_flagged_content_counts",        
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      // console.log("flaggedCountResponse...............", flaggedCountResponse);

      const ErrorCode = flaggedCountResponse.data.error_code;
      if (ErrorCode == 200) {
        const _data = flaggedCountResponse.data.data;
        setFlaggedCount(_data);      
      } else {
       
      }
    } catch (err) {
      console.log("get flagged data error-----------", err);
    }
  }

  useEffect(() =>{
    getFlaggedContentData();
    getFlaggedContentCount();
  }, [])

  const silentStudentFunc = async (s_id) => {
    try {
        const formData = new FormData();
        formData.append("stud_id",s_id);
      const silentStudentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_change_student_freez_acc_status",  
        formData,      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log("silentStudentResponse-------",silentStudentResponse);
      const ErrorCode = silentStudentResponse.data.error_code;
      if (ErrorCode == 200) {
        getFlaggedContentData();
        getFlaggedContentCount();
        $(".edit_campus_modal").hide();

        toast.success(silentStudentResponse.data.message);
      } else {
       
      }
    } catch (err) {
      console.log("silence user error-----------", err);
    }
  }

  const hidePostFunc = async (f_id) => {
    try {
        const formData = new FormData();
        formData.append("f_id",f_id);
      const hidePostResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_flagged_content_hide_post",  
        formData,      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log("hidePostResponse-------",hidePostResponse);
      
      const ErrorCode = hidePostResponse.data.error_code;
      if (ErrorCode == 200) {
        getFlaggedContentData();
        getFlaggedContentCount();
        $(".edit_campus_modal").hide();
        toast.success(hidePostResponse.data.message);
      } else {
       
      }
    } catch (err) {
      console.log("hide post error-----------", err);
    }
  }


  const [tId, setTId] = useState("");
  const openActionsModal = (e) => {
    setTId(e);
    $(".edit_campus_modal").hide();
    $(".actions_modal" + e).toggle();
  };
  const closeActionsModal = (e) => {
    $(".edit_campus_modal").hide();
  };


  const columns = [
    {
      name: "Reported by ",
      selector: (row) => {
                 return(<>
                  <div>{row.reported_by_full_name}</div>
                  <div className="nine_font_class">{row.reported_at}</div>
                  </>)
      },
      sortable: true,
      with: "25%",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      width:"10%",
      sortable: true,
    },

    {
      name: "Post",
      selector: (row) => {
             return(
              <div style={{width:"315px"}}>{row.f_description}</div>
             )
      },
      width:"35%",
    },
    {
      width:"10%",
      selector: (row) =>{
        const array = [];
        row.feed_images.map((itemimage) => {
        array.push(itemimage.feed_img);
       
        });
            return(<>
              {array.length  == 0 ?(
                  <div>
                  <img style={{height:"30px",width:"60px",margin:"2px",objectFit:"contain"}}
                   src="dist/img/event_photo.png"
                   />
                </div>     
              ):(       
             <div>
               <img className="flagged_content_img"
                src={array[0]}
                />
             </div>
             )} 
             </> )
      },
    },
    {
      name: "Posted by",
      selector: (row) => row.posted_by_full_name,
      sortable: true,
      width:"10%",
    },
    {
      name: "Status",
      width:"10%",
      selector: (row) => {
        return(<>
        {row.feed_status == 0 ? (
            <div>Hidden</div>
        ):(
          <div>Keep Post</div>
        )}        
         
         </>)
},
     
    },

    {
      name: "",
      width: "auto",
      cell: (row) => {
        return (
          <div className="d-flex" style={{width:"100%"}}>
            <div className="action_buttons_end_css"
              onClick={() => openActionsModal(row.report_id)}
            >
              <button className="all_action_buttons">
                Actions
              </button>
            </div>
            <div
              className={`edit_campus_modal actions_modal${row.report_id}`}
              style={{
                display: "none",
                position: "absolute",
                top: "30px",
                right: "15px",
                width:"335px"
              }}
            >
              <div>
                <div className="  ">
                  <div className=" d-flex ml-auto">
                    <img
                      className="campus_img ml-auto"
                      src="dist/img/Cancel.png"
                      onClick={() => closeActionsModal(row.report_id)}
                    />
                  </div>
                </div>
                {row.feed_status == 0 ? (
                <div className=" hover_class p-2" 
                        onClick={()=> hidePostFunc(row.f_id)}>
                  <div className=" d-flex flex-row">
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img
                        className="campus_img"
                        src="dist/img/ThumbsUp.png"
                      />
                    </div>
                    
                      <div className="flag_inner_div">
                      <div style={{fontSize:"10px",fontWeight:"600"}}>Keep Post</div>
                      <div style={{fontSize:"9px",fontWeight:"500"}}>Disagree with flag and keep the post unchanged</div>

                    </div>
                     
                    
                  </div>
                </div>
                ):(
                <div className=" d-flex flex-row hover_class p-2"
                      onClick={()=> hidePostFunc(row.f_id)}>
                  <div className=" d-flex flex-row">
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img
                        className="campus_img"
                        src="dist/img/PostHide.png"
                      />
                    </div>
                    <div className="flag_inner_div">
                      <div style={{fontSize:"10px",fontWeight:"600"}}>Hide Post</div>
                      <div style={{fontSize:"9px",fontWeight:"500"}}>Hide this post and send a warning message</div>
                    </div>
                  </div>
                </div>
                 )}
                   
                   {row.acc_freeze == 0 ?(
                <div className=" d-flex flex-row hover_class p-2" 
                     onClick={()=> silentStudentFunc(row.posted_by_id)}
                >
                  <div className=" d-flex flex-row">
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img
                        className="campus_img"
                        src="dist/img/PostSilence.png"
                      />
                    </div>                    
                      <div className="flag_inner_div">
                      <div style={{fontSize:"10px",fontWeight:"600"}}>Silence User</div>
                      <div style={{fontSize:"9px",fontWeight:"500"}}>A silenced user has all posting disabled</div>
                    </div>
                   
                  </div>
                </div>
                 ):(
                  <div className=" d-flex flex-row hover_class p-2"
                    onClick={()=> silentStudentFunc(row.posted_by_id)}
                  >
                  <div className=" d-flex flex-row">
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img
                        className="campus_img"
                        src="dist/img/PostSilence.png"
                      />
                    </div>                    
                      <div className="flag_inner_div">
                      <div style={{fontSize:"10px",fontWeight:"600"}}>Unfreeze User</div>
                      <div style={{fontSize:"9px",fontWeight:"500"}}>Unfreezed user has all posting enables</div>
                    </div>
                   
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
  ];

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
     
          <div className="border_class2">
            <div className="row">
              <div className="col-md-3">
                <section style={{ margin: "10px 5px" }}>
                  <div className="container-fluid table-cards">
                    <div className="table-cards">
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{ height: "100%", padding: "0px 5px" }}
                        >
                          <div
                            className="small-box"
                            style={{
                              height: "75px",
                              padding: "5px",
                              borderRadius: "3px",
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
                                <img className="all_icon_imgs"
                                  src="dist/img/TwoTickets.png"
                                  
                                />
                              </div>

                              <div>
                                <div>
                                  <h5
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      fontWeight: "600",
                                      fontSize: "20px",
                                      color: "#1F3977",
                                      marginTop: "5px",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    {flaggedCount.total_flags}
                                  </h5>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{
                                    flexWrap: "wrap",
                                    marginTop: "5px",
                                    fontFamily: "Poppins",

                                    fontWeight: "500",
                                    fontSize: "11px",
                                  }}
                                >
                                  Total Flags
                                  {/* <div>{jobDetails.job_applications}</div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-md-3">
                <section style={{ margin: "10px 5px" }}>
                  <div className="container-fluid table-cards">
                    <div className="table-cards">
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{ height: "100%", padding: "0px 5px" }}
                        >
                          <div
                            className="small-box"
                            style={{
                              height: "75px",
                              padding: "5px",
                              borderRadius: "3px",
                              display: "flex",
                            }}
                          >
                            <div
                              className="inner"
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <img className="all_icon_imgs"
                                  src="dist/img/Hourglass.png"
                                  
                                />
                              </div>

                              <div>
                                <div>
                                  <h5
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      fontWeight: "600",
                                      fontSize: "20px",
                                      color: "#1F3977",
                                      marginTop: "5px",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    {flaggedCount.un_hidden_posts}
                                  </h5>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{
                                    flexWrap: "wrap",
                                    marginTop: "5px",
                                    fontFamily: "Poppins",

                                    fontWeight: "500",
                                    fontSize: "11px",
                                  }}
                                >
                                  False Flags
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-md-3">
                <section style={{ margin: "10px 5px" }}>
                  <div className="container-fluid table-cards">
                    <div className="table-cards">
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{ height: "100%", padding: "0px 5px" }}
                        >
                          <div
                            className="small-box"
                            style={{
                              height: "75px",
                              padding: "5px",
                              borderRadius: "3px",
                              display: "flex",
                            }}
                          >
                            <div
                              className="inner"
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <img className="all_icon_imgs"
                                  src="dist/img/ClosedSign.png"
                                />
                              </div>

                              <div>
                                <div>
                                  <h5
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      fontWeight: "600",
                                      fontSize: "20px",
                                      color: "#1F3977",
                                      marginTop: "5px",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    {flaggedCount.hidden_posts}
                                  </h5>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{
                                    flexWrap: "wrap",
                                    marginTop: "5px",
                                    fontFamily: "Poppins",

                                    fontWeight: "500",
                                    fontSize: "11px",
                                  }}
                                >
                                  Hidden Posts
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-md-3">
                <section style={{ margin: "10px 5px" }}>
                  <div className="container-fluid table-cards">
                    <div className="table-cards">
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{ height: "100%", padding: "0px 5px" }}
                        >
                          <div
                            className="small-box"
                            style={{
                              height: "75px",
                              padding: "5px",
                              borderRadius: "3px",
                              display: "flex",
                            }}
                          >
                            <div
                              className="inner"
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <img className="all_icon_imgs"
                                  src="dist/img/Remove.png"
                                />
                              </div>

                              <div>
                                <div>
                                  <h5
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      fontWeight: "700",
                                      fontSize: "20px",
                                      color: "#1F3977",
                                      marginTop: "5px",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    {flaggedCount.silenced_users}
                                  </h5>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{
                                    flexWrap: "wrap",
                                    marginTop: "5px",
                                    fontFamily: "Poppins",

                                    fontWeight: "500",
                                    fontSize: "11px",
                                  }}
                                >
                                  Restricted Users
                                </div>
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

          <div className="border_class2 mt-2 pb-2">
           <div className="row">
            <div className="col-md-12">
            <DataTable
              // title="Campus List"
              fixedHeader
              fixedHeaderScrollHeight="800px"
              pagination
              columns={columns}
              data={flaggedData}
              customStyles={customStyles}
            />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
