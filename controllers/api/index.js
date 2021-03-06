const router = require('express').Router();
const articles = require('./articles-routes');
const users = require('./users-routes');
const comments = require('./comments-routes');
const { Users } = require('../../models');

router.use('/articles', articles);
router.use('/users', users);
router.use('/comments', comments);

router.post('/login', async (req, res) => {
    try {
        // Do not attempt to log in again if user is already logged in
        if(req.session.loggedIn) {
            res.status(403).json({response: "Must logout before logging in again."});
            return;
        }
        // Get user based on email
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        // If no user at that email, the login failed.
        if(!user) {
            res.status(400).json({result: 'Incorrect email or password.'});
            return;
        }

        // Check the users password
        const passwordCorrect = await user.checkPassword(req.body.password);

        // Fail the login if the password is not correct
        if(!passwordCorrect) {
            res.status(400).json({result: 'Incorrect email or password.'});
            return;
        }

        // Start the session with loggedIn=true
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.curUserID = user.getID();
            console.log(req.session);
            res.status(200).json({ user: user, result: `You are now logged in as ${ user.username }`});
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/logout', (req, res) => {
    // If logged in, destroy the session and send an ok status.
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else { // Otherwise, send an error status.
        res.status(404).end();
    }
})

module.exports = router;