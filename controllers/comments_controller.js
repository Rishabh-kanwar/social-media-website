const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailer/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function(req, res){

    try{
   let post= await Post.findById(req.body.post);

        if (post){
          let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
                // handle error
                comment = await comment.populate('user', 'name email').execPopulate();
                //commentsMailer.newComment(comment);
                let job = queue.create('emails', comment).save(function(err){
                    if (err){
                        console.log('Error in sending to the queue', err);
                        return;
                    }
                    console.log('job enqueued', job.id);
    
                })
                if (req.xhr){
                
    
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
    
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
 let comment=await Comment.findById(req.params.id).populate('user');
  {
     if(comment.user.id==req.user._id){
        let postId=comment.post;
        comment.remove();
        let post=await Post.findByIdAndUpdate(postId,{ $pull: {comments:req.params.id} } );
        //destroy the associated likes for this comment
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
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





