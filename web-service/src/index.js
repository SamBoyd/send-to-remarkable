var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
    });
    res.end("")
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');