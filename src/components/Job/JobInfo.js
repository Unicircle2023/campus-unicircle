import React from 'react'
import Tabs, { TabPane } from 'rc-tabs';
import { Link } from "react-router-dom";
import '../../../node_modules/rc-tabs/assets/index.css';



export  function JobInfo() {
  function callback(e) {
    console.log(e);
  }

    return (
        <div className="content-wrapper" >
         <Link to="/jobDetails" >
     
    <div className="d-flex" style={{padding:"0", margin:"0"}}>
    <i class="fas fa-arrow-alt-circle-left" style={{color:"black", margin:"0px 0px 0px 10px",fontSize:"24px", padding:"0",fontWeight:"bold"}} /> 
     </div>
     </Link>
  
       <div style={{background:"#1F3977", margin:"20px 20px 0px 20px", paddingBottom:"4px",width:"80%",borderRadius:"5px"}}>
         <div style={{width:"100%",padding:"10px"}}>
       
         
             {/* <p style={{color:"white",textAlign:"center",fontSize:"14PX", fontWeight:"700"}}>Staedtler Colour Pencil</p> */}
            {/* item table */}
         <table style={{width:"100%",fontFamily:"Poppins",color:"#dbdbdd"}}>
                 <tr style={{width:"100%"}}>
                 <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Job Title</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Frontend Developer</div>
                    </td>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Company Name</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Accenture</div>
                    </td>

                    <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Job Location</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Pune</div>
                    </td>
</tr>
<tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Experience</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Fresher</div>
                    </td>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Qualification</div>
                          <div style={{fontWeight:"400",fontSize:"11px"}}>BCA/MCA/B.E/M.E</div>
                    </td>
                    <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Salary</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>5 lac per annum</div>
                    </td>
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Posted On</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>24/12/2021</div>
                    </td>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>No. Of Openings</div>
                          <div style={{fontWeight:"400",fontSize:"11px"}}>10</div>
                    </td>
                    <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Job type</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Full Time</div>
                    </td>
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Department</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Computer</div>
                    </td>
                     <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Interview Type</div>
                          <div style={{fontWeight:"400",fontSize:"11px"}}>Regular</div>
                    </td>
                    <td style={{padding:"8px",lineHeight:"15px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Employment</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Regular</div>
                    </td>
                 </tr>
                 </table>
         {/* end item table */}
           
          
           </div>
         
      
       </div>

       <div style={{background:"white", margin:"8px 20px 0px 20px", padding:"5px 10px",width:"80%",fontFamily:"Poppins"}}>
       <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"15px 0px 10px 10px"}} >
       <TabPane tab="Job Description" key="1" style={{marginTop:"20PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"14PX",fontWeight:"500"}}>Details About Product</div> */}
        We are looking for programmers with a keen eye for design for the position of front end developer. Front end developers are responsible for ensuring the alignment of web design and user experience requirements, optimizing web pages for maximum efficiency, and maintaining brand consistency across all web pages, among other duties.

Front end developers are required to work in teams alongside back end developers, graphic designers, and user experience designers to ensure all elements of web creation are consistent. This requires excellent communication and interpersonal skills.
      
        
        </TabPane>
        <TabPane tab="Company Profile" key="2" style={{marginTop:"20PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"14PX",fontWeight:"500"}}>Details About Product</div> */}
        Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Interactive, Technology and Operations services-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 624,000 people deliver on thepromise of technology and human ingenuity every day, serving clients in more than 120 countries.We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. 
        <p style={{color:"#339dd8",marginTop:"10PX",fontSize:"500"}}>Visit us at www.accenture.com</p>
        
        </TabPane>

        <TabPane tab="Responsibility" key="3"  style={{marginTop:"20PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"16PX",fontWeight:"400"}}>About this item</div> */}
       <ol  >
         <li>- Determining the structure and design of web pages.</li>
         <li>-Ensuring user experience determines design choices.</li>
         <li>- Developing features to enhance the user experience.</li>
         <li>- Striking a balance between functional and aesthetic design.</li>
         <li>- Ensuring web design is optimized for smartphones.</li>
         <li>- Building reusable code for future use.</li>
         <li>- Optimizing web pages for maximum speed and scalability.</li>
         <li>- Utilizing a variety of markup languages to write web pages.</li>
         <li>- Maintaining brand consistency throughout the design.</li>
       </ol>
       
        </TabPane>

        <TabPane tab="Eligibility" key="4"  style={{marginTop:"20PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"16PX",fontWeight:"400"}}>Technical Details About Product</div> */}
        <ol  >
         <li>- Bachelor’s Degree in Computer Science or related field</li>
         <li>-3+ years’ web development experience required</li>
         <li>- 2+ years’ app development experience preferred</li>
         <li>- Proficiency with AngularJS an asset</li>
         <li>- Strong knowledge of web development tools and programming languages</li>
     
       </ol>
        </TabPane>

        <TabPane tab="Key Skills" key="5"  style={{marginTop:"20PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"16PX",fontWeight:"400"}}>Technical Details About Product</div> */}
        <ol  >
         <li>- Degree in computer science or related field.</li>
         <li>-Understanding of key design principles.</li>
         <li>- Proficiency in HTML, CSS, JavaScript, and jQuery.</li>
         <li>- Understanding of server-side CSS.</li>
         <li>- Experience with graphic design applications such as Adobe Illustrator.</li>
         <li>- Experience with responsive and adaptive design.</li>
         <li>- Understanding of SEO principles.</li>
         <li>- Good problem-solving skills.</li>
         <li>- Excellent verbal communication skills.</li>
       </ol>
        </TabPane>
      </Tabs>
       </div>
      </div>
    )
}
