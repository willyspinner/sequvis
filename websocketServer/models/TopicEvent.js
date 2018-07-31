export default class TopicEvent {
    constructor(topic,from,to,msg,timestamp){
    this.topic = topic;
    this.from = from;
    this.to=to;
    this.msg=msg;
    this.timestamp= timestamp;
    }
}