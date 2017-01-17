'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// 设置模板引擎
app.set('view engine', 'pug')
app.set('views', './views')

// 静态资源
app.use(express.static('public'))

// 路由设置
app.get('/', (req, res) => {
  console.log(req.method + ': ' + req.url)
  res.send('<h1>Hello World</h1>')
})
app.get('/admin', (req, res) => {
  res.render('admin.pug', {
    title: '食谱管理'
  })
})

// 监听端口
var server = app.listen(port, () => {
  var port = server.address().port
  console.log(`App server is listening at http://localhost:${port}`)
})
