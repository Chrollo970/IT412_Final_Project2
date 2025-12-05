const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);

  let contentType = "text/html";
  if (ext === ".css") contentType = "text/css";
  if (ext === ".js") contentType = "text/javascript";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});