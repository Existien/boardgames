import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import titleBarReducer from "./features/TitleBar/slice";
import collectionReducer from "./features/Collection/slice";
import viewReducer from "./features/View/slice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";

const reducer = combineReducers({
  titleBar: titleBarReducer,
  collection: collectionReducer,
  view: viewReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
