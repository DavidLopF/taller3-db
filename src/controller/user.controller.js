const getUser = (req, res) => {
    res.render('user', {
        title: 'Sergio'
    });
};

const postUser = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Post user'
    });
};

module.exports = {
    getUser,
    postUser
};