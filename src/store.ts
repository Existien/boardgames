import { configureStore, combineReducers } from "@reduxjs/toolkit";
import titleBarReducer from "./features/TitleBar/slice"

const reducer = combineReducers({
    titleBar: titleBarReducer
})

export const store = configureStore({
    reducer: reducer
});

export type RootState = ReturnType<typeof store.getState>