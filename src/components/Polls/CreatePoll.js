import React from 'react'
import { Header } from '../Header'
import { Menu } from '../Menu'
import { PollsFormStep1 } from './PollsFormStep1'
export function CreatePoll() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <PollsFormStep1 />
            </div>
           
        </div>
    )
}
