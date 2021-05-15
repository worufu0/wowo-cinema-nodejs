const express = require('express');
const router = express.Router();

// [GET] /
router.get('/', (req, res) => {
    res.render('pages/home', { title: 'Mua Vé | Wowo Cinema' });
});

module.exports = router;
