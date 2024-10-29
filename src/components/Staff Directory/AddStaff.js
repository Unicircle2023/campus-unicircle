import React from 'react'
import {Header} from "../Header"
import { Menu } from '../Menu'
import { TeacherForm } from './TeacherForm'
// import { AddTeacherFormNew } from './AddTeacherFormNew'
export function AddStaff() {
    return (
        <div>
          <Header />
          <div className='d-flex'>
          <Menu />
          <TeacherForm />
          </div>
          
          {/* <AddTeacherFormNew></AddTeacherFormNew> */}
        </div>
              
        
    )
}
