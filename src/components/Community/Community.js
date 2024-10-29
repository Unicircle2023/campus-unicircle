import React from 'react'
import {Header} from "../Header"
import { Menu } from '../Menu'
import { ListOfGroups } from './ListOfGroups'
export function Community() {
  return (
    <div>
        <Header />
        <div className='d-flex'>
        <Menu />
        <ListOfGroups />
        </div>
        
    </div>
  )
}
