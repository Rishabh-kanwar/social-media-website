const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
         
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


module.exports.profile =async function(req, res){
    let user=await User.findById(req.params.id).populate(
        'friendReq');
        for(u of user.friendReq)
        {
            console.log(u.name);
        }
      console.log(user,"user");
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user,
            list: user.friendReq
        })
    
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "socio | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "socio | Sign In"
    })
}

// get the sign up data
module.exports.create =async function(req, res){
    try{
    if (req.body.password != req.body.confirm_password){
        console.log('Hello');
        req.flash('error','password and confirm Password are not equal');
        return res.redirect('/users/sign-up');
    }

    let user=await User.findOne({email: req.body.email});
        if (!user){
           await User.create({
               email:req.body.email,
               password: req.body.password,
               pong: 0,
               snake: 0,
               name: req.body.name
           })
                
                req.flash('success','Your Account has been created');
                return res.redirect('/users/sign-in');
        }else{
            req.flash('error','email already exist');
            return res.redirect('back');
        }

    }catch(err){
        console.log('error',err);

    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged in successfuly');
    return res.redirect('/');

}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','logged out successfuly');
    return res.redirect('/users/sign-in');
}

module.exports.forgot = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
}



