var express=require('express')
var app=express()
var fs=require('fs')
var path=require('path')
var bodyParser=require('body-parser')
var router=require('./router/index')
var config=require('./config')
var mongoose=require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/test')
// 变量
app.locals.blog=config.blog
// 中间件
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('statics'))
app.use('/uploads',express.static(config.upload))
// 配置
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')
// 路由
router(app)
app.listen(8080)