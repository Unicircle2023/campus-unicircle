import React from 'react'
import {Header} from "../Header"
import { Menu } from '../Menu'
import {DepartmentForm} from "./DepartmentForm"

export function CreateDepartment() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <DepartmentForm />
            </div>
            
        </div>
    )
}
