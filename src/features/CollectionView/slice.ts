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
    isReady: boolean;
}

const initialState: CollectionState = {
    collection: [],
    isReady: false
}

const slice = createSlice({
    name: 'collectionView',
    initialState,
    reducers: {
        setCollection: (state, action: PayloadAction<Collection>): void => {
            state.collection = action.payload
        },
        setIsReady: (state): void  => {
            state.isReady = true
        }
    }
});

export const {
    setCollection,
    setIsReady,
} = slice.actions;

export const selectCollection = (state: RootState): Collection =>
    state.collectionView.collection;
export const selectIsReady = (state: RootState): boolean => state.collectionView.isReady;

export default slice.reducer;