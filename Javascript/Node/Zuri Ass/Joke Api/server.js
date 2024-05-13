const http = require("http");

// Database (array of joke objects)
let db = [
  {
    title: "Why don't scientists trust atoms?",
    comedian: "Unknown",
    year: 2022,
    id: 1,
  },
  {
    title: "I tried to catch some fog earlier.",
    comedian: "Unknown",
    year: 2021,
    id: 2,
  },
];

// Helper function to generate a new ID
const generateId = () => {
  return db.length + 1;
};

// Server
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "POST" && req.url === "/") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { title, comedian, year } = JSON.parse(body);
      const joke = { title, comedian, year, id: generateId() };
      db.push(joke);
      res.statusCode = 201;
      res.end(JSON.stringify(db));
    });
  } else if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify(db));
  } else if (req.method === "PATCH") {
    const urlParts = req.url.split("/");
    if (urlParts.length === 3 && !isNaN(urlParts[2])) {
      const id = parseInt(urlParts[2]);
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const updatedJoke = JSON.parse(body);
        const index = db.findIndex((joke) => joke.id === id);
        if (index !== -1) {
          db[index] = { ...db[index], ...updatedJoke };
          res.statusCode = 200;
          res.end(JSON.stringify(db[index]));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: "Joke not found" }));
        }
      });
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid request URL" }));
    }
  } else if (req.method === "DELETE") {
    const urlParts = req.url.split("/");
    if (urlParts.length === 3 && !isNaN(urlParts[2])) {
      const id = parseInt(urlParts[2]);
      const index = db.findIndex((joke) => joke.id === id);
      if (index !== -1) {
        const deletedJoke = db.splice(index, 1)[0];
        res.statusCode = 200;
        res.end(JSON.stringify(deletedJoke));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Joke not found" }));
      }
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid request URL" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});