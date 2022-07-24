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
  filteredCollection: Collection;
  minPlayers: string;
  maxPlayers: string;
}

const initialState: CollectionState = {
  collection: [],
  filteredCollection: [],
  minPlayers: "",
  maxPlayers: "",
};

const filterCollectionByPlayers = (
  collection: Array<Game>,
  minPlayers: number,
  maxPlayers: number
): Array<Game> => {
  return collection.filter(
    (game) =>
      (isNaN(minPlayers) || game.minPlayers <= minPlayers) &&
      (isNaN(maxPlayers) || game.maxPlayers >= maxPlayers)
  );
};

const slice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<Collection>): void => {
      state.collection = action.payload;
      state.filteredCollection = filterCollectionByPlayers(
        action.payload,
        parseInt(state.minPlayers),
        parseInt(state.maxPlayers)
      );
    },
    setMinPlayers: (state, action: PayloadAction<string>): void => {
      state.minPlayers = action.payload;
      state.filteredCollection = filterCollectionByPlayers(
        state.collection,
        parseInt(action.payload),
        parseInt(state.maxPlayers)
      );
    },
    setMaxPlayers: (state, action: PayloadAction<string>): void => {
      state.maxPlayers = action.payload;
      state.filteredCollection = filterCollectionByPlayers(
        state.collection,
        parseInt(state.minPlayers),
        parseInt(action.payload)
      );
    },
  },
});

export const { setMinPlayers, setMaxPlayers, setCollection } = slice.actions;

export const selectMinPlayers = (state: RootState): string =>
  state.collection.minPlayers;
export const selectMaxPlayers = (state: RootState): string =>
  state.collection.maxPlayers;
export const selectCollection = (state: RootState): Collection =>
  state.collection.collection;
export const selectFilteredCollection = (state: RootState): Collection =>
  state.collection.filteredCollection;

export default slice.reducer;
