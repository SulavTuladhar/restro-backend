const jwt = require('jsonwebtoken');
const config = require('./../configs');
const userModel = require('./../models/user.model');

module.exports = function(req,res,next){
    let token;
    if(req.headers['authorization'])
        token = req.headers['authorization']
    if(req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if(req.query['token'])
        token = req.query['token']
    if(!token){
        return next({
            msg: 'Authentication Failed, Token not provided',
            status: 401
        })
    }

    // Token exists now validate 
    jwt.verify(token, config.JWT_SECRECT, function(err,decoded){
        if(err){
            return next(err)
        }
        console.log('Token verification sucessfull >>', decoded);
        userModel.findById(decoded._id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User Removed from system',
                    status: 400
                })
            }
            req.user = user;
            next(); 
        })
    })
}