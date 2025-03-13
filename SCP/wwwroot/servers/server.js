const http = require('http');
const { toggleRelay, getOutputStatus } = require('./model/http');

const PORT = 3333;

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/toggle') {
        await toggleRelay();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Request accepted: toggling relay.');
    } else if (req.method === 'GET' && req.url === '/output/GetStatus') {
        const status = await getOutputStatus();
        //status is either true or false bool value
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(String(status));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
})


