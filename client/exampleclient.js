const Client = require('./index');
let client = new Client('client');
let server = new Client('server');
console.log('creating connection..');
Promise.all([

    client.createConnection(),
    server.createConnection()
]).then(()=>{
    console.log('connection ok. Sending....');
    client.sendStep('berdog','server','helloo!');
    server.sendProcessing('berdog','processing ting');
    server.sendStep('berdog','client','hello back!');
    console.log('closing connection.')
    client.closeConnection();
    server.closeConnection();
    process.exit(0);

})
