class ConnectionsHashTable {
    /*

    Maps topic to an array of connected clients.

     */
    constructor(){
        this.hashtable = new Map();
    }

    get(topic_name){
        return this.hashtable[topic_name];
    }
    set(topic_name,ws){
        this.hashtable[topic_name] = [...this.hashtable[topic_name], ws];
    }
    unset(topic_name,disconnected_ws){
        console.error('disconnectClient not impl yet,');
        //TODO: do this later.
       // this.hashtable[topic_name] =this.hashtable.filter((ws)=> )
    }

}
let instance = new ConnectionsHashTable();
module.exports = instance;