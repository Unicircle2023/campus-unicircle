import React from 'react'
import { Header } from '../Header'
import { Menu } from '../Menu'
import { GroupForm } from './GroupForm'
export function CreateGroup() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <GroupForm />
            </div>
            
        </div>
    )
}

