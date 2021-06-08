const express = require('express');
const router = express.Router();
const checkoutC = require('../controllers/checkout.c');
const loadFixedData = require('../middlewares/load-fixed-data');
const loginRequired = require('../middlewares/login-required');
const queryStringRequired = require('../middlewares/query-string-required');

router.use(loginRequired);

router.post('/verify', checkoutC.verify);
router.post('/send', checkoutC.send);
router.get('/cancel', checkoutC.cancel);
router.get('/success', checkoutC.success);
router.post('/allow-payment', checkoutC.allowPayment);
router.post('/', checkoutC.checkout);
router.get('/', queryStringRequired, loadFixedData, checkoutC.index);

module.exports = router;
