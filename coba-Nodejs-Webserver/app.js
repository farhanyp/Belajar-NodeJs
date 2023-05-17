const http = require("http");
const fs = require("node:fs");
const port = 3000;

const displayWeb = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.write("404");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    const url = req.url;
    console.log(url);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    if (url === "/about") {
      displayWeb("./about.html", res);
    } else if (url === "/contact") {
      displayWeb("./contact.html", res);
    } else {
      displayWeb("./index.html", res);
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
