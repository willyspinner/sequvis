class ConnectionsHashTable {
    /*

    Maps topic to an array of connected clients.

     */
    constructor(){
        this.hashtable = new Map();
    }

    getClients(topic_name){
        const clients =this.hashtable[topic_name];
        return clients ? clients :[];
    }
    setClient(topic_name,ws){
        let clients = this.hashtable[topic_name];

        clients = clients? clients : [];
        this.hashtable[topic_name] = [...clients, ws];
    }
    unset(topic_name,disconnected_ws){

        let topic_clients  = this.hashtable[topic_name];

        this.hashtable[topic_name] =topic_clients.filter((ws)=>ws.id !== disconnected_ws.id);
    }

}
let instance = new ConnectionsHashTable();
module.exports = instance;