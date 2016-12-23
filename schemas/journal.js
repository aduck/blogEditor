var mongoose=require('mongoose')
var journalSchema=new mongoose.Schema({
	title:String,
	thumb:String,
	tags:{
		type:Array,
		default:[]
	},
	content:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		},
		pv:{
			type:Number,
			default:0
		}
	}
})
journalSchema.pre('save',function(next){
	this.meta.createAt=this.meta.updateAt=Date.now()
	next()
})
journalSchema.pre('update',function(next){
	this.update({$set:{'meta.updateAt':Date.now()}})
	next()
})

module.exports=journalSchema