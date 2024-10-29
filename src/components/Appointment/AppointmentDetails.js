import React from 'react'
import { Header } from '../Header';
import { Menu } from '../Menu';
import { Appointment } from './Appointment';

export function AppointmentDetails() {
    return (
        <div>
            <Header />
           <div className="d-flex">
               <Menu />
              <Appointment />
           </div>
        </div>
    )
}
