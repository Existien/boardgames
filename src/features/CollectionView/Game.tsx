import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Game as Props } from './slice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import {Chart, Pie} from 'react-chartjs-2'
import { notRecommendedColors, recommendedColors } from '../../plots';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const Game: React.FC<Partial<Props>> = (props: Partial<Props>) => {
    const players = "Players: " + (
        props.minPlayers === props.maxPlayers
        ? props.minPlayers
        : props.minPlayers+" - "+props.maxPlayers
    )
    return (
        <Paper style={{
            width: "calc(100%/3 - 2*5px)"
        }}>
            <div style={{
                display: "grid",
                gridTemplateAreas: (
                    '"name name name"'
                    +' "image players rank"'
                    +' "image best rating"'
                    +' "image recommended notRecommended"'
                ),
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "5px",
            }}>
                <div style={{gridArea: "name"}}>
                <Typography variant="h5" textAlign='center'>
                        {props.name}
                    </Typography>
                </div>
                <div style={{gridArea: "image"}}>
                    <img alt="" src={props.image} style={{objectFit: "contain"}}/>
                </div>
                <div style={{gridArea: "players"}}>
                    <Typography>
                        {players}
                    </Typography>
                </div>
                <div style={{gridArea: "best"}}>
                    <Typography>
                        {"Best with: "+props.bestWith}
                    </Typography>
                </div>
                <div style={{gridArea: "recommended"}}>
                {props.recommended &&
                    <Chart
                    type='pie'
                    width="100%"
                    height="100%"
                    options={{
                       maintainAspectRatio: true,
                       plugins: {
                        title: {
                            text: "Recommended",
                            display: true
                        }
                       }
                    }}
                    title="Recommended"
                    data={{
                        labels: Object.keys(props.recommended),
                        datasets: [{
                            label: "# of Votes",
                            data: Object.values(props.recommended),
                            backgroundColor: recommendedColors
                        }]
                    }}
                    />
                }
                </div>
                <div style={{gridArea: "rank"}}>
                    <Typography>
                        {"Rank: "+props.bggRank}
                    </Typography>
                </div>
                <div style={{gridArea: "rating"}}>
                    <Typography>
                        {"Rating: "+props.userRating}
                    </Typography>
                </div>
                <div style={{gridArea: "notRecommended"}}>
                {props.notRecommended &&
                    <Pie
                    width="100%"
                    height="100%"
                    options={{
                       maintainAspectRatio: true,
                       plugins: {
                        title: {
                            text: "Not Recommended",
                            display: true
                        }
                       }
                    }}
                    title="Not Recommended"
                    data={{
                        labels: Object.keys(props.notRecommended),
                        datasets: [{
                            label: "# of Votes",
                            data: Object.values(props.notRecommended),
                            backgroundColor: notRecommendedColors
                        }]
                    }}
                    />
                }
                </div>
            </div>
        </Paper>
    )
}