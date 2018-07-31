const WebSocket = require('isomorphic-ws');
const EVENTS = require('../shared/websocketEvents');
class Client {

    constructor(client_name){
        if (!client_name){
            throw new Error("Need to define a client name.");
        }
        this.clientname = client_name;
    }
    createConnection (options){
        return new Promise((resolve,reject)=>{
            if (options){
                this.ws = new WebSocket(`ws://${options.host? options.host: 'localhost'}:${options.port? options.port: '5555'}`)
            }
            else{
                //default
                this.ws = new WebSocket(`ws://localhost:5555`)
            }
            this.ws.onopen = function (){
                resolve();
            };
            setTimeout(()=>{
                reject();
            },5000);
        });
    }
    sendStep(topic,to,message){
        this.ws.send(JSON.stringify(
            {type: EVENTS.TOPIC_EVENT,
            event: {
                to,
                from: this.clientname,
                msg: message,
                topic,
                timestamp: Date.now()
            }}
        ))
    }

    sendProcessing(topic,message){
        this.sendStep(topic,this.clientname,message);
    }

    closeConnection (){
        this.ws.close();
    }


}
module.exports =  Client;