import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type Status = "ready" | "loading" | "idle";

export interface ViewState {
  status: Status;
  error: string | null;
}

const initialState: ViewState = {
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>): void => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>): void => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setError } = slice.actions;

export const selectStatus = (state: RootState): Status => state.view.status;
export const selectError = (state: RootState): string | null =>
  state.view.error;

export default slice.reducer;
