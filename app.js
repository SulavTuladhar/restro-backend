const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('./db._init');

// Import api router
const API_ROUTER = require('./api.route');

// Third party middleware
const morgan = require('morgan');

// Load third party middleware
app.use(cors()); //Enable all request
app.use(morgan('dev'));

// Loading inbuilt middlware
app.use(express.static('uploads')); //Serve static files
app.use(express.urlencoded({ // Parser for x-ww-form-urlencoded
    extended: true
}));
app.use(express.json()); //JSON parser
app.use('/files', express.static('uploads'));

app.use('/api', API_ROUTER);

//404 error handler
app.use(function(req,res,next){
    next({
        msg: "Page Not Found",
        status: 404
    })
})

// Error handeling middleware
app.use(function(err,req,res,next){
    res.status(err.status || 400);
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    })
})

// Server listener 
app.listen(PORT, function(err,done){
    if(err){
        console.log('Error while listening to server', err);
    }
    console.log('Server listening to PORT', PORT);
});