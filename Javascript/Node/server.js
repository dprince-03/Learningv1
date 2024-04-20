//importinting an external model
// var dt = require('./myFirstModule');

var http = require("http");
var url = require("url");
var fs = require("fs");

// Basic server using an external module
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write(`The Date and Time is : ${dt.myDateTime()}\n`);
//   res.write(req.url);
//   console.log(req.url);
//   res.end("\nHello Fam !!!");
// }).listen(8080);

// local server link
// http://localhost:8080/

// To do query strings
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type':'text/plain'});
//   var q = url.parse(req.url, true).query;
//   var txt = `${q.year} ${q.month}`;
//   res.end(txt);
// }).listen(8080);

// Server that creates, reads, writes, deletes files
http.createServer(function (req, res) {
    fs.open("demofile1.html", "w", function (err, file) {
        // if (err) throw err;
        console.log("Saved!");
      
        fs.writeFile("demofile1.html", "Hello Content !!!\n", function (err) {
            // if (err) throw err;
            console.log("Saved!");
            
            fs.appendFile("demofile1.html", "\nContent to add", function (err) {
                // if (err) throw err;
                console.log("Saved!");
                    
                fs.rename("demofile1.html", "mydemofile1.txt", function (err) {
                    // if (err) throw err;
                    console.log("File renamed!");
                
                    fs.unlink("demofile1.html", function (err) {
                        // if (err) throw err;
                        console.log("File deleted!");
                    
                        fs.readFile("mydemofile1.txt", function (err, data) {
                            // if (err) throw err;
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.write(data);
                            res.end();
                        });
                    });
                });
            });
        });
    });
}).listen(8080);
