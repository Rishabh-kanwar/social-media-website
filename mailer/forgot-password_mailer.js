const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newReset = (reset) => {
    console.log('inside forgot password mailer', reset);

    let htmlString = nodeMailer.renderTemplate({reset: reset}, '/comments/new_resetPass.ejs');

    nodeMailer.transporter.sendMail({
       from: 'rkanwar4166@gmail.com',
       to: reset.user.email,
       subject: "verification mail sent by socio",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}