import React, {useState, useEffect} from 'react'
import {BiPlusMedical, BiSearchAlt2,BiRectangle} from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaqContents } from './FaqContents';
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
// import { Rough } from "./Rough";
import 'react-web-tabs/dist/react-web-tabs.css';

export function FAQNew(){
var array="";
  const token = localStorage.getItem('Token');
  const[data, setData] = useState([]);
  async function fetchList() {
    console.log("Access Token-",token);
    try{
      
        const fetchFaqResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_categoriwise_faqs",
        {
          headers: 
        {
          "Content-Type": 'multipart/form-data',
        
          "Authorization": token,
        } 
        }
      );
     
        console.log("Get Badge List Details",fetchFaqResponse);

        const FaqErrorCode = fetchFaqResponse.data.error_code;
        console.log("Faq Error Code ", FaqErrorCode);
  
        const FaqErrorMsg = fetchFaqResponse.data.message;
        console.log("Badge Error msg ", FaqErrorMsg);

     

      if (FaqErrorCode == 200) {
          const faqListArray = fetchFaqResponse.data.data;
          console.log("Faq list Array", faqListArray);

          setData(faqListArray);
        }
        else {
          setData([]);
  
          console.log(fetchFaqResponse.data.message);
          $(".alert-danger").show();
          setTimeout(function () {
            $(".alert-danger").hide();
          }, 3000);
        }
      
    }
    catch(err)
    {
      console.log("Log in Fail",err);
     
    }
   
  }
  

  useEffect(() => {
  
    fetchList();
  },[]);


  return (
    <div className="content-wrapper" style={{overflowX:"auto"}}>
            <div className="d-flex faq-header" style={{marginTop:"20px",padding:" 0PX 80px"}}>
          <h4 style={{color:"black",fontWeight:"bold", marginTop:"7px",marginLeft:"AUTO"}}>All FAQ'S</h4>
          <i class="fa fa-bars" style={{marginLeft:"10PX",marginTop:"7PX"}}></i>
        

{/* search */}
<div className="d-flex" style={{padding:"0",marginLeft:"20px",width:"250px",height:"35px",marginTop:"0px", border:"none", borderRadius:"20px",backgroundColor:"white"}}>
<div  style={{padding:"5px 0px 5px 8px"}}><BiSearchAlt2 style={{color:"#293043", fontSize:"25px", marginTop:"0px",fontWeight:"bold"}}/></div>
<div style={{padding:"0px", width:"100%", height:"35px"}}><input type="text" placeholder="Search By FAQ" style={{background:"white", height:"32px", width:"90%",border:"none",fontWeight:"600"}}/></div>
</div>

{/* end search */}

{/* create news button */}


<div style={{marginLeft:"20px", marginTop:"0px",padding:"0" }}>
<Link to="/createFaq">


<button
                type="button"
                className="d-flex buttonContainer faq-button"
                defaultValue="Sign Up"
               
                style={{ padding:"12px 20px", marginTop:"0",background:"#1F3977", flexWrap: "wrap", borderRadius:"5px", marginLeft:"auto"}}
              >
                <BiPlusMedical className="faq-plus-button" style={{marginTop:"1px",fontSize:"12.25px",fontWeight:"400",fontFamily:"Poppins"}}/>
                <div style={{marginLeft:"5px",fontSize:"12.25PX",fontWeight:"400",fontFamily:"Poppins"}}>Create FAQ</div>
</button>

</Link>
  
</div>


{/* end create news button */}
</div>
{/* faq tabs */}
<div style={{background:"white",margin:"20px 30px 0px 30px ",fontFamily:"Poppins"}}>
    <Tabs defaultTab="vertical-tab-one" vertical style={{width:"100%",height:"100%"}}>
      <div class="row">
        <div class="col-md-4">

      <TabList  style={{width:"100%",border:"none",height:"100vh"}} className="faq_tabs tablist">
        {/* search */}
      <div>
<div className="d-flex faq-searchbox" style={{width:"250px",height:"30px",margin:"15px auto",borderRadius:"20px", backgroundColor:"#f5f5f5"}}>


{/* search */}
<div className="d-flex" style={{padding:"0",marginLeft:"20px",width:"250px",height:"35px",marginTop:"0px", border:"none", borderRadius:"20px",backgroundColor:"#f5f5f5"}}>
<div  style={{padding:"5px 0px 5px 8px"}}><BiSearchAlt2 className="faq-searchicon" style={{color:"#293043", fontSize:"25px", marginTop:"0px",fontWeight:"bold"}}/></div>
<div style={{padding:"0px", width:"100%", height:"35px"}}>
  <input type="text" className="faq-inputBox" id="myInputTextField"  placeholder="Search By Category" style={{background:"#f5f5f5", height:"32px", width:"98%",border:"none",fontWeight:"600"}}/></div>
</div>
{/* search end */}


</div>
</div>
{/* end search */}
          {
             data.map(function(item,index){
               console.log("category id",item)
               array = item.category_name
               return(
                <Tab  className="faq_categories" 
                      nkBarStyle={{ background: "#000", height: "5px", marginTop: "-5px" }} onChange={console.log("id",item.category_id)}>
                        {item.category_name}
                </Tab>
               )
             }

             )
          }

      </TabList>
      </div>
      
   <div class="col-md-8">
      <TabPanel className="tab-headings" tabId="vertical-tab-one" 
                style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
    {array}
          <FaqContents />
          {/* <Rough /> */}
      </TabPanel>

      {/* <TabPanel className="tab-headings" tabId="vertical-tab-two"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </TabPanel>

      <TabPanel className="tab-headings" tabId="vertical-tab-three"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
           <FaqContents />
      </TabPanel>

      <TabPanel className="tab-headings" tabId="vertical-tab-four"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
           <FaqContents />
      </TabPanel>

      <TabPanel  className="tab-headings" tabId="vertical-tab-five"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
         <FaqContents />
      </TabPanel>

      <TabPanel className="tab-headings" tabId="vertical-tab-six"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
         <FaqContents />
      </TabPanel>

      <TabPanel className="tab-headings" tabId="vertical-tab-seven"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
        <FaqContents />
      </TabPanel>

      <TabPanel className="tab-headings" tabId="vertical-tab-eight"  style={{width:"70%",height:"100%",paddingBottom:"20PX"}}>
         <FaqContents />
      </TabPanel> */}

      </div>
      </div>
  </Tabs>
  </div>
{/* faq tabs end */}
      </div>


  )
}
