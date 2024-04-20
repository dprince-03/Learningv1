var url = require('url');
var http = require('http');
var fs = require('fs');
var port = 8080;


// var abr = `http://localhost:${port}/default.htm?year=2024&month=April`;
// var q = url.parse(abr, true);

// console.log (abr);
// console.log(q.pathname);
// console.log(q.search);

// var qdata = q.query;
// console.log(qdata.month);

http.createServer(function (req, res){
    var q = url.parse(req.url, true);
    // var filename = `.${q.pathname}`;
    // var filename = '.' + q.pathname;
     var filename = "." + (q.pathname === "/" ? "/default.htm" : q.pathname);

    fs.readFile(filename, function(err, data){
        if (err){
            res.writeHead(404, {'content-Type': 'text/html'});
            return res.end('404 Not Found');
        }

        res.writeHead(200, {'content-Type': 'text/html'});
        res.write(data);
        return res.end;
    });

}).listen(port);

console.log(`Server running at http://localhost:${port}/summer.html`);
console.log(`Server running at http://localhost:${port}/winter.html`);