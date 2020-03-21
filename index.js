
const express= require('express');
const app = express();
const port = 12000;

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');
const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use(express.static('./front_end'));


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});
