import React from 'react'
import {Header} from "../Header"
import {Menu} from "../Menu"
// import { ExploreGroups } from './ExploreGroups'
import { ExploreGroupsNew } from './ExploreGroupsNew'
export function Groups() {
    return (
        <div>
            <Header />
            <Menu />
            {/* <ExploreGroups /> */}
            <ExploreGroupsNew></ExploreGroupsNew>
        </div>
    )
}
