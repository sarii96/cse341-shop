const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuthe = require('../protection/is-authe');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuthe, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuthe, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuthe, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuthe, adminController.getEditProduct);

router.post('/edit-product', isAuthe, adminController.postEditProduct);

router.post('/delete-product', isAuthe, adminController.postDeleteProduct);

module.exports = router;
