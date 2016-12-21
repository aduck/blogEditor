var express=require('express')

module.exports=function(app){
	app.get('/',function(req,res){
		res.send('hello index')
	})
	app.use('/photo',require('./photo'))
	app.use('/journal',require('./journal'))
	app.use('/tag',require('./tag'))
}