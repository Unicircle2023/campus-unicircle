import React from 'react'
import { Header } from "../Header"
import { Menu } from "../Menu"
// import ImportStudents from "./ImportStudents"

const impStudents = () => {
    return (
        <div>
            <Header />
            <div className='d-flex'>
                <Menu />
                {/* <ImportStudents /> */}
            </div>
        </div>
    )
}

export default impStudents