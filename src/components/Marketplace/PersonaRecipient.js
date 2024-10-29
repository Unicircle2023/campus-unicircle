import React, { useState, useEffect,useMemo } from "react";
import {RiCameraLensLine} from "react-icons/ri";
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component';
import FilterRecipient from "./FilterRecipient";
import axios from "axios";
import $ from "jquery";
import {BsFillPencilFill} from "react-icons/bs"
import {MdDelete} from "react-icons/md"
import moment from 'moment';
import styled from "styled-components";

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
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
   
  head: {
      style: {
       
        borderBottom:"0.5px solid #C4C4C4",
        marginTop:"0PX"
      },
    },

    rows: {
      style: {
        background:"#f5f5f5",
        borderBottom:"0.5px solid #f5f5f5",
        padding:"0"
      }
    },

    table: {
      style: {
       
      
       height:"220px",
       
      },
    },
 
};


export function PersonaRecipient({studentId,passPersonaData}) {

    
  const token = localStorage.getItem('Token');
  const [isEditLoading, setIsEditLoading] = useState(false);
  
  const [deleteErrorCode,updatedeleteErrorCode] = useState("")
  const [deleteErrorMessage,updatedeleteErrorMessage] = useState("")
  const[data, setData] = useState([]);
  const [personaId,updatePersonaId] = useState([])
  // const [stdid, updateStdid] = useState([]);
  const format_array=(array)=>{
    let mapping=array.map(item=>{
      let obj={
        id: item
      }
      return obj
    })
    updatePersonaId(mapping)
  }
  
  useEffect(() => {
  
    // updateStdid(studentId);
    format_array(studentId)
    
  }, [])
  console.log("stdid",personaId)
  async function fetchList() {
  
    try{
      
        const fetchPersonaResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_persona_list",
        {
          headers: 
        {
          "Content-Type": 'multipart/form-data',
        
          "Authorization": token,
        } 
        }
      );
     
        console.log("Student Details",fetchPersonaResponse.data.data);
        setData(fetchPersonaResponse.data.data);
        
  
      
    }
    catch(err)
    {
      console.log("Log in Fail",err);
     
    }
   
  }
  
  var persona_name =[]
  async function InviteStudent()
  {
    
 
    const formData = new FormData();
      formData.append("persona", JSON.stringify(personaId));

      const fetchNewsResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_user_id_from_persona",
        formData,
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',

            "Authorization": token,
          }
        }
      );

      console.log("Get_user_id_name from persona", fetchNewsResponse.data.data);
   $(".invitation").show();
      fetchNewsResponse.data.data.map((item)=>
      {
        console.log("get persona name",item.persona_name)
        persona_name.push(item.persona_name)
      })
      
      passPersonaData(JSON.stringify(personaId),persona_name) ;
    
  }
  useEffect(() => {
    getUserDetails();
    fetchList();
  },[]);

  const handleButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "'Yes, Deleted it!'..",
      type: "success",
      text: "Persona Deleted Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/createNews";
  });
  
  };


  const handleEditButton = () => {
    // Swal.fire("Good job!", "Record Deleted Successfully!", "success");
    Swal.fire({
      title: "'Yes, Edited it!'..",
      type: "success",
      text: "Persona Edited Successfully!!",
      icon: "success",
    }).then(function() {
      window.location = "/createNews";
  });
  
  };
  const columns = [
    {
      name: '',
      // selector: 'student_name',
      sortable: true,
      wrap: true,
      width:"10%",
      cell: (row) => {
        console.log("print row",row)
        const isSelected = personaId.filter((i) => i.id === row.persona_id).length > 0; // checking if the item is already selected
        var checked = ""
        return(
<div onClick={() =>
{if (isSelected) {
  updatePersonaId((prev) => prev.filter((i) => i.id !== row.persona_id));
                                                } else {
                                                  let obj={
                                                    id:row.persona_id
                                                  }
                                                  updatePersonaId(prev => [...prev, obj])
                                                }}} >
     {personaId.map((item) =>
    {
 
 if(item.id ==  row.persona_id)
 checked ="true"
    })}
           <input type="checkbox" 
             value={row.persona_id}
             checked={checked} 
            // onChange={(e) => updateStdid(e.target.value)}

            
            />
        </div>
        )

        
        
      }
    
    },
    {
      name: 'Persona Name',
      selector: 'persona',
    
      wrap: true,
      width:"60%",
   
    
    },
    {
        name: '',
        // sortable: true,
        wrap: true,
        width:"auto",
        cell: (row) =>{
        
          return(
            <div className="d-flex">
         <a className="cta" href="#edit"  onClick={() => editNews(row.persona_id,row.persona)} style={{backgroundColor:"transparent"}}>
        <img src={require("../images/Pencil.png")} alt="edit" style={{width:"15px", height:"15px",marginLeft:"5px"}} />
       </a>

        <a className="cta" href="#delete"  onClick={() => deleteNews(row.persona_id,row.persona)} style={{backgroundColor:"transparent"}}>
            <img style={{ width:"15px",height:"15px", marginLeft: "2px" }} src={require('../images/delete.png')}  />&nbsp;
           </a>
        

     
        </div>
  
          )
        } 
      }
      
     
  ];

  const [emailAddress,updateEmailAddress] = useState("")
