
import ConnHash from './websocket/ConnectionsHashtable';
import EVENTS from '../shared/websocketEvents.json';
module.exports = {
    handleTopicEventFromClient: (topicEvent)=>{
        ConnHash.getClients(topicEvent.topic).forEach((client_ws)=>{
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