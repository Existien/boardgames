import { CircularProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Game as Props } from "./slice";
import { assignColors, spectral } from "../../plots";
import { PieChart } from "./PieChart";

const timeout = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const Game: React.FC<Props> = (props: Props) => {
  const players =
    "Players: " +
    (props.minPlayers === props.maxPlayers
      ? props.minPlayers
      : props.minPlayers + " - " + props.maxPlayers);

  const colorMap = assignColors(Object.keys(props.recommended || {}), spectral);

  const [recChart, setRecChart] = useState<React.ReactNode>(
    <CircularProgress />
  );
  const [notRecChart, setNotRecChart] = useState<React.ReactNode>(
    <CircularProgress />
  );

  useEffect(() => {
    const createCharts = async () => {
      await timeout(100);
      let lazyCharts = [recChart, notRecChart];
      if (props.recommended) {
        lazyCharts[0] = (
          <PieChart
            data={props.recommended}
            title="Recommended"
            legendPosition="left"
            colorMap={colorMap}
            dataLimit={5}
          />
        );
      }
      if (props.notRecommended) {
        lazyCharts[1] = (
          <PieChart
            data={props.notRecommended}
            title="Not Recommended"
            legendPosition="right"
            colorMap={colorMap}
            dataLimit={5}
          />
        );
      }
      return lazyCharts;
    };

    createCharts().then((charts) => {
      setRecChart(charts[0]);
      setNotRecChart(charts[1]);
    });
  }, []);

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
        <div style={{ gridArea: "recommended" }}>{recChart}</div>
        <div style={{ gridArea: "rank" }}>
          <Typography>{"Rank: " + props.bggRank}</Typography>
        </div>
        <div style={{ gridArea: "rating" }}>
          <Typography>{"Rating: " + props.userRating}</Typography>
        </div>
        <div style={{ gridArea: "notRecommended" }}>
          {props.notRecommended && (
            <div style={{ gridArea: "notRecommended" }}>{notRecChart}</div>
          )}
        </div>
      </div>
    </Paper>
  );
};
