const Post = require('../models/post')
const Comment=require('../models/comment');

module.exports.create =async function(req, res){
  try{
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });

   // if (req.xhr){
     //   return res.status(200).json({
       //     data: {
         //       post: post
        //    },
          //  message: "Post created!"
       // });
   // }

     req.flash('success','post is published');
    return res.redirect('back');
  }
  catch(err){
     req.flash('error',err);
     return;
  }

}

module.exports.destroy = async function(req,res){
try{
    let post= await Post.findById(req.params.id);
        if(post.user==req.user.id)
        {
            post.remove();

            await Comment.deleteMany({ post: req.params.id})
            req.flash('success','post is deleted with assosiated comments');
            
                return res.redirect('back');
        }
        else{
     req.flash('error','You can not delete this post');
            return res.redirect('back');
        }

    }
    catch(err){
        console.log('error',err);
        return;
    }
}




