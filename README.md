# Seqvis. Realtime Sequence Diagram Visualiser.
seqvis is an App Logic Debugger that lets you visualize what is happening in the individual and architecture level of the app.

It Lets you easily sync up with any web app . Seqvis exposes a client class and methods that let you update the 'state' of the app, and see updates in real time in a locally hosted webpage and server.

# How to run a seqvis client
we expose a client class which abstracts everything up to the usage level.

## initializing client
```js
client.createConnection(options);
```
where options is a JS object, with properties:
- `host`: host of server
- `port`: port
- `theme`: (optional) which theme to use in `react-sequence-diagram`.

## basic usage

```js
client.sendStep(topic, from,to,message);
```
- `topic`: topic of sequence diagram.
- `from`: sender name
- `to`: recipient name
- `message`: message to be displayed in arrow.

NOTE: `from` and `to` can be the same. For the same sender and recipient, a convenience method is procided in `sendProcessing()`.


## convenience methods.
```js
client.sendProcessing(topic,who_is_processing,message);
```
- `topic`: topic of sequence diagram.
- `who_is_processing`: name of entity that is doing processing
- `message`: message to be displayed in block.

