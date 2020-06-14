const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development={
    name: 'development',
    asset_path : './assets',
    front_end1_path : './front_end1',
    session_cookie_key: 'something',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',  
        port: 587,
        secure: false,
        auth: {
            user: 'rkanwar4166@gmail.com',
            pass: 'mymother5678'
        },
    },
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    },
    google_client_ID: "858103645832-6mh0h2uu2cogbb4a422fn1onfkfh68tp.apps.googleusercontent.com",
    google_client_Secret: "22JQ_7xuTZ2GNzSqHPgNeL4A",
    google_call_back_URL: "http://127.0.0.1:8000/users/auth/google/callback",

    jwt_secret: 'socio',
}
const production={
    // name: process.env.SOCIO_ENVIRONMENT,
    name:'production',
    asset_path : process.env.SOCIO_ASSET_PATH,
    front_end1_path : process.env.SOCIO_FRONT_END1_PATH,
    session_cookie_key: process.env.SOCIO_SESSION_COOKIE_KEY,
    db: process.env.SOCIO_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIO_GMAIL_USERNAME,
            pass: process.env.SOCIO_GMAIL_PASSWORD
        }
    },
    google_client_ID: process.env.SOCIO_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.SOCIO_GOOGLE_CLIENT_SECRET,
    google_call_back_URL: process.env.SOCIO_GOOGLE_CALLBACK_URL,

    jwt_secret: process.env.SOCIO_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


// module.exports=eval(process.env.NODE_ENV)==undefined ? development : eval(process.env.NODE_ENV) ;
  module.exports = development;

