import EVENTS from '../config/websocketEvents';
class SocketClient{
    connect(host,port,onReceiveTopicEvent, onAck ){
        return new Promise((resolve,reject)=>{
            this.socket = new WebSocket(`ws://${host}:${port}`)
            this.socket.onerror=function(e){
                reject(e);
            }
            this.socket.onmessage = function(message){
                console.log(`received message ${message.data}`)
                let parsed_evt = JSON.parse(message.data);
                switch(parsed_evt.type){
                    case EVENTS.TOPIC_EVENT_FORWARDED:
                        onReceiveTopicEvent(parsed_evt.event);
                        return;
                    case EVENTS.ACK:
                        onAck(parsed_evt.event);
                        return;
                }
            }
            this.socket.onopen = function(){
                resolve();
            }
            setTimeout(()=>reject(),5000);
        });
    }
    close(){
        if(this.socket){
            this.socket.close();
            this.socket =undefined;
        }

    }
    unsubscribeFromTopic(topic){
        if(this.socket){
            this.socket.send(
                JSON.stringify({
                    type:EVENTS.UNSUBSCRIBE_FROM_TOPIC,
                    event: {
                        topic
                    }
                })
            );
            console.log('sent');
        }
    }
    subscribeToTopic(topic){
        if(this.socket){
            this.socket.send(
                JSON.stringify({
                    type:EVENTS.SUBSCRIBE_TO_TOPIC,
                    event: {
                        topic
                    }
                })
            )

        }else{
            console.error('ws socket is undefined.')
        }

    }

}
export default SocketClient;