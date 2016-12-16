var express=require('express')
var router=express.Router()
var marked=require('marked')

// 添加文章页
router.get('/create',function(req,res,next){
	res.render('upload')
})
// 添加文章
router.post('/',function(req,res,next){
	var content=req.body.content
	res.send(marked(content))
})
// 查看文章
router.get('/',function(req,res,next){
	res.send('111')
})
// 查看单个文章
router.get('/:id',function(req,res,next){
	res.send(req.params.id)
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