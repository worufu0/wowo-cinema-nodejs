const express = require('express');
const router = express.Router();
const searchC = require('../controllers/search.c');

router.get('/autocomplete', searchC.autoComplete);

module.exports = router;
