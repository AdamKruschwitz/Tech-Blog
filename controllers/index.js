const router = require('express').Router();
const api = require('./api');
const articles = require('./articles-routes');
const users = require('./users-routes');

router.use('/api', api);
router.use('/articles', articles);
router.use('/users', users);

router.get('/', (req, res) => {
    // TODO - handle session stuff for logins
    res.render('homepage');
});

router.get('/login', async (req, res) => {
    // TODO
    res.status(200).send('logging in');
});

router.get('/logout', async (req, res) => {
    // TODO
    res.status(200).send('logging out');
})

module.exports = router;