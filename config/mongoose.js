const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/contacts_list_db');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to database'));
db.once('open',function() {
console.log('data base is running');
});