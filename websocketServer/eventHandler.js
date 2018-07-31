
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
                       event: topicEvent.toObject()
                   }
               )
           );
        })
    },
    handleSubscribeToTopic: (topic_name,ws)=>{
        ConnHash.setClient(topic_name,ws);
        ws.subscribedTopics.push(topic_name);
        ws.send(JSON.stringify({
            type: EVENTS.ACK,
            event: {
                success: true,
                msg: `subscribed to topic ${topic_name}.`,
                isSubscribing:true
            }
        }))
    },
    handleUnsubscribeFromTopic: (topic_name_unsubscribe,ws)=>{
      ws.subscribedTopics.filter((topic_name)=>topic_name !== topic_name_unsubscribe);
      ConnHash.unset(topic_name_unsubscribe,ws);
        ws.send(JSON.stringify({
            type: EVENTS.ACK,
            event: {
                success: true,
                msg: `unsubscribed from topic ${topic_name_unsubscribe}.`,
                isSubscribing:false
            }
        }));
    },

    handleCloseFromClient : (ws)=>{
        ws.subscribedTopics.forEach((topic)=>{
            ConnHash.unset(topic,ws.id);
        })

    }
}