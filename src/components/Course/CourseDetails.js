import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import { Course } from './Course';

export function CourseDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Course />
            </div>
            
            
        </div>
    )
}
