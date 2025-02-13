const express = require('express');
const rateLimit = require('express-rate-limit');
const timeout = require('connect-timeout');

const app = express();
const wss = require('express-ws')(app);
const limiter = rateLimit({
    windowMs: 60 * 1000, // 60s
    limit: 10,
    standardHeaders: true,
    message: { error: 'Too many requests, please try again later.' },
});

const errorHandler = (err, req, res, _) => {
    res.status(
        err.message === 'Response timeout' ? 408 : res.statusCode || 500,
    );
    res.json({ message: err.message });
};

const timeoutHandler = (req, res, next) => {
    if (!req.timedout) next();
};

app.use(express.json());
app.disable('x-powered-by');
app.use(timeout('60s', { respond: true }));
app.use(timeoutHandler);

app.post('/:id', limiter, async (req, res) => {
    const clients = [...wss.getWss().clients].filter(
        (client) => client.id === req.params.id,
    );

    if (clients.length > 1) {
        console.warn('more than one client connected');
    }

    const client = clients[0];

    if (!client) return res.status(404).json();

    client.send(req.body.message);

    const response = new Promise(function (resolve, reject) {
        client.onmessage = (message) => resolve(message.data);
        client.onerror = (error) => reject(error);
    });

    res.json(await response);
});

app.ws('/ws/:id', (ws, req) => {
    ws.id = req.params.id;
});

app.use(errorHandler);

app.listen(3000, () => console.log('Listening on port 3000'));
