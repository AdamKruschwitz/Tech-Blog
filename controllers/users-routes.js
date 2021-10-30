const router = require('express').Router();
const { Users, Articles } = require('../models');

// Renders the all users page
router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll({
            include: [{model: Articles}]
        });
        const usersJSON = users.map( (user) => user.get({plain: true}) )
        // console.log(usersJSON);
        res.render('authors', {authors: usersJSON});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Renders a single user page
router.get('/:username', async (req, res) => {
    // TODO
    res.status(200).send(req.params.username);
});

module.exports = router;