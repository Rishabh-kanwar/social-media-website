const User = require('../models/user');


module.exports.update = async function(req, res){
    try{
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.params.id, req.body)
            return res.redirect('back');

    }else{
        return res.status(401).send('Unauthorized');
    }
  }

 catch(err){
     console.log('error',err);
    return;
    }
}

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
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
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
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
