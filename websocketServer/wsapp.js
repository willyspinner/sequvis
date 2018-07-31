const WebSocket = require('ws');
const EVENTS= require('../shared/websocketEvents');
const port = 5555;
const eventHandler = require('./eventHandler')
const TopicEvent = require('./models/TopicEvent');
const wss = new WebSocket.Server({ port});
const uuid  = require('uuid');

wss.on('connection', function connection(ws) {
    ws.id = uuid();
    ws.subscribedTopics = [];
    console.log(`${ws.id} established connection.`);
    ws.on('close',function (){
        console.log(`${ws.id} client closed connection.`);
        eventHandler.handleCloseFromClient(ws);
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
            case EVENTS.UNSUBSCRIBE_FROM_TOPIC:
                eventHandler.handleUnsubscribeFromTopic(parsed_evt.event.topic,ws);
                return;
            default:
                console.log('wsapp: unknown event: ',parsed_evt.type);

        }
    });
});
console.log('🚀 websocket server listening on port ',port);