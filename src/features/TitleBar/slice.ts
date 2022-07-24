import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface TitleBarState {
  user: string;
}

const initialState: TitleBarState = {
  user: "",
};

const slice = createSlice({
  name: "titleBar",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>): void => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = slice.actions;

export const selectUser = (state: RootState): string => state.titleBar.user;

export default slice.reducer;
