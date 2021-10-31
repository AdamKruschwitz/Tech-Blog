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
        res.render('authors', {authors: usersJSON, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Renders a single user page
router.get('/:username', async (req, res) => {
    try {
        // Get the user
        const user = await Users.findOne({
            where: {
                username: req.params.username
            },
            include: [{model: Articles, include: [{model: Users}]}],
            attributes: {
                exclude: ['password']
            }
        });
        // console.log(user.get({plain: true}));
        // If the user doesn't exist, render 404
        if(!user) {
            res.render('404');
            return;
        }
        // Otherwise, render the author page
        const userJSON = user.get({plain: true});
        res.render( 'author', {author: userJSON, loggedIn: req.session.loggedIn} );
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;