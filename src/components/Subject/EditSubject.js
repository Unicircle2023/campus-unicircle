import React from 'react'
import {Header} from "../Header"
import { Menu } from '../Menu'
import {EditSubjectForm} from "./EditSubjectForm"
export function EditSubject() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <EditSubjectForm />
            </div>
           
        </div>
    )
}
