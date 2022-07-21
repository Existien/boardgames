import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Game {
  name: string;
  userRating: Number;
  bggRank: Number;
  minPlayers: Number;
  maxPlayers: Number;
  bestWith?: string;
  recommended?: { [key: string]: Number };
  notRecommended?: { [key: string]: Number };
  image: string;
  objectId: string;
}

export type Collection = Array<Game>;
export type ViewState = "ready" | "loading" | "idle";

export interface CollectionState {
  collection: Collection;
  viewState: ViewState;
  error: string | null;
}

const initialState: CollectionState = {
  collection: [],
  viewState: "idle",
  error: null,
};

const slice = createSlice({
  name: "collectionView",
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<Collection>): void => {
      state.collection = action.payload;
    },
    setViewState: (state, action: PayloadAction<ViewState>): void => {
      state.viewState = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>): void => {
      state.error = action.payload;
    },
  },
});

export const { setCollection, setViewState, setError } = slice.actions;

export const selectCollection = (state: RootState): Collection =>
  state.collectionView.collection;
export const selectViewState = (state: RootState): ViewState =>
  state.collectionView.viewState;
export const selectError = (state: RootState): string | null =>
  state.collectionView.error;

export default slice.reducer;
