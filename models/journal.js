var mongoose=require('mongoose')
var journalSchema=require('../schemas/journal')

var Journal=mongoose.model('Journal',journalSchema,'journal')
module.exports=Journal