import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import {Help} from "./Help"
export function DisplayHelp() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
                <Menu />
                <Help />
            </div>
        </div>
    )
}
