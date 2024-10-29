import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { StudentHeader } from './StudentHeader'
// import TrialStudentHeader from './TrialStudentHeader'
export function Student() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <StudentHeader />
            </div>
            
            {/* <TrialStudentHeader></TrialStudentHeader> */}
        </div>
    )
}
