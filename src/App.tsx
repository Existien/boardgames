import React from 'react';
import './App.css';
import TitleBar from './features/TitleBar';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: "column",
    }}>
      <TitleBar/>
      <div
      style={{
        backgroundColor: 'red',
        flex: "1 0 0",
        height: "100%"
      }}
      />

    </div>
  );
}

export default App;
