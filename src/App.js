import React from 'react';
import './App.css'; // If you have a separate CSS file
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1>Hello, Trello Clone!</h1>
      <Board />
    </div>
  );
}

export default App;
