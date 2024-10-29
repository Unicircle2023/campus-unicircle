import React from 'react'
import {Header} from "../Header";
import { Menu } from '../Menu';
import { JobForm } from './JobForm';
export function CreateJob() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <JobForm />
            </div>
            
        </div>
    )
}
