# message proxy

```bash
POST https://sms-proxy.ejwan.dev/messages HTTP/1.1
Content-Type: application/json
{
  "message": "fake message"
}
```


```js
const ws = new WebSocket('wss://sms-proxy.ejwan.dev/ws/messages'); 
ws.onmessage = message => console.log;
```