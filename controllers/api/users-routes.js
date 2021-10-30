const router = require('express').Router();

router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

router.post('/', async (req, res) => {
    // TODO
    res.status(200).send(req.body);
});

module.exports = router;