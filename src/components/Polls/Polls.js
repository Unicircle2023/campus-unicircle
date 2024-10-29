import React from 'react'
import {Header} from "../Header";
import { Menu } from '../Menu';
import { PollDetails } from './PollDetails';
export function Polls() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <PollDetails />
            </div>
            
        </div>
    )
}
