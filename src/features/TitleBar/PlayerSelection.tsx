import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Dispatch } from "../../util";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { InputBase, Typography } from "@mui/material";
import {
  selectMaxPlayers,
  selectMinPlayers,
  setMinPlayers,
  setMaxPlayers,
} from "../Collection/slice";

const StyledBackground = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  width: "50px",
  [theme.breakpoints.up("sm")]: {
    width: "50px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
    textAlign: "center",
  },
}));

interface StateProps {
  minPlayers: string;
  maxPlayers: string;
}

interface DispatchProps {
  setMinPlayers: (players: string) => void;
  setMaxPlayers: (players: string) => void;
}

type Props = StateProps & DispatchProps;

export const PlayerSelection: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <div className="PlayerSelection">
        <Typography>Min. Players:</Typography>
        <StyledBackground>
          <StyledInputBase
            placeholder=""
            value={props.minPlayers}
            onChange={(e) => props.setMinPlayers(e.target.value)}
          />
        </StyledBackground>
        <Typography>Max. Players:</Typography>
        <StyledBackground>
          <StyledInputBase
            placeholder=""
            value={props.maxPlayers}
            onChange={(e) => props.setMaxPlayers(e.target.value)}
          />
        </StyledBackground>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  minPlayers: selectMinPlayers(state),
  maxPlayers: selectMaxPlayers(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setMinPlayers(players) {
    dispatch(setMinPlayers(players));
  },
  setMaxPlayers(players) {
    dispatch(setMaxPlayers(players));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelection);
