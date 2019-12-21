import React from 'react';
import logo from './logo.svg';
import './index.css';
import Left from "./components/left"
import Right from "./components/right" 

function App() {
  
  return (
    <div className="content-main">

      <Left>This is left panel</Left>
      <Right>This is right panel</Right>
    </div>
  );
}

export default App;
