import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Game {
    name: string;
    userRating: Number;
    bggRank: Number;
    minPlayers: Number;
    maxPlayers: Number;
    bestWith?: string;
    recommended?: {[key: string]: Number};
    notRecommended?: {[key: string]: Number};
    image: string;
    objectId: string;
}

export type Collection = Array<Game>;

export interface CollectionState {
    collection: Collection;
}

const initialState: CollectionState = {
    collection: []
}

const slice = createSlice({
    name: 'collectionView',
    initialState,
    reducers: {
        setCollection: (state, action: PayloadAction<Collection>): void => {
            state.collection = action.payload
        }
    }
});

export const {
    setCollection
} = slice.actions;

export const selectCollection = (state: RootState): Collection =>
    state.collectionView.collection;

export default slice.reducer;