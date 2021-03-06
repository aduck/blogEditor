var express=require('express')
var app=express()
var path=require('path')
var bodyParser=require('body-parser')
var router=require('./router/index')
var config=require('./config')
var mongoose=require('mongoose')
var session=require('express-session')
var MongoStore=require('connect-mongo')(session)

// 连接数据库
mongoose.connect(config.mongodb)
// 常量
app.locals.blog=config.blog
app.locals.root=config.root
app.locals.pretty=' '
// 中间件
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('statics'))
app.use('/uploads',express.static(config.upload))
app.use(session({
	name:config.session.key,
	secret:config.session.secret,
	cookie:{
		maxAge:config.session.maxAge
	},
	store:new MongoStore({
		url:config.mongodb
	})
}))
// 变量
app.use(function(req,res,next){
	res.locals.user=req.session.user
	next()
})
// 配置
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')
// 路由
router(app)
app.listen(process.env.PORT || config.port)