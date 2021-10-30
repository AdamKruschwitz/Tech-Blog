const { response } = require('express');
const router = require('express').Router();

// Renders the all users page
router.get('/', async (req, res) => {
    // TODO
    res.status(200).send('getting all users');
});

// Renders a single user page
router.get('/:username', async (req, res) => {
    // TODO
    res.status(200).send(req.params.username);
});

module.exports = router;