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
export type SortCriterium = "rating" | "name";

export interface CollectionState {
  collection: Collection;
  filteredCollection: Collection;
  minPlayers: string;
  maxPlayers: string;
  sortCriterium: SortCriterium;
}

const initialState: CollectionState = {
  collection: [],
  filteredCollection: [],
  minPlayers: "",
  maxPlayers: "",
  sortCriterium: "name",
};

const getFilteredCollection = (state: CollectionState): Array<Game> => {
  const minPlayers = parseInt(state.minPlayers);
  const maxPlayers = parseInt(state.maxPlayers);
  const filteredCollection = state.collection.filter(
    (game) =>
      (isNaN(minPlayers) || game.minPlayers <= minPlayers) &&
      (isNaN(maxPlayers) || game.maxPlayers >= maxPlayers)
  );
  switch (state.sortCriterium) {
    case "name":
      return filteredCollection;
    case "rating":
      return filteredCollection.sort(
        (a, b) => Number(b.userRating) - Number(a.userRating)
      );
  }
};

const slice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<Collection>): void => {
      state.collection = action.payload;
      state.filteredCollection = getFilteredCollection(state);
    },
    setMinPlayers: (state, action: PayloadAction<string>): void => {
      state.minPlayers = action.payload;
      state.filteredCollection = getFilteredCollection(state);
    },
    setMaxPlayers: (state, action: PayloadAction<string>): void => {
      state.maxPlayers = action.payload;
      state.filteredCollection = getFilteredCollection(state);
    },
    setSortCriterium: (state, action: PayloadAction<SortCriterium>): void => {
      state.sortCriterium = action.payload;
      state.filteredCollection = getFilteredCollection(state);
    },
  },
});

export const { setSortCriterium, setMinPlayers, setMaxPlayers, setCollection } =
  slice.actions;

export const selectMinPlayers = (state: RootState): string =>
  state.collection.minPlayers;
export const selectMaxPlayers = (state: RootState): string =>
  state.collection.maxPlayers;
export const selectCollection = (state: RootState): Collection =>
  state.collection.collection;
export const selectFilteredCollection = (state: RootState): Collection =>
  state.collection.filteredCollection;
export const selectSortCriterium = (state: RootState): SortCriterium =>
  state.collection.sortCriterium;

export default slice.reducer;
