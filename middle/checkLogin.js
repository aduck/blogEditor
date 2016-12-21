module.exports={
	checkLogin:function(req,res,next){
		if(!req.session.user){
			return res.redirect('/')
		}
		next()
	},
	checkNotLogin:function(req,res,next){
		if(req.session.user){
			return res.redirect('/')
		}
		next()
	}

}