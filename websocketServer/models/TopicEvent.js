export default class TopicEvent {
    constructor(topic,from,to,msg,timestamp){
    this.topic = topic;
    this.from = from;
    this.to=to;
    this.msg=msg;
    this.timestamp= timestamp;
    }

    toObject(){
        return {
            topic: this.topic,
            from : this.from,
            to: this.to,
            msg: this.msg,
            timestamp : this.timestamp
        }
    }
}