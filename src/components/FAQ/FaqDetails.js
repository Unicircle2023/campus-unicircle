import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import {FAQS} from "./FAQS";
// import {Rough} from "./Rough"


export function FaqDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            {/* <Rough /> */}
            <FAQS />
            </div>
           
        </div>
    )
}
