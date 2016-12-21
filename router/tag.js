var express=require('express')
var router=express.Router()
var Journal=require('../models/journal')
var moment=require('moment')

// 标签列表
router.get('/',function(req,res,next){
	Journal
		.distinct('tags')
		.exec(function(err,tags){
			if(err) return;
			res.render('tags',{tags:tags})
		})
})
// 标签页
router.get('/:tagName',function(req,res,next){
	var tagName=req.params.tagName
	var dates=[]
	Journal
		.find({"tags":tagName})
		.sort({'meta.updateAt':-1})
		.exec(function(err,journals){
			if(err) return;
			journals.forEach(function(journal){
				dates.push(moment(journal.meta.updateAt).format('DD	MMM YYYY'))
			})
			res.locals.dates=dates
			res.render('tag',{items:journals})
		})
})

module.exports=router