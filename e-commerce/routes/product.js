  const express = require('express');
  const router = express.Router(); 
  const productController = require('../controllers/ProductCtl');
  const multer = require('multer'); 
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Ensure the 'uploads' directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
  });
  const upload = multer({ storage });
    
  // Route to render the add product page
  router.get('/addproducts', productController.addProduct);

  // Route to get all products
  router.get('products/products', productController.getAllProducts);

  // Route to create a new product

  router.post('/products',  upload.single('image'), productController.createProduct);

  // Route to get a single product by ID
  router.get('/products/:id', productController.getProductById);

  // Route to update a product by ID
  router.put('/products/:id', productController.updateProduct);

  // Route to delete a product by ID
  router.delete('/products/:id', productController.deleteProduct);

  module.exports = router;
