const { Articles } = require('../models');

const articlesData = [
    {
        title: "Test Article",
        body: "This is a test article that I use to test my blog.",
        author_id: 1
    },
    {
        title: "The Dangers of Robotic Policing Equipment",
        body: "Robotic cops should not be allowed in society. A programmer simply cannot be responsible for deciding the life or death of a person. Human police still present a danger to many, so maybe we should not let human cops kill people either? maybe they shouldn't have guns?",
        author_id: 2
    },
    {
        title: "HOW TO PROPERLY ARREST FLEEING ASSAILANTS",
        body: "STEP 1: NEUTRALIZE TARGET THROUGH LETHAL MEANS",
        author_id: 3
    }
]

const seedArticles = () => Articles.bulkCreate(articlesData);

module.exports = seedArticles;