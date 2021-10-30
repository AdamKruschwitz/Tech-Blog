const router = require('express').Router();

// Create a new user
router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

// Delete a user
router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

// Modify a user
router.post('/', async (req, res) => {
    // TODO
    res.status(200).send(req.body);
});



module.exports = router;