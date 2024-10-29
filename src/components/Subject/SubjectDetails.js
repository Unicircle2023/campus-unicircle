import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import Subject from './Subject';
// import { DepartmentDatatable } from './DepartmentDatatable';
export function SubjectDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Subject />
            </div>
           
            {/* <DepartmentDatatable /> */}
        </div>
    )
}
