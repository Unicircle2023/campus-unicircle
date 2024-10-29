
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import $ from "jquery";
import { BiPlusMedical, BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AddStaff } from "./AddStaff";
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import image from "../images/no_image.png"
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import { Link } from 'react-router-dom';



const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))

export function Staff() {
  let courseResult = ""
  let x=""
  const token = localStorage.getItem('Token');
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log("get staff data",data)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [profile, setprofile] = useState("")
  const [sort, setSort] = useState(false);
  const [classdata, setClassData] = useState([]);
  const [classList, setClassList] = useState([]);
  const [course, setCourse] = useState("");
  const [staffClass, setStaffClass] = useState("");

  async function fetchList() {
    const sortData = data.sort(function (a, b) {
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }
      return 0;
    });

    $( document ).ready(function() {
      $( "#first_name" ).keypress(function(e) {
          var key = e.keyCode;
          if (key >= 48 && key <= 57) {
              e.preventDefault();
          }
      });
      $( "#last_name" ).keypress(function(e) {
          var key = e.keyCode;
           if (key >= 48 && key <= 57) {
              e.preventDefault();
          }
       });
    
       $( "#preferred_name" ).keypress(function(e) {
        var key = e.keyCode;
         if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
     });
    
     $( "#designation_neww" ).keypress(function(e) {
      var key = e.keyCode;
       if (key >= 48 && key <= 57) {
          e.preventDefault();
      }
    });
    
    
   
    
    });
    
    try {

      const fetchTeacherResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_teacher_list",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get Teacher Details", fetchTeacherResponse);

      const teacherData = fetchTeacherResponse.data.data;
      console.log("Teacher List ", teacherData);

      const teacherErrorCode = fetchTeacherResponse.data.error_code;
      console.log("Teacher Error Code ", teacherErrorCode);

      // setData(teacherData);
      // setFilteredResults(teacherData);


      if (teacherErrorCode == 200) {
        const teacherListArray = teacherData
        console.log("teacher list Array", teacherListArray);
        const sortData = teacherListArray.sort(function (a, b) {
          if (a.first_name < b.first_name) {
            return -1;
          }
          if (a.first_name > b.first_name) {
            return 1;
          }
          return 0;
        });

        setData(sortData);
        setFilteredResults(teacherListArray);
      }
      else {
        setData([]);
        setFilteredResults([]);

        
      }


    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }


  useEffect(() => {
    fetchList();
  }, [token])
  



  const [stdCourseId,updateStdCourseId] = useState("")
const [stdCourseName,updateStdCourseName] = useState("")
async function getCourseWiseTeachers(e)
{
  fetchCourseWiseClassList(e.target.value)
  console.log("get course idddddd",e.target.value)
  try {
      
updateStdCourseId(e.target.value)
updateStdCourseName(e.target.options[e.target.selectedIndex].text)
    const formData = new FormData();
   
    formData.append("cource_id", e.target.value);
  
    const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_courcewise_teacher_list",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          
          "Authorization": token,
        }
      });

    console.log("Fetch Courseewise Student List", response.data.data);
   
  if(response.data.error_code == 200)
  {
    setData(response.data.data)

  }
  else
  {
    setData([]);
  }
  
    // updateError_code(response.data.error_code)
    // updateError_message(response.data.message);
  
}
catch (err) {
  console.log("Log in Fail", err);

}
}

