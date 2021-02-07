const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const isAuthe = require('../protection/is-authe');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuthe, shopController.getCart);

router.post('/cart', isAuthe, shopController.postCart);

router.post('/cart-delete-item', isAuthe, shopController.postCartDeleteProduct);

router.post('/create-order', isAuthe, shopController.postOrder);

router.get('/orders', isAuthe, shopController.getOrders);

module.exports = router;
