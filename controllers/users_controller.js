const Users=require('../models/users');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//creating form for sign-up
module.exports.create1 = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Users.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            Users.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

//creating session for sign in
module.exports.enter=function(req,res){

}