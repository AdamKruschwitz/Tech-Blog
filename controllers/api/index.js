const router = require('express').Router();
const articles = require('./articles-routes');
const users = require('./users-routes');
const comments = require('./comments-routes');

router.use('/articles', articles);
router.use('/users', users);
router.use('/comments', users);

module.exports = router;