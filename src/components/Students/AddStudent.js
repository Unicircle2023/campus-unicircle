import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { StudentForm } from './StudentForm'
// import { StudentFormNew } from './StudentFormNew'

export function AddStudent() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <StudentForm />
            </div>
           
            {/* <StudentFormNew /> */}
        </div>
    )
}
