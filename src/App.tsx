import React from 'react';
import './App.css';
import CollectionView from './features/CollectionView';
import TitleBar from './features/TitleBar';

function App() {
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
