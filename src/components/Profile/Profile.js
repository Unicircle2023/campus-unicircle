import React from 'react';
import { Header } from "../Header";
import { Menu } from '../Menu';
import { UpdateProfile } from './UpdateProfile';
export function Profile() {
       return (
              <div>
                     <Header />
                     <div className='d-flex'>
                            <Menu />
                            <UpdateProfile />
                     </div>
              </div>)
}