const [stdClassName,updateStdClassName] = useState("")
async function getClassWiseTeacher(e)
{
  console.log("get class wise teach class id",e.target.value)
  try {
    updateStdClassName(e.target.options[e.target.selectedIndex].text)

    const formData = new FormData();
   
    formData.append("cource_id", stdCourseId);
    formData.append("class_id", e.target.value);
  
    const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_courcewise_and_classwise_teacher_list",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          
          "Authorization": token,
        }
      });

    console.log("Fetch Classwise Student List", response.data.data);
   
  if(response.data.error_code == 200)
  {
    setData(response.data.data)

  }
  else{
    setData([]);
  }
  
    // updateError_code(response.data.error_code)
    // updateError_message(response.data.message);
  
}
catch (err) {
  console.log("Log in Fail", err);

}
}

  async function fetchCourseList() {
    try {

      const fetchClassResponse = await axios.get(process.env.REACT_APP_API_KEY + "campus_get_course",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );



      const CourseErrorCode = fetchClassResponse.data.error_code;
      console.log("Course Error Code ", CourseErrorCode);


      if (CourseErrorCode == 200) {
        const courseListArray = fetchClassResponse.data.data;
        console.log("Course list Array", courseListArray);
        setClassData(courseListArray)
      }
      else {
        setClassData([])
      }


    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  function getSubject(e)
  {
    
   
    updateSubjectId(e.target.value)
  }

  const [subjectData, updateSubjectData] = useState([])
  async function courseWiseSubjectList(e)
  {
    fetchCourseWiseClassList(e.target.value)
    updateCourseId(e.target.value)
    const formDataPersona = new FormData();
  
    formDataPersona.append("d_id", departmentId);
    formDataPersona.append("c_id", e.target.value);
  
  
    const responsePersona = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_coursewise_subject",
      formDataPersona,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      });
  
    console.log("Coursewise subject list", responsePersona.data);
    if(responsePersona.data.error_code == 200)
    {
      updateSubjectData(responsePersona.data.data)
    }
    
  }
  const [firstName, updateFirstName] = useState("")
  const [lastName, updateLastName] = useState("")
  const [prefferedName,updatePrefferedName] = useState("")
  const [gender, updateGender] = useState("")
  const [genderName, updateGenderName] = useState("")
  const [dateOfBirth, updateDateOfBirth] = useState("")
  const [designation, updateDesignation] = useState("")

  const [departmentId, updateDepartmentId] = useState("")
  const [departmentName, updateDepartmentName] = useState("")
  const [courseId, updateCourseId] = useState("")
  const [courseName, updateCourseName] = useState("")
  const [classId, updateClassId] = useState("")
  const [teacherClassName, updateTeacherClassName] = useState("")
  const [subjectId, updateSubjectId] = useState("")
  const [subjectName, updateSubjectName] = useState("")
  const [raceId, updateRaceId] = useState("")
  const [race, updateRace] = useState("")
  const [spokenLanguageId, updateSpokenLanguageId] = useState("")
  const [spokenLanguage, updateSpokenLanguage] = useState("")
 

  async function getSingleTeacher(teacher_id) {
   
    try {
      const formData = new FormData();

      formData.append("teacher_id", teacher_id);
      const fetchTeacherResponse = await axios.post(process.env.REACT_APP_API_KEY + "get_single_teacher",
      formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("fetch Teacher Response", fetchTeacherResponse);
      if(fetchTeacherResponse.data.error_code == 200)
      {
        fetchTeacherResponse.data.data.map((item) =>
        {
         updateFirstName(item.first_name)
      updateLastName(item.last_name)
      updateGender( item.gender)
      item.gender == 1 ?
      updateGenderName("Male"):  updateGenderName("Female")
        updatePrefferedName(item.preffered_name)
          updateDateOfBirth(item.dob)
          updateDesignation(item.designation)
       updateDepartmentId(item.department_id)
          updateDepartmentName(item.department_name)
           updateCourseId(item.course)
     updateCourseName(item.course_name)
      
       if(item.class != "")
       {
        item.class.map((item) =>
        {
          updateClassId(item.class_id)
          updateTeacherClassName(item.class_name)
        })
       }
          
          item.subjects.map((subItem) =>
          {
            updateSubjectId(subItem.subject_id)
            updateSubjectName(subItem.subject_name)
          })
          updateRaceId(item.race_id)
         updateRace(item.race_name)
           updateSpokenLanguageId(item.spoken_language_id)
          updateSpokenLanguage(item.spoken_language_name)
        })
      }
     

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  // async function fetchClassList() {
  //   try {

  //     const response = await axios.get(process.env.REACT_APP_API_KEY + "get_classes_list",
  //       {
  //         headers:
  //         {
  //           "Content-Type": 'multipart/form-data',
  //           "Authorization": token,
  //         }
  //       }
  //     );

  //     console.log("Get Class List...............>>", response.data.data);
  //     // setClassList(response.data.data)

  //     const ClassErrorCode = response.data.error_code;
  //     console.log("Class Error Code ", ClassErrorCode);

  //     // if (response.data.error_code == 404) {
  //     //   alert("Invalid Token OR Non Authorized User");
  //     //   window.location.href = "/";
  //     // }


  //     if (ClassErrorCode == 200) {
  //       const classListArray = response.data.data;
  //       console.log("Class list Array", classListArray);
  //       setClassList(classListArray)
  //     }
  //     else {
  //       setClassList([])
  //     }

  //   }
  //   catch (err) {
  //     console.log("Log in Fail", err);

  //   }

  // }


  async function fetchCourseWiseClassList(val) {
    try {
      const formData = new FormData();
      formData.append("department_id", departmentId);
      formData.append("cource_id", val);
      const fetchClassResponse = await axios.post(process.env.REACT_APP_API_KEY + "dept_by_get_classes_list",
        formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );
  
      console.log("Get Class List Details", fetchClassResponse);
  
      const ClassErrorCode = fetchClassResponse.data.error_code;
      console.log("Class Error Code ", ClassErrorCode);
  
      if (ClassErrorCode === 200) {
        const classListArray = fetchClassResponse.data.data;
        console.log("Class list Array", classListArray);
        setClassList(classListArray);
  
      }
      else {
        setClassList([]);
    }
  }
    catch (err) {
      console.log("Log in Fail", err);
  
    }
  
  }

  function addStudents() {
    $(".add_students_modal").toggle();
  }
  function close_student_modal() {
    $(".preview_category").hide();
   
  }
  const getImage = (e) => {
    
    if (e.target.files.length > 0) {
      var src = e.target.files[0];
      
      $("#file-ip-1-preview").html(src.name);
      // updateStudentList(src.name);
      console.log("get imnage from src.........",src.name)
    }
  };

  window.addEventListener("click",function(event){
    const faculty_modal =document.getElementsByClassName("add_students_modal");
    if (event.target===faculty_modal) {
        faculty_modal.style.display="none";
    }
  });

  // window.addEventListener("click",function(event){
  //   const faculty_modal =document.getElementById();
  //   if (event.target===faculty_modal) {
  //       faculty_modal.style.display="none";
  //   }
  // });


  useEffect(() => {
    // fetchCourseList();
    // fetchClassList();
    fetchList();
    getUserDetails();
    fetchLanguageList();
    fetchDepartmentList();
  }, []);

  const courseFilter = (course) => {
    x = document.getElementById("mySelect").value;
    //document.getElementById("demo").innerHTML = "You selected: " + x;
    setCourse(x)
    courseResult = data.filter((val) => {
       console.log("value",val)
      if (course != x) {
        return (
          <p>No Data Available !!!</p>
        )
      } else if (val.course_name.toLowerCase().includes(course.toLowerCase())) {
        return val
       
      }
    })
    console.log("coursefilter", courseResult)
    setFilteredResults(courseResult)

  }

  const classFilter = (clas) => {
    var cls = document.getElementById("selectClass").value;
   
    setStaffClass(cls)
    const classResult = filteredResults.filter((val) => {
      if (clas != cls) {
        return (
          <p>No Data Available !!!</p>
        )
      } else if (val.class_name.toLowerCase().includes(clas.toLowerCase())) {
        return val
      }
    })
    console.log("classFilter", classResult)
    setFilteredResults(classResult)

  }

  const searchKey = (key) => {
    const filterResult = data.filter((val) => {
      if (key == "") {
        return val
      } else if (val.teacher_name.toLowerCase().includes(key.toLowerCase())) {
        return val
      }
    })
    console.log("filterResult",filterResult)
    setFilteredResults(filterResult)
    setData(filterResult)

  }

  const sortData = () => {
    if (!sort) {
      //data filter
      const sortData = data.sort(function (a, b) {
        return ('' + a.teacher_name).localeCompare(b.teacher_name);
      })
      setFilteredResults(sortData)
    } else {
      const sortData = data.sort(function (a, b) {
        return ('' + b.teacher_name).localeCompare(a.teacher_name);
      })
      setFilteredResults(sortData)
    }

    setSort(!sort)

  }
  

  const filterTeachers = (e) => {
    setCourse(e.target.value);
    setStaffClass(e.target.value);
  }


  function close_delete_modal()
  {
    $(".delete_container").hide();
 
    
  }

  const [teacherId, updateTeacherId] = useState("")
  function deleteNews(teacher_id)
  {
    updateTeacherId(teacher_id)
  }
  function editNews(teacher_id)
  {
    updateTeacherId(teacher_id);
    $(".edit_container").show();
    getSingleTeacher(teacher_id);
  }
  const [emailAddress, updateEmailAddress] = useState("");
  const [campudId, updateCampudId] = useState("");
  const [deletePassword, updateDeletePassword] = useState("");
  const [deleteErrorCode, updatedeleteErrorCode] = useState("");
  const [deleteErrorMessage, updatedeleteErrorMessage] = useState("");

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

    console.log("Get campus info", fetchResponse.data.data);
    if(fetchResponse.data.error_code == 200)
    {
      fetchResponse.data.data.map((fetchItem) => {
        updateEmailAddress(fetchItem.email);
        updateCampudId(fetchItem.campus_id);
      });
    }
    
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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      deleteNewsApi();
    }
  }
  async function deleteNewsApi() {
    try {
     
      const formData = new FormData();

      formData.append("teacher_id", teacherId);

      const deleteResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_delete_teacher",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: token,
          },
        }
      );

      console.log("Delete Campus News", deleteResponse);
      if (deleteResponse.data.error_code == 200) {
        $(".delete_popup_password").hide();

        handleButton();
      }
    } catch (err) {
      console.log("Log in Fail", err);
    }
  }

  function close_edit_modal() {
    $(".edit_container").hide();
    $(".send")
  }

 function update_edited_News()
  {
    $(".edit_popup_password").show();
  }

  function close_delete_modal()
  {
    $(".delete_container").hide();
 
    
  }
  const [departmentdata, updateDepartmentData] = useState([]);
  async function fetchDepartmentList() {
    const token = localStorage.getItem('Token');
    console.log("Access Token-", token);
    try {

        const fetchDepartmentResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_department_list",
            {
                headers:
                {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": token,
                }
            }
        );

        console.log("Get Department List Details", fetchDepartmentResponse);

       if(fetchDepartmentResponse.data.error_code == 200)
       {
          updateDepartmentData(fetchDepartmentResponse.data.data)
       }
      

    }
    catch (err) {
        console.log("Log in Fail", err);

    }

}


