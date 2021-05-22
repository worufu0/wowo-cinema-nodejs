const express = require('express');
const router = express.Router();
const searchC = require('../controllers/search.c');

router.get('/get-source', searchC.getSource);
router.get('/', searchC.index);

module.exports = router;
