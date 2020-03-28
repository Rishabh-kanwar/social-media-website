//setting up express
const express= require('express');
// layouts adding layouts
const expressLayouts=require('express-ejs-layouts');
const app = express();
//defining port
const port = 13000;
//we have to write it before routers
app.use(expressLayouts);
//extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//acquiring db 
const db = require('./config/mongoose');
//to pass the form data
app.use(express.urlencoded());
//seeting up view engine
app.set('view engine','ejs');
//setting up "views" folder for ejs files
app.set('views','./views');
//to access the static files such as css,js,images
app.use(express.static('./front_end'));
//
app.locals.mom
//setting up "routes" folder
app.use('/',require('./routes'));
 
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});
