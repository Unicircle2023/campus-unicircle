import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import {Map} from "./Map";
export function MapDetails() {
    return (
        <div>
             <Header />
             <div className='d-flex'>
             <Menu />
             <Map />

             </div>
           
           
                      
        </div>
    )
}
