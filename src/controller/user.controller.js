const getUser = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Get user'
    });
};

module.exports = {
    getUser
};