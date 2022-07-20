import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import titleBarReducer from "./features/TitleBar/slice";
import collectionViewReducer from "./features/CollectionView/slice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";

const reducer = combineReducers({
    titleBar: titleBarReducer,
    collectionView: collectionViewReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: reducer,
    middleware: [...getDefaultMiddleware({thunk: false}),  sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>