const router = require('express').Router();

// Importing routing level middleware
const AuthRouter = require('./controller/auth.controller');
const UserRouter = require('./controller/user.controller');
const ProductRouter = require('./modules/product/product.route');

// Importing application level middleware
const authenticate = require('./middlewares/authenticate');

router.use('/auth', AuthRouter);
router.use('/user',authenticate, UserRouter);
router.use('/product', ProductRouter);

module.exports = router;