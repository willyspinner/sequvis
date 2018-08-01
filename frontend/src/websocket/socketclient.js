import EVENTS from '../config/websocketEvents.json';
class SocketClient{
    startTime= 0;
    endTime =0;
    sendRoundtrip(cback) {
        if (typeof this.evtFuncHash[EVENTS.ROUNDTRIP_RESPONSE] !== 'function') {
            this.evtFuncHash[EVENTS.ROUNDTRIP_RESPONSE] = () => {
                this.endTime = performance.now();
                cback(this.endTime - this.startTime);
            }
        }
        if (this.socket) {
            this.startTime = performance.now();
            this.socket.send(JSON.stringify({
                type: EVENTS.ROUNDTRIP_REQUEST
            }))

        }

    }


    evtFuncHash = new Map();
    connect(host,port,onReceiveTopicEvent, onAck ){
        let thatEvtFunc = this.evtFuncHash;
        return new Promise((resolve,reject)=>{
            this.socket = new WebSocket(`ws://${host}:${port}`)
            this.socket.onerror=function(e){
                reject(e);
            };
            thatEvtFunc[EVENTS.TOPIC_EVENT_FORWARDED] = onReceiveTopicEvent;
            thatEvtFunc[EVENTS.ACK] = onAck;
            this.socket.onmessage = function(message){
                console.log(`received message ${message.data}`)
                let parsed_evt = JSON.parse(message.data);
                thatEvtFunc[parsed_evt.type](parsed_evt.event);
            }
            let timeout = setTimeout(()=>reject(),5000);
            this.socket.onopen = function(){
                clearTimeout(timeout);
                resolve();
            }
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