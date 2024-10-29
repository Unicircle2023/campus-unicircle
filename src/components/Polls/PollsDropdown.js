import React, { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


export function PollsDropdown(){
    const arr = [
        {
          id: '1',
          name: 'Positive',
          color: '#15A312',
        },
        {
          id: '2',
          name: 'Neutral',
          color: '#C0A200',
        },
        {
          id: '3',
          name: 'Negative',
          color: '#EB2424',
        },
      ];

      const [select, setSelect] = React.useState(false);
      const [select_data, setSelect_data] = React.useState('');

      return(
        <>
             <div style={{height:"35px",width:"85%",border:"1px solid #C4C4C4",background:"rgba(255, 255, 255, 0.9)",borderRadius:"5px"}}>
                <div onClick={()=>setSelect(!select)}>
                   
                    <div style={{ display: 'flex', flexDirection: 'row',height:"32px",justifyContent:"space-between",alignItems:"center",margin:"0px 10px"}}>
                        <div style={{ height:"20px", width:"20px",marginLeft:"5px", background: select_data.color }}> </div>
                            <p style={{fontSize:"14px",fontWeight:"500"}} >{select_data?select_data.name:'Risk Level'}</p>
                       
                        <div>
                            <img src="dist/img/RightButton.png"
                                style={{width:"20px",height:"20px"}}
                            />
                        </div>
                    </div>
                </div>
                {select == true ?(
                    <div style={{padding:"12px 2px", height:"117px",border:"1px solid #C4C4C4",background:"rgba(255, 255, 255, 0.9)",borderRadius:"5px"}}>
                    {
                        arr.map((item)=>{
                            return(
                                <div onClick={()=>{setSelect_data(item);setSelect(false)}}
                                style={{display:"flex",flexDirection:"row", background:select_data.id==item.id?"#1F3977":"#fff",marginBottom:"10px",paddingLeft:"12px"}}
                                >
                                    <div  style={{ display: 'flex', flexDirection: 'row',width:"100%",gap:"25px" }}>
                                        <div style={{ height:"20px", width:"20px",marginTop:"3px", background: item.color }} >
                                            
                                        </div>
                                        <div style={{display:"flex"}}><p style={{fontWeight:"600",fontSize:"17px"}}>{item.name}</p></div>
                                    </div>

                                </div>
                            )
                        })
                    }
                    </div>
                ):null
                }
             </div>
        </>
      )

}