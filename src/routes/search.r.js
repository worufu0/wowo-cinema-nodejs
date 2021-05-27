const express = require('express');
const router = express.Router();
const searchC = require('../controllers/search.c');

router.get('/select-room', searchC.selectRoom);
router.get('/autocomplete', searchC.autoComplete);
router.get('/', searchC.index);

module.exports = router;
