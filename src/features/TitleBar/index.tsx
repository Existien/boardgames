import React from "react";
import { Toolbar, AppBar } from "@mui/material";
import UserInput from "./UserInput";
import PlayerSelection from "./PlayerSelection";
import Sort from "./Sort";

export const TitleBar: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              columnGap: "5px",
            }}
          >
            <UserInput />
            <Sort />
            <PlayerSelection />
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TitleBar;
