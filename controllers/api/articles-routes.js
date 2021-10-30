const router = require('express').Router();

// Post an article to create a new article
router.post('/', async (req, res) => {
    // TODO
    res.status(200).send(req.body);
});

// Update the body of an article
router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

// Delete an article
router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

module.exports = router;