const [courseData, updateCourseData] = useState([]);

  async function fetchDepartmentWiseCourseList(e) {
   
    
    $('#student_course option').prop('selected', function() {
      return this.defaultSelected;
  });

    console.log("get department id",e.target.value)
    updateDepartmentId(e.target.value)
    try {
      const formData = new FormData();

      formData.append("d_id", e.target.value);
        const fetchDepartmentResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_departmentwise_course",
        formData,   
        {
                headers:
                {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": token,
                }
            }
        );

        console.log("Get Department List Details", fetchDepartmentResponse);

       if(fetchDepartmentResponse.data.error_code == 200)
       {
        updateCourseData(fetchDepartmentResponse.data.data)
       }
      

    }
    catch (err) {
        console.log("Log in Fail", err);

    }

}


const [languagedata, setLanguageData] = useState([]);
  async function fetchLanguageList() {
    const token = localStorage.getItem('Token');
    console.log("Access Token-", token);
    try {

        const fetchLanguageResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_languages_list",
            {
                headers:
                {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": token,
                }
            }
        );

        console.log("Get Language List Details", fetchLanguageResponse);

        const LanguageErrorCode = fetchLanguageResponse.data.error_code;
        console.log("Language Error Code ", LanguageErrorCode);

        const LanguageErrorMsg = fetchLanguageResponse.data.message;
        console.log("Language Error msg ", LanguageErrorMsg);

        if (LanguageErrorCode == 200) {
            const languageListArray = fetchLanguageResponse.data.data;
            console.log("Language list Array", languageListArray);
            setLanguageData(languageListArray);

        }
        else {
            setLanguageData([]);

            console.log(fetchLanguageResponse.data.message);
            $(".alert-danger").show();
            setTimeout(function () {
                $(".alert-danger").hide();
            }, 3000);
        }

    }
    catch (err) {
        console.log("Log in Fail", err);

    }

}

