const express = require('express');
const router = express.Router();
const movieC = require('../controllers/movie.c');

router.get('/:unsignedName', movieC.index);

module.exports = router;
