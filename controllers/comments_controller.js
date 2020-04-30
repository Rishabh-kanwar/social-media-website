const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailer/comments_mailer')

module.exports.create = async function(req, res){

    try{
   let post= await Post.findById(req.body.post)

        if (post){
          let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                // handle error
                comment = await comment.populate('user', 'name email').execPopulate();
                commentsMailer.newComment(comment);
                post.comments.push(comment);
                post.save();
                req.flash('success','comment is added');
                res.redirect('/');
        }
    }
    catch(err){
        req.flash('error',err);
        return;
    }
}
module.exports.destroy=async function(req,res){

    try
 {
 let comment=await Comment.findById(req.params.id);
  {
     if(comment.user==req.user.id){
        
        let postId=comment.post;
        comment.remove();

        let post=await Post.findByIdAndUpdate(postId,{ $pull: {comments:req.params.id} } )
     req.flash('success','comment is deleted');
            return res.redirect('back');

     }
     else{
     req.flash('error','You can not delete this comment');
        return res.redirect('back');
     }
   }
 }

catch(err){
    console.log('error',err);
    return;
}

}





