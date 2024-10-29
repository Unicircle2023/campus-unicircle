import React from 'react'
import {Header} from "../Header"
import { Menu } from '../Menu'
import {SubjectForm} from "./SubjectForm"
export function CreateSubject() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <SubjectForm />
            </div>
           
        </div>
    )
}
