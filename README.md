# Sequvis. Realtime Sequence Diagram Visualiser.
sequvis is an App Logic Debugger that lets you visualize what is happening in the individual and architecture level of the app.

It Lets you easily sync up with any web app - server, client, API, etc. Sequvis exposes a client class and methods that let you update the 'state' of the app, and see updates in real time in a locally hosted webpage and server.
(**NOTE**: the Sequvis client needs node.js - i.e. Express, React frontend, etc.)

# How to run a sequvis client
we expose a client class which abstracts everything up to the usage level.

## Requirements for client
 `node >=8.5.0`
## initializing client
```js
let client = new Client('my server #1'); /* name of client */
client.createConnection(options);
```
where options is a JS object, with properties:
- `host`: host of server
- `port`: port
- `theme`: (optional) which theme to use in `react-sequence-diagram`.

## basic usage

```js
client.sendStep(topic, to,message);
```
- `topic`: topic of sequence diagram. Can be string or array (of multiple topics)
- `to`: recipient name
- `message`: message to be displayed in arrow.

NOTE: `to` and the client's own name can be the same. For the same sender and recipient, a convenience method is procided in `sendProcessing()`.


## convenience methods.
```js
client.sendProcessing(topic,message);
```
- `topic`: topic of sequence diagram. Can be string or array (of multiple topics)
- `message`: message to be displayed in block.

