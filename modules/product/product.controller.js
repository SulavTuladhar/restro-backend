const productModel = require('./product.model');
const fs = require('fs');
const path = require('path');

function map_product_request(product,productData){
    if(productData.name)
        product.name = productData.name;
    if(productData.description)
        product.description = productData.description;
    if(productData.price)
        product.price = productData.price;
    if(productData.photo)
        product.photo = productData.photo;
    if(productData.category)
        product.category = productData.category;
}

const insert = (req,res,next)=>{

    if(req.fileTypeError){
        return next({
            msg: 'Invalid file format',
            status: 414
        })
    }
    const data = req.body;
    // Prepare data
    if(req.file){
        data.photo = req.file.filename;
    }
    const newProduct = new productModel({});
    map_product_request(newProduct,data);
    newProduct.save()
        .then(function(saved){
            res.json(saved)
        })
        .catch(function(err){
            if(err){
                next(err);
            }
        })
}

const find =(req,res,next)=>{
    var condition= {}
    productModel.find(condition)
        .sort({
            _id: -1
        })
        .exec(function(err,products){
            if(err){
                return next(err);
            }
            res.json(products)
        })
}

const findHome =(req,res,next)=>{
    var condition= {}
    productModel.find(condition)
        .sort({
            _id: -1
        })
        .limit(5)
        .exec(function(err,products){
            if(err){
                return next(err);
            }
            res.json(products)
        })
}

const findById = (req,res,next)=>{
    const id = req.params.id;
    productModel.findById(id)
        .exec(function(err,product){
            if(err){
                return next(err)
            }
            if(!product){
                return next({
                    msg: 'Product Not Found',
                    status: 404
                })
            }
            res.json(product)
        })
}

const update = (req,res,next) =>{
    productModel.findById(req.params.id, function(err,product){
        if(err){
            return next(err)
        }
        if(!product){
            return next({
                msg: 'Product Not Found',
                status: 404
            })
        }
        if(req.fileTypeError){
            return next({
                msg: 'Invalid file format',
                status: 414
            })
        }
        const data = req.body;
        if(req.file){
            data.photo = req.file.filename;
        }
        var oldImage = product.photo;

        // Product found now update
        map_product_request(product, data);
        product.save(function(err,updated){
            if(err){
                return next(err)
            }
            // Remove existion images for server
            if(req.file){
                fs.unlink(path.join(process.cwd(),'uploads/images/'+ oldImage), function(err,done){
                    if(err){
                        console.log('Error in removing', err)
                    }else{
                        console.log('Sucess in removing')
                    }
                })
            }
            res.json(updated)
        })
    })
}

const remove = (req,res,next)=>{
    productModel.findById(req.params.id, function(err,product){
        if(err){
            return next(err)
        }
        if(!product){
            return next({
                msg: 'Product Not found',
                status: 404
            })
        }
        product.remove(function(err,removed){
            if(err){
                return next(err)
            }
            res.json(removed)
        })
    })
}


module.exports = {
    // Object shorthand
    insert,
    find,
    findHome,
    findById,
    update,
    remove,
}