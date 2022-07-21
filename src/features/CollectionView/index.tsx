import { CircularProgress } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import { RootState } from '../../store'
import { Game } from './Game'
import {Collection, selectCollection, selectIsReady} from "./slice"

interface Props {
    collection: Collection;
    isReady: boolean;
}

export const CollectionView: React.FC<Props> = (props: Props) => {

    return (
        <React.Fragment>
        {props.isReady ?
        <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: "space-evenly",
            columnGap: "5px",
            rowGap: "calc(4*5px)"
        }}>
            {props.collection.map((game)=><Game
                key={game.objectId+game.image}
                {...game}
            />)}

        </div>
        : <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px"
        }}><CircularProgress/></div>}
        </React.Fragment>
    )
}

const mapStateToProps = (state: RootState): Props => ({
    collection: selectCollection(state),
    isReady: selectIsReady(state),
})

export default connect(mapStateToProps)(CollectionView);