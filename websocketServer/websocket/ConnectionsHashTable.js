class ConnectionsHashTable {
    /*

    Maps topic to an array of connected client uuids.

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
        console.log(`length after setClient: ${this.hashtable[topic_name].length}`)
    }
    unset(topic_name,disconnected_ws){
        let topic_clients  = this.hashtable[topic_name];
        this.hashtable[topic_name] =topic_clients.filter((ws)=>ws.id !== disconnected_ws.id);
        console.log(`length after unset : ${this.hashtable[topic_name].length}`)
    }

}
let instance = new ConnectionsHashTable();
module.exports = instance;