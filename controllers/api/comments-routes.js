const router = require('express').Router();
const { Comments } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        // If not logged in, return a 401 and redirect to the login page
        if(!req.session.loggedIn) {
            res.status(401).redirect('/login');
            return;
        }
        // Otherwise, create the comment
        const comment = await Comments.create({ // Sending explicit options to avoid posting comments as other users
            body: req.body.body,
            author_id: req.session.curUserID,
            article_id: req.body.article_id
        });
        // console.log(comment);
        res.status(200).json({comment: comment, result: "Comment added successfully."});
    } catch (err) {
        res.status(500).send(err);
    }
});

// Edit a comment
router.put('/:id', async (req, res) => {
    try {
        // Get the comment to edit
        const comment = await Comments.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log(comment.getAuthorID());
        console.log(req.session.curUserID);
        // If the comment isn't found, return a 404
        if(!comment) {
            res.status(404).json({result: 'Comment not found.'});
            return;
        }
        // If the author of this comment isn't the currently logged in user, return a 403
        if(comment.getAuthorID() !== req.session.curUserID) {
            res.status(403).json({ result: "Must be logged in as the author of this comment to edit it." });
            return;
        }

        // Otherwise, update the comment and return a 200
        await comment.update({
           body: req.body.body 
        });
        res.status(200).json({comment: comment, result: 'Comment updated successfully.'})
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        // get the comment
        const comment = await Comments.findOne({
            where: {
                id: req.params.id
            }
        });
        // If it doesn't exist, return a 404
        if(!comment) {
            res.status(404).json({result: 'Comment not found.'});
            return;
        }
        // If the author of the comment isn't currently logged in, return a 403
        if(comment.getAuthorID() !== req.session.curUserID) {
            res.status(403).json({ result: "Must be logged in as the author of this comment to delete it." });
            return;
        }
        // Otherwise, destroy the comment and return a 200
        const body = comment.body;
        await comment.destroy();
        res.status(200).json({result: `Comment '${body}' deleted successfully.`});
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;