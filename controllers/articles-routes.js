const router = require('express').Router();
const {Articles, Users} = require('../models');

// Get a list of all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Articles.findAll({
            include: [{model: Users}],
            order: [['likes', 'DESC']]
        });
        const articlesJSON = articles.map( (article) => article.get({plain: true}) );
        res.render('articles', {articles: articlesJSON});
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get's a specific article
router.get('/:id', async (req, res) => {
    try {
        const article = await Articles.findByPk(req.params.id);
        if(!article) {
            res.render('404');
            return;
        }
        res.render('article', article.get({plain: true}));
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;