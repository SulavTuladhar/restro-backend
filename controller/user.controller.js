const router = require('express').Router();
const userModel = require('./../models/user.model');
const MAP_USER_REQUREST = require('./../helpers/map_user_request');
const uploader = require('./../middlewares/uploader');
const fs = require('fs');
const path =require('path')

router.route('/')
    .get(function(req,res,next){
        var condition = {};
        userModel.find(condition)
            .sort({
                _id: -1
            })
            .exec(function(err,users){
                if(err){
                    return next(err);
                }
                res.json(users)
            })
    })
    .post(function(req,res,next){

    })

router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id, {username:1} ,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            res.json(user)
        })
    })
    .put(uploader.single('image'), function(req,res,next){
        if(req.fileTypeError){
            return next({
                msg: 'Invalid file Format',
                status: 414
            })
        }
        const data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }
        userModel.findById(req.params.id,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            var oldImage = user.image;
            var mappedUpdatedUser = MAP_USER_REQUREST(user,data)
           
            mappedUpdatedUser.save(function(err,updated){
                if(err){
                    return next(err);
                }
                if(req.file){
                    fs.unlink(path.join(process.cwd(),'uploads/images/' + oldImage), function(err,done){
                        if(err){
                            console.log('Errpr in removing', err)
                        }else{
                            console.log('Sucess in Removing')
                        }
                    })
                }
                res.json(updated);
            })
        })

    })
    .delete(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            user.remove(function(err,removed){
                if(err){
                    return next(err)
                }
                res.json(removed)
            })
        })
    })

module.exports = router;