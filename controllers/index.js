const router = require('express').Router();
const api = require('./api');
const articles = require('./articles-routes');
const users = require('./users-routes');
const { Articles, Users } = require('../models');

router.use('/api', api);
router.use('/articles', articles);
router.use('/users', users);

router.get('/', async (req, res) => {
    const featuredArticles = await Articles.findAll({
        order: [['likes', 'DESC']],
        limit: 5,
        include: [{model: Users}]
    });
    const featuredArticlesJSON = featuredArticles.map((article) => article.get({plain: true}));
    // console.log(featuredArticlesJSON);
    res.render('homepage', {
        loggedIn: req.session.loggedIn,
        articles: featuredArticlesJSON
    });
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