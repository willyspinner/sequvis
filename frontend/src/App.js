import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import moment from 'moment';
import SocketClient from './websocket/socketclient';
import SequenceDiagram from './SequenceDiagram';
class App extends Component {
    state={
        events: []
    }

    componentDidMount(){
        this.socketClient = new SocketClient();
        this.socketClient.connect('localhost','5555',(event)=>{

           this.setState((prevState)=>({events: [...prevState.events,event]}))
        });

    }
    componentWillUnmount(){

    }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Seqvis</h1>
        </header>
          <button onClick={()=>{
              this.socketClient.subscribeToTopic('berdog');
          }}>
              subscribe.
          </button>
          <SequenceDiagram
            items={
              this.state.events
            }
          />

      </div>
    );
  }
}

export default App;