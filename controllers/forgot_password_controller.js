
const User=require('../models/user');

module.exports.getEmail = function(req, res){
        return res.render('forgot-pass/forgot-getemail', {
            title: 'reseting password',
        })

}
module.exports.check = function(req, res){
    User.findOne({email:req.body.email}, function(err,user){
        
        return res.render('forgot-pass/checking-email', {
            title: 'reseting password',
            profile_user: user
        
    })
        
       
})
}