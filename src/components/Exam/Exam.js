import React from 'react';
import {Header} from "../Header"
import {Menu} from "../Menu";
import { ExamDetails } from './ExamDetails'

export function Exam(){
    return(
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <ExamDetails/>
            </div>
          
        </div>
    )
}