const [campudId,updateCampudId] = useState("")
  async function getUserDetails()
  {
    
    
      const fetchResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_Primary_user_info",
      
      {
          headers:
          {
              "Content-Type": 'multipart/form-data',
              
              "Authorization": token,
          }
      });
   
      console.log("Get campus info",fetchResponse.data.data);
      fetchResponse.data.data.map((fetchItem) =>
      {
        updateEmailAddress(fetchItem.email)
        updateCampudId(fetchItem.campus_id)
      })
  }
  const [editPersonaId,updateEditPersonaId] =  useState([])
  const [editPersona,updateEditPersona] =  useState([])
// edit persona
function editNews(persona_id,persona)
{

  $(".edit_container").show();
  updateEditPersonaId(persona_id);
  updateEditPersona(persona)

}

async function editWithPassword()
{

  const formData = new FormData();
 
  formData.append("username", emailAddress);
  formData.append("password", deletePassword);
  formData.append("campus_id", campudId);

  const deleteNewsResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_check_password",
    formData,
    {
      headers:
      {
        "Content-Type": 'multipart/form-data',
        
        "Authorization": token,
      }
    });

  console.log("check password and verify", deleteNewsResponse);
  updatedeleteErrorCode(deleteNewsResponse.data.error_code)
  updatedeleteErrorMessage(deleteNewsResponse.data.message)

if(deleteNewsResponse.data.error_code == 200)
{ 
  updateForm();
 
 
}      
}

async function updateForm()
{
  
  setIsEditLoading(true)
    const formData = new FormData();


    formData.append("id", editPersonaId);
    formData.append("persona", editPersona);
    
    
    const eventResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_edit_persona",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          "Authorization": token,
        }
      });
      console.log("Update Campus Event", eventResponse);
    setIsEditLoading(false)
    if (eventResponse.data.error_code == 200) 
    {
      $(".edit_popup_password").hide();
      handleEditButton();
    }

}

// delete persona
const [deletePersonaId,updateDeletePersonaId] = useState([])
const [deletePersona,updateDeletePersona] = useState([])
function deleteNews(persona_id,persona)
{
  updateDeletePersonaId(persona_id);
  updateDeletePersona(persona)

  $(".delete_container").show();
}
async function deleteNewsApi()
{
  try {
      
    
    const formData = new FormData();
   
    formData.append("id", deletePersonaId);
  
    const deleteResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_delete_persona",
      formData,
      {
        headers:
        {
          "Content-Type": 'multipart/form-data',
          
          "Authorization": token,
        }
      });

    console.log("Delete Campus News", deleteResponse);
    if(deleteResponse.data.error_code == 200)
    {
      $(".delete_popup_password").hide()

      
            handleButton();
      
    }
  
}
catch (err) {
  console.log("Log in Fail", err);

}
}

const [deletePassword,updateDeletePassword] = useState("")

async function deleteWithPassword()
{

  const formData = new FormData();
 
  formData.append("username", emailAddress);
  formData.append("password", deletePassword);
  formData.append("campus_id", campudId);

  const deleteNewsResponse = await axios.post(process.env.REACT_APP_API_KEY + "admin_check_password",
    formData,
    {
      headers:
      {
        "Content-Type": 'multipart/form-data',
        
        "Authorization": token,
      }
    });

  console.log("check password and verify", deleteNewsResponse);
  updatedeleteErrorCode(deleteNewsResponse.data.error_code)
  updatedeleteErrorMessage(deleteNewsResponse.data.message)

if(deleteNewsResponse.data.error_code == 200)
{ 
  deleteNewsApi();
 
 
}      
}

