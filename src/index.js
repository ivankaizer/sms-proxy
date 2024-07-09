const express = require('express');
const app = express();
const wss = require('express-ws')(app);

app.use(express.json());

const gracefulShutdown = () => {
    // redis teardown
};

app.get('/:number', (req, res) => res.send(req.params.number));

app.post('/:number', (req, res) => {
    console.log(`Found ${wss.getWss().clients.size} clients`);
    wss.getWss().clients.forEach((client) => client.send(req.params.number));
    res.send(req.params.number);
});

app.delete('/:number', (req, res) => res.send(req.params.number));

app.ws('/', (ws, req) => {
    ws.on('message', function (msg) {
        console.log('message', msg);
    });
    console.log('socket', 'socket');
});

app.listen(3000, () => console.log('Listening on port 3000'));

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
