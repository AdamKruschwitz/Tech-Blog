const router = require('express').Router();
const { Comments } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const comment = await Comments.create(req.body);
        console.log(comment);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).send(err);
    }
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