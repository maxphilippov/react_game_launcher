import React from 'react';
import logo from './logo.svg';
import { Library } from './features/library/Library';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Library />
      </header>
    </div>
  );
}

export default App;
