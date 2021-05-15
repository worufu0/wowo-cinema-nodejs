const express = require('express');
const router = express.Router();

// [GET] /register
router.get('/', (req, res) => {
    res.render('pages/register', {
        layout: 'other',
        title: 'Đăng Ký | Wowo Cinema',
    });
});

module.exports = router;
