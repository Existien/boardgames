import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import Collection from "../Collection";
import { selectError, selectStatus, Status } from "./slice";

interface Props {
  status: Status;
  error: string | null;
}

export const View: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {props.status === "ready" && <Collection />}
      {props.status === "loading" && (
        <div className="StatusInfo">
          <CircularProgress />
        </div>
      )}
      {props.status === "idle" && (
        <div className="StatusInfo">
          {props.error === null ? (
            <Typography>
              Enter BGG user to display boardgame collection
            </Typography>
          ) : (
            <Typography color="red">{props.error}</Typography>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): Props => ({
  status: selectStatus(state),
  error: selectError(state),
});

export default connect(mapStateToProps)(View);
