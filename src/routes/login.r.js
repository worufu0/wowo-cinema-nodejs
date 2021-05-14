const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/login', {
        layout: 'other',
        title: 'Đăng Nhập | Wowo Cinema',
    });
});

module.exports = router;
