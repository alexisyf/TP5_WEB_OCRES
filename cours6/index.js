console.log('hello')
const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

/*GET */
app.get('/test', (req, res) => {
    res.json({
        req: req.method,
        data: "This is a get"
    })
});

/*PUT */
app.put('/test', (req, res) => {
    res.json({
        req: req.method,
        data: "This is a put"
    })
});

app.listen(port, hostname, () => {
    console.log(`Mon serveur fonctionne sur http://${hostname}:${port} \n`);
});