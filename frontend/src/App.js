import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {Button,InputGroup,Intent} from '@blueprintjs/core';
import moment from 'moment';
import SocketClient from './websocket/socketclient';
import SequenceDiagram from './SequenceDiagram';
import AppToaster from './ui/AppToaster';
class App extends Component {
    state={
        events: [],
        hasSubscribed: false,
        subscribeLoading : false,
        topicname : '',
        isConnected: false,
        connectingString:'connecting to localhost 5555....'
    }

    componentDidMount(){
        this.socketClient = new SocketClient();
        this.socketClient.connect('localhost','5555',(event)=>{

           this.setState((prevState)=>({
               events: [...prevState.events,event].sort((a,b)=>a.timestamp > b.timestamp ? 1: -1)}))
        },(ackObj)=>{
            if (ackObj.success){
                AppToaster.show({
                    message:ackObj.msg,
                    intent: Intent.SUCCESS,
                    icon :'tick-circle'
                });
                this.setState(prevState=>({
                    subscribeLoading:false,
                    hasSubscribed:ackObj.isSubscribing,
                    topicname: ackObj.isSubscribing?prevState.topicname : '',
                    events: []
                }))
            }

        }).then(()=>{
            this.setState({isConnected:true});
            AppToaster.show({message:'Connected to Websocket Server.',intent: Intent.PRIMARY, icon : 'tick-circle'})
        }).catch((e)=>{
            this.setState({connectingString:'connection error.'})
            AppToaster.show({message:'Connection error.',intent: Intent.DANGER, icon : 'warning-sign'})
        })

    }
    componentWillUnmount(){
        this.socketClient.close();

    }
    handleSubscribe= ()=>{
        if(!this.state.topicname || this.state.topicname === ''){
           AppToaster.show({message: "please specify a proper topic name. ",intent: Intent.WARNING,icon: 'warning-sign'});

        }else{
            this.setState({subscribeLoading:true});
                this.socketClient.subscribeToTopic(this.state.topicname);
        }

    }
    handleUnsubscribe=  ()=>{
        //TODO
        this.socketClient.unsubscribeFromTopic(this.state.topicname);
    }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sequvis </h1>
        </header>
          {this.state.isConnected?
              <div>
               <InputGroup
               onChange={(txt)=>{
                   if (!this.state.hasSubscribed)
                   this.setState({topicname:txt.target.value})
               }}
               placeholder="Put topic to subscribe here..."
               value={this.state.topicname}
               style={{width: ' 25%'
               ,marginTop:'10px'}}
               />
          <Button
              style={{marginTop:'10px'}}
              large
              icon={this.state.hasSubscribed? "confirm":"feed"}
              loading={this.state.subscribeLoading}
              disabled={this.state.hasSubscribed}
              onClick={this.handleSubscribe
          }>
              {this.state.hasSubscribed? 'subscribed':'subscribe To Topic'}
          </Button>
          <Button
              style={{marginTop:'10px',marginLeft:'5px'}}
              large
              intent={Intent.DANGER}
              icon={'offline'}
              disabled={!this.state.hasSubscribed}
              onClick={this.handleUnsubscribe
              }>
              Unsubscribe
          </Button>
              </div>
              :<h3>{this.state.connectingString}</h3>}
          <SequenceDiagram
              title={this.state.hasSubscribed? this.state.topicname: ''}
            items={
              this.state.events
            }
          />

      </div>
    );
  }
}

export default App;