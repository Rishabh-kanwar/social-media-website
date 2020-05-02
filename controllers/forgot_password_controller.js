const resetMailer=require('../mailer/forgot-password_mailer');
const queue=require('../config/kue');
const resetEmailWorker = require('../workers/resetPass_email_worker');
const User=require('../models/user');
const Reset=require('../models/reset-pass');
const crypto=require('crypto');

module.exports.getEmail = function(req, res){
        return res.render('forgot-pass/forgot-getemail', {
            title: 'reseting password',
        })
}


module.exports.check = async function(req, res){

    try{

    let user = await User.findOne({email:req.body.email});
        
        if(!user)
        {
            req.flash('error','INVALID USERNAME');
            return res.redirect('/users/sign-in');

        }
        
        console.log('hello');
          let reset=await Reset.create({
                token: crypto.randomBytes(64).toString('hex'),
                user: user._id,
                isvalid: true
          })
              reset = await reset.populate('user', 'name email password').execPopulate();   
                    
                let job = queue.create('emails1',reset).save(function(err){
                    if (err){
                        console.log('Error in sending to the queue', err);
                        return;
                    }
                    console.log('job enqueued', job.id);
    
                })
                req.flash('success','sended verification mail');
                return res.redirect('/users/sign-in');
              
        
    }catch(err){
        console.log('error in sending mail',err);
        return;
}

}


module.exports.change =async function(req, res)
{
     try{
    //     console.log(req.body);
    //     console.log(req.params);
    //     let reset=await Reset.findOne({token:req.params.token});
  
    //     console.log(reset);
        
    let reset=await Reset.findOneAndUpdate({token:req.params.token},{isvalid: false});
    console.log(reset);
    if(!reset.isvalid)
    {
        req.flash('error','The tokken has been used');
        return res.redirect('/users/sign-in');
    }
    reset = await reset.populate('user', 'name email password').execPopulate();
           if(reset)
           {
               let user= await User.findOneAndUpdate({email:reset.user.email},{password:req.body.password});
               req.flash('success','password is changed');
               let reset1=await Reset.findOneAndDelete({token:req.params.token});
               return res.redirect('/users/sign-in');
           }
         
        
            req.flash('error','password and confirm password are not equal');
            return res.redirect('/users/sign-in');

       }catch(err){
        console.log('error in sending mail',err);
        return;
    }
}
