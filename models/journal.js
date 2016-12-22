var mongoose=require('mongoose')
var journalSchema=require('../schemas/journal')

var Journal=mongoose.model('Journal',journalSchema,'journal')

Journal.getPage=function(length,n,cb){
	// @length每页显示个数 @n第几页 @total总页数
	Journal
		.count({})
		.exec(function(err,total){
			Journal
				.find({})
				.sort({'meta.updateAt':-1})
				.limit(length)
				.skip((n-1)*length)
				.exec(function(err,items){
					cb(err,items,Math.ceil(total/length))
				})
		})
}

module.exports=Journal