const [nationalitydata, setNationalityData] = useState([]);

async function fetchNationalityList() {
  const token = localStorage.getItem('Token');
  console.log("Access Token-", token);
  try {

      const fetchNationalityResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_nationalities_list",
          {
              headers:
              {
                  "Content-Type": 'multipart/form-data',
                  "Authorization": token,
              }
          }
      );

      console.log("Get Nationality List Details", fetchNationalityResponse);

      const NationalityErrorCode = fetchNationalityResponse.data.error_code;
      console.log("Nationality Error Code ", NationalityErrorCode);

      const NationalityErrorMsg = fetchNationalityResponse.data.message;
      console.log("Nationality Error msg ", NationalityErrorMsg);

      if (NationalityErrorCode == 200) {
          const nationalityListArray = fetchNationalityResponse.data.data;
          console.log("Nationality list Array", nationalityListArray);
          setNationalityData(nationalityListArray);

      }
      else {
          setNationalityData([]);

          console.log(fetchNationalityResponse.data.message);
          $(".alert-danger").show();
          setTimeout(function () {
              $(".alert-danger").hide();
          }, 3000);
      }


  }
  catch (err) {
      console.log("Log in Fail", err);

  }

}

const [personadata, setPersonaData] = useState([]);
async function fetchPersonaList() {
  const token = localStorage.getItem('Token');
  console.log("Access Token-", token);
  try {

      const fetchPersonaResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_persona_list",
          {
              headers:
              {
                  "Content-Type": 'multipart/form-data',
                  "Authorization": token,
              }
          }
      );

      console.log("Get Persona List Details", fetchPersonaResponse);

      const PersonaErrorCode = fetchPersonaResponse.data.error_code;
      console.log("Persona Error Code ", PersonaErrorCode);

      const PersonaErrorMsg = fetchPersonaResponse.data.message;
      console.log("Persona Error msg ", PersonaErrorMsg);

      if (PersonaErrorCode == 200) {
          const personaListArray = fetchPersonaResponse.data.data;
          console.log("Persona list Array", personaListArray);
          setPersonaData(personaListArray);

      }
      else {
          setPersonaData([]);

          console.log(fetchPersonaResponse.data.message);
          $(".alert-danger").show();
          setTimeout(function () {
              $(".alert-danger").hide();
          }, 3000);
      }

  }
  catch (err) {
      console.log("Log in Fail", err);

  }

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

    console.log("check password and verify", deleteNewsResponse);
    updatedeleteErrorCode(deleteNewsResponse.data.error_code);
    updatedeleteErrorMessage(deleteNewsResponse.data.message);

    if (deleteNewsResponse.data.error_code == 200) {
      updateForm();
    }
  }
  var subject_obj =[{
    "subject_id":subjectId
  }
    
  ]

 async function updateForm() {
    setIsEditLoading(true);
    const formData = new FormData();
    
   
    formData.append("teacher_id", teacherId);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("preffered_name", prefferedName);
    formData.append("dob", dateOfBirth);
    formData.append("gender", gender);
    formData.append("department_id", departmentId);
    formData.append("course", courseId);
    formData.append("designation", designation);
    formData.append("classes", classId);
    formData.append("subjects", JSON.stringify(subject_obj));
    formData.append("section", 'A');
    formData.append("spoken_language", spokenLanguageId);
    formData.append("race", race);
   
    const eventResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "edit_teacher",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    console.log("Update Campus Event", eventResponse);
    setIsEditLoading(false);
    if (eventResponse.data.error_code == 200) {
      $(".edit_popup_password").hide();
      handleEditButton();
    }else {
      $(".edit_popup_password").hide();

      setTimeout(() => {
        $(".required_filed").show();
      }, 1000);
    }
   
  }
