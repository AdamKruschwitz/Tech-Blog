const router = require('express').Router();

// Get a list of all articles
router.get('/', async (req, res) => {
    // TODO
    res.status(200).send('Getting all articles');
})

// Get's a specific article
router.get('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

module.exports = router;