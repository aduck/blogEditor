var express=require('express')
var router=express.Router()
var marked=require('marked')
var Journal=require('../models/journal')
var moment=require('moment')
var checkLogin=require('../middle/check').checkLogin

// 添加文章页
router.get('/create',checkLogin,function(req,res,next){
	res.render('journalCreate')
})
// 添加文章
router.post('/create',checkLogin,function(req,res,next){
	var title=req.body.title
	var thumb=req.body.thumbPath
	var tags=req.body.tags.split(' ')
	var content=req.body.content
	// 验证
	try{
		if(title.trim().length<1) throw new Error('标题不能为空')
		if(content.trim().length<1) throw new Error('内容不能为空')
	}catch(e){
		return res.redirect('/journal/create')
	}
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
	var intros=[]
	var page=req.query.page || 1
	Journal.getPage(6,page,function(err,journals,total){
		if(err) return;
			journals.forEach(function(journal){
				dates.push(moment(journal.meta.updateAt).format('DD	MMM YYYY'))
				intros.push(marked(journal.content).replace(/<[^>]+>/g,'').slice(0,60))
			})
			res.locals.dates=dates
			res.locals.intros=intros
			res.render('journals',{items:journals,current:page,total:total})
	})
})
// 查看单个文章
router.get('/:id',function(req,res,next){
	var id=req.params.id
	Journal
		.findByIdAndUpdate(id,{$inc:{'meta.pv':1}})
		.exec(function(err,journal){
			if(err) return;
			res.locals.html=marked(journal.content)
			res.locals.date=moment(journal.meta.updateAt).format('YYYY/MM/DD HH:mm')
			// 获取上下篇
			Journal.getSiblings(id,function(err,items){
				res.render('journal',{
					journal:journal,
					siblings:items
				})
			})
		})
})
// 修改文章页
router.get('/:id/edit',checkLogin,function(req,res,next){
	var id=req.params.id
	Journal
		.findById(id)
		.exec(function(err,journal){
			if(err) return
			var tagstr=journal.tags.join(' ')
			res.locals.tagstr=tagstr
			res.render('journalEdit',journal)
		})
})
// 修改文章
router.post('/:id/edit',checkLogin,function(req,res,next){
	var id=req.params.id
	var title=req.body.title
	var thumb=req.body.thumbPath
	var tags=req.body.tags.split(' ')
	var content=req.body.content
	// 验证
	try{
		if(title.trim().length<1) throw new Error('标题不能为空')
		if(content.trim().length<1) throw new Error('内容不能为空')
	}catch(e){
		return res.redirect('/journal/:id/edit')
	}
	Journal
		.update({_id:id},{
			title:title,
			thumb:thumb,
			tags:tags,
			content:content
		})
		.exec(function(err){
			if(err) return;
			res.redirect('/journal')
		})
})
// 删除文章
router.get('/:id/remove',checkLogin,function(req,res,next){
	var id=req.params.id
	Journal
		.remove({_id:id})
		.exec(function(err){
			if(err) return;
			res.redirect('/journal')
		})
})

module.exports=router