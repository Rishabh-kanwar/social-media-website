const Post = require('../models/post');
const User=require('../models/user')
//module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
//    Post.find({})
//    .populate('user')
//    .populate({
//        path: 'comments',
//        populate: {
//            path: 'user'
//        }
//    })
 //   .exec(function(err, posts){
//
//        user.find({},function(err,users){
//            return res.render('home', {
//                title: "Socio | Home",
//                posts:  posts,
//               all_users: users
//            
//        });
//
//        });
//    })
//
//}

// module.exports.actionName = function(req, res){}

//another way of doing home by sing asynchronus and wait

module.exports.home=async function(req,res){
try{
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
             path: 'user'
      }
    });
    let result=[];

  
    let users=await User.find({});
    return res.render('home',{
        title: 'socio|home',
        posts: posts,
        all_search: result,
        all_users: users
    });
    }
    catch(err){
        console.log('error',err);
    }
}



module.exports.search=async function(req,res){
    try{
        let result= await User.find({name:{$regex : '.*'+req.body.friend+'.*'}});
        if (req.xhr){
            console.log("searching all users")
              return res.status(200).json({
                  data: {
                      result: result
                  },
                  message: "searching of user completed"
              });
          }
          res.redirect('back');
        }
        catch(err){
            console.log('error',err);
        }
    }








