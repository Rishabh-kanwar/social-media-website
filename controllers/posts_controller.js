const Post = require('../models/post')
const Comment=require('../models/comment');
const Like = require('../models/like');
const fs = require('fs');
const path = require('path');

module.exports.create =async function(req, res){
  try{
    
   await Post.uploadedPic(req, res, async function(err){
     try{
      if (req.file){
                let post= await Post.create({
                content: req.body.content,
                user: req.user._id,
                pic: Post.picPath + '/' + req.file.filename
              })
              //checking for the ajax request
            console.log("if",post);
            post = await post.populate('user', 'name email').execPopulate();
            if (req.xhr){
              return res.status(200).json({
                  data: {
                      post: post
                  },
                  message: "Post created!"
              });
            }
  }
    else{
            let post= await Post.create({
            content: req.body.content,
            user: req.user._id,
          });
        //  checking for the ajax request
        console.log("else",post);
        post = await post.populate('user', 'name email').execPopulate();
        if (req.xhr){
          return res.status(200).json({
              data: {
                  post: post
              },
              message: "Post created!"
          });
        }
  }
  console.log(post);
}
catch(err){
  req.flash('error',err);
     return;
}

     req.flash('success','post is published');
    return res.redirect('back');
  });
  }
  catch(err){
     req.flash('error',err);
     return;
  }

}


module.exports.destroy = async function(req, res){

  try{
      let post = await Post.findById(req.params.id);
      if (post.user == req.user.id){
        if (post.pic){
          fs.unlinkSync(path.join(__dirname, '..',post.pic));
      }
          post.remove();
          
          //delete the associated likes for the post and all its comments' likes too
          await Like.deleteMany({likeable: post, onModel: 'Post'});
          await Like.deleteMany({_id: {$in: post.comments}});


          await Comment.deleteMany({post: req.params.id});
          console.log('hello',req.params.id);
          

          if (req.xhr){
            console.log("deleting post via AJAX")
              return res.status(200).json({
                  data: {
                      post_id: req.params.id
                  },
                  message: "Post deleted"
              });
          }

          req.flash('success', 'Post and associated comments deleted!');

          return res.redirect('back');
      }else{
          req.flash('error', 'You cannot delete this post!');
          return res.redirect('back');
      }

  }catch(err){
      req.flash('error', err);
      return res.redirect('back');
  }
  
}




