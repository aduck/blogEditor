var express=require('express')
var app=express()
var fs=require('fs')
var bodyParser=require('body-parser')
var router=require('./router/index')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('statics'))
app.use('/uploads',express.static('uploads'))

app.set('views',__dirname+'/views')
app.set('view engine','pug')

router(app)
app.listen(8080)