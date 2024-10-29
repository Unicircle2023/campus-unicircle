import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import {News} from "./News";

export function CampusNews() {
    return (
        <div>
           <Header /> 
           <div className="d-flex">
           <Menu />
           <News />
           </div>
          
        </div>
    )
}
