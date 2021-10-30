const router = require('express').Router();
const articles = require('./articles-routes');
const users = require('./users-routes');

router.use('/articles', articles);
router.use('/users', users);

module.exports = router;