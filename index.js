const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
//hello
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
require('./config/view-helpers')(app);
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//different passport strategies
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

//getting the environment variable
const env=require('./config/environment');
const logger=require('morgan');

chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path=require('path');
if(env.name=='development')
{
app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
}
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

//so that browser can excess the uploads folder
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(env.asset_path));
app.use(express.static(env.front_end1_path));

//logger
app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1001 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

//setting up flash
app.use(flash());
app.use(customMware.setFlash);


app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}: ${env.name}`);
    }

    console.log(`Server is running on port: ${port}`);
});
