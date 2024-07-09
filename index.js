const express = require('express');
const app = express();
const wss = require('express-ws')(app);

app.use(express.json());

app.post('/:id', (req, res) => {
    const wssClients = wss.getWss().clients;
    console.log(`Found ${wssClients.size} clients`);
    
    [...wssClients]
        .filter(client => client.id == req.params.id)
        .forEach((client) => client.send(req.body.message));

    res.json();
});

app.ws('/ws/:id', (ws, req) => {
    ws.id = req.params.id;
});

app.listen(3000, () => console.log('Listening on port 3000'));