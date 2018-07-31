const Client = require('./index');
let client = new Client('my serv ting');
console.log('creating connection..');
client.createConnection(
).then(()=>{
    console.log('connection ok. Sending....');
    client.sendStep('berdoge','client','helloo!');
    client.sendProcessing('berdoge','processing ting');
    console.log('closing connection.')
    client.closeConnection();
    process.exit(0);

})
