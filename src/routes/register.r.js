const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/register', {
        layout: 'other',
        title: 'Đăng Ký | Wowo Cinema',
    });
});

module.exports = router;
