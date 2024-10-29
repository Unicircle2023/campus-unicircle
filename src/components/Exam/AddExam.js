import React from 'react';
import { Header } from "../Header"
import { Menu } from "../Menu";
import { ExamForm1 } from './ExamForm1'

export function AddExam() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <ExamForm1 />
            </div>
           
        </div>
    )
}