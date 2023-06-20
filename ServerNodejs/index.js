// const kill = require("kill-port");
const http = require("http");

const PORT = 3003;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(`{"message": hello"}`);
});

server.listen(PORT, () => {
  console.log(`Server is running om port ${PORT}`);
});

// netstat -ano|findstr "PID :NUMBER_PORT"
// taskkill /PID <PID> /f

// setTimeout(() => {

// Currently you can kill ports running on TCP or UDP protocols
//     kill(port, 'tcp')
//       .then(console.log)
//       .catch(console.log)
//   }, 1000)
