const router = require('express').Router();

router.post('/', async (req, res) => {
    // TODO
    res.status(200).send(req.body);
});

router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
})

module.exports = router;