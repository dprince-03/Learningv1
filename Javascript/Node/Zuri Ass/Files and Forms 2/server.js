const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve the index.html file
    const filePath = path.join(__dirname, "./App/index.html");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(content);
      }
    });
  } else if (req.method === "POST" && req.url === "/submit") {
    // Handle form submission
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = body;

      const filePath = path.resolve(__dirname, "database.json");

      fs.readFile(filePath, "utf8", (err, fileData) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "An error occurred while reading the file." }));
          return;
        }

        let existingData;

        if (fileData) {
          existingData = JSON.parse(fileData);
        } else {
          existingData = [];
        }

        console.log(existingData);

        existingData.push(data);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "An error occurred while writing to the file." }));
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Form data submitted successfully." }));
        });
      });
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("up and running");
});
