const router = require('express').Router();
const api = require('./api');
const articles = require('./articles-routes');
const users = require('./users-routes');
const { Articles, Users } = require('../models');

router.use('/api', api);
router.use('/articles', articles);
router.use('/authors', users);

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

router.get('/dashboard', async (req, res) => {
    console.log('dashboard get processing')
    if(!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    console.log('confirmed user login')
    try {
        console.log('Getting user articles')
        const articles = await Articles.findAll({
            where: {
                author_id: req.session.curUserID
            }
        });
        const articlesJSON = articles.map((article) => article.get({plain: true}));
        console.log(articlesJSON);
        res.render('dashboard', {loggedIn: req.session.loggedIn, articles: articlesJSON});
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;