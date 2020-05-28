const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
likeAble: {
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    refPath: 'onModel'
},
onModel:{
    type:String,
    require: true,
    enum:['post','comment']
}
},{
    timestamps:true
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;