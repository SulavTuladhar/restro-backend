const router = require('express').Router();
const productController = require('./product.controller');

// middlewares
const uploader = require('./../../middlewares/uploader') // Fileupload
const authenticate = require('../../middlewares/authenticate'); // authenticate

router.route('/')
    .get(productController.find)
    .post(authenticate, uploader.single('image'), productController.insert);

router.route('/home')
    .get(productController.findHome);

router.route('/:id')
    .get(productController.findById)
    .put(authenticate, uploader.single('image'), productController.update)
    .delete(authenticate, productController.remove);

module.exports = router;