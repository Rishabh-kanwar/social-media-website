const User=require('../models/user');
const Friendship=require('../models/friendship');

module.exports.sendreq = async function(req, res){
    try{
        let sended=false;
        let user=await User.findById(req.params.id);
        
        for(u of user.friendships)
        {
               if(u==req.user.id)
               {
                   console.log(' in friendships');
                   req.flash('success','you are already friends');
                   return res.redirect('back');
               }
        }
        for(u of user.friendReq)
        {
            console.log(u,'in loop');
            console.log(req.user._id,'in loop req.user._id');
               if(u==req.user.id)
               {
                   console.log('break');
                   sended=true;
                   break;
               }
        }
         console.log(sended,'hello');
        if(!sended)
        {
            user.friendReq.push(req.user._id);
            user.save();
            console.log(user.friendReq,'req');
            req.flash('success','friend req sent');
            return res.redirect('back');
        }

        else{
            await User.findByIdAndUpdate(req.params.id,{$pull : { friendReq: req.user._id}});
            req.flash('error','friend request sended is deleted');
            return res.redirect('back');
        }
    //   if(req.xhr)
    //   {
    //     return res.json(200, {
    //         message: "Request successful!",
    //         data: {
    //             sended: sended
    //         }
    //     })
    //   }
    
        
    }catch(err)
    {
        console.log("error in send req controller",err);
    }
}

module.exports.accept= async function(req, res){
    try{
        await User.findByIdAndUpdate(req.user._id,{$pull : { friendReq: req.params.id}});
       let user=await User.findById(req.user._id);
       let user1=await User.findById(req.params.id);
        let friend= await Friendship.create({
            to_user: req.user._id,
            from_user: req.params._id
          });
          user.friendships.push(req.params.id);
          user.save();
          user1.friendships.push(req.user.id);
          user1.save();
          req.flash('success','friendship accepted');
          return res.redirect('back');
    }catch(err)
    {
        console.log("error in accept request",err);
    }
}
module.exports.reject = async function(req, res){
    try{
        await User.findByIdAndUpdate(req.user._id,{$pull : { friendReq: req.params.id}});
        req.flash('error','Request Deleted');
        return res.redirect('back');
    }catch(err)
    {
     console.log("error in send reject request",err);
    }
}

module.exports.destroy = async function(req, res){

    try{
        await User.findByIdAndUpdate(req.user._id,{$pull : { friendships: req.params.id}});
        await User.findByIdAndUpdate(req.params.id,{$pull : { friendships: req.user._id}});
       let friend= await Friendship.findOne({
            from_user :req.user._id,
            to_user : req.params.id
        });
      
        if(friend==null)
        {
        friend= await Friendship.findOne({
            from_user :req.params.id,
            to_user: req.user._id
        });
        }
    // console.log(friend,'delete me bro');
    // await Friendship.findByIdAndDelete(friend._id);
    //     let user = await User.findById(req.params.id);
    //     req.flash('error','Unfriended ',user.name);
    //     return res.redirect('back');
    }catch(err)
    {
     console.log("error in send deleting the friend",err);
    }

}


