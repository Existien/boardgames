import { Paper, Typography } from "@mui/material";
import React from "react";
import { Game as Props } from "./slice";
import { assignColors, spectral } from "../../plots";
import { PieChart } from "./PieChart";

export const Game: React.FC<Partial<Props>> = (props: Partial<Props>) => {
  const players =
    "Players: " +
    (props.minPlayers === props.maxPlayers
      ? props.minPlayers
      : props.minPlayers + " - " + props.maxPlayers);

  const colorMap = assignColors(Object.keys(props.recommended || {}), spectral);

  return (
    <Paper className="Game">
      <div className="grid-container">
        <div style={{ gridArea: "name" }}>
          <Typography variant="h5" textAlign="center">
            <a href={`https://boardgamegeek.com/boardgame/${props.objectId}`}>
              {props.name}
            </a>
          </Typography>
        </div>
        <div style={{ gridArea: "image" }}>
          <img loading="lazy" alt="" src={props.image} />
        </div>
        <div style={{ gridArea: "players" }}>
          <Typography>{players}</Typography>
        </div>
        <div style={{ gridArea: "best" }}>
          <Typography>{"Best with: " + props.bestWith}</Typography>
        </div>
        <div style={{ gridArea: "recommended" }}>
          {props.recommended && (
            <PieChart
              data={props.recommended}
              title="Recommended"
              legendPosition="left"
              colorMap={colorMap}
              dataLimit={5}
            />
          )}
        </div>
        <div style={{ gridArea: "rank" }}>
          <Typography>{"Rank: " + props.bggRank}</Typography>
        </div>
        <div style={{ gridArea: "rating" }}>
          <Typography>{"Rating: " + props.userRating}</Typography>
        </div>
        <div style={{ gridArea: "notRecommended" }}>
          {props.notRecommended && (
            <div style={{ gridArea: "notRecommended" }}>
              {props.notRecommended && (
                <PieChart
                  data={props.notRecommended}
                  title="Not Recommended"
                  legendPosition="right"
                  colorMap={colorMap}
                  dataLimit={5}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};
