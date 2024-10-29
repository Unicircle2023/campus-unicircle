import React, { useState, useEffect, useRef, Component } from "react";
import axios from "axios";
import $, { error } from "jquery";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { NewRecipient } from "./NewRecipient";
import { NewPersonaRecipient } from "./NewPersonaRecipient";
import { NewClassRecipient } from "./NewClassRecipient";
import LoadingSpinner from "../LoadingSpinner";
import Export from "react-data-table-component";
import { ExportToExcel } from "./ExportToExcel";
import moment from "moment";
import { useHistory } from "react-router-dom";
import SummerNote from "../SummerNote/SummerNote";
import toast, { Toaster } from "react-hot-toast";
import { NewRecipients } from "../Specific Students/NewRecipients";
import { NewClassRecipients } from "../Specific Students/NewClassRecipients";
import { NewPersonaRecipients } from "../Specific Students/NewPersonaRecipients";
import { News } from "./News";

export function NewsFormNew() {
  // $(document).ready(function() {
  //   $("#news_title").keypress(function(e) {
  //     var key = e.keyCode;
  //     if (key >= 48 && key <= 57) {
  //       e.preventDefault();
  //     }
  //   });
  // });

  $("#myForm").one("submit", function () {
    $(this)
      .find('input[type="button"]')
      .attr("disabled", "disabled");
  });
  var todayy = "";

  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState({});
  const [dataSet, setdataSet] = useState([]);
  const passData = (id, s_data) => {
    setChildId(id);

    setChildData(s_data);
    if (s_data != "") {
      setTimeout(() => {
        $(".user_type").hide();
      }, 2000);
    }
  };

  const passPersonaData = (Pid, Pdata) => {
    setChildId(Pid);

    setChildData(Pdata);
    setTimeout(() => {
      $(".user_type").hide();
    }, 2000);
  };
  function laterDate() {
    $(".later_date_container").show();
    updatePublishDate("");
    updateExpireDate("");
  }
  const fileName = "uploadStudent";
  var studentList = [
    {
      "First Name": "",
      "Last Name": "",
      "Preferred Name": "",
      "Father Name": "",
      dob: "",
      "Mother Name": "",
      Gender: "",
      Country: "",
      Mobile: "",
      password: "",
      "First Language": "",
      Class: "",
      Department: "",
      "First Nationality": "",
      "Second Nationality": "",
      Email: "",
      "Spoken Language": "",
      Race: "",
      persona: "",
    },
  ];
  // ---------------

  const [catName, updateCatName] = useState("");
  async function getNewCategory() {
    const formData = new FormData();

    formData.append("n_cat_id", categoryId);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "get_single_news_categories",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (response.data.error_code === 200) {
      updateCatName(response.data.data.category_name);
    }
  }
  const student_name = childData.join(", ");
  todayy = new Date().toISOString().slice(0, 16);

  const [excel, setExcel] = useState([]);
  const [excelError_code, updateExcelError_code] = useState("");
  const [excelError_message, updateExcelError_message] = useState("");
  async function uploadExcel() {
    try {
      const formData = new FormData();

      formData.append("uploadFile", excel);

      const excelResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_upload_excel_file_student",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      updateExcelError_code(excelResponse.data.error_code);
      updateExcelError_message(excelResponse.data.message);

      $(".excel_message").show();
      setTimeout(() => {
        $(".excel_message").hide();
      }, 3000);
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }
  $(".close_event").click(function () {
    $(".user_type").hide();
  });
  // --------------

  $(".cancel_img").click(function () {
    $(".preview_polls").hide();
    // summernoteCssFunc();
  });

  // ------------
  function preview() {
    getNewCategory();
    $(".preview_polls").show();

    //     pubDate = moment(publishDate).format("YYYY-MM-DD HH:mm");
    //     expDate = moment(expireDate).format("YYYY-MM-DD HH:mm");
    //     const expire____Date = moment(expireDate).format("YYYY-MM-DD HH:mm")
    //     updateExpireDate(expire____Date)
  }

  $(".close_event").click(function () {
    $(".preview_polls").hide();
    summernoteCssFunc();
  });

  $(".close_event").click(function () {
    $(".preview_category").hide();
    summernoteCssFunc();
  });

  const [categoryId, updateCategoryId] = useState("");
  const [editCategoryId, updateEditCategoryId] = useState("");
  const history = useHistory();

  const [editNewsID, updateEditNewsID] = useState("");
  const [editNewsTitle, updateEditNewsTitle] = useState("");
  const [editNewsDescription, updateEditNewsDescription] = useState("");
  const [editNewsDeliveryType, updateEditNewsDeliveryType] = useState("");
  const [editNewsPublishDate, updateEditNewsPublishDate] = useState("");
  const [editNewsExpireDate, updateEditNewsExpireDate] = useState("");
  const [editNewsSendTo, updateEditNewsSendTo] = useState("");
  const [categoryName, updateCategoryName] = useState("");

  const [title, updateTitle] = useState("");
  const [deliveryType, updateDeliveryType] = useState("");
  const [devilevryName, updateDevilevryName] = useState("");
  const [sendNotificationTo, updatesendNotificationTo] = useState([]);
  const [sendTo, updatesendTo] = useState([]);
  const [newsContent, updateNewsContent] = useState("");
  const [jobDescription_text, updateJobDescription_text] = useState("");
  const [newsFile, updateNewsFile] = useState("");
  const [publishDate, updatePublishDate] = useState([]);
  const [expireDate, updateExpireDate] = useState([]);
  const [userType, updateUserType] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [Size, SetSize] = useState([]);

  console.log(Size);
  function edit_category() {
    $(".preview_polls").hide();
    $(".preview_category").show();
    summernoteCssEditFunc();

    updateEditCategoryId(categoryId);
    updateEditNewsID(newsId);
    updateEditNewsTitle(title);
    updateEditNewsDescription(newsContent);
    updateEditNewsDeliveryType(deliveryType);
    updateEditNewsPublishDate();
    updateEditNewsExpireDate();
    updateEditNewsSendTo();

    const getDate = moment(publishDate).format("YYYY-MM-DDThh:mm");

    updateEditNewsPublishDate(getDate);
    const getExpDate = moment(expireDate).format("YYYY-MM-DDThh:mm");

    updateEditNewsExpireDate(getExpDate);
    updateEditNewsSendTo(sendNotificationTo);
  }

  var newsId = "";
  const [isLoading, setIsLoading] = useState(false);
  const [error_message, updateError_message] = useState("");

  async function createNews() {
    dateValidate();

    try {
      const newsCategory = document.getElementById("news_category");
      const newsTitle = document.getElementById("news_title");

      const newsDeliveryType = document.getElementById("new_delivery_type");
      const newsPublishDate = document.getElementById("publishdate");
      const newsExpireDate = document.getElementById("expiredate");
      const newsSendTo = document.getElementById("sendNotification");

      if (
        newsCategory.value == "" &&
        newsTitle.value == "" &&
        newsContent == "" &&
        newsDeliveryType.value == "" &&
        newsPublishDate.value == "" &&
        newsSendTo.value == ""
      ) {
        $(".ValueMsg").show();

        setTimeout(function () {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      } else if (newsCategory.value == "") {
        $(".NewsCategory").show();

        setTimeout(function () {
          $(".NewsCategory").hide();
        }, 3000);
      } else if (newsTitle.value == "") {
        $(".NewsTitle").show();

        setTimeout(function () {
          $(".NewsTitle").hide();
        }, 3000);
      } else if (newsContent == "") {
        $(".NewsDescription").show();

        setTimeout(function () {
          $(".NewsDescription").hide();
        }, 3000);
      } else if (deliveryType == "") {
        checkRadio();
        $(".DeliveryType").show();

        setTimeout(function () {
          $(".DeliveryType").hide();
        }, 3000);
      } else if (newsPublishDate.value == "") {
        $(".PublishDateMessage").show();

        setTimeout(function () {
          $(".PublishDateMessage").hide();
        }, 3000);
      } else if (sendNotificationTo == "") {
        checkRadioForUserType();
        $(".SendToAll").show();

        setTimeout(function () {
          $(".SendToAll").hide();
        }, 3000);
      } else {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("category", categoryId);
        formData.append("title", title);
        formData.append("delivery_type", deliveryType);
        formData.append("send_to", sendNotificationTo);
        formData.append("news_content", newsContent);
        formData.append("expire_date", expireDate);
        formData.append("users", childId);
        formData.append("publish_date", publishDate);

        for (var i = 0; i < newsFile.length; i++) {
          formData.append("news_file[]", newsFile[i]);
        }
        for (var i = 0; i < image.length; i++) {
          formData.append("media_file[]", image[i]);
        }

        const newsResponse = await axios.post(
          process.env.REACT_APP_API_KEY + "create_news",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        updateError_message(newsResponse.data.message);
        toast.success(newsResponse.data.message);

        setTimeout(function () {
          history.push("/campusNews");
        }, 3000);

        updateTitle("");
        updateDeliveryType("");
        updatesendNotificationTo("");
        updateNewsContent("");
        updatePublishDate("");
        updateExpireDate("");
        updateUserType("");
        setImgData([]);
        setChooseFile("");
      }
    } catch (err) {
      console.log("Log in Fail", err);
      // setIsLoading(false);
    }
  }
  const [addPersona, updatePersona] = useState([]);
  const [errorMessagePersona, updateErrorMessagePersona] = useState("");

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

    if (personaResponse.data.error_code == 200) {
      updatePersona("");
    }
    updateErrorCodePersona(personaResponse.data.error_code);

    updateErrorMessagePersona(personaResponse.data.message);

    $(".personaMsg").show();

    setTimeout(function () {
      $(".personaMsg").hide();
    }, 3000);
  }

  function currentDate() {
    var date = new Date();

    const getDate = moment(date).format("YYYY-MM-DD HH:mm");
    updatePublishDate(getDate);
    $(".later_date_container").hide();
  }
  var pubDate = "";
  var expDate = "";
  const checkRadio = () => {
    var table = document.getElementById("tblFruits");
    var radio = table.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("spnError").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  const cat_name = [];
  async function saveNews() {
    const formData = new FormData();
    formData.append("news_id", newsId);
    formData.append("category", categoryId);
    formData.append("title", editNewsTitle);
    formData.append("news_content", editNewsDescription);
    formData.append("delivery_type", editNewsDeliveryType);
    formData.append("publish_date", editNewsPublishDate);
    formData.append("expire_date", editNewsExpireDate);

    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "admin_edit_news",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    //  get news category
    formData.append("news_id", editNewsID);

    const getCategoryResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "get_good_news",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    summernoteCssFunc();
    $(".saveMessage").show();
    setTimeout(function () {
      $(".saveMessage").hide();
      $(".preview_category").hide();
    }, 1000);

    // updateError_message(eventResponse.data.message);
    // updateErrorCode(eventResponse.data.error_code)
    $(".alertMsg").show();

    setTimeout(function () {
      $(".alertMsg").hide();
    }, 3000);
    if (getCategoryResponse.data.error_code == 200) {
      getCategoryResponse.data.data.map((categoryItem) => {
        cat_name = categoryItem.category;
      });
    }

    $("#news_category ").val(categoryId);

    updateTitle(editNewsTitle);
    updateDeliveryType(editNewsDeliveryType);
    {
      editNewsDeliveryType == 1
        ? updateDevilevryName("Now")
        : updateDevilevryName("Later");
    }

    updateNewsContent(editNewsDescription);

    updatePublishDate(editNewsPublishDate);
    updateExpireDate(editNewsExpireDate);
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

      if (fetchClassResponse.data.error_code == 100) {
        updateUserType(fetchClassResponse.data.data);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const [newsCategory, updateNewsCategory] = useState("");
  const [newsCategorydata, setNewsCategoryData] = useState([]);
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [errorMessage, updateErrorMessage] = useState("");
  const [errorCode, updateErrorCode] = useState("");
  const [errorCodePersona, updateErrorCodePersona] = useState("");

  async function createNewsCategory() {
    try {
      const newsCategorycheck = document.getElementById("news_category_single");
      if (newsCategorycheck.value == "") {
        $(".NewsCategorySingle").show();

        setTimeout(function () {
          $(".NewsCategorySingle").hide();
        }, 3000);
      } else {
        const formDataCategory = new FormData();

        formDataCategory.append("category_name", newsCategory);

        const responseCategory = await axios.post(
          process.env.REACT_APP_API_KEY + "create_news_category",
          formDataCategory,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        if (responseCategory.data.error_code == 200) {
          setData([responseCategory.data]);
        }

        updateErrorMessage(responseCategory.data.message);
        updateErrorCode(responseCategory.data.error_code);
        if (responseCategory.data.error_code == 200) {
          $(".SuccessMsg").show();

          setTimeout(function () {
            $(".SuccessMsg").hide();
          }, 4000);

          window.location.href = "/createNews";
        }
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  async function fetchNewsList() {
    const token = localStorage.getItem("Token");

    try {
      const fetchnewsListResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_news_category",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const NewsCategoryErrorCode = fetchnewsListResponse.data.error_code;

      const NewsCategoryErrorMsg = fetchnewsListResponse.data.message;

      if (NewsCategoryErrorCode == 200) {
        const NewsCategoryListArray = fetchnewsListResponse.data.data;

        setNewsCategoryData(NewsCategoryListArray);
      } else {
        setNewsCategoryData([]);

        $(".alert-danger").show();
        setTimeout(function () {
          $(".alert-danger").hide();
        }, 3000);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const dateValidate = () => {
    var startDate = document.getElementById("publishdate").value;
    var endDate = document.getElementById("expiredate").value;

    if (Date.parse(startDate) > Date.parse(endDate)) {
      alert("Expiry date should be greater than Publish date");
      document.getElementById("expiredate").value = "";
    }
  };

  async function fetchSingleNews(id) {
    try {
      const formData = new FormData();
      formData.append("news_id", id);

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

      const NewsErrorCode = fetchNewsResponse.data.error_code;

      const NewsErrorMsg = fetchNewsResponse.data.message;

      if (NewsErrorCode == 200) {
        const newsListArray = fetchNewsResponse.data.data;

        setNewsData(newsListArray);
      } else {
        setNewsData([]);
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  const summernoteCssEditFunc = () => {
    // $(".note-statusbar").hide();
    // $(".note-toolbar").hide();
    $(".note-editable").css("height", "200px");
  };

  const summernoteCssFunc = () => {
    // $(".note-statusbar").hide();
    // $(".note-toolbar").hide();
    $(".note-editable").css("height", "90px");
  };


  useEffect(() => {
    fetchNewsList();
    fetchSingleNews();
  }, []);

  const resetValues = () => {
    var dropDown = document.getElementById("news_category");
    dropDown.selectedIndex = 0;

    var ele = document.getElementsByName("userType");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;

    var delivered = document.getElementsByName("deliveryType");
    for (var i = 0; i < delivered.length; i++) delivered[i].checked = false;

    updateCategoryId("");
    updateCategoryName("");
    updateTitle("");
    updateNewsContent("");
    updateNewsFile("");
    updateImage("");
    updatePublishDate("");
    updateExpireDate("");
    updateUserType("");
    setImgData([]);
    setChooseFile("");
    $(".news_prev_img_box").hide();
  };

  function hide_date() {
    $(".show_date").hide();
  }
  function show_date() {
    $(".show_date").show();
  }

  function cancelEdit() {
    $(".preview_category").hide();
    summernoteCssFunc();
  }

  const checkRadioForUserType = () => {
    var user = document.getElementById("tblFruitsUserType");
    var radioInput = user.getElementsByTagName("INPUT");
    var isValid = false;

    for (var i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        isValid = true;
        break;
      }
    }
    document.getElementById("spnErrorUserType").style.display = isValid
      ? "none"
      : "block";
    return isValid;
  };

  const [image, updateImage] = useState([]);
  const [anyFile, updateAnyFile] = useState("");

  const [chooseFileImage, setChooseFileImage] = useState("");

  const [chooseFileAny, setChooseFileAny] = useState();

  const [chooseFile, setChooseFile] = useState([]);

  console.log("chooseFile======", chooseFile)

  var newsDoc = [];
  // const uploadingFile = (e) => {
  //   const input = e.target;
  //   const files = input.files;

  //   if (e.target.files.length > 0) {
  //     if (e.target.files.length > 2) {
  //       input.value = "";
  //       updateNewsFile([]);
  //       setChooseFile([]);
  //       updateNewsFile("");
  //       setChooseFile("");
  //       toast.error(" Please select a maximum of 2 files.");
  //     } else {
  //       let totalSize = 0;
  //       var fileName = [];
  //       for (let i = 0; i < e.target.files.length; i++) {
  //         const fileSizeInBytes = files[i].size;
  //         const fileSizeInKb = fileSizeInBytes / 1024;
  //         totalSize += fileSizeInKb;
  //         if (totalSize > 10240) {
  //           toast.error("File size is more that 10MB");
  //         } else {
  //           newsDoc.push(e.target.files[i]);
  //           updateNewsFile(newsDoc);
  //           fileName.push(e.target.files[i].name);
  //           setChooseFile(fileName);
  //         }
  //       }
  //     }
  //   }
  // };


  const uploadingFile = (e) => {
    const input = e.target;
    const files = input.files;

    if (files.length > 0) {
      if (chooseFile.length + files.length > 2) {
        input.value = "";
        toast.error("Please select a maximum of 2 files.");
      } else {
        let totalSize = chooseFile.reduce((acc, file) => acc + file.size / 1024, 0); // Sum of current files' sizes in KB
        const newFiles = [];
        const newFileNames = [];

        for (let i = 0; i < files.length; i++) {
          const fileSizeInKb = files[i].size / 1024;
          totalSize += fileSizeInKb;

          if (totalSize > 10240) {
            toast.error("Total file size exceeds 10MB");
            return;
          } else {
            newFiles.push(files[i]);
            newFileNames.push(files[i].name);
          }
        }

        // Add new files to the current list without replacing
        setChooseFile((prevFiles) => [...prevFiles, ...newFileNames]);
        updateNewsFile((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };





  //   const handleFileSelect = (event) => {
  //   const newFile = event.target.files[0];
  //   setChooseFile([newFile]); // Store only the selected file
  // };


  // Function to remove the attachment
  const handleRemoveAttachment = (indexToRemove) => {
    // Create a new array by filtering out the item at the selected index
    const updatedFiles = chooseFile.filter((item, index) => index !== indexToRemove);
    setChooseFile(updatedFiles); // Update state with new list of attachments
  };



  var eventImage = [];
  const [imgData, setImgData] = useState([]);
  console.log("imgData>>>>>", imgData)

  const uploadingFileImage = (e) => {
    const files = e.target.files;

    if (files.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        eventImage.push(file);
        updateImage(eventImage);

        let newFileSizes = [];
        const fileSizeInKB = (file.size / 1024).toFixed(2);
        newFileSizes.push(fileSizeInKB);
        SetSize(newFileSizes);
        console.log(`File name: ${file.name}, Size: ${fileSizeInKB} KB`);
      }

      const newFiles = Array.from(e.target.files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImgData([]);
      setChooseFileImage([]);
      setImgData(newUrls);
      console.log("newFiles---------------", newFiles);
      setChooseFileImage(newFiles.map((file) => file.name));
      $(".news_prev_img_box").show();
    }
  };



  // console.log("File name", setChooseFileImage)

  const [pastedContent, setPastedContent] = useState("");

  const uploadingFileAny = (e) => {
    updateAnyFile(e.target.files[0]);
    var fileNameAny = e.target.files[0].name;
    setChooseFileAny(fileNameAny);
  };

  const stripBackgroundStyles = (htmlString) => {
    // Regular expression to remove background image styles
    return htmlString.replace(/<[^>]*>?/gm, (match) => {
      // Replace background image styles in the matched HTML tag
      return match.replace(/style="[^"]*"/gm, (styles) => {
        return styles.replace(/(background-image:[^;]+;?)/gm, "");
      });
    });
  };

  const [newDesc, setnewDesc] = useState("");

  const handelSummenrnote = (e) => {
    // const strpped_data = stripBackgroundStyles(e);
    // setnewDesc(strpped_data);
    updateNewsContent(e);

  };
  const handelSummenrnoteEdit = (e) => {
    updateEditNewsDescription(e);
  };
  // ******************************************************
  // const [catName, setCatName] = useState('Initial Category Name'); // Initial value
  // const handleCatNameChange = (e) => {
  //   setCatName(e.target.value);
  // };
  // *******************************************************

  // **************************to print the imge name and size **********
  // const [fileDetails, setFileDetails] = useState([]);

  // const uploadingFileImage = (e) => {
  //   const files = e.target.files;

  //   // Limit the number of files
  //   if (files.length > 5) {
  //     toast.error("You can only upload up to 5 images.");
  //     return;
  //   }

  //   if (files.length > 0) {
  //     let newFileDetails = [];
  //     let newFileSizes = [];

  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       eventImage.push(file);
  //       updateImage(eventImage);

  //       const fileSizeInKB = (file.size / 1024).toFixed(2);
  //       newFileSizes.push(fileSizeInKB);

  //       // Store file details (name and size)
  //       newFileDetails.push({ name: file.name, size: fileSizeInKB });
  //       console.log(`File name: ${file.name}, Size: ${fileSizeInKB} KB`);
  //     }

  //     // Update the state with file details and sizes
  //     setFileDetails(newFileDetails);
  //     SetSize(newFileSizes);

  //     // Preview images
  //     const newFiles = Array.from(files);
  //     const newUrls = newFiles.map((file) => URL.createObjectURL(file));
  //     setImgData(newUrls);
  //     setChooseFileImage(newFiles.map((file) => file.name));
  //     $(".news_prev_img_box").show();
  //   }
  // };




  // *********************************************************
  return (
    <div className="content-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="border_class2 box_padding ">
        <h1 className="main_heading_h1">CREATE CAMPUS NEWS</h1>
      </div>

      <div class="formSuccess success_msg">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

      {/* CREATE news category pop up */}
      <div id="google" className="modaloverlay">
        <div className="modalContainer" style={{ width: "40%" }}>
          <form role="form">
            <div className="card-body">
              <div>
                {/* CATEGORY */}
                <div className="form-group" style={{ marginTop: "0px" }}>
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{ color: "#1F3977", fontSize: "13PX" }}
                  >
                    Add News Category
                  </label>
                  <br />
                  <input
                    type="text"
                    className="input_fields"
                    id="news_category_single"
                    placeholder="Add News Category"
                    value={newsCategory}
                    onChange={(e) => updateNewsCategory(e.target.value)}
                    autoComplete="off"
                    style={{
                      width: "100%",
                      height: "35px",
                      fontSize: "11px",
                      border: "1px solid #f5f5f5",
                      background: "white",
                    }}
                  />
                  <div
                    class="NewsCategorySingle"
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
                      Please Enter News Category
                    </h4>
                  </div>
                </div>

                <div className="d-flex mt-3">
                  <input
                    type="button"
                    className="create_btn"
                    value="Submit"
                    onClick={() => createNewsCategory()}
                    style={{
                      borderRadius: "5px",
                      marginLeft: "auto",
                      backgroundColor: "#1F3977",
                      fontSize: "13PX",
                      padding: "8px 25px",
                    }}
                  />
                </div>
              </div>
              {errorCode == 200 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/correct.png")}
                    style={{ width: "18px" }}
                  />
                  <p style={{ color: "green" }}>{errorMessage}</p>
                </div>
              ) : errorCode == 406 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/wrong.jpg")}
                    style={{ width: "18px" }}
                  />
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </div>
              ) : errorCode == 409 ? (
                <div
                  className="d-flex SuccessMsg"
                  style={{ marginTop: "-28px" }}
                >
                  <img
                    src={require("../images/wrong.jpg")}
                    style={{ width: "18px" }}
                  />
                  <p style={{ color: "blue" }}>{errorMessage}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
          <a
            class="close"
            href="#"
            style={{ marginTop: "-171px", marginRight: "8px" }}
          >
            &times;
          </a>
        </div>
      </div>

      {/* {isLoading ? (
        <LoadingSpinner />
      ) : ( */}
      <div id="myForm">
        <div className=" p-0  pb-2 border_class2 box_padding">
          <div class="row ">
            <div class="col-md-4 d-flex">
              <div
                style={{ width: "100%", marginTop: "0px", paddingRight: "0" }}
              >
                <div className="d-flex">
                  <label className="all_labels">Select Category</label>

                  <p className="all_stars">*</p>
                </div>

                <select
                  className="all_inputs"
                  id="news_category"
                  aria-label=".form-select-sm example"
                  onChange={(e) => updateCategoryId(e.target.value)}
                >
                  <option
                    selected="selected"
                    value={categoryName}
                    style={{ padding: "6px" }}
                  >
                    Select Category
                  </option>
                  {newsCategorydata.map((news, index) => {
                    return (
                      <option value={news.cat_id} key={index}>
                        {news.category_name}
                      </option>
                    );
                  })}
                </select>
                <div class="NewsCategory" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Select Category
                  </h4>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  marginTop: "0px",
                  paddingLeft: "5px",
                  display: "flex",
                }}
              >
                <a
                  className="cta"
                  href="#google"
                  style={{ display: "flex", alignItems: "end" }}
                >
                  <img
                    src="dist/img/add.png"
                    alt="dropdown"
                    style={{ width: "18px", height: "17px" }}
                  />
                </a>
              </div>
            </div>

            <div class="col-md-4 ">
              <div className="">
                <div className="d-flex">
                  <label className="all_labels">Enter Your Title</label>

                  <p className="all_stars">*</p>
                </div>
                <input
                  type="text"
                  id="news_title"
                  className="input_fields all_inputs"
                  value={title}
                  onChange={(e) => updateTitle(e.target.value)}
                  placeholder="Your title goes here..."
                  autoComplete="off"
                />
                <div class="NewsTitle" style={{ display: "none" }}>
                  <h4 class="login-text all_validations_h4">
                    Please Write News Title
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-0 border_class2 box_padding">
          <div class="row">
            <div className="col-md-8 p-0">
              <div class="col-md-12">
                <div className="" style={{ width: "100%", marginTop: "0px" }}>
                  <div className="d-flex">
                    <label className="all_labels">Enter Your Message</label>

                    <p className="all_stars">*</p>
                  </div>

                  {/* <SummerNote
                    _onChange={handelSummenrnote}
                    value={newsContent}
                    placeholder="Enter Your Message here.."
                  /> */}
                  <SummerNote
                    _onChange={handelSummenrnote}
                    value={newsContent}
                    placeholder="Enter Your Message here.."
                    options={{
                      toolbar: false, // Remove toolbar
                      height: 200, // Set the desired height (adjust as needed)
                      disableResizeEditor: true, // Disable the adjustable height feature
                    }}
                    style={{ width: '651px' }} // Set the desired width
                  />


                  <div
                    class="NewsDescription"
                    style={{ marginTop: "-6px", display: "none" }}
                  >
                    <h4 class="login-text all_validations_h4">
                      Please Write News Description
                    </h4>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-2">
                <div
                  class="border_class2  d-flex"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                  }}
                >
                  <div>
                    <span className="all_labels">Attachments</span>
                  </div>
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    {/*  add image  */}
                    {/* <label
                      for="add_imagee"
                      style={{
                        position: "relative",
                        color: "#339dd8",
                        fontWeight: "bold",
                        fontSize: "9px",
                        marginBottom: "0",
                        marginLeft: "5px",
                      }}
                    >
                      <img
                        src="dist/img/AddImage.png"
                        style={{
                          width: "20px",
                          height: "18px",
                          marginRight: "7px",
                        }}
                        for="add_imagee"
                      />
                      {image == "" ? (
                        <></>
                      ) : (
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            background: "red",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "6px",
                            right: "4px",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {image.length}
                        </span>
                      )}
                    </label> */}

                    <input
                      type="file"
                      name="photo"
                      accept="image/png, image/gif, image/jpeg, video/mp4, video/webm, video/ogg"
                      onChange={uploadingFileImage}
                      multiple
                      id="add_imagee"
                      style={{ visibility: "hidden", width: "0PX" }}
                    />

                    {/* <div class="d-flex" style={{ position: "absolute", top: "140px", right: "14px", fontSize: "11px" }}>
                      <input value={chooseFileImage} type="text" readonly="readonly"
                        style={{ border: "none", backgroundColor: "transparent" }} />
                    </div> */}

                    <label
                      for="add_docs"
                      style={{
                        position: "relative",
                        color: "#339dd8",
                        fontWeight: "normal",
                        fontSize: "10px",
                        marginBottom: "0",
                        marginLeft: "auto",
                        background: "black",
                        color: "white",
                        width: "150px",
                        height: "40px",
                        display: "flex", // Use flexbox for centering
                        alignItems: "center", // Vertically center content
                        justifyContent: "center", // Horizontally center content
                        gap: "5px", // Space between text and image
                        cursor: "pointer", // Makes the label appear clickable
                        borderRadius: "5px",
                        paddingRight: "3px",
                      }}
                    >
                      {/* ************************************** */}
                      <label
                        for="add_imagee"
                        style={{
                          position: "relative",
                          color: "#339dd8",
                          fontWeight: "bold",
                          fontSize: "9px",
                          marginBottom: "0",
                          marginLeft: "5px",
                        }}
                      >
                        <img
                          src="dist/img/AddImage.png"
                          style={{
                            width: "20px",
                            height: "18px",
                            // marginRight: "7px",
                          }}
                          for="add_imagee"
                        />
                        {image == "" ? (
                          <></>
                        ) : (
                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              background: "red",
                              borderRadius: "50%",
                              position: "absolute",
                              top: "6px",
                              right: "4px",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {image.length}
                          </span>
                        )}
                      </label>
                      {/* ******************************************* */}
                      <img
                        src="dist/img/Attach.png"
                        alt="dropdown"
                        style={{ width: "20px", height: "20px", marginRight: "5px" }}
                        for="add_docs"
                      />Add Attachment
                      {newsFile == "" ? (
                        <></>
                      ) : (
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            background: "red",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "15px",
                            left: "40px",
                            // right: "-5px",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {newsFile.length}
                        </span>
                      )}
                    </label>

                    <input
                      type="file"
                      name="photo"
                      //  accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf,.doc,.docx, .rtf"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                      onChange={uploadingFile}
                      id="add_docs"
                      multiple
                      style={{ visibility: "hidden", width: "0px" }}
                    />

                    {/* <div class="d-flex" style={{ position: "absolute", top: "128px", right: "18px", fontSize: "11px" }}>

                      <input value={chooseFile} type="text" readonly="readonly"
                        style={{ border: "none", backgroundColor: "transparent" }} />
                    </div> */}

                    {/*  add link  */}
                    {/* <label for="upload-photo" style={{ color: "#339dd8", fontWeight: "bold", fontSize: "12px", marginBottom: "0", marginLeft: "5px" }}>
                      <img src="dist/img/Attach.png" alt="dropdown" style={{ width: "25px", height: "24px" }} for="upload-photo" />
                    </label>

                    <input type="file" name="photo"
                      onChange={uploadingFileAny}
                      id="upload-photo" />

                    <div class="d-flex" style={{ position: "absolute", top: "140px", marginTop: "15px", right: "14px", fontSize: "11px" }}>
                      <input value={chooseFileAny} type="text" readonly="readonly"
                        style={{ border: "none", backgroundColor: "transparent" }} />
                    </div> */}

                    {/* ********************** */}
                  </div>
                </div>
                {/* """"""""""
               """""""""""" */}

                <div className="col-md-4" style={{ width: "150%", maxWidth: "1200px" }}>
                  <div className="flex flex-wrap items-start gap-3"
                    style={{
                      // border: "2px solid red",
                      // marginTop: "3px",
                      gap: "10px",
                      padding: "10px",
                      width: "60%",
                      marginLeft: "-20px",
                      alignContent: "flex-start",

                    }}>

                    {chooseFileImage && chooseFileImage.length > 0 ? (
                      chooseFileImage.map((item, index) => (
                        <div key={index}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            whiteSpace: "nowrap", // Prevent items from breaking lines
                            marginRight: "5px",
                            backgroundColor: " #F3F2EF",
                            margin: "5px",
                          }}

                        >
                          <p className="news_doc"
                            style={{
                              margin: "0",
                              paddingRight: "5px",
                              width: "17vw",
                              color: "#4779F0",
                              height: "27px",
                              flex: "1", // Allows the text to take up available space
                              overflow: "hidden", // Prevents scrollbars within the height
                              textOverflow: "ellipsis", // Adds ellipsis (...) if text overflows
                              whiteSpace: "nowrap", // Keeps text in a single line

                            }}
                          >
                            {item}
                            <span
                              style={{ paddingLeft: "9vw", color: "black", cursor: "pointer", fontWeight: "bold" }}
                              className="remove-icon cursor-pointer"
                            // onClick={() => handleRemoveFile(index)}
                            >
                              &#x2715;
                            </span>
                          </p>
                        </div>
                      ))
                    ) : null}

                    {chooseFile && chooseFile.length > 0 ? (
                      chooseFile.map((item, index) => (
                        <div key={index} className="flex justify-between items-center"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            // width: "auto",
                            whiteSpace: "nowrap",
                            marginRight: "5px",
                            backgroundColor: " #F3F2EF",
                            margin: "5px",

                          }}
                        >
                          <p className="news_doc"
                            style={{
                              margin: "0",
                              paddingRight: "5px",
                              width: "17vw",
                              color: "#4779F0",
                              height: "27px",
                              flex: "1", // Allows the text to take up available space
                              overflow: "hidden", // Prevents scrollbars within the height
                              textOverflow: "ellipsis", // Adds ellipsis (...) if text overflows
                              whiteSpace: "nowrap", // Keeps text in a single line
                            }}
                          >{item}
                            <span
                              style={{ paddingLeft: "9.5vw", color: "black", cursor: "pointer", fontWeight: "bold" }} // Add margin-left here
                              className="remove-icon cursor-pointer"
                            // onClick={() => handleRemoveFile(index)}
                            // onClick={() => setChooseFile([])}
                            >
                              &#x2715; {/* Cross mark for removal */}
                            </span>
                          </p>
                        </div>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-0 border_class2 box_padding">
          <div class="row ">
            <div class="col-md-12">
              <div
                style={{
                  marginBottom: "0",
                  padding: "0",
                }}
                className="d-flex"
              >
                <div style={{ marginTop: "0PX" }}>
                  <div class="row">
                    <div class="col-md-12" style={{ paddingLeft: "0" }}>
                      <div
                        className=""
                        style={{ width: "100%", marginTop: "0px" }}
                        id="new_delivery_type"
                        value={deliveryType}
                        onChange={(e) => updateDeliveryType(e.target.value)}
                      >
                        <div className="d-flex">
                          <label className="all_labels">
                            When it should be delivered?
                          </label>

                          <p className="all_stars">*</p>
                        </div>

                        <div className="d-flex" id="tblFruits">
                          <input
                            type="radio"
                            id="now"
                            name="deliveryType"
                            value="1"
                            onClick={() => currentDate()}
                          />
                          <label
                            for="now"
                            className="specific_recipients_label"
                            onClick={() => currentDate()}
                          >
                            <p style={{ marginLeft: "5px" }}>Now</p>
                          </label>
                          <input
                            type="radio"
                            id="later"
                            name="deliveryType"
                            value="2"
                          />
                          <label
                            for="later"
                            className="specific_recipients_label"
                            style={{ marginLeft: "15px" }}
                            onClick={() => laterDate()}
                          >
                            <p style={{ marginLeft: "5px" }}>Later</p>
                          </label>
                        </div>
                      </div>

                      <div
                        class="DeliveryType"
                        id="spnError"
                        style={{ display: "none" }}
                      >
                        <h4 className="login-text all_validations_h4">
                          Please Select Delivery Type
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="later_date_container p-0"
              style={{ display: "none" }}
            >
              <div class="col-md-4 mt-2">
                <div className="" style={{ width: "100%" }}>
                  <div className="d-flex">
                    <label className="all_labels">Publish Date/Time</label>

                    <p className="all_stars">*</p>
                  </div>

                  <input
                    type="datetime-local"
                    className="all_inputs"
                    placeholder="dd-mm-yyyy hh-mm"
                    id="publishdate"
                    value={publishDate}
                    min={todayy}
                    onChange={(e) => updatePublishDate(e.target.value)}
                    name="datetime"
                  />

                  <div class="PublishDateMessage" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Publish Date
                    </h4>
                  </div>
                </div>
              </div>

              <div class="col-md-4 mt-2">
                <div className="">
                  <div className="d-flex">
                    <label className="all_labels">Expiry Date/Time</label>
                  </div>
                  <input
                    type="datetime-local"
                    placeholder="dd-mm-yyyy hh-mm"
                    id="expiredate"
                    class="all_inputs"
                    value={expireDate}
                    min={todayy}
                    onChange={(e) => updateExpireDate(e.target.value)}
                    name="birthdaytime"
                  />

                  <div class="ExpireDate" style={{ display: "none" }}>
                    <h4 class="login-text all_validations_h4">
                      Please Select Expire Date
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-0 border_class2 box_padding">
          <div class="row">
            <div class="col-md-12">
              <div
                id="news_sendto"
                value={sendNotificationTo}
                onChange={(e) => updatesendNotificationTo(e.target.value)}
              >
                <div className="d-flex">
                  <label className="all_labels">
                    Who are you sending this notification to?
                  </label>

                  <p className="all_stars">*</p>
                </div>
                <label className="all_labels">User Type</label>
                <br />

                <div className="d-flex" id="tblFruitsUserType">
                  <input
                    type="radio"
                    id="all students"
                    name="userType"
                    value="1"
                  />
                  <label
                    for="all students"
                    className="specific_recipients_label"
                    onClick={() => all_student()}
                  >
                    <p style={{ marginLeft: "5PX" }}>All Students</p>
                  </label>
                  <input
                    type="radio"
                    id="specific class"
                    name="userType"
                    value="2"
                  />
                  <label
                    for="specific class"
                    className="specific_recipients_label"
                    style={{ marginLeft: "15PX" }}
                    onClick={() => specific_class()}
                  >
                    <p style={{ marginLeft: "5PX" }}>Specific Recipients</p>
                  </label>
                </div>
              </div>

              <div
                class="SendToAll"
                id="spnErrorUserType"
                style={{ display: "none" }}
              >
                <h4 class="login-text all_validations_h4">
                  Please Select User Type
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* specific student pop up */}
        <div
          className="user_type selected_std_modal"
          style={{ display: "none" }}
        >
          <div className="selected_std_modal_inner_div">
            <div className="d-flex edit_top_container">
              <label className="main_labels">Specific Recipients</label>

              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="close_event ml-auto cancel_img"
              />
            </div>

            <div
              id="exTab2"
              class="container p-0"
              style={{ marginTop: "10PX", height: "100%" }}
            >
              <ul className="nav nav-tabs">
                <li className="active mb-0">
                  <a href="#3" data-toggle="tab">
                    Individual
                  </a>
                </li>
                <li style={{ marginLeft: "10px" }}>
                  <a href="#2" data-toggle="tab">
                    Class
                  </a>
                </li>

                <li className="mb-0" style={{ marginLeft: "10px" }}>
                  <a
                    href="#1"
                    data-toggle="tab"
                    style={{ padding: "10px 20px" }}
                  >
                    Personal
                  </a>
                </li>
              </ul>

              <div class="tab-content ">
                <div class="tab-pane active" id="3">
                  <div
                    id="exTab3"
                    class="container"
                    style={{ marginTop: "0PX", height: "100%" }}
                  >
                    <div
                      class="tab-content "
                      style={{ padding: "0px", height: "auto" }}
                    >
                      <div
                        class="tab-pane active"
                        id="6"
                        style={{ height: "100%" }}
                      >
                        <NewRecipients
                          style={{ height: "100%" }}
                          passData={passData}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane" id="2">
                  <NewClassRecipients
                    style={{ height: "100%" }}
                    passData={passData}
                  />
                </div>

                <div class="tab-pane" id="1" style={{ height: "100%" }}>
                  <div
                    id="exTab4"
                    class="container"
                    style={{ marginTop: "0PX", height: "100%" }}
                  >
                    <div
                      class="tab-content "
                      style={{ padding: "0px", height: "auto" }}
                    >
                      <div
                        class="tab-pane active"
                        id="4"
                        style={{ height: "100%" }}
                      >
                        <NewPersonaRecipients
                          style={{ height: "100%" }}
                          passPersonaData={passPersonaData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="d-flex  border_class2 box_padding buttons_div">
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

          <img
            className="delete_img"
            src="dist/img/delete.png"
            alt="dropdown"
            onClick={() => resetValues()}
          />
          <p className="news_bar">|</p>
          <button className="preview_button " onClick={() => preview()}>
            <p className="preview_font">Preview</p>
            <div className="preview_img_div">
              <img
                className="preview_img"
                src="dist/img/view.png"
                alt="dropdown"
              />
            </div>
          </button>

          <button
            className=" publish_button"
            defaultValue="Publish"
            onClick={() => createNews()}
            value="Publish"

          // style={{ fontWeight: "500", border: "0px solid #000000", color: "white", borderRadius: "2px", marginLeft: "8px", backgroundColor: "#000000", padding: "10px 40px", fontSize: "10PX", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginRight: "60PX",width:"130px" }}
          >
            Publish
          </button>
        </div>
      </div>
      {/* )} */}

      {/* PREVIEW */}

      <div className="preview_polls">
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Notice Preview</label>
            {/* <div className="d-flex ml-auto"> */}
            <div className="d-flex" style={{ marginLeft: "340px" }}>
              <img
                src="dist/img/Pencil.png"
                alt="dropdown"
                className="preview_edit_img"
                onClick={() => edit_category()}
                style={{ marginRight: "7px" }}
              />
              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="cancel_img"
              />
            </div>
          </div>

          {
            <div>
              {/* <div className="d-flex">
                <img
                  src="dist/img/Pencil.png"
                  alt="dropdown"
                  className=" ml-auto preview_edit_img"
                  onClick={() => edit_category()}
                />
              </div> */}

              <div className="edit_top_label" style={{ marginTop: "0px" }}>
                <p>Category & Title</p>
              </div>

              {
                <div>
                  <div
                    style={{
                      borderBottom: "2px solid #C4C4C4",
                    }}
                    className="edit_border_class"
                  >
                    <div className="row">
                      <div className="col-md-8">
                        <span className="preview_font_category">{catName}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span className="preview_font_title">{title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="edit_top_label_2">
                    <div className="datemain">
                      <div className="publishdate">
                        <span className="preview_font">Publish Date/ Time</span>{" "}
                        :
                        <span
                          className="preview_font"
                          style={{ color: "#4a0ff5", marginLeft: "10px" }}
                        >
                          {publishDate}
                        </span>
                      </div>
                      <div className="closedate">
                        <span className="preview_font">Close Date/ Time</span> :
                        <span
                          className="preview_font"
                          style={{ color: "#4a0ff5", marginLeft: "10px" }}
                        >
                          {expireDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="descriptionDiv">
                    <div
                      className="edit_border_class_2nine_font_class"
                      style={{
                        height: "250px",
                        marginTop: "-7px",
                        width: "100%",
                        padding: "10px",
                      }}
                    >
                      <p
                        className="desc_class"
                        dangerouslySetInnerHTML={{ __html: newsContent }}
                        style={{
                          margin: 0,
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      />
                    </div>
                  </div>
                  {/* ------------------- */}
                  <div
                    className="reciepientsDiv"
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#4779F0",
                        marginBottom: "10px",
                      }}
                    >
                      Recipients :
                    </p>
                    <div
                      style={{
                        border: "1px solid #4779F0",
                        padding: "10px",
                        height: "40px",
                        width: "100%",
                      }}
                    >
                      {/* <h1>Hello</h1> */}
                      {/* ******************************* */}
                      {/* Your content goes here */}
                    </div>
                  </div>
                  <div
                    className="reciepientsDiv"
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#4779F0",
                        marginBottom: "10px",
                      }}
                    >
                      Attachments :
                    </p>

                    <div>
                      {chooseFile != "" ? (
                        chooseFile.map((item, index) => (
                          <div
                            key={index + 1}
                            className="item-container"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0px",
                            }}
                          >
                            <p
                              className="news_doc"
                              style={{ margin: 0, backgroundColor: "#E6E6E6" }}
                            >
                              {item}

                              <img
                                src="dist/img/Cancel.png"
                                alt="cancel"
                                className="cancel_img"
                                onClick={() => handleRemoveAttachment(index)}
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "40px",
                                }}
                              />
                            </p>
                          </div>

                          //   <div key={index + 1}>
                          //     <p className="news_doc">{item}</p>

                          //    <div className="d-flex" style={{ marginLeft: "340px" }}>
                          //    <img
                          //      src="dist/img/Cancel.png"
                          //      alt="dropdown"
                          //      className="cancel_img"
                          //    />
                          //  </div>
                          //  </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {/* ------------------- */}
                  <div className="ButtonPublish">
                    <button
                      className="publish_button_1"
                      defaultValue="Publish"
                      onClick={() => createNews()}
                      value="Publish"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              }
            </div>
            // )
          }
        </div>
      </div>

      {/* **********************************************edit category************************************* */}
      <div className="preview_category">
        <div className="preview_polls_inner_div1">
          <div className="d-flex edit_top_container">
            <label className="main_labels">Edit Notice</label>
            {/* <div className="d-flex ml-auto"> */}
            <div className="d-flex" style={{ marginLeft: "380px" }}>
              <img
                src="dist/img/Cancel.png"
                alt="dropdown"
                className="cancel_img"
                onClick={() => window.history.back()}
              />
            </div>
          </div>
          {/* category & question */}
          <div className="preview_form">
            <div className="edit_top_label" style={{ marginTop: "0px" }}>
              <p>Category & Title </p>
            </div>
            <div
              style={{
                borderBottom: "2px solid #C4C4C4",
              }}
              className="edit_border_class"
            >
              <div className="row">
                <div className="col-md-8">
                  <span className="preview_font_category">{catName}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <span className="preview_font_title">{title}</span>
                </div>
              </div>
            </div>

            <div className="edit_top_label_2">
              <div className="datemain">
                <div className="publishdate">
                  <span className="preview_font">Publish Date/ Time</span> :
                  <span
                    className="preview_font"
                    style={{ color: "#4a0ff5", marginLeft: "10px" }}
                  >
                    {publishDate}
                  </span>
                </div>
                <div className="closedate">
                  <span className="preview_font">Close Date/ Time</span> :
                  <span
                    className="preview_font"
                    style={{ color: "#4a0ff5", marginLeft: "10px" }}
                  >
                    {expireDate}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="descriptionDiv"> */}
            {/* <div
                className="edit_border_class_2nine_font_class"
                style={{
                  height: "240px",
                  marginTop: "-7px",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <p
                  className="desc_class"
                  dangerouslySetInnerHTML={{ __html: newsContent }}
                  style={{
                    margin: 0,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                />
              </div> */}
            {/* </div> */}
            <div>
              <SummerNote
                // _onChange={handelSummenrnoteEdit}
                // value={newsContent}
                _onChange={handelSummenrnote}
                value={newsContent}
              />
            </div>

            <div
              className="reciepientsDiv"
              style={{
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  color: "#4779F0",
                  marginBottom: "10px",
                }}
              >
                Recipients :
              </p>
              <div
                style={{
                  border: "1px solid #4779F0",
                  padding: "10px",
                  height: "50px",
                  width: "100%",
                }}
              ></div>
            </div>

            <div
              className="reciepientsDiv"
              style={{
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  color: "#4779F0",
                  marginBottom: "10px",
                }}
              >
                Attachments :
              </p>
            </div>

            <div>
              {chooseFile != "" ? (
                chooseFile.map((item, index) => (
                  <div
                    key={index + 1}
                    className="item-container"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0px",
                      // marginLeft:"-8px",
                    }}
                  >
                    <p
                      className="news_doc"
                      style={{
                        marginBottom: "15px",
                        backgroundColor: "#E6E6E6",
                      }}
                    >
                      {item}


                      <img
                        src="dist/img/Cancel.png"
                        alt="cancel"
                        className="cancel_img"
                        onClick={() => handleRemoveAttachment(index)}
                        style={{ cursor: "pointer", marginLeft: "40px" }}
                      />
                    </p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            {/* </div> */}

            {/* <div className="edit_border_class">
              <div className="row">
                <div className="col-md-3">
                <span className="preview_font_category">{catName}</span>
                </div>
                <div className="col-md-9">
                  <select
                    className="edit_inputs_class"
                    id="news_category"
                    aria-label=".form-select-sm example"
                    onChange={(e) => updateCategoryId(e.target.value)}
                  >
                    <option selected="selected" value={categoryName}>
                      {catName}
                    </option>
                    {newsCategorydata.length > 0 ? (
                      newsCategorydata.map((news, index) => {
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

                <div className="col-md-3">
                  <span className="preview_font">Title :</span>
                </div>
                <div className="col-md-9">
                  <input
                    type="name"
                    className="edit_inputs_class"
                    autoComplete="true"
                    value={editNewsTitle}
                    onChange={(e) => updateEditNewsTitle(e.target.value)}
                  />
                </div>
              </div>
            </div> */}

            {/* <div className="edit_top_label">
              <p> Event Description</p>
            </div>
            */}

            {/* ******************button********************** */}

            {/* <div
              className="d-flex mt-2 edit_buttons_div border_class2"
              style={{ justifyContent: "end" }}
            >
              <button
                className="publish_button_1"
                defaultValue="Publish"
                onClick={() => createNews()}
                value="Publish"
              >
                Publish
              </button>
            </div> */}
            <div className="ButtonPublish">
              <button
                className="publish_button_1"
                defaultValue="Publish"
                onClick={() => createNews()}
                value="Publish"
              >
                Publish
              </button>
            </div>

            <div
              style={{
                display: "none",
                color: "green",
                fontSize: "10px",
                marginTop: "2px",
              }}
              className="saveMessage"
            >
              News Edited Successfully...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
