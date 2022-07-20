import React from 'react'
import { Toolbar, AppBar } from '@mui/material'
import UserInput from "./UserInput"



export const TitleBar: React.FC = () => {
    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <UserInput/>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default TitleBar;