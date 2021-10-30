const router = require('express').Router();

// Create a new comment
router.post('/', async (req, res) => {
    // TODO
    res.status(200).send(req.body);
});

// Edit a comment
router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
})

module.exports = router;