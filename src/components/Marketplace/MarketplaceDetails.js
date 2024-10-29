import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { Marketplace } from './Marketplace'

export function MarketplaceDetails() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <Marketplace />
            </div>
           
          
        </div>
    )
}
