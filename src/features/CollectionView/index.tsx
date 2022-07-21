import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Game } from "./Game";
import {
  Collection,
  selectCollection,
  selectError,
  selectViewState,
  ViewState,
} from "./slice";

interface Props {
  collection: Collection;
  state: ViewState;
  error: string | null;
}

export const CollectionView: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {props.state === "ready" && (
        <div className="Collection">
          {props.collection.map((game) => (
            <Game key={game.objectId + game.image} {...game} />
          ))}
        </div>
      )}
      {props.state === "loading" && (
        <div className="CollectionInfo">
          <CircularProgress />
        </div>
      )}
      {props.state === "idle" && (
        <div className="CollectionInfo">
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
  collection: selectCollection(state),
  state: selectViewState(state),
  error: selectError(state),
});

export default connect(mapStateToProps)(CollectionView);
