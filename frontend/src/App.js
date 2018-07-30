import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import moment from 'moment';
import SequenceDiagram from './SequenceDiagram';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Seqvis</h1>
        </header>
          <SequenceDiagram
            items={[
                {from: 'beary',
                to:'berdog',
                msg:'hellooo',
                    timestamp: moment()
                },

                {to: 'beary',
                    from:'berdog',
                    msg:'helloo back!!',
                timestamp: moment() + 1000},
            ]}
          />

      </div>
    );
  }
}

export default App;