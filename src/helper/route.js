const fs = require("fs");
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);//拿到文件目录下的所有文件
const config = require('../config/defaultConfig')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require("./cache")

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());


module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType =  mime(filePath)
      res.setHeader("Content-Type", contentType)
      if(isFresh(stats,res,req)){
        res.statusCode = 304;
        res.end();
        return;
      }
      let rs;
      const { code, start, end } = range(stats.size, req, res);
      if (code == 200) {
        res.StatusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.StatusCode = 206;
        rs = fs.createReadStream(filePath, { start, end });
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.StatusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const dir = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        dir1: path.relative(config.root, filePath),
        files,
        a1: config.root,
        a2: filePath
      }
      res.end(template(data));

    }
  } catch (ex) {
    console.error(ex)
    res.StatusCode = 404;
    res.setHeader("content-Type", "text/plain");
    res.end(`${filePath} is not a directory or file`);
  }
}
