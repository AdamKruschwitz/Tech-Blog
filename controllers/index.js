const api = require('./api');
const router = require('express').Router();

router.use('/api', api);

router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;