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
<<<<<<< HEAD
=======
    postUser,
    getUserLogin
>>>>>>> 4ed6e445e5971ab1d09f805826db0b82c0510ece
};