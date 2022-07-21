import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import CollectionView from "./features/CollectionView";
import { setViewState } from "./features/CollectionView/slice";
import TitleBar from "./features/TitleBar";
import { setUser } from "./features/TitleBar/slice";
import { fetchCollection } from "./sagas/fetchCollectionSaga";

function App() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = searchParams.get("user");
    if (user) {
      dispatch(setUser(user));
      dispatch(fetchCollection({ user }));
    } else {
      dispatch(setViewState("idle"));
    }
  }, [searchParams, dispatch]);
  return (
    <div className="App">
      <TitleBar />
      <CollectionView />
    </div>
  );
}

export default App;
