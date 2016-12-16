var express=require('express')

module.exports=function(app){
	app.get('/',function(req,res){
		res.send('hello index')
	})
	app.use('/photos',require('./photos'))
	app.use('/journal',require('./journal'))
}