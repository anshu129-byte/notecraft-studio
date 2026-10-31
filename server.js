const http = require("http");
const fs = require("fs");
const path = require("path");


const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  const filePath = path.join(ROOT, reqPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache"
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  const url = `http://localhost:${PORT}`;
  console.log(`=======================================================`);
  console.log(`✨ NoteCraft Studio is running!`);
  console.log(`🌐 Local URL: ${url}`);
  console.log(`📂 Serving directory: ${ROOT}`);
  console.log(`Press Ctrl+C to stop the server.`);
  console.log(`=======================================================`);
