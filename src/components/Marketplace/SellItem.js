import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
import { MarketplaceForm } from './MarketplaceForm'
export function SellItem() {
    return (
        <div>
            <Header />
            <div className='d-flex'>
            <Menu />
            <MarketplaceForm />
            </div>
           
        </div>
    )
}
