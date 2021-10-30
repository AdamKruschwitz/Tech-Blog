const { Comments } = require('../models');

const commentsData = [
    {
        body: "I don't like this...",
        author_id: 2,
        article_id: 1
    }
]

const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;