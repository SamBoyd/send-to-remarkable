var http = require('http');
var wkhtmltox = require('wkhtmltox');

http.createServer(function (req, res) {
    var converter = new wkhtmltox();

    converter.wkhtmltopdf = "/opt/wkhtmltopdf/wkhtmltox/bin/wkhtmltopdf";

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
    });

    converter.pdf(req, {'load-error-handling': 'ignore'})
        .pipe(res)

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');