const router = require('express').Router();
const {Articles} = require('../../models');

// Post an article to create a new article
router.post('/', async (req, res) => {
    try {
        // Exit if not logged in
        if(!req.session.loggedIn) {
            res.status(401).json({ response: "Must be logged in to do this action" });
            return;
        }
        // Create a new article
        const article = Articles.create({
            title: req.body.title,
            body: req.body.body,
            author_id: req.session.curUserID
        });
        res.status(200).json({ article: article, response: "Article added successfully."})
    } catch (err) {
        res.status(500).json(err);
    }
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