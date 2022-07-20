import React from 'react'
import { connect } from 'react-redux';
import { RootState } from '../../store'
import { Game } from './Game'
import {Collection, selectCollection} from "./slice"

interface Props {
    collection: Collection;
}

export const CollectionView: React.FC<Props> = (props: Props) => {

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: "space-evenly",
            columnGap: "5px",
            rowGap: "calc(4*5px)"
        }}>
            {props.collection.map((game)=><Game
                key={game.objectId}
                {...game}
            />)}

        </div>
    )
}

const mapStateToProps = (state: RootState): Props => ({
    collection: selectCollection(state)
})

export default connect(mapStateToProps)(CollectionView);