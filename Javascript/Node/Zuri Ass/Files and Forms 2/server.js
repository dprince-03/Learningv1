const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

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
      const formData = querystring.parse(body);
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        otherNames: formData.otherNames,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
      };

      const filePath = path.resolve(__dirname, "database.json");

      console.log(filePath);

      fs.readFile(filePath, "utf8", (err, fileData) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end("An error occurred while reading the file.");
          return;
        }

        const existingData = fileData ? JSON.parse(fileData) : [];
        existingData.push(data);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end("An error occurred while writing to the file.");
            return;
          }

          res.statusCode = 200;
          res.end("Form data submitted successfully.");
        });
      });
    });
  } else if (req.method === "GET" && req.url === "/script") {
    const filePath = path.join(__dirname, "App", "script.js");
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
  } else if (req.method === "GET" && req.url === "/style") {
        const filePath = path.join(__dirname, "App", "style.css");
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
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("up and running");
});
