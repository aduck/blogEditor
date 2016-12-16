var express=require('express')
var router=express.Router()
var multer=require('multer')
var uploader=multer({'dest':'uploads/'})
var fs=require('fs')

router.post('/upload',uploader.array('photo',12),function(req,res,next){
	var source,dest,photos=[],files=[]
	var imgReg=/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
	// 没有获取到文件时
	if(!Array.isArray(req.files)) return;
	req.files.forEach(function(file){
		// 筛选只剩下图片，其它格式忽略
		if(imgReg.test(file.originalname)){
			files.push(file)
		}
	})
	files.forEach(function(file){
		var finalPath=file.destination+file.originalname
		source=fs.createReadStream(file.path)
		dest=fs.createWriteStream(finalPath)
		source.pipe(dest)
		photos.push(finalPath)
	})
	source.on('end',function(){
		res.send(photos)
	})
})

module.exports=router