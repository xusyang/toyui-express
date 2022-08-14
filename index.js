const express = require('express')
const app = new express()

app.use(function (req, res, next) {
  console.log('middleware before')
  next()
})

// 静态资源目录
app.use('/statics', express.static('./statics'))

// 路由中间件
app.get('/', async (req, res, next) => {
  console.log('hello1')
  await next()
  res.send('Hello World!')
  console.log('hello2')
})

app.use(function (req, res, next) {
  console.log('middleware after')
  next()
})

app.get('/error', (req, res, next) => {
  throw new Error('error message')
})

// 异常中间件
// 注意事项：
// 1. 异常中间件全局只有一个
// 2. 异常中间件必须放在所有中间件之后
// 3. 异常中间件可以传递给普通中间件
// 4. 异常中间件只能捕获同步代码中的异常

app.use(function (err, req, res, next) {
  console.log('err')
  res.send('500 server error')
  next()
})

// 全局异常捕获
process.on('uncaughtException', function (err) {})

// 全局Promise异常捕获
process.on('unhandledRejection', function (err) {
  console.log(err)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
