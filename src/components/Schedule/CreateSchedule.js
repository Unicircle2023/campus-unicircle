import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { AddSchedule } from './AddSchedule'

export function CreateSchedule() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <AddSchedule />
            </div>
            
            {/* <TrialStudentHeader></TrialStudentHeader> */}
        </div>
    )
}
