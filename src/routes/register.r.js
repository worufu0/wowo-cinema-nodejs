const express = require('express');
const router = express.Router();
const registerC = require('../controllers/register.c');

router.get('/', registerC.index);
router.post('/', registerC.register);
router.post('/validate', registerC.validate);
router.get('/verify/:token', registerC.verify);

module.exports = router;
