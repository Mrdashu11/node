const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/ProductCtl');
const passport = require('passport');
const multer = require('multer');
const path = require('path'); // Make sure to require 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    }
});

const upload = multer({ storage });

// Routes
router.get('/addproducts', passport.checkAuthentication, productController.addProduct);
router.get('/viewProduct', passport.checkAuthentication, productController.viewProduct);
router.get('/products', passport.checkAuthentication, productController.getAllProducts);
router.get('/category/:category', passport.checkAuthentication, productController.getProductsByCategory);
router.get('/size/:size', passport.checkAuthentication, productController.getProductsBySize);

// Post routes with file upload
router.post('/insert', passport.checkAuthentication, upload.array('images'), productController.createProduct);
router.post('/:id', passport.checkAuthentication, upload.array('images'), productController.updateProduct);

router.get('/:id', passport.checkAuthentication, productController.getProductById);
router.get('/single/:id', passport.checkAuthentication, productController.SingleProduct);
router.get('/category/:category', productController.getCategoryProducts);

module.exports = router;
