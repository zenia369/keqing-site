const cache = require('node-cache')

const myCache = new cache()

module.exports = (req, res, next) => {
  const key = req.originalUrl || req.url
  const cachedData = myCache.get(key)
  if (cachedData) {
    return res.send(cachedData)
  } else {
    res.sendResponse = res.send
    res.send = (body) => {
      myCache.set(key, body)
      res.sendResponse(body)
    }
    next()
  }
}
