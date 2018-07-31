import EVENTS from '../config/websocketEvents';
class SocketClient{
    connect(host,port,onReceiveTopicEvent){
        this.socket = new WebSocket(`ws://${host}:${port}`)
        this.socket.onmessage = function(message){
            console.log(`received message ${message.data}`)
            let parsed_evt = JSON.parse(message.data);
            console.log(`${parsed_evt.type} === ${EVENTS.TOPIC_EVENT_FORWARDED}`)
            if(parsed_evt.type === EVENTS.TOPIC_EVENT_FORWARDED){
                onReceiveTopicEvent(parsed_evt.event);
            }
        }
    }
    close(){
        if(this.socket){
            this.socket.close();
            this.socket =undefined;
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