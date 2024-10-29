import React from 'react'
import {AiFillDislike,AiTwotoneLike} from "react-icons/ai"
import Tabs, { TabPane } from 'rc-tabs';
import {QuestionAnswer} from "./QuestionAnswer"
import '../../../node_modules/rc-tabs/assets/index.css';

export function SliderTabs() {
    function callback(e) {
        console.log(e);
      }
    
    return (
      <div>
             <Tabs defaultActiveKey="1" onChange={callback} style={{fontFamily:"Poppins"}} >
        <TabPane tab="CAMPUS" key="1">
         <QuestionAnswer />
        </TabPane>
        <TabPane tab="CLASSROOM" key="2">
        <section className="" >
          <div className="container-fluid" style={{padding:"0"}}>
              {/* 1st row */}
            <div className="row" style={{margin:"10px 0px 0px 0px", paddingRight:"0"}}>

              <div className="col-md-12" style={{height:"100%",  padding:"0px", marginBottom:'9px'}}>
                <div className="small-box" style={{background:"white",marginTop:"3px",padding:"4px"}}>
                  <div className="inner">
                    <div className="d-flex">
                        <h5 style={{fontWeight:"600",  marginTop:"0px",fontSize:"14px"}}></h5>
                        <p style={{fontSize:"11px",marginLeft:"auto"}}>20 Nov, 2021 05:00</p>
                        </div>
                    <h5 style={{fontWeight:"500", fontSize:"15px",color:"black",marginTop:"5px"}} className='d-flex'>
{/* like */}
<div>
<div className='polls-icon' style={{borderRadius:"50%",width:"30px",height:"30px",background:"black",display:"block"}}>
  <AiTwotoneLike style={{color:"#299617",fontSize:"20px",position: "relative",top: "19%",left:"20%"}}/>
  </div>
  <p style={{color:"green",fontSize:"11PX",marginTop:"5px",marginLeft:"5PX"}}>235</p>
  </div>

  {/* dislike */}
  <div style={{marginLeft:"10PX"}}>
  <div style={{borderRadius:"50%",width:"30px",height:"30px",background:"black",display:"block"}}>
  <AiFillDislike style={{color:"red",fontSize:"20px",position: "relative",top: "19%",left:"20%"}}/>
  </div>
  <p style={{color:"red",fontSize:"11PX",marginTop:"5px",marginLeft:"5PX"}}>45</p>
  </div>
                       
                    </h5>
                 
                 
                  </div>
                
                 
                </div>
              </div>

            </div>

            {/* 2nd row */}
            <div className="row" style={{margin:"3px 0px 0px 0px", padding:"0"}}>
          
              <div className="col-md-12" style={{height:"100%", padding:"0px", marginBottom:'9px'}}>
              <div className="small-box" style={{background:"white",marginTop:"3px",padding:"4px", overflowY:"auto", height:"150px", width:"150px"}}>
                  <div className="inner">
                    
                    <div  className="d-flex">
                        <h5 style={{fontWeight:"600",  marginTop:"0px",fontSize:"14px", textAlign:"justify"}}>Who should lead your class? </h5>
                        <p style={{fontSize:"11px",marginLeft:"auto"}}>20 Nov, 2021 05:00</p>
                        </div>
                    <h5 style={{fontWeight:"500", fontSize:"15px",color:"black",marginTop:"5px"}}>

                    <li >

<div className='polls-user-name'>
  <div className="form-check">
    <input className="form-check-input" style={{marginLeft:"105px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
    <label className="form-check-label d-flex" htmlFor="flexRadioDefault1" style={{padding:"0"}}>
    <p style={{fontSize:"13PX"}}>Pranav</p> <p style={{marginLeft:"5px",fontSize:"11PX",color:"#339dd8"}}>30%</p>
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" style={{marginLeft:"105px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
    <label className="form-check-label d-flex" htmlFor="flexRadioDefault2" style={{padding:"0"}}>
    <p style={{fontSize:"13PX"}}>Abhishekh</p> <p style={{marginLeft:"5px",fontSize:"11PX",color:"#339dd8"}}>30%</p>
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" style={{marginLeft:"105px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
    <label className="form-check-label d-flex" htmlFor="flexRadioDefault2" style={{padding:"0"}}>
    <p style={{fontSize:"13PX"}}>Disha</p> <p style={{marginLeft:"5px",fontSize:"11PX",color:"#339dd8"}}>30%</p>
    </label>
  </div>
</div>

       
                          
                           </li>
                    </h5>
                   
                 
                  </div>
               
                 
                </div>

              
              </div>
              
           
</div>
 
{/* 3rd row */}
<div className="row" style={{margin:"3px 0px 0px 0px", paddingRight:"0"}}>

              <div className="col-md-12" style={{height:"100%",  padding:"0px", marginBottom:'9px'}}>
              <div className="small-box" style={{background:"white",marginTop:"3px",padding:"4px", overflowY:"auto", height:"150px", width:"150px"}}>
                  <div className="inner">
                    <div  className="d-flex">
                        <h5 style={{fontWeight:"600",  marginTop:"0px",fontSize:"14px", textAlign:"justify"}}>Do you think that the school provides you with adequate sports facilities?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen</h5>
                        <p style={{fontSize:"11px",marginLeft:"auto"}}>20 Nov, 2021 05:00</p>
                        </div>
                    <h5 style={{fontWeight:"500", fontSize:"15px",color:"black",marginTop:"5px"}} className='d-flex'>
{/* like */}
<div>
<div className='polls-icon' style={{borderRadius:"50%",width:"30px",height:"30px",background:"black",display:"block"}}>
  <AiTwotoneLike style={{color:"#299617",fontSize:"20px",position: "relative",top: "19%",left:"20%"}}/>
  </div>
  <p style={{color:"green",fontSize:"11PX",marginTop:"5px",marginLeft:"5PX"}}>235</p>
  </div>

  {/* dislike */}
  <div style={{marginLeft:"10PX"}}>
  <div style={{borderRadius:"50%",width:"30px",height:"30px",background:"black",display:"block"}}>
  <AiFillDislike style={{color:"red",fontSize:"20px",position: "relative",top: "19%",left:"20%"}}/>
  </div>
  <p style={{color:"red",fontSize:"11PX",marginTop:"5px",marginLeft:"5PX"}}>45</p>
  </div>
                       
                    </h5>
                 
                 
                  </div>
                
                 
                </div>
              </div>

            </div>

 {/* 4th row */}
 <div className="row" style={{margin:"3px 0px 0px 0px", padding:"0"}}>
          
          <div className="col-md-12" style={{height:"100%", padding:"0px", marginBottom:'9px'}}>
          <div className="small-box" style={{background:"white",marginTop:"3px",padding:"4px", overflowY:"auto", height:"150px", width:"150px"}}>
              <div className="inner">
                
                <div  className="d-flex">
                    <h5 style={{fontWeight:"600",  marginTop:"0px",fontSize:"14px", textAlign:"justify"}}>Who should lead your class?</h5>
                    <p style={{fontSize:"11px",marginLeft:"auto"}}>20 Nov, 2021 05:00</p>
                    </div>
                <h5 style={{fontWeight:"500", fontSize:"15px",color:"black",marginTop:"5px"}}>

                <li >

<div className='polls-user-name'>
<div className="form-check">
<input className="form-check-input" style={{marginLeft:"105px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
<label className="form-check-label d-flex" htmlFor="flexRadioDefault1" style={{padding:"0"}}>
<p style={{fontSize:"13PX"}}>Pranav</p> <p style={{marginLeft:"5px",fontSize:"11PX",color:"#339dd8"}}>30%</p>
</label>
</div>
<div className="form-check">
<input className="form-check-input" style={{marginLeft:"105px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
<label className="form-check-label d-flex" htmlFor="flexRadioDefault2" style={{padding:"0"}}>
<p style={{fontSize:"13PX"}}>Abhishekh</p> <p style={{marginLeft:"5px",fontSize:"11PX",color:"#339dd8"}}>30%</p>
</label>
</div>
<div className="form-check">
<input className="form-check-input" style={{marginLeft:"105px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
<label className="form-check-label d-flex" htmlFor="flexRadioDefault2" style={{padding:"0"}}>
<p style={{fontSize:"13PX"}}>Disha</p> <p style={{marginLeft:"5px",fontSize:"11PX",color:"#339dd8"}}>30%</p>
</label>
</div>
</div>

   
                      
                       </li>
                </h5>
               
             
              </div>
           
             
            </div>

          
          </div>
          
       
</div>



          </div>
        </section>
        </TabPane>
     
      </Tabs>
          {/* <div class='polls_tabs'>
  <input type='radio' id='r1' name='t' checked />
  <label for='r1'>CAMPUS</label>

  
  <div class='content'>
 <h1>content</h1>
 <h1>content</h1>
 <h1>content</h1>
</div>


  <input type='radio' id='r2' name='t' />
  <label for='r2'>CLASSROOM</label>


  <div class='content'>

  </div>
 
  <input type='radio' id='r3' name='t' />

  <div id='slider'></div>
</div> */}
  </div>

    )
}
