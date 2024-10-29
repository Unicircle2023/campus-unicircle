import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import { ItemInfo } from './ItemInfo';
export function ViewItem() {
    return (
        <div>
            <Header />
            <Menu />
            <ItemInfo />
        </div>
    )
}
