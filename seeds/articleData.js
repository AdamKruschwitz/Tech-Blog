const { Articles } = require('../models');

const articlesData = [
    {
        title: "Test Article",
        body: "This is a test article that I use to test my blog.",
        author_id: 1
    }
]

const seedArticles = () => Articles.bulkCreate(articlesData);

module.exports = seedArticles;