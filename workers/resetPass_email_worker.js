const queue=require('../config/kue');
const resetMailer=require('../mailer/forgot-password_mailer');

queue.process('emails1',function(job,done){

    console.log('email worker is processing the job',job.data);
    resetMailer.newReset(job.data);
    done();
});