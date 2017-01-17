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
// 食谱管理主页
app.get('/admin/recipes', (req, res) => {
  res.render('recipes.pug', {
    title: '食谱管理',
    recipes:[{
      _id: '90IJ2LASD0F2M',
      name: '金汤鱼圆&藕夹',
      content: '一碗清汤鱼圆配着雪菜春笋，三弦两拨清净，烟花三月旖旎，倒也是说的差不多了。',
      meta: {
        createdAt: 1484639665291,
        updateAt: 1484639715723,
      }
    },{
      _id: 'ASDFLASD03SF',
      name: '不刻意的大盘鸡',
      content: '你没的狡辩的，下车之后，你望向我靠坐的那格车窗，也没急着走。',
      meta: {
        createdAt: 1484639665291,
        updateAt: 1484639715723,
      }
    },{
      _id: '90IJ2LASD0F2M',
      name: '金汤鱼圆&藕夹',
      content: '一碗清汤鱼圆配着雪菜春笋，三弦两拨清净，烟花三月旖旎，倒也是说的差不多了。',
      meta: {
        createdAt: 1484639665291,
        updateAt: 1484639715723,
      }
    }]
  })
})
// 创建新食谱
app.get('/admin/recipes/create', (req, res) => {
  res.render('recipe-editor', {
    title: '食谱编辑',
    recipe: {
      name: '',
      content: '',
    }
  })
})
// 食谱详情编辑
app.get('/admin/recipes/:id', (req, res) => {
  res.render('recipe-editor', {
    title: '食谱编辑',
    recipe: {
      _id: 'ASDFLASD03SF',
      name: '不刻意的大盘鸡',
      content: '你没的狡辩的，下车之后，你望向我靠坐的那格车窗，也没急着走。',
      meta: {
        createdAt: 1484639665291,
        updateAt: 1484639715723,
      }
    }
  })
})

// 监听端口
var server = app.listen(port, () => {
  var port = server.address().port
  console.log(`App server is listening at http://localhost:${port}`)
})
