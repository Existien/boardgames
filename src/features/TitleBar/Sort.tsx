import {
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Dispatch } from "../../util";
import {
  selectSortCriterium,
  setSortCriterium,
  SortCriterium,
} from "../Collection/slice";

const muiTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          marginTop: "6px",
          color: "white",
          borderColor: "magenta",
        },
        icon: {
          color: "white",
        },
      },
    },
  },
});

interface StateProps {
  criterium: SortCriterium;
}

interface DispatchProps {
  setCriterium: (crit: SortCriterium) => void;
}

type Props = StateProps & DispatchProps;

export const Sort: React.FC<Props> = (props: Props) => {
  return (
    <div className="FormInput">
      <ThemeProvider theme={muiTheme}>
        <Typography style={{ whiteSpace: "pre-wrap" }}>{"Sort by "}</Typography>
        <Select
          variant="standard"
          disableUnderline
          size="small"
          value={props.criterium}
          onChange={(e) => props.setCriterium(e.target.value as SortCriterium)}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  criterium: selectSortCriterium(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setCriterium(crit) {
    dispatch(setSortCriterium(crit));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
