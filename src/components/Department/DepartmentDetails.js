import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import { Department } from './Department';
export function DepartmentDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Department />
            </div>
            
           
        </div>
    )
}
