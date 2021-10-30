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
        const article = await Articles.create({
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
    try {
        // Get the article
        const article = await Articles.findOne({
            where: {
                id: req.params.id
            }
        });
        // If the article isn't found, return a 404
        if(!article) {
            res.status(404).json({response: "Article not found"});
            return;
        }

        // If the current user isn't logged in as the author, return a 403
        if(article.getAuthorID() !== req.session.curUserID) {
            res.status(403).json({response: "Must be logged in as the author to change this article."});
            return;
        }

        // Otherwise, update the article and return a 200
        article.update({
            title: req.body.title,
            body: req.body.body
        });
        res.status(200).json({article: article, response: "Article updated successfully."});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete an article
router.delete('/:id', async (req, res) => {
    try {
        const article = await Articles.findOne({
            where: {
                id: req.params.id
            }
        });
        //If the article wasn't found, return with a 404 error
        if(!article) {
            res.status(404).json({response: "Article not found."});
            return;
        }

        // If the current user isn't logged in, return with a 403 error
        if(article.getAuthorID() !== req.session.curUserID) {
            res.status(403).json({response: "Must be logged in as the author to delete this article."});
            return;
        }

        // Otherwise, delete the article
        const title = article.title;
        await article.destroy();
        res.status(200).json({response: `Article '${title}' deleted successfully.`})
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;