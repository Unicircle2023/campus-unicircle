import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { TimetableSchedule } from './TimetableSchedule'

export function Schedule() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <TimetableSchedule />
            </div>
            
            {/* <TrialStudentHeader></TrialStudentHeader> */}
        </div>
    )
}
