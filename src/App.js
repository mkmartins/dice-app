import React, { Component } from 'react';
import './App.css';
import RowDice from './components/RowDice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RowDice />
      </div>
    );
  }
}

export default App;
