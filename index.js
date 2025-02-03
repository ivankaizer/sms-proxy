const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const wss = require('express-ws')(app);
const limiter = rateLimit({
    windowMs: 60 * 1000, // 60s
    limit: 10,
    standardHeaders: true,
    message: { error: 'Too many requests, please try again later.' },
});

app.use(express.json());
app.disable('x-powered-by');

app.post('/:id', limiter, (req, res) => {
    [...wss.getWss().clients]
        .filter((client) => client.id == req.params.id)
        .forEach((client) => client.send(req.body.message));

    res.json();
});

app.ws('/ws/:id', (ws, req) => {
    ws.id = req.params.id;
});

app.listen(3000, () => console.log('Listening on port 3000'));