import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import {Staff} from "./Staff";
import {StaffDatatable} from "./StaffDatatable"

export function StaffDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Staff />
            </div>
            
          {/* <StaffDatatable /> */}
        </div>
    )
}
