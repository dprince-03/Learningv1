const fs = require("fs");
const formidable = require("formidable");
const http = require("http");

http.createServer(function (req, res) {
    if (req.url === "/fileupload") {
      const form = new formidable.IncomingForm();
      
      form.parse(req, function (err, fields, files) {
        if (err) {
          console.error("Error parsing form data:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.write("Error uploading file");
          res.end();
          return;
        }

        const filetoupload = files.filetoupload;
        if (!filetoupload || !filetoupload.filepath) {
          console.error("No file was uploaded");
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.write("No file was uploaded");
          res.end();
          return;
        }

        const oldpath = filetoupload.filepath;
        const newpath =
          "C:/Users/princ/Documents/GitHub/Learningv1/Javascript/Node/" +
          filetoupload.originalFilename;

        fs.rename(oldpath, newpath, function (err) {
          if (err) {
            console.error("Error renaming file:", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write("Error uploading file");
            res.end();
            return;
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("File uploaded");
          res.end();
        });
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      res.end();
    }
}).listen(8080);