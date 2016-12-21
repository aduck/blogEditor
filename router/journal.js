var express=require('express')
var router=express.Router()
var marked=require('marked')
var Journal=require('../models/journal')
var moment=require('moment')

// 添加文章页
router.get('/create',function(req,res,next){
	res.render('journalCreate')
})
// 添加文章
router.post('/create',function(req,res,next){
	var title=req.body.title
	var thumb=req.body.thumbPath
	var tags=req.body.tags.split(' ')
	var content=marked(req.body.content)
	var journal=new Journal({
		title:title,
		thumb:thumb,
		tags:tags,
		content:content
	})
	journal.save(function(err){
		if(err) return;
		res.redirect('/journal')
	})
})
// 查看文章
router.get('/',function(req,res,next){
	var dates=[]
	Journal
		.find({})
		.sort({'meta.updateAt':-1})
		.exec(function(err,journals){
			if(err) return;
			journals.forEach(function(journal){
				dates.push(moment(journal.meta.updateAt).format('DD	MMM YYYY'))
			})
			res.locals.dates=dates
			res.render('journals',{items:journals})
		})
})
// 查看单个文章
router.get('/:id',function(req,res,next){
	var id=req.params.id
	Journal
		.findByIdAndUpdate(id,{$inc:{'meta.pv':1}})
		.exec(function(err,journal){
			if(err) return;
			res.locals.date=moment(journal.meta.updateAt).format('YYYY-MM-DD HH:mm')
			res.render('journal',journal)
		})
})
// 修改文章页
router.get('/:id/edit',function(req,res,next){
	res.send('edit')
})
// 修改文章
router.post('/:id/edit',function(req,res,next){
	res.send('111')
})
// 删除文章
router.get('/:id/remove',function(req,res,next){
	res.send('111')
})

module.exports=router