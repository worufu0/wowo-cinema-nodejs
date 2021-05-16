module.exports = (req, res) => {
    res.render('pages/404', { layout: 'other', title: 'Không tìm thấy trang' });
};
