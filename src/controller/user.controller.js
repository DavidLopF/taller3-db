const getUser = (req, res) => {
    res.render('user', {
        title: 'politas'
    });
};


const getUserLogin = (req, res) => {
    res.render('user_login')
}



module.exports = {
    getUser,
    getUserLogin
};