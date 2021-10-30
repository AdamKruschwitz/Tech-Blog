const router = require('express').Router();
const articles = require('./articles-routes');

router.use('/articles', articles);

module.exports = router;