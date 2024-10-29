import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { EventCalender } from './EventCalender'
export function Calender() {
    return (
        <div>
            <Header />
            <div className="d-flex">
            <Menu />
            <EventCalender />
            </div>
           
        </div>
    )
}
