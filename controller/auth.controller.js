const router = require('express').Router();
const UserModel = require('./../models/user.model'); 
const MAP_USER_REQUREST = require('./../helpers/map_user_request')
const uploader = require('./../middlewares/uploader');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('./../configs/index')
/**
 * Create token with given data
 * @param {object} data
 *  @returns {string} 
 */
function createToken(data){
    let token = jwt.sign({
        _id: data.id
    },config.JWT_SECRECT)
    return token;
}

router.route('/login')
    .post(function(req,res,next){
        UserModel.findOne({
            username: req.body.username
        })
            .then(function(user){ // Find returns array, findOne returns obj
                if(!user){
                    return next({
                        msg: 'Invalid Username',
                        status: 400
                    })
                }
                // Password verification
                var isMatched = passwordHash.verify(req.body.password, user.password)
                if(isMatched){
                    // Token generation
                    var token = createToken(user);
                    res.json({
                        user: user,
                        token: token
                    })
                }else{
                    next({
                        msg: 'Invalid Password',
                        status: 400
                    })
                }
            })
            .catch(function(err){
                next(err)
            })
    })

router.route('/register')
    .post(uploader.single('image'),function(req,res,next){
        // console.log('Req body >>', req.body);
        // console.log('Req file >>', req.file);
        if(req.fileTypeError){
            return next({
                msg: 'Invalid file format',
                status: 414
            })
        }
        if(req.file){
            req.body.image = req.file.filename;
        }

        // CREATE
        var newUser = new UserModel({});
        var mappedUser = MAP_USER_REQUREST(newUser,req.body);
        mappedUser.password = passwordHash.generate(req.body.password);
        // console.log('new user is >>', newUser);
        mappedUser.save(function(err,done){
            if(err){
                return next(err);
            }
            res.json(done); 
        })
   })
        


module.exports = router;