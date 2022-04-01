const getUser = (req, res) => {
    res.render('user', {
        title: 'politas'
    });
};


module.exports = {
    getUser,
};