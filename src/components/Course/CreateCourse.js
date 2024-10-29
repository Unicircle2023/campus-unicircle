import React from 'react'
import {Header} from "../Header"
import { Menu } from '../Menu'
import {CourseForm} from "./CourseForm"
export function CreateCourse() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <CourseForm />
            </div>

           
        </div>
    )
}
