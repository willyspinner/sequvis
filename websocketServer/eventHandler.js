
import ConnHash from './websocket/ConnectionsHashtable';

module.exports = {
    handleTopicEventFromClient: (topicEventObj)=>{
        ConnHash.get(topicEventObj.topic).forEach((client_ws)=>{
           client_ws.send(JSON.stringify(topicEventObj));
        })
    },
    handleSubscribeToTopic: (topic_name,ws)=>{
        ConnHash.set(topic_name,ws);
        ws.send(JSON.stringify({
            success:true,
            msg: `subscribed to topic ${topic_name}`
        }))
    },
}