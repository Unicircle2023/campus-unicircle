import React from 'react'
import { Header } from '../Header'
import {Menu} from "../Menu"
import { TeachersProfile } from './TeachersProfile'
import {RightPart} from "./RightPart"
export function ViewProfile() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <TeachersProfile />
            <RightPart />
            </div>
            
        </div>
    )
}
