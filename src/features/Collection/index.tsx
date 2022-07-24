import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Game } from "./Game";
import { Collection, selectFilteredCollection } from "./slice";

interface Props {
  collection: Collection;
}

export const CollectionView: React.FC<Props> = (props: Props) => {
  return (
    <div className="Collection">
      {props.collection.map((game) => (
        <Game key={game.objectId + game.image} {...game} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState): Props => ({
  collection: selectFilteredCollection(state),
});

export default connect(mapStateToProps)(CollectionView);
