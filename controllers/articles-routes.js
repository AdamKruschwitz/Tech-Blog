const router = require('express').Router();
const {Articles, Users, Comments} = require('../models');

// Get a list of all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Articles.findAll({
            include: [{model: Users}],
            order: [['likes', 'DESC']]
        });
        const articlesJSON = articles.map( (article) => article.get({plain: true}) );
        res.render('articles', { articles: articlesJSON, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create/', async (req, res) => {
    if(!req.session.loggedIn) {
        res.status(403).json({response: "You must be logged in to create an article."});
        return;
    }
    
    try {
        res.render('create-article', { loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get's a specific article
router.get('/:id', async (req, res) => {
    try {
        const article = await Articles.findByPk(req.params.id, {
            include: [{model: Users}, {model: Comments, include: [{model: Users}]}]
        });
        if(!article) {
            res.render('404');
            return;
        }
        // console.log(article.get({plain: true}));
        const articleJSON = article.get({plain: true});
        res.render('article', { article: articleJSON, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;