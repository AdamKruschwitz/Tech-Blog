const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedArticles = require('./articleData');
const seedComments = require('./commentsData');

const seed = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedArticles();

    await seedComments();

    process.exit(0);
}

seed();