const handleEditButton = () => {
   
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Teacher Edited Successfully!!",
      icon: "success",
    }).then(function () {
      window.location = "/teachers";
    });
  };


  const handleButton = () => {
    
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Teacher Deleted Successfully!!",
      icon: "success",
    }).then(function () {
      window.location = "/teachers";
    });
  };
  return (
    <div className="content-wrapper">



      <div className="row border_class2 search_box_padding" >

        <div className="col-md-5 d-flex flex-row" >
          <div className="search_box_div">

          <img className="search_box_img"
            src={require("../images/Search.png")}/>

          <input type="text"
             className="search_box"
            placeholder="Search by Name"
            onChange={(e) => searchKey(e.target.value)}
           />
          </div>
        </div>

       
        <div className="col-md-7 d-flex flex-row" style={{justifyContent:"end"}}>
              <div className="d-flex">
                <a href={"#"} >
                {/* download="addStudents.xlsx" */}
                  <div
                    style={{
                      marginLeft: "5px",
                      color: "#FFFFFF",
                      fontSize: "11PX",
                      lineHeight: "18px",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      marginTop: "7px",
                    }}
                  >
                    <img
                      src="dist/img/Download.png"
                      style={{ width: "22px", height: "22px" }}
                    />
                  </div>
                </a>
              </div>

              <div className="d-flex flex-row" style={{ alignItems: "center" }}>
                <p
                  className="faq_bar"
                  style={{
                    marginLeft: "13px",
                    marginRight: "13px",
                    color: "#4AA081",
                  }}
                >
                  |
                </p>
              </div>

              
              <div className=" d-flex flex-row">
                <button
                  type="button"
                  className="d-flex add_faq_button"
                  defaultValue="Sign Up"
                  style={{ justifyContent: "end", position: "relative" }}
                   onClick={addStudents}
                > <span style={{fontSize:"14px",fontWeight:"600"}}>Add faculty</span>
                  <div
                    style={{
                      marginLeft: "5px",
                      fontSize: "12.25PX",
                      fontWeight: "400",
                      fontFamily: "Poppins",
                    }}
                  ></div>
                  <img
                    src="dist/img/AddNew.png"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "13px",
                    }}
                  />
                </button>
                <div
                  class="add_students_modal"
                  style={{ display: "none", position: "absolute" }}
                >
                  <div className="  hover_class">
                    <Link to="/newTeacher"
                      
                      style={{
                        display: "flex",
                        padding: "5px 10px",
                        alignItems: "center",
                      }}
                    >
                      <div className=" d-flex flex-row">
                        <img
                          src="dist/img/CollaboratorMale.png"
                          style={{ width: "15px", height: "15px" }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: "5px",
                          color: "#000000",
                          fontSize: "11PX",
                          lineHeight: "18px",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                        }}
                      >
                        Add a faculty
                      </div>
                    </Link>
                  </div>

                  <div className=" d-flex flex-row hover_class">
                    <a
                      href="#addStudents"
                      style={{
                        display: "flex",
                        padding: "5px 10px",
                        alignItems: "center",
                      }}
                    >
                      <div className=" d-flex flex-row">
                        <img
                          src="dist/img/UserAccount.png"
                          style={{ width: "15px", height: "15px" }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: "5px",
                          color: "#000000",
                          fontSize: "11PX",
                          lineHeight: "18px",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                        }}
                      >
                        Add multiple faculty
                      </div>
                    </a>
                  </div>
                </div>
                {/* modal end */}
              </div>
            </div>

        {/* <div className="col-md-4 d-flex flex-row" style={{justifyContent:"end"}}>
          <div style={{ marginTop: "0px", padding: "0" }}>

            <a href="/newTeacher">


              <button
                type="button"
                className="d-flex buttonContainer news-button"
                defaultValue="Sign Up"

                style={{ padding: "8px 16px", marginTop: "0", background: "#000000", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", borderRadius: "6px", marginLeft: "auto", height: "auto" }}
              >
                
                <div style={{
                  marginLeft: "5px", color: "#FFFFFF", fontSize: "12PX", lineHeight: "18px",
                  fontWeight: "500", fontFamily: "Poppins", fontStyle: "normal"
                }}>Add Faculty</div>
              </button>

            </a>

          </div>
        </div> */}

      </div>

        {/* add multiple faculty modal */}
      <div id="addStudents" className="student_add_new_modal">
        <div className="student_inner_div border_class2" style={{width:"380px"}}>
          <div className="card-body" style={{ marginTop: "0px" }}>
            <div>
              <p
                style={{ fontWeight: "600", color: "black", fontSize: "13px" }}
              >
                Import faculties
              </p>
              <br></br>
              <div>
              <p
                style={{ fontWeight: "300", color: "black", fontSize: "13px" }}
              >
                To import faculty, select a CSV or vCard file.
              </p>
              </div>
              <div class="row">
                <div class="" style={{ padding: "0" }}>
                  <div
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      paddingRight: "0",
                      height:"85px"
                    }}
                  >
                    <label for="file-ip-1">
                      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                       <div  style={{background:"#1F3977",color:"#FFFFFF",height:"50px",width:"110px",
                                   display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"6px",
                                   fontWeight:"300",fontSize:"15px"}}>Select file
                       </div> 
                      <div  id="file-ip-1-preview" style={{display:"block", width:"200px",overflow:"auto",marginLeft:"13px",paddingTop:"8px"}}>
                           
                      </div>
                      </div>
                
                    </label>
                    <input
                      type="file"
                      
                      onChange={(e)=>getImage(e)}
                      id="file-ip-1"
                     
                      accept=".xlsx,.xls,application/vnd.ms-excel"
                      className="input_fields"
                     
                      name="birthdaytime"
                      style={{
                       visibility:"hidden",
                        color: "black",
                        fontSize: "11px",
                        width: "100%",
                        marginTop:"20px"
                        
                       
                      }}
                    />
                     </div>
                     <div class="error_modal" style={{ marginTop: "5px", display:"none",  width: "97%", marginBottom: "5px" }}>
                      <Stack sx={{ width: '100%' }} spacing={2}>
                       <Alert variant="filled" severity="error">
                         Please select file
                     </Alert>
                   </Stack>
                  </div>
                 
                </div>
              </div>

             

              <div className="d-flex mt-3">
                <a
                  onClick={close_student_modal}
                  href="#"
                  style={{ marginLeft: "auto" }}
                >
                  <input
                    type="button"
                    className=""
                    value="Cancel"
                    style={{
                      background:"#ffffff",
                      border:"none",
                      color:"#4779F0"
                    }}
                  />
                </a>

               
                  <input
                    type="button"
                    value="Import"
                    // onClick={() => uploadExcel()}
                    style={{
                      background:"#ffffff",
                      border:"none",
                      color:"#4779F0",
                      marginLeft:"35px"
                    }}
                  />
               

                <div
                  class="formError"
                  style={{ marginTop: "-6px", display: "none" }}
                >
                  <h4
                    class="login-text"
                    style={{ color: "red", fontSize: "10PX", marginLeft: "0" }}
                  >
                    Please Select the File
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     {/* add multiple faculty modal end */}


      <div>

        <div >
          <div className="row border_class2 box_padding">
            <div className="col-md-4">
              <label className="all_labels">Select Department</label>

                   <select className="cat_dropdown all_inputs"
                     id="department_neww"
                     onChange={fetchDepartmentWiseCourseList}
                   
                    style={{background: "#F5F5F5"}}>


                    <option selected="selected" value={departmentId} >Select Department</option>
                    {departmentdata.map((dept, index) => {
                      //  console.log("department data", dept)

                      return (
                        <option value={dept.department_id} key={index} name={dept.department_name}>
                          {dept.department_name}
                        </option>
                      );
                    })}
                  </select>
          
            </div>

            <div className="col-md-3">
             <div className="left_padding">
              <label className="all_labels">Select Coursee</label>

              <select id="student_course" 
               onChange={getCourseWiseTeachers}
               className="cat_dropdown all_inputs"
                style={{background: "#F5F5F5"}}>


                <option selected="selected" style={{
                  color: "black", fontFamily: "Poppins", fontStyle: "normal",
                  fontWeight: "500", fontSize: "11px", lineHeight: "21px"
                }}>Select Course</option>

                {
                  courseData.length > 0 ?
                  courseData.map((cls, index) => {
                      return (
                        <option value={cls.course_id} key={index} style={{
                          color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
                          fontWeight: "500", fontSize: "14px", lineHeight: "21px"
                        }}>
                          {cls.course_name}
                        </option>
                      );
                    })
                    :
                    <div>
                      Data Not Found
                    </div>
                }
              </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="left_padding">
              <label className="all_labels">Select Class</label>

              <select id="selectClass"
               onChange={getClassWiseTeacher} 
               className="cat_dropdown all_inputs"
                style={{background: "#F5F5F5"}}>


                <option selected="selected" style={{
                  color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
                  fontWeight: "500", fontSize: "14px", lineHeight: "21px"
                }}>Select Class</option>


                {
                  classList.length > 0 ?
                  classList.map((item, index) => {
                    return (
                      <option value={item.class_id} key={index} style={{
                        color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
                        fontWeight: "500", fontSize: "14px", lineHeight: "21px"
                      }}>
                        {item.class_name}
                      </option>
                    );
                    })
                    :
                    <div>
                      Data Not Found
                    </div>
                }
              </select>
              </div>
            </div>
          </div>


          {/* <div className="row mt-2">
            <div className="col-md-12 p-0" >
              <label style={{
                fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", fontSize: "11px",  alignItems:"center",
                justifyContent:"center",
                lineHeight: "18px", color: "#1F3977",background:"rgba(31, 57, 119, 0.9)",height:"40px",width:"100%"
              }} >
                <p style={{
                    color: "#FFFFFF", fontWeight: "500",
                    fontFamily: "Poppins", 
                    fontSize: "14px", 
                  
                    padding:"10px",
                    textAlign:"center"
                  }} onChange={filterTeachers}>

                 All Teachers - {stdCourseName} - {stdClassName}
                 </p>
                </label><br></br>

          
            </div>


        
          </div> */}

          
       

          <section className="teacher_profile border_class2 box_padding" style={{height:"380px",overflowY:"auto"}}>
            <div className="">

                      <div className="row" style={{ width: "100%" }} >
        {data == ""?
        (<div style={{fontSize:"14px",textAlign:"center"}}>No Data To Display</div>)
        :
        (
        <div>
 {

data.map((item) => (

  <div className="col-md-4" style={{  padding: "0px 5px", marginBottom: "5px", }}>
    <div className="small-box" style={{ flexWrap: "wrap", borderRadius: "none", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",height:"110px" }}>
      <div className="d-flex" >
        <div style={{ borderRadius: "50%", marginTop: "10px", marginLeft: "10px" }}>

          {
            item.profile == "" ?
              (
                <div>
                  <img src={require("../images/no_image.png")} alt="no image" style={{ borderRadius: "50%", width: "70px", height: "70px" }} />
                </div>
              ) : (
                <div>
                  <img src={item.profile} alt="profile"
                    style={{ borderRadius: "50%", width: "70px", height: "70px" }} />
                </div>
              )
          }
        </div>
        <div className="onlineStatus" style={{ marginLeft: "63px", marginTop: "68px" }}></div>
        <div className="inner mt-2" style={{ marginLeft: "10PX"}}>
          <div style={{ fontWeight: "bold", fontSize: "12px" }}>{item.teacher_name} </div>
          <div style={{ fontWeight: "500", color: "#2d2dd0", marginTop: "5PX", fontSize: "12px", fontFamily: "Poppins", fontStyle: "normal", lineHeight: "18px" }}>{item.department_name}</div>
          <div style={{ fontWeight: "bold", color: "#339dd8", marginTop: "5px", fontSize: "10px" }}>


            <div style={{ fontWeight: "500", color: "rgba(0, 0, 0, 0.5)", marginTop: "5PX", fontSize: "12px", fontFamily: "Poppins", fontStyle: "normal", lineHeight: "18px" }}>
              {item.designation}
            </div>

          </div>

        </div>
              <a
              className="cta ml-auto"
              href="#edit"
              onClick={() => editNews(item.teacher_id)}
              style={{ backgroundColor: "transparent" }}
              >
              <img style={{ width:"15px",height:"15px", marginLeft: "auto",float:"right" }} src="dist/img/Pencil.png" />&nbsp;
              </a>


            <a
            className="cta"
            href="#deleterow"
            onClick={() => deleteNews(item.teacher_id)}
            style={{ backgroundColor: "transparent" }}
            >
            <img style={{ width:"15px",height:"15px", margin:"0",float:"right" }} src={require('../images/delete.png')}  />&nbsp;
            </a>

      </div>


    </div>
  </div>

))
}
</div>)}

               

              </div>

            </div>
          </section>
        </div>
        {/* end teacher info */}
      </div>

      {/* edit staff */}
     
      <div
        id="edit"
        className="edit_container">
        <div className="edit_container_inner">
          <div
            className="d-flex"
            style={{
              borderBottom: "2px solid #15a312",
              transform: "rotate(0.13deg)",
              paddingBottom: "10px",
            }}
          >
            <label className="main_labels">
              Edit Teacher
            </label>

            <img
              src="dist/img/Cancel.png"
              onClick={() => close_edit_modal()}
              alt="dropdown"
             
              className="close_event ml-auto cancel_img"
              
            />
          </div>

          <div className="card-body preview_form">
            <div
              style={{
                marginTop: "5px",
                fontSize: "11PX",
                margin: "0",
                padding: "0 5px 0 0",
              }}
            >
              <div className="mt-2 border_class2 edit_row_padding">
              <div className=" p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12 d-flex">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          First Name
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="name"
                        className="input_fields all_edit_inputs"
                        id="first_name"
                        value={ firstName}
                        onChange={(e) =>  updateFirstName(e.target.value)}
                        // placeholder="Your Title goes here..."
                        autoComplete="true"
                        
                      />
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
                  </div>

                  
                </div>
              </div>

              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12 d-flex" >
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Last Name
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>

                      <input
                        type="name"
                        className="input_fields all_edit_inputs"
                        id="last_name"
                        value={ lastName}
                        onChange={(e) =>  updateLastName(e.target.value)}
                        // placeholder="Your Title goes here..."
                        autoComplete="true"
                        
                      />
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
                  </div>
                </div>
              </div>
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12 d-flex">
                    <div
                      style={{
                        width: "100%",
                        marginTop: "0px",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                          Preffered Name
                        </label>

                      </div>

                      <input
                        type="name"
                        className="input_fields all_edit_inputs"
                        id="preferred_name"
                        value={prefferedName}
                        onChange={(e) =>  updatePrefferedName(e.target.value)}
                        // placeholder="Your Title goes here..."
                        autoComplete="true"
                       
                      />
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
                  </div>

               
                </div>
              </div>
              </div>

              <div className="mt-2 border_class2 edit_row_padding">
              <div className=" p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <label className="all_labels">
                       Gender
                      </label>
                     

                      <select className="form-select form-select-sm all_edit_inputs" 
                      aria-label=".form-select-sm example"
                                        id="gender"

                                        onChange={(e) => updateGender(e.target.value)}
                                        >
                                        <option selected 
                                        value={gender}
>
                                          {gender}</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    

                                    </select>

                  

                      <div
                        class="PublishDate"
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
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>

              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                        Date Of Birth
                        </label>

                      </div>
                      <input
                        type="name"
                        className="input_fields all_edit_inputs"
                        id="news_title"
                        value={ dateOfBirth}
                        onChange={(e) =>  updateDateOfBirth(e.target.value)}
                        // placeholder="Your Title goes here..."
                        autoComplete="true"
                       
                      />
                      <div
                        class="NewsDescription"
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
                          Please Write News Description
                        </h4>
                      </div>
               
                    </div>
                  </div>

                
                </div>
              </div>
              </div>

              <div className="mt-2 border_class2 edit_row_padding">
              <div className=" p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                        Designation
                        </label>

                      </div>
                      <input
                        type="name"
                        className="input_fields all_edit_inputs"
                        id="designation_neww"
                        value={ designation}
                        onChange={(e) =>  updateDesignation(e.target.value)}
                        // placeholder="Your Title goes here..."
                        autoComplete="true"
                        
                      />
                      <div
                        class="NewsDescription"
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
                          Please Write News Description
                        </h4>
                      </div>
               
                    </div>
                  </div>

              
                </div>
              </div>
{/* department */}
           
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                     <div className="d-flex">
                        <label className="all_labels">
                        Department
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                     
                      <select className="form-select form-select-sm all_edit_inputs" 
                      aria-label=".form-select-sm example"
                                        id="department"
                                        onChange={fetchDepartmentWiseCourseList}>
                                        
                                        <option selected="selected" 
                                        value={departmentName} 
                                        >{departmentName}</option>
                                        {departmentdata.map((dept, index) => {
                                           
                                            return (
                                                <option value={dept.department_id} key={index}>
                                                    {dept.department_name}
                                                </option>
                                            );
                                        })}
                                    </select>

                  

                      <div
                        class="PublishDate"
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
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>

              {/* course */}

              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                     <div className="d-flex">
                        <label className="all_labels">
                        Course
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                   
                      <select className="form-select form-select-sm all_edit_inputs" 
                      aria-label=".form-select-sm example"
                                        id="department"
                                        onChange={courseWiseSubjectList}
                                        >
                                        <option selected="selected" 
                                        value={courseName} 
                                        >{courseName}</option>
                                        {courseData.map((dept, index) => {
                                            // console.log("Id", dept.department_name)
                                            return (
                                                <option value={dept.course_id} key={index}>
                                                    {dept.course_name}
                                                </option>
                                            );
                                        })}
                                    </select>

                  

                      <div
                        class="PublishDate"
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
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>

              {/* CLASS */}
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                     <div className="d-flex">
                        <label className="all_labels">
                        Class
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                     
                      <select className="form-select form-select-sm all_edit_inputs"
                         aria-label=".form-select-sm example"
                                        id="department"
                                        onChange={(e) => updateClassId(e.target.value)}
                                       >
                                        <option selected="selected" value={teacherClassName}>{teacherClassName}</option>
                                        {/* <option value="1" >Firsttttttt Year</option>
                                        <option value="2" >Second Year</option>
                                        <option value="3" >Third Year</option>
                                        <option value="4" >Fourth Year</option>
                                        <option value="5" >Fifth Year</option>
                                        <option value="6" >Sixth Year</option> */}
                                   {
                                      classList.length > 0 ?
                                      classList.map((item, index) => {
                                        return (
                                          <option value={item.class_id} key={index} style={{
                                            color: "#000000", fontFamily: "Poppins", fontStyle: "normal",
                                            fontWeight: "500", fontSize: "14px", lineHeight: "21px"
                                          }}>
                                            {item.class_name}
                                          </option>
                                        );
                                        })
                                        :
                                        <div>
                                          Data Not Found
                                        </div>
                                    }
                                    </select>

                  

                      <div
                        class="PublishDate"
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
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>

              {/* SUBJECT */}
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                  <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <div className="d-flex">
                        <label className="all_labels">
                        Subject
                        </label>

                        <p className="all_stars">
                          *
                        </p>
                      </div>
                    
                      <select className="form-select form-select-sm all_edit_inputs" aria-label=".form-select-sm example"
    id="student_course"
    onChange={getSubject}>
   
    <option selected="selected" value={subjectName} >{subjectName}</option>
    

{subjectData.map((item, index) => {
      //console.log("Id", item.class)
      return (
        <option value={item.subject_id} key={index} >
          {item.subject_name}
        </option>
      );
    })}

  
   
  </select>

                  

                      <div
                        class="PublishDate"
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
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>
             </div>
        
             <div className="mt-2 border_class2 edit_row_padding">
              <div className=" p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                
                <div class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <label className="all_labels">
                       Race/Ethnicity
                      </label>
                     

                      <select className="form-select form-select-sm all_edit_inputs" aria-label=".form-select-sm example"
                                        id="race"
                                        onChange={(e) => updateRace(e.target.value)}
                                        >
                                        <option selected 
                                        value={race}
                                        >{race}</option>
                                        <option value="1">Asian</option>
                                        <option value="2">American Indian or Alaska Native</option>
                                        <option value="3">Native Hawaiian or Pacific Islander</option>
                                     

                                       
                                    </select>


                  

                      <div
                        class="PublishDate"
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
                          Please Select Publish Date
                        </h4>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
   
              <div className="mt-2 p-0">
                <div class="row" style={{ padding: "0", margin: "0" }}>
                
             
                  <div  class="col-md-12">
                    <div
                      className=""
                      style={{ width: "100%", marginTop: "0px" }}
                    >
                      <label className="all_labels">
                 Spoken Language
                      </label>
                     
                      <select className="form-select form-select-sm all_edit_inputs" aria-label=".form-select-sm example"
                                        id="spoken_language"
                                        onChange={(e) =>  updateSpokenLanguageId(e.target.value)}
                                       >
                                        <option selected="selected" 
                                        value={spokenLanguage} 
                                        >{spokenLanguage}</option>
                                        {languagedata.map((lang, index) => {
                                            //  console.log("Id", language.country)
                                            return (
                                                <option value={lang.language_id} key={index} >
                                                    {lang.language}
                                                </option>
                                            );
                                        })}


                                    </select>

                    
                      <div
                        class="ExpireDate"
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
                          Please Select Expire Date
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             </div>
           
           
              

              <div className="d-flex mt-3 edit_buttons_div border_class2">
                <a
                  onClick={() => close_edit_modal()}
                  href="#"
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
                  href="#edit_with_password"
                  style={{ backgroundColor: "transparent" }}
                >
                  <input
                    type="button"
                    className="edit_update_button"
                    id="delete_single_student"
                    value="Update"
                  onClick={() => update_edited_News()}
                  />
                </a>
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
              Edit Student
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

      {/* delete studnet */}
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
                Are You Sure You Want To Delete This Teacher?
                
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
              Delete Teacher
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
        
    </div>
  )
}
