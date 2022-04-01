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

const getUserLogin = (req, res) => {
    res.render('user_login')
}



module.exports = {
    getUser,
    postUser,
    getUserLogin
};