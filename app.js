'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center">Hello World</h1>')
})

var server = app.listen(port, () => {
  var host = server.address().address
  var port = server.address().port
  console.log(`App listening at http://${host}:${port}`)
})
