# websocket bridge

```bash
curl --request POST \
  --url https://ws.ejwan.dev/channel-123 \
  --header 'Content-Type: application/json' \
  --data '{"message": "some message"}'
```


```js
const ws = new WebSocket('wss://ws.ejwan.dev/ws/channel-123'); 
ws.onmessage = console.log;
```