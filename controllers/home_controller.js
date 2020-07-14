const Post = require('../models/post');
const User=require('../models/user');
const Friendship=require('../models/friendship');

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
    if(!req.user)
    {
        return res.redirect('/users/sign-in');
    }
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
    
    if(req.user)
    {
    let users=await User.findById(req.user._id).populate('friendships');
     
    let users123=await User.findByIdAndUpdate(req.user._id,{ online: true});
    return res.render('home',{
        title: 'socio|home',
        posts: posts,
        all_search: result,
        all_users: users.friendships
    });
    }
    let y=[];
    return res.render('home',{
        title: 'socio|home',
        posts: posts,
        all_search: result,
        all_users: y 
    });
    }
    catch(err){
        console.log('error',err);
    }
}


// module.exports.home1=async function(req,res){
//     try{

//         if(!req.user)
//         {
//             return res.redirect('/users/sign-in');
//         }
 
//         let users123=await User.findById(req.user._id).populate('friendships');
//         let Fposts=[];
//         let posts1234=await Post.find({user: u.id});
//         for(p of posts1234)
//         {
//             Fposts.push(p);
//         }

//             for(u of users123.friendships)
//             {
//                 let posts123=await Post.find({user: u.id});
//                 for(p of posts123)
//                 {
//                 Fposts.push(p);
//                 }
//             }
            


//         let posts=await Post.find({})
//         .sort('-createdAt')
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                  path: 'user'
//           }
//         });
        
//         let result=[];
        
//         if(req.user)
//         {
//         let users=await User.findById(req.user._id).populate('friendships');
//         return res.render('home',{
//             title: 'socio|home',
//             posts: posts,
//             all_search: result,
//             all_users: users.friendships
//         });
//         }
//         let y=[];
//         return res.render('home',{
//             title: 'socio|home',
//             posts: posts,
//             all_search: result,
//             all_users: y 
//         });
//         }
//         catch(err){
//             console.log('error',err);
//         }
//     }
    



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


// creating the controller for the chat engine

module.exports.chat=async function(req,res){
    try{

        let users=await User.findById(req.user._id);

        let friend= await Friendship.findOne({
            from_user :req.user._id,
            to_user : req.params.id
        }).populate('to_user').populate('from_user');
      
        if(friend==null)
        {
        friend= await Friendship.findOne({
            from_user :req.params.id,
            to_user: req.user._id
        }).populate('to_user').populate('from_user');
        }
        console.log('friend chat',friend);
        console.log('friend user chat',friend.from_user);
          
        let friendName='';
         if(friend.to_user._id!=req.user._id)
         {
            friendName=friend.to_user.name;
         }
         else
         {
            friendName=friend.from_user.name;
         }

        

        if (req.xhr){
            console.log("searching all users")
              return res.status(200).json({
                  data: {
                      friend:friend,
                      myid: users.email,
                      friendName :friendName
                  },
                  message: "setting up private chat"
              });
          }
          
        }
        catch(err){
            console.log('error',err);
        }
    }





