import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu";
import { IncomingTicket } from './IncomingTicket';
export function Explore() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <IncomingTicket />
            </div>
           
        </div>
    )
}
