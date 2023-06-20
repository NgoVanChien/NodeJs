const http = require("http");

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.end("hello ");
});

server.listen(PORT, () => {
  console.log(`Server is running om port ${PORT}`);
});
