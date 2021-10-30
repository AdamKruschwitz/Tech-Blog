const sequelize = require('../config/connection');
const seedUsers = require('./userData');

const seed = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    proicess.exit(0);
}

seed();