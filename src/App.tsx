import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import CollectionView from './features/CollectionView';
import TitleBar from './features/TitleBar';
import { setUser } from './features/TitleBar/slice';
import { fetchCollection } from './sagas/fetchCollectionSaga';

function App() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    const user = searchParams.get('user')
    if (user) {
      dispatch(setUser(user))
      dispatch(fetchCollection({user}))
    }
    
  },[searchParams, dispatch])
  return (
    <div style={{
      display: 'flex',
      flexDirection: "column",
      rowGap: "10px"
    }}>
      <TitleBar/>
      <CollectionView/>

    </div>
  );
}

export default App;
