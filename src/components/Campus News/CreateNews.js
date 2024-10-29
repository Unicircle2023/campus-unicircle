import React from 'react'
import { Header } from '../Header'
import { Menu } from '../Menu'
// import { NewsForm } from './NewsForm'
import { NewsFormNew } from './NewsFormNew'

export function CreateNews() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
             <NewsFormNew />
            </div>
            
        </div>
    )
}

