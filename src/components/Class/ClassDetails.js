import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import { Class } from './Class';

export function ClassDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Class/>
            </div>
            
            
        </div>
    )
}