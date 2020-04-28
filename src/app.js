const http = require("http");
const chalk = require("chalk")
const conf = require('./config/defaultConfig')
const path = require("path")
const fs = require("fs")

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.StatusCode = 404;
      res.setHeader("content-Type", "text/plain");
      res.end(`${filePath} is not a directory or file`);
      return
    } else if (stats.isFile()) {
      res.StatusCode = 200;
      res.setHeader("Content-Type", "text/plain")
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        res.StatusCode = 200;
        res.setHeader("Content-Type", "text/plain")
        fs.end(files.join(","))
      })
    }
  })
  server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);

  });
})