function close_delete_modal()
  {
    $(".delete_container").hide();
 
    
  }
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
    <div className="mt-2" style={{width:"100%",margin:"0",paddingBottom:"10px",borderBottom:"0.5px solid #C4C4C4"}} >

    <div className=" d-flex flex-row" style={{ borderRadius:"10px",height: "98%",background:"rgba(228, 233, 243, 0.6)",padding:"0px",border:"1px solid #E5E5E5",margin:"0px 10px"}}>
    <img src={require("../images/Search.png")} style={{width:"21px",height:"21px",margin: "5px 0px 0px 3px",}}/>
      {/* <img src="dist/img/Search.png" alt="dropdown" width="18px" height="18px"   /> */}
    <Input
    id="search"
    type="text"
    placeholder="Search by Persona"
    value={filterText}
    onChange={e => setFilterText(e.target.value)}
    style={{background:"rgba(228, 233, 243, 0.6)", height:"35px", width:"100%",border:"none",fontWeight:"600",borderRadius:"10PX"}}
  />
    </div>

  </div>
);
}, [filterText, resetPaginationToggle]);


    return (
        <div>
           
<div className="recipient_class"  style={{marginTop:"0px",height:"100%",padding:"0"}}>
<div id="edit" className="modaloverlay edit_container">
                 
                 <div className="modalContainer" style={{width:"500px"}}>
                     
                       <div className="card-body" style={{ marginTop: "0px", }} >
                         <div >
           
            
           <p style={{fontWeight:"600",color:"black",fontSize:"13PX",borderBottom:"1px solid #f5f5f5"}}>Edit Persona</p>

                     <div style={{marginTop:"20PX",fontSize:"13PX"}}>
                         {/* <div style={{ background: "white", margin: "5px 30px 0px 15px", padding: "10px 10px 10px 20px", width: "98%", borderRadius: "10PX" }}> */}

        <div className="mt-2 p-0">
          <div class="row">
           
           


            <div class="col-md-12" style={{ paddingLeft: "0" }}>
              <div className="" style={{ width: "100%", marginTop: "0px" }}>
                <div className="d-flex">
                  <label style={{ color: "#1F3977", fontSize: "11px", fontWeight: "600" }}>Enter Persona</label>

                  <p style={{ color: "#EB2424", fontWeight: "600", marginLeft: "3PX" }}>*</p>
                </div>
                <input
                  type="name"
                  className="input_fields"
                  id="news_title"
                  value={editPersona}
                  onChange={(e) => updateEditPersona(e.target.value)}
                  
                  autoComplete="true"
                  style={{ width: "100%", height: "35px", border: "1px solid #c4c4c4", boxSizing: "border-box", fontSize: "11px", paddingLeft: "5PX",color:"black" }}

                />
                <div
                  class="NewsTitle"
                  style={{ marginTop: "-6px", display: "none" }}>
                  <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
                    Please Write News Title
                  </h4>
                </div>


              </div>
            </div>



          </div>
        </div>

                       </div>      
           
                           <div className="d-flex mt-3">
                          
           <a onClick={close_delete_modal} href="#" style={{marginLeft:"auto"}}>
           <input
                                              type="button"
                                              className="create_btn"
                                              value="Cancel"
                                              
                                              style={{ borderRadius: "5px", backgroundColor: "transparent",color:"#1F3977",fontWeight:"600", fontSize:"13PX",padding:"8px 12px"}}
                                            />
           </a>
           
           
           <a className="cta" href="#edit_with_protection"  style={{backgroundColor:"transparent"}}>
           <input
                                              type="button"
                                              className="create_btn"
                                              id="delete_single_student"
                                              value="Update"
                                              // onClick={() =>updateForm()}
                                              style={{ borderRadius: "5px", marginRight:"7px",backgroundColor: "#1F3977" ,fontSize:"13PX",padding:"8px 12px"}}
                                            />
            
              </a>                                
                           </div>
         
                          
           
                         </div>
                       </div>
                    
                     
                   </div>       
                        
           </div>


{/* edit popuop with password */}
<div id="edit_with_protection" className="modaloverlay edit_popup_password">
                 
                 <div className="modalContainer" style={{width:"500px",borderRadius:"0",padding:"10PX",background: "#6C7A99"}}>
                     
                       {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
                         <div className="d-flex" style={{padding:"5px"}}>
           
            
           <p style={{fontWeight:"600",color:"white",fontSize:"13px",marginTop:"5PX"}}>Edit Persona</p>
           <a onClick={close_delete_modal} href="#" style={{marginLeft:"auto",marginTop:"0"}}>
             <img src={require("../images/delete_cancel.png")}  style={{height:"26px", width:"26px"}}/>
                                                   
           </a>
             </div>       
           
                           
                          
          
<div style={{background:"white",padding:"15px",fontSize:"13px"}}>
  <div className="d-flex">
    <p style={{color:"#2D5DD0"}}>Warning:</p>
    <p style={{marginLeft:"5px",color:"black"}}>You are deleting a screen. This operation cannot be</p>
    </div>

<p style={{color:"black"}}> undone. Please type the password of the screen Admin into the box below to confirm you really want to do this.</p>

<div className="d-flex mt-4">
  <p style={{marginTop:"10PX", fontWeight:"600",fontSize:"13PX",color:"black  "}}>Admin Password:</p>
  <input
                                              type="password"
                                              // className="create_btn"
                                              // id="delete_single_student"
                                            value={deletePassword}
                                            onChange={(e) => updateDeletePassword(e.target.value)}
                                              style={{ marginLeft:"6px",width:"70%",borderRadius: "5px",background:"white",height:"40px",fontSize:"13PX",padding:"8px 12px",border:"1px solid #2d5dd0"}}
                                            />

</div>
<div className="d-flex mt-4">
<div style={{marginTop:"10PX"}}>
  { deleteErrorCode == 200 ?
  (
  <div style={{color:"green"}}>{ deleteErrorMessage}</div>
  )
  :( 
<div style={{color:"red"}}>{ deleteErrorMessage}</div>
  )
 
  
  }</div> 
<input
                                              type="button"
                                              className="create_btn ml-auto"
                                              id="delete_single_student"
                                              value="Edit"
                                              onClick={() =>editWithPassword()}
                                           
                                              style={{ borderRadius: "5px", marginRight:"7px",background:"rgba(235, 36, 36, 0.95)" ,fontSize:"13PX",padding:"8px 25px"}}
                                            />
                                            </div>
</div>
           
    
                                            
                          
           
                          
           
                       {/* </div> */}
                     {/* </form> */}
                     
                   </div>       
                        
           </div>   

<div id="delete" className="modaloverlay delete_container">
                 
                 <div className="modalContainer">
                     
                       <div className="card-body" style={{ marginTop: "0px", }} >
                         <div >
           
            
           <p style={{fontWeight:"600",color:"black",fontSize:"13px"}}>Delete message?</p>
                     <h2 style={{marginTop:"20PX",fontSize:"13PX",color:"black"}}>Are You Sure You Want To Delete "{deletePersona}" Persona</h2>      
           
                           <div className="d-flex mt-3">
                          
           <a onClick={close_delete_modal} href="#" style={{marginLeft:"auto"}}>
           <input
                                              type="button"
                                              className="create_btn"
                                              value="Cancel"
                                              
                                              style={{ borderRadius: "5px", backgroundColor: "#c4c4c4", fontSize:"13PX",padding:"8px 12px"}}
                                            />
           </a>
           
           
           <a className="cta" href="#delete_with_protection"  style={{backgroundColor:"transparent"}}>
           <input
                                              type="button"
                                              className="create_btn"
                                              id="delete_single_student"
                                              value="Delete"
                                              // onClick={() =>deleteMessage()}
                                              style={{ borderRadius: "5px", marginRight:"7px",backgroundColor: "#d21f3c" ,fontSize:"13PX",padding:"8px 12px"}}
                                            />
      
             </a>                               
                           </div>
           
                          
           
                         </div>
                       </div>
                     {/* </form> */}
                     
                   </div>       
                        
           </div>

{/* delete popuop with password */}
<div id="delete_with_protection" className="modaloverlay delete_popup_password">
                 
                 <div className="modalContainer" style={{width:"500px",borderRadius:"0",padding:"10PX",background: "#6C7A99"}}>
                     
                       {/* <div className="card-body" style={{ marginTop: "0px", background: "#6C7A99",borderRadius:"0"}} > */}
                         <div className="d-flex" style={{padding:"5px"}}>
           
            
           <p style={{fontWeight:"600",color:"white",fontSize:"13px",marginTop:"5PX"}}>Delete News</p>
           <a onClick={close_delete_modal} href="#" style={{marginLeft:"auto",marginTop:"0"}}>
             <img src={require("../images/delete_cancel.png")}  style={{height:"26px", width:"26px"}}/>
                                                   
           </a>
             </div>       
           
                           
                          
          
<div style={{background:"white",padding:"15px",fontSize:"13px"}}>
  <div className="d-flex">
    <p style={{color:"#2D5DD0"}}>Warning:</p>
    <p style={{marginLeft:"5px",color:"black"}}>You are deleting a screen. This operation cannot be</p>
    </div>

<p style={{color:"black"}}> undone. Please type the password of the screen Admin into the box below to confirm you really want to do this.</p>

<div className="d-flex mt-4">
  <p style={{marginTop:"10PX", fontWeight:"600",fontSize:"13PX",color:"black"}}>Admin Password:</p>
  <input
                                              type="text"
                                              // className="create_btn"
                                              // id="delete_single_student"
                                            value={deletePassword}
                                            onChange={(e) => updateDeletePassword(e.target.value)}
                                              style={{ marginLeft:"6px",width:"70%",borderRadius: "5px",background:"white",height:"40px",fontSize:"13PX",padding:"8px 12px",border:"1px solid #2d5dd0"}}
                                            />

</div>
<div className="d-flex mt-4">
<div style={{marginTop:"10PX"}}>
  { deleteErrorCode == 200 ?
  (
  <div style={{color:"green"}}>{ deleteErrorMessage}</div>
  )
  :( 
<div style={{color:"red"}}>{ deleteErrorMessage}</div>
  )
 
  
  }</div> 
<input
                                              type="button"
                                              className="create_btn ml-auto"
                                              id="delete_single_student"
                                              value="Delete"
                                              onClick={() =>deleteWithPassword()}
                                           
                                              style={{ borderRadius: "5px", marginRight:"7px",background:"rgba(235, 36, 36, 0.95)" ,fontSize:"13PX",padding:"8px 25px"}}
                                            />
                                            </div>
</div>
           
    
                                            
                          
           
                          
           
                       {/* </div> */}
                     {/* </form> */}
                     
                   </div>       
                        
           </div> 
           <div className="mt-2" style={{ width: "100%", margin: "0", paddingBottom: "10px", borderBottom: "0.5px solid #C4C4C4" }} >

          <div className=" d-flex flex-row" style={{ borderRadius: "10px", height: "98%", background: "rgba(228, 233, 243, 0.6)", padding: "0px", border: "1px solid #E5E5E5", margin: "0px 10px" }}>
            <img src={require("../images/Search.png")} style={{ width: "21px", height: "21px", margin: "5px 0px 0px 3px", }} />
            {/* <img src="dist/img/Search.png" alt="dropdown" width="18px" height="18px"   /> */}
            <Input
              id="search"
              type="text"
              placeholder="Search by Persona"
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              style={{ background: "rgba(228, 233, 243, 0.6)", height: "35px", width: "100%", border: "none", fontWeight: "600", borderRadius: "10PX" }}
            />
          </div>

        </div>
<DataTable
      
        columns={columns}
        data={filteredItems}
        striped
      pagination
      subHeader
      paginationRowsPerPageOptions={[5,10, 25, 50, 100]}
      subHeaderComponent={subHeaderComponent}
        highlightOnHover
        defaultSortFieldId={1}
        // selectableRows  
        customStyles={customStyles}
  />
{/* end news table */}
<input
                            type="button"
                            className=" form-buttons3"
                            defaultValue="Sign Up"
                            onClick={() =>InviteStudent()}
                            value="Invite"
                            style={{ fontWeight: "500", border:"none",color:"white",borderRadius: "6px", marginLeft: "8px", backgroundColor: "#1F3977", padding: "10px 40px", fontSize: "12PX",boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",marginRight:"60PX",marginBottom:"20px" }}
                        />
                        <div style={{color:"black",marginLeft:"10px", fontSize:"12px",display:"none"}} className="invitation">
                         Persona Invited Successfully
                        </div>
        </div>
   
        </div>
    )
}