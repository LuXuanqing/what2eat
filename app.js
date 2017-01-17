'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const _ = require('underscore')

// 设置模板引擎
app.set('view engine', 'pug')
app.set('views', 'views')
// 静态资源
app.use(express.static('public'))
// 其它中间件
app.use(bodyParser.urlencoded({ extended: true }))

// 数据库
const mongoose = require('mongoose')
var Recipe = require('./models/recipeModel.js')
mongoose.connect('mongodb://localhost:27017/what2eat')

// 监听端口
var server = app.listen(port, () => {
  var port = server.address().port
  console.log(`App server is listening at http://localhost:${port}`)
})

// 路由设置
app.get('/', (req, res) => {
  console.log(req.method + ': ' + req.url)
  res.send('<h1>Hello World</h1>')
})
// 食谱管理主页
app.get('/admin/recipes', (req, res) => {
  Recipe.fetch((err, recipes) => {
    if (err) {
      console.error(err)
    }
    res.render('recipes.pug', {
      title: '食谱管理',
      recipes: recipes
    })
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
  var id = req.params.id
  if (id) {
    Recipe.fetchById(id, (err, recipe) => {
      res.render('recipe-editor', {
        title: '食谱编辑',
        recipe: recipe
      })
    })
  }
})
// post 食谱
app.post('/admin/recipes/newrecipe', (req, res) => {
  var postedRecipe = req.body.recipe
  var newRecipe

  if (postedRecipe._id) {
    Recipe.fetchById(postedRecipe._id, function(err, recipe) {
      if (err) {
        console.error(err)
      }
      newRecipe = _.extend(recipe, postedRecipe)
      newRecipe.save(function(err, recipe) {
        if (err) {
          console.error(err)
        }
        res.redirect('/admin/recipes')
      })
    })
  } else {
    newRecipe = new Recipe({
      name: postedRecipe.name,
      content: postedRecipe.content
    })
    newRecipe.save(function(err, recipe) {
      if (err) {
        console.error(err)
      }
      res.redirect('/admin/recipes')
    })
  }

  // newRecipe.save(function(err, recipe) {
  //   if (err) {
  //     console.error(err)
  //   }
  //   res.redirect('/admin/recipes')
  // })
})
