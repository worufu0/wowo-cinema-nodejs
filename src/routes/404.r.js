module.exports = (req, res) => {
    res.render('pages/404', { layout: 'other', title: 'Không Tìm Thấy Trang' });
};
