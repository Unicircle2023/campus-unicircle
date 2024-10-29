import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { Tickets } from './Tickets'
// import { RightPart } from './RightPart'
export function TicketsDashboard() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Tickets />
            {/* <RightPart /> */}
            </div>
           
        </div>
    )
}
