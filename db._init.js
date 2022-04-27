// Database connection setup
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');

// Mongoose URL = mongodb://localhost:27017/db_name
mongoose.connect(dbConfig.conxnURL , {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err,done){
    if(err){
        console.log('Database Connection Failed');
    }else{
        console.log('Database connection open')
    }
});