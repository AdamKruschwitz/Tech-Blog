const router = require('express').Router();
const { Comments } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const comment = await Comments.create(req.body);
        console.log(comment);
        res.status(200).json({comment: comment, result: "Comment added successfully."});
    } catch (err) {
        res.status(500).send(err);
    }
});

// Edit a comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comments.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if(!comment) {
            res.status(404).json({result: 'Comment not found.'});
            return;
        }
        const updatedComment = await Comments.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({comment: updatedComment, result: 'Comment updated successfully.'})
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
})

module.exports = router;