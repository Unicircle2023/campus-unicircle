import React from 'react'
import { Header } from '../Header'
import { Menu } from '../Menu'
import { EventForm } from './EventForm'
export function CreateEvent() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <EventForm />
            </div>
            
        </div>
    )
}

