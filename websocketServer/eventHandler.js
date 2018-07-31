
const ConnHash = require ( './websocket/ConnectionsHashtable');
const EVENTS = require('../shared/websocketEvents.json');
module.exports = {
    handleTopicEventFromClient: (topicEvent)=>{
        const ws_clients = ConnHash.getClients(topicEvent.topic);
       ws_clients.forEach((client_ws)=>{
           client_ws.send(
               JSON.stringify(
                   {
                       type: EVENTS.TOPIC_EVENT_FORWARDED,
                       event: topicEvent.asObject()
                   }
               )
           );
        })
    },
    handleSubscribeToTopic: (topic_name,ws)=>{
        ConnHash.setClient(topic_name,ws);
        ws.send(JSON.stringify({
            type: EVENTS.ACK,
            event: {
                success: true,
                msg: `subscribed to topic ${topic_name}`
            }
        }))
    },
}