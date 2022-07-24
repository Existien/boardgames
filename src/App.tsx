import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import TitleBar from "./features/TitleBar";
import { setUser } from "./features/TitleBar/slice";
import View from "./features/View";
import { setStatus } from "./features/View/slice";
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
      dispatch(setStatus("idle"));
    }
  }, [searchParams, dispatch]);
  return (
    <div className="App">
      <TitleBar />
      <View />
    </div>
  );
}

export default App;
