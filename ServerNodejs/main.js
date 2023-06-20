const http = require("http");

const PORT = 3003;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(`{"message": hello"}`);
});

server.listen(PORT, () => {
  console.log(`Server is running om port ${PORT}`);
});
