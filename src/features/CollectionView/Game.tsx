import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Game as Props } from './slice';

export const Game: React.FC<Partial<Props>> = (props: Partial<Props>) => {
    const players = "Players: " + (
        props.minPlayers === props.maxPlayers
        ? props.minPlayers
        : props.minPlayers+" - "+props.maxPlayers
    )
    return (
        <Paper style={{
            maxWidth: "calc(100%/3 - 2*5px)"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <div style={{flex: "1 1 0"}}>
                <Typography variant="h5" textAlign='center'>
                        {props.name}
                    </Typography>
                </div>
                <div style={{display: "flex", flex: "1 1 0",flexDirection: "row", columnGap: "20px", padding: "10px"}}>
                    <img alt="" src={props.image}/>
                    <div style={{flexDirection: "column", display: "flex"}}>
                        <Typography>
                            {players}
                        </Typography>
                        <Typography>
                            {"Best with: "+props.bestWith}
                        </Typography>
                        <Typography>
                            Placeholder
                        </Typography>
                    </div>
                    <div style={{flexDirection: "column", display: "flex"}}>
                        <Typography>
                            {"Rank: "+props.bggRank}
                        </Typography>
                        <Typography>
                            {"Rating: "+props.userRating}
                        </Typography>
                        <Typography>
                            Placeholder
                        </Typography>
                    </div>
                </div>
            </div>
        </Paper>
    )
}