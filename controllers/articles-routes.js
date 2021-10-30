const router = require('express').Router();
const {Articles} = require('../models');

// Get a list of all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Articles.findAll();
        const articlesJSON = articles.map( (article) => article.get({plain: true}) );
        res.render('articles', {articles: articlesJSON});
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get's a specific article
router.get('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

module.exports = router;