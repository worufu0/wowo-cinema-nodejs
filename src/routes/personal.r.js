const express = require('express');
const router = express.Router();
const personalC = require('../controllers/personal.c');
const loadFixedData = require('../middlewares/load-fixed-data');
const loginRequired = require('../middlewares/login-required');

router.use(loginRequired);

router.patch('/change-password', personalC.changePassword);
router.get('/change-password', personalC.viewChange);
router.patch('/edit-info', personalC.editInfo);
router.get('/', loadFixedData, personalC.index);

module.exports = router;
