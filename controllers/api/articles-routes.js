const router = require('express').Router();
// TO BE MOVED TO /ARTICLES INSTEAD OF /API/ARTICLES
router.get('/', async (req, res) => {
    // TODO
    res.status(200).send('Getting all articles');
})

// Get's a users profile with articles they've written and comments they've made.
router.get('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

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