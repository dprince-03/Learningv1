const upperCase = require("upper-case");
const http = require("http");
const port = 8080;

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(upperCase("Hello World!"));
    res.end();
}).listen(port);