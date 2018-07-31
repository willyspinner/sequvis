const WebSocket = require('ws');
const EVENTS= require('../shared/websocketEvents');
const port = 5555;
const eventHandler = require('./eventHandler')
const TopicEvent = require('./models/TopicEvent');
const wss = new WebSocket.Server({ port});

wss.on('connection', function connection(ws) {
    ws.on('close',function (){
        console.log(`client closed connection.`);
    })
    ws.on('message', function incoming(message) {
        let parsed_evt;
        try {
            parsed_evt = JSON.parse(message);
        }
        catch(e){
            return;
        }
        console.log('wsapp: received parsed_event : ',parsed_evt);
        switch(parsed_evt.type){
            case EVENTS.TOPIC_EVENT:
                eventHandler.handleTopicEventFromClient(
                    new TopicEvent(
                    parsed_evt.event.topic,
                    parsed_evt.event.from,
                    parsed_evt.event.to,
                    parsed_evt.event.msg,
                    parsed_evt.event.timestamp,
                    )
                );
                return;
            case EVENTS.SUBSCRIBE_TO_TOPIC:
                eventHandler.handleSubscribeToTopic(parsed_evt.event.topic,ws);
                return;

        }
    });
});
console.log('🚀 websocket server listening on port ',port);