var express=require('express')

module.exports=function(app){
	app.get('/',function(req,res){
		res.send('hello index')
	})
	app.use('/login',require('./login')) // 登陆
	app.use('/logout',require('./logout')) // 登出
	app.use('/photo',require('./photo')) // 图片
	app.use('/journal',require('./journal')) // 日志
	app.use('/tag',require('./tag')) // 标签
}