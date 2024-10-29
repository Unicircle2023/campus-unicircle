import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { AppointmentForm } from './AppointmentForm'
export function CreateAppoinment() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <AppointmentForm />
            </div>
            
        </div>
    )
}
