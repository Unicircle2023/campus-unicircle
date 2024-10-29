import React from 'react'
import {Header} from "../Header";
import {Menu} from "../Menu";
import { FaqForm } from './FaqForm';
export function CreateFaq() {
 
    return (
        <div>
<Header />
<div className='d-flex'>
<Menu />
<FaqForm />
</div>

        </div>
    )
}
