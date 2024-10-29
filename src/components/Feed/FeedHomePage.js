import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "../Menu";
import { Header } from "../Header";
import $ from "jquery";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useHistory } from "react-router-dom";

// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';

export const FeedHomePage = () => {
  const token = localStorage.getItem("Token");

  const [uni, setUniData] = useState([]);
  const [data, setData] = useState([]);
  const [imgData, setImgData] = useState();
  const [picture, setPicture] = useState();
  const [feedData, setFeedData] = useState([]);
  const [coverImg, setCoverImg] = useState();

  // Create post states
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [range, setRange] = useState("");
  const [deletePostId, setDeletePostId] = useState("");
  const [editPostDescription, setEditPostDescription] = useState("");
  const [editPostImg, setEditPostImg] = useState([]);
  const [editPostId, setEditPostId] = useState("");

  // Add award States
  const [coverPicture, setCoverPicture] = useState(null);
  const [coverImgData, setCoverImgData] = useState();
  const [awardDescription, setAwardDescription] = useState("");
  const [awardName, setAwardName] = useState("");

  // Award video states
  const [awardVideo, setAwardVideo] = useState("");
  const [awardVideoText, setAwardVideoText] = useState("");

  // Edit info states
  const [feedLogo, setFeedLogo] = useState();
  const [institutionName, setInstitutionName] = useState([]);
  const [tagLine, setTagLine] = useState([]);
  const [webURL, setWebURL] = useState();
  const [webURLCheckbox, setWebURLCheckbox] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [emailId, setEmailId] = useState();
  const [yearFounded, setYearFounded] = useState();
  const [about, setAbout] = useState();
  const [pageLogo, setPageLogo] = useState();

  const [error_message, setError_message] = useState("");

  //  Comments state
  const [mainCommentData, setMainCommentData] = useState([]);
  const [commentType, setCommentType] = useState(1);
  const [commentFeedId, setCommentFeedId] = useState("");
  const [mainCommentId, setMainCommentId] = useState("");
  const [commentInputBoxValue, setCommentInputBoxValue] = useState("");
  const [fullName, setFullName] = useState("");

  const [isPublished, setIsPublished] = useState(false);
  console.log("isPublished--------------", isPublished);
  async function getPrimaryInfo() {
    try {
      const infoResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_Primary_campus_info",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (infoResponse.data.error_code == 200) {
        setUniData(infoResponse.data.data);
        const u_data = infoResponse.data.data;

        u_data.map((e) => {
          setInstitutionName(e.campus_name);
          setTagLine(e.tagline);
          setWebURL(e.campus_website);
          setPhoneNumber(e.mobile_no);
          setEmailId(e.email_id);
          setAbout(e.overview);
          setYearFounded(e.year_founded);
          setRange(e.adjust_size_cover_photo);

          setPageLogo(e.profile);
          $(".default_image").hide();
          var preview = document.getElementById("page_logo-preview");
          preview.src = e.profile;
          preview.style.display = "block";
          $(".default_cover_image").hide();
          var preview = document.getElementById("cover_image-preview");
          preview.src = e.cover_profile;
          preview.style.display = "block";
        });
      } else {
        setUniData([]);
      }
    } catch (err) {
      console.log("get info error..............", err);
    }
  }

  async function fetchList() {
    // console.log("Access Token-", token);
    try {
      const fetchCountResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_count",
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      // console.log("Get Dashboard count Details...................", fetchCountResponse);

      const CountErrorCode = fetchCountResponse.data.error_code;
      const CountErrorMsg = fetchCountResponse.data.message;

      if (CountErrorCode == 200) {
        const countListArray = fetchCountResponse.data.data[0];

        setData(countListArray);
      } else {
        setData([]);

        // console.log(fetchCountResponse.data.message);
      }
    } catch (err) {
      // console.log("Log in Fail", err);
    }
  }

  useEffect(() => {
    getPrimaryInfo();
    fetchList();
    getFeedData();
  }, []);

  useEffect(() => {
    if (institutionName.length > 99) {
      $(".institutionName_lenght_class").show();
      setTimeout(function() {
        $(".institutionName_lenght_class").hide();
      }, 5000);
    }
  }, [institutionName]);

  useEffect(() => {
    if (tagLine.length > 119) {
      $(".tagline_lenght_class").show();
      setTimeout(function() {
        $(".tagline_lenght_class").hide();
      }, 5000);
    }
  }, [tagLine]);

  async function AddAwardList() {
    try {
      const a_name = document.getElementById("award_name");
      const a_description = document.getElementById("award_description");

      if (coverPicture == null) {
        $(".award_photo").show();
        setTimeout(function() {
          $(".award_photo").hide();
        }, 3000);
      } else if (a_name.value == "") {
        $(".award_name").show();

        setTimeout(function() {
          $(".award_name").hide();
        }, 3000);
      } else if (a_description.value == "") {
        $(".award_description").show();
        setTimeout(function() {
          $(".award_description").hide();
        }, 3000);
      } else {
        const formData = new FormData();
        formData.append("award_name", awardName);
        formData.append("a_description", awardDescription);
        for (let i = 0; i < coverPicture.length; i++) {
          formData.append("award_image", coverPicture[i]);
        }
        const createAwardResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_add_campus_award",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        if (createAwardResponse.data.error_code == 200) {
          toast.success(createAwardResponse.data.message);
          setError_message(createAwardResponse.data.message);
          closeAddAwardModal();
        } else {
          toast.error(createAwardResponse.data.message);
        }
      }
    } catch (err) {
      console.log("Log in Fail..........", err);
    }
  }

  async function createPost() {
    try {
      const post_disc = document.getElementById("post_description");

      if (postDescription == "" && feedPostImage == null) {
        $(".empty_fields").show();
        setTimeout(function() {
          $(".empty_fields").hide();
        }, 3000);
      } else {
        const formData = new FormData();
        formData.append("feed_desc", postDescription);
        if (feedPostImage == null) {
          formData.append("feed_imgs[]", feedPostImage);
        } else {
          for (var i = 0; i < feedPostImage.length; i++) {
            formData.append("feed_imgs[]", feedPostImage[i]);
          }
        }

        const feedResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_upload_feed",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        setError_message(feedResponse.data.message);
        if (feedResponse.data.error_code == 200) {
          $(".create_post_modal").hide();
          $(".content-wrapper").css("position", "relative");
          toast.success(feedResponse.data.message);

          $(".all_comment_section").hide();
          closeCreatePostModal();
          getFeedData();
        } else {
          toast.error(feedResponse.data.message);
        }
      }
    } catch (err) {
      console.log("create post error.......", err);
    }
  }

  const openDeletePostModal = (p_id) => {
    $(".delete_post_modal").hide();
    $(".edit_post_modal1").hide();
    $(".add_students_modal1").hide();

    setDeletePostId(p_id);
    $(".delete_post_new_modal").toggle();
  };
  function close_delete_modal() {
    $(".delete_cover_img_modal").hide();
    $(".delete_post_modal").hide();
    $(".edit_post_modal1").hide();
    $(".add_students_modal1").hide();
    $(".delete_post_new_modal").hide();
    $(".create_post_new_modal").hide();
  }

  const editPostFun = async () => {
    try {
      const formData = new FormData();

      formData.append("f_id", editPostId);
      formData.append("feed_desc", editPostDescription);
      // for (let i = 0; i < editPostImg.length; i++) {
      //   formData.append("feed_imgs[]", editPostImg[i]);
      // }

      const editPostResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "edit_admin_feed",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (editPostResponse.data.error_code == 200) {
        $(".edit_post_modal1").hide();
        getFeedData();
        toast.success(editPostResponse.data.message);
      }
    } catch (error) {
      console.log("edit post error---------", error);
    }
  };

  const deletePostFun = async () => {
    try {
      const formData = new FormData();
      formData.append("f_id", deletePostId);
      const deletePostResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "delete_admin_feed",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (deletePostResponse.data.error_code == 200) {
        $(".delete_post_new_modal").hide();
        getFeedData();
        toast.success(deletePostResponse.data.message);
      }
    } catch (err) {
      console.log("delete post error-----", err);
    }
  };

  async function getFeedData() {
    try {
      const feedResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_feed",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (feedResponse.data.error_code == 200) {
        setFeedData(feedResponse.data.data);
      }
    } catch (err) {
      console.log("get feed data error.......", err);
    }
  }

  async function changeCoverImg() {
    try {
      const formData = new FormData();

      formData.append("adjust_size", range);
      formData.append("cover_photo", coverImg);

      const coverImgResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_update_cover_photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setError_message(coverImgResponse.data.message);
      if (coverImgResponse.data.error_code == 200) {
        toast.success(coverImgResponse.data.message);

        getPrimaryInfo();
        closeFeedCoverImadeModal();
      } else {
        toast.error(coverImgResponse.data.message);
      }
    } catch (err) {
      console.log("create post error.......", err);
    }
  }

  const onLikeClick = async (f_id, y_like) => {
    let yy = 0;
    if (y_like == 0) {
      yy = 1;
    } else {
      yy = 0;
    }
    const formData = new FormData();

    formData.append("f_id", f_id);
    formData.append("l_flag", yy);
    const likeResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_like_feed",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    // console.log("likeResponse-----------", likeR;esponse.data);

    if (likeResponse.data.error_code == 200) {
      setFeedData((_prv) =>
        _prv.map((_item, index) => {
          if (f_id == _item.feed_id) {
            return {
              ..._item,
              total_likes: likeResponse.data.data.total_likes,
              you_like: likeResponse.data.data.you_like_status,
              like_string: likeResponse.data.data.like_string,
            };
          } else {
            return {
              ..._item,
            };
          }
        })
      );
    }
  };

  const mainCommentLikeClick = async (c_id) => {
    const formData = new FormData();
    formData.append("type", 1);
    formData.append("comment_id", c_id);
    const commentLikeResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_st_comments_likes",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    // console.log("commentLikeResponse------------",commentLikeResponse.data);
    const cDta = commentLikeResponse.data;
    console.log("cDta-------", cDta);

    if (commentLikeResponse.data.error_code == 200) {
      setMainCommentData((_prv) =>
        _prv.map((_item, index) => {
          if (c_id == _item.comment_id) {
            return {
              ..._item,
              total_likes: commentLikeResponse.data.total_likes_count,
              you_like: commentLikeResponse.data.self_likes_count,
            };
          } else {
            return {
              ..._item,
            };
          }
        })
      );
    }
  };

  const commentReplayLikeClick = async (sub_id) => {
    const formData = new FormData();
    formData.append("type", 2);
    formData.append("sub_comment_id", sub_id);
    const subCommentLikeResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_st_comments_likes",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    // console.log("subCommentLikeResponse------------",subCommentLikeResponse);
    const cDta = subCommentLikeResponse.data;
    if (subCommentLikeResponse.data.error_code == 200) {
      setMainCommentData((_prv) =>
        _prv.map((_item, index) => {
          const updatedSubComments = _item.sub_comments.map((item) => {
            if (sub_id == item.sub_comment_id) {
              return {
                ...item,
                total_likes: subCommentLikeResponse.data.total_likes_count,
                you_like: subCommentLikeResponse.data.self_likes_count,
              };
            } else {
              return {
                ...item,
              };
            }
          });
          return {
            ..._item,
            sub_comments: updatedSubComments,
          };
        })
      );
    }
  };

  async function savedData() {
    try {
      const ins_name = document.getElementById("institution_name");
      const tag_line = document.getElementById("tagline");
      const web_Url = document.getElementById("web_url");
      const p_no = document.getElementById("phone_number");
      const e_id = document.getElementById("email_id");
      const abt = document.getElementById("about");
      const y_founded = document.getElementById("year_founded");

      var yearRangePattern = /^\d{4}-\d{4}$/;

      if (pageLogo == null) {
        $(".page_logo").show();
        setTimeout(function() {
          $(".page_logo").hide();
        }, 3000);
      } else if (ins_name.value == "") {
        $(".institution_name").show();
        setTimeout(function() {
          $(".institution_name").hide();
        }, 3000);
      } else if (tag_line.value == "") {
        $(".tagline").show();
        setTimeout(function() {
          $(".tagline").hide();
        }, 3000);
      } else if (web_Url.value == "") {
        $(".web_url").show();
        setTimeout(function() {
          $(".web_url").hide();
        }, 3000);
      } else if (p_no.value == "") {
        $(".phone_number").show();
        setTimeout(function() {
          $(".phone_number").hide();
        }, 3000);
      } else if (e_id.value == "") {
        $(".email_id").show();
        setTimeout(function() {
          $(".email_id").hide();
        }, 3000);
      } else if (abt.value == "") {
        $(".about").show();
        setTimeout(function() {
          $(".about").hide();
        }, 3000);
      } else if (y_founded.value == "") {
        $(".year_founded").show();
        setTimeout(function() {
          $(".year_founded").hide();
        }, 3000);
      } else if (!yearRangePattern.test(y_founded.value)) {
        $(".year_founded_pattern").show();
        setTimeout(function() {
          $(".year_founded_pattern").hide();
        }, 3000);
      } else {
        const formData = new FormData();

        formData.append("campus_name", institutionName);
        formData.append("tagline", tagLine);
        formData.append("overview", about);
        formData.append("year_founded", yearFounded);
        formData.append("email_id", emailId);
        formData.append("mobile_no", phoneNumber);
        formData.append("campus_website", webURL);
        for (var i = 0; i < pageLogo.length; i++) {
          formData.append("camp_profile", pageLogo[i]);
        }
        const profileResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_update_profile_info",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        setError_message(profileResponse.data.message);
        if (profileResponse.data.error_code == 200) {
          closeEditProfiledModal();
          resetValues();
          toast.success(profileResponse.data.message);
          getFeedData();
          getPrimaryInfo();
        } else {
          toast.error(profileResponse.data.message);
        }
      }
    } catch (err) {
      console.log("saveData function err........", err);
    }
  }

  async function addvideoInAward() {
    try {
      const a_text = document.getElementById("award_text");

      if (awardVideo == "") {
        $(".award_video").show();
        setTimeout(function() {
          $(".award_video").hide();
        }, 3000);
      } else if (a_text.value == "") {
        $(".award_text").show();
        setTimeout(function() {
          $(".award_text").hide();
        }, 3000);
      } else {
        const formData = new FormData();
        formData.append("v_description", awardVideoText);
        for (let i = 0; i < awardVideo.length; i++) {
          formData.append("v_file", awardVideo[i]);
        }
        // for (const p of formData.entries()) {
        //   console.log(`formData----------${p[0]},${p[1]}`);
        // }
        const videoResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "admin_upload_campus_video",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        if (videoResponse.data.error_code == 200) {
          setError_message(videoResponse.data.message);
          closeAddVideoModal();
          toast.success(videoResponse.data.message);
        } else {
          toast.error(videoResponse.data.message);
        }
      }
    } catch (err) {}
  }

  function addFeedCoverImage() {
    $(".feed_cover_image_modal").toggle();
    $(".content-wrapper").css({ position: "fixed", width: "auto" });
  }

  function CreatePost() {
    // $(".create_post_modal").show();
    $(".create_post_new_modal").show();
    $(".content-wrapper").css({ position: "fixed", width: "auto" });
  }

  function AddToProfile() {
    $(".add_to_profile_modal").show();
    $(".content-wrapper").css({ position: "fixed", width: "auto" });
  }

  function AddVideo() {
    $(".add_video_modal").show();
    $(".add_to_profile_modal").hide();
    $(".content-wrapper").css({ position: "fixed", width: "auto" });
  }

  function AddAward() {
    $(".add_award_modal").show();
    $(".add_to_profile_modal").hide();

    $(".content-wrapper").css({ position: "fixed", width: "auto" });
  }

  function EditProfile() {
    $(".edit_profile_modal").show();
    $(".content-wrapper").css({ position: "fixed", width: "auto" });

    $(".feed_css").css({ position: "fixed", width: "100%" });
  }

  function openEditDeleteModal(f_id) {
    setEditPostDescription("");
    // setEditPostImg("");
    const filterData = feedData.filter((e) => e.feed_id == f_id);
    filterData.map((item) => {
      setEditPostDescription(item.f_description);
      setEditPostImg(item.feed_imgs);
    });

    $(".edit_post_modal1").hide();
    $(".add_students_modal1").hide();
    $(".add_students_modal" + f_id).toggle();
    // var preview = document.getElementById("edit_post_photo");
    //     preview.style.display = "none";
    // $(".default_post_img").show();
  }

  const openEditPostModal = (f_id) => {
    setEditPostId(f_id);
    $(".edit_post_modal1").hide();
    $(".add_students_modal1").hide();
    $(".edit_post_modal" + f_id).show();
  };
  function closeEditPostModal(f_id) {
    $(".edit_post_modal" + f_id).hide();
  }

  const openCommentSection = async (f_id) => {
    try {
      setFullName("");
      setCommentFeedId(f_id);
      const formData = new FormData();
      formData.append("f_id", f_id);
      const commentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "student_get_feed_comments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      let comm_data = commentResponse.data.data;

      setMainCommentData(comm_data);
      setCommentInputBoxValue("");
      $(".all_comment_section").hide();
      $(".comment_section" + f_id).toggle();
    } catch (err) {
      console.log("get feed comments error-----", err);
    }
  };

  const openInnerCommentSection = (ff_id, mc_id, f_name) => {
    setFullName("");
    setCommentFeedId(ff_id);
    setCommentType(2);
    setMainCommentId(mc_id);
    setFullName("@" + f_name);
    $(".comment_section").toggle();
    $("#main_comment_reply1").focus();
  };

  const sendMainCommentReply = async () => {
    try {
      let t_comment = "";
      if (commentInputBoxValue == "") {
        t_comment = "";
      } else {
        t_comment = fullName + " " + commentInputBoxValue;
      }
      const formData = new FormData();
      formData.append("type", commentType);
      formData.append("f_id", commentFeedId);
      formData.append("comments", t_comment);
      formData.append("comment_id", mainCommentId);

      const commentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_st_feed_comment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("commentResponse----------", commentResponse);
      if (commentResponse.data.error_code == 200) {
        setCommentInputBoxValue("");
        setFullName("");
        openCommentSection(commentFeedId);
      }
    } catch (err) {
      console.log("comment response error---------", err);
    }
    // }
  };

  const setPostDescriptionFunction = (desc) => {
    setPostDescription(desc);
    desc == "" && postImage == ""
      ? setIsPublished(false)
      : setIsPublished(true);
  };

  function closeFeedCoverImadeModal() {
    $(".feed_cover_image_modal").hide();
    $(".content-wrapper").css("position", "relative");
    $(".edit_post_modal").hide();
  }

  function closeCreatePostModal() {
    $(".content-wrapper").css("position", "relative");
    setPostDescription("");
    setPostImage("");
    setFeedPostImage(null);
    setIsPublished(false);
    $(".edit_post_modal1").hide();
    $(".edit_post_modal1").hide();
    var preview = document.getElementById("post_image-preview");
    preview.style.display = "none";
    $("#post_description").show();
    $(".create_post_new_modal").hide();
  }

  function closeAddToProfileModal() {
    $(".add_to_profile_modal").hide();
    $(".content-wrapper").css("position", "relative");
  }

  function closeAddVideoModal() {
    $(".add_video_modal").hide();
    setAwardVideoText("");
    $(".content-wrapper").css("position", "relative");
    $("#award_video-preview").hide();
    $(".default_video_div").show();
  }

  function closeAddAwardModal() {
    $(".add_award_modal").hide();
    $(".content-wrapper").css("position", "relative");
    $("#award_image-preview").hide();
    $(".award_default_image").show();
    setAwardName("");
    setAwardDescription("");
    setCoverPicture("");
  }

  function closeEditProfiledModal() {
    $(".edit_profile_modal").hide();
    $(".content-wrapper").css("position", "relative");
    $(".card_div").css("marginTop", "0px");
    $(".feed_css").css({
      position: "relative",
      zIndex: "0",
      width: "100%",
      marginLeft: "0",
    });
    // resetValues();
  }

  function closeEditDeleteModal() {
    $(".add_students_modal1").hide();
    $(".feed_edit_delete_modal").hide();
    $(".content-wrapper").css("position", "relative");
  }

  var eventImage = [];
  const getCoverImage = (e) => {
    $(".default_cover_image").hide();
    setImgData(e.target.files);
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        // eventImage.push(e.target.files[i])

        setCoverImg(e.target.files[i]);
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("cover_image-preview");
        preview.src = src;
        preview.style.display = "block";

        setImgData(src);
      }
    }
  };

  var evetCoverImage = [];
  const getAwardImage = (e) => {
    $(".award_default_image").hide();
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        evetCoverImage.push(e.target.files[i]);

        setCoverPicture(evetCoverImage);

        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("award_image-preview");
        preview.src = src;
        preview.style.display = "block";

        // coverImgData.push(src)
        setCoverImgData(src);
        // console.log("coverImg..........", src);
      }
    }
  };

  var feedPageLogo = [];
  const getPageLogo = (e) => {
    $(".default_image").hide();

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        feedPageLogo.push(e.target.files[i]);

        setPageLogo(feedPageLogo);
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("page_logo-preview");
        preview.src = src;
        preview.style.display = "block";

        setFeedLogo(src);
        // console.log("coverImg..........", src);
      }
    }
  };

  var e_img = [];
  // const getEditPostImg = (e) => {
  //   $(".default_post_img").hide();

  //   if (e.target.files.length > 0) {
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       e_img.push(e.target.files[i]);

  //       setEditPostImg(e_img);
  //       var src = URL.createObjectURL(e.target.files[i]);
  //       var preview = document.getElementById("edit_post_images_preview");
  //       preview.src = src;
  //       preview.style.display = "block";

  //     }
  //   }
  // };

  const [feedPostImage, setFeedPostImage] = useState(null);
  var f_Images = [];
  const getPostedImage = (e) => {
    // $("#post_description").hide();

    const files = e.target.files;

    if (files.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        f_Images.push(e.target.files[i]);
        setFeedPostImage(f_Images);

        const newFiles = Array.from(e.target.files);
        const newUrls = newFiles.map((file) => URL.createObjectURL(file));
        setPostImage([]);
        setPostImage(newUrls);

        newUrls == "" && postDescription == ""
          ? setIsPublished(false)
          : setIsPublished(true);

        // var src = URL.createObjectURL(e.target.files[i]);
        // var preview = document.getElementById("post_image-preview");
        // preview.src = src;
        // preview.style.display = "block";
        // setPostImage(src);
      }
    }
  };

  const coverVideo = [];
  const addAwardVideo = (e) => {
    // console.log("video..................",e.target.value);
    $(".default_video_div").hide();
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        coverVideo.push(e.target.files[i]);

        setAwardVideo(coverVideo);
        var src = URL.createObjectURL(e.target.files[i]);
        var preview = document.getElementById("award_video-preview");
        preview.src = src;
        preview.style.display = "block";
      }
    }
  };

  const adjustCoverImage = () => {
    const r = range;

    $(".cover_image").css("height", `${r}px`);
    // $(".feed_cover_image_modal").hide();
  };

  const resetValues = () => {
    $(".page_logo-preview").hide();
    $(".default_image").show();

    setInstitutionName("");
    setTagLine("");
    setWebURL("");
    $(".url_checkbox").removeAttr("checked");
    // setWebURLCheckbox(false);
    setPhoneNumber("");
    setEmailId("");
    setAbout("");
    setYearFounded("");
  };

  const deletCoverImage = () => {
    // $(".feed_cover_image_modal").hide();
    $(".delete_cover_img_modal").show();
  };

  const deleteCoverImg = async () => {
    try {
      const deleteResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_delete_cover_photo",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("deleteResponse-------------------", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        close_delete_modal();
        getPrimaryInfo();
        closeFeedCoverImadeModal();
        toast.success(deleteResponse.data.message);
      }
    } catch (error) {
      console.log("delete response error------", error);
    }
  };

  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(onlyDigits);
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="feed_css">
          <Header />
        </div>
        <div className="d-flex">
          <Menu />

          <div className="content-wrapper" style={{ padding: "0px" }}>
            <div class="formSuccess success_msg">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="success">
                  {error_message}
                </Alert>
              </Stack>
            </div>
            <div className="card_div" style={{ width: "75%" }}>
              <div className="card-header">
                <div className="bg-white" style={{ borderRadius: "5px" }}>
                  <div className="pb-2">
                    <div>
                      {uni.map((e) => (
                        <div>
                          <div style={{ width: "100%" }}>
                            <img
                              className=""
                              src={e.cover_profile}
                              style={{
                                height: `${range}px`,
                                width: "100%",
                                borderRadius: "5px 5px 0px 0px",
                              }}
                            />
                          </div>
                        </div>
                      ))}

                      {/* <img style={{width:"100%",height:"210px"}} src='dist/img/feedBackgroung.png'/> */}
                      <a
                        onClick={() => {
                          addFeedCoverImage();
                        }}
                        style={{
                          position: "absolute",
                          top: "130px",
                          right: "45px",
                          background: "#D9D9D9",
                          borderRadius: "50%",
                          padding: "6px",
                        }}
                      >
                        <img
                          src="dist/img/Edit.png"
                          style={{ height: "20px", width: "24px" }}
                        />
                      </a>

                      <div
                        className="modal fade feed_cover_image_modal"
                        id="deleteModal"
                        style={{
                          background: "rgba(243, 242, 239, 0.60)",
                          opacity: "1",
                        }}
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          style={{ maxWidth: "380px" }}
                        >
                          <div
                            className="modal-content"
                            style={{ left: "157px", top: "152px" }}
                          >
                            <div
                              className="modal-header"
                              style={{
                                background: "#D9D9D9",
                                padding: "5px 8px",
                              }}
                            >
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={closeFeedCoverImadeModal}
                              >
                                <img
                                  className=""
                                  src="dist/img/feed_cancel.png"
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </button>
                            </div>
                            <div
                              className="modal-body"
                              style={{ background: "#D9D9D9" }}
                            >
                              <div
                                className="row"
                                style={{
                                  background: "#ffffff",
                                  padding: "7px 0px",
                                }}
                              >
                                <div className="col-md-4 feed_image_div">
                                  <div
                                    className=""
                                    style={{ width: "100%", marginTop: "0px" }}
                                  >
                                    <label
                                      for="file-ip-1"
                                      class="file-ip-1 x"
                                      style={{
                                        border: "none",
                                        justifyContent: "center",
                                        height: "30px",
                                      }}
                                    >
                                      <img
                                        class="default_cover_image "
                                        src="dist/img/add_image.png"
                                        id="comp_logo"
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                        }}
                                      />

                                      <img
                                        id="cover_image-preview"
                                        style={{
                                          display: "none",
                                          width: "50px",
                                          height: "50px",
                                        }}
                                      />
                                    </label>
                                    <input
                                      type="file"
                                      name="photo"
                                      style={{
                                        visibility: "hidden",
                                        display: "none",
                                      }}
                                      accept="image/png, image/gif, image/jpeg"
                                      onChange={getCoverImage}
                                      multiple
                                      id="file-ip-1"
                                    />

                                    <div
                                      class="EventImage"
                                      style={{
                                        marginTop: "-6px",
                                        display: "none",
                                      }}
                                    >
                                      <h4
                                        class="login-text"
                                        style={{
                                          color: "red",
                                          fontSize: "10PX",
                                          marginLeft: "0",
                                        }}
                                      >
                                        Please Select Event Image
                                      </h4>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-8">
                                  <p className="feed_font_class2">
                                    Upload cover Image
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      marginTop: "5px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    1128px X 191px
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    recommended
                                  </p>
                                </div>
                              </div>

                              <div
                                className="row"
                                style={{
                                  padding: "20px 0px",
                                  cursor: "pointer",
                                }}
                                onClick={adjustCoverImage}
                              >
                                <div className="col-md-4 feed_image_div">
                                  <img
                                    className="modal_image"
                                    src="dist/img/Resize Vertical.png"
                                  />
                                </div>
                                <div className="col-md-8 ">
                                  <p className="feed_font_class2">
                                    Adjust Cover Image
                                  </p>
                                </div>
                                <div style={{ padding: "10px 55px" }}>
                                  <input
                                    type="range"
                                    className="range_input"
                                    min="210"
                                    max="300"
                                    step="1"
                                    onMouseMove={(e) =>
                                      setRange(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div
                                className="row"
                                style={{
                                  padding: "10px 0px",
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  className="col-md-4 feed_image_div"
                                  onClick={() => deletCoverImage()}
                                >
                                  <img
                                    className="modal_image"
                                    src="dist/img/feedDelete.png"
                                  />
                                </div>
                                <div
                                  className="col-md-4"
                                  onClick={() => deletCoverImage()}
                                >
                                  <p className="feed_font_class2">Delete</p>
                                </div>
                                <div
                                  className="col-md-4"
                                  onClick={() => changeCoverImg()}
                                >
                                  <p className="feed_font_class2">Update</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {uni.map((item) => {
                        return (
                          <>
                            {item.profile == "" ? (
                              <div>
                                <img
                                  style={{
                                    width: "90px",
                                    height: "90px",
                                    marginTop: "-55px",
                                    marginLeft: "55px",
                                    background: "#F1F1F1",
                                    borderRadius: "5px",
                                  }}
                                  src="dist/img/indiraCollegeLogo.png"
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  style={{
                                    width: "90px",
                                    height: "90px",
                                    marginTop: "-55px",
                                    marginLeft: "55px",
                                    background: "#F1F1F1",
                                    borderRadius: "5px",
                                  }}
                                  src={item.profile}
                                />
                              </div>
                            )}
                          </>
                        );
                      })}

                      <div></div>
                    </div>

                    <div className="row">
                      {uni.map((item) => {
                        // const f_letters = item.campus_name
                        //   .split(" ")
                        //   .map((f) => f.charAt(0).toUpperCase());

                        return (
                          <>
                            <div className="col-md-10">
                              {item.campus_name == "" ? (
                                <div>
                                  <p style={{ margin: "5px 0px 0px 40px" }}>
                                    Campus Name Not Found
                                  </p>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    margin: "15px 0px 0px 40px",
                                    fontSize: "16x",
                                    fontWeight: "600",
                                  }}
                                >
                                  <p
                                    style={{
                                      display: "inline-flex",
                                      gap: "5px",
                                    }}
                                  >
                                    {item.campus_name}{" "}
                                    {/* <p>({f_letters.join("")})</p> */}
                                  </p>
                                </div>
                              )}

                              {tagLine == "" ? (
                                <div style={{ margin: "2px 0px 0px 40px" }}>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Empowring Lives to Impower minds
                                  </p>
                                </div>
                              ) : (
                                <div style={{ margin: "2px 0px 0px 40px" }}>
                                  <p
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    {item.tagline}
                                  </p>
                                </div>
                              )}

                              <div
                                style={{
                                  margin: "15px 0px 0px 40px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    display: "flex",
                                  }}
                                >
                                  Address :{" "}
                                  <p
                                    style={{
                                      marginLeft: "5px",
                                      fontSize: "10px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {item.address}
                                  </p>
                                </p>
                                <p style={{ margin: "0px 10px" }}>|</p>
                                <Link
                                  to="/student"
                                  style={{
                                    fontSize: "10px",
                                    color: "blue",
                                    fontWeight: "500",
                                  }}
                                >
                                  {data.std_count} Students
                                </Link>
                                {/* <a style={{fontSize:"13px",color:"blue",fontWeight:"600"}}>Contact Info</a> */}
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  margin: "-4px 0px 0px 40px",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    display: "flex",
                                  }}
                                >
                                  Phone No :{" "}
                                  <p
                                    style={{ marginLeft: "5px", color: "blue" }}
                                  >
                                    {item.mobile_no}
                                  </p>{" "}
                                </p>
                                <p style={{ margin: "0px 15px" }}> |</p>
                                <p
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    display: "flex",
                                  }}
                                >
                                  Email ID :
                                  <p
                                    style={{ marginLeft: "5px", color: "blue" }}
                                  >
                                    {item.email_id}
                                  </p>
                                </p>
                              </div>
                            </div>

                            <div className="col-md-2">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <a
                                  onClick={() => {
                                    EditProfile();
                                  }}
                                  style={{ marginRight: "14px" }}
                                >
                                  <img
                                    src="dist/img/Edit.png"
                                    style={{ height: "15px", width: "15px" }}
                                  />
                                </a>
                              </div>
                            </div>
                          </>
                        );
                      })}

                      <div
                        style={{
                          display: "flex",
                          padding: "16px 0px 0px 50px",
                        }}
                      >
                        <div style={{ position: "relative" }}>
                          <button
                            onClick={() => {
                              AddToProfile();
                            }}
                            style={{
                              background: "#ffffff",
                              border: "1px solid #1E1E1E",
                              fontSize: "10px",
                              fontWeight: "600",
                              height: "31px",
                              marginBottom: "10px",
                              borderRadius: "5px",
                              width: "130px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#000000",
                            }}
                          >
                            Add Profile Section
                          </button>

                          <div
                            className="modal fade add_to_profile_modal"
                            id="deleteModal"
                            style={{
                              background: "rgba(243, 242, 239, 0.60)",
                              opacity: "1",
                            }}
                          >
                            <div
                              className="modal-dialog  modal-dialog-centered"
                              style={{ maxWidth: "600px" }}
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title feed_font_class2"
                                    id="exampleModalLabel"
                                  >
                                    Add to profile
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={closeAddToProfileModal}
                                  >
                                    <img
                                      className=""
                                      src="dist/img/feed_cancel.png"
                                      style={{ height: "20px", width: "20px" }}
                                    />
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div
                                    className=""
                                    style={{ paddingBottom: "30px" }}
                                  >
                                    <div
                                      className="row bottom_border"
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <div>
                                        <a onClick={() => AddVideo()}>
                                          <div className="col-md-2">
                                            <div>
                                              <img
                                                className=""
                                                src="dist/img/YouTube.png"
                                                style={{
                                                  height: "18px",
                                                  width: "21px",
                                                }}
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-6">
                                            <div>
                                              <p
                                                className="eleven_font_class"
                                                style={{
                                                  color: "#1F3977",
                                                }}
                                              >
                                                Add Video
                                              </p>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                    <div
                                      className="row bottom_border"
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <div>
                                        <a onClick={() => AddAward()}>
                                          <div className="col-md-2">
                                            <div>
                                              <img
                                                className=""
                                                src="dist/img/Prize.png"
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div>
                                              <p
                                                className="eleven_font_class"
                                                style={{
                                                  color: "#1F3977",
                                                }}
                                              >
                                                Add Award
                                              </p>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            CreatePost();
                          }}
                          style={{
                            background: "#000000",
                            border: "1px solid #1E1E1E",
                            fontSize: "10px",
                            fontWeight: "400",
                            height: "31px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            width: "130px",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "15px",
                          }}
                        >
                          Create a post
                        </button>
                      </div>

                      <div
                        className="modal fade add_video_modal"
                        id="deleteModal"
                        style={{
                          background: "rgba(243, 242, 239, 0.60)",
                          opacity: "1",
                        }}
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          style={{ maxWidth: "600px", paddingTop: "200px" }}
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title feed_font_class2"
                                id="exampleModalLabel"
                              >
                                Add to profile
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={closeAddVideoModal}
                              >
                                <img
                                  className=""
                                  src="dist/img/feed_cancel.png"
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </button>
                            </div>
                            <div className="modal-body">
                              <div
                                className=""
                                style={{ paddingBottom: "30px" }}
                              >
                                <div
                                  className="row "
                                  style={{ padding: "8px 0px" }}
                                >
                                  <div>
                                    <div className="col-md-2">
                                      <div>
                                        <img
                                          className=""
                                          src="dist/img/YouTube.png"
                                          style={{
                                            height: "18px",
                                            width: "21px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div>
                                        <p
                                          className="eleven_font_class"
                                          style={{
                                            color: "#1F3977",
                                          }}
                                        >
                                          Add Video
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="row"
                                  style={{ marginTop: "6px" }}
                                >
                                  <div className="col-md-12">
                                    <div>
                                      <label
                                        className="border_class2 "
                                        for="award_video"
                                        style={{
                                          width: "100%",
                                          height: "200px",
                                        }}
                                      >
                                        <div
                                          className="default_video_div"
                                          style={{
                                            height: "200px",
                                            display: "flex",
                                            alignItems: "center",
                                            background: "#D9D9D94D",
                                            justifyContent: "center",
                                            color: "#2966BC",
                                            fontSize: "12px",
                                          }}
                                        >
                                          Select video to share
                                        </div>

                                        <video
                                          controls
                                          id="award_video-preview"
                                          style={{
                                            height: "200px",
                                            width: "530px",
                                            padding: "5px",
                                            display: "none",
                                            borderRadius: "5px",
                                          }}
                                        />
                                      </label>
                                      <div
                                        class="award_video"
                                        style={{ display: "none" }}
                                      >
                                        <h4
                                          class="login-text"
                                          style={{
                                            color: "red",
                                            fontSize: "10PX",
                                            marginLeft: "0",
                                          }}
                                        >
                                          Please Select video to share
                                        </h4>
                                      </div>

                                      <div>
                                        <input
                                          type="file"
                                          name="file"
                                          accept="video/*"
                                          onChange={addAwardVideo}
                                          style={{ visibility: "hidden" }}
                                          multiple
                                          id="award_video"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-mg-12">
                                    <div>
                                      <input
                                        id="award_text"
                                        className="all_inputs"
                                        type="text"
                                        placeholder="Write something.."
                                        value={awardVideoText}
                                        onChange={(e) =>
                                          setAwardVideoText(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div
                                      class="award_text"
                                      style={{ display: "none" }}
                                    >
                                      <h4
                                        class="login-text"
                                        style={{
                                          color: "red",
                                          fontSize: "10PX",
                                          marginLeft: "0",
                                        }}
                                      >
                                        Please Write Something Here..
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-mg-12">
                                    <div style={{ marginTop: "10px" }}>
                                      <button
                                        onClick={() => {
                                          addvideoInAward();
                                        }}
                                        style={{
                                          background: "#000000",
                                          color: "#ffffff",
                                          padding: "4px",
                                          borderRadius: "3px",
                                          width: "100%",
                                          fontSize: "10px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        Publish
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="modal fade add_award_modal"
                        id="deleteModal"
                        style={{
                          background: "rgba(243, 242, 239, 0.60)",
                          opacity: "1",
                        }}
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          style={{ maxWidth: "600px", paddingTop: "200px" }}
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title feed_font_class2"
                                id="exampleModalLabel"
                              >
                                Add to profile
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={closeAddAwardModal}
                              >
                                <img
                                  className=""
                                  src="dist/img/feed_cancel.png"
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </button>
                            </div>
                            <div className="modal-body">
                              <div
                                className=""
                                style={{ paddingBottom: "25px" }}
                              >
                                <div
                                  className="row "
                                  style={{ padding: "8px 0px" }}
                                >
                                  <div>
                                    <div className="col-md-2">
                                      <div>
                                        <img
                                          className=""
                                          src="dist/img/Prize.png"
                                          style={{
                                            height: "18px",
                                            width: "18px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div>
                                        <p
                                          className="eleven_font_class"
                                          style={{
                                            color: "#1F3977",
                                          }}
                                        >
                                          Add Award
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ padding: "10px 30px 0px 30px" }}>
                                  <div className="row">
                                    <div
                                      class="col-md-6"
                                      style={{ padding: "0 50px 0px 0px" }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          width: "100%",
                                          marginTop: "0px",
                                        }}
                                      >
                                        <div className="d-flex">
                                          <label
                                            style={{
                                              color: "#1F3977",
                                              fontSize: "10px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {" "}
                                            Photo
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

                                        <label
                                          style={{ height: "160px" }}
                                          for="award_image"
                                          class="file-ip-1 x"
                                        >
                                          <img
                                            class="award_default_image "
                                            src="dist/img/event_photo.png"
                                            id="image-logo"
                                            style={{ height: "148px" }}
                                          />

                                          <img
                                            id="award_image-preview"
                                            style={{
                                              display: "none",
                                              width: "100%",
                                              height: "145px",
                                            }}
                                          />
                                        </label>
                                        <div
                                          class="award_photo"
                                          style={{ display: "none" }}
                                        >
                                          <h4
                                            class="login-text"
                                            style={{
                                              color: "red",
                                              fontSize: "10PX",
                                              marginLeft: "0",
                                            }}
                                          >
                                            Please Select Award Image
                                          </h4>
                                        </div>
                                        <input
                                          type="file"
                                          name="photo"
                                          style={{
                                            visibility: "hidden",
                                            display: "none",
                                          }}
                                          accept="image/png, image/gif, image/jpeg"
                                          onChange={getAwardImage}
                                          multiple
                                          id="award_image"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="d-flex">
                                      <label
                                        style={{
                                          color: "#1F3977",
                                          fontSize: "10px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Award Name
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
                                    <div>
                                      <input
                                        className="all_inputs"
                                        type="name"
                                        id="award_name"
                                        value={awardName}
                                        onChange={(e) =>
                                          setAwardName(e.target.value)
                                        }
                                        autoComplete="true"
                                      />

                                      <div
                                        class="award_name"
                                        style={{ display: "none" }}
                                      >
                                        <h4
                                          class="login-text"
                                          style={{
                                            color: "red",
                                            fontSize: "10PX",
                                            marginLeft: "0",
                                          }}
                                        >
                                          Please Enter Award Name
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{ marginTop: "10px" }}>
                                    <div className="d-flex">
                                      <label
                                        style={{
                                          color: "#1F3977",
                                          fontSize: "10px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Award Description
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
                                    <div>
                                      <textarea
                                        className="all_inputs"
                                        name="description"
                                        id="award_description"
                                        value={awardDescription}
                                        onChange={(e) =>
                                          setAwardDescription(e.target.value)
                                        }
                                        autoComplete="true"
                                        style={{ height: "120px" }}
                                      />

                                      <div
                                        class="award_description"
                                        style={{ display: "none" }}
                                      >
                                        <h4
                                          class="login-text"
                                          style={{
                                            color: "red",
                                            fontSize: "10PX",
                                            marginLeft: "0",
                                          }}
                                        >
                                          Please Enter Award Description
                                        </h4>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="">
                                    <div className="">
                                      <div style={{ marginTop: "10px" }}>
                                        <button
                                          onClick={() => {
                                            AddAwardList();
                                          }}
                                          style={{
                                            background: "#000000",
                                            color: "#ffffff",
                                            padding: "4px",
                                            borderRadius: "3px",
                                            width: "100%",
                                            fontSize: "10px",
                                            fontWeight: "500",
                                          }}
                                        >
                                          Publish
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="modal fade create_post_new_modal"
                        id="deleteModal"
                        style={{
                          background: "rgba(243, 242, 239, 0.60)",
                          opacity: "1",
                        }}
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          style={{ maxWidth: "600px", paddingTop: "200px" }}
                        >
                          <div className="modal-content">
                            <div
                              className="modal-header"
                              style={{ padding: "8px 18px 4px 35px" }}
                            >
                              <h5
                                className="modal-title feed_font_class2"
                                id="exampleModalLabel"
                              >
                                Create Post
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={closeCreatePostModal}
                              >
                                <img
                                  className=""
                                  src="dist/img/feed_cancel.png"
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </button>
                            </div>
                            <div className="modal-body">
                              <div
                                className=""
                                style={{ padding: "10px 30px 30px 30px" }}
                              >
                                <div
                                  className="d-flex"
                                  style={{ marginBottom: "10px" }}
                                >
                                  <div className=" ">
                                    {uni.map((e) => {
                                      return (
                                        <img
                                          className="modal_image"
                                          src={e.profile}
                                          style={{
                                            height: "40px",
                                            width: "40px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      );
                                    })}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: "600",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {uni.map((item) => {
                                      const f_letters = item.campus_name
                                        .split(" ")
                                        .map((f) => f.charAt(0).toUpperCase());
                                      return (
                                        <>
                                          <p className="feed_font_class2">
                                            {item.campus_name}{" "}
                                            <p>({f_letters.join("")})</p>
                                          </p>
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div>
                                  <div></div>
                                  <textarea
                                    id="post_description"
                                    className="all_inputs"
                                    value={postDescription}
                                    onChange={(e) =>
                                      setPostDescriptionFunction(e.target.value)
                                    }
                                    placeholder="Write Somthing.."
                                    style={{
                                      height: "100px",
                                      background: "#D9D9D91A",
                                    }}
                                  />

                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      minHeight: "144px",
                                    }}
                                  >
                                    <div
                                      className="row"
                                      style={{ justifyContent: "center" }}
                                    >
                                      {postImage &&
                                        postImage.map((_img) =>
                                          postImage.length == 1 ? (
                                            <div className="col-md-12 p-0">
                                              <div>
                                                <img
                                                  className="feed_imgs_size"
                                                  style={{ height: "150px" }}
                                                  src={_img}
                                                />
                                              </div>
                                            </div>
                                          ) : postImage.length == 2 ? (
                                            <div
                                              className="col-md-6"
                                              style={{ padding: "2px 3px" }}
                                            >
                                              <div>
                                                <img
                                                  className="feed_imgs_size"
                                                  style={{ height: "140px" }}
                                                  src={_img}
                                                />
                                              </div>
                                            </div>
                                          ) : postImage.length == 3 ? (
                                            <div
                                              className="col-md-4"
                                              style={{ padding: "2px 3px" }}
                                            >
                                              <div>
                                                <img
                                                  className="feed_imgs_size"
                                                  style={{ height: "140px" }}
                                                  src={_img}
                                                />
                                              </div>
                                            </div>
                                          ) : postImage.length == 4 ? (
                                            <div
                                              className="col-md-6"
                                              style={{ padding: "2px 3px" }}
                                            >
                                              <div>
                                                <img
                                                  className="feed_imgs_size"
                                                  style={{ height: "100px" }}
                                                  src={_img}
                                                />
                                              </div>
                                            </div>
                                          ) : postImage.length == 5 ? (
                                            <div
                                              className="col-md-4"
                                              style={{ padding: "2px 3px" }}
                                            >
                                              <div>
                                                <img
                                                  className="feed_imgs_size"
                                                  style={{ height: "100px" }}
                                                  src={_img}
                                                />
                                              </div>
                                            </div>
                                          ) : (
                                            <></>
                                          )
                                        )}
                                    </div>
                                  </div>

                                  <div
                                    class="post_description"
                                    style={{
                                      marginTop: "-6px",
                                      display: "none",
                                      marginBottom: "12px",
                                    }}
                                  >
                                    <h4
                                      class="login-text"
                                      style={{
                                        color: "red",
                                        fontSize: "10PX",
                                        marginLeft: "0",
                                      }}
                                    >
                                      Please write something here
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  className="border_class2"
                                  style={{ padding: "10px" }}
                                >
                                  <div className="d-flex">
                                    <div
                                      className="row"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div className="col-md-4">
                                        <p
                                          className="ten_font_class"
                                          style={{
                                            color: "#1F3977",
                                          }}
                                        >
                                          Add To Your Post
                                        </p>
                                      </div>
                                      <div className="col-md-8">
                                        <div
                                          className="d-flex"
                                          style={{
                                            justifyContent: "end",
                                            gap: "10px",
                                            alignItems: "center",
                                          }}
                                        >
                                          <label
                                            for="post_image"
                                            style={{ margin: "0px" }}
                                          >
                                            <img
                                              className="add_post_image"
                                              type="file"
                                              src="dist/img/AddImage.png"
                                              style={{
                                                height: "20px",
                                                width: "20px",
                                              }}
                                            />
                                          </label>
                                          <input
                                            type="file"
                                            name="photo"
                                            style={{
                                              visibility: "hidden",
                                              display: "none",
                                            }}
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={getPostedImage}
                                            multiple
                                            id="post_image"
                                          />

                                          <div
                                            id="add_post_image_contener"
                                            className="border_class2 add_post_image_contener"
                                          >
                                            <p> Add a photo</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div style={{ marginTop: "10px" }}>
                                  <button
                                    onClick={() => {
                                      createPost();
                                    }}
                                    className={
                                      isPublished
                                        ? "feed_publish_btn_enabled"
                                        : "feed_publish_btn_disabled"
                                    }
                                    disabled={!isPublished}
                                  >
                                    Publish
                                  </button>
                                </div>

                                <div
                                  className="empty_fields"
                                  style={{ display: "none" }}
                                >
                                  <p
                                    className="all_validations_h4"
                                    style={{ marginTop: "5px" }}
                                  >
                                    Write Something or add Images
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  className="feed_font_class"
                  style={{ margin: "10px 40px", fontSize: "9px" }}
                >
                  Campus feed
                </p>

                <div
                  className="bg-white"
                  style={{
                    borderRadius: "5px",
                    padding: "30px 250px 30px 30px",
                  }}
                >
                  {feedData.map((f_data) => {
                    // const f_letters = f_data.camp_name
                    //   .split(" ")
                    //   .map((f) => f.charAt(0).toUpperCase());

                    let img_count = f_data.feed_imgs.length;

                    return (
                      <>
                        <div
                          className="border_class2"
                          style={{ marginBottom: "10px" }}
                        >
                          <div
                            className="bottom_border"
                            style={{
                              paddingLeft: "30px",
                              height: "50px",
                              display: "flex",
                              alignItems: "center",
                              fontSize: "10px",
                            }}
                          >
                            <div className="d-flex">
                              <p>Posted by</p>
                              <p
                                style={{ marginLeft: "7px", fontWeight: "600" }}
                              >
                                {f_data.posted_by}{" "}
                              </p>
                              <p style={{ margin: "0px 10px" }}>|</p>
                              <p>{f_data.posted_date}</p>
                            </div>
                          </div>
                          <div style={{ margin: "30px" }}>
                            <div style={{ display: "flex" }}>
                              <div className="row">
                                <div className="col-md-8 p-0">
                                  <div
                                    style={{
                                      display: "flex",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <div>
                                      <img
                                        style={{
                                          width: "45px",
                                          height: "45px",
                                          background: "#F1F1F1",
                                          borderRadius: "5px",
                                        }}
                                        src={f_data.camp_profile}
                                      />
                                    </div>

                                    <div style={{ marginLeft: "15px" }}>
                                      <p
                                        className="feed_font_class"
                                        style={{
                                          marginTop: "0px",
                                          display: "inline-flex",
                                          gap: "5px",
                                        }}
                                      >
                                        {f_data.camp_name}{" "}
                                        {/* <p>({f_letters.join("")})</p> */}
                                      </p>
                                      <p style={{ fontSize: "12px" }}>
                                        {f_data.p_time}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4 p-0">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <button
                                      onClick={() =>
                                        openEditDeleteModal(f_data.feed_id)
                                      }
                                      style={{
                                        border: "none",
                                        background: "#ffffff",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                        }}
                                        src="dist/img/Ellipsis.png"
                                      />
                                    </button>
                                  </div>

                                  {/* Edit delete modal */}
                                  <div
                                    className={`add_students_modal1 add_students_modal${f_data.feed_id}`}
                                    id="add_students_modal"
                                    style={{
                                      display: "none",
                                      position: "absolute",
                                      top: "23px",
                                      right: "0px",
                                      width: "200px",
                                      padding: "0px",
                                      zIndex: "9999",
                                    }}
                                  >
                                    <div className="d-flex p-1">
                                      <img
                                        className="ml-auto"
                                        onClick={() =>
                                          closeEditDeleteModal(f_data.feed_id)
                                        }
                                        src="dist/img/feed_cancel.png"
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      />
                                    </div>
                                    <div
                                      className=" hover_class "
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <div
                                        onClick={() =>
                                          openEditPostModal(f_data.feed_id)
                                        }
                                        className="row"
                                        style={{ padding: "10px 0px" }}
                                      >
                                        <div
                                          className="col-md-4 feed_image_div"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <img
                                            className="modal_image"
                                            src="dist/img/Edit.png"
                                          />
                                        </div>
                                        <div
                                          className="col-md-8 "
                                          style={{ cursor: "pointer" }}
                                        >
                                          <p className="feed_font_class2">
                                            Edit Post
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className=" hover_class "
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <div
                                        className="row"
                                        onClick={() =>
                                          openDeletePostModal(f_data.feed_id)
                                        }
                                        style={{ padding: "10px 0px" }}
                                      >
                                        <div
                                          className="col-md-4 feed_image_div"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <img
                                            className="modal_image"
                                            src="dist/img/feedDelete.png"
                                          />
                                        </div>
                                        <div
                                          className="col-md-8"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <p className="feed_font_class2">
                                            Delete Post
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* End edit delete modal */}

                                  {/* Edit post modal */}
                                  <div
                                    className={`edit_post_modal1 edit_post_modal${f_data.feed_id}`}
                                    id="add_students_modal"
                                    style={{
                                      display: "none",
                                      position: "absolute",
                                      top: "23px",
                                      right: "0px",
                                      width: "360px",
                                      padding: "0px",
                                      zIndex: "9999",
                                    }}
                                  >
                                    <div className="d-flex p-1">
                                      <img
                                        className="ml-auto"
                                        onClick={() =>
                                          closeEditPostModal(f_data.feed_id)
                                        }
                                        src="dist/img/feed_cancel.png"
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      />
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="d-flex">
                                          <p className="lable_font_size">
                                            Description
                                          </p>
                                        </div>
                                        <div>
                                          <textarea
                                            className="all_inputs"
                                            value={editPostDescription}
                                            onChange={(e) =>
                                              setEditPostDescription(
                                                e.target.value
                                              )
                                            }
                                            autoComplete="true"
                                            style={{ height: "150px" }}
                                          />
                                        </div>
                                      </div>

                                      {/* <div class="col-md-12">
                                        <div
                                          className=""
                                          style={{
                                            width: "100%",
                                            marginTop: "0px",
                                          }}
                                        >
                                          <div className="d-flex">
                                            <p
                                              className="lable_font_size"
                                              style={{ margin: "10px 0px" }}
                                            >
                                              Post Images
                                            </p>
                                          </div>
                                          {editPostImg == null ? (
                                            <div>
                                              <label
                                                for="edit_post_images"
                                                class=" border_class2"
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  height: "125px",
                                                  width: "125px",
                                                }}
                                              >
                                                <img
                                                  class="default_post_img "
                                                  src="dist/img/add_image.png"
                                                  id="comp_logo"
                                                  style={{
                                                    width: "30px",
                                                    height: "30px",
                                                  }}
                                                />

                                                <img
                                                  className=""
                                                  id="edit_post_images_preview"
                                                  style={{
                                                    display: "none",
                                                    width: "115px",
                                                    height: "115px",
                                                    borderRadius: "5px",
                                                  }}
                                                />
                                              </label>

                                              <input
                                                type="file"
                                                name="photo"
                                                style={{
                                                  visibility: "hidden",
                                                  display: "none",
                                                }}
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={getEditPostImg}
                                                multiple
                                                id="edit_post_images"
                                              />
                                            </div>
                                          ) : (
                                            <div
                                              className=""
                                              style={{
                                                width: "100%",
                                                marginTop: "0px",
                                              }}
                                            >
                                              <label
                                                for="edit_post_images"
                                                style={{
                                                  display: "flex",
                                                  height: "100%",
                                                }}
                                              >
                                                {editPostImg.map((e) => {
                                                  return (
                                                    <div
                                                      style={{ margin: "2px" }}
                                                    >
                                                      <img
                                                        class="default_post_img "
                                                        src={e.feed_img}
                                                        id=""
                                                        style={{
                                                          width: "100px",
                                                          height: "70px",
                                                        }}
                                                      />
                                                    </div>
                                                  );
                                                })}

                                                <img
                                                  className="edit_post_photo"
                                                  id="edit_post_images_preview"
                                                  style={{
                                                    display: "none",
                                                    width: "100px",
                                                    height: "70px",
                                                  }}
                                                />
                                              </label>

                                              <input
                                                type="file"
                                                name="photo"
                                                style={{
                                                  visibility: "hidden",
                                                  display: "none",
                                                }}
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={getEditPostImg}
                                                multiple
                                                id="edit_post_images"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div> */}
                                      <div className="col-md-12">
                                        <div className="d-flex mt-4 mb-2 feed_edit_buttons_div border_class2">
                                          <a
                                            onClick={() =>
                                              closeEditPostModal(f_data.feed_id)
                                            }
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
                                            style={{
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <input
                                              type="button"
                                              className="edit_update_button"
                                              id="delete_single_student"
                                              value="Update"
                                              onClick={() => editPostFun()}
                                            />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* End edit delete modal */}

                                  <div
                                    className="modal fade delete_post_new_modal"
                                    id="deleteModal"
                                    style={{ opacity: "1" }}
                                  >
                                    <div className="modal-dialog modal-dialog-centered">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title"
                                            id="exampleModalLabel"
                                          >
                                            Delete Post
                                          </h5>
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            onClick={close_delete_modal}
                                          >
                                            <span aria-hidden="true">
                                              &times;
                                            </span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <p className="pl-3 pb-2">
                                            Are you sure you want to delete this
                                            post?
                                          </p>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="create_btn"
                                            onClick={close_delete_modal}
                                            style={{
                                              borderRadius: "5px",
                                              backgroundColor: "#c4c4c4",
                                              fontSize: "13PX",
                                              padding: "8px 12px",
                                              fontWeight: "600",
                                              color: "black",
                                            }}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className=" create_btn"
                                            onClick={() => deletePostFun()}
                                            style={{
                                              borderRadius: "5px",
                                              marginRight: "7px",
                                              backgroundColor: "#d21f3c",
                                              fontSize: "13PX",
                                              padding: "8px 12px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div style={{ fontSize: "10px" }}>
                              {f_data.f_description}
                            </div>
                          </div>
                          {img_count == 1 ? (
                            <div className="mt-4">
                              <div className="row">
                                <div className="col-md-12">
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      style={{ height: "250px" }}
                                      src={f_data.feed_imgs[0].feed_img}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : img_count == 2 ? (
                            <div className="mt-4">
                              <div className="row">
                                <div
                                  className="col-md-6"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      style={{ height: "140px" }}
                                      src={f_data.feed_imgs[0].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-6"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      style={{ height: "140px" }}
                                      src={f_data.feed_imgs[1].feed_img}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : img_count == 3 ? (
                            <div className="mt-4">
                              <div className="row">
                                <div
                                  className="col-md-4"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      style={{ height: "100px" }}
                                      src={f_data.feed_imgs[0].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-4"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      style={{ height: "100px" }}
                                      src={f_data.feed_imgs[1].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-4"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      style={{ height: "100px" }}
                                      src={f_data.feed_imgs[2].feed_img}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : img_count == 4 ? (
                            <div className="mt-4">
                              <div
                                className="row"
                                style={{ justifyContent: "center" }}
                              >
                                <div
                                  className="col-md-6"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[0].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-6"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[1].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-6 mt-2"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[2].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-6 mt-2"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[3].feed_img}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : img_count == 5 ? (
                            <div className="mt-4">
                              <div
                                className="row"
                                style={{ justifyContent: "center" }}
                              >
                                <div
                                  className="col-md-4"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div style={{ width: "100%" }}>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[0].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-4"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[1].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-4"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[2].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-6 mt-2"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[3].feed_img}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-6 mt-2"
                                  style={{ padding: "2px 3px" }}
                                >
                                  <div>
                                    <img
                                      className="feed_imgs_size"
                                      src={f_data.feed_imgs[4].feed_img}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}

                          <div className="row bottom_border">
                            <div style={{ padding: "15px" }}>
                              <div className="col-md-6 p-0">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    <img
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        background: "#96B0E7",
                                        padding: "4px",
                                        borderRadius: "50%",
                                      }}
                                      src="dist/img/feedHeart.png"
                                    />
                                  </div>
                                  <div
                                    className="d-flex eleven_font_class"
                                    style={{ marginLeft: "15px", gap: "6px" }}
                                  >
                                    {" "}
                                    {f_data.like_string}
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 p-0">
                                <button
                                  className="eleven_font_class"
                                  style={{
                                    display: "flex",
                                    cursor: "pointer",
                                    background: "#ffffff",
                                    border: "none",
                                  }}
                                  onClick={() =>
                                    openCommentSection(f_data.feed_id)
                                  }
                                >
                                  <div> {f_data.total_cmts}</div>
                                  <p style={{ marginLeft: "10px" }}>Comments</p>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div
                            className="row bottom_border eleven_font_class"
                            style={{
                              padding: "7px 15px",
                              borderRadius: "5px",
                              alignItems: "center",
                            }}
                          >
                            <div className="col-md-3 p-0">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <img
                                    style={{
                                      width: "27px",
                                      height: "27px",
                                      borderRadius: "50%",
                                    }}
                                    src={f_data.camp_profile}
                                  />
                                </div>

                                <button
                                  onClick={() =>
                                    onLikeClick(f_data.feed_id, f_data.you_like)
                                  }
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    border: "none",
                                    background: "#ffffff",
                                    alignItems: "center",
                                  }}
                                >
                                  {f_data.you_like == 0 ? (
                                    <div>
                                      <img
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                        src="dist/img/white_heart1.png"
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      <img
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                        src="dist/img/feedHeart.png"
                                      />
                                    </div>
                                  )}

                                  <p style={{ fontWeight: "500" }}>Like</p>
                                </button>
                              </div>
                            </div>

                            <div className="col-md-4 p-0">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    openCommentSection(f_data.feed_id, f_data)
                                  }
                                  style={{
                                    border: "none",
                                    background: "#ffffff",
                                    fontWeight: "500",
                                  }}
                                >
                                  Comment
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Comment Section */}

                          <section
                            className={`all_comment_section comment_section${f_data.feed_id}`}
                            id="comment_section"
                          >
                            <div className="container-fluid ">
                              <div
                                className="row"
                                style={{ width: "100%", display: "flex" }}
                              >
                                {/* <div style={{ padding: "10px" }}>
                                  <div className="mt-2">
                                    <p> Reactions</p>
                                  </div>


                                  <div
                                    className="mt-2"
                                    style={{
                                      display: "none",
                                      fontSize: "14px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <p>No Data To Display</p>
                                  </div>

                                  <div
                                    className="mt-2 m-0"
                                    style={{ display: "flex", gap: "10px" }}
                                  >
                                    <div
                                      className="col-md-1 mt-2 p-0"
                                      style={{ marginBottom: "5px" }}
                                    >
                                      <div className="d-flex">
                                        <div>
                                          <div style={{ borderRadius: "50%" }}>
                                            <img
                                              src={require("../images/user8.jpg")}
                                              alt="no image"
                                              style={{
                                                borderRadius: "50%",
                                                width: "70px",
                                                height: "70px",
                                              }}
                                            />
                                          </div>
                                        </div>

                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "44px",
                                            left: "47px",
                                          }}
                                        >
                                          <img
                                            className="heart_image"
                                            style={{ height: "20px" }}
                                            src="dist/img/feedHeart.png"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-1 mt-2 p-0">
                                      <div
                                        style={{
                                          background: "#ffffff",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: "70px",
                                          width: "70px",
                                          borderRadius: "50%",
                                          border: "1px solid",
                                        }}
                                      >
                                        <img
                                          src="dist/img/Ellipsis.png"
                                          alt="no image"
                                          style={{
                                            borderRadius: "50%",
                                            width: "32px",
                                            height: "32px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div> */}

                                {mainCommentData == null ? (
                                  <></>
                                ) : (
                                  <>
                                    {mainCommentData.map((c_data) => {
                                      return (
                                        <>
                                          <div className="mt-4 p-0">
                                            <div className="row">
                                              <div className="d-flex p-0">
                                                {c_data.user_image == "" ? (
                                                  <>
                                                    <div className="col-md-1 p-0">
                                                      <div
                                                        className=" p-0"
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            borderRadius: "50%",
                                                          }}
                                                        >
                                                          <img
                                                            src={require("../images/user6.jpg")}
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                              width: "40px",
                                                              height: "40px",
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <>
                                                    <div className="col-md-1 p-0">
                                                      <div
                                                        className=" p-0"
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            borderRadius: "50%",
                                                          }}
                                                        >
                                                          <img
                                                            src={
                                                              c_data.user_image
                                                            }
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                              width: "40px",
                                                              height: "40px",
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                )}

                                                <div className="col-md-11 p-0">
                                                  <div
                                                    style={{
                                                      padding: "0px 15px",
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        background: "#D8D8D866",
                                                        padding: "10px",
                                                        borderRadius: "3px",
                                                        width: "100%",
                                                      }}
                                                    >
                                                      <div className="row">
                                                        <div className="d-flex p-0">
                                                          <div className="col-md-8 p-0">
                                                            <div>
                                                              <p className="feed_font_class2">
                                                                {
                                                                  c_data.full_name
                                                                }
                                                              </p>
                                                            </div>
                                                            <div className="d-flex feed_comment_nine_class">
                                                              <p>
                                                                {
                                                                  c_data.course_name
                                                                }
                                                              </p>
                                                              <p>@</p>
                                                              <p>
                                                                {
                                                                  c_data.campus_name
                                                                }
                                                              </p>
                                                            </div>
                                                          </div>

                                                          <div className="col-md-4 p-0 feed_comment_nine_class">
                                                            <div
                                                              style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                  "end",
                                                              }}
                                                            >
                                                              <p>
                                                                {
                                                                  c_data.time_ago
                                                                }
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div className="mt-2">
                                                        <div className="row">
                                                          <div className="col-md-12 p-0">
                                                            <div>
                                                              <p className="comment_font">
                                                                {c_data.comment}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="p-0 "
                                                    style={{
                                                      margin: "2px  20px",
                                                    }}
                                                  >
                                                    <div
                                                      className="d-flex"
                                                      style={{
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      <button
                                                        onClick={() => {
                                                          mainCommentLikeClick(
                                                            c_data.comment_id
                                                          );
                                                        }}
                                                        style={{
                                                          display: "flex",
                                                          gap: "10px",
                                                          border: "none",
                                                          background: "#ffffff",
                                                        }}
                                                      >
                                                        {c_data.you_like ==
                                                        0 ? (
                                                          <div>
                                                            <img
                                                              style={{
                                                                width: "17px",
                                                                height: "17px",
                                                              }}
                                                              src="dist/img/white_heart1.png"
                                                            />
                                                          </div>
                                                        ) : (
                                                          <div>
                                                            <img
                                                              className="heart_image"
                                                              src="dist/img/feedHeart.png"
                                                            />
                                                          </div>
                                                        )}
                                                      </button>
                                                      <div
                                                        style={{
                                                          marginLeft: "15px",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "7px",
                                                          }}
                                                        >
                                                          <p
                                                            className="comment_font d-flex"
                                                            style={{
                                                              alignItems:
                                                                "center",
                                                            }}
                                                          >
                                                            {c_data.total_likes}
                                                          </p>
                                                          <p
                                                            style={{
                                                              margin: "0 10px",
                                                            }}
                                                          >
                                                            |
                                                          </p>
                                                          <button
                                                            onClick={() =>
                                                              openInnerCommentSection(
                                                                f_data.feed_id,
                                                                c_data.comment_id,
                                                                c_data.full_name
                                                              )
                                                            }
                                                            style={{
                                                              display: "flex",
                                                              cursor: "pointer",
                                                              border: "none",
                                                              background:
                                                                "#ffffff",
                                                              alignItems:
                                                                "center",
                                                            }}
                                                          >
                                                            <div>
                                                              <div className="d-flex comment_font align-items-center">
                                                                {
                                                                  c_data.sub_comments_count
                                                                }
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <div
                                                                className="comment_font"
                                                                style={{
                                                                  marginLeft:
                                                                    "5px",
                                                                }}
                                                              >
                                                                Reply
                                                              </div>
                                                            </div>
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* Inner comment */}

                                                  {c_data.sub_comments.length >
                                                  0 ? (
                                                    <>
                                                      {c_data.sub_comments.map(
                                                        (item, index) => {
                                                          // console.log("sub comment you_like----------",item.you_like)
                                                          return (
                                                            <div className="mt-4 p-0 inner_comment_section ">
                                                              <div className="row">
                                                                {item.sub_user_image ==
                                                                null ? (
                                                                  <div className="col-md-1 p-0">
                                                                    <div
                                                                      className=" p-0"
                                                                      style={{
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          borderRadius:
                                                                            "50%",
                                                                        }}
                                                                      >
                                                                        <img
                                                                          src={require("../images/user7-128x128.jpg")}
                                                                          style={{
                                                                            borderRadius:
                                                                              "50%",
                                                                            width:
                                                                              "40px",
                                                                            height:
                                                                              "40px",
                                                                          }}
                                                                        />
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                ) : (
                                                                  <div className="col-md-1 p-0">
                                                                    <div
                                                                      className=" p-0"
                                                                      style={{
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          borderRadius:
                                                                            "50%",
                                                                        }}
                                                                      >
                                                                        <img
                                                                          src={
                                                                            item.sub_user_image
                                                                          }
                                                                          style={{
                                                                            borderRadius:
                                                                              "50%",
                                                                            width:
                                                                              "40px",
                                                                            height:
                                                                              "40px",
                                                                          }}
                                                                        />
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                )}
                                                                <div className="col-md-11 p-0">
                                                                  <div
                                                                    style={{
                                                                      padding:
                                                                        "0px 13px",
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        background:
                                                                          "#D8D8D866",
                                                                        padding:
                                                                          "10px",
                                                                        borderRadius:
                                                                          "3px",
                                                                        width:
                                                                          "100%",
                                                                      }}
                                                                    >
                                                                      <div className="row">
                                                                        <div className="d-flex p-0">
                                                                          <div className="col-md-8 p-0">
                                                                            <div>
                                                                              <p className="feed_font_class2">
                                                                                {
                                                                                  item.sub_full_name
                                                                                }
                                                                              </p>
                                                                            </div>
                                                                            <div className="d-flex feed_comment_nine_class">
                                                                              <p>
                                                                                {
                                                                                  item.sub_course_name
                                                                                }
                                                                              </p>
                                                                              <p>
                                                                                @
                                                                              </p>
                                                                              <p>
                                                                                {
                                                                                  item.sub_campus_name
                                                                                }
                                                                              </p>
                                                                            </div>
                                                                          </div>

                                                                          <div className="col-md-4 p-0 feed_comment_nine_class">
                                                                            <div
                                                                              style={{
                                                                                display:
                                                                                  "flex",
                                                                                justifyContent:
                                                                                  "end",
                                                                              }}
                                                                            >
                                                                              <p>
                                                                                {
                                                                                  item.sub_time_ago
                                                                                }
                                                                              </p>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>

                                                                      <div className="mt-2">
                                                                        <div className="row">
                                                                          <div className="col-md-12 p-0">
                                                                            <div>
                                                                              <p className="comment_font">
                                                                                {
                                                                                  item.sub_comment
                                                                                }
                                                                              </p>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>

                                                                  <div
                                                                    className="p-0 "
                                                                    style={{
                                                                      margin:
                                                                        "2px  20px",
                                                                    }}
                                                                  >
                                                                    <div className="d-flex">
                                                                      <button
                                                                        onClick={() => {
                                                                          commentReplayLikeClick(
                                                                            item.sub_comment_id
                                                                          );
                                                                        }}
                                                                        style={{
                                                                          display:
                                                                            "flex",
                                                                          gap:
                                                                            "10px",
                                                                          border:
                                                                            "none",
                                                                          background:
                                                                            "#ffffff",
                                                                        }}
                                                                      >
                                                                        {item.you_like ==
                                                                        0 ? (
                                                                          <div>
                                                                            <img
                                                                              style={{
                                                                                width:
                                                                                  "17px",
                                                                                height:
                                                                                  "17px",
                                                                              }}
                                                                              src="dist/img/white_heart1.png"
                                                                            />
                                                                          </div>
                                                                        ) : (
                                                                          <div>
                                                                            <img
                                                                              className="heart_image"
                                                                              src="dist/img/feedHeart.png"
                                                                            />
                                                                          </div>
                                                                        )}
                                                                      </button>
                                                                      <div
                                                                        style={{
                                                                          marginLeft:
                                                                            "15px",
                                                                        }}
                                                                      >
                                                                        <div
                                                                          style={{
                                                                            display:
                                                                              "flex",
                                                                            gap:
                                                                              "7px",
                                                                          }}
                                                                        >
                                                                          <div className="d-flex comment_font align-items-center">
                                                                            {
                                                                              item.total_likes
                                                                            }
                                                                          </div>
                                                                          <div
                                                                            style={{
                                                                              margin:
                                                                                "0 10px",
                                                                            }}
                                                                          >
                                                                            |
                                                                          </div>
                                                                          <div
                                                                            style={{
                                                                              display:
                                                                                "flex",
                                                                              cursor:
                                                                                "pointer",
                                                                            }}
                                                                          >
                                                                            <button
                                                                              onClick={() =>
                                                                                openInnerCommentSection(
                                                                                  f_data.feed_id,
                                                                                  c_data.comment_id,
                                                                                  item.sub_full_name
                                                                                )
                                                                              }
                                                                              style={{
                                                                                border:
                                                                                  "none",
                                                                                background:
                                                                                  "#ffffff",
                                                                              }}
                                                                            >
                                                                              <p className="comment_font">
                                                                                Reply
                                                                              </p>
                                                                            </button>
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
                                                      )}
                                                    </>
                                                  ) : null}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </>
                                )}
                              </div>

                              {/* Reply inbox */}

                              <div className="mt-1 p-0 main_comment_reply">
                                <div className="row">
                                  <div className="col-md-9">
                                    <div className="d-flex main_comment">
                                      <div
                                        type="text"
                                        readOnly
                                        style={{
                                          border: "none",
                                          display: "flex",
                                          alignItems: "center",
                                          color: "blue",
                                          fontSize: "9px",
                                          flex: "none",
                                        }}
                                      >
                                        {fullName}
                                      </div>

                                      <input
                                        className=""
                                        type="text"
                                        id="main_comment_reply1"
                                        autoComplete="off"
                                        style={{
                                          border: "none",
                                          height: "26px",
                                          borderRadius: "30px",
                                          padding: "5px",
                                          fontSize: "10px",
                                          width: "100%",
                                        }}
                                        value={commentInputBoxValue}
                                        onChange={(e) =>
                                          setCommentInputBoxValue(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      class="main_comment_reply_validation mt-1"
                                      style={{
                                        marginTop: "-6px",
                                        display: "none",
                                      }}
                                    >
                                      <h4
                                        class="login-text"
                                        style={{
                                          color: "red",
                                          fontSize: "10PX",
                                          marginLeft: "0",
                                        }}
                                      >
                                        please Write something..
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="col-md-1 p-0">
                                    <button
                                      onClick={() => sendMainCommentReply()}
                                      style={{
                                        borderRadius: "50%",
                                        padding: "2px",
                                        background: "blue",
                                        border: "none",
                                      }}
                                    >
                                      <img
                                        src="dist/img/sendCommentLogo.png"
                                        alt="no image"
                                        style={{
                                          borderRadius: "50%",
                                          width: "25px",
                                          height: "20px",
                                        }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                          {/* Comment Section end*/}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add cover image modal */}
        {/* <div
          id="cover_image"
          className="feed_cover_image_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "570px",
              marginTop: "336px",
              background: "#D9D9D9",
              width: "380px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body p-0"
              style={{ boxShadow: "2px 2px 2px 0px #C4C4C4" }}
            >
              <div style={{ display: "flex", justifyContent: "end" }}>
                <img
                  className=""
                  onClick={closeFeedCoverImadeModal}
                  src="dist/img/feed_cancel.png"
                  style={{ height: "15px", width: "15px", cursor: "pointer" }}
                />
              </div>
              <div
                className="row"
                style={{ background: "#ffffff", padding: "15px 0px" }}
              >
                <div className="col-md-4 feed_image_div">

                  <div className="" style={{ width: "100%", marginTop: "0px" }}>
                    <label
                      for="file-ip-1"
                      class="file-ip-1 x"
                      style={{
                        border: "none",
                        justifyContent: "center",
                        height: "30px",
                      }}
                    >
                      <img
                        class="default_cover_image "
                        src="dist/img/add_image.png"
                        id="comp_logo"
                        style={{ width: "30px", height: "30px" }}
                      />

                      <img
                        id="cover_image-preview"
                        style={{
                          display: "none",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    </label>
                    <input
                      type="file"
                      name="photo"
                      style={{ visibility: "hidden", display: "none" }}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={getCoverImage}
                      multiple
                      id="file-ip-1"
                    />

                    <div
                      class="EventImage"
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
                        Please Select Event Image
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <p className="feed_font_class2">Upload cover Image</p>
                  <p style={{ fontSize: "14px", marginTop: "5px" }}>
                    1128px X 191px
                  </p>
                  <p style={{ fontSize: "14px" }}>recommended</p>
                </div>
              </div>

              <div
                className="row"
                style={{ padding: "30px 0px", cursor: "pointer" }}
                onClick={adjustCoverImage}
              >
                <div className="col-md-4 feed_image_div">
                  <img
                    className="modal_image"
                    src="dist/img/Resize Vertical.png"
                  />
                </div>
                <div className="col-md-8 ">
                  <p className="feed_font_class2">Adjust Cover Image</p>
                </div>
                <div style={{ padding: "10px 55px" }}>
                  <input
                    type="range"
                    className="range_input"
                    min="210"
                    max="300"
                    step="1"

                    onMouseMove={(e) => setRange(e.target.value)}
                  />
                </div>
              </div>
              <div
                className="row"
                style={{ padding: "25px 0px", cursor: "pointer" }}
              >
                <div
                  className="col-md-4 feed_image_div"
                  onClick={() => deletCoverImage()}
                >
                  <img className="modal_image" src="dist/img/feedDelete.png" />
                </div>
                <div className="col-md-4" onClick={() => deletCoverImage()}>
                  <p className="feed_font_class2">Delete</p>
                </div>
                <div className="col-md-4" onClick={() => changeCoverImg()}>
                  <p className="feed_font_class2">Update</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/*Add cover image model end */}

        {/* create Post modal */}
        <div
          id="create_post"
          className="create_post_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "400px",
              marginTop: "100px",
              background: "#ffffff",
              width: "700px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{
                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div
                className="d-flex bottom_border"
                style={{
                  padding: "0px 10px 10px 30px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="feed_font_class2">Create Post</p>
                </div>
                <div>
                  <img
                    className=""
                    onClick={closeCreatePostModal}
                    src="dist/img/feed_cancel.png"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              </div>

              <div className="" style={{ padding: "30px" }}>
                <div className="d-flex" style={{ marginBottom: "10px" }}>
                  <div className=" ">
                    <img
                      className="modal_image"
                      src="dist/img/user9.jpg"
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: "600",
                      marginLeft: "15px",
                    }}
                  >
                    {uni.map((item) => {
                      const f_letters = item.campus_name
                        .split(" ")
                        .map((f) => f.charAt(0).toUpperCase());
                      return (
                        <>
                          <p
                            className="feed_font_class2"
                            style={{ display: "inline-flex", gap: "5px" }}
                          >
                            {item.campus_name} <p>({f_letters.join("")})</p>
                          </p>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <textarea
                    id="post_description"
                    className="all_inputs"
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    placeholder="Write Somthing.."
                    style={{ height: "185px", background: "#D9D9D91A" }}
                  />
                  <img
                    className="post_image-preview"
                    id="post_image-preview"
                    style={{
                      display: "none",
                      width: "100%",
                      height: "185px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    class="post_description"
                    style={{
                      marginTop: "-6px",
                      display: "none",
                      marginBottom: "12px",
                    }}
                  >
                    <h4
                      class="login-text"
                      style={{
                        color: "red",
                        fontSize: "10PX",
                        marginLeft: "0",
                      }}
                    >
                      Please write something here
                    </h4>
                  </div>
                </div>
                <div className="border_class2" style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <div
                      className="row"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="col-md-4">
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1F3977",
                          }}
                        >
                          Add To Your Post
                        </p>
                      </div>
                      <div className="col-md-8">
                        <div
                          className="d-flex"
                          style={{
                            justifyContent: "end",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <label for="post_image" style={{ margin: "0px" }}>
                            <img
                              className="add_post_image"
                              type="file"
                              src="dist/img/AddImage.png"
                              style={{ height: "22px", width: "22px" }}
                            />
                          </label>
                          <input
                            type="file"
                            name="photo"
                            style={{ visibility: "hidden", display: "none" }}
                            accept="image/png, image/gif, image/jpeg"
                            onChange={getPostedImage}
                            multiple
                            id="post_image"
                          />

                          <div
                            id="add_post_image_contener"
                            className="border_class2 add_post_image_contener"
                          >
                            <p> Add a photo</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => {
                      createPost();
                    }}
                    style={{
                      background: "#000000",
                      color: "#ffffff",
                      padding: "3px",
                      borderRadius: "4px",
                      width: "100%",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Create post model end */}

        {/* Add to profile modal */}
        {/* <div
          id="add_to_profile"
          className="add_to_profile_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "160px",
              background: "#ffffff",
              width: "560px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{
                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div
                className="d-flex bottom_border"
                style={{
                  padding: "0px 10px 10px 30px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="feed_font_class2">Add to profile</p>
                </div>
                <div>
                  <img
                    className=""
                    onClick={closeAddToProfileModal}
                    src="dist/img/feed_cancel.png"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              </div>
              <div className="" style={{ paddingBottom: "30px" }}>
                <div
                  className="row bottom_border"
                  style={{ padding: "8px 0px" }}
                >
                  <div>
                    <a onClick={() => AddVideo()}>
                      <div className="col-md-2">
                        <div>
                          <img
                            className=""
                            src="dist/img/YouTube.png"
                            style={{ height: "22px", width: "23px" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#1F3977",
                            }}
                          >
                            Add Video
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="row bottom_border"
                  style={{ padding: "8px 0px" }}
                >
                  <div>
                    <a onClick={() => AddAward()}>
                      <div className="col-md-2">
                        <div>
                          <img
                            className=""
                            src="dist/img/Prize.png"
                            style={{ height: "22px", width: "22px" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#1F3977",
                            }}
                          >
                            Add Award
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Add to profile modal end */}

        {/* Add Video modal */}
        {/* <div
          id="add_video"
          className="add_video_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "210px",
              background: "#ffffff",
              width: "560px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{
                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div
                className="d-flex bottom_border"
                style={{
                  padding: "0px 10px 10px 30px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="feed_font_class2">Add to profile</p>
                </div>
                <div>
                  <img
                    className=""
                    onClick={closeAddVideoModal}
                    src="dist/img/feed_cancel.png"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              </div>
              <div className="" style={{ paddingBottom: "30px" }}>
                <div className="row " style={{ padding: "8px 0px" }}>
                  <div>
                    <div className="col-md-2">
                      <div>
                        <img
                          className=""
                          src="dist/img/YouTube.png"
                          style={{ height: "22px", width: "23px" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1F3977",
                          }}
                        >
                          Add Video
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "6px" }}>
                  <div className="col-md-12">
                    <div>
                      <label
                        className="border_class2 "
                        for="award_video"
                        style={{ width: "530px", height: "200px" }}
                      >
                        <div
                          className="default_video_div"
                          style={{
                            width: "530px",
                            height: "200px",
                            display: "flex",
                            alignItems: "center",
                            background: "#D9D9D94D",
                            justifyContent: "center",
                            color: "#2966BC",
                          }}
                        >
                          Select video to share
                        </div>

                        <video
                          controls
                          id="award_video-preview"
                          style={{
                            height: "200px",
                            width: "530px",
                            padding: "5px",
                            display: "none",
                            borderRadius: "5px",
                          }}
                        />
                      </label>
                      <div class="award_video" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Select video to share
                        </h4>
                      </div>

                      <div>
                        <input
                          type="file"
                          name="file"
                          accept="video/*"
                          onChange={addAwardVideo}
                          style={{ visibility: "hidden" }}
                          multiple
                          id="award_video"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-mg-12">
                    <div>
                      <input
                        id="award_text"
                        className="all_inputs"
                        type="text"
                        placeholder="Write something.."
                        value={awardVideoText}
                        onChange={(e) => setAwardVideoText(e.target.value)}
                      />
                    </div>
                    <div class="award_text" style={{ display: "none" }}>
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Write Something Here..
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-mg-12">
                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => {
                          addvideoInAward();
                        }}
                        style={{
                          background: "#000000",
                          color: "#ffffff",
                          padding: "3px",
                          borderRadius: "4px",
                          width: "100%",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Add Video modal end */}

        {/* Add award modal */}
        {/* <div
          id="add_award"
          className="add_award_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "210px",
              background: "#ffffff",
              width: "640px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{
                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div
                className="d-flex bottom_border"
                style={{
                  padding: "0px 10px 10px 30px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="feed_font_class2">Add to profile</p>
                </div>
                <div>
                  <img
                    className=""
                    onClick={closeAddAwardModal}
                    src="dist/img/feed_cancel.png"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              </div>
              <div className="" style={{ paddingBottom: "30px" }}>
                <div className="row " style={{ padding: "8px 0px" }}>
                  <div>
                    <div className="col-md-2">
                      <div>
                        <img
                          className=""
                          src="dist/img/Prize.png"
                          style={{ height: "22px", width: "23px" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1F3977",
                          }}
                        >
                          Add Award
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px 30px" }}>
                  <div className="row">
                    <div class="col-md-6" style={{ padding: "0 50px 0px 0px" }}>
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label
                            style={{
                              color: "#1F3977",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            Photo
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

                        <label
                          style={{ height: "160px" }}
                          for="award_image"
                          class="file-ip-1 x"
                        >
                          <img
                            class="award_default_image "
                            src="dist/img/event_photo.png"
                            id="image-logo"
                            style={{ height: "148px" }}
                          />

                          <img
                            id="award_image-preview"
                            style={{
                              display: "none",
                              width: "100%",
                              height: "145px",
                            }}
                          />
                        </label>
                        <div class="award_photo" style={{ display: "none" }}>
                          <h4
                            class="login-text"
                            style={{
                              color: "red",
                              fontSize: "10PX",
                              marginLeft: "0",
                            }}
                          >
                            Please Select Award Image
                          </h4>
                        </div>
                        <input
                          type="file"
                          name="photo"
                          style={{ visibility: "hidden" }}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={getAwardImage}
                          multiple
                          id="award_image"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Award Name
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
                    <div>
                      <input
                        className="all_inputs"
                        type="name"
                        id="award_name"
                        value={awardName}
                        onChange={(e) => setAwardName(e.target.value)}
                        autoComplete="true"
                      />

                      <div class="award_name" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Award Name
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Award Description
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
                    <div>
                      <textarea
                        className="all_inputs"
                        name="description"
                        id="award_description"
                        value={awardDescription}
                        onChange={(e) => setAwardDescription(e.target.value)}
                        autoComplete="true"
                        style={{ height: "120px" }}
                      />

                      <div
                        class="award_description"
                        style={{ display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Award Description
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="">
                      <div style={{ marginTop: "10px" }}>
                        <button
                          onClick={() => {
                            AddAwardList();
                          }}
                          style={{
                            background: "#000000",
                            color: "#ffffff",
                            padding: "3px",
                            borderRadius: "4px",
                            width: "100%",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Add award modal end */}

        {/* Edit profile modal */}
        <div
          id="edit_profile"
          className="edit_profile_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "410px",
              marginTop: "100px",
              background: "#ffffff",
              width: "640px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{

                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div
                className="d-flex bottom_border"
                style={{
                  padding: "0px 3px 4px 30px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p className="feed_font_class2">Edit info</p>
                </div>
                <div>
                  <img
                    className=""
                    onClick={closeEditProfiledModal}
                    src="dist/img/feed_cancel.png"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              </div>

              <div className="" style={{ paddingBottom: "15px" }}>
                {/* <form> */}
                <div
                  className="bottom_border"
                  style={{ padding: "0px 30px 20px 30px" }}
                >
                  <div className=" " style={{ padding: "8px 0px" }}>
                    <div>
                      <div>
                        <div>
                          <a
                            className="eleven_font_class"
                            style={{ color: "#2966BC" }}
                          >
                            Page info
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-md-6" style={{ padding: "0 50px 0px 0px" }}>
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <p
                            className="lable_font_size"
                            style={{ margin: "10px 0px" }}
                          >
                            Page logo
                          </p>
                        </div>

                        <div
                          className=""
                          style={{
                            width: "100%",
                            marginTop: "0px",
                            position: "relative",
                          }}
                        >
                          <label
                            for="page_logo"
                            class=" border_class2"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "125px",
                              width: "125px",
                            }}
                          >
                            <img
                              class="default_image "
                              src="dist/img/add_image.png"
                              id="comp_logo"
                              style={{ width: "30px", height: "30px" }}
                            />

                            <img
                              className="page_logo-preview"
                              id="page_logo-preview"
                              style={{
                                display: "none",
                                width: "115px",
                                height: "115px",
                                borderRadius: "5px",
                              }}
                            />
                          </label>
                          <div class="page_logo" style={{ display: "none" }}>
                            <h4
                              class="login-text"
                              style={{
                                color: "red",
                                fontSize: "10PX",
                                marginLeft: "0",
                              }}
                            >
                              Please Select Page Logo
                            </h4>
                          </div>
                          {/* ------------------ */}

                          <div>
                            <input
                              type="file"
                              name="photo"
                              style={{ visibility: "hidden", display: "none" }}
                              accept="image/png, image/gif, image/jpeg"
                              onChange={getPageLogo}
                              id="page_logo"
                            />

                            <div
                              style={{
                                position: "absolute",
                                top: "90px",
                                left: "90px",
                                background: "#ffffff",
                                borderRadius: "50%",
                                padding: "6px",
                                border: "1px solid #D9D9D9",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                src="dist/img/Edit.png"
                                style={{ height: "30px", width: "30px" }}
                                alt="Edit"
                                onClick={() =>
                                  document.getElementById("page_logo").click()
                                } // Trigger file input click
                              />
                            </div>
                          </div>

                          {/* <input
                            type="file"
                            name="photo"
                            style={{ visibility: "hidden", display: "none" }}
                            accept="image/png, image/gif, image/jpeg"
                            onChange={getPageLogo}
                            id="page_logo"
                          />

                          <div>
                            <a
                              href="#"
                              style={{
                                position: "absolute",
                                top: "90px",
                                left: "90px",
                                background: "#ffffff",
                                borderRadius: "50%",
                                padding: "6px",
                                border: "1px solid #D9D9D9",
                              }}
                              onClick={() =>
                                document.getElementById("page_logo").click()
                              }
                            >
                              <img
                                src="dist/img/Edit.png"
                                style={{ height: "30px", width: "30px" }}
                              />
                            </a>
                          </div> */}
                          {/* ------------ */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="feed_font_class">Basic info</p>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">Institution Name</p>

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
                    <div>
                      <input
                        className="all_inputs"
                        type="name"
                        id="institution_name"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        min={0}
                        maxLength={100}
                        autoComplete="true"
                        placeholder="Enter Institution Name"
                      />
                      <div class="institution_name" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Insert Institution Name
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <p
                        className="all_validations_h4 institutionName_lenght_class"
                        style={{ display: "none" }}
                      >
                        You can add 100 caracters only
                      </p>
                    </div>
                    <div
                      className="col-md-4 p-0"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <p style={{ fontSize: "9px", fontWeight: "500" }}>
                        {institutionName.length}/100
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">Tagline</p>

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
                    <div>
                      <textarea
                        className="all_inputs"
                        id="tagline"
                        value={tagLine}
                        onChange={(e) => setTagLine(e.target.value)}
                        maxLength={120}
                        minLength={0}
                        autoComplete="true"
                        style={{ height: "50px" }}
                        placeholder="Enter TagLine here.."
                      />
                      <div class="tagline" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Insert Tagline
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <p
                        className="all_validations_h4 tagline_lenght_class"
                        style={{ marginTop: "-5px", display: "none" }}
                      >
                        You can add 120 caracters only
                      </p>
                    </div>

                    <div
                      className="col-md-4 p-0"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <p style={{ fontSize: "9px", fontWeight: "500" }}>
                        {tagLine.length}/120
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className=""
                  style={{ padding: "20px 30px", width: "70%" }}
                >
                  <div>
                    <a
                      className="eleven_font_class"
                      style={{ color: "#2966BC" }}
                    >
                      Overview
                    </a>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">Website URL</p>

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
                    <div>
                      <input
                        className="all_inputs"
                        type="name"
                        id="web_url"
                        value={webURL}
                        onChange={(e) => setWebURL(e.target.value)}
                        autoComplete="true"
                        placeholder="Enter Url"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        className="url_checkbox"
                        id="url_checkbox"
                        type="checkbox"
                        value={webURLCheckbox}
                        onClick={(e) => setWebURLCheckbox(true)}
                        style={{ height: "18px", width: "19px" }}
                      />
                      <p
                        style={{
                          marginLeft: "13px",
                          fontSize: "10px",
                          fontWeight: "400",
                        }}
                      >
                        {" "}
                        My organization doesn't have a Website
                      </p>
                    </label>
                    <div class="web_url" style={{ display: "none" }}>
                      <h4
                        class="login-text"
                        style={{
                          color: "red",
                          fontSize: "10PX",
                          marginLeft: "0",
                        }}
                      >
                        Please Insert Website URL
                      </h4>
                    </div>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">Phone number</p>

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
                    <div>
                      <input
                        className="all_inputs"
                        type="text"
                        id="phone_number"
                        minLength="10"
                        pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                        maxLength="10"
                        value={phoneNumber}
                        onChange={(e) => checkInput(e)}
                        required
                        autoComplete="true"
                        placeholder="Enter Mobile Number"
                      />
                      <div class="phone_number" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Phone Number
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* <div style={{marginTop:'10px'}}>
                    <div className='d-flex' style={{alignItems:"center"}}>
                      <div>
                         <p style={{background:"blue",color:"white",textAlign:'center',height:"20px",width:"20px"}}>+</p>
                      </div>
                      <div>
                        <p style={{marginLeft:"18px",fontSize:"12px"}}>Add phone</p>
                      </div>
                    </div>
                   </div> */}

                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">Email Id</p>

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
                    <div>
                      <input
                        type="email"
                        className="all_inputs"
                        id="email_id"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        autoComplete="true"
                        placeholder="Enter Email"
                      />
                      <div class="email_id" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Insert Email Id
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">About</p>

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
                    <div>
                      <textarea
                        className="all_inputs"
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        autoComplete="true"
                        style={{ height: "50px" }}
                        placeholder="Enter About here.."
                      />
                      <div class="about" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Insert About
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <p className="lable_font_size">Year founded</p>
                    </div>
                    <div>
                      <input
                        className="all_inputs"
                        type="name"
                        id="year_founded"
                        value={yearFounded}
                        onChange={(e) => setYearFounded(e.target.value)}
                        autoComplete="true"
                        placeholder="Enter Year Like 2020-2021"
                      />
                      <div class="year_founded " style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Insert Year
                        </h4>
                      </div>
                      <div
                        class="year_founded_pattern"
                        style={{ display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Insert Valid Year Like 2020-2021
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom_border"></div>

                <div className="">
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "end",
                      padding: "2px 34px 0px 0px",
                      gap: "10px",
                    }}
                  >
                    <div style={{ marginTop: "10px" }}>
                      <button
                        type="reset"
                        onClick={() => getPrimaryInfo()}
                        style={{
                          background: "#1E1E1E",
                          color: "#ffffff",
                          padding: "6px 0px",
                          borderRadius: "3px",
                          fontSize: "10px",
                          fontWeight: "500",
                          width: "125px",
                          border: "none",
                        }}
                      >
                        Discard edits
                      </button>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => savedData()}
                        style={{
                          background: "#2966BC",
                          color: "#ffffff",
                          padding: "6px 0px",
                          borderRadius: "3px",
                          fontSize: "10px",
                          fontWeight: "500",
                          width: "120px",
                          border: "none",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
        {/* Edit profile modal end */}

        {/* Add comment modal */}
        <div
          id="add_comment"
          className="add_comment_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "210px",
              background: "#ffffff",
              width: "640px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{
                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div
                className="d-flex bottom_border"
                style={{
                  padding: "0px 10px 10px 30px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="feed_font_class2">Add to profile</p>
                </div>
                <div>
                  <img
                    className=""
                    // onClick={closeAddComment}
                    src="dist/img/feed_cancel.png"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              </div>
              <div className="" style={{ paddingBottom: "30px" }}>
                <div className="row " style={{ padding: "8px 0px" }}>
                  <div>
                    <div className="col-md-2">
                      <div>
                        <img
                          className=""
                          src="dist/img/Prize.png"
                          style={{ height: "22px", width: "23px" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1F3977",
                          }}
                        >
                          Add Award
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px 30px" }}>
                  <div className="row">
                    <div class="col-md-6" style={{ padding: "0 50px 0px 0px" }}>
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <div className="d-flex">
                          <label
                            style={{
                              color: "#1F3977",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            Photo
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

                        <label
                          style={{ height: "160px" }}
                          for="award_image"
                          class="file-ip-1 x"
                        >
                          <img
                            class="default_image "
                            src="dist/img/event_photo.png"
                            id="image-logo"
                            style={{ height: "148px" }}
                          />

                          <img
                            id="award_image-preview"
                            style={{
                              display: "none",
                              width: "100%",
                              height: "145px",
                            }}
                          />
                        </label>
                        <div class="award_photo" style={{ display: "none" }}>
                          <h4
                            class="login-text"
                            style={{
                              color: "red",
                              fontSize: "10PX",
                              marginLeft: "0",
                            }}
                          >
                            Please Select Award Image
                          </h4>
                        </div>
                        <input
                          type="file"
                          name="photo"
                          style={{ visibility: "hidden" }}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={getAwardImage}
                          multiple
                          id="award_image"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Award Name
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
                    <div>
                      <input
                        className="border_class2"
                        type="name"
                        id="award_name"
                        value={awardName}
                        onChange={(e) => setAwardName(e.target.value)}
                        autoComplete="true"
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          fontSize: "10px",
                          padding: "8PX",
                        }}
                      />

                      <div class="award_name" style={{ display: "none" }}>
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Award Name
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="d-flex">
                      <label
                        style={{
                          color: "#1F3977",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Award Description
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
                    <div>
                      <textarea
                        className="border_class2"
                        name="description"
                        id="award_description"
                        value={awardDescription}
                        onChange={(e) => setAwardDescription(e.target.value)}
                        autoComplete="true"
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          fontSize: "10px",
                          padding: "8PX",
                          height: "120px",
                        }}
                      />

                      <div
                        class="award_description"
                        style={{ display: "none" }}
                      >
                        <h4
                          class="login-text"
                          style={{
                            color: "red",
                            fontSize: "10PX",
                            marginLeft: "0",
                          }}
                        >
                          Please Enter Award Description
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="">
                      <div style={{ marginTop: "10px" }}>
                        <button
                          onClick={() => {
                            AddAwardList();
                          }}
                          style={{
                            background: "#000000",
                            color: "#ffffff",
                            padding: "3px",
                            borderRadius: "4px",
                            width: "100%",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add award modal end */}

        {/* Edit and delete modal */}

        <div
          id="edit_delete"
          className="feed_edit_delete_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "486px",
              background: "#D9D9D9",
              width: "335px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body"
              style={{
                padding: "10px 0px 0px 0px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
                borderRadius: "7px",
              }}
            >
              <div className="row">
                <div className="col-md-12 ">
                  {/* <img className='modal_image' src='dist/img/add_image.png'/> */}
                  <div
                    className=""
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <img
                      className=""
                      onClick={closeEditDeleteModal}
                      src="dist/img/feed_cancel.png"
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="row" style={{ padding: "10px 0px" }}>
                <div className="col-md-4 feed_image_div">
                  <img className="modal_image" src="dist/img/Edit.png" />
                </div>
                <div className="col-md-8 ">
                  <p className="feed_font_class2">Edit Post</p>
                </div>
              </div>
              <div
                className="row"
                style={{ padding: "10px 0px" }}
                onClick={closeEditDeleteModal}
              >
                <div
                  className="col-md-4 feed_image_div"
                  style={{ cursor: "pointer" }}
                >
                  <img className="modal_image" src="dist/img/feedDelete.png" />
                </div>
                <div className="col-md-8" style={{ cursor: "pointer" }}>
                  <p className="feed_font_class2">Delete Post</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Add cover image model end */}

        {/* delete cover img modal */}
        <div
          id="delete_cover_img"
          className="delete_cover_img_modal"
          style={{ display: "none" }}
        >
          <div
            className="student_inner_div"
            style={{
              marginLeft: "160px",
              background: "#ffffff",
              width: "480px",
              borderRadius: "7px",
            }}
          >
            <div
              className="card-body border_class2"
              style={{
                padding: "15px",
                boxShadow: "2px 2px 2px 0px #C4C4C4",
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: "600",
                    color: "black",
                    fontSize: "13px",
                  }}
                >
                  Delete message
                </p>
                <h2 style={{ marginTop: "20PX", fontSize: "13PX" }}>
                  Are You Sure That You Want To Delete This Cover Image?
                </h2>

                <div className="d-flex mt-3">
                  <a
                    onClick={close_delete_modal}
                    href="#"
                    style={{ marginLeft: "auto", marginRight: "15px" }}
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
                    href="#delete_with_protection"
                    style={{ color: "grey", fontSize: "15PX" }}
                  >
                    <input
                      type="button"
                      className="create_btn"
                      id="delete_single_student"
                      value="Delete"
                      onClick={() => deleteCoverImg()}
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
        {/* delete cover img modal end */}
      </div>
    </>
  );
};
