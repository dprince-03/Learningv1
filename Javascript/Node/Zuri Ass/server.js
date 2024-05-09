const http = require("node:http");
const os = require("node:os");

// Helper function to simulate an asynchronous operation
const simulateAsyncOperation = () => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 5000); // Random delay between 0 and 5 seconds
    setTimeout(() => {
      resolve(`Async operation completed after ${delay} ms`);
    }, delay);
  });
};

// Helper function to get CPU and OS information
const getCPUAndOSInfo = () => {
  const cpus = os.cpus();
  const cpuModel = cpus[0].model;
  const cpuSpeed = cpus.reduce((acc, cpu) => acc + cpu.speed, 0) / cpus.length; // Average CPU speed
  const totalMemory = os.totalmem() / (1024 * 1024); // Total memory in MB
  const freeMemory = os.freemem() / (1024 * 1024); // Free memory in MB
  const osType = os.type();
  const osRelease = os.release();

  return {
    cpuModel,
    cpuSpeed: `${cpuSpeed.toFixed(2)} MHz`,
    totalMemory: `${totalMemory.toFixed(2)} MB`,
    freeMemory: `${freeMemory.toFixed(2)} MB`,
    osType,
    osRelease,
  };
};

// Create a server
const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url === "/cpu-info" && req.method === "GET") {
      const cpuAndOSInfo = getCPUAndOSInfo();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(cpuAndOSInfo));
      return;
    }
    
    console.log(getCPUAndOSInfo());
    
  try {
    const message = await simulateAsyncOperation();
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(message);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Something went wrong");
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`CPU and OS information will run on http://localhost:${PORT}/cpu-info`);
});
