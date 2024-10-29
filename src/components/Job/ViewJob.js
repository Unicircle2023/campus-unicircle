import React from 'react'
import { Header } from '../Header'
import { Menu } from '../Menu'
import {JobInfo} from "./JobInfo"
export function ViewJob() {
    return (
        <div>
          <Header />  
          <Menu />
          <JobInfo />
        </div>
    )
}
