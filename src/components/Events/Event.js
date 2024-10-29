import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import {CampusEvents} from "./CampusEvents";

export function Event() {
    return (
        <div>
           <Header /> 
           <div className='d-flex'>
           <Menu />
           <CampusEvents />
           </div>
          
        </div>
    )
}
