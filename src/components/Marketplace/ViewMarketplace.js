import React from 'react'
import { Link } from "react-router-dom";

export function ViewMarketplace() {
    return (
        <div className="content-wrapper">
            <Link to="/marketplaceDetails" >
           <div className="d-flex" style={{padding:"0", margin:"0"}}>
             <i class="fa fa-angle-double-left" style={{color:"black", margin:"0px 0px 0px 10px",fontSize:"24px", padding:"0"}} /> 
             <p style={{fontSize:"12px", color:"black", margin:"0px",  padding:"5px"}}>Back</p> 
            </div>
            </Link>


    {/* left part */}
    <div style={{width:"98%", marginLeft:"100px",height:"auto"}} className="d-flex">
           
   <div>
  <div className="gallery-wrapper">
    <div className="image-wrapper">
      <a href="#lightbox-image-1">
        <img src="https://source.unsplash.com/F1Pb4g1C58E/300x300" alt />
        
      </a>
    </div>
    <div className="image-wrapper">
      <a href="#lightbox-image-2">
        <img src="https://source.unsplash.com/kjERLXaHjXc/300x300" alt />
        
      </a>
    </div>
    
    <div className="image-wrapper">
      <a href="#lightbox-image-3">
        <img src="https://source.unsplash.com/URnWOJX8wW4/300x300" alt />
       
      </a>
    </div>
  </div>
  <div className="gallery-lightboxes">
    <div className="image-lightbox" id="lightbox-image-1">
      <div className="image-lightbox-wrapper">
        <a href="#" className="close" />
        <a href="#lightbox-image-3" className="arrow-left" />
        <a href="#lightbox-image-2" className="arrow-right" />
        <img src="https://source.unsplash.com/F1Pb4g1C58E/600x500" alt />
       
      </div>
    </div>
    <div className="image-lightbox" id="lightbox-image-2">
      <div className="image-lightbox-wrapper">
        <a href="#" className="close" />
        <a href="#lightbox-image-1" className="arrow-left" />
        <a href="#lightbox-image-3" className="arrow-right" />
        <img src="https://source.unsplash.com/kjERLXaHjXc/600x500" alt />
       
      </div>
    </div>
    <div className="image-lightbox" id="lightbox-image-3">
      <div className="image-lightbox-wrapper">
        <a href="#" className="close" />
        <a href="#lightbox-image-2" className="arrow-left" />
        <a href="#lightbox-image-1" className="arrow-right" />
        <img src="https://source.unsplash.com/URnWOJX8wW4/600x500" alt />
       
      </div>
    </div>
  </div>
</div>

       
           </div>
{/* end left part */}
<div className="d-flex" style={{margin:"10px 15px",padding:"10px",background:"white"}}>
<div style={{width:"60%"}}>

{/* item name */}
<div className="form-group" style={{marginRight:"15px", marginBottom:"10px", padding:"0"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Item Name</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>Staedtler Colour Pencil</p>
          
            </div>
           </div>


{/* prize */}
<div className="form-group" style={{marginRight:"15px", marginBottom:"10px", padding:"0"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Prize</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>Rs.580</p>
         
            </div>
           </div>


{/* Category */}
<div className="form-group" style={{marginRight:"15px", marginBottom:"10px", padding:"0"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Category</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>College Stationary</p>
          
            </div>
           </div>    

  
</div>

<div style={{width:"40%"}}>
    {/* Condition */}
<div className="form-group" style={{margin:"0px 15px 10px 15px", padding:"0"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Condition</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>New</p>
          
            </div>
           </div>  
    {/* Email */}
<div className="form-group" style={{margin:"0px 15px 10px 15px", padding:"0"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Email</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>abc@gmail.com</p>
          
            </div>
           </div>    
    
    {/* Contact */}
<div className="form-group" style={{margin:"10px 15px 10px 15px", padding:"0"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Contact</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>9877566754</p>
          
            </div>
           </div>    
</div>
</div>

           
{/* details */}
<div className="form-group" style={{marginLeft:"15px", marginRight:"15px", marginBottom:"0", padding:"10px",background:"white"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Details</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>*Can be used as normal colour pencil or with water and brush to create watercolour effect.</p>
          <p>*Rich and brilliant colours,fade resistent,excel lent coverage.</p>
          <p>*Smooth and soft made in Germany leads break resistent lead.</p>
          <p>*Comes always with a free product in Indain market.</p>
            </div>
           </div>

    {/* product description */}
<div className="form-group" style={{margin:"10px 15px 0px 15px", padding:"10px",background:"white"}}>
             <label style={{color:"#1F3977", fontSize:"15px", fontWeight:"bold"}}>Product Description</label>
             <div style={{width: "100%", height:"auto"}}>
                 <p>Staedtler luna classic watercolor pencils set of 24 coloured pencils suitable for art and other professional course students and for artist and professionala.</p>
          
            </div>
           </div>    
        </div>
    )
}
