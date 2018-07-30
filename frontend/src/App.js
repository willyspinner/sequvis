import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import SequenceDiagram from './SequenceDiagram';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Seqvis</h1>
        </header>
          <SequenceDiagram/>

      </div>
    );
  }
}

export default App;