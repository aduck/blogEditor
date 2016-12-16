var express=require('express')
var multer=require('multer')
var router=express.Router()
// 存储设置
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads')
  },
  filename:function(req,file,cb) {
    cb(null,file.fieldname+'-'+Date.now()+'.jpg')
  }
})
// 文件格式判断
var imgReg=/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
var upload=multer({
	storage:storage,
	fileFilter:function(req,file,cb){
		if(!imgReg.test(file.originalname)){
			cb(null,false)
		}else{
			cb(null,true)
		}
	}
})
// 图片上传
router.post('/upload',upload.array('photo',12),function(req,res,next){
	res.json(req.files)
})

module.exports=router