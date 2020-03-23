//setting up express
const express= require('express');

const app = express();
//defining port
const port = 12000;
//acquiring db 
const db = require('./config/mongoose');
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./front_end'));
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});
