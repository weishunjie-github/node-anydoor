// const http = require("http");
// const chalk = require("chalk")
// const conf = require('./config/defaultConfig')
// const path = require("path")
// const route = require('./helper/route')
// class Server {
//   constructor(config) {
//     this.conf = Object.aasin({}, conf, config)
//   }
//   start() {
//     const server = http.createServer((req, res) => {
//       console.info(req.url)
//       const filePath = path.join(conf.root, req.url)
//       route(req, res, filePath);
//     })
//     server.listen(conf.port, conf.hostname, () => {

//       const addr = `http://${conf.hostname}:${conf.port}`;
//       console.info(`Server started at ${chalk.green(addr)}`);
//     });
//   }
// }
