import React from 'react'
import Tabs, { TabPane } from 'rc-tabs';
import { Link } from "react-router-dom";
import '../../../node_modules/rc-tabs/assets/index.css';



export  function ItemInfo() {
  function callback(e) {
    console.log(e);
  }

    return (
        <div className="content-wrapper" >
         <Link to="/marketplaceDetails" >
    <div className="d-flex" style={{padding:"0", margin:"0"}}>
    <i class="fas fa-arrow-alt-circle-left" style={{color:"black", margin:"0px 0px 0px 10px",fontSize:"24px", padding:"0",fontWeight:"bold"}} /> 
     </div>
     </Link>
  
       <div style={{background:"#1F3977", margin:"20px 20px 0px 20px", paddingBottom:"4px",width:"80%",borderRadius:"5px"}}>
         <div style={{width:"100%",padding:"10px"}} className='d-flex'>
         <div style={{width:"15%"}}><img
                src="dist/img/pencil.jpg"
                className="text-center"
                alt="pencil" 
                style={{ width: "120px", height:"120px"}}
              /></div>
           <div style={{width:"85%",padding:"15px"}}>
             {/* <p style={{color:"white",textAlign:"center",fontSize:"14PX", fontWeight:"700"}}>Staedtler Colour Pencil</p> */}
            {/* item table */}
         <table style={{width:"100%",fontFamily:"Poppins",color:"#dbdbdd"}}>
                 <tr style={{width:"100%"}}>
                 <td style={{padding:"8px",lineHeight:"14px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Item Name</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Staedtler Colour Pencil</div>
                    </td>
                     <td style={{padding:"8px",lineHeight:"14px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Prize</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>Rs. 184</div>
                    </td>

                    <td style={{padding:"8px",lineHeight:"14px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Condition</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>New</div>
                    </td>
</tr>
<tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Category</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>College Stationary</div>
                    </td>
                     <td style={{padding:"8px",lineHeight:"14px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Email Id</div>
                          <div style={{fontWeight:"400",fontSize:"11px",}}>abc@gmail.com</div>
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"20%"}}>
                         <div style={{color:"white", fontWeight:"500",fontSize:"13px"}}>Contact Number</div>
                         <div style={{fontWeight:"400",fontSize:"11px"}}>7863999672</div>
                    </td>
                 </tr>
                 </table>
         {/* end item table */}
             </div>
          
           </div>
         
      
       </div>

       <div style={{background:"white", margin:"8px 20px 0px 20px", padding:"5px 10px",width:"80%",fontFamily:"Poppins"}}>
       <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"15px 0px 10px 10px"}} >
        <TabPane tab="Product Details" key="1" style={{marginTop:"10PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"14PX",fontWeight:"500"}}>Details About Product</div> */}
        <table style={{width:"100%",fontFamily:"Poppins"}}>
                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Colour:</div> 
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Assorted</div>
                    </td>
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Ink Colour:</div> 
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Multicolor</div>
                    </td>
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Brand:</div> 
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Faber-Castell</div>
                    </td>
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Material:</div> 
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Wood</div>
                    </td>
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Item Dimensions LxWxH:</div> 
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>20 x 13 x 1 Centimeters</div>
                    </td>
                 </tr>
                 </table>
        
        </TabPane>

        <TabPane tab="Product Description" key="2"  style={{marginTop:"20PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"16PX",fontWeight:"400"}}>About this item</div> */}
       <ol >
         <li>- clear point of difference, perceived and relevant added value</li>
         <li>- outstanding performance</li>
         <li>- characteristic and timeless design</li>
       </ol>
        </TabPane>

        <TabPane tab="Technical Details" key="3"  style={{marginTop:"10PX"}}>
        {/* <div style={{width:"100%",textAlign:"left",padding:"10px",fontSize:"16PX",fontWeight:"400"}}>Technical Details About Product</div> */}
        <table style={{width:"100%",fontFamily:"Poppins"}}>
                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Manufacturer:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Faber-Castell</div>
                    </td>  
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Brand:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Faber-Castell</div>
                    </td>  
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Model Number:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>FBA_118118</div>
                    </td>  
                 </tr>

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Colour:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Assorted</div>
                    </td>  
                 </tr>  

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Closure:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Screw Off Cap</div>
                    </td>  
                 </tr>  

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Grip Type:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Contoured</div>
                    </td>  
                 </tr>  

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Material:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Wood</div>
                    </td>  
                 </tr>  

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Number of Items:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>18</div>
                    </td>  
                 </tr>  

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Size:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>18 Count (Pack of 1)</div>
                    </td>  
                 </tr>  

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Point Type:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Fine</div>
                    </td>  
                 </tr> 

                  <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Line Size:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>2mm and Above</div>
                    </td>  
                 </tr>   

                 <tr style={{width:"100%"}}>
                     <td style={{padding:"8px",lineHeight:"14px",width:"30%"}}>
                         <div style={{color:"black", fontWeight:"500",fontSize:"12px"}}>Ink Colour:</div>   
                    </td>
                    <td style={{padding:"8px",lineHeight:"14px",width:"70%"}}>
                         <div style={{color:"grey", fontWeight:"500",fontSize:"12px"}}>Multicolor</div>
                    </td>  
                 </tr> 
                 </table>
        </TabPane>
      </Tabs>
       </div>
      </div>
    )
}
