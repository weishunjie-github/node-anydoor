module.exports = {
  hostname:'127.0.0.1',
  port:9528,
  root:process.cwd(),//用户当前路径
  compress:/\.(html|js|css|md)/,
  cache:{
    maxAge:600,
    expires:true,
    cacheControl:true,
    lastModified:true,
    etag:true
  }
}