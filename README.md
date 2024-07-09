# message proxy

```bash
curl --request POST \
  --url https://sms-proxy.ejwan.dev/messages \
  --header 'Content-Type: application/json' \
  --data '{
  "message": "fake message"
}'
```


```js
const ws = new WebSocket('wss://sms-proxy.ejwan.dev/ws/messages'); 
ws.onmessage = message => console.log;
```