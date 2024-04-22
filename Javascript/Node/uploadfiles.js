var formidable = require('formidable');
var http = require('http');
var fs = require('fs');
const path = require("path")

// Create an Upload Form
// http.createServer(function(req, res){
//     res.writeHead(200, {'content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
// }).listen(8080);

// Parse the Uploaded File
http.createServer(function(req, res){
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files){
            // Save the File
            var oldpath = files.filetoupload.filepath;
            const newPath = path.join(
              __dirname,
              files.filetoupload.originalFilename
            )
            

            fs.rename(oldpath, newpath, function(err){
                if(err) throw err;
                res.write('File uploaded');
                res.end();
            });
        });
    } else {
        res.writeHead(200, { "content-Type": "text/html" });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);