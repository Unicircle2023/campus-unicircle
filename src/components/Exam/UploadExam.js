import React from 'react';
import {Header} from "../Header"
import {Menu} from "../Menu";
import { UploadExamSheet } from './UploadExamSheet'

export function UploadExam(){
    return(
        <div>
            <Header />
            <Menu />
            <UploadExamSheet/>
        </div>
    )
}