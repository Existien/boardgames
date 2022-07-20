import React from 'react'
import { Toolbar, AppBar } from '@mui/material'
import {UserInput} from "./UserInput"



export const TitleBar: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <UserInput onSearch={(u)=>console.log(u)}/>
            </Toolbar>
        </AppBar>
    )
}

export default TitleBar;