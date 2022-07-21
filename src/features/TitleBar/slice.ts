import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface TitleBarState {
    minPlayers: number|undefined;
    maxPlayers: number|undefined;
    name: string;
    user: string
}

const initialState: TitleBarState = {
    name: "",
    user: "",
    minPlayers: undefined,
    maxPlayers: undefined,
}

const slice = createSlice({
    name: 'titleBar',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>): void => {
            state.name = action.payload
        },
        setMinPlayers: (state, action: PayloadAction<number|undefined>): void => {
            state.minPlayers = action.payload
        },
        setMaxPlayers: (state, action: PayloadAction<number|undefined>): void => {
            state.maxPlayers = action.payload
        },
        setUser: (state, action: PayloadAction<string>): void => {
            state.user = action.payload
        }
    }
});

export const {
    setName,
    setMinPlayers,
    setMaxPlayers,
    setUser,
} = slice.actions;

export const selectName = (state: RootState): string =>
    state.titleBar.name;
export const selectMinPlayers = (state: RootState): number|undefined =>
    state.titleBar.minPlayers;
export const selectMaxPlayers = (state: RootState): number|undefined =>
    state.titleBar.maxPlayers;
export const selectUser = (state: RootState): string => state.titleBar.user;

export default slice.reducer;