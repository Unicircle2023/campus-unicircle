import React from 'react';
import {Header} from "../Header"
import {Menu} from "../Menu";
import { UploadForm } from './UploadForm'

export function UploadStudent(){
    return(
        <div>
            <Header />
            <div className="d-flex">
            <Menu />
            <UploadForm/>
            </div>
          
        </div>
    )
}